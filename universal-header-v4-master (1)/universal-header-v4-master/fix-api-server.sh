#!/usr/bin/env bash
set -euo pipefail

log() { echo "[FIX] $*"; }
success() { echo "[SUCCESS] $*"; }

log "Installing backend dependencies..."
npm install express cors dotenv

log "Creating Express server..."
cat > server/index.cjs << 'EOF'
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Import API routes
const createCheckoutSession = require('../api/stripe/create-checkout-session.ts');

app.post('/api/stripe/create-checkout-session', createCheckoutSession);

app.listen(PORT, () => {
  console.log(`[SERVER] API running on http://localhost:${PORT}`);
});
EOF

log "Updating vite.config.ts with proxy..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
EOF

log "Adding dev script to package.json..."
npm pkg set scripts.dev:api="node server/index.cjs"
npm pkg set scripts.dev:full="npm run dev:api & npm run dev"

success "Backend configured!"
echo ""
echo "════════════════════════════════════════════"
echo "  RUN BOTH SERVERS:"
echo "  npm run dev:full"
echo "════════════════════════════════════════════"
EOF
