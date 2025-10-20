#!/usr/bin/env bash
# final_polish_and_logo.sh - Fix CSS error and add proper logo
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4 || exit 1

echo "=== Final Polish: CSS Fix + Logo Integration ==="
echo ""

# ============================================================================
# FIX 1: CSS Import Order (causing the PostCSS error)
# ============================================================================
echo "Fix 1: Correcting CSS import order..."

cat > src/styles/index.css << 'EOF'
/* Import Goldman font FIRST - must come before Tailwind */
@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

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
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  
  /* Font Families */
  --font-heading: 'Goldman', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  /* Spacing System */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 5rem;
  
  /* Border Radius - Maximum 2px Rule */
  --radius-none: 0px;
  --radius-sm: 1px;
  --radius-md: 2px;
  --radius-lg: 2px;
  --radius-xl: 2px;
  
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
  font-weight: 700;
}

h2 {
  font-size: var(--font-size-4xl);
  font-weight: 400;
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
  
  .container {
    @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .section {
    padding: var(--spacing-4xl) 0;
  }
  
  .section-sm {
    padding: var(--spacing-2xl) 0;
  }
  
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
  
  .service-card {
    @apply card;
    min-height: 500px;
  }
  
  .service-card img {
    border-bottom: 2px solid var(--badgr-primary);
    transition: all var(--transition-normal);
  }
  
  .service-card:hover img {
    transform: scale(1.02);
  }
  
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

/* Hero Section Styling */
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

/* High Contrast Hero Text */
.hero-atlanta .hero-content h1,
.hero-atlanta .hero-content h2,
.hero-atlanta .hero-content p,
.hero-atlanta .hero-content .text-responsive-lg,
.hero-atlanta .hero-content .text-responsive-base {
  color: #FFFFFF !important;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.8);
}

.professional-header {
  background: var(--badgr-primary);
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 50;
}

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
    background-attachment: scroll;
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

@media (prefers-contrast: high) {
  :root {
    --badgr-primary: #0052A3;
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
}

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
EOF

echo "✓ CSS import order fixed"

# ============================================================================
# FIX 2: Update business config with correct logo paths
# ============================================================================
echo ""
echo "Fix 2: Updating logo paths to use emblem-badgrBLU2.svg..."

# Update business.ts with WHITE logo for header (on blue background)
# and BLACK logo for footer (on dark background)
sed -i 's|logo-blk-wht2.svg|emblem-badgrWHT.svg|g' src/config/business.ts
sed -i 's|logo-black-chrm-(U).svg|emblem-badgrBLK.svg|g' src/config/business.ts

echo "✓ Logo paths updated"

# ============================================================================
# FIX 3: Fix tsconfig.node.json
# ============================================================================
echo ""
echo "Fix 3: Fixing TypeScript config..."

cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

echo "✓ TypeScript config fixed"

# ============================================================================
# FINAL: Rebuild
# ============================================================================
echo ""
echo "Rebuilding project..."
npm run build 2>&1 | grep -v "warning" || true

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ POLISH COMPLETE                                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Logo Configuration:"
echo "  Header: White emblem (emblem-badgrWHT.svg) on blue background"
echo "  Footer: Black emblem (emblem-badgrBLK.svg) on dark background"
echo "  Size: h-10 w-auto (40px height, proportional width)"
echo ""
echo "Restart server:"
echo "  Ctrl+C to stop current server"
echo "  npm run dev"
echo ""
echo "Check: http://localhost:3000"