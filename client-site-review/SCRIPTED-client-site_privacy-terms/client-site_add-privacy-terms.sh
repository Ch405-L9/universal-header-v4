#!/bin/bash

# =============================================================================
# ADD PRIVACY POLICY & TERMS OF SERVICE TO CLIENT SITE
# =============================================================================
# Description: Adds Privacy Policy and Terms of Service components with routing
#              to any client site built with the BadgrTech client template
# 
# Dev Stack: React 19 + Vite + TypeScript + Tailwind + React Router
# Structure: Components-based (not pages)
# 
# What this script does:
# 1. Installs react-router-dom
# 2. Creates PrivacyPolicy.tsx component (generic with placeholders)
# 3. Creates TermsAndConditions.tsx component (generic with placeholders)
# 4. Updates App.tsx to add routing
# 5. Footer config already has links - no changes needed
#
# Usage: bash add-privacy-terms-to-client-site.sh
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# =============================================================================
# STEP 1: PRE-FLIGHT CHECKS
# =============================================================================
print_header "STEP 1: PRE-FLIGHT CHECKS"

# Check if we're in a valid project directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the project root?"
    exit 1
fi

if [ ! -d "src/components" ]; then
    print_error "src/components directory not found. Is this a client template project?"
    exit 1
fi

print_success "Valid project structure detected"

# =============================================================================
# STEP 2: INSTALL REACT ROUTER
# =============================================================================
print_header "STEP 2: INSTALL REACT ROUTER DOM"

print_info "Installing react-router-dom..."
pnpm add react-router-dom
pnpm add -D @types/react-router-dom

print_success "React Router DOM installed"

# =============================================================================
# STEP 3: CREATE PRIVACY POLICY COMPONENT
# =============================================================================
print_header "STEP 3: CREATE PRIVACY POLICY COMPONENT"

cat > src/components/PrivacyPolicy.tsx << 'EOF'
import { useEffect } from 'react';

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | [COMPANY_NAME]';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">[COMPANY_NAME]</p>
            <p className="text-sm text-blue-200 mt-2">Effective Date: [EFFECTIVE_DATE]</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            [COMPANY_NAME] ("[SHORT_NAME]," "we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit our website, <a href="[WEBSITE_URL]" className="text-blue-600 hover:text-blue-800 underline">[WEBSITE_URL]</a>, or engage our services.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">We may collect:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Personal information you provide (name, email, phone number, company details)</li>
              <li>Payment and billing data (processed securely via third-party providers)</li>
              <li>Technical data (IP address, browser type, device info)</li>
              <li>Cookies and analytics for performance and security purposes</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">We use collected data to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide and improve our services</li>
              <li>Communicate updates, support, and marketing materials (opt-out anytime)</li>
              <li>Ensure website security and compliance</li>
              <li>Process payments and invoices</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Meet legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              3. Sharing of Information
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We do not sell or rent your information. We may share limited data with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Service providers (e.g., payment processors, analytics, hosting providers)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              4. Data Security and Retention
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use SSL encryption, firewalls, and access controls to protect your data. However, no online method is 100% secure, and you acknowledge that risk by using our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We retain data as long as reasonably necessary for business, legal, or tax reasons.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              5. Your Rights
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Depending on your location, you may:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Request a copy or deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Access and correct your information</li>
            </ul>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Contact <a href="mailto:[PRIVACY_EMAIL]" className="text-blue-600 hover:text-blue-800 underline font-medium">[PRIVACY_EMAIL]</a> for all privacy inquiries.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              6. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our site is not directed to children under 13. We do not knowingly collect information from children.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              7. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Data may be processed in the United States or by providers internationally under appropriate safeguards.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              8. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy occasionally. The effective date will reflect changes. Continued use of our site means you accept those changes.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Company:</span> [COMPANY_LEGAL_NAME]</p>
              <p>
                <span className="font-semibold">Privacy Email:</span>{' '}
                <a href="mailto:[PRIVACY_EMAIL]" className="text-blue-600 hover:text-blue-800 underline">
                  [PRIVACY_EMAIL]
                </a>
              </p>
              <p>
                <span className="font-semibold">General Email:</span>{' '}
                <a href="mailto:[GENERAL_EMAIL]" className="text-blue-600 hover:text-blue-800 underline">
                  [GENERAL_EMAIL]
                </a>
              </p>
            </div>
          </section>

          {/* Back to Home Link */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
EOF

print_success "PrivacyPolicy.tsx created with placeholders"

# =============================================================================
# STEP 4: CREATE TERMS AND CONDITIONS COMPONENT
# =============================================================================
print_header "STEP 4: CREATE TERMS AND CONDITIONS COMPONENT"

cat > src/components/TermsAndConditions.tsx << 'EOF'
import { useEffect } from 'react';

export function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms and Conditions | [COMPANY_NAME]';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl text-blue-100">[COMPANY_NAME]</p>
            <p className="text-sm text-blue-200 mt-2">Effective Date: [EFFECTIVE_DATE]</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            These Terms govern use of <a href="[WEBSITE_URL]" className="text-blue-600 hover:text-blue-800 underline">[WEBSITE_URL]</a> and services by [COMPANY_NAME] ("[SHORT_NAME]," "we," "us," or "our"). By using the site you accept these Terms.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              1. Acceptance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Use of site or ordering services constitutes agreement to these Terms. If you do not agree, do not use our website or services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              2. Services and Agreements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Services are delivered under separate agreements, proposals, or invoices</li>
              <li>Estimates and timelines are best-effort and may change based on project scope and complexity</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              3. Payments and Refunds
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Payment terms are specified in invoices and service agreements</li>
              <li>Late payments may incur fees or result in service suspension</li>
              <li>Refunds are handled per the applicable service agreement</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              4. User Obligations
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide accurate information, required access, and timely approvals</li>
              <li>Not use the site for unlawful activity, scraping, or reverse engineering</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain confidentiality of any account credentials</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              5. Intellectual Property
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>[COMPANY_NAME] retains intellectual property rights for tools, templates, and pre-existing materials</li>
              <li>Deliverables may be licensed to you upon full payment per project agreement</li>
              <li>Custom work product ownership is specified in individual service agreements</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              6. Confidentiality
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Both parties will protect confidential information shared during the course of business. Standard exceptions apply for information that is publicly available, independently developed, or required to be disclosed by law.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              7. Warranties and Disclaimers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Services are provided "as-is" with commercially reasonable care. We make no other warranties, express or implied, including warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              8. Limitation of Liability
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>We are not liable for indirect, special, incidental, or consequential damages</li>
              <li>Aggregate liability is limited to the amount paid in the prior 12 months or $1,000 if no payments made</li>
              <li>Some jurisdictions do not allow limitation of liability; in such cases, minimum legally required liability applies</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              9. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Third-party tools and services (such as payment processors or analytics platforms) are governed by their respective terms of service. We are not responsible for third-party service performance or policies.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              10. Termination
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>We may suspend or terminate access for breach of these Terms</li>
              <li>Termination does not relieve payment obligations for services rendered</li>
              <li>Upon termination, certain provisions (confidentiality, liability, governing law) survive</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              11. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of [JURISDICTION]. Exclusive venue for disputes is in [JURISDICTION] courts.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Company:</span> [COMPANY_LEGAL_NAME]</p>
              <p>
                <span className="font-semibold">Legal Email:</span>{' '}
                <a href="mailto:[LEGAL_EMAIL]" className="text-blue-600 hover:text-blue-800 underline">
                  [LEGAL_EMAIL]
                </a>
              </p>
              <p>
                <span className="font-semibold">General Email:</span>{' '}
                <a href="mailto:[GENERAL_EMAIL]" className="text-blue-600 hover:text-blue-800 underline">
                  [GENERAL_EMAIL]
                </a>
              </p>
            </div>
          </section>

          {/* Back to Home Link */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
EOF

print_success "TermsAndConditions.tsx created with placeholders"

# =============================================================================
# STEP 5: UPDATE APP.TSX WITH ROUTING
# =============================================================================
print_header "STEP 5: UPDATE APP.TSX WITH ROUTING"

# Backup original App.tsx
cp src/App.tsx src/App.tsx.backup
print_info "Backed up original App.tsx to App.tsx.backup"

# Create new App.tsx with routing
cat > src/App.tsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { PrivacyPolicy } from '@/components/PrivacyPolicy';
import { TermsAndConditions } from '@/components/TermsAndConditions';

// Main home page component
function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

print_success "App.tsx updated with routing"

# =============================================================================
# STEP 6: COMPLETION SUMMARY
# =============================================================================
print_header "INSTALLATION COMPLETE!"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Privacy Policy and Terms of Service successfully added!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BLUE}📋 WHAT WAS INSTALLED:${NC}"
echo "  ✓ react-router-dom package"
echo "  ✓ src/components/PrivacyPolicy.tsx"
echo "  ✓ src/components/TermsAndConditions.tsx"
echo "  ✓ Updated src/App.tsx with routing"
echo ""

echo -e "${YELLOW}⚠️  NEXT STEPS - CUSTOMIZE YOUR CONTENT:${NC}\n"

echo -e "${BLUE}1. Replace these placeholders in BOTH components:${NC}"
echo "   [COMPANY_NAME] - Your company display name"
echo "   [COMPANY_LEGAL_NAME] - Full legal entity name"
echo "   [SHORT_NAME] - Short version of company name"
echo "   [WEBSITE_URL] - Your website URL (e.g., www.yoursite.com)"
echo "   [EFFECTIVE_DATE] - Date policy takes effect (e.g., January 1, 2025)"
echo "   [PRIVACY_EMAIL] - Privacy contact email (e.g., privacy@yoursite.com)"
echo "   [LEGAL_EMAIL] - Legal contact email (e.g., legal@yoursite.com)"
echo "   [GENERAL_EMAIL] - General contact email (e.g., hello@yoursite.com)"
echo "   [JURISDICTION] - Legal jurisdiction (e.g., State of Georgia, USA)"
echo ""

echo -e "${BLUE}2. Quick find & replace command:${NC}"
cat << 'REPLACE'
   # In your terminal, use this pattern:
   sed -i 's/\[COMPANY_NAME\]/Your Company/g' src/components/PrivacyPolicy.tsx
   sed -i 's/\[COMPANY_NAME\]/Your Company/g' src/components/TermsAndConditions.tsx
   
   # Or use your IDE's find & replace (Ctrl+Shift+H in VS Code)
REPLACE
echo ""

echo -e "${BLUE}3. Footer links are already configured:${NC}"
echo "   Your footer config already has /privacy and /terms links ✓"
echo ""

echo -e "${BLUE}4. Test the changes:${NC}"
echo "   pnpm run dev"
echo "   Navigate to: http://localhost:5173/privacy"
echo "   Navigate to: http://localhost:5173/terms"
echo ""

echo -e "${BLUE}5. Deploy when ready:${NC}"
echo "   pnpm run build"
echo "   vercel --prod  (or your deployment method)"
echo ""

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Script by BADGRTechnologies LLC | Built for client-site template${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"