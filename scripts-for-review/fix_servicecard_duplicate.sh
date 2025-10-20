#!/usr/bin/env bash
# fix_servicecard_duplicate.sh - Remove duplicate lazy loading attributes
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

echo "Fixing ServiceCard.tsx duplicate attributes..."

# Remove ALL existing lazy/decoding attributes first
sed -i 's/ loading="lazy"//g' src/components/ServiceCard.tsx
sed -i 's/ decoding="async"//g' src/components/ServiceCard.tsx

# Add them back once in the correct location
sed -i 's/<img $/<img loading="lazy" decoding="async" /' src/components/ServiceCard.tsx
sed -i 's/<img src=/<img loading="lazy" decoding="async" src=/' src/components/ServiceCard.tsx
sed -i 's/<img $$/<img loading="lazy" decoding="async" /' src/components/ServiceCard.tsx

echo "✓ Duplicate attributes removed"
echo ""
echo "Rebuilding..."
npm run build
