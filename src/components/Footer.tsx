import React from 'react';
import { cn } from '@/utils/cn';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterConfig {
  companyName: string;
  tagline: string;
  description: string;
  sections: FooterSection[];
  socialLinks: SocialLink[];
  legal: {
    copyright: string;
    privacyPolicy?: string;
    termsOfService?: string;
    trademark?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

interface FooterProps {
  config: FooterConfig;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ config, className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-gray-900 text-white', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{config.companyName}</h3>
                <p className="text-blue-400 font-medium mb-4">{config.tagline}</p>
                <p className="text-gray-200 leading-relaxed">{config.description}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-200">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a 
                    href={`mailto:${config.contact.email}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {config.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a 
                    href={`tel:${config.contact.phone}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {config.contact.phone}
                  </a>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-3 mt-1 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{config.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {config.sections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-6 text-blue-400">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-200 hover:text-white transition-colors"
                        {...(link.external && { 
                          target: '_blank', 
                          rel: 'noopener noreferrer' 
                        })}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Connect With Us</h4>
              <div className="flex space-x-4">
                {config.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-sm flex items-center justify-center transition-colors duration-200"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Newsletter Signup (Optional Enhancement) */}
              <div className="mt-8">
                <h5 className="text-md font-medium mb-3">Stay Updated</h5>
                <p className="text-gray-400 text-sm mb-4">
                  Get the latest updates on web development trends and tips.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button aria-label="Subscribe to newsletter" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-sm transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} {config.legal.copyright}. All rights reserved.
              </p>
              {config.legal.trademark && (
                <p className="text-gray-400 text-sm mt-1">{config.legal.trademark}</p>
              )}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              {config.legal.privacyPolicy && (
                <a
                  href={config.legal.privacyPolicy}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              )}
              {config.legal.termsOfService && (
                <a
                  href={config.legal.termsOfService}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              )}
              <a
                href="#top"
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
              >
                Back to Top
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
