import { Readable } from 'node:stream';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '../api/stripe/webhook';

const SECRET = 'whsec_test_secret';
const stripe = new Stripe('sk_test_dummy');

function makeReq(payload: string, signature?: string): VercelRequest {
  const req = Object.assign(Readable.from([Buffer.from(payload)]), {
    method: 'POST',
    headers: signature ? { 'stripe-signature': signature } : {},
  });
  return req as unknown as VercelRequest;
}

// Only the parts of VercelResponse the webhook handler calls, plus what the tests read back.
interface MockRes {
  statusCode: number;
  body: unknown;
  status(code: number): MockRes;
  json(body: unknown): MockRes;
  send(body: unknown): MockRes;
}

function makeRes(): MockRes & VercelResponse {
  const res: MockRes = {
    statusCode: 200,
    body: undefined,
    status(code) { res.statusCode = code; return res; },
    json(body) { res.body = body; return res; },
    send(body) { res.body = body; return res; },
  };
  return res as MockRes & VercelResponse;
}

function signed(event: object) {
  const payload = JSON.stringify(event);
  return { payload, header: stripe.webhooks.generateTestHeaderString({ payload, secret: SECRET }) };
}

describe('stripe webhook', () => {
  const fetchMock = vi.fn(async () => new Response('{}', { status: 200 }));

  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
    process.env.STRIPE_WEBHOOK_SECRET = SECRET;
    process.env.RESEND_API_KEY = 're_dummy';
    process.env.STRIPE_ALERT_TO = 'owner@example.com';
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockClear();
  });
  afterEach(() => vi.unstubAllGlobals());

  it('rejects a bad signature without echoing details', async () => {
    const res = makeRes();
    await handler(makeReq('{}', 't=1,v1=bad'), res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Webhook Error: signature verification failed');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('emails the owner on a completed checkout with an idempotency key and no buyer details', async () => {
    const { payload, header } = signed({
      id: 'evt_1', object: 'event', type: 'checkout.session.completed', livemode: false,
      data: { object: { id: 'cs_1', mode: 'payment', amount_total: 34900, currency: 'usd', metadata: { serviceId: 'tune-up' }, customer_details: { email: 'buyer@example.com' } } },
    });
    const res = makeRes();
    await handler(makeReq(payload, header), res);
    expect(res.statusCode).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect((init.headers as Record<string, string>)['Idempotency-Key']).toBe('stripe-evt_1');
    const body = JSON.parse(init.body as string);
    expect(body.to).toBe('owner@example.com');
    expect(body.subject).toBe('[TEST] Stripe: New payment: 349.00 USD');
    expect(body.text).not.toContain('buyer@example.com');
  });

  it('alerts when a cancellation is scheduled, ignores unrelated subscription updates', async () => {
    const sched = signed({
      id: 'evt_2', object: 'event', type: 'customer.subscription.updated', livemode: true,
      data: { object: { id: 'sub_1', status: 'active', cancel_at_period_end: true, cancel_at: 1798761600 }, previous_attributes: { cancel_at_period_end: false } },
    });
    await handler(makeReq(sched.payload, sched.header), makeRes());
    expect(JSON.parse((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as string).subject).toBe('Stripe: Care cancellation scheduled');

    fetchMock.mockClear();
    const other = signed({
      id: 'evt_3', object: 'event', type: 'customer.subscription.updated', livemode: true,
      data: { object: { id: 'sub_1', status: 'active', cancel_at_period_end: false }, previous_attributes: { current_period_end: 1 } },
    });
    const res = makeRes();
    await handler(makeReq(other.payload, other.header), res);
    expect(res.statusCode).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('still returns 200 when the alert email fails', async () => {
    fetchMock.mockImplementationOnce(async () => { throw new Error('network down'); });
    const { payload, header } = signed({
      id: 'evt_4', object: 'event', type: 'invoice.payment_failed', livemode: true,
      data: { object: { id: 'in_1', attempt_count: 1, amount_due: 7900, currency: 'usd' } },
    });
    const res = makeRes();
    await handler(makeReq(payload, header), res);
    expect(res.statusCode).toBe(200);
  });
});
