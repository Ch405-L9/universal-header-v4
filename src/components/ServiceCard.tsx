import React from 'react';
import { Service } from '@/types/services';
import { cn } from '@/utils/cn';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  const handleCtaClick = () => {
    switch (service.cta.type) {
      case 'email':
        window.location.href = `mailto:${service.cta.href}?subject=Inquiry about ${service.title}`;
        break;
      case 'phone':
        window.location.href = `tel:${service.cta.href}`;
        break;
      case 'link':
        window.open(service.cta.href, '_blank', 'noopener noreferrer');
        break;
      default:
        window.location.href = service.cta.href;
    }
  };

  return (
    <div 
      className={cn(
        'bg-white rounded-sm border-2 border-blue-600 p-8 hover:shadow-lg transition-all duration-300',
        'hover:-translate-y-2 hover:shadow-blue-200 group relative',
        service.popular && 'ring-2 ring-blue-600 ring-offset-4',
        className
      )}
    >
      {service.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-sm">
            Most Popular
          </span>
        </div>
      )}

      {service.image && (
        <div className="mb-6">
          <img loading="lazy" decoding="async" width="400" height="300" 
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover rounded-sm border-2 border-blue-200"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          {service.description}
        </p>
        
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-blue-600">
            {service.price.currency}{service.price.starting.toLocaleString()}
          </span>
          {service.price.period && (
            <span className="text-gray-500 text-lg">/{service.price.period}</span>
          )}
          <p className="text-sm text-gray-500 mt-1">Starting price</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
        <ul className="space-y-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleCtaClick}
        className={cn(
          'w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-sm',
          'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'transition-colors duration-200 text-lg'
        )}
      >
        {service.cta.text}
      </button>
    </div>
  );
};

export default ServiceCard;
