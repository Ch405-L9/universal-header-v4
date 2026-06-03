---
name: site-architecture
description: badgrtech.com is a client-rendered Vite/React SPA on Vercel — architecture, routing, SEO mechanism, host canonicalization
metadata:
  type: project
---

badgrtech.com is a **client-side-rendered (CSR) Vite + React SPA** (wouter router), deployed on Vercel. `outputDirectory: dist/public`. The shipped `index.html` is a shell with `<div id="root">` — all page content, per-route `<title>`/description/canonical, and JSON-LD are injected client-side via `src/lib/seo.ts` (`usePageMeta`, `useJsonLd`). Non-JS crawlers/scrapers see only the static shell (title "BADGRTechnologies LLC", base description, base Organization+WebSite JSON-LD).

**Why:** Stack choice predates this audit. **How to apply:** Any SEO/AEO/social-preview finding must distinguish static-shell HTML (what curl/WebFetch/social scrapers see) from rendered DOM (what browsers + Googlebot's renderer see). Per-route meta is invisible to non-rendering consumers. Prerendering/SSR is the structural fix.

**Host canonicalization:** serves on `www.badgrtech.com`; apex `badgrtech.com` 307-redirects to www. But `og:url`, sitemap `<loc>` entries, robots `Sitemap:` pointer, and `BASE_URL` in seo.ts all use **apex** `https://badgrtech.com` → canonical/redirect mismatch.

**Routes (src/App.tsx):** `/`, `/privacy`, `/terms`, `/sample-report`, `/proof` (CaseStudy), `/free-lighthouse-scan`, `/partners` + `/investors` + `/additional-services` (FutureRoutePage stubs for first two), `/graph` (GraphInspector — internal tool, publicly reachable), `/success`, `/cancel`, `/404`, wildcard→NotFound. SPA rewrite sends all non-/api paths to index.html, so every route (incl. junk URLs) returns HTTP 200 — no real 404 status.

**usePageMeta is NOT called in:** PaymentSuccess, PaymentCancel, FutureRoutePage, NotFound, GraphInspector → these inherit stale title/canonical from prior page.

Stripe checkout via `src/components/CheckoutButton.tsx` (useStripeCheckout) → `api/stripe/`. Audit/scan forms post to `api/pagespeed-preview.ts` and `api/lighthouse-scan-request.ts`.
