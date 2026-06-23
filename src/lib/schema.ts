const BASE_URL = "https://badgrtech.com";
const ORG_ID = `${BASE_URL}/#org`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const LOGO_URL = `${BASE_URL}/images/badgrtech-logo.avif`;
const IMAGE_URL = `${BASE_URL}/images/badgrtech-logo.avif`;

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
    "Medical Website Optimization",
    "HIPAA-Aware Website Operations",
    "Practice Care",
    "Website Performance",
    "WCAG Accessibility",
    "Local SEO for Medical Practices",
  ],
  sameAs: [
    "https://www.instagram.com/badgrtech/",
    "https://www.linkedin.com/company/109228065/",
    "https://www.youtube.com/channel/UCAbCRiyUh3JTUIrj8l9ADow",
    "https://www.tiktok.com/@badgr.25?lang=en",
    "https://x.com/40n33Ba6R",
    "https://www.facebook.com/profile.php?id=61581099610296",
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
  name: "Medical Website Optimization and Practice Care",
  description:
    "HIPAA-aware website operations for small medical practices. Covers speed, mobile booking paths, public-form risk checks, trust signals, accessibility basics, and local visibility.",
  provider: { "@id": ORG_ID },
  category: "Medical Website Operations",
  areaServed: { "@type": "City", name: "Atlanta" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Medical Website Optimization Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Medical Risk & Trust Scan",
        description:
          "A focused review for cash-pay and hybrid medical practice owners who need a clear outside view before committing to implementation work.",
        price: "750",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/InvoicePrice" },
        url: `${BASE_URL}/#services`,
        seller: { "@id": ORG_ID },
      },
      {
        "@type": "Offer",
        name: "14-Day Leak & Trust Fix Sprint",
        description:
          "Scan, fix, and prove the highest-impact issues blocking patient calls, appointment requests, form confidence, and trust within a 14-day work window.",
        price: "2500",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/InvoicePrice" },
        url: `${BASE_URL}/#services`,
        seller: { "@id": ORG_ID },
      },
      {
        "@type": "Offer",
        name: "Medical Conversion Rebuild Lite",
        description:
          "A conversion-first refresh for medical practice sites that need more than patchwork fixes but not a large agency rebuild.",
        price: "6500",
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
  url: `${BASE_URL}/ai-consulting`,
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
