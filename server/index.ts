import compression from "compression";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { getService } from "../src/lib/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(compression());

  // ── Stripe webhook (raw body required before json middleware) ──────────────
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
      if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
        res.status(503).json({ error: "Stripe not configured" });
        return;
      }
      const sig = req.headers["stripe-signature"];
      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig as string,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        res.status(400).send(`Webhook signature verification failed`);
        return;
      }
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Payment complete — session ${session.id}`);
        // TODO: trigger CRM / onboarding workflow
      }
      res.json({ received: true });
    }
  );

  app.use(express.json());

  // ── Create Stripe Checkout Session ────────────────────────────────────────
  app.post("/api/stripe/create-checkout-session", async (req, res) => {
    if (!stripe) {
      res.status(503).json({ error: "Payment processing not available" });
      return;
    }
    const { serviceId } = req.body as { serviceId?: string };
    const service = serviceId ? getService(serviceId) : null;
    if (!service) {
      res.status(400).json({ error: "Invalid service selection" });
      return;
    }
    const appUrl = process.env.VITE_APP_URL ?? "http://localhost:3000";
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
      res.json({ url: session.url });
    } catch (err) {
      console.error("Stripe session error:", err);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(
    express.static(staticPath, {
      maxAge: "1y",
      immutable: true,
      index: false,
    })
  );

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
