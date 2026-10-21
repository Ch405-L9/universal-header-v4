import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function formatAmount(amount: number | null | undefined, currency: string | null | undefined) {
  if (amount == null) return 'n/a';
  return `${(amount / 100).toFixed(2)} ${(currency ?? 'usd').toUpperCase()}`;
}

function formatDate(seconds: number | null | undefined) {
  if (!seconds) return 'n/a';
  return new Date(seconds * 1000).toISOString().slice(0, 10);
}

// Owner alert: event type, IDs and amounts only. Buyer details stay in Stripe.
function describeEvent(event: Stripe.Event): { subject: string; lines: string[] } | null {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      return {
        subject: `New ${session.mode === 'subscription' ? 'Care subscription' : 'payment'}: ${formatAmount(session.amount_total, session.currency)}`,
        lines: [
          `Mode: ${session.mode}`,
          `Amount: ${formatAmount(session.amount_total, session.currency)}`,
          `Service: ${session.metadata?.serviceId ?? 'n/a'}`,
          `Checkout session: ${session.id}`,
          'Next step: confirm scope and access with the client.',
        ],
      };
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const previous = (event.data.previous_attributes ?? {}) as Partial<Stripe.Subscription>;
      const cancelChanged = 'cancel_at_period_end' in previous || 'cancel_at' in previous;
      if (!cancelChanged) return null;
      const cancelling = sub.cancel_at_period_end || Boolean(sub.cancel_at);
      return {
        subject: cancelling ? 'Care cancellation scheduled' : 'Care cancellation reversed',
        lines: [
          `Subscription: ${sub.id}`,
          `Status: ${sub.status}`,
          cancelling ? `Ends on: ${formatDate(sub.cancel_at)}` : 'The client resumed the plan.',
        ],
      };
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      return {
        subject: 'Care subscription ended',
        lines: [`Subscription: ${sub.id}`, `Ended: ${formatDate(sub.ended_at)}`],
      };
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      return {
        subject: `Payment failed: ${formatAmount(invoice.amount_due, invoice.currency)}`,
        lines: [
          `Invoice: ${invoice.id}`,
          `Attempt: ${invoice.attempt_count}`,
          `Amount due: ${formatAmount(invoice.amount_due, invoice.currency)}`,
          'Stripe retries automatically. Check the customer in the Stripe dashboard.',
        ],
      };
    }
    default:
      return null;
  }
}

async function sendOwnerAlert(event: Stripe.Event, alert: { subject: string; lines: string[] }) {
  const apiKey = getEnv('RESEND_API_KEY');
  const to = getEnv('STRIPE_ALERT_TO') ?? getEnv('RESEND_TO') ?? getEnv('OWNER_EMAIL');
  if (!apiKey || !to) {
    console.warn('Stripe alert not sent: RESEND_API_KEY or STRIPE_ALERT_TO is not set', { eventId: event.id });
    return;
  }
  const from = getEnv('RESEND_FROM') ?? 'BADGRTechnologies <onboarding@resend.dev>';
  const prefix = event.livemode ? '' : '[TEST] ';
  const text = [...alert.lines, '', `Event: ${event.id} (${event.type})`].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      // Stripe can resend an event; Resend drops duplicates with the same key for 24 hours.
      'Idempotency-Key': `stripe-${event.id}`,
    },
    body: JSON.stringify({ from, to, subject: `${prefix}Stripe: ${alert.subject}`, text }),
  });
  if (!response.ok) {
    console.error('Stripe alert email failed', { eventId: event.id, status: response.status });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return res.status(503).json({ error: 'Webhook processing not available' });
  }

  const stripe = new Stripe(secretKey);

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('Webhook Error: missing stripe-signature header');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    console.error('Webhook signature verification failed:', message);
    return res.status(400).send('Webhook Error: signature verification failed');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Log only non-personal fields; buyer details stay in Stripe.
    console.log('Payment successful:', {
      sessionId: session.id,
      mode: session.mode,
      amountTotal: session.amount_total,
      metadata: session.metadata,
    });
  }

  const alert = describeEvent(event);
  if (alert) {
    // A failed alert must not make Stripe retry a payment event that was already verified.
    try {
      await sendOwnerAlert(event, alert);
    } catch (err: unknown) {
      console.error('Stripe alert email error', { eventId: event.id, message: err instanceof Error ? err.message : 'unknown' });
    }
  }

  res.status(200).json({ received: true });
}
