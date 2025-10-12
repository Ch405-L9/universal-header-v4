import React from 'react';
import Head from 'next/head';
import { cn } from '@/utils/cn';

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | BADGRTechnologies</title>
        <meta name="description" content="Terms and Conditions for BADGR Technologies LLC. Review the terms governing use of our website and services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.badgrtech.com/terms" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
              <p className="text-xl text-blue-100">BADGR Technologies LLC</p>
              <p className="text-sm text-blue-200 mt-2">Effective Date: January 1, 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              These Terms govern your use of <a href="https://www.badgrtech.com" className="text-blue-600 hover:text-blue-800 underline">www.badgrtech.com</a> and services provided by BADGR Technologies LLC ("BADGRTech," "we," "our," or "us"). By using our site or ordering services, you agree to these Terms.
            </p>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By using the site or ordering services, you agree to these terms and any service order or invoice. If you do not agree, please discontinue use immediately.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                2. Use of Website
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You agree to use our website for lawful purposes only. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Unauthorized use, scraping, or reverse engineering</li>
                <li>Misuse of our intellectual property</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Transmitting malicious code or content</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                3. Services and Agreements
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Services are provided under separate statements of work, proposals, or invoices. Those documents control for the scoped project.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Estimates, timelines, and pricing are subject to change. Final terms are specified in individual service agreements.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                4. Payments and Refunds
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Payment terms are outlined in invoices or statements of work. Key points:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Late payments may incur interest or suspension of services</li>
                <li>Refunds are handled per the applicable service agreement</li>
                <li>Payment is required before final deliverable release unless otherwise agreed</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                5. User Obligations
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                As a client or site visitor, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide accurate information and necessary access</li>
                <li>Respond to requests in a timely manner</li>
                <li>Obtain proper permissions for any materials you provide</li>
                <li>Not engage in unlawful activity through our services</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                All content, logos, designs, and materials on this site are owned by BADGR Technologies LLC or its licensors. You may not reproduce or distribute them without written consent.
              </p>
              <p className="text-gray-700 leading-relaxed">
                BADGRTech retains intellectual property rights in our tools, templates, and pre-existing code. Deliverables may be licensed to you upon full payment, with details specified in the project agreement.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                7. Confidentiality
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Each party agrees to protect confidential information of the other. Standard exceptions apply for information that is publicly available or independently developed.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                8. Warranties and Disclaimers
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Services are provided with commercially reasonable care. However:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Services are provided "as-is" without warranties of any kind</li>
                <li>We disclaim all other warranties, express or implied, to the fullest extent permitted by law</li>
                <li>We do not warrant that services will be uninterrupted or error-free</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are not liable for indirect, incidental, special, or consequential damages arising from use of our services or website.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our maximum aggregate liability for any claim will not exceed the amount you paid for services in the prior 12 months, or $1,000 if no payments were made.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                10. Third-Party Services and Links
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may use or link to third-party services (payment processors, analytics, hosting). Those services are governed by their own terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for third-party content or practices.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                11. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate access to the site for any violation of these Terms. Termination does not relieve outstanding payment obligations.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                12. Governing Law and Disputes
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                These Terms are governed by the laws of the State of Georgia, USA.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any disputes will be resolved in courts located in Georgia. Both parties consent to the jurisdiction and venue of such courts.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                13. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms from time to time. The effective date will reflect changes. Continued use of our site after changes constitutes acceptance.
              </p>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Company:</span> BADGR Technologies LLC</p>
                <p><span className="font-semibold">NAICS Code:</span> 541511</p>
                <p>
                  <span className="font-semibold">Legal Email:</span>{' '}
                  <a href="mailto:legal@badgrtech.com" className="text-blue-600 hover:text-blue-800 underline">
                    legal@badgrtech.com
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
      </main>
    </>
  );
};

export default TermsAndConditions;
