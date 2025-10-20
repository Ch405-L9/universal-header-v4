#!/usr/bin/env bash
# fix_header_component.sh - Replace broken Header.tsx with working version
set -euo pipefail

PROJECT_ROOT="${1:-.}"
cd "$PROJECT_ROOT" || exit 1

log() { echo "[FIX-HEADER] $*"; }

log "🔧 Replacing Header.tsx with corrected version..."

cat > src/components/Header.tsx << 'HEADER'
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Menu, X } from 'lucide-react';
import { SiteConfig } from '@/types';
import { cn } from '@/utils/cn';
import { badgrTechBusiness } from '@/config/business';

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
      className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 min-h-screen flex items-center"
      role="banner" 
      aria-labelledby="hero-headline"
    >
      <div className="container">
        <div className="max-w-4xl text-center text-white animate-fade-in">
          <h1 
            id="hero-headline" 
            className="text-responsive-2xl font-bold mb-6 leading-tight"
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

  return (
    <header className={className}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-lg relative z-50" role="navigation">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* Text-based Logo & Brand */}
            <div className="flex items-center space-x-3">
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
                  
                    key={index}
                    href={item.href}
                    className="hover:opacity-75 transition-opacity py-2 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.label}
                  </a>
                ))}
                
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
      {hero.variant === 'minimal' && renderHeroMinimal()}
      {hero.variant === 'hero' && renderHeroMinimal()}
    </header>
  );
};

export default Header;
HEADER

log "✅ Header.tsx replaced with working version"
log ""
log "🎯 Testing build..."

# Try to build
if npm run build 2>&1 | tee /tmp/build.log; then
    log "✅ Build successful!"
    
    # Count images in dist
    IMAGE_COUNT=$(find dist/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.webp" \) 2>/dev/null | wc -l)
    
    log "📊 Images in dist/: $IMAGE_COUNT"
    
    if [[ $IMAGE_COUNT -gt 0 ]]; then
        log "⚠️  Found $IMAGE_COUNT images in build:"
        find dist/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.webp" \)
    else
        log "✅ ZERO local images in build - perfect!"
    fi
else
    log "❌ Build failed, check errors above"
    exit 1
fi
HEADER

chmod +x fix_header_component.sh
log "✅ Script created: fix_header_component.sh"
