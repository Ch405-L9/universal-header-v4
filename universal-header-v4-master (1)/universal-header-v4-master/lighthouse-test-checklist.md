# Lighthouse Testing Protocol

## Pre-Test Setup
- [ ] All code changes saved
- [ ] Git status clean (or changes committed)
- [ ] Terminal ready (2 terminals needed)

## Build & Serve Sequence

### Terminal 1: Build Production
```bash
# 1. Clean old build
rm -rf dist/

# 2. Fresh production build
npm run build

# 3. Wait for: "✓ built in XXXms"

# 4. Serve production build
npx serve dist -l 3000

# 5. Wait for: "Accepting connections at http://localhost:3000"

# 6. LEAVE THIS TERMINAL RUNNING
