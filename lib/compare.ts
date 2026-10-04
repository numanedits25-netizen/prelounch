export type Mark = "yes" | "partial" | "no";

export const rivals = [
  { id: "maps", name: "Maps scrapers", eg: "Outscraper, Apify" },
  { id: "tech", name: "Tech lookups", eg: "BuiltWith, Wappalyzer" },
  { id: "b2b", name: "B2B databases", eg: "Apollo" },
  { id: "diy", name: "DIY stack", eg: "ChatGPT + spreadsheets" }
] as const;

export type RivalId = (typeof rivals)[number]["id"];

export type Row = {
  feature: string;
  detail: string;
  larzo: string;
  marks: Record<RivalId, Mark>;
  notes?: Partial<Record<RivalId, string>>;
};

export const rows: Row[] = [
  {
    feature: "Every local business in a niche + city",
    detail: "Not just Google's first page of results.",
    larzo: "Fan-out across keywords and map tiles",
    marks: { maps: "yes", tech: "partial", b2b: "partial", diy: "partial" },
    notes: { tech: "Filtered by technology, not by map listing", b2b: "Thin on small local businesses", diy: "Manual Maps searching" }
  },
  {
    feature: "Website speed from real Core Web Vitals",
    detail: "Field data from Google PageSpeed & CrUX.",
    larzo: "Measured for every lead",
    marks: { maps: "no", tech: "no", b2b: "no", diy: "partial" },
    notes: { diy: "One PageSpeed test at a time" }
  },
  {
    feature: "Technology stack detection",
    detail: "CMS, analytics, pixels, booking tools.",
    larzo: "F1 91.4 on 142 unseen sites",
    marks: { maps: "no", tech: "yes", b2b: "partial", diy: "no" },
    notes: { tech: "Wappalyzer scored F1 65.2 on the same 142 sites", b2b: "Company-level technographics" }
  },
  {
    feature: "Verified social profiles & activity",
    detail: "Profiles linked from the business itself.",
    larzo: "Verified, with last-activity signals",
    marks: { maps: "partial", tech: "no", b2b: "partial", diy: "partial" },
    notes: { maps: "Profile links, no activity check", b2b: "Mostly LinkedIn", diy: "Checked by hand" }
  },
  {
    feature: "Opportunity score with evidence",
    detail: "Who to call first — and the proof why.",
    larzo: "Every finding traced to its source",
    marks: { maps: "no", tech: "no", b2b: "partial", diy: "no" },
    notes: { b2b: "Fit scoring, not local-business gaps" }
  },
  {
    feature: "Outreach written from that lead's findings",
    detail: "Email, call script, proposal, audit, DM.",
    larzo: "Grounded only in verified findings",
    marks: { maps: "no", tech: "no", b2b: "partial", diy: "partial" },
    notes: { b2b: "AI emails from contact data", diy: "Only as good as what you paste in" }
  },
  {
    feature: "Send and track opens & clicks",
    detail: "From your own inbox.",
    larzo: "Built in",
    marks: { maps: "no", tech: "no", b2b: "yes", diy: "no" }
  },
  {
    feature: "CRM pipeline + map of your leads",
    detail: "Stages, notes, tasks, territory view.",
    larzo: "Built in, intelligence attached",
    marks: { maps: "no", tech: "no", b2b: "partial", diy: "partial" },
    notes: { b2b: "Pipeline, no map", diy: "A spreadsheet" }
  }
];

export const versus: { id: RivalId; good: string; diff: string }[] = [
  {
    id: "maps",
    good: "Pulling raw business lists out of Google Maps in bulk.",
    diff: "A list is where Larzo starts. Every business is then audited by five engines, scored and pitched — no CSV to clean up."
  },
  {
    id: "tech",
    good: "Looking up which technologies a website runs.",
    diff: "Tech is one of five engines. On 142 sites neither tool had seen, Larzo scored F1 91.4 against Wappalyzer's 65.2 — with zero false positives."
  },
  {
    id: "b2b",
    good: "Contact data and sequences for companies with sales teams.",
    diff: "Larzo is built for local businesses — Maps listings, reviews, site speed and social activity — where B2B databases run thin."
  },
  {
    id: "diy",
    good: "Flexible, and it costs nothing but your time.",
    diff: "No forty tabs. The research is done for you, and the AI writes from verified findings instead of whatever you remembered to paste."
  }
];
