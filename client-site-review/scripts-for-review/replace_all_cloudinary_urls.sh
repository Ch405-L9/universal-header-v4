#!/usr/bin/env bash
# replace_all_cloudinary_urls.sh - One-shot clean URL replacement
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

echo "Replacing ALL Cloudinary URLs with new optimized images..."

# ═══════════════════════════════════════════════════════════════════
# HERO
# ═══════════════════════════════════════════════════════════════════
HERO="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303867/hero-home_adn16x.webp"

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" \) \
  -not -path "./node_modules/*" -not -path "./dist/*" \
  -exec sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"'[:space:])]*/hero[^\"'[:space:])]*|$HERO|g" {} +

echo "✓ Hero replaced"

# ═══════════════════════════════════════════════════════════════════
# SERVICES
# ═══════════════════════════════════════════════════════════════════
FSDEV="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303867/fsdev_vlnfbl.webp"
EDITING="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303868/editing_gv2wii.webp"
BRAND="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303868/brand_fwkcqc.webp"

# Replace service-web-devdes with fsdev
sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*/service-web-devdes[^\"']*|$FSDEV|g" src/config/business.ts src/config/services.ts

# Replace service-content-edit with editing
sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*/service-content-edit[^\"']*|$EDITING|g" src/config/business.ts src/config/services.ts

# Replace service-brand with brand
sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*/service-brand[^\"']*|$BRAND|g" src/config/business.ts src/config/services.ts

echo "✓ Services replaced"

# ═══════════════════════════════════════════════════════════════════
# TEAM
# ═══════════════════════════════════════════════════════════════════
OWNER="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303867/owner_ahptp3.webp"

sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*/about-owner[^\"']*|$OWNER|g" src/config/business.ts
sed -i "s|owner: \"https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*\"|owner: \"$OWNER\"|g" src/config/business.ts

echo "✓ Team replaced"

# ═══════════════════════════════════════════════════════════════════
# LOGO (use existing emblem-badgrWHT)
# ═══════════════════════════════════════════════════════════════════
# Keep existing logo URLs - they're working fine

# ═══════════════════════════════════════════════════════════════════
# ICONS (only update the ones you uploaded)
# ═══════════════════════════════════════════════════════════════════
FAVICON="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303879/favicon_ahsbt3.svg"
APPLE="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303878/apple-touch-icon_rlfp4f.png"

sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*/favicon[^\"']*|$FAVICON|g" src/config/business.ts index.html
sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*/apple-touch-icon[^\"']*|$APPLE|g" src/config/business.ts index.html

echo "✓ Icons replaced"

# ═══════════════════════════════════════════════════════════════════
# VERIFY & BUILD
# ═══════════════════════════════════════════════════════════════════
echo ""
echo "Verifying new URLs are accessible..."

for url in "$HERO" "$FSDEV" "$EDITING" "$BRAND" "$OWNER"; do
  if curl -sf -o /dev/null -I "$url"; then
    echo "✓ $(basename "$url")"
  else
    echo "✗ FAILED: $url"
  fi
done

echo ""
echo "Building..."
npm run build

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              URL REPLACEMENT COMPLETE                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Test the site:"
echo "  npm run preview"
echo "  Open: http://localhost:4173"
echo ""
echo "If hero image loads, run:"
echo "  ./run_lighthouse_audit.sh"
