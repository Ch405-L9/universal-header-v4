#!/usr/bin/env bash
# nuclear_hero_cleanup.sh - Find and eliminate ALL hero image references
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

NEW_HERO="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759306748/N_hero-home_vcbugo.webp"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         NUCLEAR HERO CLEANUP - FIND ALL REFERENCES          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Find ALL hero-related URLs (any variant)
echo "1. Finding ALL hero image references..."
grep -rn "hero.*\.webp\|hero.*\.jpg\|hero.*\.png\|hero.*\.avif" \
  --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" \
  --exclude-dir=node_modules --exclude-dir=dist . | grep cloudinary

echo ""
echo "---"
echo ""

# 2. Find inline styles with hero
echo "2. Finding inline <style> tags with hero..."
grep -n "<style>" index.html

echo ""
echo "---"
echo ""

# 3. Count duplicates in index.html
echo "3. Checking for duplicate CSS in index.html..."
grep -c "hero-critical" index.html || echo "Not found"

echo ""
echo "---"
echo ""

# 4. Replace EVERYTHING with new hero
echo "4. Replacing ALL hero URLs with: $NEW_HERO"

# Replace in TypeScript/TSX files
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^\"']*hero[^\"']*\.\(webp\|jpg\|png\|avif\)|$NEW_HERO|g" {} +

# Replace in HTML
sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^)]*hero[^)]*\.\(webp\|jpg\|png\|avif\)|$NEW_HERO|g" index.html

# Replace in CSS
sed -i "s|https://res\.cloudinary\.com/dsxpcwjwb/image/upload/[^)]*hero[^)]*\.\(webp\|jpg\|png\|avif\)|$NEW_HERO|g" src/styles/index.css

echo "✓ Replaced"

# 5. Remove duplicate inline styles in index.html
echo ""
echo "5. Removing duplicate <style> tags..."
awk '/<style>.*hero-critical/ && ++count > 1 {next} 1' index.html > index.html.tmp
mv index.html.tmp index.html

echo "✓ Duplicates removed"

# 6. Verify ONLY new hero exists
echo ""
echo "6. Verification - should ONLY show new hero URL..."
grep -r "cloudinary.*hero" --include="*.ts" --include="*.tsx" --include="*.html" --include="*.css" \
  --exclude-dir=node_modules --exclude-dir=dist . | grep -v "N_hero-home_vcbugo" || echo "✓ Clean - only new hero found"

echo ""
echo "7. Clean build artifacts..."
rm -rf dist node_modules/.vite

echo ""
echo "8. Building fresh..."
npm run build

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    CLEANUP COMPLETE                         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Hero image now: $NEW_HERO"
echo "Size check:"
curl -sI "$NEW_HERO" | grep -E "content-length|HTTP"
echo ""
echo "Start preview:"
echo "  npm run preview"
