import { ArrowRight, TriangleAlert } from "lucide-react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020816] text-white">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.06]" />
      <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-primary/40 bg-primary/10">
            <TriangleAlert className="h-8 w-8 text-primary" />
          </div>
        </div>

        <p className="mb-3 font-mono text-sm uppercase tracking-[0.28em] text-primary">
          404 — Page Not Found
        </p>

        <h1 className="mb-6 font-mono text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
          WRONG
          <br />
          <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
            TURN.
          </span>
        </h1>

        <p className="mb-10 text-lg leading-8 text-zinc-400">
          This page doesn't exist or was moved. Head back to the home page and
          we'll get you where you need to go.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-14 rounded-none border border-primary bg-black px-10 font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(0,0,255,0.2)] hover:bg-primary/20"
          >
            <Link href="/">
              Back To Home
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 rounded-none border-white/10 px-8 uppercase tracking-[0.18em] text-zinc-400 hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            <a href="/#contact">Request Triage</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
