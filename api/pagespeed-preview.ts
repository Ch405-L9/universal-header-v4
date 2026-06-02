import { z } from "zod";

import type { VercelRequest, VercelResponse } from "@vercel/node";

const querySchema = z.object({
  url: z.string().trim().min(3).max(2048),
});

function normalizeHttpsUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice(7)}`;
  if (!trimmed.startsWith("https://")) return `https://${trimmed}`;
  return trimmed;
}

function getDisplayValue(audits: Record<string, { displayValue?: string }> | undefined, key: string) {
  return audits?.[key]?.displayValue;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Enter a valid website URL.",
    });
  }

  const websiteUrl = normalizeHttpsUrl(parsed.data.url);

  let url: URL;
  try {
    url = new URL(websiteUrl);
    if (url.protocol !== "https:") {
      throw new Error("Only HTTPS URLs are supported.");
    }
  } catch {
    return res.status(400).json({
      message: "Enter a valid website URL, including https://.",
    });
  }

  const params = new URLSearchParams({
    url: url.toString(),
    strategy: "mobile",
    category: "performance",
  });

  if (process.env.PAGESPEED_API_KEY) {
    params.set("key", process.env.PAGESPEED_API_KEY);
  }

  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
  );
  const body = (await response.json().catch(() => null)) as {
    lighthouseResult?: {
      categories?: { performance?: { score?: number } };
      audits?: Record<string, { displayValue?: string }>;
    };
    error?: { code?: number; message?: string };
  } | null;

  if (!response.ok || !body?.lighthouseResult) {
    console.warn("[pagespeed-preview] PageSpeed unavailable", {
      status: response.status,
      host: url.host,
      code: body?.error?.code,
      message: body?.error?.message,
      hasApiKey: Boolean(process.env.PAGESPEED_API_KEY),
    });

    return res.status(502).json({
      message:
        "Google could not read that public score right now. It can happen when a site blocks scanners, redirects oddly, times out, or when the public PageSpeed quota is busy. You can still request the free manual audit.",
    });
  }

  const lhr = body.lighthouseResult;
  const score = Math.round((lhr.categories?.performance?.score ?? 0) * 100);

  return res.status(200).json({
    score,
    metrics: {
      lcp: getDisplayValue(lhr.audits, "largest-contentful-paint"),
      fcp: getDisplayValue(lhr.audits, "first-contentful-paint"),
      cls: getDisplayValue(lhr.audits, "cumulative-layout-shift"),
      tbt: getDisplayValue(lhr.audits, "total-blocking-time"),
    },
  });
}
