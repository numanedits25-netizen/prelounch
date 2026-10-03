"use client";

import { motion } from "framer-motion";
import { BadgePercent, Crown, Gift, MessagesSquare, Share2, UserPlus, Zap } from "lucide-react";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

const perks = [
  { icon: Zap, t: "First-wave access", c: "Skip the public queue. Founding members get invites before anyone else." },
  { icon: BadgePercent, t: "Founding-member pricing", c: "A rate reserved for the people who backed us early." },
  { icon: MessagesSquare, t: "A direct line to the team", c: "Shape the roadmap. Your feature requests jump the queue." },
  { icon: Crown, t: "Priority onboarding", c: "We'll help set up your first niche scans and pipeline." }
];

const steps = [
  { icon: UserPlus, t: "Join", c: "Drop your email — takes five seconds." },
  { icon: Share2, t: "Share", c: "Get a personal link for other agency owners." },
  { icon: Gift, t: "Move up", c: "Every signup through your link moves you up the list." }
];

export function Founding() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-[36px] border border-white/[0.07] bg-ink-900/70 p-6 sm:p-12 lg:p-16">
          <div className="grid-bg mask-radial absolute inset-0 opacity-40" />
          <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-violet-600/25 blur-[120px]" />
          <div className="absolute -bottom-32 -left-20 size-[380px] rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="relative">
            <SectionHeading eyebrow="Founding members" title="Get in before" accent="everyone else." copy="LeadZone opens in waves. The earlier you join, the better your seat." />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {perks.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.07}>
                  <div className="group h-full rounded-3xl border border-white/[0.07] bg-black/30 p-6 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-violet-400/30">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-gradient shadow-[0_10px_30px_-8px_rgba(124,58,237,.7)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <p.icon className="size-5 text-white" />
                    </span>
                    <p className="mt-5 font-display text-lg font-bold tracking-tight text-white">{p.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-mute">{p.c}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="relative mx-auto mt-16 max-w-4xl">
              <div className="absolute left-[16%] right-[16%] top-6 hidden h-px bg-white/10 sm:block">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-violet-500 to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
              </div>
              <div className="grid gap-8 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <Reveal key={s.t} delay={0.2 + i * 0.25} className="text-center">
                    <span className="relative mx-auto flex size-12 items-center justify-center rounded-full border border-white/10 bg-ink">
                      <s.icon className="size-5 text-cyan-300" />
                    </span>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute-2">Step {i + 1}</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">{s.t}</p>
                    <p className="mt-1 text-sm text-mute">{s.c}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
