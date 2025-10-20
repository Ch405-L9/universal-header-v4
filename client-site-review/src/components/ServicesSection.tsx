import { services } from '@/config/services';
import { RemoteImage } from './RemoteImage';
import { Check } from 'lucide-react';

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-secondary">Our Menu</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Fresh, handcrafted baked goods made daily with love and the finest ingredients
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map(service => (
            <div 
              key={service.id} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300"
            >
              <RemoteImage
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-lg mb-6"
              />
              <h3 className="text-3xl font-bold mb-3 text-primary">{service.title}</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-6">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="text-accent shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <span className="text-2xl font-bold text-primary">{service.price}</span>
                <a 
                  href="#contact"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
