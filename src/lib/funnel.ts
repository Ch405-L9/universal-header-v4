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
    nextAction: "Request a free website check",
    anchor: "/free-lighthouse-scan#scan-form",
  },
  {
    entrySignal: "submitted free website check request",
    stage: "evaluating",
    nextAction: "Review diagnosis and match to a package",
    anchor: "#pricing",
  },
  {
    entrySignal: "viewed pricing",
    stage: "deciding",
    nextAction: "Request a free website check",
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
      packageName: "Website Tune-Up",
      tier: "One-time",
      price: "$349",
      reason: "Your site has a solid foundation with a few fixable issues. A Tune-Up covers up to three public pages with an agreed fix list.",
      urgency: "Start with a free website check to confirm the scope.",
      anchor: "#pricing",
    };
  }
  if (score >= 40) {
    return {
      packageName: "Tune-Up Plus",
      tier: "Quoted after a free check",
      price: "$699",
      reason: "Your site has several issues across speed, layout, and inquiry paths. Tune-Up Plus covers up to five pages with deeper performance and on-page work.",
      urgency: "A free check confirms whether Plus is the right fit.",
      anchor: "#pricing",
    };
  }
  return {
    packageName: "Website Optimization Sprint",
    tier: "Quoted after a free check",
    price: "$1,199",
    reason: "Your site needs broader work. The Optimization Sprint covers up to ten pages with prioritized deeper fixes. Complete rebuilds are quoted separately.",
    urgency: "A free check confirms scope and technical fit first.",
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
    retention: "FAQ answers pre-handle objections → reduces back-and-forth before scoping",
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
