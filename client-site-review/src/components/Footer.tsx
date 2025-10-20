import { siteConfig } from '@/config/site';
import { footerConfig } from '@/config/footer';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-gray-300 mb-4">{siteConfig.tagline}</p>
            <div className="flex gap-4">
              <a href={siteConfig.social.facebook} className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href={siteConfig.social.instagram} className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href={siteConfig.social.twitter} className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {footerConfig.sections.map(section => (
            <div key={section.title}>
              <h4 className="text-lg font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-300 hover:text-accent transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-lg font-bold mb-4">{footerConfig.newsletter.title}</h4>
            <p className="text-gray-300 mb-4 text-sm">{footerConfig.newsletter.description}</p>
            <form className="flex gap-2">
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                placeholder={footerConfig.newsletter.placeholder}
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                {footerConfig.newsletter.buttonText}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 space-y-2 text-sm text-gray-400">
          <p>{footerConfig.legal.copyright}</p>
          <p>{footerConfig.legal.disclaimer}</p>
          <p>{footerConfig.legal.businessInfo}</p>
        </div>
      </div>
    </footer>
  );
}
