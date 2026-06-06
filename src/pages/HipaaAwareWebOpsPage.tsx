import { ArrowLeft, FileText, LockKeyhole, MonitorCheck, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildGraph, buildWebPageSchema, orgEntity, websiteEntity } from "@/lib/schema";
import { useJsonLd, usePageMeta } from "@/lib/seo";

const focusAreas = [
  {
    title: "No-PHI Form Boundaries",
    description:
      "Public forms should ask for business-safe contact details, clearly warn against PHI, and route sensitive workflows to appropriate systems.",
    icon: LockKeyhole,
  },
  {
    title: "NPP + Privacy Visibility",
    description:
      "Notice of Privacy Practices, privacy policy, accessibility, and contact paths should be easy for patients and practice teams to find.",
    icon: FileText,
  },
  {
    title: "Core Web Vitals Discipline",
    description:
      "Fast mobile pages, stable layouts, and low interaction delay support patient trust before a person reaches the front desk.",
    icon: MonitorCheck,
  },
  {
    title: "BAA-Ready Operations",
    description:
      "When a scope touches ePHI or covered workflows, vendor responsibilities, access boundaries, and BAAs should be confirmed in writing.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "Does BADGRTechnologies make a website HIPAA compliant?",
    answer:
      "BADGRTechnologies supports HIPAA-aware website operations and signs BAAs when applicable. Compliance depends on legal, administrative, technical, and operational controls beyond a public website, so final compliance decisions should be confirmed with counsel or a compliance owner.",
  },
  {
    question: "What should a medical practice website form avoid collecting?",
    answer:
      "Public marketing forms should avoid patient records, medical history, passwords, insurance details, clinical questions, and other PHI unless the workflow is specifically designed, documented, and approved for that data.",
  },
  {
    question: "Why do Core Web Vitals matter for medical practices?",
    answer:
      "Slow or unstable pages create doubt before a patient calls, books, or reaches a portal. Core Web Vitals are not just technical scores; they are part of the first trust impression.",
  },
];

export default function HipaaAwareWebOpsPage() {
  usePageMeta({
    title: "HIPAA-Aware Website Operations for Medical Practices | BADGRTechnologies",
    description:
      "HIPAA-aware website operations for small medical practices: no-PHI form checks, NPP visibility, Core Web Vitals, accessibility basics, and BAA-ready web support.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/hipaa-aware-web-operations#page",
        name: "HIPAA-Aware Website Operations for Medical Practices",
        description:
          "HIPAA-aware website operations for small medical practices, including public-form risk checks, NPP visibility, performance, accessibility basics, and BAA-ready support.",
        url: "https://badgrtech.com/hipaa-aware-web-operations",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          {
            name: "HIPAA-Aware Website Operations",
            url: "https://badgrtech.com/hipaa-aware-web-operations",
          },
        ],
      }),
      {
        "@type": "FAQPage",
        "@id": "https://badgrtech.com/hipaa-aware-web-operations#faq",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ),
    "hipaa-aware-web-ops-graph",
  );

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="border-b border-primary/20 bg-[#020816]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl">
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase text-primary-bright"
            >
              Medical Web Operations
            </Badge>
            <h1 className="font-sans text-4xl font-bold uppercase text-white md:text-6xl">
              HIPAA-Aware Website Operations for Medical Practices
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              BADGRTechnologies helps small medical practices keep public-facing
              websites faster, clearer, safer to use, and easier to trust
              without turning a marketing form into a patient-data intake point.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="rounded-none uppercase">
                <a href="/#contact">Request Triage Call</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none uppercase"
              >
                <Link href="/sample-report">View Sample Risk & Trust Report</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardHeader>
              <CardTitle className="text-2xl font-bold uppercase text-white">
                What HIPAA-Aware Means Here
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-7 text-zinc-300">
              <p>
                This is operational website support, not legal advice or a
                compliance certification. The work focuses on public website
                risk signals: form boundaries, privacy and NPP visibility,
                accessibility basics, technical performance, and clear
                documentation of what the site should and should not collect.
              </p>
              <p>
                When a project touches ePHI, BADGRTechnologies confirms scope,
                access, tools, responsibilities, and BAA requirements before
                work proceeds.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <Card key={area.title} className="border-zinc-800 bg-zinc-950/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-base font-bold uppercase text-white">
                      <Icon className="h-5 w-5 text-primary-bright" />
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-zinc-400">
                    {area.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <section className="mt-16 border-t border-primary/20 pt-12">
          <h2 className="font-sans text-3xl font-bold uppercase text-white md:text-4xl">
            Practical Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="border border-zinc-800 bg-zinc-950/70 p-5">
                <summary className="cursor-pointer font-bold text-white">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium uppercase text-primary-bright transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </article>
    </div>
  );
}
