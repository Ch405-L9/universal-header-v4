#!/usr/bin/env bash
# image_optimization_pipeline.sh - Modern Image Workflow for Production
# Cloudinary CLI + Sharp for optimal compression
set -euo pipefail

PROJECT_DIR=~/"(a-d)setup-scripts-test"/universal-header-v4
IMAGES_SOURCE="$PROJECT_DIR/public/images"
BACKUP_DIR="$PROJECT_DIR/.image-backups"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          IMAGE OPTIMIZATION PIPELINE - PRODUCTION           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ═══════════════════════════════════════════════════════════════════
# STEP 1: Install Required Tools
# ═══════════════════════════════════════════════════════════════════
echo "1. Installing optimization tools..."

# Install Cloudinary CLI (official, most widely used)
if ! command -v cld &> /dev/null; then
    echo "   Installing Cloudinary CLI..."
    npm install -g cloudinary-cli
fi

# Install Sharp CLI (industry standard for local optimization)
if ! command -v sharp &> /dev/null; then
    echo "   Installing Sharp CLI..."
    npm install -g sharp-cli
fi

# Install WebP tools (Google's reference implementation)
if ! command -v cwebp &> /dev/null; then
    echo "   Installing WebP tools..."
    sudo apt update && sudo apt install -y webp
fi

echo "✓ Tools installed: Cloudinary CLI, Sharp, WebP"
echo ""

# ═══════════════════════════════════════════════════════════════════
# STEP 2: Backup Existing Images
# ═══════════════════════════════════════════════════════════════════
echo "2. Backing up original images..."

mkdir -p "$BACKUP_DIR"/{hero,services,logo,icons}

if [[ -d "$IMAGES_SOURCE" ]]; then
    rsync -av --ignore-existing "$IMAGES_SOURCE/" "$BACKUP_DIR/"
    echo "✓ Backup created: $BACKUP_DIR"
else
    echo "⚠ No local images found - will use cloud URLs only"
fi
echo ""

# ═══════════════════════════════════════════════════════════════════
# STEP 3: Image Placement Guide
# ═══════════════════════════════════════════════════════════════════
cat > IMAGE_PLACEMENT_GUIDE.md << 'PLACEMENT'
# Image Placement Guide for BADGRTech Site

## Required Images (Place in these exact locations)

### 1. Hero Background (CRITICAL for LCP)
**Location:** `public/images/hero/`
**Filename:** `hero-atlanta-skyline.webp`
**Specs:** 
- Dimensions: 1920x1080px
- Format: WebP
- Quality: 80-85%
- Max size: 150KB

### 2. Logo (White version for header)
**Location:** `public/images/logo/`
**Filename:** `logo-blk-wht2.svg`
**Specs:**
- Format: SVG (vector)
- Transparent background
- Optimized/minified

### 3. Service Images (3 required)
**Location:** `public/images/services/`

**Files:**
- `service-web-devdes.webp` (Web Development)
- `service-brand.webp` (Branding)
- `service-content-edit.webp` (Visual Content)

**Specs (for each):**
- Dimensions: 400x300px
- Format: WebP
- Quality: 75-80%
- Max size: 20KB each

### 4. Favicon
**Location:** `public/images/icons/`
**Filename:** `favicon.svg`
**Specs:**
- Format: SVG
- 32x32px artboard
- Simple, recognizable at small sizes

## Current Cloud URLs (Cloudinary)
Your images are currently hosted at:
