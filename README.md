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
| Routing | React Router 7 |
| Commerce | Stripe (checkout + webhooks) |
| Deploy | Vercel (auto-deploy on push to `Web-Ops`) |

---

## Stripe New Info for API:

Public: pk_live_51S2otIAC1UWc65XLcHEvVF4iBELyx8bn3OWHy5Dmjj9AyR0tEe2xMrMe3JZVXbPIJi8kulph5C8SlmSihFbInml70099EajMh9

Private:
mk_1SHcnhAC1UWc65XLEKu2iCHp

## Old Stripe Setup (DO NOT use OLD Stripe Info. Example ONLY)

 ---------- Proton Mail Bridge (SMTP) ----------
EMAIL_PROVIDER=proton-bridge
EMAIL_HOST=127.0.0.1
EMAIL_PORT=1025
EMAIL_SECURE=false
EMAIL_USER=adgrant1@badgrtech.com
EMAIL_PASSWORD=W55--9Q2Ov_ZPswET9vCHw
EMAIL_FROM=noreply@badgrtech.com

# Express email server port (phase F scripts use 8787)
EMAIL_PORT_SERVER=8787

# ---------- Stripe ----------
# Client-side (Vite requires VITE_ prefix)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51S2otRPOrdJBR5y8NsfIoPFZNH8MYKml8nuMOGzsoCdvn7dSCDa79UlK4v6JgawfxqqO2wYG0B53dziDBH8UOfYD00uOOGY8F5

# Server-side secret (no VITE_ prefix)
STRIPE_SECRET_KEY=sk_test_51S2otRPOrdJBR5y8yiZ1O4OPyYBuFY6whN0GpEzxUBgmjpBk5SH3XnIVa2Kuyb0razZfHV8iZDyn8R1Z26ATIMYi00863lgsdN

# Toggle mock vs live behavior for the calculators
VITE_USE_STRIPE_MOCK=0

# ---------- App URL ----------
# If your Vite dev server runs on 3000, keep this:
VITE_APP_URL=http://localhost:3000
# If you’re on the default Vite port, use:
# VITE_APP_URL=http://localhost:5173

VITE_PHONE_NUMBER=+14702236217

## ** Ive also included in the ROOT of theis project the Stripe files from the old build, 'webhook.ts, and create-checkout-session.ts' supplied for context and EXAMPLES ONLY! 

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
