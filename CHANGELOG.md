# CHANGELOG

All changes to this repo are logged here with timestamps.
Branch: `webops` (main/default)
Repo: https://github.com/Ch405-L9/universal-header-v4

---

## [2026-05-01T00:02:00] — Content graph layer

### Added
- `src/lib/content-graph.ts`: Full knowledge graph — 2 pillars, 7 cluster nodes, each with BLUF copy, intent stage, entity refs, internal link map
- `fullFaqs`: 12 FAQs covering informational → commercial → transactional intent (up from 5)
- `optimizationHowTo`: 4-step HowTo entity with per-step URLs
- `HowTo` schema injected into home-graph — readable by Google and AI answer engines (Perplexity, SGE, ChatGPT browsing)

### Changed
- `Home.tsx`: FAQ array now sourced from `content-graph.ts` instead of inline. Single source of truth.

---

## [2026-05-01T00:01:00] — Code splitting (Web Vitals foundation gap)

### Changed
- `src/App.tsx`: All page imports converted to `React.lazy()`. Wrapped `Router` in `Suspense fallback={null}`. Each route is now its own JS chunk — Home.tsx (40.6K) no longer blocks initial parse.

### Why
- Foundation layer audit found eager imports on all routes. Home.tsx is the largest file; loading it synchronously on every route hurt LCP/FID scores.

---

## [2026-05-01T00:00:00] — Phase 2 schema fix + git init

### Fixed
- `src/lib/schema.ts`: Replaced `serviceType` with `category` on `webOptimizationService` and `aiConsultationService` entities. `serviceType` is not recognized by schema.org validator for general `Service` objects; `category` is the correct property.

### Verified complete
- Footer social icons: YouTube, Instagram, TikTok, X (Twitter), Facebook, LinkedIn, GitHub — all wired with correct live URLs in `src/components/Layout.tsx`
- `sameAs` array in `src/lib/schema.ts` and `index.html` base graph — all 7 social profiles present
- Foundation layer: HTML meta, OG/Twitter cards, sitemap link, canonical via `usePageMeta`, preconnects — complete
- Entity layer: `@graph` with Organization+LocalBusiness, WebSite, Service entities, FAQPage, WebPage — complete
- SEO/AEO layer: `useJsonLd` injection on Home page, dynamic schema per route — complete

### Git setup
- Repo initialized at `/home/t0n34781/universal-header-v4-Web-Ops`
- Branch: `webops` (main working branch)
- Remote: `https://github.com/Ch405-L9/universal-header-v4.git`

---
