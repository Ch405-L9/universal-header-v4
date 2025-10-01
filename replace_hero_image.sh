#!/usr/bin/env bash
# replace_hero_image.sh - Update to new optimized hero URL
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

NEW_HERO="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759258729/hero-atlsky00_dx2vcn_f5jp6i_oujguy.webp"

echo "Replacing hero image URLs with optimized version..."

# Find and replace ALL occurrences of old hero URLs
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" \) \
  -exec sed -i "s|https://res.cloudinary.com/dsxpcwjwb/image/upload/[^\"']*hero-atlsky00_dx2vcn[^\"']*\.webp|$NEW_HERO|g" {} +

echo "✓ All hero URLs replaced"

# Verify replacements
echo ""
echo "Files updated:"
grep -r "$NEW_HERO" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" . | cut -d: -f1 | sort -u

echo ""
echo "Checking for any remaining old URLs..."
OLD_COUNT=$(grep -r "hero-atlsky00_dx2vcn" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" . 2>/dev/null | grep -v "v1759258729" | wc -l)

if [[ $OLD_COUNT -eq 0 ]]; then
  echo "✓ No old URLs found - clean replacement"
else
  echo "⚠ Found $OLD_COUNT old URLs still present:"
  grep -r "hero-atlsky00_dx2vcn" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" . | grep -v "v1759258729"
fi

echo ""
echo "Build and test:"
echo "  npm run build"
echo "  ./run_lighthouse_audit.sh"
