export const PAYMENT_CONFIG = {
  depositPercentage: 0.5,

  discounts: {
    marketAdjustment: {
      belowGlobalAverage: 0.875,
      localAboveGlobal: 1.15,
    },
    contractSigner: 0.75,
    newSba: 0.8,
    bundleSavings: 0.9,
    first25: 0.75,
  },

  promoCodes: {
    newbuddy: {
      factor: 0.8,
      description: '20% off for new businesses',
      requiresNewBusiness: true,
    },
    santafe25: {
      factor: 0.75,
      description: '25% off - Santa Fe Club founding member',
      limitedQuantity: 25,
    },
  },

  services: {
    web: {
      landing: { name: 'Landing Page', basePrice: 1200 },
      basic: { name: 'Basic Site', basePrice: 2500 },
    },
    brand: {
      logo: { name: 'Logo Design', basePrice: 600 },
      rebrand: { name: 'Re-Branding', basePrice: 1800 },
    },
    content: {
      photoRetouching: { name: 'Photo Retouching', basePrice: 250 },
      videoEditing: { name: 'Video Editing', basePrice: 700 },
    },
  },
} as const;

export const STRIPE_CONFIG = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  successUrl: `${import.meta.env.VITE_APP_URL || 'http://localhost:3000'}/success`,
  cancelUrl: `${import.meta.env.VITE_APP_URL || 'http://localhost:3000'}/#services`,
};
