/**
 * "Larzo vs X" / "X alternative" pages. Facts about each product come from its public site and
 * pricing page (checked Oct 2026). Keep them fair: say what each tool is genuinely good at.
 * No prices — they change; describe the pricing model instead.
 */
export type Alternative = {
  slug: string;
  name: string;
  category: string;
  /** What the product is, in one fair sentence. */
  summary: string;
  pricingModel: string;
  bestFor: string;
  /** At-a-glance: what they check per business, and their outreach capability. */
  audit: string;
  outreach: string;
  theyDo: string[];
  larzoAdds: string[];
  chooseThem: string;
  chooseLarzo: string;
  faqs: { q: string; a: string }[];
};

export const alternatives: Alternative[] = [
  {
    slug: "outscraper",
    name: "Outscraper",
    category: "Google Maps scraper",
    summary:
      "Outscraper is a data-extraction service best known for scraping Google Maps business listings in bulk, with optional enrichments such as emails, contacts and reviews, plus an API.",
    pricingModel: "Pay-as-you-go per record, with a free tier; enrichments are billed separately.",
    bestFor: "Pulling large raw lists of Google Maps businesses into a spreadsheet or your own pipeline.",
    audit: "Listing data plus optional enrichments",
    outreach: "Not included — export to your own tools",
    theyDo: [
      "Bulk Google Maps place extraction by keyword and location",
      "Optional email, contact and social enrichment add-ons",
      "Reviews scraping and an API for developers",
      "Exports to CSV, Excel, JSON"
    ],
    larzoAdds: [
      "Audits every business it finds — website speed from real Core Web Vitals, tech stack, verified socials",
      "Scores each lead by opportunity and shows the evidence behind the score",
      "Writes the email, call script, proposal, audit and DM from that lead's own findings",
      "Sends from your inbox, tracks opens and clicks, and keeps everything in a CRM pipeline and map"
    ],
    chooseThem: "You need very large raw datasets, you already have your own enrichment and outreach stack, or you only want occasional exports.",
    chooseLarzo: "You sell services to local businesses and want to know who actually needs you, why, and what to say — without cleaning a CSV first.",
    faqs: [
      { q: "Is Larzo a good Outscraper alternative?", a: "If you use Outscraper to find local businesses to pitch, yes. Larzo also starts from Google Maps listings, but then audits each business, ranks it by opportunity with evidence and drafts the outreach. If you need raw data at very large scale for your own pipeline, Outscraper remains a strong choice." },
      { q: "Does Larzo export to CSV like Outscraper?", a: "Larzo is built around working the leads inside the workspace (scores, evidence, outreach, CRM). Export options will be confirmed before public launch." },
      { q: "Where does Larzo's business data come from?", a: "Business listings from Google Maps, website performance from Google PageSpeed and Chrome UX Report field data, technology detection from the site itself, and social profiles verified as belonging to the business." }
    ]
  },
  {
    slug: "apify",
    name: "Apify",
    category: "Web scraping platform",
    summary:
      "Apify is a developer platform of ready-made and custom scrapers (\"Actors\"), including popular Google Maps scrapers, with scheduling, datasets, webhooks and an API.",
    pricingModel: "Platform plans plus pay-per-result or usage-based pricing per Actor; free monthly credit available.",
    bestFor: "Developers and data teams building custom scraping and automation pipelines.",
    audit: "Whatever the chosen scraper extracts",
    outreach: "Not included — build it yourself",
    theyDo: [
      "Marketplace of scrapers for Google Maps and thousands of other sites",
      "Scheduling, storage, webhooks and integrations",
      "Full API and SDK for custom pipelines",
      "Flexible per-result pricing on many Actors"
    ],
    larzoAdds: [
      "No setup — type a niche and a city and get audited, ranked leads",
      "Five intelligence engines run on every business automatically",
      "Opportunity scores with the evidence behind each finding",
      "AI outreach, sending, tracking and a CRM in the same workspace"
    ],
    chooseThem: "You have engineering time and want full control over what you scrape and how it flows into your systems.",
    chooseLarzo: "You want the finished result — who to pitch, why, and the first message — without building and maintaining a pipeline.",
    faqs: [
      { q: "Is Larzo built on Apify?", a: "No. Larzo is its own product with its own intelligence engines. It uses Google Maps listings and public signals such as Google PageSpeed / Chrome UX Report data." },
      { q: "Do I need to code to use Larzo?", a: "No. You search a niche and a city; everything else — audits, scoring, outreach drafts — happens automatically." },
      { q: "Can developers still use Larzo?", a: "Larzo is designed for agencies and freelancers first. API plans have not been announced yet." }
    ]
  },
  {
    slug: "scrap-io",
    name: "Scrap.io",
    category: "Local leads extractor",
    summary:
      "Scrap.io extracts local business data from maps platforms with strong pre-filters — emails, socials, ratings, website presence and some technology signals — plus an API and integrations.",
    pricingModel: "Monthly subscription tiers with export credits; higher tiers unlock wider geographic search.",
    bestFor: "Building filtered local business lists by category and geography.",
    audit: "Listing filters incl. website, socials and pixels",
    outreach: "Not included — connect other tools",
    theyDo: [
      "Maps extraction by category, city, radius or region",
      "Filters before export: email, phone type, rating, website, social, pixels",
      "Email and social link enrichment",
      "API, Chrome extension and Make.com integration"
    ],
    larzoAdds: [
      "Measures each website with real Core Web Vitals field data, not just whether a site exists",
      "Opportunity score per business, with every finding traced to its source",
      "Outreach written from that business's verified findings",
      "Built-in sending, open and click tracking, CRM pipeline and lead map"
    ],
    chooseThem: "You mainly need well-filtered contact lists and already run outreach elsewhere.",
    chooseLarzo: "You want to know which of those businesses has a real, provable gap you can sell into — and pitch it in one flow.",
    faqs: [
      { q: "How is Larzo different from Scrap.io?", a: "Scrap.io focuses on extracting and filtering listings. Larzo goes further on each business: it audits the website, tech stack and socials, scores the opportunity with evidence and writes outreach grounded in those findings." },
      { q: "Does Larzo filter by website and social presence?", a: "Yes. Website, technology and verified social signals are part of every lead, so you can sort a niche by the gaps that matter to what you sell." },
      { q: "Which countries does Larzo cover?", a: "Any city Google Maps covers, for any niche that appears on Google Maps." }
    ]
  },
  {
    slug: "d7-lead-finder",
    name: "D7 Lead Finder",
    category: "Local lead list builder",
    summary:
      "D7 Lead Finder builds local business lead lists from a keyword and a location, returning contact fields such as emails, phones, websites and social profiles.",
    pricingModel: "Monthly subscription tiers with daily search limits.",
    bestFor: "Quick keyword-and-city lead lists with basic contact details.",
    audit: "Contact fields plus some site signals",
    outreach: "Not included — export to your own tools",
    theyDo: [
      "Keyword + location searches for local businesses",
      "Emails, phones, websites and social profile fields",
      "Some site signals such as tracking pixels and email provider",
      "CSV export"
    ],
    larzoAdds: [
      "Deep audits on every lead across five engines instead of contact fields alone",
      "Website speed from Google's real-user Core Web Vitals",
      "Evidence-backed opportunity scoring so you call the best leads first",
      "AI outreach, sending, tracking and CRM built in"
    ],
    chooseThem: "You want a simple, low-touch list of contacts and do the qualifying yourself.",
    chooseLarzo: "You want the qualifying done for you, with proof you can quote in the pitch.",
    faqs: [
      { q: "Is Larzo a D7 Lead Finder alternative?", a: "Yes, for agencies who want more than contact fields. Larzo finds the same kind of local businesses, then audits them, ranks them by opportunity and drafts outreach." },
      { q: "Does Larzo limit searches per day?", a: "Plans and limits will be announced before public launch. Founding members lock in a special rate." },
      { q: "Does Larzo invent data when it can't find it?", a: "No. When a signal can't be verified, Larzo shows it as unknown rather than guessing." }
    ]
  },
  {
    slug: "leadswift",
    name: "LeadSwift",
    category: "Local lead gen + outreach",
    summary:
      "LeadSwift is local B2B lead generation and outreach software: keyword-and-location searches, website keyword/code search, contact finding and built-in email outreach.",
    pricingModel: "Monthly or annual subscription tiers that differ by searches per day.",
    bestFor: "Agencies that want local lead lists and cold email in one subscription.",
    audit: "Ratings, reviews, SEO issues, site keyword search",
    outreach: "Built-in email outreach with personalisation",
    theyDo: [
      "Local business searches by keyword and location",
      "Search inside websites for keywords or code",
      "Decision-maker emails and filters",
      "Built-in email outreach with follow-ups"
    ],
    larzoAdds: [
      "Website speed measured with real Core Web Vitals field data for every lead",
      "Tech detection benchmarked at F1 91.4 on 142 unseen sites",
      "Opportunity score with the evidence behind every finding",
      "Five outreach formats — email, call script, proposal, audit, DM — written only from verified findings"
    ],
    chooseThem: "Your main need is volume: big lists and automated email sequences.",
    chooseLarzo: "You win on relevance: fewer, better-qualified leads and pitches that quote real, verifiable problems.",
    faqs: [
      { q: "How does Larzo compare with LeadSwift?", a: "Both find local businesses and help you reach out. Larzo puts more weight on intelligence: it audits each business across five engines, scores the opportunity with evidence and writes outreach grounded only in what it verified." },
      { q: "Can I send emails from Larzo?", a: "Yes. You send from your own inbox and Larzo tracks opens and clicks." },
      { q: "When can I try Larzo?", a: "Larzo is in private beta. Join the waitlist — invites go out in waves, earliest signups first." }
    ]
  },
  {
    slug: "builtwith",
    name: "BuiltWith",
    category: "Technology lookup",
    summary:
      "BuiltWith tracks which technologies websites use and sells lead lists of sites by technology, with free single-site lookups and paid plans for lists and API access.",
    pricingModel: "Free individual lookups; monthly or annual plans for lead lists, reports and API.",
    bestFor: "Technographic research and lists of sites using (or not using) a given technology.",
    audit: "Technology stack only",
    outreach: "Not included",
    theyDo: [
      "Technology profiles for websites",
      "Lead lists by technology, with historical usage",
      "Market-share and trend reports",
      "API access on paid plans"
    ],
    larzoAdds: [
      "Starts from local businesses on Google Maps, not from domains — so businesses with weak or no sites still show up",
      "Combines tech with real Core Web Vitals speed, verified socials and business signals",
      "Opportunity score and evidence per business",
      "AI outreach, sending, tracking and CRM in one place"
    ],
    chooseThem: "You sell a technology product and need broad technographic lists or market data.",
    chooseLarzo: "You sell services to local businesses and need the full picture of each one, not only its tech stack.",
    faqs: [
      { q: "Is Larzo a BuiltWith alternative for agencies?", a: "For agencies prospecting local businesses, yes. Technology detection is one of Larzo's five engines, alongside website speed, social, business and opportunity signals." },
      { q: "How accurate is Larzo's tech detection?", a: "On an out-of-sample benchmark of 142 websites not used in development, Larzo's tech engine scored F1 91.4 with zero false positives." },
      { q: "Can Larzo find businesses without a website?", a: "Yes — Larzo starts from Google Maps listings, so businesses with a weak site or none at all still appear in your results." }
    ]
  },
  {
    slug: "wappalyzer",
    name: "Wappalyzer",
    category: "Technology lookup",
    summary:
      "Wappalyzer identifies the technologies a website uses through its browser extension and lookups, with paid plans for lead lists, CRM enrichment and APIs.",
    pricingModel: "Free extension and lookups; paid plans for lists, enrichment and API credits.",
    bestFor: "Checking a site's tech stack in the browser and technographic enrichment.",
    audit: "Technology stack only",
    outreach: "Not included",
    theyDo: [
      "Browser extension that shows a site's technologies",
      "Technology lookups and lead lists",
      "CRM enrichment and email verification",
      "APIs for technographics"
    ],
    larzoAdds: [
      "Higher accuracy in our benchmark: F1 91.4 vs Wappalyzer's 65.2 on the same 142 unseen sites",
      "Tech is combined with Core Web Vitals speed, verified socials and business signals",
      "Every business scored by opportunity, with evidence",
      "Outreach that quotes the findings, plus sending, tracking and CRM"
    ],
    chooseThem: "You want a quick tech check while browsing or technographic enrichment for your CRM.",
    chooseLarzo: "You want to find local businesses whose tech and website gaps are worth pitching — and pitch them.",
    faqs: [
      { q: "Is Larzo more accurate than Wappalyzer?", a: "In Larzo's own out-of-sample benchmark of 142 websites, Larzo scored F1 91.4 (precision 100, recall 84.2) versus Wappalyzer's 65.2 on the same sites." },
      { q: "Is there a Larzo browser extension?", a: "Not today. Larzo is a web workspace where you search a niche and a city and work the audited leads." },
      { q: "What technologies does Larzo detect?", a: "CMS, analytics, ad pixels, booking tools and other common local-business tech." }
    ]
  },
  {
    slug: "apollo",
    name: "Apollo.io",
    category: "B2B contact database",
    summary:
      "Apollo.io is a B2B sales platform combining a large contact and company database with email sequences, a dialer and AI writing, aimed at sales teams.",
    pricingModel: "Free plan plus per-seat monthly or annual plans with credit limits.",
    bestFor: "Outbound to companies with sales teams and LinkedIn presence.",
    audit: "Firmographics and contacts",
    outreach: "AI-assisted emails and sequences",
    theyDo: [
      "Large B2B contact and company database",
      "Email sequences, dialer and task automation",
      "AI-assisted email writing",
      "CRM sync and intent data"
    ],
    larzoAdds: [
      "Built for local businesses — Maps listings, reviews, site speed and social activity — where B2B databases run thin",
      "Website, tech and social audits on every business",
      "Opportunity scores with evidence instead of firmographic fit alone",
      "Outreach written from each business's verified problems"
    ],
    chooseThem: "You sell to mid-market or enterprise companies and need contacts by job title.",
    chooseLarzo: "Your buyers are dentists, roofers, restaurants, gyms and other local businesses.",
    faqs: [
      { q: "Is Larzo an Apollo alternative?", a: "For agencies selling to local businesses, yes. Apollo is built for B2B companies with sales teams; Larzo is built for local businesses found on Google Maps." },
      { q: "Does Larzo have a contact database?", a: "Larzo finds businesses live from Google Maps for your niche and city and audits them, rather than selling a static database." },
      { q: "Can I use Larzo and Apollo together?", a: "Yes — many teams use Apollo for B2B outbound and Larzo for local businesses." }
    ]
  }
];

export function getAlternative(slug: string) {
  return alternatives.find((a) => a.slug === slug);
}
