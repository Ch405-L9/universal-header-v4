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

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy | BADGRTechnologies",
    description:
      "Read the BADGRTechnologies privacy policy covering website inquiries, project information, and service-related data handling.",
  });

  useJsonLd(
    buildGraph(
      orgEntity,
      websiteEntity,
      buildWebPageSchema({
        id: "https://badgrtech.com/privacy#page",
        name: "Privacy Policy | BADGRTechnologies",
        description:
          "Read the BADGRTechnologies privacy policy covering website inquiries, project information, and service-related data handling.",
        url: "https://badgrtech.com/privacy",
        breadcrumb: [
          { name: "Home", url: "https://badgrtech.com/" },
          { name: "Privacy Policy", url: "https://badgrtech.com/privacy" },
        ],
      }),
    ),
    "privacy-graph",
  );

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="border-b border-primary/20 bg-[#020816]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-none border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary">
              <LockKeyhole className="h-4 w-4" />
              Privacy Policy
            </div>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              BADGRTechnologies LLC Privacy Policy
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              This policy explains how BADGRTechnologies LLC collects, uses, and
              protects information when visitors interact with our website, web
              optimization services, and any related follow-on support we may
              provide.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-zinc-500">
              Effective Date: October 20, 2026
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl md:p-12">
          <p className="mb-10 text-lg leading-8 text-zinc-300">
            BADGRTechnologies LLC ("BADGRTechnologies," "we," "our," or "us")
            respects your privacy. This policy describes what we actually collect
            through this website and our website tune-up and care services, and
            how we use it.
          </p>

          <PolicySection title="1. Information We Collect">
            <p>We collect only what we need to respond to you, deliver services, and keep this site secure:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Free website check requests:</strong> your name, business name, email, phone, website URL,
                business type, the time of your request, and your confirmation of the form notice.
              </li>
              <li>
                <strong>Messages and calls:</strong> what you send us by email or phone, and project details you
                share during scoping or service.
              </li>
              <li>
                <strong>Payments:</strong> payments are processed by Stripe on Stripe-hosted checkout pages. We
                receive information such as your name, email, billing country or ZIP code, the amount, and the card
                brand and last four digits. We never see or store full card numbers.
              </li>
              <li>
                <strong>Technical data:</strong> our hosting provider processes standard server logs (such as IP
                address, browser type, and request time) to operate and protect the site. We use IP addresses briefly
                to limit form abuse.
              </li>
              <li>
                <strong>Speed previews:</strong> if you use the website speed preview, the URL you enter is sent to
                Google PageSpeed Insights to generate the score.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="2. Cookies and Similar Technologies">
            <p>
              This website does not currently use advertising, analytics, or tracking cookies, and it does not load
              third-party tracking pixels. If you change the site&apos;s display theme, that preference is stored in
              your own browser and is not sent to us.
            </p>
            <p>
              Stripe&apos;s checkout pages use cookies and similar technologies for payment processing and fraud
              prevention, under Stripe&apos;s own privacy policy.
            </p>
            <p>
              Before we add analytics or advertising tools, we will update this policy and, where the law requires
              it, ask for your consent first.
            </p>
          </PolicySection>

          <PolicySection title="3. How We Use Information">
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to free website check requests and other inquiries.</li>
              <li>Prepare scopes, deliver services, and send reports and service-related messages.</li>
              <li>Process payments, subscriptions, and billing records.</li>
              <li>Protect the site and our systems, and prevent fraud or misuse.</li>
              <li>Meet legal, accounting, and tax obligations.</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Marketing Communications">
            <p>
              We send marketing emails only where you have agreed to receive them or where the law allows. Every
              marketing email includes a way to unsubscribe, and you can opt out at any time by emailing us. Messages
              about an active service, payment, or request you made are not marketing and continue while that
              relationship is active.
            </p>
          </PolicySection>

          <PolicySection title="5. How We Share Information">
            <p>
              We do not sell personal information, and we do not share it for cross-context behavioral advertising.
              We share information only with service providers that help us run this site and deliver services, such
              as:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Vercel (website hosting)</li>
              <li>Stripe (payments and subscriptions)</li>
              <li>Resend (email delivery for form requests)</li>
              <li>Google (PageSpeed Insights, for speed previews)</li>
            </ul>
            <p>
              We may also disclose information when required by law, to protect rights and safety, or as part of a
              business transfer.
            </p>
          </PolicySection>

          <PolicySection title="6. Patient and Sensitive Information">
            <p>
              Our services cover public-facing website pages only and do not involve patient data (ePHI). Do not
              submit patient information, protected health information, passwords, medical records, or other
              confidential details through website forms or email. Account access, when a project needs it, is
              arranged separately and securely.
            </p>
          </PolicySection>

          <PolicySection title="7. Data Retention and Security">
            <p>
              We keep information only as long as needed for the purposes above, including business, tax, and
              security records. We use reasonable safeguards such as access controls and secure, reputable service
              providers. No internet system is perfectly secure.
            </p>
          </PolicySection>

          <PolicySection title="8. Your Privacy Rights">
            <p>
              Depending on where you live, you may have the right to request access to, correction of, or deletion of
              your personal information, and to opt out of marketing. To make a request, email 
              <a className="text-primary hover:text-white" href="mailto:adgrant1@badgrtech.com">adgrant1@badgrtech.com</a>. We may need to verify your
              identity, and we respond within the time the law requires. We will not discriminate against you for
              exercising your rights.
            </p>
            <p>
              Because we do not sell or share personal information for targeted advertising, browser signals such as
              Global Privacy Control and Do Not Track do not change how this site treats your data today. If that
              changes, we will honor those signals where the law requires.
            </p>
          </PolicySection>

          <PolicySection title="9. Children">
            <p>
              This website and our services are intended for businesses and adults. We do not knowingly collect
              personal information from children under 13.
            </p>
          </PolicySection>

          <PolicySection title="10. Policy Updates">
            <p>
              We may update this policy from time to time. When we do, we will change the effective date above and
              post the revised version on this page.
            </p>
          </PolicySection>

          <PolicySection title="11. Contact">
            <p>
              BADGRTechnologies LLC
              <br />
              8735 Dunwoody Place, Suite N
              <br />
              Atlanta, GA 30350
            </p>
            <p>
              Privacy requests and questions: 
              <a className="text-primary hover:text-white" href="mailto:adgrant1@badgrtech.com">adgrant1@badgrtech.com</a>
              <br />
              Phone: <a className="text-primary hover:text-white" href="tel:+14707917361">(470) 791-7361</a>
            </p>
          </PolicySection>

          <div className="mt-12 border-t border-primary/20 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
