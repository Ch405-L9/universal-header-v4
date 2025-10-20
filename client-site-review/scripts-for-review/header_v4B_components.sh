#!/usr/bin/env bash
# header_v4B.sh — Phase B (Complete Working Components & Styling)
# Creates fully functional localhost-ready website with proven stack
set -euo pipefail

APP_DIR="universal-header-v4"
TARGET_PORT="3000"
DRY_RUN=false
VERBOSE=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir) APP_DIR="${2:-universal-header-v4}"; shift 2;;
    --port) TARGET_PORT="${2:-3000}"; shift 2;;
    --dry-run) DRY_RUN=true; shift;;
    --quiet) VERBOSE=false; shift;;
    *) echo "Usage: $0 [--dir DIR] [--port 3000] [--dry-run] [--quiet]"; exit 1;;
  esac
done

log(){ [[ "$VERBOSE" == true ]] && echo "[$0] $*"; }
warn(){ echo "WARN: $*" >&2; }
fail(){ echo "ERROR: $*" >&2; exit 1; }

[[ -d "$APP_DIR" ]] || fail "App dir '$APP_DIR' not found. Run Phase A first."
cd "$APP_DIR"

ensure_dir(){ [[ -d "$1" ]] || { mkdir -p "$1"; log "Created directory: $1"; }; }
create_file(){
  local fp="$1"
  if [[ "$DRY_RUN" == true ]]; then log "Would create: $fp"; cat > /dev/null; return 0; fi
  ensure_dir "$(dirname "$fp")"
  cat > "$fp"
  log "Created file: $fp ($(wc -l < "$fp") lines)"
}

log "Writing proven CSS foundation with Tailwind v3.4.x..."
create_file "src/styles/index.css" <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design System Variables - CSS Custom Properties */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #1f2937;
  --color-accent: #10b981;
  --color-neutral: #6b7280;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;
  
  /* Spacing System */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--color-secondary);
  background-color: #ffffff;
}

/* Accessibility */
button:focus-visible, 
a:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}

/* Skip Navigation Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  font-weight: 600;
  z-index: 1000;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.skip-link:focus {
  transform: translateY(0);
}

/* Component Layer */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-primary text-white hover:bg-blue-700 focus:ring-primary;
  }
  
  .btn-secondary {
    @apply bg-white text-primary border-primary hover:bg-gray-50 focus:ring-primary;
  }
  
  .btn-accent {
    @apply bg-accent text-white hover:bg-emerald-700 focus:ring-accent;
  }
  
  .container {
    @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .section {
    @apply py-12 lg:py-16;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden;
  }
  
  .input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Responsive Typography */
.text-responsive-sm { font-size: clamp(0.875rem, 2vw, 1rem); }
.text-responsive-base { font-size: clamp(1rem, 2.5vw, 1.125rem); }
.text-responsive-lg { font-size: clamp(1.125rem, 3vw, 1.5rem); }
.text-responsive-xl { font-size: clamp(1.5rem, 4vw, 2.25rem); }
.text-responsive-2xl { font-size: clamp(2rem, 5vw, 3rem); }

/* Utility Classes for Spacing */
.spacing-section { padding: var(--spacing-3xl) 0; }
.spacing-container { padding: 0 var(--spacing-md); }

@media (min-width: 640px) {
  .spacing-container { padding: 0 var(--spacing-lg); }
}

@media (min-width: 1024px) {
  .spacing-container { padding: 0 var(--spacing-xl); }
}
CSS

log "Creating site configuration types and utilities..."
create_file "src/types/index.ts" <<'TYPES'
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'accent';
  external?: boolean;
}

export interface HeroConfig {
  headline: string;
  subheadline: string;
  description: string;
  variant: 'banner' | 'hero' | 'split-left' | 'split-right' | 'minimal';
  backgroundImage?: string;
  ctaButtons: CTAButton[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  logo?: string;
  navigation: NavigationItem[];
  hero: HeroConfig;
  contact: ContactInfo;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
}
TYPES

log "Creating utility functions..."
create_file "src/utils/cn.ts" <<'UTILS'
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
UTILS

log "Creating default site configuration..."
create_file "src/config/site.ts" <<'SITECONFIG'
import { SiteConfig } from '@/types';

export const defaultSiteConfig: SiteConfig = {
  title: "Your Company Name",
  tagline: "Professional Digital Solutions",
  description: "We deliver exceptional results for your business needs with modern, responsive websites and applications.",
  logo: "/logo.svg",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    headline: "Build Something Amazing",
    subheadline: "Professional web solutions that drive real results",
    description: "We create modern, responsive websites and applications that help your business grow and succeed in the digital world.",
    variant: "banner",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&crop=center",
    ctaButtons: [
      { text: "Get Started", href: "#contact", variant: "primary" },
      { text: "View Our Work", href: "#services", variant: "secondary" }
    ]
  },
  contact: {
    email: "hello@yourcompany.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, Suite 100, City, ST 12345",
    social: {
      twitter: "https://twitter.com/yourcompany",
      linkedin: "https://linkedin.com/company/yourcompany",
      github: "https://github.com/yourcompany"
    }
  },
  theme: {
    primaryColor: "#3b82f6",
    secondaryColor: "#1f2937", 
    accentColor: "#10b981"
  }
};
SITECONFIG

log "Creating Header component with Radix UI integration..."
create_file "src/components/Header.tsx" <<'HEADER'
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
      className="relative bg-cover bg-center min-h-screen flex items-center"
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
                  className="h-10 w-auto"
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
HEADER

log "Creating placeholder sections for complete site structure..."
create_file "src/components/Sections.tsx" <<'SECTIONS'
import React from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ className, children }) => (
  <section className={cn('section', className)}>
    <div className="container">
      {children}
    </div>
  </section>
);

export const ServicesSection: React.FC = () => (
  <Section id="services" className="bg-gray-50">
    <div className="text-center mb-12">
      <h2 className="text-responsive-xl font-bold mb-4">Our Services</h2>
      <p className="text-responsive-base text-neutral max-w-2xl mx-auto">
        Professional solutions tailored to your business needs
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: 'Web Development', desc: 'Modern, responsive websites built with the latest technologies' },
        { title: 'UI/UX Design', desc: 'Beautiful, user-friendly designs that convert visitors to customers' },
        { title: 'Digital Strategy', desc: 'Comprehensive digital solutions to grow your business online' }
      ].map((service, index) => (
        <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
          <p className="text-neutral">{service.desc}</p>
        </div>
      ))}
    </div>
  </Section>
);

export const AboutSection: React.FC = () => (
  <Section id="about">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-responsive-xl font-bold mb-6">About Our Company</h2>
        <p className="text-responsive-base text-neutral mb-6 leading-relaxed">
          We are a team of passionate professionals dedicated to creating exceptional 
          digital experiences. With years of experience in web development and design, 
          we help businesses establish a strong online presence.
        </p>
        <p className="text-responsive-base text-neutral leading-relaxed">
          Our approach combines technical expertise with creative vision to deliver 
          solutions that not only look great but also drive real business results.
        </p>
      </div>
      <div className="bg-gradient-to-br from-primary to-accent rounded-lg h-64 lg:h-80"></div>
    </div>
  </Section>
);

export const ContactSection: React.FC = () => (
  <Section id="contact" className="bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-responsive-xl font-bold mb-4">Get In Touch</h2>
        <p className="text-responsive-base text-neutral">
          Ready to start your project? We'd love to hear from you.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:hello@yourcompany.com" className="text-primary hover:underline">
                hello@yourcompany.com
              </a>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <a href="tel:+15551234567" className="text-primary hover:underline">
                +1 (555) 123-4567
              </a>
            </div>
            <div>
              <p className="font-medium">Address</p>
              <p className="text-neutral">123 Business St, Suite 100<br />City, ST 12345</p>
            </div>
          </div>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" className="input" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" className="input" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea id="message" rows={4} className="input" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </Section>
);

export const Footer: React.FC = () => (
  <footer className="bg-secondary text-white py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Your Company Name</h3>
          <p className="text-gray-300 mb-4">
            Professional digital solutions that drive real results for your business.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="mailto:hello@yourcompany.com" className="hover:text-white transition-colors">Email</a></li>
            <li><a href="tel:+15551234567" className="hover:text-white transition-colors">Phone</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
SECTIONS

log "Creating main App component..."
create_file "src/App.tsx" <<'APP'
import React from 'react';
import Header from '@/components/Header';
import { ServicesSection, AboutSection, ContactSection, Footer } from '@/components/Sections';
import { defaultSiteConfig } from '@/config/site';

function App() {
  return (
    <div className="App min-h-screen">
      <Header config={defaultSiteConfig} />
      
      <main id="main-content" role="main">
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
APP

log "Creating main entry point..."
create_file "src/main.tsx" <<'MAIN'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
MAIN

log "Creating placeholder logo and updating index.html..."
create_file "public/logo.svg" <<'LOGO'
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8" fill="#3B82F6"/>
  <path d="M20 10L30 18L20 26L10 18L20 10Z" fill="white"/>
  <circle cx="20" cy="20" r="3" fill="#3B82F6"/>
</svg>
LOGO

# Update index.html with proper meta tags
create_file "index.html" <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Professional digital solutions that drive real results for your business" />
    <meta name="keywords" content="web development, ui ux design, digital strategy, responsive websites" />
    <meta name="author" content="Your Company Name" />
    
    <title>Your Company Name - Professional Digital Solutions</title>
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Your Company Name - Professional Digital Solutions" />
    <meta property="og:description" content="We deliver exceptional results for your business needs with modern, responsive websites and applications." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/logo.svg" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Your Company Name - Professional Digital Solutions" />
    <meta name="twitter:description" content="We deliver exceptional results for your business needs." />
    
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <link rel="canonical" href="https://yourcompany.com" />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

# Ensure port is set correctly
if [[ -f "package.json" ]]; then
  if grep -q '"dev":' package.json; then
    sed -i.bak "s/\"dev\": \"vite\"/\"dev\": \"vite --port ${TARGET_PORT}\"/g" package.json
    rm -f package.json.bak
    log "Updated dev script to use port $TARGET_PORT"
  fi
fi

# Create a README with usage instructions
create_file "README.md" <<'README'
# Universal Header Template v4

A production-ready React website template with Tailwind CSS v3.4.x and Radix UI components.

## Features

- ⚡ **Vite** for lightning-fast development
- ⚛️ **React 19** with TypeScript
- 🎨 **Tailwind CSS v3.4.x** (stable, proven)
- 🎯 **Radix UI** for accessible components
- 📱 **Fully Responsive** design
- ♿ **Accessibility** compliant
- 🎨 **CSS Variables** for easy theming
- 🔧 **Ready to customize**

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Customization

### Update Site Configuration
Edit `src/config/site.ts` to customize:
- Company name and tagline
- Navigation menu
- Hero section content
- Contact information
- Theme colors

### Modify Styling
Edit `src/styles/index.css` to customize:
- Color palette
- Typography
- Spacing system
- Component styles

### Add New Sections
Create components in `src/components/` and import them in `App.tsx`.

## Project Structure

```
src/
├── components/          # React components
├── config/             # Site configuration
├── styles/             # CSS styles
├── types/              # TypeScript types
├── utils/              # Utility functions
└── main.tsx           # Entry point
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - feel free to use for commercial projects.
README

log "✅ Phase B v4 complete! Full website ready:"
log "   📁 Complete file structure created"
log "   🎨 Responsive header with 4 variants"
log "   📱 Mobile-friendly navigation"
log "   🎯 Accessible components (Radix UI)"
log "   💎 Professional styling with Tailwind v3.4.x"
log "   🔧 Customizable via CSS variables"
log "   📄 Complete sections: Header, Services, About, Contact, Footer"
log ""
log "🚀 Ready to launch:"
log "   cd $APP_DIR && npm run dev"
log "   Open http://localhost:$TARGET_PORT"
log ""
log "🎨 Customize by editing:"
log "   • src/config/site.ts (content)"
log "   • src/styles/index.css (styling)"
log "   • public/logo.svg (logo)"