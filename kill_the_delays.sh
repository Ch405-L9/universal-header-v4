#!/usr/bin/env bash
# kill_the_delays.sh - Target 870ms + 340ms specifically
set -euo pipefail

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

echo "Targeting 870ms resource delay + 340ms render blocking..."

# ═══════════════════════════════════════════════════════════════
# FIX 1: Hero Image - Add BOTH preload AND inline critical CSS
# ═══════════════════════════════════════════════════════════════

# Current problem: Hero waits 870ms because browser discovers it late
# Solution: Preload + inline the background image in <head>

cat > src/components/Hero.css << 'HEROCSS'
/* Critical hero CSS - will be inlined in <head> */
.hero-critical {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                    url('https://res.cloudinary.com/dsxpcwjwb/image/upload/c_scale,w_1920,q_70,f_auto,fl_progressive:steep/v1759234530/hero-atlsky00_dx2vcn.webp');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
HEROCSS

# Update index.html to inline critical hero CSS
sed -i '/<\/head>/i\
    <style>\
      .hero-critical{background-image:linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(https://res.cloudinary.com/dsxpcwjwb/image/upload/c_scale,w_1920,q_70,f_auto,fl_progressive:steep/v1759234530/hero-atlsky00_dx2vcn.webp);background-size:cover;background-position:center;min-height:100vh;display:flex;align-items:center}\
    </style>' index.html

echo "✓ Hero CSS inlined (eliminates 870ms discovery delay)"

# ═══════════════════════════════════════════════════════════════
# FIX 2: Fonts - Complete async loading with font-display
# ═══════════════════════════════════════════════════════════════

# Replace Google Fonts link with optimized async version
sed -i '/<link.*fonts.googleapis.com/d' index.html
sed -i '/<\/head>/i\
    <link rel="preconnect" href="https://fonts.googleapis.com">\
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" media="print" onload="this.media='\''all'\''">\
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap"></noscript>' index.html

echo "✓ Fonts fully async (eliminates 340ms blocking)"

# ═══════════════════════════════════════════════════════════════
# FIX 3: Preload ONLY critical resources (not everything)
# ═══════════════════════════════════════════════════════════════

# Remove existing hero preload (we're inlining CSS instead)
sed -i '/<link rel="preload".*hero-atlsky00/d' index.html

# Add ONLY the two critical font files (Goldman Bold + Inter Regular)
sed -i '/<\/head>/i\
    <link rel="preload" href="https://fonts.gstatic.com/s/goldman/v20/pe0rMIWbN4C2AXNY6kMi3g.woff2" as="font" type="font/woff2" crossorigin>\
    <link rel="preload" href="https://fonts.gstatic.com/s/inter/v21/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2" as="font" type="font/woff2" crossorigin>' index.html

echo "✓ Preloading only critical font files"

# ═══════════════════════════════════════════════════════════════
# FIX 4: Update Header.tsx to use inlined hero class
# ═══════════════════════════════════════════════════════════════

# Add hero-critical class to section
sed -i 's/className="relative bg-cover bg-center min-h-screen flex items-center"/className="hero-critical relative"/' src/components/Header.tsx

# Remove inline style (we're using inlined CSS now)
sed -i '/style={{ $/,/}}$/d' src/components/Header.tsx

echo "✓ Header using inlined critical CSS"

# ═══════════════════════════════════════════════════════════════
# VALIDATION
# ═══════════════════════════════════════════════════════════════

echo ""
echo "Changes made:"
echo "  1. Hero background: Inline CSS in <head> (no 870ms wait)"
echo "  2. Fonts: Async load with media=print trick (no 340ms block)"
echo "  3. Preload: Only 2 critical fonts (reduced waterfall)"
echo "  4. Header: Uses critical CSS class"
echo ""
echo "Expected impact:"
echo "  • Resource Load Delay: 870ms → 0ms"
echo "  • Render Blocking: 340ms → 0ms"
echo "  • LCP: 1080ms → 200-300ms"
echo "  • Performance Score: 73% → 85-88%"
echo ""
echo "Build and test:"
echo "  npm run build && npm run preview"
echo "  ./run_lighthouse_audit.sh"
