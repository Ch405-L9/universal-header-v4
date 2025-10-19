import React, { useEffect } from 'react';

const TermsAndConditions: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms and Conditions | BADGRTechnologies';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
            These Terms govern use of{' '}
            <a
              href="https://www.badgrtech.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              www.badgrtech.com
            </a>{' '}
            and services by BADGR Technologies LLC ("BADGRTech," "we," "us," or "our"). By using the
            site you accept these Terms.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              1. Acceptance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Use of site or ordering services constitutes agreement to these Terms. If you do not
              agree, do not use our website or services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              2. Services and Agreements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Services are delivered under separate Statements of Work, proposals, or invoices
              </li>
              <li>
                Estimates and timelines are best-effort and may change based on project scope and
                complexity
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              3. Payments and Refunds
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Payment terms are specified in invoices and Statements of Work</li>
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
              <li>
                BADGRTech retains intellectual property rights for tools, templates, and
                pre-existing code
              </li>
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
              Both parties will protect confidential information shared during the course of
              business. Standard exceptions apply for information that is publicly available,
              independently developed, or required to be disclosed by law.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              7. Warranties and Disclaimers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Services are provided "as-is" with commercially reasonable care. We make no other
              warranties, express or implied, including warranties of merchantability or fitness for
              a particular purpose.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              8. Limitation of Liability
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>We are not liable for indirect, special, incidental, or consequential damages</li>
              <li>
                Aggregate liability is limited to the amount paid in the prior 12 months or $1,000
                if no payments made
              </li>
              <li>
                Some jurisdictions do not allow limitation of liability; in such cases, minimum
                legally required liability applies
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              9. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Third-party tools and services (such as Stripe for payments or analytics platforms)
              are governed by their respective terms of service. We are not responsible for
              third-party service performance or policies.
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
              <li>
                Upon termination, certain provisions (confidentiality, liability, governing law)
                survive
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              11. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of the State of Georgia, USA. Exclusive venue for
              disputes is in Georgia courts. Both parties waive right to jury trial.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Company:</span> BADGR Technologies LLC
              </p>
              <p>
                <span className="font-semibold">NAICS Code:</span> 541511
              </p>
              <p>
                <span className="font-semibold">Legal Email:</span>{' '}
                <a
                  href="mailto:legal@badgrtech.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  legal@badgrtech.com
                </a>
              </p>
              <p>
                <span className="font-semibold">General Email:</span>{' '}
                <a
                  href="mailto:hello@badgrtech.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
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
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TermsAndConditions;
