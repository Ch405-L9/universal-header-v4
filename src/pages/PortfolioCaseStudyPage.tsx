import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import PortfolioVisual from "@/components/portfolio/PortfolioVisual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioCaseMap } from "@/data/portfolio";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

type PortfolioCaseStudyPageProps = {
  slug: string;
};

const statusClassName = {
  "DIRECTLY VERIFIED": "border-emerald-400/30 text-emerald-300",
  DERIVED: "border-blue-300/30 text-blue-300",
  "RECORDED CLAIM": "border-amber-300/30 text-amber-200",
};

export default function PortfolioCaseStudyPage({
  slug,
}: PortfolioCaseStudyPageProps) {
  const portfolioCase = portfolioCaseMap[slug];

  usePageMeta({
    canonical: portfolioCase ? `/portfolio/${portfolioCase.slug}` : "/portfolio",
    title: portfolioCase
      ? `${portfolioCase.title} Case Study | BADGRTechnologies`
      : "Portfolio Case Study | BADGRTechnologies",
    description:
      portfolioCase?.description ??
      "BADGRTechnologies engineering portfolio case study.",
  });

  if (!portfolioCase) {
    return (
      <Layout>
        <section className="bg-[#05070d] py-28">
          <div className="container mx-auto px-4">
            <Badge
              variant="outline"
              className="rounded-none border-primary/50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
            >
              Portfolio
            </Badge>
            <h1 className="mt-5 font-sans text-4xl font-bold uppercase tracking-[0.05em] text-white">
              Case Not Found
            </h1>
            <Button asChild className="mt-8 rounded-none uppercase tracking-[0.16em]">
              <Link href="/portfolio">Back To Portfolio</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const previous = portfolioCase.previous
    ? portfolioCaseMap[portfolioCase.previous]
    : undefined;
  const next = portfolioCase.next ? portfolioCaseMap[portfolioCase.next] : undefined;

  return (
    <Layout>
      <article className="bg-[#05070d]">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.08]" />
          <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <Badge
                variant="outline"
                className="rounded-none border-primary/50 bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-primary"
              >
                {portfolioCase.category}
              </Badge>
              <h1 className="mt-7 max-w-[16ch] font-mono text-4xl font-bold uppercase leading-[0.95] tracking-normal text-white md:text-6xl lg:text-7xl">
                <span
                  className={cn(
                    portfolioCase.accent === "cyan" && "text-cyan-300"
                  )}
                >
                  {portfolioCase.title}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
                {portfolioCase.description}
              </p>
              <dl className="mt-8 grid grid-cols-1 gap-px bg-primary/20 p-px sm:grid-cols-2">
                {portfolioCase.heroMeta.map(item => (
                  <div key={item.label} className="bg-black/70 p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-sm text-zinc-300">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <PortfolioVisual visual={portfolioCase.visual} />
            </div>
          </div>
        </section>

        <section
          className="border-y border-primary/20 bg-black py-14"
          aria-labelledby={`${portfolioCase.slug}-reviewer-summary`}
        >
          <div className="container mx-auto px-4">
            <h2
              className="mb-5 font-mono text-sm uppercase tracking-[0.2em] text-primary"
              id={`${portfolioCase.slug}-reviewer-summary`}
            >
              Reviewer Summary
            </h2>
            <div className="grid gap-px bg-primary/20 p-px md:grid-cols-2 xl:grid-cols-3">
              {portfolioCase.summary.map(item => (
                <div key={item.label} className="bg-zinc-950 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                    {item.label}
                  </h3>
                  <p className="mt-6 text-sm leading-6 text-zinc-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {portfolioCase.proof ? (
          <section
            className="grid grid-cols-2 border-b border-primary/20 bg-black md:grid-cols-4"
            aria-label={`${portfolioCase.title} verified checkpoints`}
          >
            {portfolioCase.proof.map(item => (
              <div key={item.label} className="border-primary/10 p-5 md:border-r">
                <strong className="block font-mono text-2xl text-white">
                  {item.value}
                </strong>
                <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {item.label}
                </span>
              </div>
            ))}
          </section>
        ) : null}

        <section className="py-20">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <Badge
                variant="outline"
                className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
              >
                Engineering Narrative
              </Badge>
              <h2 className="mt-5 font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
                {portfolioCase.slug === "cwalts"
                  ? "Retrieval reliability under release gates."
                  : portfolioCase.slug === "badgr-bolt"
                    ? "Reading product with release integrity."
                    : portfolioCase.slug === "badgr-harness"
                      ? "Routing boundary corrected."
                      : portfolioCase.slug === "badgr-ai-ops"
                        ? "Recoverable handoffs over workspace noise."
                        : "Business funnel preserved while the stack hardened."}
              </h2>
            </div>
            <div className="grid gap-px bg-primary/20 p-px md:grid-cols-2">
              {portfolioCase.narrative.map(item => (
                <div key={item.title} className="bg-zinc-950 p-5">
                  <h3 className="font-mono text-sm uppercase tracking-[0.12em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {portfolioCase.visualSection ? (
          <section className="bg-black py-20">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <Badge
                  variant="outline"
                  className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
                >
                  {portfolioCase.visualSection.eyebrow}
                </Badge>
                <h2 className="mt-5 font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
                  {portfolioCase.visualSection.title}
                </h2>
              </div>
              <PortfolioVisual visual={portfolioCase.visualSection.visual} />
            </div>
          </section>
        ) : null}

        <section
          className="py-20"
          aria-labelledby={`${portfolioCase.slug}-verified-evidence`}
        >
          <div className="container mx-auto px-4">
            <div className="mb-8 max-w-3xl">
              <h2
                className="font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl"
                id={`${portfolioCase.slug}-verified-evidence`}
              >
                Verified Evidence
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-400">
                Each material claim is tied to a named evidence source and
                checkpoint.
              </p>
            </div>
            <div className="overflow-x-auto border border-primary/20">
              <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                <thead className="bg-black text-[10px] uppercase tracking-[0.16em] text-primary">
                  <tr>
                    <th className="border-b border-primary/20 p-4" scope="col">
                      Claim / result
                    </th>
                    <th className="border-b border-primary/20 p-4" scope="col">
                      Evidence
                    </th>
                    <th className="border-b border-primary/20 p-4" scope="col">
                      Status
                    </th>
                    <th className="border-b border-primary/20 p-4" scope="col">
                      Checkpoint/date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10 bg-zinc-950 text-zinc-300">
                  {portfolioCase.evidence.map(item => (
                    <tr key={`${item.claim}-${item.checkpoint}`}>
                      <td className="max-w-md p-4 leading-7">{item.claim}</td>
                      <td className="p-4">
                        {item.href ? (
                          <a
                            href={item.href}
                            rel="noreferrer"
                            target="_blank"
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            {item.evidence}
                          </a>
                        ) : (
                          item.evidence
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex whitespace-nowrap border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                            statusClassName[item.status]
                          )}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400">{item.checkpoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-black py-16">
          <div className="container mx-auto flex flex-col justify-between gap-4 px-4 sm:flex-row">
            {previous ? (
              <Button
                asChild
                variant="outline"
                className="rounded-none border-primary/40 font-mono uppercase tracking-[0.16em] text-primary hover:bg-primary/10"
              >
                <Link href={`/portfolio/${previous.slug}`}>
                  <ArrowLeft className="h-4 w-4" />
                  Previous: {previous.title}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="rounded-none border-primary/40 font-mono uppercase tracking-[0.16em] text-primary hover:bg-primary/10"
              >
                <Link href="/portfolio">
                  <ArrowLeft className="h-4 w-4" />
                  Back To Portfolio
                </Link>
              </Button>
            )}

            {next ? (
              <Button
                asChild
                className="rounded-none font-mono uppercase tracking-[0.16em]"
              >
                <Link href={`/portfolio/${next.slug}`}>
                  Next: {next.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="rounded-none font-mono uppercase tracking-[0.16em]"
              >
                <Link href="/portfolio">Back To Portfolio</Link>
              </Button>
            )}
          </div>
        </section>
      </article>
    </Layout>
  );
}
