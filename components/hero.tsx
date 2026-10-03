"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { RadarConsole } from "./radar-console";
import { WaitlistForm } from "./waitlist-form";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 0.35], [40, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);

  return (
    <section id="top" ref={ref} className="relative pt-32 sm:pt-40">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg mask-radial absolute inset-x-0 top-0 h-[900px] opacity-60" />
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute right-[-10%] top-[180px] h-[420px] w-[520px] rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute left-[-12%] top-[420px] h-[380px] w-[480px] rounded-full bg-indigo-600/20 blur-[130px]" />
        {/* top light beam */}
        <div className="absolute left-1/2 top-0 h-[520px] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 via-violet-400/20 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[420px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(103,232,249,.18),transparent_70%)]" />
        <Particles />
      </div>

      <div className="container relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.a
            href="#join"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-4 text-xs text-slate-300 backdrop-blur transition hover:border-white/20"
          >
            <span className="rounded-full bg-brand-gradient px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Private beta</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Waitlist open<span className="hidden sm:inline">&nbsp;— invites roll out in waves</span>
            </span>
          </motion.a>

          <h1 className="mt-7 font-display text-[2.35rem] font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3.6rem] lg:text-[4.4rem]">
            {["Every", "local", "business", "|", "has", "a", "gap."].map((w, i) => w === "|" ? <br key={i} className="hidden sm:block" /> : (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1 + i * 0.07, ease }}>
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className="text-gradient inline-block animate-shimmer [background-size:200%_auto]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.6, ease }}
              >
                LeadZone finds it.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-mute sm:text-lg"
          >
            Scan any niche in any city. LeadZone audits every website, tech stack and social profile, scores each opportunity{" "}
            <span className="text-slate-200">with evidence</span> — then writes the pitch. Prospecting, without the forty open tabs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1, ease }} className="mt-9 flex w-full justify-center">
            <WaitlistForm id="hero-form" />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-mute-2"
          >
            {["Free early access", "Founding-member pricing", "No spam, ever"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-cyan-400" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* product console */}
        <div className="relative mx-auto mt-16 max-w-6xl [perspective:1600px] sm:mt-20">
          <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-x-[8%] -top-10 bottom-10 -z-10 rounded-[60px] bg-brand-gradient opacity-40 blur-[90px]" />
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease }}
          >
            <motion.div style={{ rotateX, scale, y, transformOrigin: "50% 0%" }}>
              <RadarConsole />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Particles() {
  // deterministic positions → no hydration mismatch
  const dots = Array.from({ length: 26 }, (_, i) => ({
    left: (i * 37.3) % 100,
    top: (i * 53.7) % 90,
    size: 1 + (i % 3),
    delay: (i % 7) * 0.8,
    dur: 5 + (i % 5)
  }));
  return (
    <div className="absolute inset-0">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animation: `float ${d.dur}s ease-in-out ${d.delay}s infinite`,
            opacity: 0.15 + (i % 4) * 0.1
          }}
        />
      ))}
    </div>
  );
}
