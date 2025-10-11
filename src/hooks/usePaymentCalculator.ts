import { useState, useEffect } from 'react';
import { ServiceSelection, IntakeFormData, PricingCalculation } from '@/types/payment';
import { calculatePricing } from '@/utils/pricing';

export const usePaymentCalculator = (
  services: ServiceSelection[],
  formData: Partial<IntakeFormData>,
  promoCodeFactor?: number
) => {
  const [pricing, setPricing] = useState<PricingCalculation>({
    subtotal: 0,
    discounts: { marketAdjustment: 0, contractSigner: 0, newSba: 0, bundleSavings: 0, first25: 0, total: 0 },
    total: 0,
    deposit: 0,
  });

  useEffect(() => {
    if (services.length > 0) {
      const calculated = calculatePricing(services, formData, promoCodeFactor);
      setPricing(calculated);
    }
  }, [services, formData, promoCodeFactor]);

  return pricing;
};
