import { useEffect } from "react";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "wouter";

interface FutureRoutePageProps {
  title: string;
  routePath: string;
}

export default function FutureRoutePage({
  title,
  routePath,
}: FutureRoutePageProps) {
  useEffect(() => {
    let meta = document.head.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");
    return () => {
      meta?.setAttribute("content", "index, follow");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="border-b border-primary/20 bg-[#020816]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-none border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary">
              <Construction className="h-4 w-4" />
              Future Route Placeholder
            </div>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              This page is intentionally reserved for future content and routing.
              The footer link is live now so future editors can swap in a real
              page without changing the site structure.
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl md:p-12">
          <div className="space-y-6 text-zinc-300">
            <p className="text-base leading-7">
              Route reserved at:{" "}
              <code className="rounded bg-black/40 px-2 py-1 text-primary">
                {routePath}
              </code>
            </p>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.16em] text-primary">
                This goes here ---&gt;
              </p>
              <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-zinc-300">{`1. Create a dedicated page component in src/pages/
2. Import it in src/App.tsx
3. Replace this placeholder route with the real component
4. Keep the footer/nav link path the same so existing links continue to work

Example:
<Route path={"/example"} component={ExamplePage} />`}</pre>
            </div>

            <p className="text-sm leading-7 text-zinc-500">
              Until then, use this page as a safe published placeholder instead
              of a broken or dead link.
            </p>
          </div>

          <div className="mt-12 border-t border-primary/20 pt-6">
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
