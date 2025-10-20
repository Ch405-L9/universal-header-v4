#!/usr/bin/env bash
# cleanup_unused_images.sh - Remove ALL local images and unused Cloudinary references
# ONLY keeps the 13 Cloudinary URLs provided
set -euo pipefail

PROJECT_ROOT="${1:-.}"
DRY_RUN="${2:-false}"

log() { echo "[CLEANUP] $*"; }
fail() { echo "ERROR: $*" >&2; exit 1; }

cd "$PROJECT_ROOT" || fail "Project root not found"

# The ONLY 13 valid Cloudinary URLs
declare -A VALID_IMAGES=(
    ["icon-192"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303872/icon-192_h9ql8e.webp"
    ["icon-512"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303879/icon-512_udn8tu.webp"
    ["apple-touch-icon"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303878/apple-touch-icon_rlfp4f.png"
    ["favicon"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303879/favicon_ahsbt3.svg"
    ["mail-black"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303873/mail-black_hotspn.svg"
    ["phone-black"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303872/phone-black_savvd1.svg"
    ["alt_burgercon"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303872/alt_burgercon_qrtt7b.svg"
    ["facebook"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303874/facebook_qgd1g2.svg"
    ["github"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303878/github_rnlaje.svg"
    ["linkedin"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303880/linkedin_unfywa.svg"
    ["x"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303883/x_wymoub.svg"
    ["instagram"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303884/instagram_yu5k4p.svg"
    ["shop-atl-local"]="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303873/shop-atl-local_yisbcq.svg"
)

log "🧹 Starting image cleanup - ONLY 13 Cloudinary URLs will remain"
log ""

# Step 1: Remove ALL local images
if [[ -d "public/images" ]]; then
    log "📂 Removing public/images/ directory..."
    if [[ "$DRY_RUN" == "false" ]]; then
        rm -rf public/images/
        log "   ✅ Deleted public/images/"
    else
        log "   [DRY-RUN] Would delete public/images/"
    fi
fi

if [[ -d "src/assets/images" ]]; then
    log "📂 Removing src/assets/images/ directory..."
    if [[ "$DRY_RUN" == "false" ]]; then
        rm -rf src/assets/images/
        log "   ✅ Deleted src/assets/images/"
    else
        log "   [DRY-RUN] Would delete src/assets/images/"
    fi
fi

# Step 2: Update index.html with ONLY valid icon URLs
log "📝 Updating index.html..."
if [[ "$DRY_RUN" == "false" ]]; then
    sed -i.bak \
        -e "s|<link rel=\"icon\".*>|<link rel=\"icon\" type=\"image/svg+xml\" href=\"${VALID_IMAGES[favicon]}\">|" \
        -e "s|<link rel=\"apple-touch-icon\".*>|<link rel=\"apple-touch-icon\" href=\"${VALID_IMAGES[apple-touch-icon]}\">|" \
        index.html
    rm -f index.html.bak
    log "   ✅ Updated index.html"
else
    log "   [DRY-RUN] Would update index.html"
fi

# Step 3: Update business.ts to remove non-existent image references
log "📝 Cleaning src/config/business.ts..."
if [[ -f "src/config/business.ts" ]]; then
    if [[ "$DRY_RUN" == "false" ]]; then
        cat > src/config/business.ts << 'BUSINESSCONFIG'
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
      weekends: "Client calls only - leave message"
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
    icons: {
      favicon: "FAVICON_URL",
      apple: "APPLE_URL",
      burger: "BURGER_URL",
      mail: "MAIL_URL",
      phone: "PHONE_URL",
      facebook: "FACEBOOK_URL",
      github: "GITHUB_URL",
      instagram: "INSTAGRAM_URL",
      linkedin: "LINKEDIN_URL",
      x: "X_URL",
      shopLocal: "SHOP_URL",
      icon192: "ICON192_URL",
      icon512: "ICON512_URL"
    }
  },

  branding: {
    taglines: {
      primary: "CTRL+ALT+Deliver",
      extended: "Full-stack solutions that transform small business potential into digital success"
    },
    
    colors: {
      primary: "#0066CC",
      secondary: "#1f2937", 
      accent: "#10b981",
      white: "#FFFFFF",
      black: "#000000"
    }
  }
};
BUSINESSCONFIG

        # Replace placeholders with actual Cloudinary URLs
        for key in "${!VALID_IMAGES[@]}"; do
            case "$key" in
                "icon-192") sed -i "s|ICON192_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "icon-512") sed -i "s|ICON512_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "apple-touch-icon") sed -i "s|APPLE_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "favicon") sed -i "s|FAVICON_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "mail-black") sed -i "s|MAIL_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "phone-black") sed -i "s|PHONE_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "alt_burgercon") sed -i "s|BURGER_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "facebook") sed -i "s|FACEBOOK_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "github") sed -i "s|GITHUB_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "linkedin") sed -i "s|LINKEDIN_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "x") sed -i "s|X_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "instagram") sed -i "s|INSTAGRAM_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
                "shop-atl-local") sed -i "s|SHOP_URL|${VALID_IMAGES[$key]}|g" src/config/business.ts ;;
            esac
        done
        
        log "   ✅ Cleaned business.ts"
    else
        log "   [DRY-RUN] Would clean business.ts"
    fi
fi

# Step 4: Remove service images from services.ts
log "📝 Removing service images from src/config/services.ts..."
if [[ -f "src/config/services.ts" && "$DRY_RUN" == "false" ]]; then
    sed -i.bak '/image:/d' src/config/services.ts
    rm -f src/config/services.ts.bak
    log "   ✅ Removed service image references"
fi

# Step 5: Search for ANY remaining local image references
log "🔍 Scanning for remaining local image references..."
FOUND_ISSUES=0

while IFS= read -r file; do
    if grep -q "/images/" "$file" 2>/dev/null; then
        log "   ⚠️  Found local image reference in: $file"
        grep -n "/images/" "$file" | head -3
        ((FOUND_ISSUES++))
    fi
done < <(find src -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null)

log ""
log "✅ Cleanup Summary:"
log "   • Removed public/images/ directory"
log "   • Updated index.html with Cloudinary icons"
log "   • Cleaned business.ts icon URLs"
log "   • Removed service image references"
if [[ $FOUND_ISSUES -gt 0 ]]; then
    log "   ⚠️  Found $FOUND_ISSUES files with remaining /images/ references"
    log "   Run: grep -r '/images/' src/ to find them"
else
    log "   ✅ No remaining local image references found"
fi

log ""
log "🎯 VERIFICATION STEPS:"
log "   1. Run: npm run build"
log "   2. Check: ls -R dist/assets/ | grep -E '\\.(png|jpg|jpeg|svg|webp)$'"
log "   3. Should return: NOTHING (zero local images)"
log "   4. Run: npm run dev"
log "   5. Check browser console for 404 errors"
