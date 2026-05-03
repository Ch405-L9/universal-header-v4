import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

type PsiData = {
  score: number;
  lcp?: string;
  fcp?: string;
  cls?: string;
  tbt?: string;
};

const BEFORE: PsiData = {
  score: 41,
  lcp: "7.8 s",
  fcp: "3.4 s",
  cls: "0.22",
  tbt: "1,180 ms",
};

const CHANGES = [
  {
    date: "May 2025",
    title: "Initial build — baseline audit",
    desc: "React 19 + Vite 7 + Tailwind 4 deployed. Mobile Lighthouse performance: 41. Render-blocking CSS and non-GPU animations were primary drag.",
  },
  {
    date: "May 2025",
    title: "GPU-composited hero animations",
    desc: "Replaced non-composited CSS transitions (layout-triggering properties) with GPU-only keyframe animations using opacity + translateX. CLS and paint jank eliminated.",
  },
  {
    date: "May 2025",
    title: "Critical CSS inlined — full stylesheet deferred",
    desc: "Above-fold styles extracted and inlined in <head>. Full stylesheet converted to preload/onload async pattern via custom Vite plugin. FCP and LCP drop immediately measurable.",
  },
  {
    date: "May 2025",
    title: "Vendor chunk splitting",
    desc: "React, Radix UI overlay/form/layout groups, Framer Motion, Recharts, and Wouter split into named manualChunks. Main thread blocking time reduced by reducing initial parse cost.",
  },
];

function scoreColor(s: number) {
  return s >= 90 ? "text-green-400" : s >= 50 ? "text-yellow-400" : "text-red-400";
}

function isGood(label: string, val?: string): boolean | undefined {
  if (!val) return undefined;
  const n = parseFloat(val.replace(/,/g, ""));
  if (isNaN(n)) return undefined;
  if (label === "LCP") return n < 2.5;
  if (label === "FCP") return n < 1.8;
  if (label === "CLS") return n < 0.1;
  if (label === "TBT") return n < 200;
  return undefined;
}

function MetricBadge({ label, value }: { label: string; value?: string }) {
  const good = isGood(label, value);
  return (
    <div
      className={cn(
        "rounded border p-3 text-center",
        good === true
          ? "border-green-500/40 bg-green-500/10"
          : good === false
            ? "border-red-500/40 bg-red-500/10"
            : "border-zinc-700 bg-zinc-900",
      )}
    >
      <div className="font-mono text-base font-bold text-white">{value ?? "—"}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-400">{label}</div>
    </div>
  );
}

export default function CaseStudy() {
  const [live, setLive] = useState<PsiData | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState(false);

  usePageMeta({
    title: "Proof of Work — badgrtech.com Case Study | BADGRTechnologies",
    description:
      "Real before/after Lighthouse data for badgrtech.com. Every optimization documented. Live PageSpeed score updated on each visit.",
  });

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fbadgrtech.com&strategy=mobile&category=performance",
    )
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        const lhr = data.lighthouseResult;
        setLive({
          score: Math.round((lhr?.categories?.performance?.score ?? 0) * 100),
          lcp: lhr?.audits?.["largest-contentful-paint"]?.displayValue,
          fcp: lhr?.audits?.["first-contentful-paint"]?.displayValue,
          cls: lhr?.audits?.["cumulative-layout-shift"]?.displayValue,
          tbt: lhr?.audits?.["total-blocking-time"]?.displayValue,
        });
      })
      .catch(() => setLiveError(true))
      .finally(() => setLiveLoading(false));
  }, []);

  const TABLE_ROWS = [
    { metric: "Performance Score", before: `${BEFORE.score}/100`, after: live ? `${live.score}/100` : "…", target: "90+" },
    { metric: "LCP (Largest Contentful Paint)", before: BEFORE.lcp!, after: live?.lcp ?? "…", target: "< 2.5 s" },
    { metric: "FCP (First Contentful Paint)", before: BEFORE.fcp!, after: live?.fcp ?? "…", target: "< 1.8 s" },
    { metric: "CLS (Cumulative Layout Shift)", before: BEFORE.cls!, after: live?.cls ?? "…", target: "< 0.1" },
    { metric: "TBT (Total Blocking Time)", before: BEFORE.tbt!, after: live?.tbt ?? "…", target: "< 200 ms" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-primary/20 bg-zinc-950 py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Badge
            variant="outline"
            className="mb-6 rounded-none border-primary/50 bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-primary"
          >
            Proof of Work
          </Badge>
          <h1 className="mb-6 font-mono text-4xl font-bold uppercase leading-tight tracking-tight text-white md:text-6xl">
            badgrtech.com
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
              is the specimen
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-300">
            We don't use hypothetical clients. Every optimization technique we sell was applied to
            this site first. Real scores. Real changes. Live data pulled on page load.
          </p>
        </div>
      </section>

      {/* Live score strip */}
      <section className="border-b border-primary/20 bg-black py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              Current Score — badgrtech.com (Mobile)
            </h2>
            {liveLoading && (
              <span className="animate-pulse text-xs text-zinc-500">Fetching live data…</span>
            )}
          </div>
          {liveError ? (
            <p className="text-sm text-red-400">Live data unavailable. Check back shortly.</p>
          ) : liveLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded border border-zinc-800 bg-zinc-900"
                />
              ))}
            </div>
          ) : live ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="col-span-2 rounded border border-primary/40 bg-primary/5 p-4 text-center md:col-span-1">
                <div className={`font-mono text-4xl font-bold ${scoreColor(live.score)}`}>
                  {live.score}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-400">
                  Performance
                </div>
              </div>
              <MetricBadge label="LCP" value={live.lcp} />
              <MetricBadge label="FCP" value={live.fcp} />
              <MetricBadge label="CLS" value={live.cls} />
              <MetricBadge label="TBT" value={live.tbt} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Before / After table */}
      <section className="bg-zinc-950 py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 font-mono text-3xl font-bold uppercase tracking-tight text-white">
            Before → After
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="py-3 pr-6 text-left font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Metric
                  </th>
                  <th className="py-3 pr-6 text-left font-mono text-[10px] uppercase tracking-wider text-red-400">
                    Before
                  </th>
                  <th className="py-3 pr-6 text-left font-mono text-[10px] uppercase tracking-wider text-green-400">
                    After (Live)
                  </th>
                  <th className="py-3 text-left font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Target
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {TABLE_ROWS.map((row) => (
                  <tr key={row.metric}>
                    <td className="py-4 pr-6 font-medium text-zinc-200">{row.metric}</td>
                    <td className="py-4 pr-6 font-mono text-red-400">{row.before}</td>
                    <td className="py-4 pr-6 font-mono text-green-400">
                      {liveLoading ? (
                        <span className="animate-pulse text-zinc-500">loading…</span>
                      ) : (
                        row.after
                      )}
                    </td>
                    <td className="py-4 font-mono text-zinc-400">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Baseline from pre-optimization audit (May 2025). Live column pulled from Google
            PageSpeed Insights on page load.
          </p>
        </div>
      </section>

      {/* Optimization timeline */}
      <section className="border-t border-primary/20 bg-black py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 font-mono text-3xl font-bold uppercase tracking-tight text-white">
            Optimization Timeline
          </h2>
          <div className="relative border-l border-primary/30 pl-8">
            {CHANGES.map((item, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <span className="absolute -left-9 top-1.5 block h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {item.date}
                </p>
                <h3 className="mb-2 font-mono text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-primary/20 bg-zinc-950 py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-white">
            We did this to our site.
            <br />
            <span className="text-primary">We can do it to yours.</span>
          </h2>
          <p className="mb-8 text-zinc-400">
            Every fix on this page is available as a one-time engagement. No retainer. No fluff.
            Just a faster, cleaner site that converts.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/#audit"
              className="inline-flex h-11 items-center justify-center rounded-none bg-primary px-8 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/80"
            >
              Get Your Free Preview
            </a>
            <a
              href="/sample-report"
              className="inline-flex h-11 items-center justify-center rounded-none border border-primary/50 bg-transparent px-8 font-mono text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
            >
              View Sample Report
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
