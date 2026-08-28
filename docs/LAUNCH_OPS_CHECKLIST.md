# BADGRTechnologies Launch Ops Checklist

Use this checklist before and after any production launch, Vercel redeploy, Stripe change, email-provider change, DNS edit, or major copy/SEO update.

## Production Source Of Truth

- Production branch: `Web-Ops`
- Production repo: `https://github.com/Ch405-L9/universal-header-v4`
- Live site: `https://badgrtech.com`
- Production Vercel project: `badgrtech-live`
- Primary domain: `badgrtech.com`
- Public form endpoint: `/api/lighthouse-scan-request`
- Stripe checkout endpoint: `/api/stripe/create-checkout-session`

## Pre-Launch Local Checks

Run from repo root:

```bash
pnpm install
pnpm check
pnpm build
pnpm audit --prod
pnpm lint
git diff --check
```

Expected:

- `pnpm check`: no TypeScript errors.
- `pnpm build`: production build completes.
- `pnpm audit --prod`: no known production vulnerabilities.
- `pnpm lint`: exits successfully. Existing import-order warnings are known.
- `git diff --check`: no whitespace errors.

## Required Production Environment Variables

Set these in Vercel project `badgrtech-live`.

| Variable | Required | Notes |
|---|---:|---|
| `STRIPE_SECRET_KEY` | Yes | Must start with `sk_`. No IP restrictions because Vercel uses dynamic infrastructure. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Yes | Must start with `pk_`. Use live key for production. |
| `RESEND_API_KEY` | Yes | Preferred production email sender. |
| `RESEND_FROM` | Yes | Use verified sender, for example `BADGRTechnologies <hello@badgrtech.com>`. |
| `SCAN_REQUEST_TO` | Yes | Owner inbox for triage requests. |
| `VITE_APP_URL` | Recommended | Defaults to `https://badgrtech.com` if absent. |
| `PAGESPEED_API_KEY` | Recommended | Prevents Google public PageSpeed quota exhaustion for score previews. |
| `STRIPE_WEBHOOK_SECRET` | Optional | Required only if relying on webhook verification. Checkout works without it. |

Never commit `.env`, `.env.local`, `.env*.local`, Stripe keys, Resend keys, GitHub tokens, or Vercel tokens.

## DNS Checklist

Confirm at Namecheap or current DNS provider:

- Apex `@` points to the Vercel production target expected by `badgrtech-live`.
- `www` points to the Vercel production target.
- Proton MX records remain intact if Proton is the mailbox provider.
- Resend DKIM/SPF records are verified if sending from `hello@badgrtech.com`.
- DMARC exists and does not accidentally reject legitimate provider mail.

## Live Business Flow Test

Use a real inbox and real phone number.

1. Open `https://www.badgrtech.com/`.
2. Click `Request A Triage Call`.
3. Submit a triage request using business-only test information.
4. Confirm the success message appears.
5. Confirm email arrives in the owner inbox.
6. Open `/sample-report` and download the PDF.
7. Open `/free-lighthouse-scan` and confirm the page loads.
8. Open `/privacy` and `/terms`.
9. Click each pricing checkout button once and stop at Stripe checkout.
10. Confirm no checkout button shows a generic failure message.

## Live Technical Smoke Test

```bash
for url in \
  https://www.badgrtech.com/ \
  https://www.badgrtech.com/free-lighthouse-scan \
  https://www.badgrtech.com/sample-report \
  https://www.badgrtech.com/hipaa-aware-web-operations \
  https://www.badgrtech.com/additional-services \
  https://www.badgrtech.com/privacy \
  https://www.badgrtech.com/portfolio \
  https://www.badgrtech.com/portfolio/cwalts \
  https://www.badgrtech.com/portfolio/badgr-bolt \
  https://www.badgrtech.com/portfolio/badgr-harness \
  https://www.badgrtech.com/portfolio/badgr-ai-ops \
  https://www.badgrtech.com/portfolio/web-ops \
  https://www.badgrtech.com/terms; do
  curl -sS -L -o /dev/null -w "$url -> %{http_code}\n" "$url"
done
```

Expected: all public routes return `200`.

Check headers:

```bash
curl -sS -I https://www.badgrtech.com/ | rg -i \
  'content-security-policy|strict-transport-security|x-frame-options|x-content-type-options|permissions-policy|x-robots-tag'
```

Expected: CSP, HSTS, X-Frame-Options, nosniff, Permissions-Policy, and X-Robots-Tag are present.

## Portfolio Release Path

1. Verify the PR preview for `/portfolio` and all five `/portfolio/*` routes, including desktop and mobile navigation.
2. Confirm the business homepage still uses its business navigation, triage CTA, and section anchors.
3. Merge the approved PR into `Web-Ops`; `badgrtech-live` automatically builds the production branch.
4. Confirm the production deployment commit matches `Web-Ops`, then run the live technical smoke test above.
5. If a release must be promoted from a preview deployment, record the deployment URL and commit SHA, then merge the same commit into `Web-Ops` immediately so repository lineage remains aligned with production.

## Rollback Plan

If production breaks:

1. Stop making new edits.
2. Identify the last known-good Vercel deployment in `badgrtech-live`.
3. Use Vercel dashboard rollback or redeploy the last known-good commit.
4. Confirm live route status and form/checkout flow.
5. Open a new fix branch. Do not hot-edit `Web-Ops` directly unless the business is down.

## Vercel Project Hygiene

Recommended operating model:

- Keep `badgrtech-live` as the only production project for `badgrtech.com`.
- Keep one backup/preview project if it has a clear purpose.
- Archive or disconnect duplicate Vercel projects that deploy the same repo and confuse status checks.
- Keep unrelated projects, such as `cakedXpressions`, separate but under the same Vercel team/account if that is easier for billing and access.

## Monthly Maintenance

- Run `pnpm audit --prod`.
- Confirm Vercel env vars still exist.
- Confirm Resend domain remains verified.
- Confirm Stripe checkout still creates sessions.
- Run Lighthouse on homepage and key landing pages.
- Review form submissions and failed submission logs.
- Update `CHANGELOG.md` for production changes.
