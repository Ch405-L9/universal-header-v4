import express from 'express';
import type { Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

import checkoutHandler from './api/stripe/create-checkout-session';
import webhookHandler from './api/stripe/webhook';

const app = express();

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

function shim(req: Request, res: Response): [VercelRequest, VercelResponse] {
  return [req as unknown as VercelRequest, res as unknown as VercelResponse];
}

app.post('/api/stripe/webhook', express.raw({ type: '*/*' }), (req, res) => {
  const [vReq, vRes] = shim(req, res);
  return webhookHandler(vReq, vRes);
});

app.post('/api/stripe/create-checkout-session', express.json(), (req, res) => {
  const [vReq, vRes] = shim(req, res);
  return checkoutHandler(vReq, vRes);
});

app.listen(3002, () => {
  console.log('Dev API server → http://localhost:3002');
});
