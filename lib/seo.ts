import { COMPANY, CONTACT_EMAIL, SITE_URL } from "./site";

export const SITE_NAME = "Larzo";
export const DEFAULT_TITLE = "Larzo — AI Local Lead Finder & Website Audit Tool for Agencies";
export const DEFAULT_DESCRIPTION =
  "Find every local business in any niche and city, audit their website speed, tech stack and socials, rank them by real opportunity and get AI-written outreach grounded in evidence. Join the Larzo private beta.";

/**
 * Keyword map (researched Oct 2026). Grouped by intent; pages target one cluster each.
 * Head terms live in titles/H1s; long-tail terms live in body copy and FAQs.
 */
export const KEYWORDS = {
  core: [
    "local lead generation software",
    "lead generation tool for agencies",
    "local business leads",
    "B2B local lead finder",
    "AI sales intelligence for agencies",
    "agency prospecting tool",
    "AI lead generation"
  ],
  maps: [
    "Google Maps lead generation",
    "Google Maps scraper alternative",
    "Google Maps business data",
    "find local businesses by niche and city"
  ],
  audit: [
    "website audit tool for prospecting",
    "find businesses with bad websites",
    "find businesses with slow websites",
    "Core Web Vitals audit",
    "website technology lookup",
    "tech stack detection"
  ],
  outreach: [
    "AI cold email for agencies",
    "personalized cold outreach",
    "local business cold email",
    "how to find clients for my agency"
  ],
  audience: [
    "lead generation for web design agencies",
    "lead generation for SEO agencies",
    "lead generation for marketing agencies",
    "how to get clients as a freelance web designer"
  ]
};

export const ALL_KEYWORDS = Object.values(KEYWORDS).flat();

export const LOGO_URL = `${SITE_URL}/brand/logo-square-600.png`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: COMPANY,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 600, height: 600 },
  email: CONTACT_EMAIL,
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL, availableLanguage: ["English"] }]
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ["Larzo AI", "Larzo.io"],
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en"
};

export const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Sales intelligence & lead generation",
  operatingSystem: "Web",
  url: SITE_URL,
  image: LOGO_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  featureList: [
    "Find every local business in a niche and city from Google Maps",
    "Website speed from real Core Web Vitals field data",
    "Technology stack detection (CMS, analytics, pixels, booking tools)",
    "Verified social profiles and activity signals",
    "Opportunity score with evidence for every finding",
    "AI-written email, call script, proposal, audit and DM",
    "Send from your inbox and track opens and clicks",
    "CRM pipeline and map of your leads"
  ]
};

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` }))
  };
}

export function webPageLd({ path, title, description }: { path: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    inLanguage: "en"
  };
}
