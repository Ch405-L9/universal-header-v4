export interface DiscountFactors {
  readyToSign: number;
  newBusiness: number;
  bundleDiscount: number;
  marketAdjustment: number;
}

export const DISCOUNT_CONFIG: DiscountFactors = {
  readyToSign: 0.75,      // 25% off
  newBusiness: 0.80,       // 20% off (with 'newbuddy' promo)
  bundleDiscount: 0.90,    // 10% off for multiple services
  marketAdjustment: 1.0    // Neutral by default
};

export interface PriceCalculation {
  basePrice: number;
  discounts: {
    readyToSign?: number;
    newBusiness?: number;
    bundle?: number;
  };
  finalPrice: number;
  deposit: number;
  remaining: number;
}

export function calculatePrice(
  basePrices: number[],
  options: {
    readyToSign: boolean;
    newBusiness: boolean;
    promoCode: string;
  }
): PriceCalculation {
  let total = basePrices.reduce((sum, price) => sum + price, 0);
  const discounts: PriceCalculation['discounts'] = {};

  // Bundle discount (multiple services)
  if (basePrices.length > 1) {
    const bundleAmount = total * (1 - DISCOUNT_CONFIG.bundleDiscount);
    discounts.bundle = bundleAmount;
    total *= DISCOUNT_CONFIG.bundleDiscount;
  }

  // Ready to sign discount
  if (options.readyToSign) {
    const signAmount = total * (1 - DISCOUNT_CONFIG.readyToSign);
    discounts.readyToSign = signAmount;
    total *= DISCOUNT_CONFIG.readyToSign;
  }

  // New business discount (requires promo code)
  if (options.newBusiness && options.promoCode.toLowerCase() === 'newbuddy') {
    const newBizAmount = total * (1 - DISCOUNT_CONFIG.newBusiness);
    discounts.newBusiness = newBizAmount;
    total *= DISCOUNT_CONFIG.newBusiness;
  }

  const deposit = total * 0.50;
  const remaining = total - deposit;

  return {
    basePrice: basePrices.reduce((sum, price) => sum + price, 0),
    discounts,
    finalPrice: Math.round(total * 100) / 100,
    deposit: Math.round(deposit * 100) / 100,
    remaining: Math.round(remaining * 100) / 100
  };
}
