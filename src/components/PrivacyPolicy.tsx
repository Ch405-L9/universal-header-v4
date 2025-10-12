import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | BADGRTechnologies';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">BADGR Technologies LLC</p>
            <p className="text-sm text-blue-200 mt-2">Effective Date: January 1, 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            BADGR Technologies LLC ("BADGRTech," "we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit our website, <a href="https://www.badgrtech.com" className="text-blue-600 hover:text-blue-800 underline">www.badgrtech.com</a>, or engage our services.
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
              <li>Service providers (e.g., Stripe, Google Analytics, hosting providers)</li>
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
              Contact <a href="mailto:privacy@badgrtech.com" className="text-blue-600 hover:text-blue-800 underline font-medium">privacy@badgrtech.com</a> for all privacy inquiries.
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
              <p><span className="font-semibold">Company:</span> BADGR Technologies LLC</p>
              <p><span className="font-semibold">NAICS Code:</span> 541511</p>
              <p>
                <span className="font-semibold">Privacy Email:</span>{' '}
                <a href="mailto:privacy@badgrtech.com" className="text-blue-600 hover:text-blue-800 underline">
                  privacy@badgrtech.com
                </a>
              </p>
              <p>
                <span className="font-semibold">General Email:</span>{' '}
                <a href="mailto:hello@badgrtech.com" className="text-blue-600 hover:text-blue-800 underline">
                  hello@badgrtech.com
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
};

export default PrivacyPolicy;

