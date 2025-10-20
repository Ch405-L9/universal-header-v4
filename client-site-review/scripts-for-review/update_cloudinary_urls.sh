#!/usr/bin/env bash
# update_cloudinary_images.sh - Replace all local image paths with Cloudinary URLs
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4 || exit 1

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         UPDATING CLOUDINARY IMAGE URLS                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Backup files before modification
echo "Creating backups..."
find src -name "*.ts" -o -name "*.tsx" | while read -r file; do
    cp "$file" "$file.cloudinary-backup"
done
echo "✓ Backups created with .cloudinary-backup extension"
echo ""

# ============================================================================
# Update business.ts with all Cloudinary URLs
# ============================================================================
echo "Updating src/config/business.ts..."

cat > src/config/business.ts << 'EOF'
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
      primary: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234586/emblem-badgrWHT_qfkmlj.svg",
      black: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234585/emblem-badgrBLK_peihbp.svg",
      favicon: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234565/favicon_tmmdih.svg"
    },
    hero: {
      background: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234530/hero-atlsky00_dx2vcn.webp",
      fallback: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234530/hero-atlsky00_dx2vcn.webp"
    },
    services: {
      webDevelopment: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234395/service-web-devdes_ue2thl.webp",
      branding: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234396/service-brand_fohuae.webp",
      content: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234395/service-content-edit_rqtyde.webp"
    },
    team: {
      owner: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234382/about-owner_czikii.webp"
    },
    icons: {
      burger: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234559/alt_burgercon_zevjo9.svg",
      apple: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234560/apple-touch-icon_zmdezp.png",
      calendar: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234562/calendar-black_akpsez.svg",
      copyright: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234581/copyright_pjb1gh.svg",
      dev: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234563/dev-icon_pt_hofyfq.svg",
      facebook: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234564/facebook_bvsyvr.svg",
      github: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234566/github_pqfeui.svg",
      instagram: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234570/instagram_flml59.svg",
      linkedin: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234571/linkedin_kgxqok.svg",
      mail: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234572/mail-black_xmx2jv.svg",
      npm: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234573/npm_cxscoi.svg",
      phone: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234574/phone-black_n6uofz.svg",
      react: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234575/react_nsgm17.svg",
      registered: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234576/registered_sh3dfu.svg",
      shopLocal: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234577/shop-atl-local_hohikj.svg",
      tailwind: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234578/tailwindcss_xpkj6e.svg",
      under: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234579/undr-cnstrct_vbet2s.svg",
      x: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234580/x_qsvqty.svg",
      badge: "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234561/badge-achievements_kxp7zt.svg"
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
EOF

echo "✓ business.ts updated"

# ============================================================================
# Update index.html with Cloudinary favicon and icons
# ============================================================================
echo "Updating index.html..."

cat > index.html << 'EOF'
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
    <meta property="og:image" content="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234586/emblem-badgrWHT_qfkmlj.svg" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="BADGRTechnologies LLC" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="BADGRTechnologies LLC - CTRL+ALT+Deliver" />
    <meta name="twitter:description" content="Full-stack solutions that transform small business potential into digital success." />
    <meta name="twitter:image" content="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234530/hero-atlsky00_dx2vcn.webp" />
    <meta name="twitter:creator" content="@Badgr1stOne" />
    
    <!-- Favicon and Icons (Cloudinary) -->
    <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234565/favicon_tmmdih.svg" />
    <link rel="apple-touch-icon" href="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234560/apple-touch-icon_zmdezp.png" />
    <link rel="canonical" href="https://badgrtech.com" />
    
    <!-- Business Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "BADGRTechnologies LLC",
      "image": "https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234586/emblem-badgrWHT_qfkmlj.svg",
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
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Preload critical Cloudinary assets -->
    <link rel="preload" href="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234530/hero-atlsky00_dx2vcn.webp" as="image" type="image/webp">
    <link rel="preload" href="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234586/emblem-badgrWHT_qfkmlj.svg" as="image" type="image/svg+xml">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

echo "✓ index.html updated"

# ============================================================================
# Update CSS with Cloudinary hero image
# ============================================================================
echo "Updating hero background in CSS..."

sed -i 's|url('\''/images/hero/hero-atlanta-skyline.webp'\'')|url('\''https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759234530/hero-atlsky00_dx2vcn.webp'\'')|g' src/styles/index.css

echo "✓ CSS hero background updated"

# ============================================================================
# Verify changes
# ============================================================================
echo ""
echo "Verifying Cloudinary URLs..."

CLOUDINARY_COUNT=$(grep -r "cloudinary.com" src/ | wc -l)
echo "✓ Found $CLOUDINARY_COUNT Cloudinary references in source files"

# ============================================================================
# Test build
# ============================================================================
echo ""
echo "Testing production build..."

if npm run build > /dev/null 2>&1; then
    echo "✓ Build successful with Cloudinary URLs"
else
    echo "⚠ Build failed - check errors above"
    exit 1
fi

# ============================================================================
# Summary
# ============================================================================
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ CLOUDINARY INTEGRATION COMPLETE                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Images now hosted on Cloudinary CDN:"
echo "  • Hero background: hero-atlsky00_dx2vcn.webp"
echo "  • Logos: emblem-badgrWHT & emblem-badgrBLK"
echo "  • Service images: 3 images"
echo "  • Team photo: about-owner_czikii.webp"
echo "  • Icons: 20+ SVG/PNG icons"
echo ""
echo "Benefits:"
echo "  ✓ Global CDN (faster load times)"
echo "  ✓ Auto-optimization (WebP conversion)"
echo "  ✓ 25GB free bandwidth/month"
echo "  ✓ No local image dependencies"
echo ""
echo "Backups saved with .cloudinary-backup extension"
echo ""
echo "Next steps:"
echo "  1. npm run dev (test locally)"
echo "  2. ./pre_launch_compliance_tests.sh"
echo "  3. ./run_lighthouse_audit.sh"
echo "  4. Deploy to production"
echo ""