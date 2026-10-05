import { ArrowRight, Code2, Megaphone, MousePointer2, Rocket, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { SpotlightCard } from "./ui/spotlight-card";

const who = [
  { icon: Code2, t: "Web design agencies", href: "/for/web-design-agencies", f: "Slow, outdated, non-mobile sites — and businesses with no website at all." },
  { icon: Search, t: "SEO specialists", href: "/for/seo-agencies", f: "Poor Core Web Vitals, missing analytics, thin local presence." },
  { icon: Megaphone, t: "Social media managers", href: "/for/marketing-agencies", f: "Dormant Instagram, no TikTok, great reviews nobody's posting about." },
  { icon: MousePointer2, t: "Paid ads agencies", href: "/for/marketing-agencies", f: "No Meta Pixel or Tag Manager — zero retargeting, zero attribution." },
  { icon: UserRound, t: "Freelancers", href: "/for/freelancers", f: "A short list of warm-fit clients every week instead of cold spraying." },
  { icon: Rocket, t: "Lead-gen & SDR teams", href: undefined as string | undefined, f: "Ranked, evidence-backed prospects with outreach drafted and tracked." }
];

export function Audience() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading eyebrow="Who it's for" title="If you sell to local businesses," accent="this is your unfair advantage." />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {who.map((w, i) => (
            <Reveal key={w.t} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 ring-1 ring-white/10">
                    <w.icon className="size-[18px] text-violet-300" />
                  </span>
                  <p className="font-display text-lg font-bold tracking-tight text-white">{w.t}</p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">Larzo finds</p>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{w.f}</p>
                {w.href ? (
                  <Link href={w.href} className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-300 transition hover:text-white">
                    Larzo for {w.t.toLowerCase()} <ArrowRight className="size-3.5" />
                  </Link>
                ) : null}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
