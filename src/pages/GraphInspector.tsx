import { contentGraph, fullFaqs, optimizationHowTo } from "@/lib/content-graph";

const intentColor: Record<string, string> = {
  informational: "bg-blue-900/40 text-blue-300 border-blue-700",
  commercial: "bg-yellow-900/40 text-yellow-300 border-yellow-700",
  transactional: "bg-green-900/40 text-green-300 border-green-700",
};

export default function GraphInspector() {
  return (
    <div className="min-h-screen bg-zinc-950 p-8 font-mono text-zinc-100">
      <div className="mx-auto max-w-5xl space-y-12">

        <div>
          <h1 className="text-2xl font-bold text-white">Content Graph Inspector</h1>
          <p className="mt-1 text-sm text-zinc-500">Dev-only view — not linked in production nav</p>
        </div>

        {/* Pillar + Cluster nodes */}
        {contentGraph.map(cluster => (
          <section key={cluster.id} className="space-y-4">
            <div className="border-b border-zinc-700 pb-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Pillar</span>
              <h2 className="text-lg font-bold text-primary">{cluster.pillar}</h2>
              <code className="text-xs text-zinc-500">id: {cluster.id}</code>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {cluster.nodes.map(node => (
                <div key={node.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs text-zinc-400">{node.id}</code>
                    <span className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${intentColor[node.intent]}`}>
                      {node.intent}
                    </span>
                  </div>

                  <h3 className="font-bold text-white">{node.title}</h3>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">BLUF</span>
                    <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{node.bluf}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 self-center">Anchor</span>
                    <code className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">{node.anchor}</code>
                  </div>

                  {node.internalLinks.length > 0 && (
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500">Links to</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {node.internalLinks.map(l => (
                          <code key={l} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-blue-300">{l}</code>
                        ))}
                      </div>
                    </div>
                  )}

                  {node.entities.length > 0 && (
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500">Entities</span>
                      <div className="mt-1 flex flex-col gap-0.5">
                        {node.entities.map(e => (
                          <code key={e} className="text-[10px] text-zinc-500 break-all">{e}</code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* HowTo steps */}
        <section className="space-y-4">
          <div className="border-b border-zinc-700 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">HowTo Schema</span>
            <h2 className="text-lg font-bold text-primary">{optimizationHowTo.name}</h2>
            <p className="text-sm text-zinc-400 mt-1">{optimizationHowTo.description}</p>
          </div>
          <ol className="space-y-3">
            {optimizationHowTo.steps.map((step, i) => (
              <li key={step.name} className="flex gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <span className="text-2xl font-bold text-primary shrink-0">{i + 1}</span>
                <div className="space-y-1">
                  <h3 className="font-bold text-white">{step.name}</h3>
                  <p className="text-sm text-zinc-400">{step.text}</p>
                  <code className="text-xs text-zinc-500">{step.url}</code>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ intent breakdown */}
        <section className="space-y-4">
          <div className="border-b border-zinc-700 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">FAQs by intent</span>
            <h2 className="text-lg font-bold text-primary">{fullFaqs.length} total</h2>
          </div>
          {(["informational", "commercial", "transactional"] as const).map(stage => (
            <div key={stage}>
              <span className={`inline-block rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider mb-3 ${intentColor[stage]}`}>
                {stage} — {fullFaqs.filter(f => f.intent === stage).length} FAQs
              </span>
              <div className="space-y-2">
                {fullFaqs.filter(f => f.intent === stage).map(faq => (
                  <details key={faq.question} className="rounded border border-zinc-800 bg-zinc-900 p-4">
                    <summary className="cursor-pointer text-sm font-bold text-white">{faq.question}</summary>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Raw JSON export */}
        <section className="space-y-4">
          <div className="border-b border-zinc-700 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Raw JSON</span>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400 whitespace-pre-wrap break-all">
            {JSON.stringify({ clusters: contentGraph, howTo: optimizationHowTo, faqs: fullFaqs }, null, 2)}
          </pre>
        </section>

      </div>
    </div>
  );
}
