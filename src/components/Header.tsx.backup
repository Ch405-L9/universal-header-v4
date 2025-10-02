import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SiteConfig } from '@/types';
import { cn } from '@/utils/cn';

interface HeaderProps {
  config: SiteConfig;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ config, className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { hero, navigation, title, tagline, contact } = config;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const renderHeroBanner = () => (
    <section
      className="hero-critical relative"
      style={{
         backgroundImage: hero.backgroundImage
            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${hero.backgroundImage})`
            : 'linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%)'
      }}
      role="banner"
      aria-labelledby="hero-headline"
    >
      <div className="container">
        <div className="max-w-4xl text-center text-white animate-fade-in">
          <h1
            id="hero-headline"
           className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white"
          >
            {hero.headline}
          </h1>
          <p className="text-responsive-lg mb-4 opacity-90 font-medium">
            {hero.subheadline}
          </p>
          <p className="text-responsive-base mb-8 max-w-3xl mx-auto leading-relaxed">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hero.ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={cn(
                  'btn text-lg px-8 py-4 font-semibold transition-all duration-200 transform hover:scale-105',
                  button.variant === 'primary'
                    ? 'btn-primary shadow-lg'
                    : 'btn-secondary shadow-lg'
                )}
                {...(button.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderHeroMinimal = () => (
    <section className="bg-gradient-to-r from-primary to-blue-600 py-20 lg:py-32">
      <div className="container text-center text-white">
        <h1 className="text-responsive-2xl font-bold mb-6">{hero.headline}</h1>
        <p className="text-responsive-lg mb-8 max-w-2xl mx-auto">{hero.subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.ctaButtons.map((button, index) => (
            <a key={index} href={button.href} className="btn btn-secondary">
              {button.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );

  const renderHeroSplit = () => (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className={cn(
        "flex items-center justify-center p-8 lg:p-16",
        hero.variant === 'split-left' ? 'bg-primary text-white' : 'bg-gray-50'
      )}>
        <div className="max-w-lg">
          <h1 className="text-responsive-xl font-bold mb-6">{hero.headline}</h1>
          <p className="text-responsive-base mb-8 leading-relaxed">{hero.subheadline}</p>
          <div className="space-y-4">
            {hero.ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={cn(
                  'btn w-full justify-center',
                  hero.variant === 'split-left' ? 'btn-secondary' : 'btn-primary'
                )}
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className="bg-cover bg-center min-h-[400px] lg:min-h-full"
        style={{
          backgroundImage: hero.backgroundImage
            ? `url(${hero.backgroundImage})`
            : 'linear-gradient(45deg, #f3f4f6, #e5e7eb)'
        }}
      />
    </section>
  );

  return (
    <header className={className}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="bg-primary text-white shadow-lg relative z-50" role="navigation">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              {config.logo && (
                <img
                  src={config.logo}
                  alt={`${title} Logo`}
                  className="h-20 w-auto"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-sm opacity-90">{tagline}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu.Root className="hidden md:flex">
              <NavigationMenu.List className="flex items-center space-x-8">
                {navigation.map((item, index) => (
                  <NavigationMenu.Item key={index}>
                    <NavigationMenu.Link
                      href={item.href}
                      className="hover:opacity-75 transition-opacity duration-200 font-medium"
                      {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {item.label}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                ))}
                <NavigationMenu.Item>
                  <a
                    href={`mailto:${contact.email}`}
                    className="btn btn-secondary ml-4"
                  >
                    Contact Us
                  </a>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-blue-600 py-4 animate-slide-in">
              <div className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="hover:opacity-75 transition-opacity py-2 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={`mailto:${contact.email}`}
                  className="btn btn-secondary text-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {hero.variant === 'banner' && renderHeroBanner()}
      {hero.variant === 'hero' && renderHeroMinimal()}
      {hero.variant === 'minimal' && renderHeroMinimal()}
      {(hero.variant === 'split-left' || hero.variant === 'split-right') && renderHeroSplit()}
    </header>
  );
};

export default Header;
