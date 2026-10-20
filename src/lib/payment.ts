/**
 * Web-ops service catalog for Stripe Checkout.
 * Single source of truth for amounts. Full payment is the default;
 * deposits are arranged on request outside this checkout.
 */

export type ServiceId = "website-tune-up" | "care-essential";

export interface ServiceConfig {
  id: ServiceId;
  name: string;
  tier: string;
  amount: number;            // in cents — what Stripe charges
  billing: "one_time" | "monthly";
  checkoutDescription: string;
  currency: "usd";
}

export const services: Record<ServiceId, ServiceConfig> = {
  "website-tune-up": {
    id: "website-tune-up",
    name: "Website Tune-Up",
    tier: "One-time",
    amount: 34900,
    billing: "one_time",
    checkoutDescription:
      "Agreed fixes on one existing website, up to three public pages, with a before/after report. Delivered five business days after scope approval, payment, and access.",
    currency: "usd",
  },
  "care-essential": {
    id: "care-essential",
    name: "Care Essential",
    tier: "Monthly",
    amount: 7900,
    billing: "monthly",
    checkoutDescription:
      "Uptime checks, routine maintenance, backup or recovery check, monthly report, and 30 minutes of service time each month.",
    currency: "usd",
  },
};

export function getService(id: string): ServiceConfig | null {
  return services[id as ServiceId] ?? null;
}
