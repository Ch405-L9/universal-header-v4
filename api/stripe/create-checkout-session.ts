import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { getService } from "../../src/lib/payment";

// Initialize Stripe once at module load. If the secret is missing, leave the
// client null so the handler can return a clean 503 — never throw at module
// level (Vercel functions can't recover from module-level throws).
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe: Stripe | null = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-09-30.clover" })
  : null;

if (!stripe) {
  // Surface a single, non-sensitive warning in server logs at cold start.
  // No secret is logged; this only signals misconfiguration.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY is not set — checkout endpoint will return 503."
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!stripe) {
    return res.status(503).json({ error: "Stripe not configured" });
  }

  try {
    const { serviceId } = (req.body ?? {}) as { serviceId?: string };
    const service = serviceId ? getService(serviceId) : null;
    if (!service) {
      return res.status(400).json({ error: "Invalid service selection" });
    }

    const appUrl = process.env.VITE_APP_URL ?? "https://badgrtech.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: service.currency,
            unit_amount: service.depositAmount,
            product_data: {
              name: `${service.name} — Deposit`,
              description: service.depositLabel,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { serviceId: service.id, tier: service.tier },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    // Log full detail server-side; return only a short, non-sensitive message
    // to the client so secrets, stack traces, and Stripe internals never leak.
    console.error("[stripe] checkout session creation failed:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
