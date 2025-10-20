#!/usr/bin/env bash
# pre_launch_compliance_tests.sh - Battery of tests before going live
set -euo pipefail

APP_DIR="${1:-universal-header-v4}"
cd ~/"(a-d)setup-scripts-test"/"$APP_DIR" || exit 1

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         PRE-LAUNCH COMPLIANCE TEST BATTERY                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

PASS=0
FAIL=0
WARN=0

pass() { echo "✅ PASS: $1"; ((PASS++)); }
fail() { echo "❌ FAIL: $1"; ((FAIL++)); }
warn() { echo "⚠️  WARN: $1"; ((WARN++)); }

# ============================================================================
# TEST 1: Build Success
# ============================================================================
echo "TEST 1: Production Build"
echo "─────────────────────────────────────────────"

if npm run build > build.log 2>&1; then
    pass "Production build successful"
else
    fail "Build failed - check build.log"
    grep -i "error" build.log | head -5
fi

echo ""

# ============================================================================
# TEST 2: Critical Files Exist
# ============================================================================
echo "TEST 2: Critical Files Check"
echo "─────────────────────────────────────────────"

CRITICAL_FILES=(
    "src/App.tsx"
    "src/main.tsx"
    "src/components/Header.tsx"
    "src/components/Footer.tsx"
    "src/config/site.ts"
    "src/config/business.ts"
    "src/styles/index.css"
    "index.html"
    "package.json"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        pass "$file exists"
    else
        fail "$file missing"
    fi
done

echo ""

# ============================================================================
# TEST 3: Image Assets Check
# ============================================================================
echo "TEST 3: Image Assets Check"
echo "─────────────────────────────────────────────"

REQUIRED_IMAGES=(
    "public/images/logo/emblem-badgrWHT.svg"
    "public/images/logo/emblem-badgrBLK.svg"
)

for img in "${REQUIRED_IMAGES[@]}"; do
    if [[ -f "$img" ]]; then
        pass "Logo found: $img"
    else
        warn "Logo missing: $img"
    fi
done

# Check for hero image
if [[ -f "public/images/hero/hero-atlanta-skyline.webp" ]]; then
    pass "Hero image exists"
else
    warn "Hero image missing - upload to Cloudinary and update config"
fi

echo ""

# ============================================================================
# TEST 4: Environment Variables
# ============================================================================
echo "TEST 4: Environment Configuration"
echo "─────────────────────────────────────────────"

if [[ -f ".env.local" ]]; then
    pass ".env.local exists"
    
    # Check for required vars
    if grep -q "VITE_" .env.local; then
        pass "Vite environment variables present"
    else
        warn "No VITE_ prefixed variables found"
    fi
    
    if grep -q "STRIPE" .env.local; then
        pass "Stripe configuration present"
    else
        warn "Stripe configuration missing"
    fi
else
    fail ".env.local missing - create from .env.example"
fi

echo ""

# ============================================================================
# TEST 5: SEO & Meta Tags
# ============================================================================
echo "TEST 5: SEO & Meta Tags"
echo "─────────────────────────────────────────────"

if grep -q "og:title" index.html; then
    pass "Open Graph tags present"
else
    fail "Missing Open Graph meta tags"
fi

if grep -q "twitter:card" index.html; then
    pass "Twitter Card tags present"
else
    fail "Missing Twitter Card meta tags"
fi

if grep -q "description" index.html; then
    pass "Meta description present"
else
    fail "Missing meta description"
fi

echo ""

# ============================================================================
# TEST 6: Accessibility
# ============================================================================
echo "TEST 6: Accessibility Checks"
echo "─────────────────────────────────────────────"

if grep -q "aria-label" src/components/Header.tsx; then
    pass "ARIA labels found in Header"
else
    warn "Missing ARIA labels in Header"
fi

if grep -q "alt=" src/components/Header.tsx; then
    pass "Alt text on images"
else
    fail "Missing alt text on images"
fi

if grep -q "role=" src/components/Header.tsx; then
    pass "ARIA roles defined"
else
    warn "Missing ARIA roles"
fi

echo ""

# ============================================================================
# TEST 7: Performance Checks
# ============================================================================
echo "TEST 7: Performance Checks"
echo "─────────────────────────────────────────────"

# Check for large files in bundle
if [[ -d "dist" ]]; then
    LARGE_FILES=$(find dist -type f -size +500k 2>/dev/null || true)
    if [[ -z "$LARGE_FILES" ]]; then
        pass "No files >500KB in bundle"
    else
        warn "Large files detected:"
        echo "$LARGE_FILES"
    fi
else
    warn "No dist folder - run build first"
fi

# Check for code splitting
if grep -q "import(" src/App.tsx 2>/dev/null; then
    pass "Code splitting implemented"
else
    warn "No code splitting detected - consider for routes"
fi

echo ""

# ============================================================================
# TEST 8: Security Checks
# ============================================================================
echo "TEST 8: Security Checks"
echo "─────────────────────────────────────────────"

# Check for exposed secrets
if grep -r "sk_live" . --exclude-dir=node_modules 2>/dev/null; then
    fail "CRITICAL: Live Stripe secret key exposed in code!"
else
    pass "No exposed secret keys in code"
fi

# Check for console.log in production
if grep -r "console.log" src/ 2>/dev/null | grep -v "node_modules" | head -1; then
    warn "console.log statements found - remove for production"
else
    pass "No console.log in source"
fi

# Check .env.local not in git
if [[ -f ".gitignore" ]] && grep -q ".env.local" .gitignore; then
    pass ".env.local in .gitignore"
else
    fail ".env.local not in .gitignore - CRITICAL SECURITY ISSUE"
fi

echo ""

# ============================================================================
# TEST 9: Link Validation
# ============================================================================
echo "TEST 9: Internal Link Validation"
echo "─────────────────────────────────────────────"

# Check for broken internal links
BROKEN_LINKS=0

# Check navigation links
if grep -q 'href="#services"' src/config/site.ts; then
    if grep -q 'id="services"' src/components/ServicesSection.tsx; then
        pass "Services anchor link valid"
    else
        fail "Services anchor missing"
        ((BROKEN_LINKS++))
    fi
fi

if grep -q 'href="#about"' src/config/site.ts; then
    if grep -q 'id="about"' src/components/AboutSection.tsx; then
        pass "About anchor link valid"
    else
        fail "About anchor missing"
        ((BROKEN_LINKS++))
    fi
fi

if grep -q 'href="#contact"' src/config/site.ts; then
    if grep -q 'id="contact"' src/components/ContactSection.tsx; then
        pass "Contact anchor link valid"
    else
        fail "Contact anchor missing"
        ((BROKEN_LINKS++))
    fi
fi

if [[ $BROKEN_LINKS -eq 0 ]]; then
    pass "All internal links valid"
fi

echo ""

# ============================================================================
# TEST 10: Mobile Responsiveness
# ============================================================================
echo "TEST 10: Mobile Responsiveness"
echo "─────────────────────────────────────────────"

if grep -q "sm:" src/styles/index.css || grep -q "md:" src/styles/index.css; then
    pass "Responsive breakpoints defined"
else
    fail "Missing responsive breakpoints"
fi

if grep -q "viewport" index.html; then
    pass "Viewport meta tag present"
else
    fail "Missing viewport meta tag"
fi

echo ""

# ============================================================================
# TEST 11: Legal Pages
# ============================================================================
echo "TEST 11: Legal Pages Check"
echo "─────────────────────────────────────────────"

# Check if terms/privacy are accessible
if [[ -f "src/pages/TermsPage.tsx" ]]; then
    pass "Terms page component exists"
else
    warn "Terms page missing - create before launch"
fi

if [[ -f "src/pages/PrivacyPage.tsx" ]]; then
    pass "Privacy page component exists"
else
    warn "Privacy page missing - create before launch"
fi

echo ""

# ============================================================================
# TEST 12: Contact Forms
# ============================================================================
echo "TEST 12: Contact Form Validation"
echo "─────────────────────────────────────────────"

if grep -q "mailto:" src/config/site.ts; then
    pass "Email contact configured"
else
    warn "No email contact found"
fi

if grep -q "required" src/components/ContactSection.tsx 2>/dev/null; then
    pass "Form validation present"
else
    warn "Missing form validation"
fi

echo ""

# ============================================================================
# FINAL REPORT
# ============================================================================
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    TEST RESULTS SUMMARY                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "  ✅ PASSED:  $PASS"
echo "  ❌ FAILED:  $FAIL"
echo "  ⚠️  WARNED:  $WARN"
echo ""

if [[ $FAIL -eq 0 ]]; then
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║  🎉 READY TO LAUNCH!                                      ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Pre-launch checklist:"
    echo "  1. Upload images to Cloudinary"
    echo "  2. Update .env.local with production keys"
    echo "  3. Test payment flow with real card"
    echo "  4. Run Lighthouse audit (see below)"
    echo "  5. Deploy to Netlify/Vercel"
    exit 0
else
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║  ⚠️  FIX FAILURES BEFORE LAUNCH                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Critical issues must be resolved."
    exit 1
fi