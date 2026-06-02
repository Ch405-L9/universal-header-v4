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
    name: "Cash-Medical Diagnostic Scan",
    tier: "Tier 1",
    fullPrice: 75000,
    depositAmount: 25000,   // $250 deposit to start
    depositLabel: "$250 deposit · balance due at delivery",
    description: "Cash-medical site friction audit — maps what to fix and in what order.",
    currency: "usd",
  },
  "lead-leak-fix": {
    id: "lead-leak-fix",
    name: "14-Day Cash-Medical Lead Leak Fix",
    tier: "Tier 2",
    fullPrice: 250000,
    depositAmount: 75000,  // $750 deposit to start
    depositLabel: "$750 deposit · balance due at delivery",
    description: "14-day scan, fix, and proof-of-improvement engagement.",
    currency: "usd",
  },
  "rebuild-lite": {
    id: "rebuild-lite",
    name: "Conversion Rebuild Lite",
    tier: "Tier 3",
    fullPrice: 650000,
    depositAmount: 200000,  // $2,000 deposit to start
    depositLabel: "$2,000 deposit · balance due at delivery",
    description: "Conversion-first site refresh for structurally weak cash-medical sites.",
    currency: "usd",
  },
};

export function getService(id: string): ServiceConfig | null {
  return services[id as ServiceId] ?? null;
}
