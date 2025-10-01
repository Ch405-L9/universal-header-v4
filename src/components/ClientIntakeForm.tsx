import React, { useState } from 'react';
import { Download, Save, Check, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: {
    starting: number;
    currency: string;
    period: string;
  };
  popular: boolean;
}

const ClientIntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    client_id: '',
    business_info: {
      company_name: '',
      tagline: '',
      description: '',
      industry: 'technology',
      founded: new Date().getFullYear().toString()
    },
    contact: {
      email: '',
      phone: '',
      address: { street: '', city: '', state: '', zip: '' },
      hours: { weekdays: 'Monday - Friday, 9:00 AM - 5:00 PM', weekends: 'By appointment only' },
      social: { linkedin: '', twitter: '', instagram: '', github: '' }
    },
    services: [] as Service[],
    hero: {
      headline: '',
      subheadline: '',
      description: '',
      variant: 'banner',
      cta_buttons: [
        { text: 'Get Started', href: '#contact', variant: 'primary' },
        { text: 'Learn More', href: '#services', variant: 'secondary' }
      ]
    },
    branding: {
      colors: { primary: '#0066CC', secondary: '#1f2937', accent: '#10b981' }
    }
  });

  const [validation, setValidation] = useState<{[key: string]: string}>({});

  const totalSteps = 5;

  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.client_id) errors.client_id = 'Required';
      else if (!/^[a-z0-9-]+$/.test(formData.client_id)) 
        errors.client_id = 'Lowercase letters, numbers, hyphens only';
      if (!formData.business_info.company_name) errors.company_name = 'Required';
      if (!formData.business_info.tagline) errors.tagline = 'Required';
      if (!formData.business_info.description) errors.description = 'Required';
    }

    if (step === 2) {
      if (!formData.contact.email) errors.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email))
        errors.email = 'Invalid email';
      if (!formData.contact.phone) errors.phone = 'Required';
      if (!formData.contact.address.street) errors.street = 'Required';
      if (!formData.contact.address.city) errors.city = 'Required';
      if (!formData.contact.address.state) errors.state = 'Required';
      else if (!/^[A-Z]{2}$/.test(formData.contact.address.state))
        errors.state = 'Must be 2-letter code';
      if (!formData.contact.address.zip) errors.zip = 'Required';
      else if (!/^[0-9]{5}(-[0-9]{4})?$/.test(formData.contact.address.zip))
        errors.zip = 'Invalid format';
    }

    if (step === 3) {
      if (formData.services.length === 0) errors.services = 'At least 1 service required';
    }

    if (step === 4) {
      if (!formData.hero.headline) errors.headline = 'Required';
      if (!formData.hero.subheadline) errors.subheadline = 'Required';
    }

    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: '',
      description: '',
      features: [''],
      price: { starting: 0, currency: '$', period: 'project' },
      popular: false
    };
    setFormData({
      ...formData,
      services: [...formData.services, newService]
    });
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    });
  };

  const updateService = (index: number, updates: Partial<Service>) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], ...updates };
    setFormData({ ...formData, services: newServices });
  };

  const addFeature = (serviceIndex: number) => {
    const newServices = [...formData.services];
    newServices[serviceIndex].features.push('');
    setFormData({ ...formData, services: newServices });
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...formData.services];
    newServices[serviceIndex].features[featureIndex] = value;
    setFormData({ ...formData, services: newServices });
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...formData.services];
    newServices[serviceIndex].features = newServices[serviceIndex].features.filter((_, i) => i !== featureIndex);
    setFormData({ ...formData, services: newServices });
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.client_id || 'client'}-intake.json`;
    a.click();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Business Information</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Client ID *</label>
              <input
                type="text"
                value={formData.client_id}
                onChange={e => setFormData({...formData, client_id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                className="w-full px-4 py-2 border-2 rounded"
                placeholder="company-name"
              />
              {validation.client_id && <p className="text-red-600 text-sm mt-1">{validation.client_id}</p>}
              <p className="text-gray-500 text-xs mt-1">URL-safe identifier (e.g., acme-corp)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Company Name *</label>
              <input
                type="text"
                value={formData.business_info.company_name}
                onChange={e => setFormData({...formData, business_info: {...formData.business_info, company_name: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
                placeholder="Acme Corporation"
              />
              {validation.company_name && <p className="text-red-600 text-sm mt-1">{validation.company_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tagline *</label>
              <input
                type="text"
                value={formData.business_info.tagline}
                onChange={e => setFormData({...formData, business_info: {...formData.business_info, tagline: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
                placeholder="Innovation at its finest"
              />
              {validation.tagline && <p className="text-red-600 text-sm mt-1">{validation.tagline}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                value={formData.business_info.description}
                onChange={e => setFormData({...formData, business_info: {...formData.business_info, description: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
                rows={4}
                placeholder="Full business description..."
              />
              {validation.description && <p className="text-red-600 text-sm mt-1">{validation.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Industry</label>
                <select
                  value={formData.business_info.industry}
                  onChange={e => setFormData({...formData, business_info: {...formData.business_info, industry: e.target.value}})}
                  className="w-full px-4 py-2 border-2 rounded"
                >
                  <option value="technology">Technology</option>
                  <option value="consulting">Consulting</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="legal">Legal</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Founded</label>
                <input
                  type="number"
                  value={formData.business_info.founded}
                  onChange={e => setFormData({...formData, business_info: {...formData.business_info, founded: e.target.value}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="hello@company.com"
                />
                {validation.email && <p className="text-red-600 text-sm mt-1">{validation.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, phone: e.target.value}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="+1 (555) 123-4567"
                />
                {validation.phone && <p className="text-red-600 text-sm mt-1">{validation.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Street Address *</label>
              <input
                type="text"
                value={formData.contact.address.street}
                onChange={e => setFormData({...formData, contact: {...formData.contact, address: {...formData.contact.address, street: e.target.value}}})}
                className="w-full px-4 py-2 border-2 rounded"
                placeholder="123 Main St, Suite 100"
              />
              {validation.street && <p className="text-red-600 text-sm mt-1">{validation.street}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">City *</label>
                <input
                  type="text"
                  value={formData.contact.address.city}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, address: {...formData.contact.address, city: e.target.value}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                />
                {validation.city && <p className="text-red-600 text-sm mt-1">{validation.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">State *</label>
                <input
                  type="text"
                  value={formData.contact.address.state}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, address: {...formData.contact.address, state: e.target.value.toUpperCase()}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  maxLength={2}
                  placeholder="GA"
                />
                {validation.state && <p className="text-red-600 text-sm mt-1">{validation.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">ZIP *</label>
                <input
                  type="text"
                  value={formData.contact.address.zip}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, address: {...formData.contact.address, zip: e.target.value}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="30303"
                />
                {validation.zip && <p className="text-red-600 text-sm mt-1">{validation.zip}</p>}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Social Media (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="url"
                  value={formData.contact.social.linkedin}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, social: {...formData.contact.social, linkedin: e.target.value}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="url"
                  value={formData.contact.social.twitter}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, social: {...formData.contact.social, twitter: e.target.value}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="Twitter/X URL"
                />
                <input
                  type="url"
                  value={formData.contact.social.instagram}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, social: {...formData.contact.social, instagram: e.target.value}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="Instagram URL"
                />
                <input
                  type="url"
                  value={formData.contact.social.github}
                  onChange={e => setFormData({...formData, contact: {...formData.contact, social: {...formData.contact.social, github: e.target.value}}})}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="GitHub URL"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Services</h2>
              <button
                onClick={addService}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Plus size={20} /> Add Service
              </button>
            </div>

            {validation.services && <p className="text-red-600 mb-4">{validation.services}</p>}

            {formData.services.map((service, idx) => (
              <div key={service.id} className="border-2 p-4 rounded space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">Service #{idx + 1}</h3>
                  <button onClick={() => removeService(idx)} className="text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>

                <input
                  type="text"
                  value={service.title}
                  onChange={e => updateService(idx, { title: e.target.value })}
                  className="w-full px-4 py-2 border-2 rounded"
                  placeholder="Service Title"
                />

                <textarea
                  value={service.description}
                  onChange={e => updateService(idx, { description: e.target.value })}
                  className="w-full px-4 py-2 border-2 rounded"
                  rows={3}
                  placeholder="Service Description"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    value={service.price.starting}
                    onChange={e => updateService(idx, { price: { ...service.price, starting: Number(e.target.value) } })}
                    className="w-full px-4 py-2 border-2 rounded"
                    placeholder="Price"
                  />
                  <select
                    value={service.price.period}
                    onChange={e => updateService(idx, { price: { ...service.price, period: e.target.value } })}
                    className="w-full px-4 py-2 border-2 rounded"
                  >
                    <option value="project">Per Project</option>
                    <option value="hour">Per Hour</option>
                    <option value="month">Per Month</option>
                    <option value="year">Per Year</option>
                  </select>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={service.popular}
                      onChange={e => updateService(idx, { popular: e.target.checked })}
                    />
                    Popular
                  </label>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">Features</label>
                    <button
                      onClick={() => addFeature(idx)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add Feature
                    </button>
                  </div>
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={e => updateFeature(idx, fIdx, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 rounded"
                        placeholder="Feature description"
                      />
                      <button
                        onClick={() => removeFeature(idx, fIdx)}
                        className="text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Headline *</label>
              <input
                type="text"
                value={formData.hero.headline}
                onChange={e => setFormData({...formData, hero: {...formData.hero, headline: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
                placeholder="Transform Your Business"
              />
              {validation.headline && <p className="text-red-600 text-sm mt-1">{validation.headline}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Subheadline *</label>
              <input
                type="text"
                value={formData.hero.subheadline}
                onChange={e => setFormData({...formData, hero: {...formData.hero, subheadline: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
                placeholder="Professional solutions that drive results"
              />
              {validation.subheadline && <p className="text-red-600 text-sm mt-1">{validation.subheadline}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.hero.description}
                onChange={e => setFormData({...formData, hero: {...formData.hero, description: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
                rows={4}
                placeholder="Detailed hero section description..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Variant</label>
              <select
                value={formData.hero.variant}
                onChange={e => setFormData({...formData, hero: {...formData.hero, variant: e.target.value}})}
                className="w-full px-4 py-2 border-2 rounded"
              >
                <option value="banner">Banner (Full Width)</option>
                <option value="hero">Hero (Centered)</option>
                <option value="minimal">Minimal</option>
                <option value="split-left">Split (Content Left)</option>
                <option value="split-right">Split (Content Right)</option>
              </select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Branding & Review</h2>
            
            <div>
              <h3 className="font-semibold mb-3">Brand Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Primary</label>
                  <input
                    type="color"
                    value={formData.branding.colors.primary}
                    onChange={e => setFormData({...formData, branding: {...formData.branding, colors: {...formData.branding.colors, primary: e.target.value}}})}
                    className="w-full h-12 rounded"
                  />
                  <p className="text-xs mt-1">{formData.branding.colors.primary}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Secondary</label>
                  <input
                    type="color"
                    value={formData.branding.colors.secondary}
                    onChange={e => setFormData({...formData, branding: {...formData.branding, colors: {...formData.branding.colors, secondary: e.target.value}}})}
                    className="w-full h-12 rounded"
                  />
                  <p className="text-xs mt-1">{formData.branding.colors.secondary}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Accent</label>
                  <input
                    type="color"
                    value={formData.branding.colors.accent}
                    onChange={e => setFormData({...formData, branding: {...formData.branding, colors: {...formData.branding.colors, accent: e.target.value}}})}
                    className="w-full h-12 rounded"
                  />
                  <p className="text-xs mt-1">{formData.branding.colors.accent}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Company:</strong> {formData.business_info.company_name}</p>
                <p><strong>Client ID:</strong> {formData.client_id}</p>
                <p><strong>Email:</strong> {formData.contact.email}</p>
                <p><strong>Phone:</strong> {formData.contact.phone}</p>
                <p><strong>Services:</strong> {formData.services.length}</p>
                <p><strong>Location:</strong> {formData.contact.address.city}, {formData.contact.address.state}</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded">
              <p className="text-sm">
                <strong>Next Steps:</strong> Click "Download JSON" below, then run:
              </p>
              <code className="block mt-2 p-2 bg-gray-900 text-green-400 rounded text-xs">
                ./generate_client_site.sh --config {formData.client_id || 'client'}-intake.json
              </code>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">BADGRTech Client Intake Form</h1>
        <p className="text-gray-600">Complete all steps to generate production-ready website configuration</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4, 5].map(step => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === currentStep ? 'bg-blue-600 text-white' :
                step < currentStep ? 'bg-green-600 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {step < currentStep ? <Check size={20} /> : step}
              </div>
              {step < 5 && <div className={`h-1 w-16 ${step < currentStep ? 'bg-green-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Business</span>
          <span>Contact</span>
          <span>Services</span>
          <span>Hero</span>
          <span>Review</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        {renderStep()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 border-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={downloadJSON}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
          >
            <Download size={20} /> Download JSON
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientIntakeForm;