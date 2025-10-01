#!/usr/bin/env bash
# install_cloudinary_cli.sh - Proper Cloudinary CLI installation
set -euo pipefail

echo "Installing Cloudinary CLI (official method)..."

# Method 1: npm global install (requires Node.js)
if command -v npm &> /dev/null; then
    echo "Installing via npm..."
    sudo npm install -g cloudinary-cli
    
    # Verify installation
    if command -v cld &> /dev/null; then
        echo "✓ Cloudinary CLI installed successfully"
        cld --version
    else
        echo "✗ npm install failed, trying alternative..."
    fi
fi

# Method 2: Direct binary download (if npm failed)
if ! command -v cld &> /dev/null; then
    echo "Installing via direct download..."
    
    # Detect architecture
    ARCH=$(uname -m)
    if [[ "$ARCH" == "x86_64" ]]; then
        BINARY="cld-linux"
    elif [[ "$ARCH" == "aarch64" ]]; then
        BINARY="cld-linux-arm64"
    else
        echo "Unsupported architecture: $ARCH"
        exit 1
    fi
    
    # Download latest release
    curl -L https://github.com/cloudinary/cloudinary-cli/releases/latest/download/$BINARY \
         -o /tmp/cld
    
    # Install to user bin
    chmod +x /tmp/cld
    sudo mv /tmp/cld /usr/local/bin/cld
    
    echo "✓ Cloudinary CLI installed to /usr/local/bin/cld"
fi

# Configure Cloudinary credentials
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "CLOUDINARY CONFIGURATION"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Your Cloud Name: dsxpcwjwb"
echo ""
echo "Run this command to configure:"
echo "  cld config"
echo ""
echo "Or set environment variables:"
echo "  export CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@dsxpcwjwb"
echo ""
echo "Get your API credentials from:"
echo "  https://console.cloudinary.com/console/settings/security"
echo ""
