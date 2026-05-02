# BADGRTechnologies — badgrtech.com

Production site for BADGRTechnologies LLC. Built with React + Vite + Tailwind. Deployed via Vercel.

**Branch:** `Web-Ops` (main working branch)  
**Repo:** https://github.com/Ch405-L9/universal-header-v4  
**Live:** https://badgrtech.com

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS 3, Radix UI |
| Routing | Wouter 3 |
| Commerce | Stripe (checkout + webhooks) |
| Deploy | Vercel (auto-deploy on push to `Web-Ops`) |

---

## Env vars

All secrets set in Vercel project settings — never committed. Required vars:

| Var | Where |
|---|---|
| `STRIPE_SECRET_KEY` | Vercel → Settings → Environment Variables |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Vercel → Settings → Environment Variables |
| `VITE_APP_URL` | `https://badgrtech.com` (Production) |

Root-level `create-checkout-session.ts` and `webhook.ts` are reference examples only — not used by the app.

---

## Project structure

```
src/
  components/    Layout, nav, footer, UI primitives
  pages/         Home, SampleReportPage (lazy-loaded)
  hooks/         useScrollDepth, usePageMeta
  lib/           schema.ts, content-graph.ts, funnel.ts
public/
  images/        All production WebP assets (self-hosted)
  videos/        badgrtech-intro.mp4 / .webm
  grid-pattern.svg
sample-report-preview.html   Standalone audit report preview
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
7. **Perf / CLS** — Hero animations use GPU-composited `opacity`+`translateX` keyframes; no layout-triggering properties

---

## Local dev

```bash
pnpm install
pnpm dev
```

Vercel builds on push. Environment variables (`STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, etc.) are set in Vercel project settings — never committed.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
# email test
# email test
