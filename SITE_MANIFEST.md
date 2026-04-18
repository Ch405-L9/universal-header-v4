# Site Manifest

## Purpose

This manifest is the operational reference for editors, developers, and maintainers working on the BADGRTechnologies LLC marketing site in this repository. It documents where major sections live, which files control visual and content behavior, which references were used, and which items are complete versus intentionally staged.

## Project Summary

- App type: single-page marketing/funnel site built with React + Vite
- Brand: `BADGRTechnologies LLC`
- Primary offer: AI Consultation & Integration
- Secondary offer: Web Optimization
- Visual reference source: `public/CODEX/`
- Narrative/pricing source: `Marketing&FULLplatformNarratives.txt`
- Supporting references: `INFO & Reference ONLY/`

## Core Files

- App shell: [src/App.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/App.tsx)
- Main landing page: [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
- Privacy policy page: [src/pages/PrivacyPolicy.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/PrivacyPolicy.tsx)
- Terms page: [src/pages/TermsAndConditions.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/TermsAndConditions.tsx)
- Future route placeholder template: [src/pages/FutureRoutePage.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/FutureRoutePage.tsx)
- Shared layout, navbar, footer: [src/components/Layout.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/components/Layout.tsx)
- Theme and typography tokens: [src/index.css](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/index.css)
- HTML metadata and font loading: [index.html](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/index.html)
- ESLint flat config: [eslint.config.mjs](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/eslint.config.mjs)
- Full planning doc: [SHN.json](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/SHN.json)
- Minimal planning doc: [SHN-minimal.json](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/SHN-minimal.json)
- Video slot guidance: [BUILD_NOTES.md](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/BUILD_NOTES.md)
- Ongoing project history and internal update log: [CHANGELOG.md](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/CHANGELOG.md)
- Internal Stripe implementation reference: [STRIPE_INTEGRATION_INTERNAL.md](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/STRIPE_INTEGRATION_INTERNAL.md)

## Section Map

- Hero section:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
  Includes hero background, main message, audit CTA, and audit card.

- Services and pricing:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
  Includes `pricingCards` definitions, project/monthly toggle, and CTA buttons.

- AI section:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
  Includes AI consultation messaging, supporting visual, and ROI slider.

- Results and case-study section:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
  Includes proof points, installed video embed, and video recommendations.

- CTA band:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)

- Navbar and footer:
  [src/components/Layout.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/components/Layout.tsx)

## In-Page Anchor Definitions

These IDs are intended for internal page navigation only.

- `#services`: pricing/services section anchor
- `#pricing`: pricing/services section wrapper
- `#ai-solutions`: AI consultation section
- `#about`: anchor mapped to the AI consultation section context
- `#results`: results / proof section
- `#milestones`: anchor mapped near the results section
- `#audit`: hero audit card
- `#contact`: footer/contact area

## Definitions and Data Sources

### Hero Copy and Positioning

- Source narrative:
  [Marketing&FULLplatformNarratives.txt](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/Marketing&FULLplatformNarratives.txt)
- Current direction:
  AI consultation and integration first, web optimization second.

### Pricing Definitions

- Current card definitions live in:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
- Card source object:
  `pricingCards`
- Toggle state:
  `isAnnual`
- Pricing logic:
  project mode = fixed-scope offer ladder
  monthly mode = partner/retainer ladder

### ROI Slider

- State:
  `leadCount`
- Calculation helper:
  `calculateROI`
- File:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)

### Navigation and Scroll Behavior

- Scroll helper:
  `scrollToSection`
- Files:
  [src/pages/Home.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/Home.tsx)
  [src/components/Layout.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/components/Layout.tsx)

### Theme and Fonts

- Theme tokens:
  [src/index.css](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/index.css)
- Font loading:
  [index.html](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/index.html)
- Current intent:
  Goldman for display treatment, Satoshi for section/UI copy, with fallbacks.

### Stripe and Payment Definitions

- Internal Stripe/payment spec:
  [STRIPE_INTEGRATION_INTERNAL.md](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/STRIPE_INTEGRATION_INTERNAL.md)
- Change history and migration summary:
  [CHANGELOG.md](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/CHANGELOG.md)
- Legacy Stripe/payment reference repo:
  `/home/t0n34781/Turner-Review|Compare_Manus-18-1228/universal-header-v4-master (1)/universal-header-v4-master`
- Legacy Stripe files of record:
  `api/stripe/create-checkout-session.ts`
  `api/stripe/webhook.ts`
  `src/config/payment.ts`
  `src/utils/pricing.ts`
  `src/hooks/useStripeCheckout.ts`
  `src/hooks/usePaymentCalculator.ts`
  `src/components/PaymentCalculator.tsx`
  `src/components/CheckoutButton.tsx`
- Stripe environment variable names:
  `STRIPE_SECRET_KEY`
  `STRIPE_WEBHOOK_SECRET`
  `VITE_STRIPE_PUBLISHABLE_KEY`
  `VITE_APP_URL`

## Reference Assets

- Approved layout comps:
  `public/CODEX/DEMO-Shot.png`
  `public/CODEX/ai_opt_consult.png`
  `public/CODEX/case-study_vid.png`
  `public/CODEX/interactive_pay-cta.png`
  `public/CODEX/ready-2-scale_cta-about.png`
  `public/CODEX/footer.png`

- Hero background:
  `public/images/hero-atlanta-cyber.png`

- Installed results video:
  `public/videos/badgr-private-ai-front-desk.mp4`

- Primary logo:
  `public/images/logo.png`

- Optional legal wordmark:
  `public/images/review_images/badgr_official_logo(chrm).png`

## Footer Link Status

- Internal links currently intended to stay within this site:
  `About Us`, `Contact Us`, `BADGRTech Milestones`

- Routed placeholder pages currently live:
  `Partners`, `Investors`, `Additional Services`

- Live legal links:
  `Privacy Policy`, `Terms & Conditions`

- Social/external links:
  Instagram, LinkedIn, GitHub are live external links.

## Buttons and CTA Status

### Currently Wired

- Hero primary CTA
- Hero secondary CTA
- Navbar section buttons
- Mobile nav buttons
- Audit card CTA
- Pricing/service card CTAs
- ROI slider
- Results CTA
- CTA band buttons

### Intentionally Staged

- Future route placeholders for `Partners`, `Investors`, and `Additional Services`

## Route Definitions

- Live routes:
  `/`
  `/privacy`
  `/terms`

- Safe placeholder routes:
  `/partners`
  `/investors`
  `/additional-services`

- Planned future routes:
  `/pricing`
  `/success`
  `/cancel`
  `/services/*`

- Route wiring file:
  [src/App.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/App.tsx)

- Placeholder route tutorial:
  [src/pages/FutureRoutePage.tsx](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/src/pages/FutureRoutePage.tsx)
  This contains the inline `"This goes here --->"` guidance for future routed pages.

## Legal Reference Sources

- Privacy reference:
  [INFO & Reference ONLY/privpolicy.txt](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/INFO%20&%20Reference%20ONLY/privpolicy.txt)

- Terms reference:
  [INFO & Reference ONLY/terms&conditions.txt](/home/t0n34781/Turner-Review|Compare_Manus-18-1228/INFO%20&%20Reference%20ONLY/terms&conditions.txt)

These are reference documents only at this stage and are not yet rendered as live site routes/pages.
The live site pages were rewritten from these references to better match the
current BADGR offer and visual system.

## TODOs

### Tier 1: Needs Completion Now

- Final visual QA pass against `public/CODEX/` screenshots at desktop and mobile widths.

### Tier 2: Complete Before Publish If Time Allows

- Add dedicated sections or routed pages for:
  `Additional Services`, `BADGRTech Milestones`, `Partners`, `Investors`
- Reintroduce Stripe payment flow into this repo using the internal Stripe specification and the legacy repo as a reference, not a direct copy.
- Add dedicated routed service detail pages under `/services/*` so future offers can expand without overloading the landing page.
- Review legal language with counsel or business owner before public launch if needed.
- Replace the current icon placeholders in the hero trust band with approved real marks, stats, or client-safe proof.
- Finalize footer copy and legal microcopy against approved business wording.
- Add accessibility polish for all temporary placeholder links and video affordance language.

### Tier 3: Nice To Have / Better Later

- Replace compact navbar branding with a more refined brand system if a final legal wordmark treatment is approved.
- Introduce dedicated content/data modules for pricing, footer links, and section copy instead of keeping all content in `Home.tsx`.
- Add analytics/event tracking for CTA clicks, audit submissions, and section engagement.
- Add image optimization pass for all public assets and poster images.

## Editor Notes

- Prefer keeping internal section navigation on-page unless the site architecture expands.
- Keep the visual system aligned to the CODEX comps unless a change clearly improves fidelity or accessibility.
- When changing pricing, update the `pricingCards` object rather than hand-editing individual card markup.
- When adding new internal anchors, update both the footer/nav links and this manifest.
