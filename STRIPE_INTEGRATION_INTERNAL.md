# Stripe Integration Internal Specification

**Status:** Internal Engineering Reference (DO NOT SHIP)  
**Scope:** Payment architecture, Stripe Checkout Session flow, environment configuration

---

## 1. System Overview

This project uses a **Stripe Checkout Session-based payment model** with a **server-orchestrated dynamic pricing (deposit-based) flow**.

Key characteristics:

- No Stripe fixed price catalog (`price_` objects are not required at runtime)
- Checkout Sessions are generated dynamically per request
- Payment amount is derived server-side from service selection input
- Stripe is used strictly as a payment processor layer

---

## 2. Payment Architecture

### Flow

1. User selects service in frontend
2. Frontend sends service identifier to backend API
3. Backend resolves pricing rules (deposit logic handled outside Stripe)
4. Backend creates Stripe Checkout Session
5. Stripe handles payment UI + processing
6. User is redirected to success/cancel route
7. Optional webhook finalizes fulfillment logic

---

## 3. Required Environment Variables

These must be defined per deployment environment.

### Server-side

- `STRIPE_SECRET_KEY` required
- `STRIPE_WEBHOOK_SECRET` optional but recommended

### Client-side (Vite)

- `VITE_STRIPE_PUBLISHABLE_KEY` required
- `VITE_APP_URL` required for redirects

### Example Placeholders Only

```env
STRIPE_SECRET_KEY=sk_live_or_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_xxx
VITE_APP_URL=https://your-domain.com
```

---

## 4. Backend API Contracts

### 4.1 Create Checkout Session

**Endpoint**

```text
POST /api/stripe/create-checkout-session
```

**Input**

```json
{
  "serviceId": "string",
  "metadata": {}
}
```

**Output**

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

**Responsibilities**

- Resolve service pricing rules
- Compute deposit amount when applicable
- Create Stripe Checkout Session
- Return redirect URL

### 4.2 Webhook Handler

**Endpoint**

```text
POST /api/stripe/webhook
```

**Events handled**

- `checkout.session.completed`

**Responsibilities**

- Verify Stripe signature
- Confirm payment completion
- Trigger downstream workflows such as email, CRM, onboarding

---

## 5. Stripe Session Configuration

Sessions are created using:

- `mode: "payment"`
- dynamically constructed `line_items`
- `success_url = ${VITE_APP_URL}/success`
- `cancel_url = ${VITE_APP_URL}/cancel`

No reliance on pre-created Stripe Price IDs is required.

---

## 6. Frontend Integration

### Required library

- `@stripe/stripe-js`

### Initialization

```ts
loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

### Checkout trigger flow

- User action triggers API request
- API returns Stripe checkout URL
- Browser redirects to Stripe-hosted checkout page

---

## 7. Routing Requirements

Frontend should implement:

- `/pricing`
- `/success`
- `/cancel`

Optional future structure:

- `/services/*`

---

## 8. Payment Model Rules

- Stripe is treated as a transaction processor only
- Pricing logic exists outside Stripe
- Deposit-based payments are supported per service configuration
- No dependency on Stripe product catalog is required

---

## 9. Security Rules

- `STRIPE_SECRET_KEY` must never be exposed client-side
- Webhook signature verification is mandatory when webhook handling is enabled
- Environment variables must not be committed to git

---

## 10. Deployment Notes

Environment variables are expected to be set in:

- Vercel or hosting provider dashboard
- `.env` for local development only

Do not commit `.env` files.

---

## 11. Git Safety / Ignore Rules

Ensure the following are excluded from version control:

```text
.env
.env.local
.env.*.local
```

This document is internal-only and should remain a repo reference, not a customer-facing asset.

---

## 12. Legacy Stripe Source Of Truth

The previous implementation lives in:

`/home/t0n34781/Turner-Review|Compare_Manus-18-1228/universal-header-v4-master (1)/universal-header-v4-master`

Primary files:

- `api/stripe/create-checkout-session.ts`
- `api/stripe/webhook.ts`
- `src/config/payment.ts`
- `src/utils/pricing.ts`
- `src/hooks/useStripeCheckout.ts`
- `src/hooks/usePaymentCalculator.ts`
- `src/components/PaymentCalculator.tsx`
- `src/components/CheckoutButton.tsx`

These files should be treated as migration references, not copied blindly, because the current site has a different service catalog and IA.

---

## 13. Implementation Summary

This system is a **dynamic Stripe Checkout orchestration layer**, designed to:

- support flexible AI service offerings
- avoid rigid Stripe catalog dependencies
- enable deposit-based or full-payment flows per service

---

**End of specification**
