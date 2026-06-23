import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Link } from "wouter";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { buildGraph, buildWebPageSchema, orgEntity, websiteEntity } from "@/lib/schema";

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 border-b border-primary/30 pb-3 font-sans text-2xl font-bold uppercase tracking-[0.04em] text-white">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-7 text-zinc-300">{children}</div>
    </section>
  );
}

export default function BadgrBoltPrivacy() {
  usePageMeta({
    title: "BADGR Bolt Privacy Policy | BADGRTechnologies",
    description:
      "Privacy policy for the BADGR Bolt speed reading app — covering data collection, AI feature processing, Firebase services, and your rights.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/privacy/badgr-bolt#page",
        name: "BADGR Bolt Privacy Policy | BADGRTechnologies",
        description:
          "Privacy policy for the BADGR Bolt speed reading app — covering data collection, AI feature processing, Firebase services, and your rights.",
        url: "https://badgrtech.com/privacy/badgr-bolt",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          { name: "Privacy Policy", url: "https://badgrtech.com/privacy" },
          { name: "BADGR Bolt", url: "https://badgrtech.com/privacy/badgr-bolt" },
        ],
      }),
    ),
    "badgr-bolt-privacy-graph",
  );

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="border-b border-primary/20 bg-[#020816]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-none border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary">
              <LockKeyhole className="h-4 w-4" />
              App Privacy Policy
            </div>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              BADGR Bolt Privacy Policy
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              This policy explains what data BADGR Bolt collects, how it is
              used, what leaves your device, and your rights as a user. BADGR
              Bolt is published by BADGRTechnologies LLC on Google Play.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-zinc-500">
              Effective Date: June 23, 2026 &nbsp;·&nbsp; App Version: 3.1.4
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl md:p-12">
          <p className="mb-10 text-lg leading-8 text-zinc-300">
            BADGRTechnologies LLC ("we," "our," or "us") built BADGR Bolt as a
            commercial Android application. This policy applies to all users of
            BADGR Bolt and describes how we collect, process, and protect
            information when you use the app. By installing or using BADGR Bolt
            you agree to this policy.
          </p>

          <PolicySection title="1. Data We Collect and Why">
            <p className="font-semibold text-white">A. Account Data (Optional)</p>
            <p>
              BADGR Bolt does not require an account. If you choose to create
              one, we collect your email address and a hashed password via
              Firebase Authentication. Account data is used solely to sync your
              Pro subscription entitlement and is never sold.
            </p>

            <p className="font-semibold text-white">B. Library and Reading Data</p>
            <p>
              Books you import (PDF, EPUB, DOCX, TXT) are stored locally on your
              device in a Room database. We do not upload or store your books on
              our servers. Reading progress, word position, quiz scores, and
              spaced-repetition scheduling data are stored on your device only.
            </p>

            <p className="font-semibold text-white">C. AI Feature Processing (Book Text Off-Device)</p>
            <p>
              When you use the <strong className="text-white">AI Summarize</strong> or{" "}
              <strong className="text-white">AI Quiz</strong> features, up to
              4,000 words of your book text are sent over an encrypted HTTPS
              connection to our backend server hosted on Render, and from there
              to Anthropic&apos;s Claude API for processing. Specifically:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">What is sent:</strong> A plain-text excerpt of the book
                you are currently reading (maximum 4,000 words). No account
                data, device identifiers, or personal information is included in
                this request.
              </li>
              <li>
                <strong className="text-white">What is NOT stored:</strong> Neither our server nor
                Anthropic retains the book text after the response is returned.
                Requests are processed in memory and discarded.
              </li>
              <li>
                <strong className="text-white">Third party:</strong> Anthropic, PBC processes the
                text under its own{" "}
                <a
                  className="text-primary hover:text-white underline"
                  href="https://www.anthropic.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                . Anthropic does not train its models on API inputs by default.
              </li>
              <li>
                <strong className="text-white">AI features are optional.</strong> If you do not tap
                Summarize or Quiz, no book text ever leaves your device. The app
                is fully functional without these features.
              </li>
            </ul>

            <p className="font-semibold text-white">D. Crash Reports and Analytics</p>
            <p>
              We use Firebase Crashlytics and Firebase Analytics (Google LLC) to
              receive anonymous crash reports and aggregate usage metrics. These
              services may collect:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Device model, OS version, and app version at time of crash</li>
              <li>
                Stack traces (code-level error information, no book content or
                personal data)
              </li>
              <li>
                Aggregate event counts (e.g., feature usage frequency) — no
                personally identifiable information
              </li>
            </ul>
            <p>
              Firebase Analytics data is governed by{" "}
              <a
                className="text-primary hover:text-white underline"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>

            <p className="font-semibold text-white">E. Purchase Data</p>
            <p>
              BADGR Bolt Pro is sold through Google Play Billing. All payment
              processing is handled entirely by Google. We do not receive, store,
              or process your payment card details. We receive only a
              subscription entitlement token to verify Pro status.
            </p>
          </PolicySection>

          <PolicySection title="2. Data We Do NOT Collect">
            <ul className="list-disc space-y-2 pl-6">
              <li>We do not collect your name, address, or phone number.</li>
              <li>We do not read, upload, or store the books in your library.</li>
              <li>
                We do not sell, rent, or share personal information with
                advertisers.
              </li>
              <li>We do not run in-app advertising.</li>
              <li>We do not track your location.</li>
              <li>
                We do not access your contacts, camera, microphone, or other
                device sensors.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How Data Is Shared">
            <p>We share data only with the following parties and only as described:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">Anthropic, PBC</strong> — receives
                book text excerpts when you use AI Summarize or AI Quiz. Text is
                processed and discarded; not retained or used for model training
                without consent.
              </li>
              <li>
                <strong className="text-white">Google LLC (Firebase)</strong> —
                receives anonymous crash reports and aggregate usage metrics via
                Crashlytics and Analytics.
              </li>
              <li>
                <strong className="text-white">Google LLC (Play Billing)</strong>{" "}
                — processes in-app purchases and subscription status.
              </li>
              <li>
                <strong className="text-white">Render, Inc.</strong> — hosts our
                backend API server. Book text excerpts pass through Render&apos;s
                infrastructure in transit only, encrypted via TLS. Render does
                not log or store request payloads.
              </li>
            </ul>
            <p>
              We do not share data with any other third parties. We may disclose
              information if required by law, court order, or to protect the
              safety of users and the public.
            </p>
          </PolicySection>

          <PolicySection title="4. Data Storage and Security">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                All on-device data (books, reading progress, quiz history) is
                stored in an encrypted SQLite database managed by Android&apos;s Room
                library. It is accessible only to BADGR Bolt and does not leave
                your device.
              </li>
              <li>
                All network communication uses HTTPS/TLS 1.2 or higher. Cleartext
                traffic is blocked in production builds.
              </li>
              <li>
                If you create an account, your password is hashed by Firebase
                Authentication and never transmitted or stored in plaintext.
              </li>
              <li>
                Reading preferences (WPM, fonts, themes) are backed up to your
                Google account via Android Backup Service. Book content is
                excluded from backups.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Children's Privacy">
            <p>
              BADGR Bolt is not directed to children under 13. We do not
              knowingly collect personal information from children under 13. If
              you believe a child under 13 has provided personal information,
              contact us at{" "}
              <a
                className="text-primary hover:text-white"
                href="mailto:privacy@badgrtech.com"
              >
                privacy@badgrtech.com
              </a>{" "}
              and we will delete it promptly.
            </p>
          </PolicySection>

          <PolicySection title="6. Your Rights and Choices">
            <p>
              Depending on your location and applicable law (including GDPR,
              CCPA, and similar frameworks), you may have the right to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">Access</strong> the personal data
                we hold about you (primarily your account email, if applicable).
              </li>
              <li>
                <strong className="text-white">Delete</strong> your account and
                associated data — use the Delete Account option in the app&apos;s
                Account screen, or email us.
              </li>
              <li>
                <strong className="text-white">Opt out of AI processing</strong>{" "}
                — simply do not use the Summarize or Quiz features. No book text
                ever leaves your device if you don&apos;t trigger these features.
              </li>
              <li>
                <strong className="text-white">Opt out of Analytics</strong> —
                use Android&apos;s system-level "Opt out of Ads Personalization"
                setting, which is respected by Firebase Analytics.
              </li>
              <li>
                <strong className="text-white">Portability</strong> — your books
                are stored as local files on your device and are fully accessible
                through Android&apos;s file system.
              </li>
            </ul>
            <p>
              To exercise any right, email{" "}
              <a
                className="text-primary hover:text-white"
                href="mailto:privacy@badgrtech.com"
              >
                privacy@badgrtech.com
              </a>
              . We respond within 30 days.
            </p>
          </PolicySection>

          <PolicySection title="7. Data Retention">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">On-device data</strong> is retained
                until you uninstall the app or use the Delete Account / delete
                book functions within the app.
              </li>
              <li>
                <strong className="text-white">Account data</strong> (email) is
                retained until you delete your account. Deletion is immediate
                and permanent.
              </li>
              <li>
                <strong className="text-white">AI request data</strong> (book text
                excerpts) is not retained — it is processed in memory and
                discarded immediately after the response is generated.
              </li>
              <li>
                <strong className="text-white">Crash and analytics data</strong>{" "}
                is retained by Firebase per Google&apos;s standard retention schedule
                (up to 90 days for Crashlytics, up to 14 months for Analytics by
                default).
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="8. International Users">
            <p>
              BADGR Bolt is operated from the United States. If you are located
              in the European Economic Area (EEA), United Kingdom, or other
              jurisdictions with data protection laws, please be aware that your
              data may be processed in the United States. By using the app, you
              consent to this transfer. We rely on the following legal bases
              under GDPR for processing:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">Contract performance</strong> — to
                deliver the app features you requested (e.g., processing a
                Summarize or Quiz request).
              </li>
              <li>
                <strong className="text-white">Legitimate interests</strong> — to
                maintain app security and stability (crash reporting).
              </li>
              <li>
                <strong className="text-white">Consent</strong> — for optional
                account creation and AI features.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="9. Changes to This Policy">
            <p>
              We may update this policy when we add new features or when
              applicable law changes. When we do, we will update the effective
              date above. Significant changes will be communicated via an in-app
              notice. Continued use of the app after changes constitutes
              acceptance.
            </p>
          </PolicySection>

          <PolicySection title="10. Contact">
            <p>
              BADGRTechnologies LLC
              <br />
              8735 Dunwoody Place, Suite N
              <br />
              Atlanta, GA 30350
            </p>
            <p>
              Privacy questions:{" "}
              <a
                className="text-primary hover:text-white"
                href="mailto:privacy@badgrtech.com"
              >
                privacy@badgrtech.com
              </a>
              <br />
              General:{" "}
              <a
                className="text-primary hover:text-white"
                href="mailto:hello@badgrtech.com"
              >
                hello@badgrtech.com
              </a>
            </p>
            <p className="text-sm text-zinc-500">
              For data deletion requests, include "Data Deletion Request –
              BADGR Bolt" in the subject line along with the email address
              associated with your account (if any).
            </p>
          </PolicySection>

          <div className="mt-12 border-t border-primary/20 pt-6 flex flex-wrap gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-white"
            >
              BADGRTechnologies Company Privacy Policy
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
