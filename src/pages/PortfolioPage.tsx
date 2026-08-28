import { ArrowRight, Github } from "lucide-react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import PortfolioVisual from "@/components/portfolio/PortfolioVisual";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioCases } from "@/data/portfolio";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const methodItems = [
  {
    title: "Problem",
    text: "Describe the system pressure or user-facing risk.",
  },
  {
    title: "Decision",
    text: "State the architectural tradeoff and boundary chosen.",
  },
  {
    title: "Implementation",
    text: "Show the system, workflow, test, or release mechanism.",
  },
  {
    title: "Failure",
    text: "Keep real failures in the story when evidence exists.",
  },
  {
    title: "Correction",
    text: "Document how the defect or risk was contained.",
  },
  {
    title: "Verification",
    text: "Attach each result to its exact checkpoint.",
  },
];

export default function PortfolioPage() {
  usePageMeta({
    canonical: "/portfolio",
    title: "Engineering Portfolio | BADGRTechnologies",
    description:
      "Selected BADGRTechnologies engineering work across retrieval, agentic orchestration, Android, developer tooling, and production web operations.",
  });

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#05070d] py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.08]" />
        <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <Badge
              variant="outline"
              className="rounded-none border-primary/50 bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-primary"
            >
              Engineering Portfolio
            </Badge>
            <h1 className="mt-7 max-w-[12ch] font-mono text-[clamp(1.45rem,7vw,1.85rem)] font-bold uppercase leading-[1.08] tracking-normal text-white md:text-6xl md:leading-[0.9] lg:text-7xl">
              AI systems. Product engineering.{" "}
              <span className="text-primary drop-shadow-[0_0_26px_rgba(20,62,216,0.42)]">
                Verified outcomes.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              Selected engineering work across retrieval, agentic orchestration,
              Android, developer tooling, and production web operations.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-none px-8 font-mono uppercase tracking-[0.16em]"
              >
                <Link href="/portfolio/cwalts">
                  Start With C.Walts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-primary/40 px-8 font-mono uppercase tracking-[0.16em] text-primary hover:bg-primary/10"
              >
                <a href="https://github.com/Ch405-L9" rel="noreferrer" target="_blank">
                  <Github className="h-4 w-4" />
                  View GitHub
                </a>
              </Button>
            </div>
          </div>

          <div>
            <PortfolioVisual
              visual={{
                caption: "Portfolio method: problem to verified correction",
                kind: "diagram",
                items: [
                  {
                    label: "Problem",
                    text: "Ambiguous systems, production risk, noisy evidence.",
                  },
                  {
                    label: "Decision",
                    text: "Use explicit gates, schemas, rollback checks.",
                  },
                  { label: "Build", text: "RAG, MCP, Android, CI, web ops." },
                  {
                    label: "Failure",
                    text: "Routing mismatch, parity risk, release complexity.",
                  },
                  {
                    label: "Correction",
                    text: "Preserve the failure, patch the boundary.",
                  },
                  {
                    label: "Verify",
                    text: "Tests, smoke checks, workflows, live artifacts.",
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>

      <section
        className="grid grid-cols-2 border-y border-primary/20 bg-black md:grid-cols-4"
        aria-label="Portfolio proof boundaries"
      >
        {[
          { value: "5", label: "Selected case studies" },
          { value: "AI / Android / RAG", label: "Tooling / WebOps" },
          { value: "Evidence", label: "Checkpointed claims" },
          { value: "Failure -> Correction", label: "Verification" },
        ].map(item => (
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

      <section className="bg-[#05070d] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
              Selected Work
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              Five selected cases showing architecture decisions, failure
              recovery, verification, and shipping discipline across AI and
              software systems.
            </p>
          </div>

          <div className="space-y-8">
            {portfolioCases.map((portfolioCase, index) => (
              <ScrollReveal
                key={portfolioCase.slug}
                delay={index * 80}
                direction="up"
              >
                <article
                  className={cn(
                    "grid grid-cols-1 gap-8 border border-zinc-800 bg-black/35 p-4 md:p-6 lg:grid-cols-[0.85fr_1.15fr]",
                    index === 0 && "border-primary/50 bg-primary/5"
                  )}
                >
                  <Link
                    href={`/portfolio/${portfolioCase.slug}`}
                    aria-label={`Open ${portfolioCase.title} case study`}
                  >
                    <PortfolioVisual
                      visual={portfolioCase.visual}
                      className="transition-colors hover:border-primary"
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Badge
                      variant="outline"
                      className="mb-5 rounded-none border-primary/50 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary"
                    >
                      {portfolioCase.category}
                    </Badge>
                    <h3 className="font-mono text-3xl font-bold uppercase tracking-normal text-white md:text-5xl">
                      <span
                        className={cn(
                          portfolioCase.accent === "cyan" && "text-cyan-300"
                        )}
                      >
                        {portfolioCase.title}
                      </span>
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
                      {portfolioCase.slug === "cwalts"
                        ? "Hybrid RAG made measurable, recoverable, and fail-closed through dense plus lexical parity, evaluation isolation, rollback verification, MCP safety, and release gates."
                        : portfolioCase.description}
                    </p>
                    {portfolioCase.proof && index === 0 ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {portfolioCase.proof.slice(0, 3).map(item => (
                          <li
                            key={item.label}
                            className="border border-primary/20 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-zinc-300"
                          >
                            {item.value} {item.label.split(" - ")[0]}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Button
                      asChild
                      variant="outline"
                      className="mt-7 w-fit rounded-none border-primary/40 font-mono uppercase tracking-[0.16em] text-primary hover:bg-primary/10"
                    >
                      <Link href={`/portfolio/${portfolioCase.slug}`}>
                        Open Case
                      </Link>
                    </Button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Badge
              variant="outline"
              className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
            >
              Engineering Method
            </Badge>
            <h2 className="mt-5 font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
              Same review spine on every case.
            </h2>
          </div>
          <div className="grid gap-px bg-primary/20 p-px md:grid-cols-2 xl:grid-cols-3">
            {methodItems.map(item => (
              <div key={item.title} className="bg-zinc-950 p-5">
                <h3 className="font-mono text-sm uppercase tracking-[0.12em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#05070d] py-20">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Badge
              variant="outline"
              className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
            >
              Evidence Policy
            </Badge>
            <h2 className="mt-5 font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl">
              Proof is bounded by source.
            </h2>
          </div>
          <div className="border border-primary/20 bg-black/50 p-6 text-base leading-8 text-zinc-400">
            Material claims are tied to named evidence sources and dated
            checkpoints. Historical, live-state, and recorded claims are
            labeled accordingly.
          </div>
        </div>
      </section>
    </Layout>
  );
}
