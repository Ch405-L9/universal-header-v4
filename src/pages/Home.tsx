import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

import { CheckoutButton } from "@/components/CheckoutButton";
import { fullFaqs, optimizationHowTo } from "@/lib/content-graph";
import {
  buildFAQSchema,
  buildGraph,
  buildWebPageSchema,
  orgEntity,
  webOptimizationService,
  websiteEntity,
} from "@/lib/schema";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import "@/styles/editorial.css";

const PHONE = "(470) 791-7361";
const PHONE_HREF = "tel:+14707917361";
const EMAIL = "adgrant1@badgrtech.com";
const BILLING_PORTAL = "https://billing.stripe.com/p/login/dRmfZggxI4JV4C75By6c000";

type Plan = {
  name: string;
  price: string;
  period: string;
  pick?: boolean;
  cells: string[];
  action: { label: string; href: string };
};

const rows = ["Covers", "What gets done", "Also included", "You receive", "Timing"];

const plans: Plan[] = [
  {
    name: "Free website check",
    price: "$0",
    period: "",
    cells: [
      "One public page",
      "Up to three issues we observed",
      "No account access needed",
      "Plain-English findings by email",
      "Written to read in about two minutes",
    ],
    action: { label: "Request my free check", href: "#request" },
  },
  {
    name: "Website Tune-Up",
    price: "$349",
    period: "one-time",
    pick: true,
    cells: [
      "One website, up to three public pages",
      "Mobile speed and layout fixes; page titles and descriptions",
      "Broken-link check, one contact-form test, Google Business Profile hours and link check",
      "A brief before/after report",
      "Five business days after scope approval, payment and access",
    ],
    action: { label: "Start with a free check", href: "#request" },
  },
  {
    name: "Care Essential",
    price: "$79",
    period: "/month",
    cells: [
      "One website, after a Tune-Up",
      "Scheduled uptime checks and routine maintenance your platform supports",
      "Backup verification or recovery check; 30 minutes of service time each month",
      "A brief monthly report",
      "Billed monthly in advance; cancel online before renewal",
    ],
    action: { label: "Ask about Care", href: "#contact" },
  },
];

const stages = [
  {
    when: "About two minutes",
    grow: 2,
    text: "First, request the free check and read up to three issues in plain English.",
  },
  {
    when: "Five business days",
    grow: 5,
    text: "Then approve a written scope and price. The Tune-Up is done and reported back.",
  },
  {
    when: "Every month, if you want it",
    grow: 3,
    text: "After that, Care is optional: checks, upkeep and a short monthly report.",
  },
];

const nameColumns: { kind: string; items: { label: string; href?: string }[] }[] = [
  {
    kind: "Built and shipped",
    items: [
      { label: "C.Walts", href: "/portfolio/cwalts" },
      { label: "BADGR Bolt", href: "/portfolio/badgr-bolt" },
      { label: "BADGR Harness", href: "/portfolio/badgr-harness" },
      { label: "BADGR AI Ops", href: "/portfolio/badgr-ai-ops" },
      { label: "This website", href: "/portfolio/web-ops" },
    ],
  },
  {
    kind: "Checked on every Tune-Up",
    items: [
      { label: "Mobile speed" },
      { label: "Phone layout" },
      { label: "Page titles and descriptions" },
      { label: "Broken links" },
      { label: "One contact-form test" },
      { label: "Google Business Profile hours and links" },
    ],
  },
  {
    kind: "On record",
    items: [
      { label: "Georgia LLC" },
      { label: "Active SAM.gov registration" },
      { label: "NAICS 541511 and 541519" },
      { label: "Based in Lawrenceville, GA" },
    ],
  },
];

const faqs = fullFaqs;

function normalizeHttpsUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice(7)}`;
  if (!trimmed.startsWith("https://")) return `https://${trimmed}`;
  return trimmed;
}

/** Turns the billing-portal URL inside an FAQ answer into a readable link. */
function FaqAnswer({ text }: { text: string }) {
  const parts = text.split(BILLING_PORTAL);
  if (parts.length === 1) return <p>{text}</p>;
  return (
    <p>
      {parts[0]}
      <a className="ed-link" href={BILLING_PORTAL} rel="noopener noreferrer" target="_blank">
        the billing portal
      </a>
      {parts[1]}
    </p>
  );
}

/** Reveals [data-in] children once as they scroll into view. Content stays visible without script. */
function useEntrances(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    el.classList.add("ed-in-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    el.querySelectorAll("[data-in]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [root]);
}

/** Plays the muted work clip only while it is on screen. */
function LazyClip(props: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        v.play().catch(() => undefined);
      } else {
        v.pause();
      }
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={props.poster}
      aria-label={props.label}
      width={960}
      height={622}
    >
      <source src={props.src} type="video/mp4" />
    </video>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  useEntrances(pageRef);

  // Home is lazy-loaded, so the browser's own jump to /#section happens before the target exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  const [siteUrl, setSiteUrl] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const [auditData, setAuditData] = useState<{ lcp?: string; fcp?: string; cls?: string; tbt?: string } | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [triageForm, setTriageForm] = useState({
    contactName: "",
    businessName: "",
    email: "",
    phone: "",
    websiteUrl: "",
    businessType: "",
    consent: false,
  });
  const [triageSubmitting, setTriageSubmitting] = useState(false);
  const [triageMessage, setTriageMessage] = useState<string | null>(null);
  const [triageError, setTriageError] = useState<string | null>(null);

  usePageMeta({
    title: "Website Tune-Up & Care | BADGRTECHNOLOGIES",
    description:
      "Website tune-ups from $349 and care from $79/month. Mobile usability, search basics, and contact-form checks. Request a free website check.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      webOptimizationService,
      buildWebPageSchema({
        id: "https://badgrtech.com/#homepage",
        name: "Website Tune-Up & Care | BADGRTECHNOLOGIES",
        description:
          "Website tune-ups from $349 and care from $79/month for local businesses. Mobile usability, search basics, and contact-form checks.",
        url: "https://badgrtech.com/",
      }),
      buildFAQSchema(faqs),
      {
        "@type": "HowTo",
        "@id": "https://badgrtech.com/#howto-optimize",
        name: optimizationHowTo.name,
        description: optimizationHowTo.description,
        step: optimizationHowTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: s.url,
        })),
      },
    ),
    "home-graph",
  );

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteUrl) return;
    const url = normalizeHttpsUrl(siteUrl);
    setAuditLoading(true);
    setAuditError(null);
    setAuditScore(null);
    try {
      const res = await fetch(`/api/pagespeed-preview?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message ?? "Google could not read that score right now.");
      }
      setAuditScore(data.score);
      setAuditData(data.metrics);
    } catch (error) {
      setAuditError(
        error instanceof Error && error.message
          ? `${error.message} You can still request the free check below.`
          : "Google could not read that score right now. You can still request the free check below.",
      );
    } finally {
      setAuditLoading(false);
    }
  };

  const sendToRequest = () => {
    setTriageForm((f) => ({ ...f, websiteUrl: normalizeHttpsUrl(siteUrl) }));
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.getElementById("contact-email")?.focus(), 500);
  };

  const handleTriageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTriageSubmitting(true);
    setTriageMessage(null);
    setTriageError(null);

    try {
      const res = await fetch("/api/lighthouse-scan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practiceName: triageForm.businessName,
          contactName: triageForm.contactName,
          email: triageForm.email,
          phone: triageForm.phone,
          concern: triageForm.businessType,
          websiteUrl: normalizeHttpsUrl(triageForm.websiteUrl),
          consent: triageForm.consent,
          website: "",
        }),
      });

      const body = await res.json().catch(() => ({} as { message?: string }));

      if (!res.ok) {
        throw new Error(body.message ?? `The request could not be sent. Please email ${EMAIL}.`);
      }

      setTriageMessage(body.message ?? "Your request was sent. We will follow up within one business day.");
      setTriageForm({
        contactName: "",
        businessName: "",
        email: "",
        phone: "",
        websiteUrl: "",
        businessType: "",
        consent: false,
      });
    } catch (err) {
      setTriageError(err instanceof Error ? err.message : `The request could not be sent. Please email ${EMAIL}.`);
    } finally {
      setTriageSubmitting(false);
    }
  };

  const field = (key: keyof typeof triageForm) => ({
    value: triageForm[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTriageForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div className="ed" ref={pageRef}>
      <a className="ed-skip" href="#main">
        Skip to content
      </a>

      <header className="ed-bar">
        <Link href="/" className="ed-word" aria-label="BADGRTechnologies home">
          <img src="/images/badgrtech-logo-sm.avif" alt="" width={32} height={32} />
          <span>BADGRTechnologies</span>
        </Link>
        <nav className="ed-nav" aria-label="Main">
          <ul>
            <li><a href="#prices">Prices</a></li>
            <li><a href="#how">How it works</a></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><a href="#questions">Questions</a></li>
          </ul>
          <details className="ed-menu">
            <summary>Menu</summary>
            <ul>
              <li><a href="#prices">Prices</a></li>
              <li><a href="#how">How it works</a></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/sample-report">Sample report</Link></li>
              <li><a href="#questions">Questions</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </details>
          <a className="ed-btn" href="#request">
            Free website check
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="ed-hero" aria-labelledby="hero-title">
          <img
            className="ed-hero__img"
            src="/editorial/courthouse.webp"
            srcSet="/editorial/courthouse-800.webp 800w, /editorial/courthouse.webp 1280w"
            sizes="100vw"
            width={1280}
            height={760}
            alt="The Gwinnett Historic Courthouse on the square in Lawrenceville, Georgia"
            fetchPriority="high"
          />
          <div className="ed-hero__scrim" aria-hidden="true" />
          <p className="ed-hero__fact">Lawrenceville, where BADGR is based</p>
          <div className="ed-hero__copy">
            <h1 id="hero-title">Fix the website. Know the price.</h1>
            <p className="ed-hero__lede">
              Website fixes for local businesses. Start with a free one-page check by email; a Tune-Up is $349 for
              up to three pages.
            </p>
          </div>
          <div className="ed-hero__cards">
            <Link href="/sample-report" className="ed-card">
              <img src="/editorial/sample-report.webp" alt="" width={960} height={640} />
              <span>
                Sample report <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link href="/portfolio" className="ed-card">
              <img src="/editorial/web-ops-site.webp" alt="" width={960} height={622} />
              <span>
                Portfolio <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>

        <section className="ed-section ed-paper ed-check" aria-labelledby="check-title">
          <span id="audit" className="ed-anchor" aria-hidden="true" />
          <div className="ed-axis">
            <p className="ed-muted" data-in>
              Uses Google PageSpeed on the mobile version of one page. Nothing is stored.
            </p>
            <div className="ed-axis__main">
              <h2 id="check-title" className="ed-h2" data-in style={{ "--i": 1 } as React.CSSProperties}>
                How fast is your page on a phone?
              </h2>
              <form onSubmit={handleAudit} data-in style={{ "--i": 2 } as React.CSSProperties}>
                <label htmlFor="speed-url" className="sr-only">
                  Your website address
                </label>
                <input
                  id="speed-url"
                  className="ed-input"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="yourbusiness.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  required
                />
                <button className="ed-btn ed-btn--dark" type="submit" disabled={auditLoading}>
                  {auditLoading ? "Checking…" : "Check my page"}
                </button>
              </form>

              <div aria-live="polite">
                {auditScore !== null && (
                  <div className="ed-score">
                    <p className="ed-score__num" aria-label={`Mobile performance score ${auditScore} out of 100`}>
                      {auditScore}
                    </p>
                    <dl>
                      <div>
                        <dt>First content</dt>
                        <dd>{auditData?.fcp ?? "—"}</dd>
                      </div>
                      <div>
                        <dt>Largest content</dt>
                        <dd>{auditData?.lcp ?? "—"}</dd>
                      </div>
                      <div>
                        <dt>Layout shift</dt>
                        <dd>{auditData?.cls ?? "—"}</dd>
                      </div>
                      <div>
                        <dt>Blocking time</dt>
                        <dd>{auditData?.tbt ?? "—"}</dd>
                      </div>
                    </dl>
                  </div>
                )}
                {auditScore !== null && (
                  <p className="ed-note">
                    A score is one signal, not the whole story.{" "}
                    <button type="button" className="ed-link" onClick={sendToRequest} style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }}>
                      Send me the free check for this page
                    </button>{" "}
                    and get up to three issues in plain English.
                  </p>
                )}
                {auditError && <p className="ed-note">{auditError}</p>}
              </div>
            </div>
          </div>
        </section>

        <section id="prices" className="ed-section" aria-labelledby="prices-title">
          {/* Old anchor names still used in sent links and structured data. */}
          <span id="pricing" className="ed-anchor" aria-hidden="true" />
          <span id="services" className="ed-anchor" aria-hidden="true" />
          <h2 className="sr-only">What it costs</h2>
          <div className="ed-table-wrap" data-in>
            <table className="ed-table">
              <caption className="sr-only">Prices and what each option includes</caption>
              <thead>
                <tr>
                  <th scope="col" id="prices-title">What it costs</th>
                  {plans.map((p) => (
                    <th scope="col" key={p.name} className={p.pick ? "is-pick" : undefined}>
                      <span className="ed-plan">{p.name}</span>
                      <span className="ed-price">
                        {p.price}
                        {p.period && <small>{p.period}</small>}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    {plans.map((p) => (
                      <td key={p.name} className={p.pick ? "is-pick" : undefined}>
                        {p.cells[r]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  {plans.map((p) => (
                    <td key={p.name} className={p.pick ? "is-pick" : undefined}>
                      <a className={p.pick ? "ed-btn ed-btn--dark" : "ed-btn"} href={p.action.href}>
                        {p.action.label}
                      </a>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="ed-plans-mobile">
            <p className="ed-h2" aria-hidden="true">What it costs</p>
            {plans.map((p) => (
              <article key={p.name} className={p.pick ? "ed-planblock is-pick" : "ed-planblock"}>
                <h3>{p.name}</h3>
                <p className="ed-price">
                  {p.price}
                  {p.period && <small>{p.period}</small>}
                </p>
                <dl>
                  {rows.map((row, r) => (
                    <div key={row}>
                      <dt>{row}</dt>
                      <dd>{p.cells[r]}</dd>
                    </div>
                  ))}
                </dl>
                <a className="ed-btn" href={p.action.href}>
                  {p.action.label}
                </a>
              </article>
            ))}
          </div>

          <div className="ed-pay">
            <p>Scope already approved in writing?</p>
            <div className="ed-pay__btn">
              <CheckoutButton serviceId="website-tune-up" label="Pay for the Tune-Up, $349" />
            </div>
            <div className="ed-pay__btn">
              <CheckoutButton serviceId="care-essential" label="Start Care, $79/month" />
            </div>
          </div>

          <p className="ed-more ed-muted">
            Bigger jobs: Tune-Up Plus ($699, up to five pages) and the Optimization Sprint ($1,199, up to ten pages)
            are quoted after a free check. Care Plus ($149/month) and Care Priority ($299/month) add more monthly
            service time; extra approved work is $125/hour, quoted in writing first.{" "}
            <Link href="/additional-services" className="ed-link">
              Care and follow-on services
            </Link>
          </p>
        </section>

        <section id="how" className="ed-section" aria-labelledby="how-title" style={{ paddingTop: 0 }}>
          <span id="results" className="ed-anchor" aria-hidden="true" />
          <span id="milestones" className="ed-anchor" aria-hidden="true" />
          <h2 id="how-title" className="ed-h2" data-in>
            How it works
          </h2>
          <ol className="ed-stages" data-ui style={{ listStyle: "none", padding: 0 }}>
            {stages.map((s, i) => (
              <li
                key={s.when}
                className="ed-stage"
                style={{ flexGrow: s.grow, flexBasis: 0, "--i": i } as React.CSSProperties}
                data-in
              >
                <div className="ed-stage__seg">{s.when}</div>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ed-section ed-paper" aria-labelledby="record-title">
          <span id="proof" className="ed-anchor" aria-hidden="true" />
          <div className="ed-names">
            <h2 id="record-title" data-in>
              On the record
            </h2>
            <div className="ed-names__cols" data-in style={{ "--i": 1 } as React.CSSProperties}>
              {nameColumns.map((col) => (
                <ul key={col.kind}>
                  <li>{col.kind}</li>
                  {col.items.map((it) => (
                    <li key={it.label}>{it.href ? <Link href={it.href}>{it.label}</Link> : it.label}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="ed-mosaic" aria-label="Recent work">
          <Link href="/portfolio/web-ops" className="m-a">
            <figure style={{ margin: 0, height: "100%" }}>
              <LazyClip
                src="/portfolio/web-ops-public-silent.mp4"
                poster="/editorial/web-ops-site.webp"
                label="Screen recording of this website being worked on"
              />
              <figcaption>This website, rebuilt and measured</figcaption>
            </figure>
          </Link>
          <Link href="/sample-report" className="m-b">
            <img src="/editorial/sample-report.webp" alt="Sample report scores page" width={960} height={640} loading="lazy" />
          </Link>
          <Link href="/portfolio/badgr-bolt" className="m-c">
            <img src="/editorial/badgr-bolt-app.webp" alt="BADGR Bolt Android app screen" width={960} height={2080} loading="lazy" />
          </Link>
          <a href="#request" className="ed-tile ed-tile--brand m-d">
            Your site next
          </a>
          <Link href="/portfolio/cwalts" className="m-e">
            <img src="/editorial/cwalts-stage2-pass.webp" alt="C.Walts verification run output" width={960} height={540} loading="lazy" />
          </Link>
          <Link href="/sample-report" className="ed-tile ed-tile--surface m-f">
            Read the sample report
          </Link>
          <Link href="/portfolio" className="ed-tile ed-tile--paper m-g">
            See the full portfolio
          </Link>
        </section>

        <section id="request" className="ed-section ed-paper" aria-labelledby="request-title">
          <span id="triage-form" className="ed-anchor" aria-hidden="true" />
          <div className="ed-axis">
            <div>
              <h2 id="request-title" className="ed-h2" data-in>
                Request a free website check
              </h2>
              <p className="ed-lead" style={{ marginTop: 24, maxWidth: "26ch" }} data-in>
                Send your address. Anthony reviews one public page and emails up to three issues.
              </p>
              <p className="ed-muted" style={{ marginTop: 24, maxWidth: "36ch" }}>
                Only the website address and your email are required. We follow up within one business day.
              </p>
            </div>
            <form className="ed-form ed-axis__main" onSubmit={handleTriageSubmit} data-in>
              <div className="ed-field ed-field--wide">
                <label htmlFor="website-url">Website address</label>
                <input id="website-url" className="ed-input" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" required {...field("websiteUrl")} />
              </div>
              <div className="ed-field">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" className="ed-input" type="email" autoComplete="email" placeholder="name@business.com" required {...field("email")} />
              </div>
              <div className="ed-field">
                <label htmlFor="contact-name">
                  Your name <small>optional</small>
                </label>
                <input id="contact-name" className="ed-input" type="text" autoComplete="name" {...field("contactName")} />
              </div>
              <div className="ed-field">
                <label htmlFor="business-name">
                  Business name <small>optional</small>
                </label>
                <input id="business-name" className="ed-input" type="text" autoComplete="organization" {...field("businessName")} />
              </div>
              <div className="ed-field">
                <label htmlFor="contact-phone">
                  Phone <small>optional</small>
                </label>
                <input id="contact-phone" className="ed-input" type="tel" autoComplete="tel" {...field("phone")} />
              </div>
              <div className="ed-field ed-field--wide">
                <label htmlFor="business-type">
                  What is not working? <small>optional</small>
                </label>
                <input id="business-type" className="ed-input" type="text" placeholder="Slow on phones, form not working, outdated hours" {...field("businessType")} />
              </div>
              <div className="ed-consent">
                <input
                  id="triage-consent"
                  type="checkbox"
                  checked={triageForm.consent}
                  onChange={(e) => setTriageForm((f) => ({ ...f, consent: e.target.checked }))}
                  required
                />
                <label htmlFor="triage-consent">
                  I agree to be contacted about this request. I will only send business information: no passwords,
                  payment details, or customer or patient records. See the{" "}
                  <Link href="/privacy" className="ed-link">Privacy Policy</Link> and{" "}
                  <Link href="/terms" className="ed-link">Terms</Link>.
                </label>
              </div>
              <div className="ed-field ed-field--wide">
                <button className="ed-btn ed-btn--dark" type="submit" disabled={triageSubmitting}>
                  {triageSubmitting ? "Sending…" : "Request my free check"}
                </button>
              </div>
              <div aria-live="polite" style={{ display: "contents" }}>
                {triageMessage && <p className="ed-status ed-status--ok">{triageMessage}</p>}
                {triageError && <p className="ed-status ed-status--err">{triageError}</p>}
              </div>
            </form>
          </div>
        </section>

        <section id="questions" aria-labelledby="faq-title">
          <span id="faq" className="ed-anchor" aria-hidden="true" />
          <div className="ed-faq__head">
            <h2 id="faq-title" data-in>
              Questions
            </h2>
          </div>
          {faqs.map((f) => (
            <div className="ed-band" key={f.question} data-in>
              <h3>{f.question}</h3>
              <FaqAnswer text={f.answer} />
            </div>
          ))}
        </section>

        <section id="contact" className="ed-contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="sr-only">
            Contact
          </h2>
          <p className="ed-contact__line" data-in>
            A question about your site, a quote, or Care? Ask Anthony directly.
          </p>
          <img
            className="ed-contact__img"
            src="/editorial/founder_headshot.webp"
            alt="Anthony Grant, founder of BADGRTechnologies"
            width={320}
            height={402}
            loading="lazy"
          />
          <div className="ed-contact__links" data-in style={{ "--i": 1 } as React.CSSProperties}>
            <p>Prefer to talk first?</p>
            <a className="ed-link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <a className="ed-link" href={PHONE_HREF}>
              {PHONE}
            </a>
            <p className="ed-muted" style={{ fontSize: "var(--step-small)", marginTop: 10 }}>
              Lawrenceville, GA · replies within one business day
            </p>
          </div>
        </section>
      </main>

      <footer className="ed-foot">
        <div className="ed-foot__top">
          <div className="ed-foot__notes">
            <span>BADGRTECHNOLOGIES LLC</span>
            <span>Lawrenceville, GA 30044</span>
            <span>Serving Gwinnett County, metro Atlanta, and remote clients</span>
          </div>
          <a className="ed-link" href="#main">
            Back to top
          </a>
        </div>
        <a className="ed-foot__phone" href={PHONE_HREF}>
          {PHONE}
        </a>
        <div className="ed-foot__meta">
          <ul>
            <li><Link href="/privacy" className="ed-link">Privacy</Link></li>
            <li><Link href="/terms" className="ed-link">Terms</Link></li>
            <li><Link href="/proof" className="ed-link">Proof of work</Link></li>
            <li><a href={BILLING_PORTAL} className="ed-link" rel="noopener noreferrer" target="_blank">Billing portal</a></li>
          </ul>
          <p>
            Photo:{" "}
            <a className="ed-link" href="https://commons.wikimedia.org/w/index.php?curid=56668615" rel="noopener noreferrer" target="_blank">
              “Gwinnett County Courthouse in 2005”
            </a>{" "}
            by DeKalb, cropped,{" "}
            <a className="ed-link" href="https://creativecommons.org/licenses/by-sa/3.0/" rel="noopener noreferrer" target="_blank">
              CC BY-SA 3.0
            </a>
          </p>
          <p>© 2026 BADGRTechnologies LLC</p>
        </div>
      </footer>
    </div>
  );
}
