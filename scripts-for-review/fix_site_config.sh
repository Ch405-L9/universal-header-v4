#!/usr/bin/env bash
# fix_site_config.sh - Remove logo/hero references, use only 13 Cloudinary URLs
set -euo pipefail

PROJECT_ROOT="${1:-.}"
cd "$PROJECT_ROOT" || exit 1

log() { echo "[FIX-CONFIG] $*"; }

log "🔧 Fixing site.ts configuration..."

# Update site.ts to remove logo and hero references
cat > src/config/site.ts << 'SITECONFIG'
import { SiteConfig } from '@/types';
import { badgerTechServices } from './services';
import { badgrTechBusiness } from './business';

export const defaultSiteConfig: SiteConfig = {
  title: badgrTechBusiness.company.name,
  tagline: badgrTechBusiness.branding.taglines.primary,
  description: badgrTechBusiness.branding.taglines.extended,
  // NO LOGO - using text-based branding
  
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
    variant: "minimal", // Changed from banner - no background image
    // NO backgroundImage - solid gradient instead
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
SITECONFIG

log "✅ Updated site.ts (removed logo + hero image)"

# Update Header.tsx to use text logo instead of image
log "🔧 Updating Header.tsx to use text-based logo..."

if [[ -f "src/components/Header.tsx" ]]; then
    # Remove logo image code, keep text-based branding
    sed -i.bak '/{config\.logo &&/,/})/d' src/components/Header.tsx
    rm -f src/components/Header.tsx.bak
    log "✅ Header.tsx updated (text logo only)"
fi

# Remove all local images from public/
log "🧹 Removing ALL local images from public/..."
if [[ -d "public/images" ]]; then
    rm -rf public/images/
    log "✅ Deleted public/images/"
fi

if [[ -d "public/assets" ]]; then
    rm -rf public/assets/
    log "✅ Deleted public/assets/"
fi

# Remove logo.svg if it exists
if [[ -f "public/logo.svg" ]]; then
    rm -f public/logo.svg
    log "✅ Deleted public/logo.svg"
fi

# Clean manifest.json if it exists
if [[ -f "public/manifest.json" ]]; then
    cat > public/manifest.json << 'MANIFEST'
{
  "name": "BADGRTechnologies LLC",
  "short_name": "BADGRTech",
  "icons": [
    {
      "src": "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303872/icon-192_h9ql8e.webp",
      "sizes": "192x192",
      "type": "image/webp"
    },
    {
      "src": "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303879/icon-512_udn8tu.webp",
      "sizes": "512x512",
      "type": "image/webp"
    }
  ],
  "theme_color": "#0066CC",
  "background_color": "#FFFFFF",
  "display": "standalone"
}
MANIFEST
    log "✅ Updated manifest.json with Cloudinary icons"
fi

log ""
log "✅ Configuration fixes complete!"
log ""
log "🎯 Next Steps:"
log "   1. Run: npm run build"
log "   2. Check: find dist/ -type f \\( -name '*.png' -o -name '*.jpg' -o -name '*.svg' -o -name '*.webp' \\) | wc -l"
log "   3. Should show: 0"
