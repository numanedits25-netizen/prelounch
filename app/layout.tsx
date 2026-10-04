import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { SmoothAnchors } from "@/components/smooth-anchors";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["500", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://larzo.io"),
  title: "Larzo — Every local business has a gap. Larzo finds it.",
  description:
    "Scan any niche in any city. Larzo audits every website, tech stack and social profile, scores the opportunity with evidence, and drafts the pitch. Join the private beta.",
  openGraph: {
    title: "Larzo — Find the gap. Close the deal.",
    description:
      "Evidence-backed local business intelligence for agencies. Discover, understand, prioritise and pitch in one flow. Private beta waitlist open.",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "Larzo — private beta", description: "Every local business has a gap. Larzo finds it." }
};

export const viewport: Viewport = { themeColor: "#050507" };

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
      </head>
      <body>
        {children}
        <SmoothAnchors />
      </body>
    </html>
  );
}
