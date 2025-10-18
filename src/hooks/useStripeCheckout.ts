import { useState } from 'react';

interface CheckoutData {
  services: Array<{
    id: string;
    name: string;
    basePrice: number;
    category: string;
  }>;
  formData: {
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    websiteUrl: string;
    yearsActive: string;
    newBusiness: boolean;
    readyToSign: boolean;
    localMarketHigh: boolean;
  };
  pricing: {
    subtotal: number;
    discounts: { total: number };
    total: number;
    deposit: number;
  };
}

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (data: CheckoutData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create checkout session');
      }

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { createCheckoutSession, loading, error };
};
