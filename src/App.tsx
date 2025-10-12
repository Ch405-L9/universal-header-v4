import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { defaultSiteConfig } from '@/config/site';
import { badgerTechAbout } from '@/config/about';
import { badgerTechContact } from '@/config/contact';
import { badgerTechFooter } from '@/config/footer';

// Import Privacy and Terms components
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsAndConditions from '@/components/TermsAndConditions';

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

const SuccessPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white p-8 rounded-sm border-2 border-green-600 text-center">
      <div className="text-green-600 text-6xl mb-4">✓</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your deposit. We'll reach out within 2 hours to begin your project.
      </p>
      <a href="/" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-sm hover:bg-blue-700 inline-block">
        Return Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
