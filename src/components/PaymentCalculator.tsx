import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ServiceSelection, IntakeFormData } from '@/types/payment';
import { usePaymentCalculator } from '@/hooks/usePaymentCalculator';
import { PAYMENT_CONFIG } from '@/config/payment';
import IntakeForm from './IntakeForm';
import CheckoutButton from './CheckoutButton';

interface PaymentCalculatorProps {
  className?: string;
  preselectedService?: string | null;
}

const PaymentCalculator: React.FC<PaymentCalculatorProps> = ({ className, preselectedService }) => {
  const [selectedServices, setSelectedServices] = useState<ServiceSelection[]>([]);
  const [showIntake, setShowIntake] = useState(false);
  const [formData, setFormData] = useState<IntakeFormData | null>(null);
  const [promoFactor, setPromoFactor] = useState<number>();

  const pricing = usePaymentCalculator(selectedServices, formData || {}, promoFactor);

  useEffect(() => {
    if (preselectedService) {
      Object.entries(PAYMENT_CONFIG.services).forEach(([category, services]) => {
        Object.entries(services).forEach(([key, service]) => {
          if (`${category}-${key}` === preselectedService) {
            setSelectedServices([
              {
                id: preselectedService,
                name: service.name,
                basePrice: service.basePrice,
                category,
              },
            ]);
          }
        });
      });
    }
  }, [preselectedService]);

  const toggleService = (
    category: string,
    serviceKey: string,
    serviceName: string,
    basePrice: number
  ) => {
    const serviceId = `${category}-${serviceKey}`;
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === serviceId);
      if (exists) {
        return prev.filter((s) => s.id !== serviceId);
      }
      return [...prev, { id: serviceId, name: serviceName, basePrice, category }];
    });
  };

  const handleIntakeSubmit = (data: IntakeFormData, factor?: number) => {
    setFormData(data);
    setPromoFactor(factor);
  };

  return (
    <div className={cn('space-y-8', className)}>
      <div className="bg-white p-8 rounded-sm border-2 border-blue-600">
        <h3 className="text-2xl font-bold mb-6">Select Services</h3>

        {Object.entries(PAYMENT_CONFIG.services).map(([category, services]) => (
          <div key={category} className="mb-6">
            <h4 className="text-lg font-semibold mb-3 capitalize">{category}</h4>
            <div className="space-y-2">
              {Object.entries(services).map(([key, service]) => {
                const serviceId = `${category}-${key}`;
                const isSelected = selectedServices.some((s) => s.id === serviceId);
                return (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleService(category, key, service.name, service.basePrice)}
                      className="w-5 h-5"
                    />
                    <span className="flex-1">{service.name}</span>
                    <span className="font-semibold">${service.basePrice}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {selectedServices.length > 0 && (
          <div className="mt-6 pt-6 border-t-2">
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${pricing.subtotal.toFixed(2)}</span>
              </div>
              {pricing.discounts.total > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discounts:</span>
                  <span>-${pricing.discounts.total.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl pt-2 border-t">
                <span>Total:</span>
                <span>${pricing.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-blue-600 font-semibold">
                <span>50% Deposit:</span>
                <span>${pricing.deposit.toFixed(2)}</span>
              </div>
            </div>

            {!showIntake && (
              <button
                onClick={() => setShowIntake(true)}
                className="w-full mt-6 bg-blue-600 text-white font-semibold py-4 rounded-sm hover:bg-blue-700"
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>

      {showIntake && selectedServices.length > 0 && (
        <>
          <IntakeForm onSubmit={handleIntakeSubmit} />
          {formData && (
            <CheckoutButton services={selectedServices} formData={formData} pricing={pricing} />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentCalculator;
