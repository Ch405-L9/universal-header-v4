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
              Effective Date: January 1, 2025
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl md:p-12">
          <p className="mb-10 text-lg leading-8 text-zinc-300">
            BADGRTechnologies LLC ("BADGRTechnologies," "we," "our," or "us")
            values privacy, security, and responsible technology practices. We
            aim to collect only the information reasonably needed to provide web
            optimization, related website support, and to operate this website
            safely.
          </p>

          <PolicySection title="1. Information We Collect">
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Contact details you provide, such as name, email, phone number,
                company name, and project information.
              </li>
              <li>
                Project-related information shared during website reviews, web
                optimization work, follow-on support discussions, or related
                service inquiries.
              </li>
              <li>
                Technical data such as IP address, browser type, device
                information, and general usage diagnostics.
              </li>
              <li>
                Performance, security, and analytics data used to maintain and
                improve the website.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="2. How We Use Information">
            <p>We may use information to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to inquiries and schedule triage calls.</li>
              <li>
                Deliver web optimization and related website support services.
              </li>
              <li>
                Improve performance, reliability, and security of our website
                and client-facing systems.
              </li>
              <li>
                Prepare proposals, statements of work, invoices, documentation,
                and support follow-up.
              </li>
              <li>Detect, prevent, and investigate misuse or fraud.</li>
              <li>Comply with legal, accounting, and tax obligations.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Optional Third-Party Tool Use and Data Handling">
            <p>
              When third-party tools are proposed or used as part of a project,
              we aim to be explicit about what they do, what type of data they
              may process, and what level of human review remains in place.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                We prefer data minimization and ask clients to avoid sharing
                unnecessary sensitive information during exploratory stages.
              </li>
              <li>
                Tool-related recommendations are provided with practical limits,
                risks, and implementation considerations when appropriate.
              </li>
              <li>
                Final production data use, retention, and model/tool selection
                should be documented in project-specific agreements.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Sharing of Information">
            <p>
              We do not sell personal information. We may share limited data
              with trusted service providers when reasonably necessary to run our
              website or deliver services, such as hosting, payments, analytics,
              communication, or security providers.
            </p>
            <p>
              We may also disclose information if required by law, to protect
              rights and safety, or in connection with legitimate business or
              compliance needs.
            </p>
          </PolicySection>

          <PolicySection title="5. Data Security and Retention">
            <p>
              We use commercially reasonable safeguards to protect information,
              including access controls, secure tools, and operational security
              practices appropriate to a small business technology consultancy.
            </p>
            <p>
              No internet-based system is perfectly secure. We retain data only
              for as long as reasonably needed for business, project, legal,
              accounting, or security purposes.
            </p>
          </PolicySection>

          <PolicySection title="6. Your Rights and Choices">
            <p>Depending on your location and applicable law, you may be able to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Request access to or correction of your information.</li>
              <li>Request deletion of certain personal information.</li>
              <li>Opt out of marketing communications.</li>
              <li>
                Ask questions about how your information is used in connection
                with our services.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="7. Third-Party Services">
            <p>
              Our website and services may involve third-party tools such as
              payment processors, analytics platforms, hosting providers, and
              software vendors. Those third parties operate under their own
              terms and privacy practices.
            </p>
          </PolicySection>

          <PolicySection title="8. Policy Updates">
            <p>
              We may update this policy from time to time. When we do, we will
              update the effective date and publish the revised version on this
              site.
            </p>
          </PolicySection>

          <PolicySection title="9. Contact">
            <p>
              BADGRTechnologies LLC
              <br />
              8735 Dunwoody Place, Suite N
              <br />
              Atlanta, GA 30350
            </p>
            <p>
              General: <a className="text-primary hover:text-white" href="mailto:hello@badgrtech.com">hello@badgrtech.com</a>
              <br />
              Privacy: <a className="text-primary hover:text-white" href="mailto:hello@badgrtech.com">hello@badgrtech.com</a>
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
