import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { FaqList, H2, JoinCta, LinkGrid, PageHero } from "@/components/seo-blocks";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { alternatives, getAlternative } from "@/lib/alternatives";
import { breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return alternatives.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

function meta(name: string, category: string) {
  return {
    title: `Best ${name} Alternative for Agencies (2026) — Larzo vs ${name}`,
    description: `Comparing ${name} and Larzo for finding and pitching local businesses. What ${name} does well as a ${category.toLowerCase()}, where Larzo goes further with audits, evidence-backed scores and AI outreach.`
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getAlternative((await params).slug);
  if (!a) return {};
  const m = meta(a.name, a.category);
  const path = `/alternatives/${a.slug}`;
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: path },
    openGraph: { title: m.title, description: m.description, url: path, type: "article" },
    twitter: { title: m.title, description: m.description }
  };
}

export default async function AlternativePage({ params }: Props) {
  const a = getAlternative((await params).slug);
  if (!a) notFound();
  const path = `/alternatives/${a.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Alternatives", path: "/alternatives" },
    { name: `${a.name} alternative`, path }
  ];
  const m = meta(a.name, a.category);
  const others = alternatives.filter((x) => x.slug !== a.slug);

  return (
    <main className="relative">
      <JsonLd data={[webPageLd({ path, ...m }), breadcrumbLd(crumbs), faqLd(a.faqs)]} />
      <Nav />
      <PageHero
        crumbs={crumbs}
        eyebrow={`Larzo vs ${a.name}`}
        title={`The ${a.name} alternative`}
        accent="built for agencies who pitch local businesses."
        intro={
          <>
            {a.summary} Larzo starts where a list ends: it audits every business, ranks it by real opportunity with evidence, and writes the outreach.
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a href="#join" className="btn-primary">Join the waitlist</a>
          <a href="#side-by-side" className="btn-ghost">See the comparison</a>
        </div>
      </PageHero>

      <section id="side-by-side" className="relative scroll-mt-24 py-10 sm:py-16">
        <div className="container">
          <H2 eyebrow="Side by side">{a.name} vs Larzo at a glance</H2>
          {(() => {
            const glance = [
                  ["Type of tool", a.category, "Local business intelligence workspace"],
                  ["Best for", a.bestFor, "Agencies and freelancers selling services to local businesses"],
                  ["Pricing model", a.pricingModel, "Private beta — early members get free months at launch"],
                  ["What it checks per business", a.audit, "Website speed (Core Web Vitals), tech, verified socials, business and opportunity"],
                  ["Opportunity score with evidence", "Not their focus", "Every finding traced to its source"],
                  ["Outreach", a.outreach, "Email, call script, proposal, audit and DM written from verified findings — sent from your inbox"]
                ];
            return (
              <>
                <div className="mt-8 hidden overflow-hidden rounded-3xl border border-white/[0.07] sm:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.14em] text-mute-2">
                      <tr>
                        <th scope="col" className="w-[22%] px-5 py-4 font-mono font-medium"><span className="sr-only">Feature</span></th>
                        <th scope="col" className="px-5 py-4 font-mono font-medium">{a.name}</th>
                        <th scope="col" className="px-5 py-4 font-mono font-medium text-cyan-300">Larzo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {glance.map(([k, them, us]) => (
                        <tr key={k}>
                          <th scope="row" className="px-5 py-4 align-top font-medium text-slate-200">{k}</th>
                          <td className="px-5 py-4 align-top text-mute">{them}</td>
                          <td className="px-5 py-4 align-top text-slate-200">{us}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <dl className="mt-8 space-y-3 sm:hidden">
                  {glance.map(([k, them, us]) => (
                    <div key={k} className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4">
                      <dt className="text-sm font-medium text-white">{k}</dt>
                      <dd className="mt-3 grid gap-2 text-[13px] leading-relaxed">
                        <p className="text-mute"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mute-3">{a.name}</span>{them}</p>
                        <p className="text-slate-200"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">Larzo</span>{us}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            );
          })()}
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="container grid gap-4 md:grid-cols-2">
          <SpotlightCard className="h-full p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">What {a.name} does well</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed">
              {a.theyDo.map((t) => (
                <li key={t} className="flex gap-3 text-mute">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/[0.06] text-slate-300"><Check className="size-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </SpotlightCard>
          <SpotlightCard className="h-full p-6 sm:p-8" glow="6,182,212">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">What Larzo adds</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed">
              {a.larzoAdds.map((t) => (
                <li key={t} className="flex gap-3 text-slate-300">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white"><Sparkles className="size-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="container">
          <H2 eyebrow="Honest take">Which one should you choose?</H2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white">Choose {a.name} if…</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{a.chooseThem}</p>
            </div>
            <div className="rounded-3xl border border-violet-400/25 bg-violet-500/[0.06] p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white">Choose Larzo if…</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{a.chooseLarzo}</p>
            </div>
          </div>
          <p className="mt-6 text-[11px] leading-relaxed text-mute-3">
            Based on {a.name}&apos;s publicly documented features and pricing model (Oct 2026); check their site for current details. {a.name} is a trademark of its owner, used here for identification only. See the full <Link href="/compare" className="underline underline-offset-2 hover:text-white">category comparison</Link>.
          </p>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <H2 eyebrow="FAQ">{a.name} vs Larzo, answered</H2>
          <FaqList items={a.faqs} />
        </div>
      </section>

      <LinkGrid title="More comparisons" links={others.map((o) => ({ href: `/alternatives/${o.slug}`, label: `${o.name} alternative`, sub: o.category }))} />
      <JoinCta id={`alt-${a.slug}-form`} title={`Outgrow ${a.name}. Keep the context.`} />
      <Footer />
    </main>
  );
}
