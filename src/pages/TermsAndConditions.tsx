import { ArrowLeft, Scale } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/lib/seo";

function TermsSection({
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

export default function TermsAndConditions() {
  usePageMeta({
    title: "Terms & Conditions | BADGRTechnologies",
    description:
      "Review the BADGRTechnologies terms covering website use, service scope, project agreements, and liability boundaries.",
  });

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="border-b border-primary/20 bg-[#020816]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-none border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary">
              <Scale className="h-4 w-4" />
              Terms & Conditions
            </div>
            <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.04em] text-white md:text-6xl">
              BADGRTechnologies LLC Terms & Conditions
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              These terms govern use of the BADGRTechnologies LLC website and
              the web optimization and related website support services we
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
            By using this website or engaging BADGRTechnologies LLC for
            services, you agree to these Terms & Conditions. Project-specific
            proposals, statements of work, invoices, and written agreements may
            supplement or override parts of these general terms where stated.
          </p>

          <TermsSection title="1. Use of Site">
            <p>
              You may use this website for lawful informational and business
              purposes only. You agree not to misuse the site, interfere with
              its operation, scrape protected content unlawfully, or use it in a
              way that harms BADGRTechnologies LLC or other users.
            </p>
          </TermsSection>

          <TermsSection title="2. Service Scope and Agreements">
            <p>
              BADGRTechnologies LLC may provide services including website
              reviews, web optimization, content and visibility support,
              rebuild recommendations, analytics support, and related technical
              advisory work.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Final project scope, deliverables, timelines, and pricing are
                defined in proposals, statements of work, or invoices.
              </li>
              <li>
                Any estimate or timeline is best-effort and may change when
                scope, approvals, dependencies, or client-provided inputs
                change.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="3. Client Responsibilities">
            <p>Clients agree to provide reasonably necessary cooperation, such as:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Accurate project information and working contact details.</li>
              <li>Timely approvals, content, account access, and feedback.</li>
              <li>
                Lawful rights to any materials, data, trademarks, or content
                provided for use in a project.
              </li>
              <li>
                Review of final deliverables before launch or production use.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="4. Payments and Refunds">
            <p>
              Payment terms are governed by the applicable quote, invoice, or
              service agreement. Unless otherwise stated:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Deposits or milestone payments may be required.</li>
              <li>
                Late payments may result in paused work, delayed delivery, or
                additional fees where permitted.
              </li>
              <li>
                Refunds, if any, are governed by the signed scope and the work
                completed to date.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="5. Intellectual Property">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                BADGRTechnologies LLC retains ownership of pre-existing tools,
                frameworks, internal methods, and reusable know-how.
              </li>
              <li>
                Custom deliverables may be licensed or assigned according to the
                relevant project agreement after payment obligations are met.
              </li>
              <li>
                Third-party tools, APIs, themes, libraries, models, and
                platforms remain subject to their own licenses and restrictions.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="6. Third-Party Tool Disclaimer">
            <p>
              Recommendations involving third-party tools, platforms, plugins,
              or integrations are provided using commercially reasonable
              judgment, but outside vendors can change features, pricing,
              availability, or behavior without notice.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Clients remain responsible for final business decisions, legal
                compliance, and review of sensitive outputs or configurations.
              </li>
              <li>
                Production use of third-party systems should include appropriate
                oversight, access controls, and data handling rules.
              </li>
              <li>
                BADGRTechnologies LLC does not guarantee that any third-party
                service will be error-free, uninterrupted, or complete for every
                use case.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="7. Web Performance and Launch Disclaimer">
            <p>
              Web optimization and development work is designed to improve site
              performance, usability, and conversion readiness, but final
              results may depend on hosting, third-party scripts, legacy systems,
              client content choices, and post-launch maintenance.
            </p>
          </TermsSection>

          <TermsSection title="8. Confidentiality">
            <p>
              Each party should protect confidential information shared during
              the relationship using reasonable care. This does not apply to
              information that is already public, independently developed, or
              required to be disclosed by law.
            </p>
          </TermsSection>

          <TermsSection title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, BADGRTechnologies LLC is
              not liable for indirect, incidental, special, punitive, or
              consequential damages, including lost profits, lost data, or
              business interruption.
            </p>
            <p>
              Aggregate liability arising from a claim related to this site or
              services is limited to the amount paid to BADGRTechnologies LLC
              for the relevant services in the twelve months before the claim,
              unless a different limit is required by law or agreed in writing.
            </p>
          </TermsSection>

          <TermsSection title="10. Third-Party Tools and Services">
            <p>
              Work may involve third-party vendors such as hosting providers,
              analytics services, payment processors, content tools, or
              communication systems. Those providers remain governed by their
              own terms, performance, availability, and policies.
            </p>
          </TermsSection>

          <TermsSection title="11. Termination">
            <p>
              Either party may terminate a service relationship in accordance
              with the applicable project agreement. Termination does not erase
              payment obligations for work already completed, nor does it remove
              obligations that should survive, such as confidentiality, payment,
              ownership, and liability clauses.
            </p>
          </TermsSection>

          <TermsSection title="12. Governing Law">
            <p>
              These terms are governed by the laws of the State of Georgia,
              without regard to conflict-of-law principles, unless another
              governing-law clause is expressly agreed in writing.
            </p>
          </TermsSection>

          <TermsSection title="13. Contact">
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
              Legal: <a className="text-primary hover:text-white" href="mailto:hello@badgrtech.com">hello@badgrtech.com</a>
            </p>
          </TermsSection>

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
