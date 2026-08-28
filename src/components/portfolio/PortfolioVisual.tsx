import type { CaseVisual } from "@/data/portfolio";

import { cn } from "@/lib/utils";

type PortfolioVisualProps = {
  className?: string;
  visual: CaseVisual;
};

export default function PortfolioVisual({
  className,
  visual,
}: PortfolioVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-primary/40 bg-black/70 shadow-[0_0_45px_rgba(20,62,216,0.12)]",
        className
      )}
    >
      {visual.kind === "image" ? (
        <img
          src={visual.src}
          width={visual.width}
          height={visual.height}
          decoding="async"
          loading="lazy"
          alt={visual.alt}
          className={cn(
            "mx-auto w-full object-cover",
            visual.phone ? "max-h-[34rem] max-w-72 object-contain p-3" : "aspect-video"
          )}
        />
      ) : null}

      {visual.kind === "video" ? (
        <video
          aria-label={visual.caption}
          className="w-full bg-black"
          controls
          height={visual.height}
          preload="metadata"
          poster={visual.poster}
          width={visual.width}
        >
          <source src={visual.src} type="video/mp4" />
        </video>
      ) : null}

      {visual.kind === "diagram" ? (
        <div
          className="grid gap-px bg-primary/20 p-px md:grid-cols-2 xl:grid-cols-3"
          aria-label={visual.caption}
        >
          {visual.items.map(item => (
            <div
              key={item.label}
              className="min-h-32 bg-[linear-gradient(rgba(142,182,255,0.045)_1px,transparent_1px)] bg-[length:100%_8px] p-5"
            >
              <b className="font-mono text-xs uppercase tracking-[0.14em] text-white">
                {item.label}
              </b>
              <span className="mt-16 block text-sm leading-6 text-zinc-400">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {visual.kind === "terminal" ? (
        <div
          className="min-h-80 bg-[linear-gradient(rgba(142,182,255,0.045)_1px,transparent_1px)] bg-[length:100%_8px] p-6 font-mono text-sm leading-7 text-zinc-300"
          aria-label={visual.caption}
        >
          {visual.lines.map((line, index) => (
            <span
              key={`${line.text}-${index}`}
              className={cn(
                "block",
                line.tone === "blue" && "text-primary",
                line.tone === "ok" && "text-emerald-300",
                line.tone === "warn" && "text-amber-300"
              )}
            >
              {line.text}
            </span>
          ))}
        </div>
      ) : null}

      <div className="border-t border-primary/20 bg-black/60 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        {visual.caption}
      </div>
    </div>
  );
}
