#!/usr/bin/env bash
# nuclear_cache_purge.sh - Scorched earth cache cleanup
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           NUCLEAR CACHE PURGE - SCORCHED EARTH              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Kill all Node/Vite processes
echo "1. Killing Node/Vite processes..."
pkill -f vite || true
pkill -f node || true
sleep 2
echo "✓ Processes killed"

# 2. Delete Vite cache
echo "2. Purging Vite cache..."
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist
echo "✓ Vite cache cleared"

# 3. Delete build artifacts
echo "3. Removing build artifacts..."
rm -rf dist-ssr
rm -rf .cache
rm -rf .parcel-cache
echo "✓ Build artifacts removed"

# 4. Clear npm cache
echo "4. Clearing npm cache..."
npm cache clean --force
echo "✓ npm cache cleared"

# 5. Delete TypeScript build info
echo "5. Clearing TypeScript cache..."
find . -name "*.tsbuildinfo" -delete
echo "✓ TypeScript cache cleared"

# 6. Reinstall dependencies fresh
echo "6. Reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install
echo "✓ Dependencies reinstalled"

# 7. Build fresh
echo "7. Building fresh production version..."
npm run build
echo "✓ Fresh build complete"

# 8. Check build size
echo ""
echo "Build size report:"
du -sh dist/
ls -lh dist/assets/*.js | head -5

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    CACHE PURGE COMPLETE                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Now test with production server:"
echo "  npm run preview"
echo ""
echo "In new terminal, audit the PREVIEW server (not dev):"
echo "  ./run_lighthouse_audit.sh"
echo ""
echo "CRITICAL: Make sure Lighthouse tests http://localhost:4173 (preview)"
echo "NOT http://localhost:3000 (dev server with caching issues)"
