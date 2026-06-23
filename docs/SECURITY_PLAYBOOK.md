# BADGRTECH Security Playbook

Branch: `Web-Ops`
Last updated: 2026-05-16

---

## Quarterly Security Audit Checklist

Run these checks every 90 days (next due: 2026-08-16).

### 1. Dependency Vulnerabilities

```bash
cd ~/universal-header-v4-Web-Ops
pnpm audit
```

Target: 0 vulnerabilities. If high/critical found:
1. Check if `pnpm.overrides` in `package.json` can patch the affected package
2. Remove unused dependencies first (run `npx depcheck`)
3. Open a PR titled `security: patch [package] [CVE-ID]`

### 2. Security Headers Live Verification

```bash
curl -sI https://www.badgrtech.com | grep -Ei 'content-security|strict-transport|x-frame|x-content|referrer|permissions|x-robots|cross-origin'
```

Required headers (all must be present):

| Header | Expected Value |
|--------|----------------|
| `strict-transport-security` | `max-age=63072000; includeSubDomains; preload` |
| `x-content-type-options` | `nosniff` |
| `x-frame-options` | `DENY` |
| `referrer-policy` | `strict-origin-when-cross-origin` |
| `permissions-policy` | `camera=(), microphone=(), geolocation=()` |
| `cross-origin-opener-policy` | `same-origin` |
| `x-robots-tag` | `index, follow` |
| `content-security-policy-report-only` OR `content-security-policy` | Present |

**Critical**: `x-robots-tag: noindex` will tank SEO. If it appears, check Vercel dashboard → Project Settings → Deployment Protection and disable for production.

### 3. CSP Violation Review

CSP violations appear in browser DevTools console and (once wired) in the report-uri endpoint. Before promoting CSP from Report-Only to enforcement:

1. Open Chrome DevTools on badgrtech.com
2. Check Console for `Content-Security-Policy` violation reports
3. Zero violations required before enforcement promotion
4. Edit `vercel.json`: rename `Content-Security-Policy-Report-Only` → `Content-Security-Policy`

### 4. HSTS Preload Status

Check preload list inclusion status:
- Visit: https://hstspreload.org/?domain=badgrtech.com
- Target: "preloaded" status

If not yet preloaded, submit at https://hstspreload.org. Current HSTS header qualifies.

### 5. Lighthouse Score Gates

```bash
./scripts/validate-lighthouse.sh --url=https://badgrtech.com
./scripts/validate-lighthouse.sh --url=https://badgrtech.com --mobile
```

Score targets:

| Category | Desktop Target | Mobile Target |
|----------|:--------------:|:-------------:|
| Performance | ≥ 95 | ≥ 90 |
| Accessibility | ≥ 96 | ≥ 96 |
| Best Practices | ≥ 92 | ≥ 92 |
| SEO | ≥ 90 | ≥ 90 |

---

## Header Configuration Reference

All headers live in `vercel.json` under the `headers` array. The global block (`source: "/(.*)"`) applies to every response.

### Updating CSP

The CSP value is one long semicolon-delimited string. Format:
```
directive-name 'source1' source2; next-directive ...
```

Current allowed sources per directive:
- `script-src`: `'self'`, `https://js.stripe.com`, `https://vercel.live`
- `connect-src`: `'self'`, `https://api.stripe.com`, `https://vercel.live`, `wss://ws-us3.pusher.com`
- `frame-src`: `'self'`, `https://js.stripe.com`, `https://vercel.live`

When adding a new third-party service, add its domain to every relevant directive before deploying.

### Adding a New Header

1. Edit `vercel.json`
2. Add `{ "key": "Header-Name", "value": "header-value" }` to the global headers array
3. Validate via `security-headers-test.yml` workflow
4. The `security-headers-test.yml` CI workflow checks for required headers on every `vercel.json` change

---

## Vulnerability Remediation SOP

### Severity: Critical / High

1. Create hotfix branch: `git checkout -b security/fix-[cve-id]`
2. Add to `pnpm.overrides` in `package.json` to pin patched version
3. Run `pnpm install` to update lockfile
4. Verify `pnpm audit` clears the specific CVE
5. Run `pnpm run build` to confirm no breakage
6. Open PR with title: `security: patch [CVE-ID] — [package-name]`
7. Merge and deploy same day

### Severity: Moderate

1. Track in Dependabot PR (auto-created weekly)
2. Merge within 14 days
3. Verify build passes

### Severity: Low

1. Track in Dependabot PR
2. Batch with next release cycle

### Non-actionable Categories

These appear in audit output but require no action:

| Category | Reason |
|----------|--------|
| `@vercel/node` transitive chain | Vercel-managed. No override path. Monitor for `@vercel/node` releases. |
| Dev-only tooling (`vite`, `esbuild`) | Dev server attack surface only. No production exposure. |

---

## Incident Response

### Site returning x-robots-tag: noindex

**Impact**: Search engines de-index the site within hours.

1. Check Vercel dashboard → Project Settings → Deployment Protection
2. Ensure "Vercel Authentication" is disabled for Production
3. Check vercel.json `X-Robots-Tag` value is `index, follow`
4. Deploy a no-op commit to force redeploy: `git commit --allow-empty -m "chore: force redeploy"`

### CSP Enforcement Blocking Stripe

Symptoms: Stripe checkout fails, console shows `Refused to frame 'https://js.stripe.com'`

1. Immediately revert CSP to Report-Only in `vercel.json`
2. Check which directive is blocking (`frame-src`, `script-src`, `connect-src`)
3. Add the missing Stripe source
4. Verify fix in Report-Only mode (no console errors)
5. Re-promote to enforcement

### High Lighthouse Performance Drop

1. Check if new images were added without WebP conversion
2. Check if new JS dependencies were added (run `pnpm run build` and review bundle size)
3. Check if a new third-party script was added without `async`/`defer`
4. Run `./scripts/validate-lighthouse.sh` to quantify regression

---

## Automation Overview

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `security.yml` | Every push/PR | Dependency audit + build gate |
| `security-headers-test.yml` | `vercel.json` changes | Header syntax + required header validation |
| `dependency-audit.yml` | Mondays 9 AM | Weekly audit + artifact upload |
| `lighthouse-ci.yml` | Every PR to Web-Ops | Lighthouse score gates + PR comment |
| Dependabot | Weekly | Auto-PR for dependency updates |

---

## 30-Day Roadmap (from May 2026)

- [ ] Promote CSP from Report-Only to enforcement (scheduled: May 23, 2026)
- [ ] Submit to HSTS preload list
- [ ] Add report-uri endpoint for CSP violation aggregation
- [ ] SEO audit: structured data validation, meta description coverage, canonical URL audit

## 90-Day Roadmap

- [ ] Add Subresource Integrity (SRI) hashes for any CDN-hosted assets
- [ ] Review COOP impact after 90 days of Stripe data (currently `same-origin` — working)
- [ ] Implement Permissions-Policy for additional APIs as they are added
