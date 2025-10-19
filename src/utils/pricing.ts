import { PAYMENT_CONFIG } from '@/config/payment';
import { ServiceSelection, IntakeFormData, PricingCalculation } from '@/types/payment';

export const calculatePricing = (
  services: ServiceSelection[],
  formData: Partial<IntakeFormData>,
  promoCodeFactor?: number
): PricingCalculation => {
  const subtotal = services.reduce((sum, service) => sum + service.basePrice, 0);

  const discounts = {
    marketAdjustment: 0,
    contractSigner: 0,
    newSba: 0,
    bundleSavings: 0,
    first25: 0,
    total: 0,
  };

  let workingTotal = subtotal;

  if (formData.localMarketHigh) {
    const increase = subtotal * (PAYMENT_CONFIG.discounts.marketAdjustment.localAboveGlobal - 1);
    workingTotal += increase;
    discounts.marketAdjustment = increase;
  }

  if (formData.readyToSign) {
    const discount = workingTotal * (1 - PAYMENT_CONFIG.discounts.contractSigner);
    workingTotal -= discount;
    discounts.contractSigner = discount;
  }

  if (formData.newBusiness && promoCodeFactor) {
    const discount = workingTotal * (1 - promoCodeFactor);
    workingTotal -= discount;
    discounts.newSba = discount;
  }

  if (services.length > 1) {
    const discount = workingTotal * (1 - PAYMENT_CONFIG.discounts.bundleSavings);
    workingTotal -= discount;
    discounts.bundleSavings = discount;
  }

  discounts.total = subtotal - workingTotal + discounts.marketAdjustment;

  return {
    subtotal,
    discounts,
    total: Math.max(0, workingTotal),
    deposit: Math.max(0, workingTotal * PAYMENT_CONFIG.depositPercentage),
  };
};
