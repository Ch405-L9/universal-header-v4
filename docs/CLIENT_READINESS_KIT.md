# BADGRTechnologies Client Readiness Kit

This is the lightweight business-ops kit for turning live site traffic into qualified triage calls and scoped work.

## Triage Call Script

Goal: confirm fit, risk, urgency, and the next safe step. Keep it to 15 minutes.

1. “What type of practice do you run, and what services matter most right now?”
2. “What is your website failing to do well enough today?”
3. “Where do patients usually come from: search, referrals, ads, social, directories, or existing relationships?”
4. “Do your public forms collect only business-safe contact information, or do patients ever submit medical details?”
5. “Do you have current privacy, NPP, accessibility, and booking/portal links visible on the site?”
6. “Who owns website edits, hosting, analytics, forms, and domain access?”
7. “Is this mainly a clarity scan, a 14-day fix sprint, or a rebuild conversation?”
8. “If we find a HIPAA/ePHI issue, who is your compliance or legal contact for final review?”

Close:

“Based on this call, the next step I recommend is [Risk & Trust Scan / 14-Day Leak & Trust Fix Sprint / Rebuild Lite / not a fit]. I’ll send a plain-English scope and next steps.”

## One-Page Risk & Trust Scan Scope

Use this structure for a simple paid scan proposal.

### Client

- Practice name:
- Contact:
- Website:
- Practice type:
- Target services:

### Scope

- Public website speed and Core Web Vitals review.
- Mobile booking, call, and contact-path review.
- No-PHI public form review.
- Privacy, NPP, accessibility, and trust-signal visibility review.
- Local visibility and basic search presentation review.
- Plain-English Risk & Trust findings report.
- Fix-order recommendation.

### Out Of Scope

- Legal advice.
- HIPAA compliance certification.
- Full security audit or penetration test.
- Clinical workflow review.
- Patient portal configuration unless separately scoped.
- PHI intake through public marketing forms.

### Deliverable

- Owner-readable PDF or web report.
- Prioritized findings.
- Recommended next step.
- Optional 14-day fix sprint scope.

## BAA / SOW Readiness Notes

Prepare these before selling scopes that may touch ePHI:

- Counsel-reviewed BAA template.
- Counsel-reviewed SOW template.
- Access request checklist.
- Tool/vendor list.
- Data handling statement.
- Incident escalation contact.
- Termination/offboarding checklist.

Do not promise HIPAA compliance. Promise disciplined, documented, HIPAA-aware website operations and confirm final compliance obligations with counsel or the client’s compliance owner.

## Lead Tracking Sheet Columns

- Date received
- Lead source
- Practice/business name
- Contact name
- Email
- Phone
- Website
- Practice type
- Primary concern
- Consent confirmed
- Status
- Next step
- Package fit
- Estimated value
- Follow-up date
- Notes

## Owner Live Flow Test Prompt

Give this to a capable assistant or use it yourself.

```text
You are testing BADGRTechnologies production business flows as a cautious medical practice manager. Use only business-safe test information. Do not submit PHI, patient records, passwords, medical details, or confidential information.

Test these flows:
1. Open https://www.badgrtech.com/
2. Confirm the hero clearly says what BADGRTechnologies does and for whom.
3. Click Request A Triage Call.
4. Submit the form with a real owner-controlled email and phone number.
5. Confirm the browser success message.
6. Confirm the owner inbox receives the Risk & Trust triage email.
7. Open https://www.badgrtech.com/sample-report and download the sample PDF.
8. Open https://www.badgrtech.com/free-lighthouse-scan and confirm the proof images and form load.
9. Open /privacy and /terms and confirm no-PHI language is visible.
10. Click each paid package checkout button once and stop at the Stripe checkout page. Do not complete payment.

Report:
- What worked
- What failed
- Any confusing language
- Any trust concerns
- Screenshots of failures only
```
