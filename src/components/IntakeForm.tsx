import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { IntakeFormData } from '@/types/payment';
import { usePromoCode } from '@/hooks/usePromoCode';

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData, promoFactor?: number) => void;
  className?: string;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<IntakeFormData>({
    businessName: '',
    contactEmail: '',
    contactPhone: '',
    newBusiness: false,
    readyToSign: false,
    localMarketHigh: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validation, validatePromoCode } = usePromoCode(formData.newBusiness);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePromoBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const code = e.target.value.trim();
    if (code) {
      validatePromoCode(code);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
      newErrors.contactEmail = 'Invalid email';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData, validation.valid ? validation.discountFactor : undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6 bg-white p-8 rounded-sm border-2 border-blue-600', className)}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Business Name *</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 border-2 rounded-sm',
              errors.businessName ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.businessName && (
            <p className="text-red-600 text-sm mt-1">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Website URL</label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 border-2 rounded-sm',
              errors.contactEmail ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.contactEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone *</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 border-2 rounded-sm',
              errors.contactPhone ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.contactPhone && (
            <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Years in Business</label>
          <input
            type="number"
            name="yearsActive"
            value={formData.yearsActive || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Promo Code</label>
          <input
            type="text"
            name="promoCode"
            value={formData.promoCode || ''}
            onChange={handleChange}
            onBlur={handlePromoBlur}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm"
          />
          {validation.message && (
            <p className={cn('text-sm mt-1', validation.valid ? 'text-green-600' : 'text-red-600')}>
              {validation.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="newBusiness"
            checked={formData.newBusiness}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Business is less than 1 year old</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="readyToSign"
            checked={formData.readyToSign}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Ready to sign contract today (25% discount)</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="localMarketHigh"
            checked={formData.localMarketHigh}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Local market costs above global average</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-sm hover:bg-blue-700 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default IntakeForm;
