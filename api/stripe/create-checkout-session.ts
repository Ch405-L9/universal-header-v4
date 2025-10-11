import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { services, formData, pricing } = req.body;

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Project Deposit (50%)',
            description: services.map((s: any) => s.name).join(', '),
          },
          unit_amount: Math.round(pricing.deposit * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/#services`,
      customer_email: formData.contactEmail,
      metadata: {
        businessName: formData.businessName,
        phone: formData.contactPhone,
        services: JSON.stringify(services.map((s: any) => s.name)),
        totalProject: pricing.total.toFixed(2),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
