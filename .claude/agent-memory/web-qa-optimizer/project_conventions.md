---
name: project-conventions
description: "badgrtech.com stack conventions — Tailwind v4 CSS-config, color tokens, CSS deferral, build layout"
metadata:
  type: project
---

## badgrtech.com (universal-header-v4-Web-Ops) conventions

- **Tailwind v4** — no `tailwind.config.*` file. Theme tokens live in `src/index.css` under `@theme inline` (maps `--color-*` to `--*` vars) and `:root` / `.dark` blocks. To add a Tailwind color utility, define `--color-NAME: var(--NAME)` in `@theme inline` AND the `--NAME` value in `:root` + `.dark`.
- **Color tokens**: `--primary` is dark cobalt `oklch(0.4 0.22 260)` — fine for `bg-primary` (white text), too dark for `text-primary` on near-black. Use `--primary-bright` `oklch(0.72 0.16 260)` for text/border on dark sections.
- **CSS deferral**: `vite.config.ts` has a `deferNonCriticalCss` plugin that rewrites built `<link rel=stylesheet>` to async `preload`+`onload`. Critical above-the-fold CSS is inlined in `index.html`. CSS is NOT render-blocking — confirmed working.
- **Build**: Vite, output `dist/public`. Routes lazy-loaded in `src/App.tsx` (wouter). Vendors split via `manualChunks`.
- **Architecture**: SPA, no backend API. Stripe = frontend redirect to Hosted Checkout. Hosted on Vercel.
