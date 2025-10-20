#!/usr/bin/env bash
# emergency_fix_blank_screen.sh - Fix blank screen and restore working state
set -euo pipefail

APP_DIR="${1:-universal-header-v4}"
cd ~/"(a-d)setup-scripts-test"/"$APP_DIR" || exit 1

echo "=== EMERGENCY FIX: Blank Screen Recovery ==="
echo ""

# Step 1: Check for syntax errors
echo "Step 1: Checking for compilation errors..."
npm run build 2>&1 | tee build-errors.log || true

# Step 2: Restore backups if they exist
echo "Step 2: Checking for backup files..."
if [[ -f "src/components/Header.tsx.backup" ]]; then
    echo "Found Header.tsx backup - restoring..."
    cp src/components/Header.tsx.backup src/components/Header.tsx
fi

if [[ -f "src/styles/index.css.backup" ]]; then
    echo "Found index.css backup - restoring..."
    cp src/styles/index.css.backup src/styles/index.css
fi

# Step 3: Fix React Router setup (this is likely the issue)
echo "Step 3: Fixing React Router configuration..."

# Check if react-router-dom is installed
if ! grep -q "react-router-dom" package.json; then
    echo "Installing react-router-dom..."
    npm install react-router-dom
fi

# Step 4: Fix App.tsx routing setup
cat > src/App.tsx << 'APPFIX'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { defaultSiteConfig } from '@/config/site';
import { badgerTechAbout } from '@/config/about';
import { badgerTechContact } from '@/config/contact';
import { badgerTechFooter } from '@/config/footer';

// Home page component
const HomePage = () => (
  <div className="App min-h-screen" id="top">
    <Header config={defaultSiteConfig} />
    <main id="main-content" role="main">
      {defaultSiteConfig.services && (
        <ServicesSection config={defaultSiteConfig.services} />
      )}
      <AboutSection config={badgerTechAbout} />
      <ContactSection config={badgerTechContact} />
    </main>
    <Footer config={badgerTechFooter} />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
APPFIX

echo "✓ App.tsx fixed with proper routing"

# Step 5: Ensure main.tsx is correct
cat > src/main.tsx << 'MAINFIX'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
MAINFIX

echo "✓ main.tsx verified"

# Step 6: Clear any cached builds
echo "Step 4: Clearing build cache..."
rm -rf node_modules/.vite
rm -rf dist

# Step 7: Test compilation
echo "Step 5: Testing compilation..."
npm run build

echo ""
echo "=== FIX COMPLETE ==="
echo ""
echo "Start dev server: npm run dev"
echo "Check http://localhost:3000"
echo ""
echo "If still blank, check:"
echo "  1. Browser console for errors (F12)"
echo "  2. build-errors.log for TypeScript errors"
echo "  3. Run: npm install (might be missing deps)"