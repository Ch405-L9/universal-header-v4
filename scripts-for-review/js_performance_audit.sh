#!/usr/bin/env bash
# js_performance_audit.sh - Diagnose JavaScript bottlenecks
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         JAVASCRIPT PERFORMANCE DIAGNOSTIC REPORT            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Analyze production bundle size
echo "1. Bundle Size Analysis..."
npm run build > /dev/null 2>&1

echo ""
echo "JavaScript Chunks:"
ls -lh dist/assets/*.js 2>/dev/null | awk '{printf "  %s  %s\n", $5, $9}'

TOTAL_JS=$(find dist/assets -name "*.js" -exec cat {} + | wc -c)
TOTAL_JS_KB=$((TOTAL_JS / 1024))
echo ""
echo "Total JS: ${TOTAL_JS_KB}KB"

if [[ $TOTAL_JS_KB -gt 500 ]]; then
  echo "⚠ JS bundle > 500KB - needs optimization"
else
  echo "✓ JS bundle reasonable"
fi

# 2. Check for source maps in production
echo ""
echo "2. Source Map Check..."
if ls dist/assets/*.js.map >/dev/null 2>&1; then
  echo "⚠ Source maps in production build (bloat)"
  echo "  Fix: Set sourcemap: false in vite.config.ts"
else
  echo "✓ No source maps"
fi

# 3. Identify heavy dependencies
echo ""
echo "3. Heavy Dependencies (from package.json):"
npm list --depth=0 2>/dev/null | grep -E "react-router-dom|lucide-react|radix" | head -5

# 4. Check for lazy loading
echo ""
echo "4. Lazy Loading Check..."
if grep -r "React.lazy\|lazy()" src/ >/dev/null 2>&1; then
  echo "✓ Code splitting detected"
else
  echo "⚠ No lazy loading - all components load upfront"
  echo "  Fix: Implement React.lazy() for routes"
fi

# 5. Check for layout shift causes
echo ""
echo "5. Layout Shift Risk Analysis..."
SHIFT_RISKS=()

if ! grep -r "width.*height" src/components/ServiceCard.tsx >/dev/null 2>&1; then
  SHIFT_RISKS+=("ServiceCard images missing width/height")
fi

if ! grep -r "aspect-ratio" src/styles/index.css >/dev/null 2>&1; then
  SHIFT_RISKS+=("No aspect-ratio utilities in CSS")
fi

if [[ ${#SHIFT_RISKS[@]} -eq 0 ]]; then
  echo "✓ No obvious shift risks"
else
  echo "⚠ Layout shift risks found:"
  printf '  • %s\n' "${SHIFT_RISKS[@]}"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                  DIAGNOSTIC COMPLETE                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
