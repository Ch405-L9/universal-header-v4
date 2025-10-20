#!/usr/bin/env bash
# cloudinary_bulk_upload.sh - Upload images and capture URLs
set -euo pipefail

IMAGES_DIR=~/Desktop/"BADGR In Progress"/images
OUTPUT_FILE=~/Desktop/cloudinary_urls.txt

echo "Cloudinary Bulk Upload Script"
echo ""

# Check if cloudinary CLI is installed
if ! command -v cld &> /dev/null; then
    echo "Installing Cloudinary CLI..."
    npm install -g cloudinary-cli
fi

# Configure Cloudinary (you'll need your credentials)
echo "Configure Cloudinary credentials:"
echo "Get them from: https://console.cloudinary.com/console/settings/security"
echo ""
read -p "Cloud Name: " CLOUD_NAME
read -p "API Key: " API_KEY
read -sp "API Secret: " API_SECRET
echo ""

export CLOUDINARY_URL="cloudinary://${API_KEY}:${API_SECRET}@${CLOUD_NAME}"

# Clear output file
> "$OUTPUT_FILE"

echo ""
echo "Uploading images..."
echo ""

# Hero image
echo "Uploading hero..."
cld uploader upload "$IMAGES_DIR/hero/hero-home.webp" \
  --public-id "hero-home" \
  --folder "hero" \
  --overwrite true \
  --resource-type image | jq -r '.secure_url' | tee -a "$OUTPUT_FILE"

# Services
echo "Uploading services..."
for img in "$IMAGES_DIR/services"/*.webp; do
  filename=$(basename "$img" .webp)
  cld uploader upload "$img" \
    --public-id "$filename" \
    --folder "services" \
    --overwrite true \
    --resource-type image | jq -r '.secure_url' | tee -a "$OUTPUT_FILE"
done

# Team
echo "Uploading team..."
for img in "$IMAGES_DIR/team"/*.webp; do
  filename=$(basename "$img" .webp)
  cld uploader upload "$img" \
    --public-id "$filename" \
    --folder "team" \
    --overwrite true \
    --resource-type image | jq -r '.secure_url' | tee -a "$OUTPUT_FILE"
done

# Icons
echo "Uploading icons..."
for img in "$IMAGES_DIR/icons"/*; do
  filename=$(basename "$img")
  cld uploader upload "$img" \
    --public-id "${filename%.*}" \
    --folder "icons" \
    --overwrite true \
    --resource-type image | jq -r '.secure_url' | tee -a "$OUTPUT_FILE"
done

echo ""
echo "✓ Upload complete!"
echo "URLs saved to: $OUTPUT_FILE"
echo ""
cat "$OUTPUT_FILE"
