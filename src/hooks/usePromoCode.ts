import { useState } from 'react';
import { PAYMENT_CONFIG } from '@/config/payment';
import { PromoCodeValidation } from '@/types/payment';

export const usePromoCode = (newBusiness: boolean) => {
  const [validation, setValidation] = useState<PromoCodeValidation>({
    valid: false,
    message: '',
  });

  const validatePromoCode = (code: string): PromoCodeValidation => {
    const normalizedCode = code.toLowerCase().trim();
    const promoConfig =
      PAYMENT_CONFIG.promoCodes[normalizedCode as keyof typeof PAYMENT_CONFIG.promoCodes];

    if (!promoConfig) {
      const result = { valid: false, message: 'Invalid promo code' };
      setValidation(result);
      return result;
    }

    if ('requiresNewBusiness' in promoConfig && promoConfig.requiresNewBusiness && !newBusiness) {
      const result = {
        valid: false,
        message: 'This promo code is only for new businesses (<1 year)',
      };
      setValidation(result);
      return result;
    }

    const result = {
      valid: true,
      discountFactor: promoConfig.factor,
      message: promoConfig.description,
    };
    setValidation(result);
    return result;
  };

  return { validation, validatePromoCode };
};
