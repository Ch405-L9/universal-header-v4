#!/usr/bin/env bash
# header_v4D1_visual_styling.sh - Phase D1: Visual Styling & Branding
# Applies BADGRTech visual design system and Atlanta skyline branding
set -euo pipefail

APP_DIR="universal-header-v4"
DRY_RUN=false
VERBOSE=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir) APP_DIR="${2:-universal-header-v4}"; shift 2;;
    --dry-run) DRY_RUN=true; shift;;
    --quiet) VERBOSE=false; shift;;
    *) echo "Usage: $0 [--dir DIR] [--dry-run] [--quiet]"; exit 1;;
  esac
done

log(){ [[ "$VERBOSE" == true ]] && echo "[$0] $*"; }
fail(){ echo "ERROR: $*" >&2; exit 1; }

[[ -d "$APP_DIR" ]] || fail "App dir '$APP_DIR' not found."
cd "$APP_DIR"

# Validate Phase D completed
[[ -f "src/config/business.ts" ]] || fail "Business config missing. Run Phase D first."

ensure_dir(){ [[ -d "$1" ]] || { mkdir -p "$1"; log "Created directory: $1"; }; }
create_file(){
  local fp="$1"
  if [[ "$DRY_RUN" == true ]]; then log "Would create: $fp"; cat > /dev/null; return 0; fi
  ensure_dir "$(dirname "$fp")"
  cat > "$fp"
  log "Updated file: $fp ($(wc -l < "$fp") lines)"
}

log "Phase D1: Applying BADGRTech visual styling and branding..."

# Create comprehensive visual design system
create_file "src/styles/index.css" <<'BADGRCSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Goldman font for headings */
@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

/* BADGRTech Design System Variables */
:root {
  /* Primary Brand Colors */
  --badgr-primary: #0066CC;
  --badgr-primary-dark: #0052A3;
  --badgr-primary-light: #3385D1;
  --badgr-white: #FFFFFF;
  --badgr-black: #000000;
  --badgr-gray: #666666;
  --badgr-gray-light: #F8F9FA;
  --badgr-gray-dark: #343A40;
  
  /* Semantic Colors */
  --color-primary: var(--badgr-primary);
  --color-secondary: var(--badgr-gray-dark);
  --color-accent: #10b981;
  --color-neutral: var(--badgr-gray);
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;
  
  /* Typography Scale */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  /* Font Families */
  --font-heading: 'Goldman', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  /* Spacing System */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
  --spacing-4xl: 5rem;     /* 80px */
  
  /* Border Radius - Maximum 2px Rule */
  --radius-none: 0px;
  --radius-sm: 1px;
  --radius-md: 2px;        /* MAXIMUM per requirements */
  --radius-lg: 2px;        /* Capped at 2px */
  --radius-xl: 2px;        /* Capped at 2px */
  
  /* Shadows with Blue Tint */
  --shadow-sm: 0 1px 2px 0 rgba(0, 102, 204, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 102, 204, 0.1), 0 4px 6px -2px rgba(0, 102, 204, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 102, 204, 0.1), 0 10px 10px -5px rgba(0, 102, 204, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 102, 204, 0.25);
  --shadow-glow: 0 0 20px rgba(0, 102, 204, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}

/* Base Styles Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--badgr-black);
  background-color: var(--badgr-white);
}

/* Typography System */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
  color: var(--badgr-black);
  margin-bottom: var(--spacing-md);
  letter-spacing: 0.025em;
}

h1 {
  font-size: var(--font-size-5xl);
  font-weight: 700; /* Goldman Bold */
}

h2 {
  font-size: var(--font-size-4xl);
  font-weight: 400; /* Goldman Regular with spacing */
  letter-spacing: 0.05em;
}

h3 {
  font-size: var(--font-size-3xl);
}

h4 {
  font-size: var(--font-size-2xl);
}

h5 {
  font-size: var(--font-size-xl);
}

h6 {
  font-size: var(--font-size-lg);
}

p {
  margin-bottom: var(--spacing-md);
  line-height: 1.7;
}

a {
  color: var(--badgr-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--badgr-primary-dark);
  text-decoration: underline;
}

/* Accessibility Focus Styles */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--badgr-primary);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}

/* Skip Navigation Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--badgr-primary);
  color: var(--badgr-white);
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  font-weight: 600;
  z-index: 1000;
  transform: translateY(-100%);
  transition: transform var(--transition-normal);
}

.skip-link:focus {
  transform: translateY(0);
}

/* Component Layer with BADGRTech Branding */
@layer components {
  /* Button System */
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
    border-radius: var(--radius-md);
    border: 2px solid transparent;
  }
  
  .btn-primary {
    background: var(--badgr-primary);
    color: var(--badgr-white);
    border-color: var(--badgr-primary);
    box-shadow: var(--shadow-md);
  }
  
  .btn-primary:hover {
    background: var(--badgr-primary-dark);
    border-color: var(--badgr-primary-dark);
    box-shadow: var(--shadow-lg);
    transform: translateY(-1px);
  }
  
  .btn-secondary {
    background: var(--badgr-white);
    color: var(--badgr-primary);
    border-color: var(--badgr-primary);
    box-shadow: var(--shadow-sm);
  }
  
  .btn-secondary:hover {
    background: var(--badgr-primary);
    color: var(--badgr-white);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  .btn-accent {
    @apply bg-accent text-white hover:bg-emerald-700;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }
  
  /* Container System */
  .container {
    @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  /* Section Spacing */
  .section {
    padding: var(--spacing-4xl) 0;
  }
  
  .section-sm {
    padding: var(--spacing-2xl) 0;
  }
  
  /* Card System with Blue Borders */
  .card {
    background: var(--badgr-white);
    border-radius: var(--radius-md);
    border: 2px solid var(--badgr-primary);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: all var(--transition-normal);
  }
  
  .card:hover {
    box-shadow: var(--shadow-glow);
    transform: translateY(-4px);
  }
  
  .card-body {
    padding: var(--spacing-xl);
  }
  
  /* Input System */
  .input {
    @apply w-full px-4 py-3 border-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2;
    border-color: var(--badgr-gray);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    transition: all var(--transition-fast);
  }
  
  .input:focus {
    border-color: var(--badgr-primary);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }
  
  /* Service Card Specific Styling */
  .service-card {
    @apply card;
    min-height: 500px; /* Double size requirement */
  }
  
  .service-card img {
    border-bottom: 2px solid var(--badgr-primary);
    transition: all var(--transition-normal);
  }
  
  .service-card:hover img {
    transform: scale(1.02);
  }
  
  /* Section Dividers */
  .section-divider {
    height: 4px;
    background: linear-gradient(
      90deg, 
      var(--badgr-primary) 0%, 
      var(--badgr-primary-light) 50%, 
      var(--badgr-primary) 100%
    );
    margin: var(--spacing-2xl) 0;
  }
}

/* Animation System */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
  }
  to { 
    opacity: 1; 
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Animation Classes */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive Typography */
.text-responsive-xs { font-size: clamp(0.75rem, 2vw, 0.875rem); }
.text-responsive-sm { font-size: clamp(0.875rem, 2.5vw, 1rem); }
.text-responsive-base { font-size: clamp(1rem, 3vw, 1.125rem); }
.text-responsive-lg { font-size: clamp(1.125rem, 3.5vw, 1.5rem); }
.text-responsive-xl { font-size: clamp(1.5rem, 4vw, 2.25rem); }
.text-responsive-2xl { font-size: clamp(2rem, 5vw, 3rem); }
.text-responsive-3xl { font-size: clamp(2.5rem, 6vw, 4rem); }

/* Utility Classes */
.text-primary { color: var(--badgr-primary); }
.text-secondary { color: var(--badgr-gray); }
.text-white { color: var(--badgr-white); }
.text-black { color: var(--badgr-black); }

.bg-primary { background-color: var(--badgr-primary); }
.bg-white { background-color: var(--badgr-white); }
.bg-gray-light { background-color: var(--badgr-gray-light); }

.border-primary { border-color: var(--badgr-primary); }
.border-2 { border-width: 2px; }
.rounded-badgr { border-radius: var(--radius-md); }

/* Hero Section Atlanta Styling */
.hero-atlanta {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(0, 102, 204, 0.8) 0%,
    rgba(0, 102, 204, 0.6) 100%
  ), url('/images/hero/hero-atlanta-skyline.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

.hero-atlanta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 102, 204, 0.1) 0%,
    rgba(0, 102, 204, 0.3) 100%
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
}

/* Professional Headers */
.professional-header {
  background: var(--badgr-primary);
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Footer Styling */
.footer-badgr {
  background: linear-gradient(
    135deg,
    var(--badgr-gray-dark) 0%,
    #2D3748 100%
  );
  color: var(--badgr-white);
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .hero-atlanta {
    background-attachment: scroll; /* Better mobile performance */
    min-height: 80vh;
  }
  
  .btn {
    @apply px-4 py-2 text-sm;
  }
  
  .section {
    padding: var(--spacing-2xl) 0;
  }
  
  h1 {
    font-size: var(--font-size-4xl);
  }
  
  h2 {
    font-size: var(--font-size-3xl);
  }
}

/* Print Styles */
@media print {
  .hero-atlanta {
    background: var(--badgr-primary);
    color: var(--badgr-white);
  }
  
  .btn {
    border: 2px solid var(--badgr-primary);
    color: var(--badgr-primary);
    background: transparent;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  :root {
    --badgr-primary: #0052A3;
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .hero-atlanta {
    background-attachment: scroll;
  }
}
BADGRCSS

# Update Tailwind config for BADGRTech branding
create_file "tailwind.config.js" <<'BADGRTAILWIND'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BADGRTech Brand Colors
        'badgr-primary': '#0066CC',
        'badgr-primary-dark': '#0052A3',
        'badgr-primary-light': '#3385D1',
        'badgr-white': '#FFFFFF',
        'badgr-black': '#000000',
        'badgr-gray': '#666666',
        'badgr-gray-light': '#F8F9FA',
        'badgr-gray-dark': '#343A40',
        
        // Semantic Color Mapping
        primary: '#0066CC',
        secondary: '#343A40',
        accent: '#10b981',
        neutral: '#666666',
      },
      
      fontFamily: {
        // BADGRTech Typography System
        'heading': ['Goldman', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        
        // Responsive Typography
        'responsive-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'responsive-base': 'clamp(1rem, 3vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 3.5vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 2.25rem)',
        'responsive-2xl': 'clamp(2rem, 5vw, 3rem)',
        'responsive-3xl': 'clamp(2.5rem, 6vw, 4rem)',
      },
      
      borderRadius: {
        // 2px Maximum Rule Enforcement
        'none': '0px',
        'sm': '1px',
        'DEFAULT': '2px',
        'md': '2px',
        'lg': '2px',
        'xl': '2px',
        '2xl': '2px',
        '3xl': '2px',
        'full': '9999px', // Exception for circular elements
      },
      
      boxShadow: {
        // Blue-tinted Shadow System
        'sm': '0 1px 2px 0 rgba(0, 102, 204, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 102, 204, 0.1), 0 1px 2px 0 rgba(0, 102, 204, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 102, 204, 0.1), 0 4px 6px -2px rgba(0, 102, 204, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 102, 204, 0.1), 0 10px 10px -5px rgba(0, 102, 204, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 102, 204, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 102, 204, 0.06)',
        'glow': '0 0 20px rgba(0, 102, 204, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 102, 204, 0.4)',
      },
      
      spacing: {
        // Extended Spacing Scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      animation: {
        // BADGRTech Animations
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        bounceSubtle: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
          '50%': {
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          }
        }
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      }
    },
  },
  plugins: [
    // Add any additional plugins here
  ],
}
BADGRTAILWIND

# Create component styling improvements
create_file "src/components/SectionDivider.tsx" <<'SECTIONDIVIDER'
import React from 'react';
import { cn } from '@/utils/cn';

interface SectionDividerProps {
  className?: string;
  variant?: 'gradient' | 'solid' | 'dots';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  className = '', 
  variant = 'gradient' 
}) => {
  if (variant === 'gradient') {
    return (
      <div className={cn('section-divider', className)} />
    );
  }
  
  if (variant === 'solid') {
    return (
      <div className={cn('h-1 bg-badgr-primary my-8', className)} />
    );
  }
  
  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center items-center my-12', className)}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-badgr-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-badgr-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-badgr-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default SectionDivider;
SECTIONDIVIDER

# Update package.json with additional styling dependencies
if [[ -f "package.json" ]]; then
    log "Adding styling optimization to package.json..."
    
    # Check if we need to add autoprefixer for better CSS compatibility
    if ! grep -q "autoprefixer" package.json; then
        node -e "
            const fs = require('fs');
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            
            // Add development scripts for styling
            pkg.scripts = {
                ...pkg.scripts,
                'build:css': 'tailwindcss build src/styles/index.css -o dist/styles.css',
                'watch:css': 'tailwindcss build src/styles/index.css -o dist/styles.css --watch',
                'optimize:css': 'tailwindcss build src/styles/index.css -o dist/styles.css --minify'
            };
            
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
        " 2>/dev/null || log "Could not update package.json scripts"
    fi
fi

# Create README section for styling guide
create_file "STYLING_GUIDE.md" <<'STYLINGGUIDE'
# BADGRTech Visual Design System

## Color Palette

### Primary Colors
- **Primary Blue**: `#0066CC` - Main brand color
- **Primary Dark**: `#0052A3` - Hover states, emphasis
- **Primary Light**: `#3385D1` - Accents, gradients
- **White**: `#FFFFFF` - Backgrounds, contrast
- **Black**: `#000000` - Primary text
- **Gray**: `#666666` - Secondary text

### Usage Guidelines
- Use Primary Blue for CTAs, links, and brand elements
- White backgrounds with blue borders for cards
- Black text for headings, gray for body text
- Blue-tinted shadows throughout the design

## Typography

### Font Families
- **Headings**: Goldman (Bold weight for H1, Regular with letter-spacing for H2)
- **Body Text**: Inter (400, 500, 600, 700 weights)

### Responsive Scale
```css
/* Use these classes for responsive typography */
.text-responsive-xs    /* 12-14px responsive */
.text-responsive-sm    /* 14-16px responsive */
.text-responsive-base  /* 16-18px responsive */
.text-responsive-lg    /* 18-24px responsive */
.text-responsive-xl    /* 24-36px responsive */
.text-responsive-2xl   /* 32-48px responsive */
.text-responsive-3xl   /* 40-64px responsive */
```

## Border Radius Rules

**Maximum 2px radius throughout the entire site**
- All cards, buttons, inputs use `border-radius: 2px`
- Exception: Circular elements (avatars, icons) can use `border-radius: 50%`

## Shadows

All shadows use blue tinting for brand consistency:
- `--shadow-sm`: Subtle blue tint for hover states
- `--shadow-md`: Standard card shadows
- `--shadow-lg`: Elevated elements
- `--shadow-glow`: Special hover effects on service cards

## Component Guidelines

### Service Cards
- Minimum height: 500px (double-sized requirement)
- Blue borders: 2px solid #0066CC
- Hover effects: Transform up 4px + blue glow shadow
- Images with blue bottom border

### Buttons
- Primary: Blue background, white text
- Secondary: White background, blue text and border
- Hover: Slight upward transform + shadow enhancement

### Hero Section
- Atlanta skyline background with blue gradient overlay
- Fixed background attachment on desktop
- Scroll attachment on mobile for performance

## Animation System

### Available Animations
```css
.animate-fade-in        /* Fade in over 0.6s */
.animate-fade-in-up     /* Fade in with upward motion */
.animate-slide-in-left  /* Slide in from left */
.animate-slide-in-right /* Slide in from right */
.animate-pulse          /* Subtle pulsing effect */
```

### Reduced Motion Support
All animations respect `prefers-reduced-motion: reduce` for accessibility.

## Accessibility Features

- High contrast mode support
- Focus indicators with blue outline
- Skip navigation links
- Semantic HTML structure
- ARIA labels where appropriate

## Mobile Optimizations

- Background attachment changes to scroll on mobile
- Responsive font sizing with clamp()
- Touch-friendly button sizes (minimum 44px)
- Optimized spacing for smaller screens

## Asset Integration

### Required Image Structure
```
public/images/
├── hero/
│   └── hero-atlanta-skyline.webp
├── logo/
│   └── logo-blk-wht2.svg
├── services/
│   ├── service-web-devdes.webp
│   ├── service-brand.webp
│   └── service-content-edit.webp
└── icons/
    └── [various SVG icons]
```

### Image Guidelines
- Use WebP format for photos (better compression)
- Use SVG format for logos and icons
- Optimize all images for web performance
- Provide fallback images for critical assets

## Development Commands

```bash
# Watch CSS changes during development
npm run watch:css

# Build optimized CSS for production
npm run optimize:css

# Standard development server
npm run dev
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
STYLINGGUIDE

log ""
log "🎨 Phase D1 Complete: Visual Styling & Branding Applied!"
log ""
log "🎯 BADGRTech Design System Implemented:"
log "  ✓ Goldman Bold typography for headings"
log "  ✓ Blue color scheme (#0066CC primary)"
log "  ✓ 2px maximum border radius enforced"
log "  ✓ Blue-tinted shadow system"
log "  ✓ Atlanta skyline hero integration"
log "  ✓ Professional button and card styling"
log ""
log "📄 Updated Files:"
log "  • src/styles/index.css - Complete design system"
log "  • tailwind.config.js - Brand color integration"  
log "  • src/components/SectionDivider.tsx - Blue gradient dividers"
log "  • STYLING_GUIDE.md - Design system documentation"
log ""
log "🚀 Visual Features:"
log "  • Responsive typography with clamp() functions"
log "  • Accessibility-compliant focus states"
log "  • Mobile-optimized animations and backgrounds"
log "  • Service cards with blue borders and hover effects"
log "  • Professional shadow system with blue tinting"
log "  • Print and high-contrast mode support"
log ""
log "🔍 Asset Requirements:"
log "  • Hero background: /images/hero/hero-atlanta-skyline.webp"
log "  • Logo: /images/logo/logo-blk-wht2.svg"
log "  • Service images: /images/services/*.webp"
log ""
log "📋 Next Steps:"
log "  1. Run: npm run dev"
log "  2. Test visual styling at http://localhost:3000"
log "  3. Verify all assets load correctly"
log "  4. Check responsive behavior on mobile"
log ""
log "🎉 BADGRTech branding complete!"
log "Your site now has professional Atlanta-based styling with the full design system."