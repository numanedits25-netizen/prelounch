/** "/for/[slug]" audience landing pages. One keyword cluster per page. */
export type UseCase = {
  slug: string;
  audience: string;
  title: string;
  description: string;
  h1: string;
  accent: string;
  intro: string;
  pains: string[];
  signals: { title: string; body: string }[];
  pitches: string[];
  niches: string[];
  faqs: { q: string; a: string }[];
};

export const useCases: UseCase[] = [
  {
    slug: "web-design-agencies",
    audience: "Web design agencies",
    title: "Lead Generation for Web Design Agencies — Find Businesses With Bad Websites",
    description:
      "Find local businesses with slow, outdated or missing websites in any niche and city. Larzo audits every site with real Core Web Vitals, ranks who needs a redesign most and drafts the pitch.",
    h1: "Find the local businesses",
    accent: "whose websites are costing them customers.",
    intro:
      "Search a niche and a city. Larzo pulls every business from Google Maps, measures each website with Google's real-user speed data, detects the CMS and tech behind it, and ranks who needs a new site most — with the numbers to prove it.",
    pains: [
      "Scrolling Google Maps and opening sites one by one",
      "Guessing which businesses would actually pay for a redesign",
      "Generic “I can build you a website” emails that get ignored"
    ],
    signals: [
      { title: "Real speed, not guesses", body: "Core Web Vitals field data from Google PageSpeed and Chrome UX Report for every site." },
      { title: "Platform and age", body: "CMS, builders and tech detected from the site itself — spot DIY builders and outdated stacks." },
      { title: "Missing or weak sites", body: "Businesses with no website, or only a social page, still show up because Larzo starts from Maps listings." },
      { title: "Proof for the pitch", body: "Every finding links to its source, so your email can quote the exact problem." }
    ],
    pitches: ["Redesign proposal with their real speed scores", "Website audit PDF to open the conversation", "Cold email that names the specific issue"],
    niches: ["Dentists", "Roofers", "Med spas", "Restaurants", "Law firms", "Plumbers"],
    faqs: [
      { q: "How do I find local businesses with bad websites?", a: "Search a niche and city in Larzo. It audits every business's website with real Core Web Vitals and tech detection, then sorts the list by the biggest gaps so you can start with the businesses that need a redesign most." },
      { q: "Can Larzo find businesses without a website?", a: "Yes. Larzo starts from Google Maps listings, so businesses with no site or only a social page still appear." },
      { q: "What does the pitch look like?", a: "Larzo drafts an email, call script, proposal, audit or DM using only that business's verified findings — for example, its real mobile load time." }
    ]
  },
  {
    slug: "seo-agencies",
    audience: "SEO agencies",
    title: "Lead Generation for SEO Agencies — Local SEO Prospecting Tool",
    description:
      "Prospect local businesses for SEO with evidence: website speed from Core Web Vitals, tech stack, reviews and social signals. Larzo ranks every business in a niche by SEO opportunity and writes the outreach.",
    h1: "Local SEO prospecting,",
    accent: "with the evidence already attached.",
    intro:
      "Larzo scans every business in a niche and city, checks site performance with Google's own field data, reads the tech stack and business signals, and shows you which ones have SEO gaps worth selling into.",
    pains: [
      "Running audits one site at a time before every pitch",
      "Prospects who don't believe they have a problem",
      "Spending hours on businesses that were never a fit"
    ],
    signals: [
      { title: "Core Web Vitals", body: "Real-user speed data from Google — a ranking signal your prospect can't argue with." },
      { title: "Tracking and tech", body: "Analytics, pixels, CMS and booking tools detected automatically." },
      { title: "Business signals", body: "Google Maps listing data like rating and reviews alongside the site audit." },
      { title: "Opportunity score", body: "Every business ranked by how much it stands to gain, with the reasons shown." }
    ],
    pitches: ["Mini SEO audit built from their own data", "Cold email that leads with a real metric", "Call script for the follow-up"],
    niches: ["Dentists", "Lawyers", "HVAC", "Chiropractors", "Real estate", "Auto repair"],
    faqs: [
      { q: "Is Larzo a local SEO audit tool?", a: "Larzo is a prospecting tool with built-in audits. It checks speed, tech and business signals for every business in a niche so you know who to pitch and why." },
      { q: "Where does the speed data come from?", a: "Google PageSpeed and Chrome UX Report field data — the same real-user Core Web Vitals Google uses." },
      { q: "Can I use it for any city?", a: "Any city Google Maps covers, and any niche that appears on Google Maps." }
    ]
  },
  {
    slug: "marketing-agencies",
    audience: "Digital marketing agencies",
    title: "Lead Generation for Digital Marketing Agencies — Find & Pitch Local Clients",
    description:
      "Larzo helps marketing agencies find local businesses that need ads, social or web help: it audits sites, tech, pixels and social activity, scores the opportunity and drafts personalised outreach.",
    h1: "Find local clients",
    accent: "who need exactly what you sell.",
    intro:
      "Whether you sell ads, social, websites or all three, Larzo finds every local business in your target niche, checks what they're missing — pixels, active socials, a fast site — and hands you a ranked list with the pitch drafted.",
    pains: [
      "Lead lists with no context about what each business needs",
      "Outreach that sounds like everyone else's",
      "Juggling a scraper, spreadsheets, ChatGPT and a CRM"
    ],
    signals: [
      { title: "Ad readiness", body: "Ad pixels and analytics detected on every site — see who isn't tracking anything." },
      { title: "Social activity", body: "Profiles verified as belonging to the business, with last-activity signals." },
      { title: "Website health", body: "Real Core Web Vitals so you can pitch speed as part of the package." },
      { title: "One workspace", body: "Scores, outreach, sending, tracking, CRM and map in one place." }
    ],
    pitches: ["Proposal tailored to their gaps", "DM for Instagram or Facebook", "Email sequence opener"],
    niches: ["Gyms", "Salons", "Restaurants", "Clinics", "Home services", "Retail"],
    faqs: [
      { q: "What kind of agencies is Larzo for?", a: "Any agency or freelancer selling services to local businesses: web design, SEO, paid ads, social media, reputation and more." },
      { q: "Does Larzo replace my CRM?", a: "Larzo includes a pipeline and a map of your leads with the intelligence attached. Integrations will be announced before launch." },
      { q: "How is this better than a lead list?", a: "A list tells you who exists. Larzo tells you who needs what you sell, proves it with evidence and writes the first message." }
    ]
  },
  {
    slug: "freelancers",
    audience: "Freelancers",
    title: "How to Find Local Clients as a Freelancer — AI Lead Finder",
    description:
      "Find local businesses that need your skills in minutes. Larzo audits websites, tech and socials for every business in a niche and city, then writes outreach you can send from your own inbox.",
    h1: "Stop hunting for clients.",
    accent: "Start with the ones who need you.",
    intro:
      "No agency sales team? Larzo is your research assistant: pick a niche and city, and it finds the businesses, audits them, shows you who has a real gap and drafts the message so you can spend your time doing the work.",
    pains: [
      "Hours of research for every single pitch",
      "Freelance marketplaces racing to the bottom on price",
      "Not knowing what to say in a cold email"
    ],
    signals: [
      { title: "Hours back", body: "The research is done automatically for every business in the niche." },
      { title: "Better clients", body: "Pitch businesses with a provable gap instead of competing on price." },
      { title: "Your own inbox", body: "Send from your email and track opens and clicks." },
      { title: "Honest AI", body: "Outreach is grounded only in verified findings — no made-up claims." }
    ],
    pitches: ["Short, specific cold email", "Free audit to start the conversation", "Simple proposal"],
    niches: ["Cafés", "Photographers", "Tradespeople", "Boutiques", "Studios", "Clinics"],
    faqs: [
      { q: "How do freelancers find local clients?", a: "The most reliable way is to pitch businesses with a specific, provable problem you can fix. Larzo finds those businesses in any niche and city and gives you the evidence to quote." },
      { q: "Is Larzo affordable for solo freelancers?", a: "Pricing will be announced before public launch. Founding members on the waitlist lock in a special rate." },
      { q: "Do I need technical skills?", a: "No. You type a niche and a city; Larzo does the rest." }
    ]
  }
];

export function getUseCase(slug: string) {
  return useCases.find((u) => u.slug === slug);
}
