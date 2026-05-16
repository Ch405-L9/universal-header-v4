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

### Deliberate deviations from the task
- **CSP NOT enforced** — kept Report-Only per the documented deferral plan. To enforce: rename header key `Content-Security-Policy-Report-Only` -> `Content-Security-Policy` after zero-violation observation. Test Trusted Types (Radix/framer-motion may need a policy).
- **COEP skipped** — `require-corp` would break Stripe iframe + Cloudinary images + Vercel Live. Site has no `crossOriginIsolated` need. Only `credentialless` is viable if ever required.

**Why:** Project memory `security_hardening_may16.md` explicitly defers CSP enforcement pending 1-week observation; COEP is incompatible with the site's third-party deps.

### Open / manual actions
- `x-robots-tag: noindex` is NOT in the repo — set upstream by Vercel (likely Deployment Protection or dashboard Headers). vercel.json override added as a belt but dashboard must be checked.
- `hero-bg-1024.webp` needs recompression: `cwebp -q 72` (external step, ~11 KiB saving)
- Render delay ~610ms is JS parse of the 212KB index bundle — CSS already deferred via Vite plugin; further fix is architectural.

**How to apply:** When returning to this site, headers only verify post-deploy — check securityheaders.com + re-run Lighthouse. The `bg-primary/20 text-primary-bright` "Most Popular" badge is the tightest contrast pairing — spot-check with axe.
