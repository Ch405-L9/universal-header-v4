const BASE_URL = "https://badgrtech.com";
const ORG_ID = `${BASE_URL}/#org`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const LOGO_URL =
  "https://res.cloudinary.com/dsxpcwjwb/image/upload/w_400,f_auto,q_80/v1776452124/official_badgr-logo_mfsyri.png";
const IMAGE_URL =
  "https://res.cloudinary.com/dsxpcwjwb/image/upload/w_800,f_auto,q_80/v1776452124/official_badgr-logo_mfsyri.png";

// ─── Base entities (shared across all pages) ────────────────────────────────

export const orgEntity = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORG_ID,
  name: "BADGRTechnologies LLC",
  legalName: "BADGRTechnologies LLC",
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 400, height: 400 },
  image: IMAGE_URL,
  telephone: "+14702236127",
  email: "hello@badgrtech.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8735 Dunwoody Place, Suite N",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    postalCode: "30350",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.9701,
    longitude: -84.3307,
  },
  areaServed: [
    { "@type": "City", name: "Atlanta", "@id": "https://www.wikidata.org/wiki/Q23556" },
    { "@type": "State", name: "Georgia" },
  ],
  knowsAbout: [
    "Web Optimization",
    "AI Consultation",
    "Lead Generation",
    "Small Business Marketing",
    "Website Performance",
  ],
  sameAs: [
    "https://www.instagram.com/badgrtech/",
    "https://www.linkedin.com/company/109228065/",
    "https://www.youtube.com/channel/UCAbCRiyUh3JTUIrj8l9ADow",
    "https://www.tiktok.com/@badgrtech2.5",
    "https://x.com/40n33Ba6R",
    "https://www.facebook.com/profile.php?id=61581099610296",
    "https://github.com/Ch405-L9",
  ],
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: BASE_URL,
  name: "BADGRTechnologies",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

// ─── Service entities ────────────────────────────────────────────────────────

export const webOptimizationService = {
  "@type": "Service",
  "@id": `${BASE_URL}/#service-web-optimization`,
  name: "Web Optimization",
  description:
    "Fix website friction killing calls, form fills, and trust for small service businesses. Covers performance, CTA flow, mobile UX, and trust signals.",
  provider: { "@id": ORG_ID },
  category: "Web Optimization",
  areaServed: { "@type": "City", name: "Atlanta" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Optimization Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Diagnostic Scan",
        description:
          "A focused review for owners who need a clear outside view before committing to implementation work. Report delivered by end of week.",
        price: "1500",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/InvoicePrice" },
        url: `${BASE_URL}/#services`,
        seller: { "@id": ORG_ID },
      },
      {
        "@type": "Offer",
        name: "14-Day Lead Leak Fix",
        description:
          "Scan, fix, and prove the highest-impact issues killing calls, forms, and trust. Report by end of week — full fix window completes within 14 days.",
        price: "3000",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/InvoicePrice" },
        url: `${BASE_URL}/#services`,
        seller: { "@id": ORG_ID },
      },
      {
        "@type": "Offer",
        name: "Rebuild Lite",
        description:
          "A conversion-first refresh for businesses whose current site needs more than patchwork fixes but not a full custom rebuild.",
        price: "4500",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/InvoicePrice" },
        url: `${BASE_URL}/#services`,
        seller: { "@id": ORG_ID },
      },
    ],
  },
};

export const aiConsultationService = {
  "@type": "Service",
  "@id": `${BASE_URL}/#service-ai-consultation`,
  name: "AI Consultation & Integration",
  description:
    "AI strategy, workflow automation, and integration consulting for small and mid-size businesses ready to operationalize AI tools.",
  provider: { "@id": ORG_ID },
  category: "AI Consulting",
  areaServed: { "@type": "Country", name: "United States" },
  url: `${BASE_URL}/#ai-solutions`,
};

// ─── Page-level schema builders ──────────────────────────────────────────────

export function buildWebPageSchema(opts: {
  id: string;
  name: string;
  description: string;
  url: string;
  breadcrumb?: { name: string; url: string }[];
}) {
  const schema: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": opts.id,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
  if (opts.breadcrumb) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: opts.breadcrumb.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }
  return schema;
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

// ─── Graph assembler ─────────────────────────────────────────────────────────

export function buildGraph(...entities: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": entities,
  };
}
