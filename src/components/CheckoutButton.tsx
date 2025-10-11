import React from 'react';
import { cn } from '@/utils/cn';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { ServiceSelection, IntakeFormData, PricingCalculation } from '@/types/payment';

interface CheckoutButtonProps {
  services: ServiceSelection[];
  formData: IntakeFormData;
  pricing: PricingCalculation;
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  services,
  formData,
  pricing,
  className,
}) => {
  const { createCheckoutSession, loading, error } = useStripeCheckout();

  const handleCheckout = () => {
    createCheckoutSession({
      services: services.map(s => ({
        id: s.id,
        name: s.name,
        basePrice: s.basePrice,
        category: s.category
      })),
      formData: {
        businessName: formData.businessName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        websiteUrl: formData.websiteUrl,
        yearsActive: formData.yearsActive,
        newBusiness: formData.newBusiness,
        readyToSign: formData.readyToSign,
        localMarketHigh: formData.localMarketHigh
      },
      pricing: {
        subtotal: pricing.subtotal,
        discounts: pricing.discounts,
        total: pricing.total,
        deposit: pricing.deposit
      }
    });
  };

  return (
    <div className={cn('bg-white p-8 rounded-sm border-2 border-blue-600', className)}>
      <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
      <p className="text-gray-600 mb-6">
        Click below to securely pay your 50% deposit (${pricing.deposit.toFixed(2)}) and begin your project.
      </p>
      
      {error && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 p-4 rounded-sm mb-4">
          {error}
        </div>
      )}
      
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={cn(
          'w-full bg-blue-600 text-white font-semibold py-4 rounded-sm transition-colors',
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        )}
      >
        {loading ? 'Processing...' : `Pay Deposit - $${pricing.deposit.toFixed(2)}`}
      </button>
    </div>
  );
};

export default CheckoutButton;
