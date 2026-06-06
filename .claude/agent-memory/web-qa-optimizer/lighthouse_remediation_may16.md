---
name: lighthouse-remediation-may16
description: "Lighthouse audit remediation done 2026-05-16 — security headers, contrast, image sizing; open items and deliberate deferrals"
metadata:
  type: project
---

## Lighthouse remediation — 2026-05-16

Fixed P1 security, P2 SEO, P3 perf, P4 a11y from a Lighthouse audit. See [[project-conventions]].

### Done
- `vercel.json`: added COOP `same-origin`, `X-Robots-Tag: index, follow`, strengthened CSP-Report-Only (added `vercel.live` + `wss://ws-us3.pusher.com` allowlist, `require-trusted-types-for 'script'`, no unsafe-inline in script-src)
- `index.html`: preconnect/dns-prefetch for Stripe origins
- `src/index.css`: new `--primary-bright: oklch(0.72 0.16 260)` token for AA-compliant text on near-black
- Contrast swaps to `text-primary-bright` in Home.tsx (4 badges, featured button) + CheckoutButton.tsx outline variant
- `ai-dashboard` img: fixed `sizes` attr (was forcing 900w for a 384px slot)

### CSP is now ENFORCED (update 2026-06-02)
- CSP was promoted from Report-Only to enforced `Content-Security-Policy` (live in vercel.json as of 2026-06-02). `require-trusted-types-for 'script'` is NOT in the enforced string — only `script-src 'self' https://js.stripe.com https://vercel.live`.
- Enforcement caused a CRITICAL incognito-only regression: Vite's prod-injected CSS preload uses an inline `onload="this.rel='stylesheet'"` event-handler attribute. With no `'unsafe-inline'` in script-src, `script-src-attr` blocked it -> CSS never became a stylesheet -> skeleton/unstyled layout in private windows (regular windows had pre-CSP cached CSS). Fixed by adding `script-src-attr 'unsafe-inline'` (governs only inline handler attrs; inline `<script>` still blocked by script-src). Also broadened `font-src` to `'self' https://vercel.live data: https:` for injected third-party fonts (all first-party fonts self-hosted at /fonts/*.woff2). Commit edb374b on Web-Ops.
- **Lesson:** before enforcing CSP on a Vite build, check the built HTML for inline `onload` on the CSS preload link — it needs `script-src-attr 'unsafe-inline'` OR rebuild without the preload-onload pattern. Test in incognito (no CSS cache) not just a normal window.

### Earlier deferral (superseded above)
- Historically kept Report-Only per documented deferral plan; that has since been enforced. Trusted Types was planned (Radix/framer-motion may need a policy) but is not present in the current enforced CSP.
- **COEP skipped** — `require-corp` would break Stripe iframe + Cloudinary images + Vercel Live. Site has no `crossOriginIsolated` need. Only `credentialless` is viable if ever required.

**Why:** Project memory `security_hardening_may16.md` explicitly defers CSP enforcement pending 1-week observation; COEP is incompatible with the site's third-party deps.

### Open / manual actions
- `x-robots-tag: noindex` is NOT in the repo — set upstream by Vercel (likely Deployment Protection or dashboard Headers). vercel.json override added as a belt but dashboard must be checked.
- `hero-bg-1024.webp` needs recompression: `cwebp -q 72` (external step, ~11 KiB saving)
- Render delay ~610ms is JS parse of the 212KB index bundle — CSS already deferred via Vite plugin; further fix is architectural.

**How to apply:** When returning to this site, headers only verify post-deploy — check securityheaders.com + re-run Lighthouse. The `bg-primary/20 text-primary-bright` "Most Popular" badge is the tightest contrast pairing — spot-check with axe.
