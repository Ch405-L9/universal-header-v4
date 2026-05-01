import {
  ArrowLeft,
  CheckCircle2,
  FileSearch,
  Gauge,
  Shield,
  Smartphone,
} from "lucide-react";
import { Link } from "wouter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { buildGraph, buildWebPageSchema, orgEntity, websiteEntity } from "@/lib/schema";

const reportAreas = [
  {
    title: "Speed + Core Experience",
    description:
      "Flag slow pages, heavy assets, and layout friction that make the site feel harder to trust or use.",
    icon: Gauge,
  },
  {
    title: "Mobile Lead Path",
    description:
      "Check whether a visitor on a phone can quickly understand the offer, find the next step, and complete it without confusion.",
    icon: Smartphone,
  },
  {
    title: "Trust + Policy Signals",
    description:
      "Review the trust cues, service clarity, and page-level signals that help a small business feel established and safe to contact.",
    icon: Shield,
  },
];

const reportSteps = [
  "Executive summary written in plain English",
  "Highest-priority issues by page or section",
  "What to fix now versus what can wait",
  "Before-and-after thinking for the top opportunities",
  "Recommended next step: patch, optimize, or rebuild",
];

export default function SampleReportPage() {
  usePageMeta({
    title: "Sample Report | BADGRTechnologies",
    description:
      "Preview how BADGR structures a lead leak report without relying on fabricated case studies or invented client metrics.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/sample-report#page",
        name: "Sample Report | BADGRTechnologies",
        description:
          "Preview how BADGR structures a lead leak report without relying on fabricated case studies or invented client metrics.",
        url: "https://badgrtech.com/sample-report",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          { name: "Sample Report", url: "https://badgrtech.com/sample-report" },
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
              className="mb-6 rounded-none border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary"
            >
              Sample Report
            </Badge>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              What A Lead Leak Report Looks Like
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              This is a proof page, not a fabricated case study. It shows how
              BADGR frames issues, priorities, and next steps when reviewing a
              lead-driven website.
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
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-zinc-800 bg-zinc-950/80 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-mono text-2xl text-white">
                <FileSearch className="h-5 w-5 text-primary" />
                Report Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-zinc-300">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm uppercase tracking-[0.16em] text-primary">
                  Executive Summary Example
                </p>
                <p className="mt-4 text-base leading-8 text-zinc-300">
                  The site appears credible at first glance, but the path from
                  homepage to contact is carrying more friction than it should.
                  Mobile users are likely to feel the slowdown first. The
                  homepage asks for trust before it earns it, and the main calls
                  to action compete with each other instead of guiding the next
                  step clearly.
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
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
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
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-red-300">
                      Priority 1
                    </p>
                    <p className="mt-2 text-base text-white">
                      Reduce above-the-fold clutter so the primary offer and CTA
                      are obvious within the first few seconds.
                    </p>
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-amber-200">
                      Priority 2
                    </p>
                    <p className="mt-2 text-base text-white">
                      Tighten the mobile contact path and remove the extra
                      friction between service explanation and form submission.
                    </p>
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-primary/10 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-primary">
                      Priority 3
                    </p>
                    <p className="mt-2 text-base text-white">
                      Make trust signals more visible so the business feels
                      easier to contact without overloading the page with noise.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-[0.12em] text-white">
                  What The Client Receives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-zinc-300">
                {reportSteps.map(step => (
                  <div key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-[0.12em] text-white">
                  Important Constraint
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-zinc-400">
                This page intentionally avoids client names, fabricated metrics,
                and made-up testimonials. It is here to show the decision-making
                process, not to pretend proof exists where it does not.
              </CardContent>
            </Card>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">
                Next Step
              </p>
              <p className="mt-3 text-base leading-7 text-zinc-300">
                If the sample report style fits what you need, the next move is
                a short triage call to see whether the site needs a scan, a
                14-day fix, or a rebuild recommendation.
              </p>
              <Button asChild className="mt-6 rounded-none uppercase tracking-[0.16em]">
                <a href="/#contact">Request Triage Call</a>
              </Button>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
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
