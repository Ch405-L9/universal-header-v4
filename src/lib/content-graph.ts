/**
 * Content Knowledge Graph — BADGRTechnologies LLC
 *
 * Pillar → Cluster → Node hierarchy.
 * Each node maps to: intent stage, page anchor, schema type, and internal link target.
 * Used by schema builders, FAQ expansion, and future routed content pages.
 */

export type IntentStage = "informational" | "commercial" | "transactional";

export interface ContentNode {
  id: string;
  title: string;
  bluf: string; // Bottom Line Up Front — answer in one sentence
  anchor: string; // in-page anchor or route
  intent: IntentStage;
  entities: string[]; // schema.org entity IDs this node is about
  internalLinks: string[]; // node IDs this links to
}

export interface ContentCluster {
  id: string;
  pillar: string;
  nodes: ContentNode[];
}

// ─── Pillar 1: Web Optimization ─────────────────────────────────────────────

export const webOptimizationCluster: ContentCluster = {
  id: "web-optimization",
  pillar: "Website Optimization for Local Businesses",
  nodes: [
    {
      id: "why-medical-sites-lose-trust",
      title: "Why Local Business Websites Lose Customers Quietly",
      bluf: "Most local business websites lose calls and inquiries through slow mobile pages, unclear contact paths, broken links, and forms that fail without anyone noticing.",
      anchor: "#services",
      intent: "informational",
      entities: ["https://badgrtech.com/#service-web-optimization"],
      internalLinks: ["what-web-optimization-means", "diagnostic-scan"],
    },
    {
      id: "what-web-optimization-means",
      title: "What Website Optimization Actually Means",
      bluf: "Website optimization is not a redesign. It means fixing the specific friction points that stop customers from reading, calling, or sending a request.",
      anchor: "#services",
      intent: "informational",
      entities: ["https://badgrtech.com/#service-web-optimization"],
      internalLinks: ["how-badgr-fixes-it", "which-package"],
    },
    {
      id: "how-badgr-fixes-it",
      title: "How BADGRTech Fixes Website Friction",
      bluf: "We check, prioritize, and fix the highest-impact issues in a fixed, written scope: speed, mobile layout, contact paths, page titles and descriptions, and broken links.",
      anchor: "#proof",
      intent: "commercial",
      entities: ["https://badgrtech.com/#service-web-optimization", "https://badgrtech.com/#org"],
      internalLinks: ["which-package", "medical-site-triage"],
    },
    {
      id: "which-package",
      title: "Which Web Optimization Package Is Right for You",
      bluf: "Start with a free website check. The $349 Website Tune-Up covers up to three public pages; Care Essential is $79/month. Larger scopes are quoted after the check.",
      anchor: "#pricing",
      intent: "commercial",
      entities: ["https://badgrtech.com/#service-web-optimization"],
      internalLinks: ["medical-site-triage"],
    },
    {
      id: "medical-site-triage",
      title: "Request a Free Website Check",
      bluf: "A quick review of one public page, with up to three observed issues sent by email, before any paid work begins.",
      anchor: "/website-check#scan-form",
      intent: "transactional",
      entities: ["https://badgrtech.com/#org"],
      internalLinks: [],
    },
  ],
};

// ─── Pillar 2: AI Consultation ───────────────────────────────────────────────

export const aiConsultationCluster: ContentCluster = {
  id: "ai-consultation",
  pillar: "AI Consultation & Integration for Small Businesses",
  nodes: [
    {
      id: "what-ai-integration-means-smb",
      title: "What AI Integration Actually Means for Small Businesses",
      bluf: "AI integration for SMBs means automating specific repeatable workflows — not replacing staff — using tools your team can actually operate without a data science background.",
      anchor: "#ai-solutions",
      intent: "informational",
      entities: ["https://badgrtech.com/#service-ai-consultation"],
      internalLinks: ["ai-consultation-process"],
    },
    {
      id: "ai-consultation-process",
      title: "How the AI Consultation Works",
      bluf: "We identify your highest-friction workflows, map them to available AI tools, build a deployment plan, and stay through implementation so it actually gets used.",
      anchor: "#ai-solutions",
      intent: "commercial",
      entities: ["https://badgrtech.com/#service-ai-consultation", "https://badgrtech.com/#org"],
      internalLinks: ["medical-site-triage"],
    },
  ],
};

// ─── Full cluster map ─────────────────────────────────────────────────────────

export const contentGraph: ContentCluster[] = [
  webOptimizationCluster,
  aiConsultationCluster,
];

// ─── HowTo steps for the optimization process ────────────────────────────────

export const optimizationHowTo = {
  name: "How a BADGRTechnologies Website Tune-Up Works",
  description: "A fixed-scope process: a free website check, a written scope, then the agreed fixes and a brief before/after report.",
  steps: [
    {
      name: "Request a Free Website Check",
      text: "Share your website address and main concern. We review one public page and email up to three issues we observed.",
      url: "https://badgrtech.com/#triage-form",
    },
    {
      name: "Approve a Written Scope and Price",
      text: "Access, exclusions, and timing are confirmed before work starts. Full payment is due after scope approval; deposits are available on request.",
      url: "https://badgrtech.com/#pricing",
    },
    {
      name: "Receive the Agreed Improvements and Report",
      text: "We complete the agreed fixes and send a brief before/after report. Ongoing care is optional.",
      url: "https://badgrtech.com/#pricing",
    },
  ],
};

// ─── Full FAQ — informational → commercial → transactional ──────────────────

export const fullFaqs: { question: string; answer: string; intent: IntentStage }[] = [
  {
    intent: "informational",
    question: "Who is this for?",
    answer:
      "Local businesses with slow or awkward mobile websites, unclear information, broken links, or inquiry problems. Medical, dental, therapy, home-service, and other local businesses are welcome.",
  },
  {
    intent: "commercial",
    question: "What does the free website check include?",
    answer:
      "A quick review of one public page, with up to three issues we observed, sent by email. It is written to read in about two minutes. No account access is needed, and it is not a full technical audit.",
  },
  {
    intent: "commercial",
    question: "How long does a Tune-Up take?",
    answer:
      "Five business days. The clock starts once the written scope is approved, payment is received, and any needed access and materials are in place. Our delivery windows include time for testing and unexpected technical issues. If the scope changes or a delay comes from you or a third party, we confirm a revised date with you.",
  },
  {
    intent: "commercial",
    question: "What do you need from me?",
    answer:
      "Your website address, your main concern, and permission to make the agreed changes. Some work needs a platform invitation or business details. Please do not email passwords or patient information; we arrange access separately. Any platform is welcome for review, and we confirm technical fit before you pay.",
  },
  {
    intent: "commercial",
    question: "What is not included?",
    answer:
      "Hosting fees, paid tools, major repairs, rebuilds, extensive content writing, checkout or payment-system changes, patient-data workflows, and legal or compliance assessments, unless separately agreed. Care does not include 24/7 response or unlimited repairs. Extra work is quoted and approved before it starts. We do not promise search rankings, specific scores, or AI recommendations.",
  },
  {
    intent: "transactional",
    question: "Can I cancel Care Essential?",
    answer:
      "Yes. Cancel online at https://billing.stripe.com/p/login/dRmfZggxI4JV4C75By6c000 or email adgrant1@badgrtech.com before your next renewal date to stop the next charge. Care is billed monthly in advance, and service continues through the paid month. There are no prorated refunds, and unused time does not roll over.",
  },
  {
    intent: "transactional",
    question: "How do I pay?",
    answer:
      "Full payment is due after the written scope is approved, before work begins, by card or Cash App Pay through Stripe. Deposits are available on request.",
  },
  {
    intent: "transactional",
    question: "How do I get started?",
    answer:
      "Request a free website check with the form on this page, or email adgrant1@badgrtech.com or call (470) 791-7361. We follow up within one business day.",
  },
];
