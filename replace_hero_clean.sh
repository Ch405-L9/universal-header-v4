#!/usr/bin/env bash
# replace_hero_clean.sh - Replace all old hero URLs with AVIF version
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

NEW_AVIF="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759259236/hero-atlsky00_dx2vcn_f5jp6i_fiktqm.avif"

echo "Replacing ALL hero image URLs with AVIF..."

# Find and replace ALL variants of hero URLs
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" \) \
  -not -path "./node_modules/*" \
  -not -path "./dist/*" \
  -exec sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"'[:space:]]*hero-atlsky00[^\"'[:space:]]*\.\(webp\|avif\|jpg\|png\)|$NEW_AVIF|g" {} +

echo "✓ All hero URLs replaced"

# Verify replacement
echo ""
echo "Files updated:"
grep -r "v1759259236" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" . 2>/dev/null | grep -v node_modules | cut -d: -f1 | sort -u

# Check for stragglers
echo ""
OLD_COUNT=$(grep -r "hero-atlsky00" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" . 2>/dev/null | grep -v "v1759259236" | grep -v node_modules | wc -l)

if [[ $OLD_COUNT -eq 0 ]]; then
  echo "✓ Clean replacement - no old URLs remain"
else
  echo "⚠ Found $OLD_COUNT old hero URLs:"
  grep -r "hero-atlsky00" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" . 2>/dev/null | grep -v "v1759259236" | grep -v node_modules
fi

echo ""
echo "Rebuilding with AVIF hero (100KB)..."
npm run build

echo ""
echo "Build complete. Next:"
echo "  npm run preview"
echo "  ./run_lighthouse_audit.sh"

