"use client";

import { motion } from "framer-motion";
import { CircleHelp, FileCheck2, Fingerprint, Scale } from "lucide-react";
import { CountUp } from "./ui/count-up";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { SpotlightCard } from "./ui/spotlight-card";

const bars = [
  { label: "LeadZone", value: 91.4, grad: "linear-gradient(90deg,#7c3aed,#06b6d4)", hi: true },
  { label: "Wappalyzer", value: 65.2, grad: "linear-gradient(90deg,#334155,#475569)", hi: false }
];

const principles = [
  { icon: FileCheck2, title: "Evidence on every claim", copy: "Each finding is traced to the page, signal or measurement that produced it. Click through and see it yourself." },
  { icon: CircleHelp, title: "“Unknown” beats a guess", copy: "If a signal can't be verified, LeadZone says so — instead of inventing a number to fill the card." },
  { icon: Scale, title: "Deterministic confidence", copy: "Same inputs, same score. Confidence comes from rules you can inspect, not a model's mood." },
  { icon: Fingerprint, title: "Verified ownership", copy: "Websites and social profiles are checked against the business before they're attributed to it." }
];

export function Proof() {
  return (
    <section id="proof" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Honesty over vanity metrics"
          title="Evidence,"
          accent="not vibes."
          copy="Most lead tools guess and dress it up. LeadZone is built to be right — and to tell you when it isn't sure."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <SpotlightCard className="h-full p-6 sm:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute-2">Technology detection · out-of-sample benchmark</p>
              <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
                <div>
                  <p className="font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
                    <CountUp to={91.4} decimals={1} />
                  </p>
                  <p className="mt-1 font-mono text-xs text-mute">F1 score on 142 unseen websites</p>
                </div>
                <div className="flex gap-8 pb-2">
                  <div>
                    <p className="font-mono text-2xl font-semibold text-cyan-300">
                      <CountUp to={100} />
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3">Precision</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-semibold text-violet-300">
                      <CountUp to={84.2} decimals={1} />
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3">Recall</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-5">
                {bars.map((b, i) => (
                  <div key={b.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className={b.hi ? "font-semibold text-white" : "text-mute"}>{b.label}</span>
                      <span className="font-mono text-mute">F1 {b.value}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        className="relative h-full rounded-full"
                        style={{ background: b.grad }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {b.hi ? <span className="absolute right-0 top-1/2 size-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_#22d3ee]" /> : null}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-black/30 p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
                <p className="text-mute-3">// evidence trace · example</p>
                {[
                  ["WordPress", "detected", "/wp-content/ asset paths + generator meta", "text-emerald-300"],
                  ["Meta Pixel", "absent", "no fbq() call on 6 crawled pages", "text-rose-300"],
                  ["Shopify", "unknown", "page blocked crawl — not guessed", "text-amber-300"]
                ].map(([t, st, ev, c], i) => (
                  <motion.p
                    key={t}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.2 }}
                    className="mt-1.5 flex flex-wrap gap-x-2"
                  >
                    <span className="text-slate-200">{t}</span>
                    <span className={c}>{st}</span>
                    <span className="text-mute-2">← {ev}</span>
                  </motion.p>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-mute-3">
                Precision 100 means zero false positives: when LeadZone says a site runs a technology, it does. Internal external-validation benchmark against websites never used in development.
              </p>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <SpotlightCard className="h-full p-5">
                  <div className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      <p.icon className="size-[18px] text-cyan-300" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mute">{p.copy}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
