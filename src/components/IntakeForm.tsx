import React, { useState, useEffect } from 'react';
import { Phone, Mail, AlertCircle } from 'lucide-react';

interface IntakeFormData {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  yearsActive: string;
  promoCode: string;
  readyToSign: boolean;
  newBusiness: boolean;
}

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  onDataChange: (data: Partial<IntakeFormData>) => void;
  initialData?: Partial<IntakeFormData>;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({
  onSubmit,
  onDataChange,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<IntakeFormData>({
    businessName: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
    yearsActive: '',
    promoCode: '',
    readyToSign: false,
    newBusiness: false,
    ...initialData
  });

  const [progress, setProgress] = useState(0);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('badgr_intake_draft', JSON.stringify(formData));
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('badgr_intake_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to parse saved form data');
      }
    }
  }, []);

  // Calculate progress
  useEffect(() => {
    const requiredFields = ['businessName', 'contactEmail', 'contactPhone'];
    const filled = requiredFields.filter(key => formData[key as keyof IntakeFormData]).length;
    setProgress((filled / requiredFields.length) * 100);
  }, [formData]);

  const handleChange = (field: keyof IntakeFormData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onDataChange(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-sm p-6 animate-fade-in">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Complete your information</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Project</h3>
      <p className="text-gray-600 mb-6">This takes 60 seconds. We'll use this to customize your quote.</p>

      {/* Contact Escape Hatch */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Not ready yet? No problem!</p>
          <p className="text-sm text-gray-700 mb-2">
            Call us at <a href="tel:+14702236217" className="text-blue-600 font-semibold">(470) 223-6217</a> or 
            email <a href="mailto:hello@badgrtech.com" className="text-blue-600 font-semibold">hello@badgrtech.com</a>
          </p>
          <p className="text-xs text-gray-600">We'll walk you through everything and answer any questions.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.contactEmail}
            onChange={(e) => handleChange('contactEmail', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Website (Optional)
          </label>
          <input
            type="url"
            placeholder="https://yoursite.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.websiteUrl}
            onChange={(e) => handleChange('websiteUrl', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years in Business
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.yearsActive}
            onChange={(e) => handleChange('yearsActive', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promo Code
          </label>
          <input
            type="text"
            placeholder="newbuddy, first25, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.promoCode}
            onChange={(e) => handleChange('promoCode', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3 bg-gray-50 p-4 rounded-sm mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1"
            checked={formData.readyToSign}
            onChange={(e) => handleChange('readyToSign', e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            <strong className="text-green-600">I'm ready to sign a contract today</strong> (Get 25% off!)
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1"
            checked={formData.newBusiness}
            onChange={(e) => handleChange('newBusiness', e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            My business is less than 1 year old
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-sm hover:bg-blue-700 transition-colors font-semibold text-lg"
      >
        Continue to Payment
      </button>
    </form>
  );
};
