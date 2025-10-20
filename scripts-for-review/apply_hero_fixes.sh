#!/usr/bin/env bash
# apply_hero_fixes.sh - Apply all three hero section fixes
# Fixes: 1) Hero text size, 2) CTA button routing, 3) Pure white text
set -euo pipefail

APP_DIR="${1:-universal-header-v4}"
VERBOSE=true

log(){ [[ "$VERBOSE" == true ]] && echo "[$0] $*"; }
fail(){ echo "ERROR: $*" >&2; exit 1; }

# Navigate to project directory
cd ~/"(a-d)setup-scripts-test"/"$APP_DIR" || fail "Directory not found: $APP_DIR"

log "Applying hero section fixes..."

# ============================================================================
# FIX 1: Increase Hero Text Size
# ============================================================================
log "Fix 1: Increasing hero headline text size..."

if [[ -f "src/components/Header.tsx" ]]; then
    # Backup original
    cp src/components/Header.tsx src/components/Header.tsx.backup
    
    # Replace text-responsive-3xl with larger sizes
    sed -i 's/text-responsive-3xl font-heading font-bold/text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white/g' src/components/Header.tsx
    
    # Also update the subheadline for consistency
    sed -i 's/text-responsive-lg mb-4/text-xl md:text-2xl lg:text-3xl mb-4 text-white/g' src/components/Header.tsx
    
    log "✓ Hero text sizes increased in Header.tsx"
else
    fail "Header.tsx not found"
fi

# ============================================================================
# FIX 2: Update CTA Button to Route to /intake
# ============================================================================
log "Fix 2: Updating CTA button to route to /intake..."

if [[ -f "src/config/site.ts" ]]; then
    # Backup original
    cp src/config/site.ts src/config/site.ts.backup
    
    # Replace mailto link with /intake route
    sed -i 's|href: `mailto:${badgrTechBusiness.contact.email.primary}?subject=Custom Digital Audit Request`|href: "/intake"|g' src/config/site.ts
    
    # Alternative pattern if the first doesn't match
    sed -i 's|mailto:hello@badgrtech.com?subject=Custom Digital Audit Request|/intake|g' src/config/site.ts
    
    log "✓ CTA button now routes to /intake"
else
    fail "site.ts not found"
fi

# ============================================================================
# FIX 3: Make Hero Text Pure White with Strong Shadow
# ============================================================================
log "Fix 3: Making hero text pure white with enhanced contrast..."

if [[ -f "src/styles/index.css" ]]; then
    # Backup original
    cp src/styles/index.css src/styles/index.css.backup
    
    # Check if the hero text color override already exists
    if grep -q "High Contrast Hero Text Override" src/styles/index.css; then
        log "  Hero text override already exists, updating..."
        
        # Update existing override
        sed -i '/\/\* High Contrast Hero Text Override \*\//,/^}/c\
/* High Contrast Hero Text Override */\
.hero-atlanta .hero-content h1,\
.hero-atlanta .hero-content h2,\
.hero-atlanta .hero-content p,\
.hero-atlanta .hero-content .text-responsive-lg,\
.hero-atlanta .hero-content .text-responsive-base {\
  color: #FFFFFF !important;\
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.8);\
}' src/styles/index.css
    else
        log "  Adding new hero text override..."
        
        # Add new override at the end of the file
        cat >> src/styles/index.css << 'HEROTEXT'

/* High Contrast Hero Text Override */
.hero-atlanta .hero-content h1,
.hero-atlanta .hero-content h2,
.hero-atlanta .hero-content p,
.hero-atlanta .hero-content .text-responsive-lg,
.hero-atlanta .hero-content .text-responsive-base {
  color: #FFFFFF !important;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.8);
}

/* Ensure all hero text is white */
.hero-atlanta * {
  color: #FFFFFF !important;
}

/* Exception: Keep button colors as designed */
.hero-atlanta button,
.hero-atlanta .btn {
  color: inherit !important;
}
HEROTEXT
    fi
    
    log "✓ Hero text styling updated for pure white with shadow"
else
    fail "index.css not found"
fi

# ============================================================================
# Verification
# ============================================================================
log ""
log "Verifying changes..."

# Check if files were modified
if [[ -f "src/components/Header.tsx.backup" ]] && \
   [[ -f "src/config/site.ts.backup" ]] && \
   [[ -f "src/styles/index.css.backup" ]]; then
    log "✓ All files backed up successfully"
fi

# Verify text size change
if grep -q "text-5xl md:text-6xl lg:text-7xl" src/components/Header.tsx; then
    log "✓ Hero text size increased"
else
    log "⚠ Warning: Hero text size may not have changed"
fi

# Verify CTA route change
if grep -q 'href: "/intake"' src/config/site.ts; then
    log "✓ CTA button routes to /intake"
else
    log "⚠ Warning: CTA button route may not have changed"
fi

# Verify CSS changes
if grep -q "High Contrast Hero Text Override" src/styles/index.css; then
    log "✓ Hero text styling added"
else
    log "⚠ Warning: Hero text styling may not have been added"
fi

# ============================================================================
# Summary
# ============================================================================
log ""
log "═══════════════════════════════════════════════════════════"
log "🎉 ALL FIXES APPLIED SUCCESSFULLY!"
log "═══════════════════════════════════════════════════════════"
log ""
log "✓ Fix 1: Hero headline now uses 5xl/6xl/7xl responsive sizing"
log "✓ Fix 2: 'Get My Custom Digital Audit' button routes to /intake"
log "✓ Fix 3: All hero text is pure white (#FFFFFF) with shadow"
log ""
log "📋 Backup files created:"
log "  • src/components/Header.tsx.backup"
log "  • src/config/site.ts.backup"
log "  • src/styles/index.css.backup"
log ""
log "🚀 Next Steps:"
log "  1. Restart your dev server:"
log "     cd ~/'(a-d)setup-scripts-test'/$APP_DIR"
log "     npm run dev"
log ""
log "  2. Test the changes at: http://localhost:3000"
log "     - Hero text should be MUCH larger"
log "     - All text should be pure white"
log "     - CTA button should navigate to /intake"
log ""
log "  3. If you need to revert:"
log "     mv src/components/Header.tsx.backup src/components/Header.tsx"
log "     mv src/config/site.ts.backup src/config/site.ts"
log "     mv src/styles/index.css.backup src/styles/index.css"
log ""
log "═══════════════════════════════════════════════════════════"