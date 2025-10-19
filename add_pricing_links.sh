#!/usr/bin/env bash
# add_pricing_links.sh - Integrate pricing page into BADGR site
set -euo pipefail

cd ~/BADGR-97_production

echo "🔍 Finding hero section..."

# Find the file with hero section
HERO_FILE=$(grep -rl "Transform Your Digital Presence" src/ | head -1)

if [[ -z "$HERO_FILE" ]]; then
    echo "❌ Hero section not found. Checking common locations..."
    for file in src/App.tsx src/main.tsx src/components/Sections.tsx; do
        if [[ -f "$file" ]]; then
            echo "  Found: $file"
        fi
    done
    exit 1
fi

echo "✅ Hero found in: $HERO_FILE"

# ═══════════════════════════════════════════════════════════
# STEP 1: Add pricing button to hero CTAs
# ═══════════════════════════════════════════════════════════
echo "1. Adding pricing button to hero..."

# Find the "View Our Services" button and add pricing button after it
sed -i.bak '/#services/a\
              <a\
                href="/pricing"\
                className="btn text-lg px-8 py-4 font-semibold transition-all duration-200 transform hover:scale-105 btn-secondary shadow-lg"\
              >\
                View Pricing\
              </a>' "$HERO_FILE"

echo "  ✓ Hero button added"

# ═══════════════════════════════════════════════════════════
# STEP 2: Add to Header navigation
# ═══════════════════════════════════════════════════════════
echo "2. Adding to Header navigation..."

HEADER_FILE="src/components/Header.tsx"

if [[ -f "$HEADER_FILE" ]]; then
    # Add after Services link
    sed -i.bak '/href="#services"/a\
            <a\
              href="/pricing"\
              className="text-white hover:text-blue-400 transition-colors"\
            >\
              Pricing\
            </a>' "$HEADER_FILE"
    echo "  ✓ Header link added"
else
    echo "  ⚠️  Header.tsx not found, skipping"
fi

# ═══════════════════════════════════════════════════════════
# STEP 3: Add route to App.tsx
# ═══════════════════════════════════════════════════════════
echo "3. Adding route to App.tsx..."

APP_FILE="src/App.tsx"

# Add import at top
if ! grep -q "PricingTiers" "$APP_FILE"; then
    sed -i.bak '/^import/a\
import PricingTiers from "./components/PricingTiers";' "$APP_FILE"
fi

# Add route (find existing Routes and add before closing tag)
if ! grep -q 'path="/pricing"' "$APP_FILE"; then
    sed -i.bak '/<\/Routes>/i\
          <Route path="/pricing" element={<PricingTiers />} />' "$APP_FILE"
fi

echo "  ✓ Route added"

# ═══════════════════════════════════════════════════════════
# STEP 4: Create PricingTiers component if not exists
# ═══════════════════════════════════════════════════════════
PRICING_FILE="src/components/PricingTiers.tsx"

if [[ ! -f "$PRICING_FILE" ]]; then
    echo "4. Creating PricingTiers.tsx..."
    echo "⚠️  Copy the artifact component to $PRICING_FILE"
else
    echo "4. PricingTiers.tsx already exists ✓"
fi

# ═══════════════════════════════════════════════════════════
# CLEANUP & SUMMARY
# ═══════════════════════════════════════════════════════════
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              PRICING INTEGRATION COMPLETE              ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "CHANGES MADE:"
echo "  ✓ Hero button: $HERO_FILE"
echo "  ✓ Header link: $HEADER_FILE"
echo "  ✓ App route: $APP_FILE"
echo ""
echo "NEXT STEPS:"
echo "  1. Copy PricingTiers component to: $PRICING_FILE"
echo "  2. npm run dev"
echo "  3. Visit http://localhost:3000/pricing"
echo ""
echo "BACKUP FILES (if needed):"
find src/ -name "*.bak" -type f
echo ""
