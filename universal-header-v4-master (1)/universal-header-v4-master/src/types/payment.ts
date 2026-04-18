export interface ServiceSelection {
  id: string;
  name: string;
  basePrice: number;
  category: string;
}

export interface IntakeFormData {
  businessName: string;
  websiteUrl?: string;
  yearsActive?: number;
  contactEmail: string;
  contactPhone: string;
  newBusiness: boolean;
  promoCode?: string;
  readyToSign: boolean;
  localMarketHigh: boolean;
}

export interface PricingCalculation {
  subtotal: number;
  discounts: DiscountBreakdown;
  total: number;
  deposit: number;
}

export interface DiscountBreakdown {
  marketAdjustment: number;
  contractSigner: number;
  newSba: number;
  bundleSavings: number;
  first25: number;
  total: number;
}

export interface PromoCodeValidation {
  valid: boolean;
  discountFactor?: number;
  message: string;
}

export interface CheckoutSessionData {
  services: ServiceSelection[];
  formData: IntakeFormData;
  pricing: PricingCalculation;
}
