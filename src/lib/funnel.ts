/**
 * Funnel Engine — BADGRTechnologies LLC
 *
 * Conversion path definitions, micro-intent routing,
 * package recommendation logic, and flywheel loop map.
 */

export type FunnelStage = "aware" | "evaluating" | "deciding" | "converting";

export interface ConversionPath {
  entrySignal: string;     // what the user just did
  stage: FunnelStage;
  nextAction: string;      // what we push them toward
  anchor: string;          // where on page
}

// ─── Micro-intent paths ──────────────────────────────────────────────────────

export const conversionPaths: ConversionPath[] = [
  {
    entrySignal: "landed on page",
    stage: "aware",
    nextAction: "Submit site URL for lead leak preview",
    anchor: "#audit",
  },
  {
    entrySignal: "submitted audit URL",
    stage: "evaluating",
    nextAction: "Review diagnosis and match to a package",
    anchor: "#pricing",
  },
  {
    entrySignal: "viewed pricing",
    stage: "deciding",
    nextAction: "Book 15-minute triage call",
    anchor: "#contact",
  },
  {
    entrySignal: "submitted triage form",
    stage: "converting",
    nextAction: "Await follow-up within one business day",
    anchor: "#contact",
  },
];

// ─── Package recommendation by audit score ───────────────────────────────────

export type PackageRecommendation = {
  packageName: string;
  tier: string;
  price: string;
  reason: string;
  urgency: string;
  anchor: string;
};

export function recommendPackage(score: number): PackageRecommendation {
  if (score >= 68) {
    return {
      packageName: "Diagnostic Scan",
      tier: "Tier 1",
      price: "From $1,500",
      reason: "Your site has a foundation but specific friction points are costing you leads. A scan maps exactly what to fix and in what order.",
      urgency: "Get clarity before your next marketing spend.",
      anchor: "#pricing",
    };
  }
  if (score >= 40) {
    return {
      packageName: "14-Day Lead Leak Fix",
      tier: "Tier 2 — Most common",
      price: "From $3,000",
      reason: "Your site has multiple friction points across speed, trust, and CTA flow. The 14-day engagement scans, fixes, and delivers proof.",
      urgency: "Every week of delay costs you leads you cannot recover.",
      anchor: "#pricing",
    };
  }
  return {
    packageName: "Rebuild Lite",
    tier: "Tier 3",
    price: "From $4,500",
    reason: "Your site's issues run deeper than patchwork fixes can solve. A conversion-first refresh is the faster path to leads.",
    urgency: "Patching a structurally weak site delays the result and costs more long-term.",
    anchor: "#pricing",
  };
}

// ─── Flywheel loop map ───────────────────────────────────────────────────────

export const flywheelLoops = [
  {
    id: "audit-to-triage",
    trigger: "User submits audit URL",
    loop: "Score shown → package recommended → triage CTA surfaced → form submitted",
    retention: "Before-and-after report delivered → client shares with peers",
  },
  {
    id: "faq-to-pricing",
    trigger: "User reads 3+ FAQs",
    loop: "Informational trust built → commercial intent confirmed → pricing CTA surfaced",
    retention: "FAQ answers pre-handle objections → reduces triage call length",
  },
  {
    id: "proof-to-triage",
    trigger: "User scrolls past results section",
    loop: "Credibility established → sticky CTA visible → triage form submitted",
    retention: "Report example sets expectation → referral from satisfied client",
  },
];

// ─── Scroll depth milestones ─────────────────────────────────────────────────

export const scrollMilestones = [
  { id: "services", label: "Viewed services" },
  { id: "proof",    label: "Viewed proof section" },
  { id: "faq",      label: "Reached FAQ" },
  { id: "contact",  label: "Reached contact" },
] as const;

export type MilestoneId = typeof scrollMilestones[number]["id"];
