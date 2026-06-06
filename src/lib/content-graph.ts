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
  pillar: "Medical Website Optimization for Small Practices",
  nodes: [
    {
      id: "why-medical-sites-lose-trust",
      title: "Why Medical Practice Websites Lose Patient Trust Silently",
      bluf: "Most practice websites lose calls and appointment requests through slow mobile pages, unclear booking paths, weak trust signals, and public-form risk that patients feel but never explain.",
      anchor: "#services",
      intent: "informational",
      entities: ["https://badgrtech.com/#service-web-optimization"],
      internalLinks: ["what-web-optimization-means", "diagnostic-scan"],
    },
    {
      id: "what-web-optimization-means",
      title: "What Medical Website Optimization Actually Means",
      bluf: "Medical website optimization is not just a redesign — it is fixing the specific friction points that stop patients from calling, booking, trusting, or submitting safe business-only information.",
      anchor: "#services",
      intent: "informational",
      entities: ["https://badgrtech.com/#service-web-optimization"],
      internalLinks: ["how-badgr-fixes-it", "which-package"],
    },
    {
      id: "how-badgr-fixes-it",
      title: "How BADGRTech Fixes Medical Website Risk and Friction",
      bluf: "We scan, prioritize, and fix the highest-impact issues in a fixed scope — speed, mobile UX, booking flow, trust signals, accessibility, and no-PHI form safety — then deliver a Risk & Trust report.",
      anchor: "#proof",
      intent: "commercial",
      entities: ["https://badgrtech.com/#service-web-optimization", "https://badgrtech.com/#org"],
      internalLinks: ["which-package", "medical-site-triage"],
    },
    {
      id: "which-package",
      title: "Which Web Optimization Package Is Right for You",
      bluf: "Medical Risk & Trust Scan for owners who need clarity first. 14-Day Leak & Trust Fix Sprint for owners ready to act. Medical Conversion Rebuild Lite for sites too broken to patch.",
      anchor: "#pricing",
      intent: "commercial",
      entities: ["https://badgrtech.com/#service-web-optimization"],
      internalLinks: ["medical-site-triage"],
    },
    {
      id: "medical-site-triage",
      title: "Request a Medical Site Triage Call",
      bluf: "A low-friction triage request to identify speed, mobile, trust, no-PHI form, and patient-flow issues before any paid work begins.",
      anchor: "/free-lighthouse-scan#scan-form",
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
  name: "How BADGRTechnologies Optimizes a Medical Practice Website",
  description: "A fixed-scope process to identify and fix the website friction blocking patient calls, appointment requests, form confidence, and trust for small medical practices.",
  steps: [
    {
      name: "Request a Medical Site Triage Call",
      text: "Share business contact details and the website URL so we can review public speed, mobile, trust, no-PHI form, and patient-flow signals before any paid work begins.",
      url: "https://badgrtech.com/free-lighthouse-scan#scan-form",
    },
    {
      name: "Receive Your Medical Risk & Trust Scan",
      text: "We scan your site for the friction points most likely to block patient calls and appointment requests: load speed, mobile flow, booking clarity, trust signals, accessibility basics, and form safety.",
      url: "https://badgrtech.com/#proof",
    },
    {
      name: "Review the Before-and-After Report",
      text: "Every fix is documented with a clear before-and-after view so you can see exactly what changed and why it matters to patient trust.",
      url: "https://badgrtech.com/sample-report",
    },
    {
      name: "Implement Fixes Within the Agreed Scope",
      text: "For the 14-Day Leak & Trust Fix Sprint and Medical Conversion Rebuild Lite packages, we implement the prioritized fixes within the agreed timeline — not an open-ended retainer.",
      url: "https://badgrtech.com/#pricing",
    },
  ],
};

// ─── Full FAQ — informational → commercial → transactional ──────────────────

export const fullFaqs: { question: string; answer: string; intent: IntentStage }[] = [
  // Informational
  {
    intent: "informational",
    question: "Why is my website not generating calls or form fills?",
    answer:
      "Most medical practice websites lose patients not from bad design but from hidden friction: pages that load slowly on mobile, calls to action that are buried or vague, forms that feel unsafe or confusing, and trust signals that are missing or unconvincing. Visitors feel the friction and leave without explaining why.",
  },
  {
    intent: "informational",
    question: "What is web optimization and how is it different from a redesign?",
    answer:
      "Web optimization is the targeted fix of the specific issues blocking patient action — speed, booking flow, mobile experience, trust signals, accessibility basics, and form clarity — without rebuilding the site from scratch. A redesign changes how the site looks. Optimization changes how well it supports patient decisions.",
  },
  {
    intent: "informational",
    question: "How do I know if my medical website has a trust or booking problem?",
    answer:
      "Signs include traffic that does not convert to calls, high bounce rates on mobile, a contact form that rarely gets submissions, buried privacy or NPP links, and pages that take more than three seconds to load. Any one of these can cost patient inquiries every day.",
  },
  // Commercial
  {
    intent: "commercial",
    question: "What do you usually fix first?",
    answer:
      "We start with the issues most likely to block patient calls, appointment requests, form confidence, and trust: speed, mobile friction, weak calls to action, broken form flow, missing NPP/privacy links, and missing clarity on the most important pages.",
  },
  {
    intent: "commercial",
    question: "What if the site really needs a rebuild?",
    answer:
      "We will say that directly. If the right move is a lighter rebuild instead of piecemeal fixes, the report will spell that out so you are not paying to over-patch a site that cannot carry the load.",
  },
  {
    intent: "commercial",
    question: "What is included in the before-and-after report?",
    answer:
      "The report documents every issue found, the priority ranking, what was fixed, and a side-by-side view of the before and after state for each change. It is designed to be readable by a business owner, not a developer.",
  },
  {
    intent: "commercial",
    question: "Do you also handle SEO or social media?",
    answer:
      "Yes, but only as follow-on support after the website itself is in a stronger place. The core offer here is medical website optimization first. A site that does not support patient trust is not ready to receive more traffic from SEO or paid ads.",
  },
  {
    intent: "commercial",
    question: "Do you work only with medical practices?",
    answer:
      "Medical practices are the primary fit because they rely heavily on inbound trust signals, careful public-form handling, booking clarity, and local visibility. We may support adjacent service businesses when the scope matches.",
  },
  {
    intent: "commercial",
    question: "What does the AI consultation cover?",
    answer:
      "We identify your highest-friction business workflows, map them to AI tools your team can actually operate, and build a deployment plan. Then we stay through implementation — not just the deck.",
  },
  // Transactional
  {
    intent: "transactional",
    question: "How quickly can a project start?",
    answer:
      "Most projects begin with a short triage call. From there we confirm fit, scope, and timing before the scan or 14-day engagement begins. Many clients are scoped and started within the same week.",
  },
  {
    intent: "transactional",
    question: "What happens on the triage call?",
    answer:
      "It is a 15-minute call to understand your site, your goals, and the biggest friction points you are aware of. We use it to confirm fit and decide which package makes sense — no obligation and no sales pitch.",
  },
  {
    intent: "transactional",
    question: "How do I get started?",
    answer:
      "Submit your site URL in the triage form above or book a 15-minute triage call directly. We will follow up within one business day to confirm next steps.",
  },
];
