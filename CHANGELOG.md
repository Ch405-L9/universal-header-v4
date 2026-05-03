# CHANGELOG

All changes to this repo are logged here with timestamps.
Branch: `Web-Ops` (production branch)
Repo: https://github.com/Ch405-L9/universal-header-v4

---

## [2026-05-03] — Proof of Work page ("eat your own food")

### Added
- `src/pages/CaseStudy.tsx`: Live before/after Lighthouse case study page at `/proof`. Pulls current Google PageSpeed Insights score on load via public API (no key required). Displays mobile performance score, LCP, FCP, CLS, TBT with red/green threshold coloring. Baseline hardcoded: 41/100, LCP 7.8s, FCP 3.4s, CLS 0.22, TBT 1,180ms (pre-optimization audit). Shows full optimization timeline with dated entries.
- `src/App.tsx`: Added `CaseStudy` lazy route at `/proof`.
- `src/components/Layout.tsx`: Added "Proof of Work" nav link pointing to `/proof`.

### Why
badgrtech.com is its own specimen. Every optimization we sell was applied here first. The /proof page surfaces live PSI data as a real-time credibility signal — no screenshots, no static numbers, no fake clients.

---

## [2026-05-03] — Phase 6: Dev scripts overhaul

### Changed
- `package.json`: Rewrote scripts block. `pnpm dev` now runs Vite + Express API concurrently via `concurrently` (`-n vite,api -c cyan,magenta`). Added `dev:client` (Vite only) and `dev:api` (tsx Express only) split scripts. Removed old `dev:server`, `dev:all`, `start` scripts (were Express-centric, not Vercel-compatible). Added `vercel:dev` script.
- `devDependencies`: Added `concurrently@^9.2.1`, `@vercel/node@^3.0.0`.

### Added
- `dev-api-server.ts`: Thin Express shim that adapts `VercelRequest/VercelResponse` to standard `express.Request/Response`. Mounts both `/api/stripe/create-checkout-session` and `/api/stripe/webhook` on port 3002. Enables local dev without `vercel dev` overhead. Run via `pnpm dev:api`.

---

## [2026-05-03] — Stripe full wiring

### Added
- `api/stripe/webhook.ts`: Vercel serverless webhook handler. Verifies `stripe-signature` header via `stripe.webhooks.constructEvent`. Raw body buffered manually (bodyParser disabled). Handles `checkout.session.completed` — logs customer email and metadata. Returns 503 if env vars missing, 400 on signature failure, 200 on success.

### Changed
- `api/stripe/create-checkout-session.ts`: Stripe client initialized once at module load (not per-request). Missing `STRIPE_SECRET_KEY` logs a non-sensitive warning at cold start and returns 503. `serviceId` validation moved inside try/catch. `appUrl` scoped inside try block. URL query param extension fixed (`.js` → no extension). Response uses `res.status(200).json(...)` explicitly.
- `server/index.ts`: Stripped production static-file serving and SPA fallback (Express was never the production server — Vercel handles that). Marked clearly as dev-only. Port changed to 3001 to avoid conflict with Vite on 3000.

### Removed
- Root-level `create-checkout-session.ts`, `webhook.ts`: Were reference/example files, not used by the app. Replaced by `api/stripe/` equivalents.

---

## [2026-05-03] — Home.tsx audit handler: async + URL normalization

### Changed
- `src/pages/Home.tsx`: `handleAudit` converted to `async`. Added URL normalization — prepends `https://` if protocol missing. Added `auditData` and `auditError` state. Prevents form submission with empty URL.

---

## [2026-05-03] — Repo hygiene / non-essentials cleanup

### Moved to `non-essentials/`
- `lighthouse_mobile.json`, `lighthouse_pc.json`, `mobile_lighthouse.pdf` — raw audit data, not app code
- `Fix Errors and Update Readme According to Provided File - Manus.pdf` / `Manus2.pdf` — external doc
- `README1.md` (empty), `pnpm-workspace.yaml.yml` (duplicate workspace file)
- `(REVIEWME_Stripe_Example_Build)universal-header-v4-master/` — Stripe reference example dir

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
