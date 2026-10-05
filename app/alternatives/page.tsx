import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { JoinCta, PageHero } from "@/components/seo-blocks";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { alternatives } from "@/lib/alternatives";
import { SITE_URL } from "@/lib/site";
import { breadcrumbLd, webPageLd } from "@/lib/seo";

const title = "Best Local Lead Generation Tool Alternatives for Agencies (2026)";
const description =
  "Looking for an Outscraper, Apify, Scrap.io, D7 Lead Finder, LeadSwift, BuiltWith, Wappalyzer or Apollo alternative? See how Larzo compares for finding, auditing and pitching local businesses.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Larzo` },
  description,
  alternates: { canonical: "/alternatives" },
  openGraph: { title, description, url: "/alternatives" }
};

export default function AlternativesIndex() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Alternatives", path: "/alternatives" }
  ];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: alternatives.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/alternatives/${a.slug}`, name: `${a.name} alternative` }))
  };
  return (
    <main className="relative">
      <JsonLd data={[webPageLd({ path: "/alternatives", title, description }), breadcrumbLd(crumbs), itemList]} />
      <Nav />
      <PageHero
        crumbs={crumbs}
        eyebrow="Alternatives"
        title="Switching from a scraper, a lookup or a database?"
        accent="Here's how Larzo compares."
        intro="Honest, one-page comparisons with the tools agencies use today to find local business leads. What each does well, what Larzo adds, and when you should pick which."
      />
      <section className="relative pb-10">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {alternatives.map((a) => (
            <Link key={a.slug} href={`/alternatives/${a.slug}`} className="group">
              <SpotlightCard className="h-full p-6 transition group-hover:border-violet-400/30">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">{a.category}</p>
                <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white">{a.name} alternative</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute">{a.bestFor}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-cyan-300">
                  Larzo vs {a.name} <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </SpotlightCard>
            </Link>
          ))}
        </div>
        <div className="container mt-8">
          <Link href="/compare" className="inline-flex items-center gap-2 text-sm text-mute transition hover:text-white">
            See the full feature-by-feature category comparison <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <JoinCta id="alternatives-form" />
      <Footer />
    </main>
  );
}
