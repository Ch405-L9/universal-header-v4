import { ArrowLeft, LineChart, Search, Share2, Wrench } from "lucide-react";
import { Link } from "wouter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { buildGraph, buildWebPageSchema, orgEntity, websiteEntity } from "@/lib/schema";

const primaryItems = [
  "Performance tuning and page-speed cleanup",
  "Mobile UX and booking-path improvements",
  "Provider/service-page clarity and patient journey tightening",
  "PHI-aware form checks, trust signals, and conversion friction reduction",
];

const followOnGroups = [
  {
    title: "Practice Care",
    description:
      "Starting at $550/month for ongoing updates, uptime monitoring, PHI-aware form checks, accessibility basics, and local profile hygiene once the 14-day sprint is complete.",
    icon: Search,
  },
  {
    title: "Practice Growth Care",
    description:
      "Starting at $950/month for continuous site care plus provider/service page optimization, review workflows, and booking-path improvements.",
    icon: LineChart,
  },
  {
    title: "Optional Campaign Support",
    description:
      "Custom project pricing for practices layering in paid campaigns or deeper analytics on top of a hardened site.",
    icon: Share2,
  },
];

export default function AdditionalServicesPage() {
  usePageMeta({
    title: "Practice Care Services | BADGRTechnologies",
    description:
      "See BADGRTechnologies Practice Care, Practice Growth Care, and campaign support for small medical practice websites after the 14-day sprint.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/additional-services#page",
        name: "Practice Care Services | BADGRTechnologies",
        description:
          "See BADGRTechnologies Practice Care, Practice Growth Care, and campaign support for small medical practice websites after the 14-day sprint.",
        url: "https://badgrtech.com/additional-services",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          { name: "Practice Care Services", url: "https://badgrtech.com/additional-services" },
        ],
      }),
    ),
    "additional-services-graph",
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
              Practice Care Services
            </Badge>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              Practice Care After The Site Is Stronger
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              This page exists to support the core offer, not distract from it.
              BADGR leads with the Leak & Trust Fix Sprint first. These services
              are only useful after the medical practice site is clearer, faster,
              and safer to trust.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="rounded-none uppercase tracking-[0.16em]">
                <a href="/#contact">Talk Through Fit</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none uppercase tracking-[0.16em]"
              >
                <Link href="/">Back To Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold uppercase tracking-[0.06em] text-white">
                <Wrench className="h-5 w-5 text-primary" />
                Sprint First
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-zinc-300">
              <p>
                The core engagement remains the Leak & Trust Fix Sprint. We
                start by fixing the site issues that reduce patient trust, calls,
                form fills, booking clarity, and no-PHI safety.
              </p>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                {primaryItems.map(item => (
                  <div key={item} className="flex items-start gap-3 py-2">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {followOnGroups.map(group => {
              const Icon = group.icon;

              return (
                <Card key={group.title} className="border-zinc-800 bg-zinc-950/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg font-bold uppercase tracking-[0.12em] text-white">
                      <Icon className="h-5 w-5 text-primary" />
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-zinc-400">
                    {group.description}
                  </CardContent>
                </Card>
              );
            })}

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">
                Positioning Rule
              </p>
              <p className="mt-3 text-base leading-7 text-zinc-300">
                None of these follow-on services should outrank or overpower the
                primary Leak & Trust Fix Sprint in the main funnel.
              </p>
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
