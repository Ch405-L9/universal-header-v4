import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CheckoutButton } from "@/components/CheckoutButton";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import {
  buildGraph,
  buildWebPageSchema,
  orgEntity,
  webOptimizationService,
  websiteEntity,
} from "@/lib/schema";
import { useJsonLd, usePageMeta } from "@/lib/seo";

import "./home-landing.css";

// Landing page (2026-11-05): layout idea after gallery #38, printed slips on a tech mesh.
// Home renders its own header and footer; Layout (used by every subpage) is untouched.

type Theme = "light" | "dark";
const THEME_KEY = "badgr-lp-theme";
const CONTACT_EMAIL = "adgrant1@badgrtech.com";

const serviceSlips = [
  {
    label: "speed + mobile",
    rule: "- - - - - - - - - - -",
    text: "Lighter pages and cleaner phone layouts, so customers reach your number without waiting or pinching.",
  },
  {
    label: "contact paths",
    rule: "+ + + + + + + + + + +",
    text: "Forms, call buttons and booking links tested the way a customer uses them.",
  },
  {
    label: "search basics",
    rule: "= = = = = = = = = = =",
    text: "Clear page titles and descriptions, so the right people find the right page.",
  },
  {
    label: "google profile",
    rule: "- - - - - - - - - - -",
    text: "Business Profile hours and website link checked against your site.",
  },
  {
    label: "before / after",
    rule: "* * * * * * * * * * *",
    text: "A brief report showing what changed, page by page, when the work is done.",
  },
  {
    label: "monthly care",
    rule: "+ + + + + + + + + + +",
    text: "Uptime checks, routine updates and a backup check, from $79 a month.",
  },
];

const proofStats = [
  {
    label: "contrast",
    big: "12→0",
    text: "Colour-contrast violations on badgrtech.com after a two-phase fix.",
  },
  {
    label: "dependencies",
    big: "77→0",
    text: "Dependency vulnerabilities with known production risk.",
  },
  {
    label: "headers",
    big: "8",
    text: "Required security headers in place, content security policy enforced.",
  },
];

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  );
}

// Same profiles as Layout's footer and the Organization schema (lib/schema.ts sameAs).
const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/badgrtech/",
    Icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/109228065/",
    Icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCAbCRiyUh3JTUIrj8l9ADow",
    Icon: Youtube,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@badgr.25?lang=en",
    Icon: TikTokIcon,
  },
  { name: "X", href: "https://x.com/40n33Ba6R", Icon: Twitter },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61581099610296",
    Icon: Facebook,
  },
];

function normalizeHttpsUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice(7)}`;
  if (!trimmed.startsWith("https://")) return `https://${trimmed}`;
  return trimmed;
}

function initialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const emptyForm = {
  contactName: "",
  businessName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  businessType: "",
  consent: false,
};

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [motionReady, setMotionReady] = useState(false);
  const [triageForm, setTriageForm] = useState(emptyForm);
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
      })
    ),
    "home-graph"
  );

  useScrollDepth(_id => {
    // milestone reached — future: send to analytics
  });

  // Home is lazy-loaded, so the browser can't find /#triage-form or /#pricing on first paint.
  // Subpages link to those anchors; scroll once the sections exist.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const frame = window.requestAnimationFrame(() =>
      document.getElementById(hash)?.scrollIntoView()
    );
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Flip cards in on scroll. Cards render plainly until this runs, and stay plain for reduced motion.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Watch the untransformed rows, not the cards: a card folded to -92deg has almost no area to intersect.
    const groups = Array.from(
      root.querySelectorAll<HTMLElement>(".slips, .fan")
    );
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    setMotionReady(true);
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.querySelectorAll<HTMLElement>(".flip").forEach(el => {
            el.classList.add("in");
            el.addEventListener(
              "animationend",
              () => el.classList.add("done"),
              { once: true }
            );
          });
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    groups.forEach(group => io.observe(group));
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, next);
    setTheme(next);
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

      const body = await res.json().catch(() => ({}) as { message?: string });

      if (!res.ok) {
        throw new Error(
          body.message ??
            `The request could not be sent. Please email ${CONTACT_EMAIL}.`
        );
      }

      setTriageMessage(
        body.message ??
          "Your request was sent. We will follow up within 48 hours."
      );
      setTriageForm(emptyForm);
    } catch (err) {
      setTriageError(
        err instanceof Error
          ? err.message
          : `The request could not be sent. Please email ${CONTACT_EMAIL}.`
      );
    } finally {
      setTriageSubmitting(false);
    }
  };

  const setField =
    (key: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === "consent" ? e.target.checked : e.target.value;
      setTriageForm(current => ({ ...current, [key]: value }));
    };

  return (
    <div
      ref={rootRef}
      className={motionReady ? "lp js" : "lp"}
      data-theme={theme}
    >
      <header className="lp-header">
        <div className="wrap">
          <a className="brand" href="/">
            <img
              src="/landing/logo-128.png"
              alt="BADGRTechnologies logo"
              width={34}
              height={34}
            />
            <span className="brand-name">BADGRTechnologies LLC</span>
          </a>
          <nav className="toplinks" aria-label="Main">
            <a className="hide-sm" href="#pricing">
              pricing
            </a>
            <a className="hide-sm" href="/portfolio">
              work
            </a>
            <a href="tel:+14707917361">(470) 791-7361</a>
            <button
              className="theme-btn"
              type="button"
              aria-pressed={theme === "dark"}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={toggleTheme}
            >
              {theme === "dark" ? "light" : "dark"}
            </button>
          </nav>
        </div>
      </header>

      <a className="cta" href="#triage-form">
        Get my free check
      </a>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="board-stage">
              <img
                className="hero-img"
                src="/landing/hero-board.webp"
                alt=""
                width={1097}
                height={452}
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="hero-b">
            <img
              src="/landing/logo-560.webp"
              alt=""
              aria-hidden="true"
              width={560}
              height={560}
              fetchPriority="high"
            />
          </div>
          <h1 id="hero-title" className="wordmark dot">
            <span className="wm-a">BADGR</span>
            <span className="wm-b">Technologies</span>{" "}
            <span className="llc">LLC</span>
            <span className="sr-only">
              : website tune-ups and care for local businesses
            </span>
          </h1>
          <div className="hero-copy serif">
            <p>
              <strong>Turn more website visits into calls.</strong>
            </p>
            <p>
              A $349 Tune-Up fixes speed, forms and call buttons on up to three
              pages. It starts with a free check and a short video walkthrough.
            </p>
            <div className="hero-actions">
              <a className="hero-btn" href="#triage-form">
                Get my free check
              </a>
              <a className="hero-link" href="#pricing">
                See pricing
              </a>
            </div>
          </div>
          <div className="slips" aria-label="What a Tune-Up covers">
            {serviceSlips.map(s => (
              <div key={s.label} className="slip flip">
                <div className="lab">{s.label}</div>
                <div className="div" aria-hidden="true">
                  {s.rule}
                </div>
                {s.text}
              </div>
            ))}
          </div>
        </section>

        <section id="proof" className="paper" aria-labelledby="proof-title">
          <div className="wrap center">
            <div className="eyebrow">proof, printed</div>
            <h2
              id="proof-title"
              className="statement serif"
              style={{ marginInline: "auto" }}
            >
              We run the same checks on our own site first.{" "}
              <span className="hl">Measured, not claimed.</span>
            </h2>
            <div className="fan">
              <ProofSlip {...proofStats[0]} />
              <div className="slip flip">
                <div className="lab">anthony grant</div>
                <div className="div" aria-hidden="true">
                  * * * * * * * * * * * * *
                </div>
                founder, lawrenceville ga
                <img
                  className="portrait"
                  src="/landing/founder-dither.png"
                  alt="Anthony Grant, founder"
                  width={120}
                  height={120}
                  loading="lazy"
                />
                <div className="div" aria-hidden="true">
                  - - - - - - - - - - - - -
                </div>
                One person checks your site, writes the scope, and does the
                work. You approve the price before anything starts.
              </div>
              <ProofSlip {...proofStats[1]} />
              <ProofSlip {...proofStats[2]} />
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="paper"
          aria-labelledby="price-title"
          style={{ paddingTop: 40 }}
        >
          <div className="wrap">
            <div className="eyebrow">pricing</div>
            <h2 id="price-title" className="statement serif">
              Start free. <span className="hl">Fix what matters.</span>
            </h2>
            <div className="receipts">
              <div className="receipt">
                <div className="lab">start here</div>
                <h3>Free website check</h3>
                <div className="price">$0</div>
                <div className="div" aria-hidden="true">
                  - - - - - - - - - - - - - - - -
                </div>
                <ul>
                  <li>
                    <span>one public page</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>up to three issues</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>findings by email</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>screen-recorded walkthrough</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>account access</span>
                    <span>none</span>
                  </li>
                </ul>
                <a className="lp-btn" href="#triage-form">
                  Get my free check
                </a>
              </div>
              <div className="receipt featured">
                <div className="lab">one-time fix</div>
                <h3>Website Tune-Up</h3>
                <div className="price">$349</div>
                <div className="div" aria-hidden="true">
                  = = = = = = = = = = = = = = = =
                </div>
                <ul>
                  <li>
                    <span>pages</span>
                    <span>up to 3</span>
                  </li>
                  <li>
                    <span>delivery</span>
                    <span>5 business days</span>
                  </li>
                  <li>
                    <span>speed + layout</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>titles + links + form</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>before/after report</span>
                    <span>✓</span>
                  </li>
                </ul>
                <a className="lp-btn" href="#triage-form">
                  Get my free check
                </a>
                <div className="pay">
                  <CheckoutButton
                    serviceId="website-tune-up"
                    label="Scope approved? Pay $349"
                    variant="outline"
                  />
                </div>
              </div>
              <div className="receipt">
                <div className="lab">ongoing</div>
                <h3>Care Essential</h3>
                <div className="price">
                  $79<small>/mo</small>
                </div>
                <div className="div" aria-hidden="true">
                  - - - - - - - - - - - - - - - -
                </div>
                <ul>
                  <li>
                    <span>uptime checks</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>routine maintenance</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>backup check</span>
                    <span>✓</span>
                  </li>
                  <li>
                    <span>service time</span>
                    <span>30 min</span>
                  </li>
                </ul>
                <a className="lp-btn" href="#triage-form">
                  Ask about Care
                </a>
                <div className="pay">
                  <CheckoutButton
                    serviceId="care-essential"
                    label="Approved for Care? Start $79/month"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
            <p className="more">
              Tune-Up Plus ($699, up to five pages) and the Optimization Sprint
              ($1,199, up to ten pages) are quoted after a free check. Care Plus
              ($149/month) and Care Priority ($299/month) add more monthly time.
              Additional approved work is $125/hour, quoted in writing first.
              Full payment is due after scope approval, before work begins.{" "}
              <a href="/additional-services">More services</a> ·{" "}
              <a href="/sample-report">See a sample report</a>
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="paper"
          aria-labelledby="how-title"
          style={{ paddingTop: 20 }}
        >
          <div className="wrap">
            <div className="eyebrow">how it works</div>
            <h2 id="how-title" className="statement serif">
              Three steps.{" "}
              <span className="hl">Nothing starts without your OK.</span>
            </h2>
            <div className="tape">
              <div>
                <b>01</b>Request the free check. Up to three issues, in plain
                English, by email.
              </div>
              <div>
                <b>02</b>Approve a written scope and price. Access and
                exclusions listed up front.
              </div>
              <div>
                <b>03</b>We fix the agreed list and send a before/after report.
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="paper"
          aria-labelledby="form-title"
          style={{ paddingTop: 40, scrollMarginTop: 24 }}
        >
          <div id="triage-form" style={{ position: "relative", top: -24 }} />
          <div className="wrap form-grid">
            <div className="form-side">
              <div className="eyebrow">free website check</div>
              <h2 id="form-title" className="statement serif">
                Send your URL.{" "}
                <span className="hl">Get three plain findings.</span>
              </h2>
              <p>
                We review one public page and email up to three issues we
                observed, plus a short screen recording walking through them. No
                account access needed. Prefer to talk? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call{" "}
                <a href="tel:+14707917361">(470) 791-7361</a>.
              </p>
              <p>
                This request is for business information only. Our services
                cover public-facing pages.
              </p>
            </div>
            <form className="form-receipt" onSubmit={handleTriageSubmit}>
              <div
                className="lab"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: 12,
                  color: "var(--blue)",
                }}
              >
                request slip
              </div>
              <div className="div" aria-hidden="true">
                = = = = = = = = = = = = = = = = = = = =
              </div>
              <div className="fields">
                <div className="field">
                  <label htmlFor="contact-name">
                    Your name <span>(optional)</span>
                  </label>
                  <input
                    id="contact-name"
                    value={triageForm.contactName}
                    onChange={setField("contactName")}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={triageForm.email}
                    onChange={setField("email")}
                    placeholder="name@business.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="business-name">
                    Business name <span>(optional)</span>
                  </label>
                  <input
                    id="business-name"
                    value={triageForm.businessName}
                    onChange={setField("businessName")}
                    placeholder="Your company name"
                    autoComplete="organization"
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-phone">
                    Phone <span>(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={triageForm.phone}
                    onChange={setField("phone")}
                    placeholder="(470) 000-0000"
                    autoComplete="tel"
                  />
                </div>
                <div className="field">
                  <label htmlFor="website-url">Website URL</label>
                  <input
                    id="website-url"
                    value={triageForm.websiteUrl}
                    onChange={setField("websiteUrl")}
                    placeholder="yourbusiness.com"
                    autoComplete="url"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="business-type">
                    Main concern <span>(optional)</span>
                  </label>
                  <input
                    id="business-type"
                    value={triageForm.businessType}
                    onChange={setField("businessType")}
                    placeholder="Slow on phones, form not working"
                    maxLength={500}
                  />
                </div>
              </div>
              <label className="consent" htmlFor="triage-consent">
                <input
                  id="triage-consent"
                  type="checkbox"
                  checked={triageForm.consent}
                  onChange={setField("consent")}
                />
                <span>
                  I agree to be contacted about this request and understand this
                  form is for business information only, not passwords, payment
                  details or other confidential information.
                </span>
              </label>
              <button
                className="submit"
                type="submit"
                disabled={triageSubmitting}
              >
                {triageSubmitting ? "Sending…" : "Get my free check"}
              </button>
              <div className="status" aria-live="polite">
                {triageMessage ? <p className="ok">{triageMessage}</p> : null}
                {triageError ? (
                  <p className="err">Not sent: {triageError}</p>
                ) : null}
              </div>
            </form>
          </div>
        </section>

        <section className="close" aria-label="Closing">
          <div className="spread" aria-hidden="true">
            <div className="row">
              <span>checked</span>
              <span>by a</span>
              <span>person.</span>
            </div>
            <div className="row">
              <span>scoped</span>
              <span>in</span>
              <span>writing.</span>
            </div>
          </div>
          <p className="sr-only">Checked by a person. Scoped in writing.</p>
          <nav className="foot-links" aria-label="Footer">
            <a href="/proof">case study</a>
            <a href="/portfolio">portfolio</a>
            <a href="/sample-report">sample report</a>
            <a href="/additional-services">more services</a>
            <a href="/website-check">speed check</a>
            <a href="/privacy">privacy</a>
            <a href="/terms">terms</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>email</a>
          </nav>
          <div className="socials">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`BADGRTechnologies on ${name}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <p className="legal">
            BADGRTechnologies LLC · Lawrenceville, Georgia · (470) 791-7361
          </p>
        </section>
      </main>
    </div>
  );
}

function ProofSlip({
  label,
  big,
  text,
}: {
  label: string;
  big: string;
  text: string;
}) {
  return (
    <div className="slip flip">
      <div className="lab">{label}</div>
      <div className="div" aria-hidden="true">
        * * * * * * * * * * * * *
      </div>
      <div className="big">{big}</div>
      {text}
    </div>
  );
}
