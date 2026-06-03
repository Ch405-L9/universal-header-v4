# Universal Header v4 — Security Hardening Guide (2026)

## Overview

This repository implements a modern React + Vite frontend deployed on Vercel. This document defines the **security baseline architecture** required for production deployment in 2026.

The focus is on:

* Browser-level security enforcement
* Supply chain protection
* Deployment hardening (Vercel)
* Dependency integrity
* Runtime monitoring
* XSS and injection prevention

This is not optional hardening. It is required for safe public deployment.

---

## Security Architecture Layers

### 1. HTTP Security Headers (Critical)

Configured via `vercel.json`.

Purpose:

* Prevent clickjacking
* Reduce XSS surface
* Enforce HTTPS
* Control browser feature access

Key headers:

* Strict-Transport-Security (HSTS)
* Content-Security-Policy (CSP)
* X-Frame-Options
* Permissions-Policy
* Referrer-Policy
* X-Content-Type-Options

---

### 2. Content Security Policy (CSP)

Primary defense against XSS.

Rules:

* No `unsafe-inline` in production
* No `unsafe-eval` in production
* Use `Report-Only` mode before enforcing
* Prefer nonce or hash-based script execution

React/Vite note:

* HMR requires relaxed CSP in development only
* Production must use strict CSP

---

### 3. Supply Chain Security (Critical 2026 Risk)

Modern attacks occur via npm dependencies.

Required controls:

* Dependency lockfiles (`package-lock.json`)
* No floating versions (`^`, `~`)
* Automated scanning (Socket.dev recommended)
* `npm audit` in CI
* Dependabot or Renovate enabled

Threat model includes:

* compromised npm packages
* malicious transitive dependencies
* build-time injection attacks

---

### 4. Environment Variable Security

Important Vite constraint:

* `VITE_*` variables are exposed to browser

Rules:

* NEVER store secrets in client variables
* All secrets must exist in Vercel environment config only
* Treat frontend env vars as public constants

---

### 5. Authentication Hardening (If Applicable)

Recommended patterns:

* HttpOnly cookies (preferred)
* SameSite=Lax or Strict
* Short-lived sessions
* No localStorage for tokens

---

### 6. Rate Limiting & Bot Protection

Recommended tools:

* Arcjet (Vercel-native compatible)
* Upstash Redis rate limiting
* Cloudflare Turnstile (forms)

Protection targets:

* API endpoints
* auth routes
* contact forms
* search endpoints

---

### 7. Runtime Monitoring

Required observability:

* Sentry (frontend + backend errors)
* LogRocket (session replay optional)

Purpose:

* detect injection attempts
* identify runtime crashes
* track CSP violations

---

### 8. Advanced Security Controls

Optional but recommended:

* Trusted Types (DOM XSS protection)
* Subresource Integrity (SRI)
* Cross-Origin Isolation headers
* CSP nonces (advanced)

---

## CI/CD Security (GitHub + Vercel)

Required:

* Branch protection rules
* Secret scanning enabled
* Dependabot enabled
* Enforce PR reviews
* No direct main branch pushes

---

## Security Validation Tools

* SecurityHeaders.com (header audit)
* Mozilla Observatory (TLS + header score)
* OWASP ZAP (active scanning)
* Socket.dev (supply chain analysis)

---

## Deployment Checklist

Before production:

* [ ] CSP configured (Report-Only → Enforced)
* [ ] Security headers active in Vercel
* [ ] npm dependencies locked
* [ ] npm audit clean
* [ ] secrets removed from VITE_ namespace
* [ ] rate limiting enabled
* [ ] Sentry connected
* [ ] GitHub security scanning enabled

---

## Threat Model Summary (2026)

Primary risks:

1. Dependency supply chain compromise
2. XSS via unsafe DOM rendering
3. Misconfigured CSP or headers
4. Exposed frontend secrets (VITE_)
5. API abuse without rate limiting

---

## Final Note

Security is not a single feature. It is a layered enforcement model across:

* browser
* build system
* CI/CD
* runtime
* hosting provider

This repository should be treated as a security-sensitive frontend system, not a static site.



