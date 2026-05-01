# CHANGELOG

All changes to this repo are logged here with timestamps.
Branch: `webops` (main/default)
Repo: https://github.com/Ch405-L9/universal-header-v4

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
