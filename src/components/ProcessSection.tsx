import React from 'react';
import { processSteps } from '@/config/process';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our 4-Step Build Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovery to delivery, we guide you through every phase with transparency and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-sm p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-xl mb-4">
                  {step.number}
                </div>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-32 object-cover rounded-sm mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.name}</h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">{step.title}</h4>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
