import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioCases } from "@/data/portfolio";

export default function SelectedEngineeringWork() {
  const leadCase = portfolioCases[0];
  const secondaryCases = portfolioCases.slice(1);

  return (
    <section
      className="relative overflow-hidden border-y border-primary/20 bg-black py-20"
      aria-labelledby="selected-engineering-work"
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Badge
              variant="outline"
              className="rounded-none border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary"
            >
              Selected Engineering Work
            </Badge>
            <h2
              id="selected-engineering-work"
              className="mt-5 font-sans text-3xl font-bold uppercase tracking-[0.05em] text-white md:text-5xl"
            >
              Evidence-backed systems work
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
            A compact path into five engineering case studies, while the
            existing homepage remains focused on small-business web operations.
          </p>
        </div>

        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 gap-8 border border-primary/30 bg-primary/5 p-4 md:p-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Link href={`/portfolio/${leadCase.slug}`}>
              <img
                src="/portfolio/cwalts-stage2-pass.jpg"
                width={1920}
                height={1080}
                decoding="async"
                loading="lazy"
                alt="C.Walts Stage 2 disposition pass evidence visual"
                className="aspect-video w-full border border-primary/30 object-cover"
              />
            </Link>
            <div className="flex flex-col justify-center">
              <Badge
                variant="outline"
                className="mb-4 rounded-none border-primary/50 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary"
              >
                {leadCase.category}
              </Badge>
              <h3 className="font-mono text-4xl font-bold uppercase leading-none tracking-normal text-white md:text-6xl">
                {leadCase.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-zinc-400 md:text-lg">
                Hybrid dense plus lexical retrieval hardened around evaluation
                isolation, rollback correctness, MCP safety, and release gates.
              </p>
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label="C.Walts verified checkpoints"
              >
                {[
                  "17/17 useful at @5",
                  "96/96 exact parity",
                  "43/43 smoke checks",
                ].map(item => (
                  <li
                    key={item}
                    className="border border-primary/20 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-7 w-fit rounded-none font-mono uppercase tracking-[0.16em]"
              >
                <Link href="/portfolio">
                  View Engineering Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div
          className="mt-6 grid grid-cols-1 gap-px bg-primary/20 p-px md:grid-cols-2 xl:grid-cols-4"
          aria-label="Other selected engineering cases"
        >
          {secondaryCases.map(portfolioCase => (
            <Link
              key={portfolioCase.slug}
              href={`/portfolio/${portfolioCase.slug}`}
              className="bg-zinc-950 p-5 transition-colors hover:bg-primary/10"
            >
              <b className="font-mono text-sm uppercase tracking-[0.12em] text-white">
                {portfolioCase.title}
              </b>
              <span className="mt-3 block text-sm leading-6 text-zinc-400">
                {portfolioCase.slug === "badgr-bolt"
                  ? "Android RSVP/ORP reading, narration, integrity controls."
                  : portfolioCase.slug === "badgr-harness"
                    ? "MCP/RAG orchestration, routing, schema hardening."
                    : portfolioCase.slug === "badgr-ai-ops"
                      ? "Discovery, provenance, dedupe, recoverable handoffs."
                      : "Security, performance, accessibility, release discipline."}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
