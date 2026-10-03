"use client";

import { motion } from "framer-motion";
import { Reveal, SplitWords } from "./ui/reveal";
import { WaitlistForm } from "./waitlist-form";

export function FinalCta() {
  return (
    <section id="join" className="relative isolate scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-cyan-400/25"
            style={{ width: i * 220, height: i * 220 }}
            animate={{ opacity: [0.5, 0.1, 0.5], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div
          className="absolute size-[1100px] animate-sweep rounded-full opacity-60"
          style={{ background: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(124,58,237,.18) 345deg, rgba(6,182,212,.35) 360deg)", animationDuration: "8s", maskImage: "radial-gradient(circle, #000 20%, transparent 60%)" }}
        />
        <div className="absolute size-[600px] rounded-full bg-violet-600/20 blur-[140px]" />
      </div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> Waitlist open
          </span>
        </Reveal>
        <h2 className="mt-6 max-w-4xl font-display text-[2.2rem] font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-[3.4rem] lg:text-[4.2rem]">
          <SplitWords text="Your next ten clients are" />{" "}
          <SplitWords text="already on the map." className="text-gradient" delay={0.25} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-base text-mute sm:text-lg">LeadZone shows you where they are, what they need, and what to say. Claim your founding spot.</p>
        </Reveal>
        <Reveal delay={0.4} className="mt-10 flex w-full justify-center">
          <WaitlistForm id="final-form" />
        </Reveal>
      </div>
    </section>
  );
}
