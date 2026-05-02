import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { getService } from "../../src/lib/payment.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

  if (!stripe) {
    return res.status(503).json({ error: "Payment processing not available" });
  }

  const { serviceId } = req.body as { serviceId?: string };
  const service = serviceId ? getService(serviceId) : null;
  if (!service) {
    return res.status(400).json({ error: "Invalid service selection" });
  }

  const appUrl = process.env.VITE_APP_URL ?? "https://badgrtech.com";

  try {
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
    return res.json({ url: session.url });
  } catch {
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
