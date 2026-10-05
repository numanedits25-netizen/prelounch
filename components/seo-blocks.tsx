import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./ui/reveal";
import { WaitlistForm } from "./waitlist-form";

/** Visible breadcrumb trail (pairs with breadcrumbLd for search results). */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-mute-2">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1">
            {i > 0 ? <ChevronRight className="size-3 text-mute-3" aria-hidden="true" /> : null}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-slate-300">{it.name}</span>
            ) : (
              <Link href={it.path} className="transition hover:text-white">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Static hero for landing pages: real, fully server-rendered H1 (no JS needed to read it). */
export function PageHero({ eyebrow, title, accent, intro, crumbs, children }: { eyebrow: string; title: string; accent?: string; intro: ReactNode; crumbs: { name: string; path: string }[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-x-clip pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg mask-radial absolute inset-x-0 top-0 h-[700px] opacity-40" />
        <div className="absolute left-[-10%] top-[-200px] h-[560px] w-[760px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute right-[-10%] top-[40px] h-[520px] w-[700px] rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>
      <div className="container"><div className="max-w-4xl">
        <Breadcrumbs items={crumbs} />
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          {eyebrow}
        </span>
        <h1 className="mt-5 animate-[fadeUp_.8s_cubic-bezier(.22,1,.36,1)_both] font-display text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.6rem]">
          {title} {accent ? <span className="text-gradient">{accent}</span> : null}
        </h1>
        <p className="mt-6 max-w-2xl animate-[fadeUp_.8s_.12s_cubic-bezier(.22,1,.36,1)_both] text-base leading-relaxed text-mute sm:text-lg">{intro}</p>
        {children ? <div className="mt-8 animate-[fadeUp_.8s_.24s_cubic-bezier(.22,1,.36,1)_both]">{children}</div> : null}
      </div></div>
    </section>
  );
}

export function H2({ eyebrow, children, className }: { eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow ? <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">{children}</h2>
    </div>
  );
}

/** FAQ rendered with native <details> so answers are in the HTML for crawlers. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-white/[0.07] bg-white/[0.015] transition-colors open:border-violet-400/25 open:bg-white/[0.035] hover:border-white/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-medium text-white sm:text-[17px]">{f.q}</h3>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition group-open:rotate-45 group-open:border-transparent group-open:bg-brand-gradient">
              <Plus className="size-4 text-white" />
            </span>
          </summary>
          <p className="px-5 pb-5 text-[15px] leading-relaxed text-mute sm:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function JoinCta({ id, title = "Get founding access to Larzo.", copy = "Private beta, invites in waves. Founding members lock in a special rate." }: { id: string; title?: string; copy?: string }) {
  return (
    <section id="join" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[140px]" />
      </div>
      <div className="container flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">{title}</h2>
        </Reveal>
        <p className="mx-auto mt-5 max-w-xl text-base text-mute sm:text-lg">{copy}</p>
        <div className="mt-9 flex w-full justify-center">
          <WaitlistForm id={id} />
        </div>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-mute transition hover:text-white">
          See how Larzo works <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

/** Internal-link grid: helps crawlers and readers reach every landing page. */
export function LinkGrid({ title, links }: { title: string; links: { href: string; label: string; sub?: string }[] }) {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="container">
        <H2>{title}</H2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.015] px-5 py-4 transition hover:border-violet-400/30 hover:bg-white/[0.04]">
              <span>
                <span className="block text-sm font-medium text-white">{l.label}</span>
                {l.sub ? <span className="mt-0.5 block text-xs text-mute-2">{l.sub}</span> : null}
              </span>
              <ArrowRight className="size-4 shrink-0 text-mute-3 transition group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
