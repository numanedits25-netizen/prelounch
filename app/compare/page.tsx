import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { CompareTable, Legend } from "@/components/compare-table";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { WaitlistForm } from "@/components/waitlist-form";
import { rivals, versus } from "@/lib/compare";
import { JsonLd } from "@/components/json-ld";
import { alternatives } from "@/lib/alternatives";
import { breadcrumbLd, webPageLd } from "@/lib/seo";

const title = "Larzo vs Google Maps Scrapers, BuiltWith, Wappalyzer & Apollo";
const description =
  "Feature-by-feature: how Larzo compares with Google Maps scrapers (Outscraper, Apify), tech lookups (BuiltWith, Wappalyzer), B2B databases (Apollo) and the DIY ChatGPT + spreadsheet stack for finding and pitching local businesses.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Larzo` },
  description,
  alternates: { canonical: "/compare" },
  openGraph: { title, description, url: "/compare" },
  twitter: { title, description }
};

export default function ComparePage() {
  return (
    <main className="relative">
      <JsonLd data={[webPageLd({ path: "/compare", title, description }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }])]} />
      <Nav />
      <section className="relative overflow-x-clip pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="grid-bg mask-radial absolute inset-x-0 top-0 h-[700px] opacity-40" />
          <div className="absolute left-[-10%] top-[-200px] h-[560px] w-[760px] rounded-full bg-violet-600/20 blur-[140px]" />
          <div className="absolute right-[-10%] top-[40px] h-[520px] w-[700px] rounded-full bg-cyan-500/10 blur-[150px]" />
        </div>
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Compare"
            title="Larzo vs"
            accent="the usual prospecting stack."
            copy="Scrapers find businesses. Tech lookups read websites. B2B databases hold contacts. ChatGPT writes emails. Larzo does all of it for local businesses, with evidence for every finding."
          />
          <Reveal className="mt-14">
            <CompareTable />
          </Reveal>
          <Legend className="mt-6 justify-center sm:justify-start" />
        </div>
      </section>

      <section className="relative py-16 sm:py-24">
        <div className="container">
          <SectionHeading eyebrow="Head to head" title="Where each one shines," accent="and where Larzo is different." />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {versus.map((v, i) => {
              const r = rivals.find((x) => x.id === v.id)!;
              return (
                <Reveal key={v.id} delay={(i % 2) * 0.08}>
                  <SpotlightCard className="h-full p-6 sm:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">Larzo vs</p>
                    <p className="mt-1 font-display text-2xl font-bold tracking-tight text-white">{r.name}</p>
                    <p className="text-xs text-mute-2">e.g. {r.eg}</p>
                    <div className="mt-6 space-y-4 text-sm leading-relaxed">
                      <div className="flex gap-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/[0.06] text-slate-300">
                          <Check className="size-3.5" />
                        </span>
                        <p className="text-mute">
                          <span className="font-medium text-slate-200">Great for: </span>
                          {v.good}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                          <Sparkles className="size-3.5" />
                        </span>
                        <p className="text-slate-300">
                          <span className="font-medium text-white">With Larzo: </span>
                          {v.diff}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-8 text-[11px] leading-relaxed text-mute-3">
            Compared by tool category, based on each category&apos;s core, publicly documented features (Oct 2026). Individual products vary and some offer add-ons. The Wappalyzer figure comes from Larzo&apos;s own out-of-sample benchmark of 142 websites not used in development. Product names are trademarks of their owners and are used for identification only.
          </p>
          <div className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">One-on-one comparisons</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {alternatives.map((a) => (
                <Link key={a.slug} href={`/alternatives/${a.slug}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300 transition hover:border-violet-400/30 hover:text-white">
                  Larzo vs {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="relative scroll-mt-24 py-20 sm:py-28">
        <div className="container flex flex-col items-center text-center">
          <h2 className="max-w-3xl font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            Replace the stack. <span className="text-gradient">Keep the context.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-mute sm:text-lg">Join the private beta and get founding-member access when invites roll out.</p>
          <div className="mt-9 flex w-full justify-center">
            <WaitlistForm id="compare-form" />
          </div>
          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-mute transition hover:text-white">
            Back to the overview <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
