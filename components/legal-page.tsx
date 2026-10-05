import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Nav } from "./nav";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="relative">
      <Nav />
      <section className="relative overflow-x-clip pb-24 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-220px] h-[480px] w-[700px] rounded-full bg-violet-600/15 blur-[140px]" />
        </div>
        <div className="container max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-mute-2">Last updated {updated}</p>
          <div className="legal mt-12 space-y-10 text-[15px] leading-relaxed text-mute">{children}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export function LegalSection({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-white">{h}</h2>
      <div className="mt-3 space-y-3 [&_a]:text-cyan-300 [&_a:hover]:text-white [&_li]:pl-1 [&_strong]:text-slate-200 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">{children}</div>
    </section>
  );
}
