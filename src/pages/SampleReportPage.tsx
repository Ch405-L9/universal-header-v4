import {
  ArrowLeft,
  CheckCircle2,
  FileSearch,
  Gauge,
  Mail,
  Shield,
  Smartphone,
} from "lucide-react";
import { Link } from "wouter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildGraph, buildWebPageSchema, orgEntity, websiteEntity } from "@/lib/schema";
import { useJsonLd, usePageMeta } from "@/lib/seo";

const reportAreas = [
  {
    title: "Speed + First Impression",
    description:
      "Translate load delays into plain consequences: people wait, lose confidence, and leave before they understand the offer.",
    icon: Gauge,
  },
  {
    title: "Mobile Call + Booking Path",
    description:
      "Check whether a phone visitor can see the right service, trust the practice, and call or book without hunting.",
    icon: Smartphone,
  },
  {
    title: "Trust + Compliance-Aware Signals",
    description:
      "Review policies, no-PHI language, service clarity, financing cues, testimonials, and proof that make a cash-pay or hybrid patient feel safer.",
    icon: Shield,
  },
];

const sampleScores = [
  ["Mobile Performance", "38"],
  ["Accessibility", "82"],
  ["Best Practices", "79"],
  ["SEO", "64"],
];

const sampleVitals = [
  ["First visible content", "3.9s"],
  ["Main hero finished loading", "7.4s"],
  ["Page shift while loading", "0.19"],
  ["Blocked button response", "610ms"],
];

const priorityNotes = [
  {
    label: "Priority 1",
    tone: "red",
    title: "Make the first screen simple enough to act on.",
    detail:
      "The visitor should not have to decode the page. In cash-pay medical, every extra second of confusion is like putting one more locked door between the patient and the front desk.",
  },
  {
    label: "Priority 2",
    tone: "amber",
    title: "Turn mobile calls and bookings into the obvious path.",
    detail:
      "Most prospects are checking from a phone. If the call button, consult button, and service promise are scattered, the site is asking a busy person to do office work before they can become a lead.",
  },
  {
    label: "Priority 3",
    tone: "blue",
    title: "Add trust without asking for private details.",
    detail:
      "A patient should see safety, professionalism, and next steps before a form asks for information. Forms should request business-safe contact details, not medical history or PHI.",
  },
];

const plainEnglishEmail = [
  "Your website is doing some things right, but it is making new visitors work too hard before they can trust you.",
  "Think of the site like your front desk. If someone walks in and the lights are dim, the signs are confusing, and the intake clipboard is hard to find, they may leave even if your care is excellent. Online, slow loading, unclear buttons, and weak trust signals create that same feeling.",
  "The first fix is not a giant rebuild. The first fix is to clean up the path: make the main service obvious, make mobile calling easy, reduce heavy page weight, and show the trust details a cash-pay patient needs before they reach out.",
  "For this type of site, I would start with the 14-Day Leak & Trust Fix Sprint. If the audit proves the foundation is too weak, I will say so plainly before you pay for patchwork that will not hold.",
];

const nextSteps = [
  "Confirm the site pages and services to review.",
  "Run Lighthouse, mobile UX, CTA, and trust-signal checks.",
  "Fix the highest-impact items first: speed, mobile call flow, form clarity, and trust language.",
  "Deliver a before/after report and a plain-English email summary you can actually understand.",
  "Recommend ongoing support only when the findings justify it.",
];

export default function SampleReportPage() {
  usePageMeta({
    title: "Sample Risk & Trust Report | BADGRTechnologies",
    description:
      "Preview a sanitized medical Risk & Trust report with speed, PHI-risk, accessibility, local visibility, and patient-flow findings.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/sample-report#page",
        name: "Sample Risk & Trust Report | BADGRTechnologies",
        description:
          "Preview a sanitized medical Risk & Trust report with speed, PHI-risk, accessibility, local visibility, and patient-flow findings.",
        url: "https://badgrtech.com/sample-report",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          { name: "Sample Risk & Trust Report", url: "https://badgrtech.com/sample-report" },
        ],
      }),
    ),
    "sample-report-graph",
  );

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="border-b border-primary/20 bg-[#020816]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl">
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary-bright"
            >
              Sanitized Sample Risk & Trust Report
            </Badge>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              Medical Risk & Trust Report
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              This sample uses an anonymized Atlanta-area medical practice specimen.
              Real names, screenshots, phone numbers, patient details, and
              identifying marks are intentionally excluded. The point is to show
              how BADGR turns technical findings into decisions a practice owner
              can understand.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="rounded-none uppercase tracking-[0.16em]">
                <Link href="/">Back To Home</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none uppercase tracking-[0.16em]"
              >
                <a href="/#contact">Request A Triage Call</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none uppercase tracking-[0.16em]"
              >
                <a href="/reports/cash-medical-lead-leak-sample.pdf">
                  Download Sample PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-zinc-800 bg-zinc-950/80 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-mono text-2xl text-white">
                <FileSearch className="h-5 w-5 text-primary-bright" />
                Report Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-zinc-300">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {sampleScores.map(([label, value]) => (
                  <div key={label} className="border border-zinc-800 bg-black/35 p-4 text-center">
                    <div className="font-mono text-3xl font-bold text-white">{value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm uppercase tracking-[0.16em] text-primary-bright">
                  Owner Summary Example
                </p>
                <p className="mt-4 text-base leading-8 text-zinc-300">
                  The site has the bones of a legitimate practice, but it feels
                  slower and less guided than the kind of visitor it wants to
                  attract. For a cash-pay patient, that matters. They are not
                  just looking for information; they are deciding whether this
                  practice feels safe enough to contact and valuable enough to
                  pay out of pocket.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-white">
                  What Gets Checked
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {reportAreas.map(area => {
                    const Icon = area.icon;

                    return (
                      <div
                        key={area.title}
                        className="rounded-xl border border-zinc-800 bg-black/30 p-5"
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary-bright">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
                          {area.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-zinc-400">
                          {area.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-white">
                  Example Priority Notes
                </h2>
                <div className="mt-6 space-y-4">
                  {priorityNotes.map(note => (
                    <div
                      key={note.label}
                      className={
                        note.tone === "red"
                          ? "rounded-xl border border-red-500/20 bg-red-500/10 p-5"
                          : note.tone === "amber"
                            ? "rounded-xl border border-amber-500/20 bg-amber-500/10 p-5"
                            : "rounded-xl border border-primary/20 bg-primary/10 p-5"
                      }
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-300">
                        {note.label}
                      </p>
                      <p className="mt-2 text-base font-bold text-white">{note.title}</p>
                      <p className="mt-3 text-sm leading-7 text-zinc-300">{note.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-black/30 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold uppercase tracking-[0.06em] text-white">
                  <Mail className="h-5 w-5 text-primary-bright" />
                  Customer-Facing Email Draft
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
                  {plainEnglishEmail.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-[0.12em] text-white">
                  Sample Core Signals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-zinc-300">
                {sampleVitals.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                    <p>{label}</p>
                    <p className="font-mono text-white">{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-[0.12em] text-white">
                  What The Client Receives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-zinc-300">
                {nextSteps.map(step => (
                  <div key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-bright" />
                    <p>{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-[0.12em] text-white">
                  Recommended Fit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-zinc-300">
                <p>
                  A site in this range usually fits the{" "}
                  <strong className="text-white">14-Day Leak & Trust Fix Sprint</strong>.
                  If the first audit proves the foundation cannot support the
                  goal, the honest recommendation becomes a conversion rebuild.
                </p>
                <p>
                  Ongoing support is only recommended when there is a clear
                  reason: local visibility, monthly content, monitoring, or
                  post-fix growth work.
                </p>
              </CardContent>
            </Card>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-primary-bright">
                Next Step
              </p>
              <p className="mt-3 text-base leading-7 text-zinc-300">
                Request a triage call if you want this style of plain-English
                Risk & Trust review on your own site.
              </p>
              <Button asChild className="mt-6 rounded-none uppercase tracking-[0.16em]">
                <a href="/free-lighthouse-scan#scan-form">Request Triage Call</a>
              </Button>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-primary-bright transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
