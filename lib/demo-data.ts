// Illustrative demo data — fictional businesses, not live results.
export type DemoLead = {
  name: string;
  area: string;
  rating: number;
  reviews: number;
  score: number;
  gaps: string[];
  pitch: string;
};

export type DemoNiche = {
  id: string;
  label: string;
  query: string;
  found: number;
  high: number;
  leads: DemoLead[];
};

export const niches: DemoNiche[] = [
  {
    id: "dentists",
    label: "Dentists",
    query: "Dental clinics in Austin, TX",
    found: 112,
    high: 27,
    leads: [
      { name: "Bright Smile Dental", area: "South Congress", rating: 4.8, reviews: 312, score: 91, gaps: ["4.9s mobile load", "No booking widget", "No Meta Pixel"], pitch: "Speed + online booking" },
      { name: "Lakeway Family Dentistry", area: "Lakeway", rating: 4.6, reviews: 188, score: 84, gaps: ["Instagram dormant 7 mo", "No SSL redirect"], pitch: "Social revival" },
      { name: "Capitol Dental Studio", area: "Downtown", rating: 4.9, reviews: 540, score: 72, gaps: ["Wix site, poor LCP"], pitch: "Site rebuild" },
      { name: "Hill Country Orthodontics", area: "Westlake", rating: 4.4, reviews: 96, score: 66, gaps: ["No Google Analytics"], pitch: "Tracking setup" },
      { name: "Mueller Dental Care", area: "Mueller", rating: 4.7, reviews: 221, score: 41, gaps: ["Strong presence"], pitch: "Low priority" }
    ]
  },
  {
    id: "roofers",
    label: "Roofers",
    query: "Roofing contractors in Denver, CO",
    found: 108,
    high: 34,
    leads: [
      { name: "Summit Peak Roofing", area: "Lakewood", rating: 4.7, reviews: 143, score: 93, gaps: ["No website", "Facebook only"], pitch: "First website" },
      { name: "Front Range Roof Co.", area: "Aurora", rating: 4.5, reviews: 87, score: 86, gaps: ["Not mobile friendly", "No reviews widget"], pitch: "Mobile rebuild" },
      { name: "Mile High Exteriors", area: "Highlands", rating: 4.8, reviews: 260, score: 74, gaps: ["No ad tracking"], pitch: "Paid ads funnel" },
      { name: "Cherry Creek Roofing", area: "Cherry Creek", rating: 4.3, reviews: 52, score: 62, gaps: ["Slow images"], pitch: "Performance fix" },
      { name: "Denver Storm Pros", area: "Englewood", rating: 4.9, reviews: 412, score: 38, gaps: ["Well covered"], pitch: "Low priority" }
    ]
  },
  {
    id: "medspas",
    label: "Med spas",
    query: "Med spas in Miami, FL",
    found: 116,
    high: 22,
    leads: [
      { name: "Glow Theory Aesthetics", area: "Brickell", rating: 4.9, reviews: 205, score: 89, gaps: ["TikTok missing", "No booking flow"], pitch: "Short-form content" },
      { name: "Coral Skin Studio", area: "Coral Gables", rating: 4.6, reviews: 131, score: 82, gaps: ["3 broken pages", "No schema"], pitch: "Technical SEO" },
      { name: "Luxe Bay MedSpa", area: "Wynwood", rating: 4.7, reviews: 98, score: 75, gaps: ["No GTM / pixel"], pitch: "Ads tracking" },
      { name: "Biscayne Laser Lounge", area: "Midtown", rating: 4.5, reviews: 64, score: 63, gaps: ["Squarespace, slow"], pitch: "Speed audit" },
      { name: "Key Aesthetics", area: "Key Biscayne", rating: 4.8, reviews: 377, score: 44, gaps: ["Strong presence"], pitch: "Low priority" }
    ]
  },
  {
    id: "restaurants",
    label: "Restaurants",
    query: "Restaurants in Manchester, UK",
    found: 104,
    high: 31,
    leads: [
      { name: "The Copper Fork", area: "Northern Quarter", rating: 4.6, reviews: 488, score: 90, gaps: ["No online menu", "Instagram inactive"], pitch: "Menu site + social" },
      { name: "Ancoats Kitchen", area: "Ancoats", rating: 4.7, reviews: 302, score: 83, gaps: ["No reservations link"], pitch: "Booking integration" },
      { name: "Salt & Ember", area: "Deansgate", rating: 4.4, reviews: 157, score: 71, gaps: ["6.1s mobile load"], pitch: "Performance fix" },
      { name: "Little Lisbon", area: "Chorlton", rating: 4.8, reviews: 211, score: 64, gaps: ["No analytics"], pitch: "Tracking setup" },
      { name: "Spinningfields Grill", area: "Spinningfields", rating: 4.5, reviews: 640, score: 39, gaps: ["Well covered"], pitch: "Low priority" }
    ]
  }
];

/** Radar pin positions in polar coords (angle deg, radius 0–1) + score. */
export const pins = [
  { a: 18, r: 0.42, s: 91 }, { a: 41, r: 0.78, s: 52 }, { a: 63, r: 0.3, s: 84 }, { a: 88, r: 0.62, s: 40 },
  { a: 104, r: 0.88, s: 72 }, { a: 127, r: 0.5, s: 33 }, { a: 149, r: 0.72, s: 66 }, { a: 168, r: 0.25, s: 47 },
  { a: 192, r: 0.58, s: 86 }, { a: 211, r: 0.84, s: 35 }, { a: 233, r: 0.38, s: 58 }, { a: 252, r: 0.7, s: 93 },
  { a: 274, r: 0.48, s: 44 }, { a: 296, r: 0.9, s: 61 }, { a: 313, r: 0.33, s: 75 }, { a: 334, r: 0.64, s: 38 },
  { a: 350, r: 0.8, s: 82 }, { a: 8, r: 0.66, s: 29 }, { a: 76, r: 0.92, s: 63 }, { a: 220, r: 0.18, s: 55 }
];
