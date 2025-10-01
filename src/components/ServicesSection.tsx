import React from 'react';
import ServiceCard from './ServiceCard';
import { ServicesConfig } from '@/types/services';
import { cn } from '@/utils/cn';

interface ServicesSectionProps {
  config: ServicesConfig;
  className?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ config, className = '' }) => {
  return (
    <section className={cn('py-20 bg-gray-50', className)} id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide">
            {config.title}
          </h2>
          <p className="text-xl md:text-2xl text-blue-600 font-medium mb-6 tracking-wide">
            {config.subtitle}
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>

        {/* Services Grid - Enhanced sizing for professional appearance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {config.services.map((service) => (
            <ServiceCard 
              key={service.id}
              service={service}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Call to Action Section */}
        {config.ctaSection && (
          <div className="text-center bg-white rounded-sm border-2 border-blue-600 p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {config.ctaSection.title}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {config.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={config.ctaSection.primaryCta.href}
                className={cn(
                  'bg-blue-600 text-white font-semibold py-4 px-8 rounded-sm',
                  'hover:bg-blue-700 transition-colors duration-200 text-lg',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                {config.ctaSection.primaryCta.text}
              </a>
              {config.ctaSection.secondaryCta && (
                <a
                  href={config.ctaSection.secondaryCta.href}
                  className={cn(
                    'bg-white text-blue-600 font-semibold py-4 px-8 rounded-sm border-2 border-blue-600',
                    'hover:bg-blue-50 transition-colors duration-200 text-lg',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  )}
                >
                  {config.ctaSection.secondaryCta.text}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
