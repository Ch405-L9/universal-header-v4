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
    websiteUrl?: string;
    yearsActive?: string;
    newBusiness: boolean;
    readyToSign: boolean;
    localMarketHigh: boolean;
  };
  pricing: {
    subtotal: number;
    discounts: {
      marketAdjustment: number;
      contractSigner: number;
      newSba: number;
      bundleSavings: number;
      first25: number;
      total: number;
    };
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Modern redirect method
      window.location.href = url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
  };
};
