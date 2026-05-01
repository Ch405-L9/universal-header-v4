/**
 * Web-ops service catalog and deposit logic.
 * Matches pricing tiers in funnel.ts — single source of truth for amounts.
 */

export type ServiceId =
  | "diagnostic-scan"
  | "lead-leak-fix"
  | "rebuild-lite";

export interface ServiceConfig {
  id: ServiceId;
  name: string;
  tier: string;
  fullPrice: number;        // in cents
  depositAmount: number;    // in cents — what Stripe charges at checkout
  depositLabel: string;
  description: string;
  currency: "usd";
}

export const services: Record<ServiceId, ServiceConfig> = {
  "diagnostic-scan": {
    id: "diagnostic-scan",
    name: "Diagnostic Scan",
    tier: "Tier 1",
    fullPrice: 150000,
    depositAmount: 50000,   // $500 deposit to start
    depositLabel: "$500 deposit · balance due at delivery",
    description: "Site friction audit — maps what to fix and in what order.",
    currency: "usd",
  },
  "lead-leak-fix": {
    id: "lead-leak-fix",
    name: "14-Day Lead Leak Fix",
    tier: "Tier 2",
    fullPrice: 300000,
    depositAmount: 100000,  // $1,000 deposit to start
    depositLabel: "$1,000 deposit · balance due at delivery",
    description: "14-day scan, fix, and proof-of-improvement engagement.",
    currency: "usd",
  },
  "rebuild-lite": {
    id: "rebuild-lite",
    name: "Rebuild Lite",
    tier: "Tier 3",
    fullPrice: 450000,
    depositAmount: 150000,  // $1,500 deposit to start
    depositLabel: "$1,500 deposit · balance due at delivery",
    description: "Conversion-first site refresh for structurally weak sites.",
    currency: "usd",
  },
};

export function getService(id: string): ServiceConfig | null {
  return services[id as ServiceId] ?? null;
}
