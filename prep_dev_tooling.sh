#!/usr/bin/env bash
set -euo pipefail

echo "Installing dev dependencies (ESLint stack) with pnpm..."

pnpm add -D \
  eslint \
  @eslint/js \
  typescript-eslint \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-import \
  eslint-config-prettier \
  globals

echo "Done. You can now run:"
echo "  pnpm lint"
