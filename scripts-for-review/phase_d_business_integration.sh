#!/usr/bin/env bash
# header_v4D_business_integration.sh - Phase D: BADGRTechnologies Business Data Integration
# Replaces placeholder data with real business information and configures asset paths
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

[[ -d "$APP_DIR" ]] || fail "App dir '$APP_DIR' not found. Run Phases A-C first."
cd "$APP_DIR"

# Validate all previous phases completed
[[ -f "src/components/Footer.tsx" ]] || fail "Footer component missing. Run Phase C-3 first."

ensure_dir(){ [[ -d "$1" ]] || { mkdir -p "$1"; log "Created directory: $1"; }; }
create_file(){
  local fp="$1"
  if [[ "$DRY_RUN" == true ]]; then log "Would create: $fp"; cat > /dev/null; return 0; fi
  ensure_dir "$(dirname "$fp")"
  cat > "$fp"
  log "Updated file: $fp ($(wc -l < "$fp") lines)"
}

log "Phase D: Integrating BADGRTechnologies business data and assets..."

# Create BADGRTech-specific business configuration
create_file "src/config/business.ts" <<'BUSINESSCONFIG'
export const badgrTechBusiness = {
  company: {
    name: "BADGRTechnologies LLC",
    legalName: "BADGRTechnologies LLC",
    type: "Limited Liability Company",
    status: "Active/Compliance",
    naics: "541511",
    founded: "2024"
  },
  
  contact: {
    email: {
      primary: "hello@badgrtech.com",
      support: "support@badgrtech.com"
    },
    phone: {
      primary: "+1 (404) 423-5493",
      formatted: "404 423 5493"
    },
    address: {
      street: "8735 DUNWOODY PLACE, STE N",
      city: "ATLANTA",
      state: "GA",
      zip: "30350",
      country: "USA",
      full: "8735 Dunwoody Place, Suite N, Atlanta, GA 30350"
    },
    hours: {
      weekdays: "Monday - Friday, 8:30 AM - 5:30 PM EST",
      weekends: "Client calls only - leave message",
      note: "Client calls only, no answer leave a message"
    }
  },

  social: {
    twitter: {
      url: "https://x.com/Badgr1stOne",
      handle: "@Badgr1stOne"
    },
    instagram: {
      url: "https://instagram.com/Badgr1stOne",
      handle: "@Badgr1stOne"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/anthony-g-5b2b1a273",
      handle: "Anthony Grant"
    },
    github: {
      url: "https://github.com/Ch405-L9",
      handle: "Ch405-L9"
    }
  },

  assets: {
    logo: {
      primary: "/images/logo/logo-blk-wht2.svg",
      white: "/images/logo/logo-black-chrm-(U).svg",
      favicon: "/images/icons/favicon.svg"
    },
    hero: {
      background: "/images/hero/hero-atlanta-skyline.webp",
      fallback: "/images/hero/atlanta-skyline-backup.jpg"
    },
    services: {
      webDevelopment: "/images/services/service-web-devdes.webp",
      branding: "/images/services/service-brand.webp", 
      content: "/images/services/service-content-edit.webp"
    },
    team: {
      owner: "/images/team/about-owner.webp"
    },
    icons: {
      burger: "/images/icons/burgercon.svg",
      apple: "/images/icons/apple-touch-icon.png",
      calendar: "/images/icons/calendar-black.svg",
      copyright: "/images/icons/copyright.svg",
      dev: "/images/icons/dev-icon(pp).svg",
      facebook: "/images/icons/facebook.svg",
      github: "/images/icons/github.svg",
      instagram: "/images/icons/instagram.svg",
      linkedin: "/images/icons/linkedin.svg",
      mail: "/images/icons/mail-black.svg",
      npm: "/images/icons/npm.svg",
      phone: "/images/icons/phone-black.svg",
      react: "/images/icons/react.svg",
      registered: "/images/icons/registered.svg",
      shopLocal: "/images/icons/shop-atl-local.svg",
      tailwind: "/images/icons/tailwindcss.svg",
      under: "/images/icons/undr-cnstruct.svg"
    }
  },

  branding: {
    taglines: {
      primary: "CTRL+ALT+Deliver",
      extended: "Full-stack solutions that transform small business potential into digital success",
      alternative: "Code. Create. Convert.",
      professional: "Where technical expertise meets business growth"
    },
    
    colors: {
      primary: "#0066CC",
      secondary: "#1f2937", 
      accent: "#10b981",
      white: "#FFFFFF",
      black: "#000000",
      gray: "#666666"
    },

    fonts: {
      headings: "Goldman, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      weight: {
        bold: "700",
        semibold: "600",
        normal: "400"
      }
    }
  }
};
BUSINESSCONFIG

# Update main site configuration with BADGRTech data
log "Updating main site configuration with business data..."

create_file "src/config/site.ts" <<'UPDATEDSITE'
import { SiteConfig } from '@/types';
import { badgerTechServices } from './services';
import { badgrTechBusiness } from './business';

export const defaultSiteConfig: SiteConfig = {
  title: badgrTechBusiness.company.name,
  tagline: badgrTechBusiness.branding.taglines.primary,
  description: badgrTechBusiness.branding.taglines.extended,
  logo: badgrTechBusiness.assets.logo.primary,
  
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  
  hero: {
    headline: "Transform Your Digital Presence",
    subheadline: badgrTechBusiness.branding.taglines.extended,
    description: "We deliver enterprise-grade web development and strategic digital solutions for ambitious small businesses ready to dominate their market.",
    variant: "banner",
    backgroundImage: badgrTechBusiness.assets.hero.background,
    ctaButtons: [
      { 
        text: "Get My Custom Digital Audit", 
        href: `mailto:${badgrTechBusiness.contact.email.primary}?subject=Custom Digital Audit Request`,
        variant: "primary" 
      },
      { 
        text: "View Our Services", 
        href: "#services", 
        variant: "secondary" 
      }
    ]
  },
  
  contact: {
    email: badgrTechBusiness.contact.email.primary,
    phone: badgrTechBusiness.contact.phone.primary,
    address: badgrTechBusiness.contact.address.full,
    social: {
      twitter: badgrTechBusiness.social.twitter.url,
      linkedin: badgrTechBusiness.social.linkedin.url,
      github: badgrTechBusiness.social.github.url,
      instagram: badgrTechBusiness.social.instagram.url
    }
  },
  
  theme: {
    primaryColor: badgrTechBusiness.branding.colors.primary,
    secondaryColor: badgrTechBusiness.branding.colors.secondary,
    accentColor: badgrTechBusiness.branding.colors.accent
  },

  services: badgerTechServices
};
UPDATEDSITE

# Update services configuration with BADGRTech specifics
create_file "src/config/services.ts" <<'UPDATEDSERVICES'
import { ServicesConfig } from '@/types/services';
import { badgrTechBusiness } from './business';

export const badgerTechServices: ServicesConfig = {
  title: "Services",
  subtitle: "Professional Digital Solutions That Drive Results",
  description: "We deliver enterprise-grade solutions for ambitious small businesses ready to outperform their competition through superior digital presence.",
  
  services: [
    {
      id: "full-stack-development",
      title: "Full-Stack Web Development",
      description: "Complete web development from concept to launch - responsive, fast-loading websites that convert visitors into customers and establish market authority.",
      features: [
        "Custom React & TypeScript development",
        "Mobile-first responsive design",
        "SEO optimization & Core Web Vitals",
        "Content management integration",
        "Analytics & conversion tracking",
        "SSL security & performance monitoring",
        "6 months support & maintenance",
        "Google Lighthouse 90+ scores"
      ],
      price: {
        starting: 3000,
        currency: "$",
        period: "project"
      },
      cta: {
        text: "Get Development Quote",
        href: badgrTechBusiness.contact.email.primary,
        type: "email"
      },
      image: badgrTechBusiness.assets.services.webDevelopment,
      popular: true
    },
    {
      id: "strategic-branding",
      title: "Strategic Branding & Identity",
      description: "Brand development that influences buying decisions and establishes market authority over competitors through psychology-driven design.",
      features: [
        "Market research & competitor analysis",
        "Logo design & visual identity",
        "Brand guidelines & style systems",
        "Color psychology implementation",
        "Typography & messaging strategy",
        "Social media brand assets",
        "Business card & collateral design",
        "Brand consistency documentation"
      ],
      price: {
        starting: 2500,
        currency: "$",
        period: "project"
      },
      cta: {
        text: "Start Branding Project",
        href: badgrTechBusiness.contact.email.primary,
        type: "email"
      },
      image: badgrTechBusiness.assets.services.branding
    },
    {
      id: "visual-content",
      title: "Visual Content & Editing",
      description: "Professional photo editing, graphic design, and social media content that builds credibility and drives engagement for your brand.",
      features: [
        "Professional photo retouching",
        "Social media content creation",
        "Marketing material design",
        "Image optimization for web",
        "Brand-consistent graphics",
        "Conversion-focused visuals",
        "Print & digital formats",
        "Content calendar support"
      ],
      price: {
        starting: 1500,
        currency: "$",
        period: "project"
      },
      cta: {
        text: "Discuss Visual Needs",
        href: badgrTechBusiness.contact.phone.primary,
        type: "phone"
      },
      image: badgrTechBusiness.assets.services.content
    }
  ],
  
  ctaSection: {
    title: "Ready to Transform Your Digital Presence?",
    description: "Join successful SMBs who've streamlined their growth with integrated digital solutions. Let's discuss how we can accelerate your business success.",
    primaryCta: {
      text: "Get Free Strategy Session",
      href: `mailto:${badgrTechBusiness.contact.email.primary}?subject=Free Strategy Session Request&body=I'm interested in discussing my digital growth strategy. Please contact me to schedule a free consultation.`
    },
    secondaryCta: {
      text: "Call Direct",
      href: `tel:${badgrTechBusiness.contact.phone.primary}`
    }
  }
};
UPDATEDSERVICES

# Update about configuration with founder information
create_file "src/config/about.ts" <<'UPDATEDABOUT'
import { badgrTechBusiness } from './business';

export const badgerTechAbout = {
  title: "About BADGRTechnologies",
  subtitle: "Your Digital Innovation Partner",
  description: [
    "A.D. Grant brings 16+ years of enterprise IT experience to small business success. As Founder of BADGRTechnologies LLC, I specialize in translating complex technical solutions into growth-driving digital assets for ambitious entrepreneurs.",
    "My background spans enterprise security at UVeye, scalable development at Source Support and HotSauce, plus comprehensive certifications in Python, Kotlin, UX/UI design, and cybersecurity protocols. But here's what matters most: I understand that technology should solve problems, not create them.",
    "At BADGRTech, we build more than websites - we engineer digital foundations that convert visitors into customers and establish market authority. Every project starts with understanding your customers, analyzing your competition, and building solutions that drive measurable results."
  ],
  highlights: {
    title: "Why Choose BADGRTech?",
    items: [
      "16+ years enterprise IT experience",
      "Proven track record with 100+ successful projects",
      "Meta-certified developer with advanced credentials",
      "Direct communication - no account managers",
      "40-60% cost savings over traditional agencies", 
      "Faster turnaround with personal investment",
      "Enterprise-grade solutions for small business budgets",
      "Specialized expertise in conversion optimization"
    ]
  },
  team: {
    title: "Our Commitment",
    description: "We're not just developers — we're strategic partners invested in your success. Every project receives personal attention from initial planning through launch and ongoing optimization."
  },
  cta: {
    text: "Start Your Project Today",
    href: `mailto:${badgrTechBusiness.contact.email.primary}?subject=New Project Inquiry&body=I'd like to discuss my project requirements and get started with BADGRTechnologies.`
  }
};
UPDATEDABOUT

# Update contact configuration 
create_file "src/config/contact.ts" <<'UPDATEDCONTACT'
import { badgrTechBusiness } from './business';

export const badgerTechContact = {
  title: "Contact",
  subtitle: "Let's Build Something Amazing Together",
  description: "Ready to transform your digital presence? We're here to help. Get in touch to discuss your project, ask questions, or learn more about how we can help your business succeed online.",
  
  info: {
    email: badgrTechBusiness.contact.email.primary,
    phone: badgrTechBusiness.contact.phone.primary,
    address: {
      street: badgrTechBusiness.contact.address.street,
      city: badgrTechBusiness.contact.address.city,
      state: badgrTechBusiness.contact.address.state,
      zip: badgrTechBusiness.contact.address.zip
    },
    hours: {
      weekdays: badgrTechBusiness.contact.hours.weekdays,
      weekends: badgrTechBusiness.contact.hours.weekends
    },
    social: {
      linkedin: badgrTechBusiness.social.linkedin.url,
      twitter: badgrTechBusiness.social.twitter.url,
      github: badgrTechBusiness.social.github.url,
      instagram: badgrTechBusiness.social.instagram.url
    }
  }
};
UPDATEDCONTACT

# Update footer configuration
create_file "src/config/footer.ts" <<'UPDATEDFOOTER'
import React from 'react';
import { badgrTechBusiness } from './business';

export const badgerTechFooter = {
  companyName: badgrTechBusiness.company.name,
  tagline: badgrTechBusiness.branding.taglines.primary,
  description: "We create exceptional digital experiences that help ambitious small businesses thrive in competitive markets through superior technology implementation.",
  
  sections: [
    {
      title: "Services",
      links: [
        { label: "Full-Stack Development", href: "#services" },
        { label: "Strategic Branding", href: "#services" },
        { label: "Visual Content Creation", href: "#services" },
        { label: "SaaS Integration", href: "#services" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Process", href: "#about" },
        { label: "Case Studies", href: "#portfolio" },
        { label: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
        { label: "Support", href: `mailto:${badgrTechBusiness.contact.email.support}` },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ],
  
  socialLinks: [
    {
      name: "LinkedIn",
      href: badgrTechBusiness.social.linkedin.url,
      icon: React.createElement("svg", {
        className: "w-5 h-5 text-white",
        fill: "currentColor",
        viewBox: "0 0 20 20"
      }, React.createElement("path", {
        fillRule: "evenodd",
        d: "M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z",
        clipRule: "evenodd"
      }))
    },
    {
      name: "Twitter",
      href: badgrTechBusiness.social.twitter.url,
      icon: React.createElement("svg", {
        className: "w-5 h-5 text-white",
        fill: "currentColor",
        viewBox: "0 0 20 20"
      }, React.createElement("path", {
        d: "M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
      }))
    },
    {
      name: "GitHub", 
      href: badgrTechBusiness.social.github.url,
      icon: React.createElement("svg", {
        className: "w-5 h-5 text-white",
        fill: "currentColor",
        viewBox: "0 0 20 20"
      }, React.createElement("path", {
        fillRule: "evenodd",
        d: "M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z",
        clipRule: "evenodd"
      }))
    },
    {
      name: "Instagram",
      href: badgrTechBusiness.social.instagram.url,
      icon: React.createElement("svg", {
        className: "w-5 h-5 text-white",
        fill: "currentColor",
        viewBox: "0 0 20 20"
      }, React.createElement("path", {
        fillRule: "evenodd",
        d: "M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.773 2.249 17.776.228 14.124.06 13.057.012 12.717 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
        clipRule: "evenodd"
      }))
    }
  ],
  
  legal: {
    copyright: badgrTechBusiness.company.legalName,
    privacyPolicy: "/privacy",
    termsOfService: "/terms",
    trademark: "BADGRTechnologies and the BADGR logo are trademarks of BADGRTechnologies LLC."
  },
  
  contact: {
    email: badgrTechBusiness.contact.email.primary,
    phone: badgrTechBusiness.contact.phone.primary,
    address: badgrTechBusiness.contact.address.full
  }
};
UPDATEDFOOTER

# Update index.html with proper business meta data
create_file "index.html" <<'UPDATEDHTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="BADGRTechnologies LLC - Full-stack web development and strategic digital solutions for ambitious small businesses. CTRL+ALT+Deliver." />
    <meta name="keywords" content="web development atlanta, full-stack developer, react typescript, small business websites, digital strategy, badgr technologies" />
    <meta name="author" content="BADGRTechnologies LLC" />
    <meta name="robots" content="index, follow" />
    
    <title>BADGRTechnologies LLC - CTRL+ALT+Deliver | Atlanta Web Development</title>
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="BADGRTechnologies LLC - Full-Stack Web Development" />
    <meta property="og:description" content="CTRL+ALT+Deliver - Full-stack solutions that transform small business potential into digital success." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://badgrtech.com" />
    <meta property="og:image" content="https://badgrtech.com/images/logo/logo-blk-wht2.svg" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="BADGRTechnologies LLC" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="BADGRTechnologies LLC - CTRL+ALT+Deliver" />
    <meta name="twitter:description" content="Full-stack solutions that transform small business potential into digital success." />
    <meta name="twitter:image" content="https://badgrtech.com/images/hero/hero-atlanta-skyline.webp" />
    <meta name="twitter:creator" content="@Badgr1stOne" />
    
    <!-- Business Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "BADGRTechnologies LLC",
      "image": "https://badgrtech.com/images/logo/logo-blk-wht2.svg",
      "description": "Full-stack web development and strategic digital solutions for small businesses",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "8735 Dunwoody Place, Suite N",
        "addressLocality": "Atlanta",
        "addressRegion": "GA",
        "postalCode": "30350",
        "addressCountry": "US"
      },
      "telephone": "+1-404-423-5493",
      "email": "hello@badgrtech.com",
      "url": "https://badgrtech.com",
      "openingHours": "Mo-Fr 08:30-17:30",
      "sameAs": [
        "https://x.com/Badgr1stOne",
        "https://instagram.com/Badgr1stOne", 
        "https://www.linkedin.com/in/anthony-g-5b2b1a273",
        "https://github.com/Ch405-L9"
      ],
      "founder": {
        "@type": "Person",
        "name": "Anthony Grant",
        "jobTitle": "Founder & Lead Developer"
      }
    }
    </script>
    
    <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg" />
    <link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png" />
    <link rel="canonical" href="https://badgrtech.com" />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="/images/hero/hero-atlanta-skyline.webp" as="image" type="image/webp">
    <link rel="preload" href="/images/logo/logo-blk-wht2.svg" as="image" type="image/svg+xml">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
UPDATEDHTML

# Create asset verification script
create_file "scripts/verify-assets.sh" <<'ASSETVERIFY'
#!/bin/bash
# Asset verification script for BADGRTechnologies integration

echo "Verifying BADGRTech asset structure..."

REQUIRED_ASSETS=(
    "public/images/logo/logo-blk-wht2.svg"
    "public/images/hero/hero-atlanta-skyline.webp"
    "public/images/services/service-web-devdes.webp"
    "public/images/services/service-brand.webp"
    "public/images/services/service-content-edit.webp"
    "public/images/team/about-owner.webp"
    "public/images/icons/favicon.svg"
)

MISSING_ASSETS=()
FOUND_ASSETS=()

for asset in "${REQUIRED_ASSETS[@]}"; do
    if [[ -f "$asset" ]]; then
        FOUND_ASSETS+=("$asset")
        echo "✓ Found: $asset"
    else
        MISSING_ASSETS+=("$asset")
        echo "✗ Missing: $asset"
    fi
done

echo ""
echo "Asset Status Summary:"
echo "Found: ${#FOUND_ASSETS[@]} assets"
echo "Missing: ${#MISSING_ASSETS[@]} assets"

if [[ ${#MISSING_ASSETS[@]} -gt 0 ]]; then
    echo ""
    echo "Please add the missing assets to continue with Phase D1 styling."
    exit 1
else
    echo ""
    echo "✅ All required assets found! Ready for Phase D1."
    exit 0
fi
ASSETVERIFY

chmod +x scripts/verify-assets.sh

log ""
log "🎉 Phase D Complete: BADGRTechnologies Business Integration!"
log ""
log "📄 New Configuration Files:"
log "  • src/config/business.ts - Complete business data"
log "  • Updated src/config/site.ts - Main site with BADGR data"
log "  • Updated src/config/services.ts - Real service offerings"
log "  • Updated src/config/about.ts - Founder biography"
log "  • Updated src/config/contact.ts - Atlanta contact info"
log "  • Updated src/config/footer.ts - Social media links"
log "  • Updated index.html - SEO and schema markup"
log ""
log "📋 Business Data Integrated:"
log "  ✓ BADGRTechnologies LLC company information"
log "  ✓ Atlanta address and contact details" 
log "  ✓ Real social media accounts"
log "  ✓ Professional service descriptions"
log "  ✓ Founder biography and credentials"
log "  ✓ Asset paths mapped to your file structure"
log ""
log "🔍 Asset Verification:"
log "  Run: ./scripts/verify-assets.sh"
log "  This checks if all required images are in place"
log ""
log "🚀 Next Steps:"
log "  1. Verify your assets with the verification script"
log "  2. Run Phase D1 for visual styling and branding"
log "  3. Test the integrated business data"
log ""
log "📧 Email Integration Ready:"
log "  • Contact forms → hello@badgrtech.com"
log "  • Support links → support@badgrtech.com"
log "  • All CTAs properly configured"