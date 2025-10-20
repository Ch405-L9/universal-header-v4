import React, { useState } from 'react';
import { ChevronDown, Check, Phone, Mail } from 'lucide-react';
import { Service } from '@/types/services';

interface ServiceAccordionProps {
  services: Service[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  services,
  selectedServices,
  onToggleService
}) => {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {services.map((service) => {
        const isOpen = openService === service.id;
        const isSelected = selectedServices.includes(service.id);

        return (
          <div
            key={service.id}
            className="bg-white rounded-sm border-2 border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Accordion Header */}
            <button
              onClick={() => setOpenService(isOpen ? null : service.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="h-4 w-4 text-white" />}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">
                    Starting at ${service.price.starting.toLocaleString()}
                  </p>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`} />
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-200 animate-fade-in">
                <p className="text-gray-700 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Escape Hatch */}
                <div className="bg-blue-50 border border-blue-200 rounded-sm p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Have questions about this service?</strong> We're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="tel:+14702236217"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      <Phone className="h-4 w-4" />
                      Call: (470) 223-6217
                    </a>
                    <a
                      href="mailto:hello@badgrtech.com?subject=Question about BADGRTech Services"
                      className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-sm hover:bg-blue-50 transition-colors text-sm font-semibold"
                    >
                      <Mail className="h-4 w-4" />
                      Email Us
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => onToggleService(service.id)}
                  className={`w-full py-3 px-6 rounded-sm font-semibold transition-colors ${
                    isSelected
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSelected ? 'Remove from Selection' : 'Add to Project'}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
