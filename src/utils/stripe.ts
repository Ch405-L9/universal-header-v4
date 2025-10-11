import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '@/config/payment';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.publicKey);
  }
  return stripePromise;
};

export const createCheckoutSession = async (sessionData: {
  services: Array<{ id: string; name: string; basePrice: number }>;
  formData: Record<string, any>;
  pricing: { total: number; deposit: number };
}) => {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return response.json();
};
