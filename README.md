# BADGRTechnologies — badgrtech.com

Production site for BADGRTechnologies LLC. Built with React + Vite + Tailwind. Deployed via Vercel.

**Branch:** `Web-Ops` (production branch — auto-deploys to Vercel on push)
**Repo:** https://github.com/Ch405-L9/universal-header-v4
**Live:** https://badgrtech.com

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS 4, Radix UI |
| Routing | Wouter 3 |
| Commerce | Stripe (checkout sessions) |
| Deploy | Vercel (auto-deploy on push to `Web-Ops`) |

---

## Env vars

All secrets set in Vercel project settings — never committed. Required vars:

| Var | Where | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | Vercel → Settings → Environment Variables | Must have no IP restrictions — Vercel Functions run from dynamic IPs |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Vercel → Settings → Environment Variables | `pk_live_...` for production |
| `VITE_APP_URL` | Optional — defaults to `https://badgrtech.com` | Used for Stripe success/cancel redirect URLs |

`STRIPE_WEBHOOK_SECRET` is optional. The webhook handler at `api/stripe/webhook.ts` returns 503 gracefully if the secret is absent — checkout and payment flow are unaffected without it.

---

## Project structure

```
src/
  components/    Layout, nav, footer, UI primitives
  pages/         Home, CaseStudy (/proof), SampleReportPage — all lazy-loaded
  hooks/         useScrollDepth, usePageMeta
  lib/           schema.ts, content-graph.ts, funnel.ts, payment.ts
api/
  stripe/
    create-checkout-session.ts   Vercel serverless — Stripe Checkout Session
    webhook.ts                   Vercel serverless — Stripe webhook handler
public/
  images/        All production WebP assets (self-hosted)
  videos/        badgrtech-intro.mp4 / .webm
  grid-pattern.svg
sample-report-preview.html   Standalone audit report preview
dev-api-server.ts            Local dev only — Express shim for /api routes (port 3002)
```

---

## Assets

All production images are self-hosted WebP in `public/images/`. No Cloudinary dependencies.

| File | Use |
|---|---|
| `hero-bg-{640,1024,1600}.webp` | Hero section responsive background |
| `ai-dashboard.webp` | Proof section dashboard image |
| `badgrtech-logo.webp` | Nav + header logo |
| `badgrtech-logo-og.webp` | Open Graph + schema.org logo |
| `video-poster.webp` | Video section poster frame |
| `sample-report-preview.webp` | Report preview thumbnail |
| `badgrtech-intro.mp4 / .webm` | Intro video (self-hosted) |

---

## Architecture layers

1. **Foundation** — HTML meta, OG/Twitter cards, canonical, sitemap, preconnects
2. **Entity** — `@graph` (Organization, WebSite, Service, FAQPage, WebPage)
3. **SEO/AEO** — `useJsonLd` dynamic schema injection per route
4. **Content graph** — 2 pillars, 7 cluster nodes, 12 FAQs, HowTo entity
5. **Funnel engine** — Score → package recommendation → sticky CTA → triage form
6. **Commerce** — Stripe checkout session, webhook handler, package tiers
7. **Perf / CLS** — Hero animations use GPU-composited `opacity`+`translateX` keyframes only

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Main landing page with audit tool |
| `/proof` | `CaseStudy` | Live before/after Lighthouse case study — badgrtech.com as the specimen |
| `/sample-report` | `SampleReportPage` | Interactive sample audit report |
| `/payment-success` | `PaymentSuccess` | Post-checkout confirmation |
| `/terms` | `TermsAndConditions` | Legal |
| `/graph` | `GraphInspector` | JSON-LD schema inspector (dev tool) |

---

## Local dev

```bash
pnpm install
pnpm dev          # Vite (port 3000) + Express API shim (port 3002) — concurrently
pnpm dev:client   # Vite only
pnpm dev:api      # Express API shim only (tsx dev-api-server.ts)
pnpm vercel:dev   # Full Vercel dev environment (requires Vercel CLI)
```

Requires `.env.local` with `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY`.

---

## Lighthouse scores (post-optimization)

| Device | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile | 79 → targeting 90+ | 96 | 100 | 100 |
| Desktop | 96 | 90 | 100 | 100 |

Live current score visible at [badgrtech.com/proof](https://badgrtech.com/proof) — pulled from Google PageSpeed Insights on page load.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
