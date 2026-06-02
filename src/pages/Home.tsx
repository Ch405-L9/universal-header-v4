import {
  ArrowRight,
  Check,
  Clock,
  FileSearch,
  Gauge,
  ListChecks,
  Shield,
  Smartphone,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { CheckoutButton } from "@/components/CheckoutButton";
import type { ServiceId } from "@/lib/payment";
import {
  aiConsultationService,
  buildFAQSchema,
  buildGraph,
  buildWebPageSchema,
  orgEntity,
  webOptimizationService,
  websiteEntity,
} from "@/lib/schema";
import { fullFaqs, optimizationHowTo } from "@/lib/content-graph";
import { recommendPackage } from "@/lib/funnel";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { cn } from "@/lib/utils";

const serviceHighlights = [
  {
    title: "Speed + Performance Fixes",
    description:
      "Clean up slow-loading pages, heavy assets, and technical friction that pushes good leads away before they ever call or submit.",
    icon: Gauge,
  },
  {
    title: "CTA + Form Flow Improvements",
    description:
      "Tighten the path from page view to booked call with clearer calls to action, less confusion, and fewer broken lead-capture moments.",
    icon: Zap,
  },
  {
    title: "Trust + Policy Cleanup",
    description:
      "Surface the pages, signals, and on-site clarity that help service businesses look more legitimate and easier to trust.",
    icon: Shield,
  },
];

const projectPackages = [
  {
    serviceId: "diagnostic-scan" as ServiceId,
    tier: "Entry Scan",
    title: "CASH-MEDICAL DIAGNOSTIC SCAN",
    price: "From $750",
    suffix: "/one-time",
    description:
      "A focused review for med-spas, dental, chiropractic, PT, and other cash-pay practices that need clear priorities before spending more on ads or a rebuild.",
    features: [
      "Mobile speed and lead-path review",
      "CTA, call, and booking friction notes",
      "Trust, policy, and no-PHI form gap check",
      "Plain-English owner summary and fix order",
    ],
    cta: "REQUEST SCAN",
    featured: false,
  },
  {
    serviceId: "lead-leak-fix" as ServiceId,
    tier: "Most Popular",
    title: "14-DAY CASH-MEDICAL LEAD LEAK FIX",
    price: "From $2,500",
    suffix: "/one-time",
    description:
      "Scan, fix, and prove the highest-impact issues that make high-value patients hesitate before calling, booking, or submitting a consult request.",
    features: [
      "Priority fixes across your highest-intent pages",
      "Performance, CTA, mobile, and form-flow improvements",
      "Before/after observations and owner-ready report",
      "Retainer recommendation only if it clearly helps",
    ],
    cta: "BOOK TRIAGE CALL",
    featured: true,
  },
  {
    serviceId: "rebuild-lite" as ServiceId,
    tier: "Expansion",
    title: "CONVERSION REBUILD LITE",
    price: "From $6,500",
    suffix: "/project",
    description:
      "A conversion-first refresh for practices whose current site needs more than patchwork fixes but not a full custom agency build.",
    features: [
      "Best for compact sites and core service pages",
      "Updated page structure and conversion flow",
      "Cash-medical messaging and trust hierarchy",
      "Built from audit findings, not guesswork",
    ],
    cta: "ASK ABOUT REBUILD",
    featured: false,
  },
];

const supportPlans = [
  {
    name: "Local Presence Guard",
    description:
      "Starting at $300/month for quarterly technical checks and lightweight visibility support after the core optimization work is complete.",
  },
  {
    name: "Content + Visibility Support",
    description:
      "Starting at $750/month for ongoing website, local SEO, and content help for teams that want momentum after the initial fixes.",
  },
  {
    name: "Growth Support",
    description:
      "Starting at $1,500/month for practices ready to layer content, visibility, and light campaign support onto a stronger site.",
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

export default function Home() {
  const [siteUrl, setSiteUrl] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const [auditData, setAuditData] = useState<{ lcp?: string; fcp?: string; cls?: string; tbt?: string } | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditFallbackUrl, setAuditFallbackUrl] = useState<string | null>(null);
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
    title: "BADGRTechnologies | Web Optimization That Fixes Lead Leaks",
    description:
      "BADGRTechnologies helps small businesses fix website friction that quietly kills calls, form fills, and trust.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      webOptimizationService,
      aiConsultationService,
      buildWebPageSchema({
        id: "https://badgrtech.com/#homepage",
        name: "BADGRTechnologies | Web Optimization That Fixes Lead Leaks",
        description:
          "BADGRTechnologies helps small businesses fix website friction that quietly kills calls, form fills, and trust.",
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
    let url = siteUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    setAuditLoading(true);
    setAuditError(null);
    setAuditFallbackUrl(null);
    try {
      const res = await fetch(`/api/pagespeed-preview?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message ?? "Google could not read that score right now.");
      }
      setAuditScore(data.score);
      setAuditData(data.metrics);
    } catch (error) {
      setAuditFallbackUrl(url);
      setAuditError(
        error instanceof Error
          ? error.message
          : "Google could not read that score right now. You can still request the free manual audit.",
      );
    } finally {
      setAuditLoading(false);
    }
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
          practiceType: "Other",
          businessType: triageForm.businessType,
          websiteUrl: normalizeHttpsUrl(triageForm.websiteUrl),
          consent: triageForm.consent,
          website: "",
        }),
      });

      const body = await res.json().catch(() => ({} as { message?: string }));

      if (!res.ok) {
        throw new Error(body.message ?? "The request could not be sent. Please email hello@badgrtech.com.");
      }

      setTriageMessage(body.message ?? "Your request was sent. We will follow up within 48 hours.");
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
      setTriageError(err instanceof Error ? err.message : "The request could not be sent. Please email hello@badgrtech.com.");
    } finally {
      setTriageSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useScrollDepth((_id) => {
    // milestone reached — future: send to analytics
  });


  return (
    <Layout>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg-1600.avif"
            srcSet="/images/hero-bg-640.avif 640w, /images/hero-bg-1024.avif 1024w, /images/hero-bg-1600.avif 1600w"
            sizes="100vw"
            width="1600"
            height="900"
            fetchPriority="high"
            alt="Atlanta skyline hero background"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/52 to-background/18"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/18 via-transparent to-background/78"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07]"></div>
          <div className="absolute top-[18%] left-[58%] h-48 w-48 rounded-full bg-amber-200/18 blur-[100px]"></div>
          <div className="absolute bottom-[16%] right-[12%] h-40 w-40 rounded-full bg-primary/18 blur-[110px]"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="motion-safe:animate-[fadeSlideLeft_0.7s_ease_both] space-y-8 pl-4 md:pl-12 lg:col-span-7">
            <Badge
              variant="outline"
              className="rounded-none border-primary/50 bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-300 backdrop-blur-sm"
            >
              Web Optimization For Lead-Driven Small Businesses
            </Badge>

            <h1 className="font-mono text-5xl font-bold leading-[0.9] tracking-tight text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
              Stop Losing
              <br />
              Leads To A
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                Slow, Confusing Site
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-lg leading-relaxed text-zinc-300 md:text-2xl">
              BADGRTechnologies helps cash-pay medical and service businesses tighten the parts of
              their website that quietly kill calls, form fills, and trust, then
              shows exactly what changed in a clear before-and-after report.
            </p>

            <div className="flex flex-col gap-6 pt-2 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="group h-16 rounded-none border border-primary bg-black/80 px-10 text-lg font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(0,0,255,0.2)] transition-all hover:bg-primary/20 hover:shadow-[0_0_50px_rgba(0,0,255,0.4)]"
              >
                <Link href="/free-lighthouse-scan#scan-form">
                  Get My Free Lead Leak Audit
                  <Zap className="ml-3 h-5 w-5 text-primary transition-colors group-hover:text-white" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-16 rounded-none border-white/10 px-8 text-lg uppercase tracking-[0.18em] text-zinc-400 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <a href="#proof">See Proof</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 pr-12 text-sm text-zinc-400">
              {[
                "Cash-medical lead path focus",
                "Transparent pricing ranges",
                "Plain-English proof, not tech fog",
              ].map(item => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            id="audit"
            className="relative motion-safe:animate-[fadeSlideRight_0.7s_ease_0.2s_both] lg:col-span-5"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-cyan-500 blur opacity-30"></div>
            <Card className="relative border-primary/50 bg-card/80 shadow-2xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="font-mono text-2xl">
                  FREE LEAD LEAK PREVIEW
                </CardTitle>
                <CardDescription>
                  Drop in your website and preview the kind of issues we would
                  review together on a triage call.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {auditScore === null ? (
                  <form onSubmit={handleAudit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        placeholder="yourbusiness.com"
                        className={cn("h-12 border-primary/30 bg-background/50 font-mono focus:border-primary", auditError && "border-red-500 focus:border-red-500")}
                        value={siteUrl}
                        onChange={e => { setSiteUrl(e.target.value); setAuditError(null); }}
                        required
                      />
                      {auditError && (
                        <p className="text-xs leading-5 text-red-300">{auditError}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="h-12 w-full text-lg font-bold"
                      disabled={auditLoading}
                    >
                      {auditLoading ? (
                        <span className="flex items-center gap-2">
                          <Clock className="h-5 w-5 animate-spin" />
                          ANALYZING...
                        </span>
                      ) : (
                        "PREVIEW MY LEAD LEAKS"
                      )}
                    </Button>
                    {auditError && auditFallbackUrl ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-none border-primary/50 text-xs font-bold uppercase tracking-widest text-primary-bright hover:bg-primary/10"
                        onClick={() => {
                          window.location.href = `/free-lighthouse-scan?url=${encodeURIComponent(auditFallbackUrl)}#scan-form`;
                        }}
                      >
                        Request Manual Free Audit
                      </Button>
                    ) : null}
                  </form>
                ) : (() => {
                  const rec = recommendPackage(auditScore!);
                  const scoreColor = auditScore! >= 90 ? "text-green-500" : auditScore! >= 50 ? "text-yellow-500" : "text-red-500";
                  return (
                    <div className="animate-in zoom-in-95 space-y-5 duration-300">
                      <div className="flex justify-center gap-8 text-center">
                        <div>
                          <div className={`mb-1 text-4xl font-bold ${scoreColor}`}>{auditScore}</div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Site Score</div>
                        </div>
                        <div>
                          <div className="mb-1 text-4xl font-bold text-green-500">90+</div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Fix Potential</div>
                        </div>
                      </div>
                      {auditData && (
                        <div className="grid grid-cols-3 gap-2 text-center">
                          {[
                            { label: "LCP", val: auditData.lcp },
                            { label: "FCP", val: auditData.fcp },
                            { label: "CLS", val: auditData.cls },
                          ].map(m => (
                            <div key={m.label} className="rounded border border-zinc-700 bg-zinc-900 p-2">
                              <div className="font-mono text-sm font-bold text-white">{m.val ?? "—"}</div>
                              <div className="text-[10px] uppercase tracking-wider text-zinc-400">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                        <h4 className="mb-2 flex items-center gap-2 font-bold text-red-400">
                          <Shield className="h-4 w-4" />
                          Priority Areas To Review
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Mobile page speed and homepage load friction</li>
                          <li>• CTA clarity and contact-form conversion gaps</li>
                          <li>• Missing trust, policy, and service-page signals</li>
                        </ul>
                      </div>

                      <div className="rounded-lg border border-primary/40 bg-primary/5 p-4 space-y-1">
                        <div className="text-[10px] uppercase tracking-widest text-indigo-400">Recommended for your score</div>
                        <div className="font-mono text-lg font-bold text-white">{rec.packageName}</div>
                        <div className="text-xs text-zinc-300">{rec.tier} · {rec.price}</div>
                        <p className="text-sm text-zinc-300 leading-relaxed pt-1">{rec.reason}</p>
                        <p className="text-xs text-indigo-400 pt-1">{rec.urgency}</p>
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        <Button
                          type="button"
                          onClick={() => {
                            window.location.href = "/free-lighthouse-scan#scan-form";
                          }}
                          className="h-11 w-full rounded-none bg-primary font-bold uppercase tracking-widest text-white hover:bg-primary/80"
                        >
                          Claim Free Audit
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => scrollToSection(rec.anchor)}
                          className="h-9 w-full rounded-none text-xs uppercase tracking-widest text-zinc-300 hover:text-white"
                        >
                          See Package Details
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative bg-zinc-950 py-24">
        <div id="services" className="absolute -top-24" />
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold uppercase tracking-[0.08em] md:text-5xl">
              Web Optimization That Fixes What Prospects Actually Feel
            </h2>
            <p className="text-lg text-muted-foreground">
              Clear scopes for businesses that need a faster, cleaner, more
              trustworthy website before they pile on more marketing.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300">
              The core offer is one-time optimization work first. Ongoing
              support comes later, only if it is useful after the site is in a
              stronger place.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {serviceHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <ScrollReveal key={item.title} delay={index * 100} direction="up">
                  <div className="rounded-xl border border-zinc-800 bg-black/30 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary-bright">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mb-3 font-sans text-xl font-bold uppercase tracking-[0.04em] text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {projectPackages.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 120} direction="up">
              <Card
                className={cn(
                  "group relative border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-primary/50",
                  card.featured &&
                    "border-primary bg-zinc-900/80 shadow-[0_0_30px_rgba(0,0,255,0.15)] md:-translate-y-4"
                )}
              >
                {card.featured ? (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    {card.tier}
                  </div>
                ) : null}
                <CardHeader>
                  <Badge
                    className={cn(
                      "mb-4 w-fit border-zinc-700 bg-zinc-800 text-zinc-300",
                      card.featured && "border-primary-bright/60 bg-primary/20 text-primary-bright"
                    )}
                  >
                    {card.tier}
                  </Badge>
                  <CardTitle className="text-2xl font-mono">
                    {card.title}
                  </CardTitle>
                  <div className="mt-4">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-zinc-300">
                      Starting at
                    </p>
                    <span className="text-4xl font-bold">{card.price.replace("From ", "")}</span>
                    <span className="ml-2 text-muted-foreground">
                      {card.suffix}
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {card.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary-bright" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    type="button"
                    onClick={() => scrollToSection("#contact")}
                    variant={card.featured ? "default" : "outline"}
                    className={cn(
                      "w-full rounded-none border-zinc-700 font-bold uppercase tracking-widest",
                      card.featured
                        ? "border border-primary-bright bg-black text-primary-bright shadow-[0_0_20px_rgba(0,0,255,0.2)] hover:bg-primary/20 hover:text-white"
                        : "hover:bg-zinc-800"
                    )}
                  >
                    {card.cta}
                  </Button>
                  {card.serviceId ? (
                    <CheckoutButton
                      serviceId={card.serviceId}
                      label={`Reserve with ${card.serviceId === "diagnostic-scan" ? "$250" : card.serviceId === "lead-leak-fix" ? "$750" : "$2,000"} deposit`}
                      variant="outline"
                      className="w-full rounded-none border-zinc-700 font-bold uppercase tracking-widest"
                    />
                  ) : null}
                </CardFooter>
              </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-zinc-950 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-primary-bright/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary-bright"
            >
              See It In Action
            </Badge>
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-[0.06em] text-white md:text-4xl">
              Web Optimization Built For Contractors &amp; Service Businesses
            </h2>
            <p className="mb-10 text-base text-zinc-400">
              A quick look at what the process delivers — and why it matters
              more than a site refresh.
            </p>
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/30 to-cyan-500/20 blur opacity-40"></div>
              <video
                className="relative w-full rounded-xl"
                controls
                preload="none"
                poster="/images/video-poster-386.avif"
              >
                <source src="/videos/badgrtech-intro.webm" type="video/webm" />
                <source src="/videos/badgrtech-intro.mp4" type="video/mp4" />
                <track kind="captions" src="" srcLang="en" label="No captions available" default />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section
        id="proof"
        className="relative overflow-hidden bg-black py-28"
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-[1.15rem] border border-zinc-800 bg-zinc-950/50 p-3">
                <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl"></div>
                <img
                  src="/images/ai-dashboard-sm.avif"
                  srcSet="/images/ai-dashboard-sm.avif 560w, /images/ai-dashboard.avif 900w"
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  alt="Preview of a sample optimization report"
                  width="900"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  className="relative w-full rounded-xl border border-zinc-800 shadow-2xl"
                />
              </div>
            </div>
            <div className="order-1 space-y-8 lg:order-2">
              <Badge
                variant="outline"
                className="rounded-none border-primary-bright/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary-bright"
              >
                Proof Asset
              </Badge>
              <h2 className="font-sans text-4xl font-bold uppercase leading-tight tracking-[0.05em] md:text-6xl">
                SHOW THE WORK.
                <br />
                <span className="text-indigo-400">DO NOT FAKE THE RESULTS.</span>
              </h2>
              <p className="max-w-xl text-xl text-muted-foreground">
                Instead of placeholder case studies, the funnel points to a
                sample report that shows what gets checked, what gets fixed, and
                how decisions are made.
              </p>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <FileSearch className="text-primary-bright" />
                  What The Sample Report Shows
                </h3>
                <div className="space-y-4 text-sm leading-7 text-zinc-300">
                  <div className="flex gap-3">
                    <ListChecks className="mt-1 h-4 w-4 shrink-0 text-primary-bright" />
                    <p>Which pages lose attention, trust, or action first.</p>
                  </div>
                  <div className="flex gap-3">
                    <Smartphone className="mt-1 h-4 w-4 shrink-0 text-primary-bright" />
                    <p>How mobile friction affects calls and form completion.</p>
                  </div>
                  <div className="flex gap-3">
                    <TriangleAlert className="mt-1 h-4 w-4 shrink-0 text-primary-bright" />
                    <p>Which issues should be fixed immediately versus later.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none uppercase tracking-[0.16em]">
                  <a href="/sample-report">Open Sample Report</a>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="rounded-none uppercase tracking-[0.16em]"
                >
                  Request A Triage Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#05070d] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <Badge
                variant="outline"
                className="rounded-none border-primary-bright/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary-bright"
              >
                Practical Questions
              </Badge>
              <h2 className="mt-6 font-sans text-4xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
                QUESTIONS BEFORE YOU COMMIT
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-400">
                The most common questions before a scan, 14-day fix, or rebuild
                recommendation starts.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((item, i) => (
                <ScrollReveal key={item.question} delay={i * 60} direction="up">
                  <details className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
                    <summary className="cursor-pointer list-none font-sans text-lg font-bold uppercase tracking-[0.04em] text-white">
                      {item.question}
                    </summary>
                    <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-400">
                      {item.answer}
                    </p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="relative bg-[#05070d] py-28">
        <div id="milestones" className="absolute -top-24" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8 lg:max-w-xl">
              <h2 className="font-sans text-4xl font-bold uppercase tracking-[0.05em] md:text-5xl">
                WHAT WE FIX IN 14 DAYS
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-sm bg-primary/10 p-3">
                    <Gauge className="h-6 w-6 text-primary-bright" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold">
                      Speed And Friction Problems
                    </h3>
                    <p className="text-muted-foreground">
                      Heavy pages, unclear hierarchy, and mobile lag that make
                      people bounce before they act.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-sm bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary-bright" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold">
                      Trust And Conversion Gaps
                    </h3>
                    <p className="text-muted-foreground">
                      Missing policy pages, weak calls to action, and confusing
                      lead paths that make a real business feel less credible
                      than it is.
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="link"
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="group h-auto p-0 text-lg font-bold text-white"
              >
                BOOK A 15-MINUTE TRIAGE CALL
                <ArrowRight className="ml-2 h-5 w-5 text-primary-bright transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
                <div className="mb-6 flex items-center gap-3 text-primary-bright">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    Scan → Fix → Proof
                  </span>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans text-lg font-bold uppercase text-white">
                      Days 1-3
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                      Audit your highest-value pages, review mobile behavior,
                      test form flow, and document the biggest trust leaks.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold uppercase text-white">
                      Days 4-10
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                      Implement the fixes that matter most first, then recheck
                      the pages after each major improvement.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold uppercase text-white">
                      Days 11-14
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                      Package the work into a straightforward report with
                      before/after observations and the next best moves.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-400">
                  Optional Follow-On Support
                </h4>
                <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-300">
                  {supportPlans.map(plan => (
                    <div key={plan.name}>
                      <p className="font-bold text-white">{plan.name}</p>
                      <p className="text-zinc-400">{plan.description}</p>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 rounded-none uppercase tracking-[0.16em]"
                >
                  <Link href="/additional-services">View Follow-On Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-black py-24">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
              >
                Contact / Triage
              </Badge>
              <h2 className="font-sans text-4xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
                BOOK THE TRIAGE STEP
              </h2>
              <p className="text-lg leading-8 text-zinc-400">
                Share the basics and we can start with a short review of the
                site, the biggest friction points, and whether the right next
                step is a scan, a 14-day fix, or a rebuild.
              </p>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-sm leading-7 text-zinc-300">
                <p className="font-bold uppercase tracking-[0.16em] text-indigo-400">
                  What To Send
                </p>
                <p className="mt-3">
                  Your website, business type, and the one thing the site is not
                  doing well enough right now.
                </p>
                <p className="mt-4 text-zinc-400">
                  If you prefer, you can also email{" "}
                  <a
                    href="mailto:hello@badgrtech.com"
                    className="text-primary hover:text-white"
                  >
                    hello@badgrtech.com
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+14702236127"
                    className="text-primary hover:text-white"
                  >
                    (470) 223-6127
                  </a>
                  .
                </p>
              </div>
            </div>

            <Card className="border-primary/30 bg-zinc-950/80 shadow-2xl">
              <CardHeader>
                <CardTitle className="font-mono text-2xl">
                  TRIAGE REQUEST
                </CardTitle>
                <CardDescription>
                  This form sends your request directly to BADGRTechnologies.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleTriageSubmit}>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Your Name</Label>
                      <Input
                        id="contact-name"
                        value={triageForm.contactName}
                        onChange={e =>
                          setTriageForm(current => ({
                            ...current,
                            contactName: e.target.value,
                          }))
                        }
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={triageForm.email}
                        onChange={e =>
                          setTriageForm(current => ({
                            ...current,
                            email: e.target.value,
                          }))
                        }
                        placeholder="name@business.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        value={triageForm.businessName}
                        onChange={e =>
                          setTriageForm(current => ({
                            ...current,
                            businessName: e.target.value,
                          }))
                        }
                        placeholder="Your company name"
                        autoComplete="organization"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={triageForm.phone}
                        onChange={e =>
                          setTriageForm(current => ({
                            ...current,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="(470) 000-0000"
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="website-url">Website URL</Label>
                      <Input
                        id="website-url"
                        value={triageForm.websiteUrl}
                        onChange={e =>
                          setTriageForm(current => ({
                            ...current,
                            websiteUrl: e.target.value,
                          }))
                        }
                        placeholder="yourbusiness.com"
                        autoComplete="url"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Input
                        id="business-type"
                        value={triageForm.businessType}
                        onChange={e =>
                          setTriageForm(current => ({
                            ...current,
                            businessType: e.target.value,
                          }))
                        }
                        placeholder="Medical, home services, law, etc."
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-black/30 p-4">
                    <Checkbox
                      id="triage-consent"
                      checked={triageForm.consent}
                      onCheckedChange={checked =>
                        setTriageForm(current => ({
                          ...current,
                          consent: checked === true,
                        }))
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="triage-consent"
                      className="text-sm leading-6 text-zinc-300"
                    >
                      I agree to be contacted about this request and understand
                      this form is for business information only, not PHI,
                      patient records, passwords, or confidential medical
                      details.
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <Button
                    type="submit"
                    disabled={triageSubmitting}
                    className="rounded-none uppercase tracking-[0.16em]"
                  >
                    {triageSubmitting ? "Sending..." : "Send Triage Request"}
                  </Button>
                  <div aria-live="polite" className="min-h-5 text-sm">
                    {triageMessage ? (
                      <p className="text-green-400">{triageMessage}</p>
                    ) : null}
                    {triageError ? (
                      <p className="text-red-400">{triageError}</p>
                    ) : null}
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#020816] py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-8 font-sans text-4xl font-bold uppercase tracking-[0.04em] md:text-7xl">
            READY TO
            <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              {" "}
              FIX THE LEAKS?
            </span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-400">
            Start with a short triage call. We will look at the site, call out
            the most likely blockers, and tell you plainly whether the next move
            is a scan, a 14-day fix, or a rebuild.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="h-16 bg-primary px-12 text-lg font-bold text-white shadow-2xl hover:bg-primary/90"
            >
              REQUEST TRIAGE CALL
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-16 border-white/20 px-12 text-lg hover:bg-white/10"
            >
              <a href="/sample-report">SEE SAMPLE REPORT</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
