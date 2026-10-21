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
  telephone: "+14707917361",
  email: "adgrant1@badgrtech.com",
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
    "Website Optimization",
    "Website Maintenance",
    "Website Performance",
    "Core Web Vitals",
    "On-Page SEO",
    "Google Business Profile",
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
};

// ─── Service entities ────────────────────────────────────────────────────────

export const webOptimizationService = {
  "@type": "Service",
  "@id": `${BASE_URL}/#service-web-optimization`,
  name: "Website Tune-Up and Care",
  description:
    "Website fixes for local businesses: mobile speed and layout, page titles and descriptions, broken links, contact-form checks, and Google Business Profile hours and links. Public-facing pages only.",
  provider: { "@id": ORG_ID },
  category: "Website Optimization",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Gwinnett County, Georgia" },
    { "@type": "City", name: "Atlanta" },
    { "@type": "Country", name: "United States" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website Tune-Up and Care",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Free Website Check",
        description:
          "A quick review of one public page, with up to three observed issues sent by email. Not a full audit.",
        price: "0",
        priceCurrency: "USD",
        url: `${BASE_URL}/#pricing`,
        seller: { "@id": ORG_ID },
      },
      {
        "@type": "Offer",
        name: "Website Tune-Up",
        description:
          "Agreed improvements on one existing website, up to three public pages, with a before/after report. Delivered five business days after scope approval, payment, and access.",
        price: "349",
        priceCurrency: "USD",
        url: `${BASE_URL}/#pricing`,
        seller: { "@id": ORG_ID },
      },
      {
        "@type": "Offer",
        name: "Care Essential",
        description:
          "Uptime checks, routine maintenance, backup or recovery check, a monthly report, and 30 minutes of service time each month.",
        price: "79",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "79",
          priceCurrency: "USD",
          unitCode: "MON",
          billingDuration: "P1M",
        },
        url: `${BASE_URL}/#pricing`,
        seller: { "@id": ORG_ID },
      },
    ],
  },
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
