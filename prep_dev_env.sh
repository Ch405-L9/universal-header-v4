#!/usr/bin/env bash
set -euo pipefail

echo "Installing dev dependencies with pnpm..."
pnpm add -D \
  typescript \
  vite \
  @vitejs/plugin-react-swc \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  prettier \
  eslint-config-prettier \
  eslint-plugin-import \
  vitest \
  jsdom \
  @vitest/ui \
  @testing-library/react \
  @testing-library/jest-dom

cat << 'INFO'

Dev dependencies installed.

Next steps:

1) Update package.json "scripts" to include at least:
   "dev": "vite",
   "build": "vite build",
   "preview": "vite preview",
   "lint": "eslint \"src/**/*.{ts,tsx,js,jsx}\" --max-warnings=0",
   "test": "vitest",
   "typecheck": "tsc --noEmit"

2) Run:
   pnpm install
   pnpm dev

3) In VS Code:
   - Install recommended extensions (run install_vscode_extensions.sh).
   - Open this folder as your workspace.
   - Use the NPM scripts panel or terminal to run dev/build/test.

INFO

