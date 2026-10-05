/** Canonical site URL: explicit env → Vercel production domain → fallback. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://prelounch.vercel.app");

export const CONTACT_EMAIL = "larzoai@gmail.com";
export const COMPANY = "Buildream AI";
