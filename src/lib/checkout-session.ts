import type { ServiceConfig } from "./payment.js";
import type Stripe from "stripe";

/**
 * Stripe Checkout params shared by the Vercel function and the local dev
 * server. Server-only: never import this from client code.
 */
export function buildCheckoutSessionParams(
  service: ServiceConfig,
  appUrl: string,
): Stripe.Checkout.SessionCreateParams {
  const isMonthly = service.billing === "monthly";
  return {
    mode: isMonthly ? "subscription" : "payment",
    // Explicit list: cards (plus Cash App Pay for one-time). Excludes Link
    // and buy-now-pay-later methods regardless of dashboard defaults.
    payment_method_types: isMonthly ? ["card"] : ["card", "cashapp"],
    line_items: [
      {
        price_data: {
          currency: service.currency,
          unit_amount: service.amount,
          ...(isMonthly ? { recurring: { interval: "month" as const } } : {}),
          product_data: {
            name: service.name,
            description: service.checkoutDescription,
          },
        },
        quantity: 1,
      },
    ],
    custom_text: {
      submit: {
        message: isMonthly
          ? "Billed monthly in advance until you cancel. Cancel before your renewal date to stop the next charge; service continues through the paid month. No prorated refunds."
          : "Full payment for your approved scope. Delivery timing starts once payment and any needed access are in place.",
      },
    },
    metadata: { serviceId: service.id, tier: service.tier },
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cancel`,
  };
}
