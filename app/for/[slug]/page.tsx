import type { Metadata } from "next";
import { Check, MapPin, Sparkles, X } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { FaqList, H2, JoinCta, LinkGrid, PageHero } from "@/components/seo-blocks";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { alternatives } from "@/lib/alternatives";
import { breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";
import { getUseCase, useCases } from "@/lib/use-cases";

/** Lowercase for mid-sentence use, keeping acronyms like "SEO". */
const lower = (t: string) => t.split(" ").map((w) => (w === w.toUpperCase() ? w : w.toLowerCase())).join(" ");

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = getUseCase((await params).slug);
  if (!u) return {};
  const path = `/for/${u.slug}`;
  return {
    title: { absolute: `${u.title} | Larzo` },
    description: u.description,
    alternates: { canonical: path },
    openGraph: { title: u.title, description: u.description, url: path },
    twitter: { title: u.title, description: u.description }
  };
}

const steps = [
  { n: "01", t: "Search a niche + city", b: "“Dentists in Austin”, “roofers in Leeds”. Larzo pulls every matching business from Google Maps." },
  { n: "02", t: "Five engines audit each one", b: "Website speed, technology, social, business and opportunity — every finding linked to its source." },
  { n: "03", t: "Ranked by real opportunity", b: "See who needs you most and the evidence why, before you spend a minute on outreach." },
  { n: "04", t: "Pitch in one click", b: "Email, call script, proposal, audit or DM written from that business's own findings." }
];

export default async function UseCasePage({ params }: Props) {
  const u = getUseCase((await params).slug);
  if (!u) notFound();
  const path = `/for/${u.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: u.audience, path }
  ];

  return (
    <main className="relative">
      <JsonLd data={[webPageLd({ path, title: u.title, description: u.description }), breadcrumbLd(crumbs), faqLd(u.faqs)]} />
      <Nav />
      <PageHero crumbs={crumbs} eyebrow={`Larzo for ${lower(u.audience)}`} title={u.h1} accent={u.accent} intro={u.intro}>
        <div className="flex flex-wrap gap-3">
          <a href="#join" className="btn-primary">Join the waitlist</a>
          <a href="/watch" className="btn-ghost">Watch the film</a>
        </div>
      </PageHero>

      <section className="relative py-10 sm:py-14">
        <div className="container grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-white">Without Larzo</h2>
            <ul className="mt-5 space-y-3 text-sm text-mute">
              {u.pains.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-300"><X className="size-3.5" /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-violet-400/25 bg-violet-500/[0.06] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-white">With Larzo, you pitch with</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {u.pitches.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white"><Check className="size-3.5" /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="container">
          <H2 eyebrow="What Larzo checks">The signals that matter to {lower(u.audience)}</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {u.signals.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <SpotlightCard className="h-full p-6">
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-white"><Sparkles className="size-4" /></span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="container">
          <H2 eyebrow="How it works">From a city to a shortlist in four steps</H2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6">
                <span className="font-mono text-xs text-cyan-300">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-mute-2">Works for any niche on Google Maps, e.g.</span>
            {u.niches.map((n) => (
              <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                <MapPin className="size-3 text-cyan-300" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <H2 eyebrow="FAQ">Questions from {lower(u.audience)}</H2>
          <FaqList items={u.faqs} />
        </div>
      </section>

      <LinkGrid
        title="Explore Larzo"
        links={[
          ...useCases.filter((x) => x.slug !== u.slug).map((x) => ({ href: `/for/${x.slug}`, label: `Larzo for ${x.audience}` })),
          { href: "/compare", label: "Compare Larzo", sub: "vs scrapers, lookups & databases" },
          ...alternatives.slice(0, 4).map((a) => ({ href: `/alternatives/${a.slug}`, label: `${a.name} alternative` }))
        ]}
      />
      <JoinCta id={`for-${u.slug}-form`} />
      <Footer />
    </main>
  );
}
