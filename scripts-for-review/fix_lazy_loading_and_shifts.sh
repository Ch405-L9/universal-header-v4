# Quick fix - the LAZYAPP heredoc is missing proper closure
# Let's recreate just that section properly

cd ~/"(a-d)setup-scripts-test"/universal-header-v4

# Stop the Vite dev server first
pkill -f vite

# Manual fix for App.tsx instead of heredoc
cat > src/App.tsx << 'EOF'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { defaultSiteConfig } from '@/config/site';
import { badgerTechAbout } from '@/config/about';
import { badgerTechContact } from '@/config/contact';
import { badgerTechFooter } from '@/config/footer';

const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const LoadingFallback = () => (
  <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid #0066CC', borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
);

const HomePage = () => (
  <div className="App min-h-screen" id="top">
    <Header config={defaultSiteConfig} />
    <main id="main-content" role="main">
      <Suspense fallback={<LoadingFallback />}>
        {defaultSiteConfig.services && <ServicesSection config={defaultSiteConfig.services} />}
        <AboutSection config={badgerTechAbout} />
        <ContactSection config={badgerTechContact} />
      </Suspense>
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
EOF

# Add dimensions to ServiceCard images
sed -i 's/<img loading="lazy" decoding="async" /<img loading="lazy" decoding="async" width="400" height="300" /' src/components/ServiceCard.tsx

# Build
npm run build
