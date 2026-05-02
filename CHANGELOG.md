# CHANGELOG

All changes to this repo are logged here with timestamps.
Branch: `webops` (main/default)
Repo: https://github.com/Ch405-L9/universal-header-v4

---

## [2026-05-02] — Fix non-composited hero animations

### Fixed
- `src/pages/Home.tsx`: Replaced `animate-in slide-in-from-left-10 will-change-transform` and `animate-in slide-in-from-right-10 will-change-transform` on hero section divs with GPU-composited equivalents (`fadeSlideLeft` / `fadeSlideRight` keyframes via `motion-safe:animate-[...]`). Lighthouse flagged `slide-in-from-*` (tw-animate-css) as non-composited — it animates a CSS custom property (`--tw-enter-translate-x`) that some browsers treat as a paint-affecting filter, causing CLS risk and jank.
- `src/index.css`: Added `@keyframes fadeSlideLeft` and `@keyframes fadeSlideRight` — animate only `opacity` and `transform: translateX()`, both GPU-composited properties. No layout reflow. No CLS.

---

## [2026-05-02] — Asset overhaul: local WebP/video, Cloudinary removed

### Added
- `public/images/hero-bg-640.webp`, `hero-bg-1024.webp`, `hero-bg-1600.webp` — responsive hero background, replaces Cloudinary PNG
- `public/images/ai-dashboard.webp` — proof section dashboard image
- `public/images/badgrtech-logo.webp` — nav/header logo (13 KB)
- `public/images/badgrtech-logo-og.webp` — OG/schema logo (90 KB)
- `public/images/video-poster.webp` — video section poster frame
- `public/images/sample-report-preview.webp` — sample report thumbnail
- `public/videos/badgrtech-intro.mp4` + `badgrtech-intro.webm` — intro video, self-hosted
- `sample-report-preview.html` — standalone audit report preview page

### Changed
- `src/pages/Home.tsx`: All Cloudinary `img` srcs + `srcSet` replaced with local `/images/` paths; video `src` + `poster` replaced with local `/videos/` paths; `.webm` source added before `.mp4` for browser preference
- `src/components/Layout.tsx`: Header + footer logo replaced with `/images/badgrtech-logo.webp` (both instances)
- `src/lib/schema.ts`: `LOGO_URL` + `IMAGE_URL` now point to `https://badgrtech.com/images/badgrtech-logo-og.webp`
- `.gitignore`: `public/videos/` blanket ignore narrowed to `public/videos/videos old/` so production video files are tracked

### Removed
- All legacy Cloudinary-hosted PNG/video references from source code
- Old `public/images/` PNGs (Cloudinary slug filenames) — replaced by optimized WebP equivalents

---

## [2026-05-01T00:03:00] — Funnel engine layer

### Added
- `src/lib/funnel.ts`: Conversion path definitions, `recommendPackage()` (score → specific tier + reason + urgency), flywheel loop map, scroll milestones
- `src/hooks/useScrollDepth.ts`: IntersectionObserver hook — fires once per milestone, analytics-ready
- `Layout.tsx`: Sticky bottom CTA bar — slides in after 480px scroll, two actions (Free Preview → #audit, Book Triage → #contact)
- `Home.tsx`: Audit post-score now routes to specific package recommendation with reason, urgency, and dual CTA (triage call + package details)

### Conversion architecture
- Aware → Evaluating: Hero CTA + audit URL submission
- Evaluating → Deciding: Score + recommended package card
- Deciding → Converting: Sticky CTA + triage form
- Retention loop: before-and-after report → client shares with peers

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
