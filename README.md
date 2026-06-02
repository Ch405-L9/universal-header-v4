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

Optional email vars for `/free-lighthouse-scan` form notifications:

| Var | Notes |
|---|---|
| `RESEND_API_KEY` | Preferred production sender for Vercel serverless email notifications |
| `RESEND_FROM` | Sender identity. Use a verified domain in production; `onboarding@resend.dev` is suitable for initial testing |
| `SCAN_REQUEST_TO` | Notification recipient, defaults to `antgrant4781@proton.me` |
| `SMTP_HOST` | Optional local Proton Bridge fallback host, e.g. `127.0.0.1` |
| `SMTP_PORT` | Optional local Proton Bridge fallback SMTP port, e.g. `1025` |
| `SMTP_USER` / `SMTP_PASS` | Proton Bridge SMTP credentials. Keep `SMTP_PASS` only in `.env.local` or Vercel env vars |
| `SCAN_REQUEST_FROM` | Sender address used by SMTP |

Copy `.env.example` to `.env.local` for local testing. Proton Bridge on `127.0.0.1` works only where Bridge is running; Vercel production should use `RESEND_API_KEY` or another public email API.

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

All production images are self-hosted AVIF/WebP in `public/images/`. No Cloudinary dependencies.

| File | Use |
|---|---|
| `hero-bg-{640,1024,1600}.avif` | Hero section responsive background |
| `ai-dashboard.avif` | Proof section dashboard image |
| `badgrtech-logo.avif` | Nav, header, Open Graph, and schema.org logo |
| `video-poster-386.avif` | Video section poster frame |
| `lighthouse-hero-bg.avif` | Decorative `/free-lighthouse-scan` hero image |
| `lighthouse-scan-desktop-100.avif` / `lighthouse-scan-mobile-91.avif` | Optimized Lighthouse proof screenshots |
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
| `/free-lighthouse-scan` | `FreeLighthouseScan` | Free Lighthouse audit lead-generation page |
| `/proof` | `CaseStudy` | Live before/after Lighthouse case study — badgrtech.com as the specimen |
| `/sample-report` | `SampleReportPage` | Interactive sample audit report |
| `/success` | `PaymentSuccess` | Post-checkout confirmation |
| `/cancel` | `PaymentCancel` | Canceled checkout return page |
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
