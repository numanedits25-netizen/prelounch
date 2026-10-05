import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SmoothAnchors } from "@/components/smooth-anchors";
import { JsonLd } from "@/components/json-ld";
import { ALL_KEYWORDS, DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, organizationLd, websiteLd } from "@/lib/seo";
import { COMPANY, SITE_URL } from "@/lib/site";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["500", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Larzo" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ALL_KEYWORDS,
  authors: [{ name: COMPANY }],
  creator: COMPANY,
  publisher: COMPANY,
  category: "Business software",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "Larzo — Find the gap. Close the deal.",
    description:
      "Find every local business in a niche and city, audit their website, tech and socials, rank them by real opportunity and pitch with evidence. Private beta waitlist open."
  },
  twitter: { card: "summary_large_image", title: "Larzo — AI local lead finder for agencies", description: "Every local business has a gap. Larzo finds it, proves it and writes the pitch." },
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {})
};

export const viewport: Viewport = { themeColor: "#050507", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${mono.variable}`}>
      <head>
        {/* Open at the hero on fresh visits/reloads: drop stale #hash before the browser jumps to it */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if("scrollRestoration" in history)history.scrollRestoration="manual";var f=+sessionStorage.getItem("larzo_hash_nav")||0;if(location.hash&&Date.now()-f>15000){history.replaceState(null,"",location.pathname+location.search)}}catch(e){}`
          }}
        />
        <JsonLd data={[organizationLd, websiteLd]} />
      </head>
      <body>
        {children}
        <SmoothAnchors />
        <Analytics />
      </body>
    </html>
  );
}
