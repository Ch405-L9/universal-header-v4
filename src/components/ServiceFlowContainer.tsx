import React, { useState } from 'react';
import { ServiceAccordion } from './ServiceAccordion';
import { PriceCalculator } from './PriceCalculator';
import { IntakeForm } from './IntakeForm';
import { ProcessSection } from './ProcessSection';
import { badgerTechServices } from '@/config/services';

export const ServiceFlowContainer: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showIntake, setShowIntake] = useState(false);
  const [formData, setFormData] = useState({
    readyToSign: false,
    newBusiness: false,
    promoCode: ''
  });

  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectedPrices = selectedServices
    .map(id => badgerTechServices.services.find(s => s.id === id))
    .filter(Boolean)
    .map(s => s!.price.starting);

  const handleContinue = () => {
    setShowIntake(true);
    // Scroll to intake form
    setTimeout(() => {
      document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleIntakeSubmit = (data: any) => {
    console.log('Intake submitted:', data);
    // This will be connected to Stripe in Phase G
    alert('Payment integration coming soon! For now, we\'ll contact you at: ' + data.contactEmail);
  };

  return (
    <div className="bg-gray-50">
      {/* Process Section */}
      <ProcessSection />

      {/* Service Selection Section */}
      <section className="py-16 bg-gray-50" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select one or more services below. Bundle multiple services and save 10%!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Service Accordion */}
            <div className="lg:col-span-2">
              <ServiceAccordion
                services={badgerTechServices.services}
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
              />

              {selectedServices.length > 0 && !showIntake && (
                <button
                  onClick={handleContinue}
                  className="w-full mt-6 bg-blue-600 text-white py-4 px-8 rounded-sm hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
                >
                  Continue with Selected Services →
                </button>
              )}
            </div>

            {/* Right Column: Sticky Calculator */}
            <div className="lg:col-span-1">
              <PriceCalculator
                selectedPrices={selectedPrices}
                readyToSign={formData.readyToSign}
                newBusiness={formData.newBusiness}
                promoCode={formData.promoCode}
              />
            </div>
          </div>

          {/* Intake Form (Progressive Disclosure) */}
          {showIntake && (
            <div id="intake-form" className="mt-12 max-w-4xl mx-auto">
              <IntakeForm
                onSubmit={handleIntakeSubmit}
                onDataChange={(data) => setFormData({ ...formData, ...data })}
              />
            </div>
          )}
        </div>
      </section>

      {/* Floating Contact Button */}
      <a
        href="tel:+14702236217"
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 z-50"
      >
        <span className="hidden sm:inline">Questions? Call Now</span>
        <span className="sm:hidden">Call</span>
      </a>
    </div>
  );
};
