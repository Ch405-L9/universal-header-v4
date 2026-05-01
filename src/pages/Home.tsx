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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import {
  aiConsultationService,
  buildFAQSchema,
  buildGraph,
  buildWebPageSchema,
  orgEntity,
  webOptimizationService,
  websiteEntity,
} from "@/lib/schema";
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
    tier: "Quick Start",
    title: "DIAGNOSTIC SCAN",
    price: "From $1,500",
    suffix: "/one-time",
    description:
      "A focused review for owners who need a clear outside view before committing to implementation work. Report delivered by end of week.",
    features: [
      "Website performance and UX review",
      "Lead path and CTA friction notes",
      "Trust and policy gap check",
      "Plain-English walkthrough with next steps",
    ],
    cta: "REQUEST SCAN",
    featured: false,
  },
  {
    tier: "Most Popular",
    title: "14-DAY LEAD LEAK FIX",
    price: "From $3,000",
    suffix: "/one-time",
    description:
      "Scan, fix, and prove the highest-impact issues killing calls, forms, and trust. Report by end of week — full fix window completes within 14 days once automation is set up.",
    features: [
      "Prioritized fix list across your highest-traffic pages",
      "Performance, CTA, mobile, and form-flow improvements",
      "Before/after observations and issue log",
      "Sample-ready report with next-step recommendations",
    ],
    cta: "BOOK TRIAGE CALL",
    featured: true,
  },
  {
    tier: "Expansion",
    title: "REBUILD LITE",
    price: "From $4,500",
    suffix: "/project",
    description:
      "A conversion-first refresh for businesses whose current site needs more than patchwork fixes but not a full custom rebuild.",
    features: [
      "Best for compact sites and core lead pages",
      "Updated page structure and conversion flow",
      "Retained brand feel with clearer messaging",
      "Built from the audit findings, not guesswork",
    ],
    cta: "ASK ABOUT REBUILD",
    featured: false,
  },
];

const supportPlans = [
  {
    name: "Local Presence Guard",
    description:
      "Quarterly technical checks and lightweight visibility support after the core optimization work is complete.",
  },
  {
    name: "Content + Visibility Support",
    description:
      "Ongoing website, local SEO, and content help for teams that want someone keeping momentum after the initial fixes.",
  },
  {
    name: "Growth Support",
    description:
      "A broader post-engagement option for businesses ready to layer content, visibility, and light campaign support onto a stronger site.",
  },
];

const faqs = [
  {
    question: "What do you usually fix first?",
    answer:
      "We start with the issues most likely to block calls, form submissions, and trust: speed, mobile friction, weak calls to action, broken form flow, and missing clarity on the most important pages.",
  },
  {
    question: "What if the site really needs a rebuild?",
    answer:
      "We will say that directly. If the right move is a lighter rebuild instead of piecemeal fixes, the report will spell that out so you are not paying to over-patch a site that cannot carry the load.",
  },
  {
    question: "Do you also handle SEO or social?",
    answer:
      "Yes, but only as follow-on support after the website itself is in a stronger place. The core offer here is web optimization first.",
  },
  {
    question: "Do you work only with law and medical businesses?",
    answer:
      "Those are strong fits, but the offer is designed for small service businesses that rely on inbound leads and need a clearer, faster, more trustworthy website.",
  },
  {
    question: "How quickly can a project start?",
    answer:
      "Most projects begin with a short triage call. From there we confirm fit, scope, and timing before the scan or 14-day engagement begins.",
  },
];

const GOOGLE_FORM_BASE = "https://docs.google.com/forms/d/e/1FAIpQLSd07X_1GqfruNFDC1zoWJ7JGK9G9JBuMCVlTFLOHIAIy-FIIA/viewform";

function buildPrefillUrl(fields: {
  businessName: string;
  email: string;
  websiteUrl: string;
  businessType: string;
  mainGoal: string;
}) {
  const params = new URLSearchParams({
    "entry.1102620579": fields.businessName,
    "entry.1701227056": fields.email,
    "entry.1023552079": fields.websiteUrl,
    "entry.2146047512": fields.businessType,
    "entry.1164846443": fields.mainGoal,
  });
  return `${GOOGLE_FORM_BASE}?usp=pp_url&${params.toString()}`;
}

export default function Home() {
  const [siteUrl, setSiteUrl] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const [triageForm, setTriageForm] = useState({
    businessName: "",
    email: "",
    websiteUrl: "",
    businessType: "",
    mainGoal: "",
  });

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
    ),
    "home-graph",
  );

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteUrl) return;
    setAuditLoading(true);
    setTimeout(() => {
      setAuditLoading(false);
      setAuditScore(62);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <Layout>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dsxpcwjwb/image/upload/w_1600,f_auto,q_80/v1773681245/hero-atlanta-cyber_hi8dnx.png"
            alt="Atlanta skyline hero background"
            className="h-full w-full object-cover opacity-90 saturate-[1.22] contrast-[1.12] brightness-[1.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/52 to-background/18"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/18 via-transparent to-background/78"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07]"></div>
          <div className="absolute top-[18%] left-[58%] h-48 w-48 rounded-full bg-amber-200/18 blur-[100px]"></div>
          <div className="absolute bottom-[16%] right-[12%] h-40 w-40 rounded-full bg-primary/18 blur-[110px]"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="animate-in slide-in-from-left-10 space-y-8 pl-4 duration-700 md:pl-12 lg:col-span-7">
            <Badge
              variant="outline"
              className="rounded-none border-primary/50 bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-primary backdrop-blur-sm"
            >
              Web Optimization For Lead-Driven Small Businesses
            </Badge>

            <h1 className="font-mono text-5xl font-bold leading-[0.9] tracking-tight text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
              Stop Losing
              <br />
              Leads To A
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                Slow, Confusing Site
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-lg leading-relaxed text-zinc-300 md:text-2xl">
              BADGRTechnologies helps small businesses tighten the parts of
              their website that quietly kill calls, form fills, and trust, then
              shows exactly what changed in a clear before-and-after report.
            </p>

            <div className="flex flex-col gap-6 pt-2 sm:flex-row">
              <Button
                size="lg"
                type="button"
                onClick={() => scrollToSection("#audit")}
                className="group h-16 rounded-none border border-primary bg-black/80 px-10 text-lg font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(0,0,255,0.2)] transition-all hover:bg-primary/20 hover:shadow-[0_0_50px_rgba(0,0,255,0.4)]"
              >
                Book 15-Minute Triage
                <Zap className="ml-3 h-5 w-5 text-primary transition-colors group-hover:text-white" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-16 rounded-none border-white/10 px-8 text-lg uppercase tracking-[0.18em] text-zinc-400 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Link href="/sample-report">See Sample Report</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 pr-12 text-sm text-zinc-400">
              {[
                "Funnel-first web optimization",
                "Transparent pricing ranges",
                "Clear proof, not fake case studies",
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
            className="relative animate-in slide-in-from-right-10 duration-700 delay-200 lg:col-span-5"
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
                        className="h-12 border-primary/30 bg-background/50 font-mono focus:border-primary"
                        value={siteUrl}
                        onChange={e => setSiteUrl(e.target.value)}
                        required
                      />
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
                  </form>
                ) : (
                  <div className="animate-in zoom-in-95 space-y-6 text-center duration-300">
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <div className="mb-1 text-4xl font-bold text-red-500">
                          {auditScore}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">
                          Current Site Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 text-4xl font-bold text-green-500">
                          92
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">
                          Fix Potential
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-left">
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

                    <div className="pt-2">
                      <p className="mb-4 text-sm">
                        Next step:{" "}
                        <span className="font-bold text-primary">
                          a short triage call with the highest-impact fixes
                        </span>
                      </p>
                      <Button
                        type="button"
                        onClick={() => scrollToSection("#pricing")}
                        className="h-12 w-full rounded-none border border-green-500/50 bg-black font-bold uppercase tracking-widest text-green-400 shadow-[0_0_20px_rgba(0,255,136,0.1)] hover:bg-green-500/10 hover:text-green-300"
                      >
                        VIEW SERVICE OPTIONS
                      </Button>
                    </div>
                  </div>
                )}
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
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500">
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
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
                      "mb-4 w-fit border-zinc-700 bg-zinc-800 text-zinc-400",
                      card.featured && "border-primary/50 bg-primary/20 text-primary"
                    )}
                  >
                    {card.tier}
                  </Badge>
                  <CardTitle className="text-2xl font-mono">
                    {card.title}
                  </CardTitle>
                  <div className="mt-4">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
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
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    onClick={() => scrollToSection("#contact")}
                    variant={card.featured ? "default" : "outline"}
                    className={cn(
                      "w-full rounded-none border-zinc-700 font-bold uppercase tracking-widest",
                      card.featured
                        ? "border border-primary bg-black text-primary shadow-[0_0_20px_rgba(0,0,255,0.2)] hover:bg-primary/20 hover:text-white"
                        : "hover:bg-zinc-800"
                    )}
                  >
                    {card.cta}
                  </Button>
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
              className="mb-6 rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
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
                poster="https://res.cloudinary.com/dsxpcwjwb/image/upload/w_1200,f_auto,q_80/v1776452115/hero-atlanta-cyber_c0cfqz.png"
              >
                <source
                  src="https://res.cloudinary.com/dsxpcwjwb/video/upload/v1776478771/BADGRTechnologies_-_Web_Optimization_for_Contractors_720p_wwuvet_iu1nfj.mp4"
                  type="video/mp4"
                />
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
                  src="https://res.cloudinary.com/dsxpcwjwb/image/upload/w_900,f_auto,q_80/v1776452113/ai-dashboard-holo_h8jfz2.png"
                  alt="Preview of a sample optimization report"
                  className="relative w-full rounded-xl border border-zinc-800 shadow-2xl brightness-[1.12]"
                />
              </div>
            </div>
            <div className="order-1 space-y-8 lg:order-2">
              <Badge
                variant="outline"
                className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
              >
                Proof Asset
              </Badge>
              <h2 className="font-sans text-4xl font-bold uppercase leading-tight tracking-[0.05em] md:text-6xl">
                SHOW THE WORK.
                <br />
                <span className="text-primary">DO NOT FAKE THE RESULTS.</span>
              </h2>
              <p className="max-w-xl text-xl text-muted-foreground">
                Instead of placeholder case studies, the funnel points to a
                sample report that shows what gets checked, what gets fixed, and
                how decisions are made.
              </p>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <FileSearch className="text-primary" />
                  What The Sample Report Shows
                </h3>
                <div className="space-y-4 text-sm leading-7 text-zinc-300">
                  <div className="flex gap-3">
                    <ListChecks className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <p>Which pages lose attention, trust, or action first.</p>
                  </div>
                  <div className="flex gap-3">
                    <Smartphone className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <p>How mobile friction affects calls and form completion.</p>
                  </div>
                  <div className="flex gap-3">
                    <TriangleAlert className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <p>Which issues should be fixed immediately versus later.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none uppercase tracking-[0.16em]">
                  <Link href="/sample-report">Open Sample Report</Link>
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
                className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
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
                    <Gauge className="h-6 w-6 text-primary" />
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
                    <Shield className="h-6 w-6 text-primary" />
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
                <ArrowRight className="ml-2 h-5 w-5 text-primary brightness-[1.4] transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
                <div className="mb-6 flex items-center gap-3 text-primary">
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
                <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
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
                <p className="font-bold uppercase tracking-[0.16em] text-primary">
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
                  This form prepares an email request with your project details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
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
                      placeholder="https://yourbusiness.com"
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
                      placeholder="Law, medical, home services, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="main-goal">Main Goal / Main Website Issue</Label>
                  <Textarea
                    id="main-goal"
                    value={triageForm.mainGoal}
                    onChange={e =>
                      setTriageForm(current => ({
                        ...current,
                        mainGoal: e.target.value,
                      }))
                    }
                    placeholder="What is the site not doing well enough right now?"
                    className="min-h-32"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild className="rounded-none uppercase tracking-[0.16em]">
                    <a
                      href={buildPrefillUrl(triageForm)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Send Triage Request
                    </a>
                  </Button>
                  <p className="text-sm text-zinc-400">
                    Opens Google Form with your info prefilled — one click to submit.
                  </p>
                </div>
              </CardFooter>
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
              <Link href="/sample-report">SEE SAMPLE REPORT</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
