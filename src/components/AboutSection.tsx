import React from 'react';
import { cn } from '@/utils/cn';

interface AboutConfig {
  title: string;
  subtitle: string;
  description: string[];
  highlights: {
    title: string;
    items: string[];
  };
  team?: {
    title: string;
    description: string;
  };
  cta?: {
    text: string;
    href: string;
  };
}

interface AboutSectionProps {
  config: AboutConfig;
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ config, className = '' }) => {
  return (
    <section className={cn('py-20 bg-white', className)} id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide">
              {config.title}
            </h2>
            <p className="text-xl md:text-2xl text-blue-600 font-medium mb-8 tracking-wide">
              {config.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Profile Image + Description */}
            <div className="space-y-8">
              {/* Profile Image - Complete 544x306 image with centered photo */}
              <img
                src="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1760220152/contained-about_nsijzk.webp"
                alt="A.D. Grant - Founder of BADGRTechnologies"
              />

              {/* Main Description */}
              <div className="space-y-6">
                {config.description.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {config.cta && (
                <div className="mt-8">
                  <a
                    href={config.cta.href}
                    className={cn(
                      'inline-flex items-center bg-blue-600 text-white font-semibold py-4 px-8 rounded-sm',
                      'hover:bg-blue-700 transition-colors duration-200 text-lg',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    {config.cta.text}
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Highlights & Team Info */}
            <div className="space-y-12">
              {/* Highlights Box */}
              <div className="bg-gray-50 p-8 rounded-sm border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {config.highlights.title}
                </h3>
                <ul className="space-y-4">
                  {config.highlights.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Info */}
              {config.team && (
                <div className="bg-blue-50 p-8 rounded-sm border-2 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {config.team.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {config.team.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
