import React from 'react';
import { DollarSign, Tag } from 'lucide-react';
import { calculatePrice } from '@/utils/discountEngine';

interface PriceCalculatorProps {
  selectedPrices: number[];
  readyToSign: boolean;
  newBusiness: boolean;
  promoCode: string;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  selectedPrices,
  readyToSign,
  newBusiness,
  promoCode
}) => {
  if (selectedPrices.length === 0) return null;

  const calculation = calculatePrice(selectedPrices, {
    readyToSign,
    newBusiness,
    promoCode
  });

  const hasDiscounts = Object.keys(calculation.discounts).length > 0;

  return (
    <div className="sticky top-20 bg-white border-2 border-blue-600 rounded-sm shadow-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Your Project Estimate</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Base Price:</span>
          <span className="font-semibold">${calculation.basePrice.toLocaleString()}</span>
        </div>

        {hasDiscounts && (
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Active Discounts:</span>
            </div>
            {calculation.discounts.bundle && (
              <div className="flex justify-between text-sm text-gray-600 ml-6">
                <span>Bundle Discount:</span>
                <span className="text-green-600">-${calculation.discounts.bundle.toFixed(2)}</span>
              </div>
            )}
            {calculation.discounts.readyToSign && (
              <div className="flex justify-between text-sm text-gray-600 ml-6">
                <span>Ready to Sign:</span>
                <span className="text-green-600">-${calculation.discounts.readyToSign.toFixed(2)}</span>
              </div>
            )}
            {calculation.discounts.newBusiness && (
              <div className="flex justify-between text-sm text-gray-600 ml-6">
                <span>New Business:</span>
                <span className="text-green-600">-${calculation.discounts.newBusiness.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        <div className="border-t-2 border-gray-300 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>${calculation.finalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-sm p-4 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700">50% Deposit to Start:</span>
            <span className="text-lg font-bold text-blue-600">${calculation.deposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Remaining at Completion:</span>
            <span className="text-sm font-semibold text-gray-900">${calculation.remaining.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
