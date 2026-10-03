"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WaitlistForm } from "./waitlist-form";
import { HeroVideo } from "./hero-video";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isDesktop = useIsDesktop();
  const filmY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const filmOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.25]);

  return (
    <section id="top" ref={ref} className="relative overflow-x-clip pt-24 sm:pt-28 lg:pt-0">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg mask-radial absolute inset-x-0 top-0 h-[900px] opacity-40" />
        <div className="absolute left-[-14%] top-[-220px] h-[620px] w-[820px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute right-[-8%] top-[60px] h-[560px] w-[760px] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute right-[6%] top-[520px] h-[360px] w-[420px] rounded-full bg-fuchsia-500/15 blur-[130px]" />
        <Particles />
      </div>

      {/* ---------- first screen: copy left, product film right ---------- */}
      <div className="relative lg:flex lg:min-h-[100svh] lg:items-center">
        {/* desktop film backdrop */}
        <div className="pointer-events-none absolute right-[-3vw] top-1/2 hidden aspect-video w-[60vw] max-w-[1280px] -translate-y-[46%] lg:block">
        <motion.div style={{ y: filmY, opacity: filmOpacity }} className="h-full w-full">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
            className="relative h-full w-full"
          >
            {/* glow halo behind the film */}
            <div className="absolute inset-[8%] -z-10 rounded-[48px] bg-[conic-gradient(from_200deg,#22d3ee,#3b82f6,#a855f7,#e879f9,#22d3ee)] opacity-30 blur-[80px]" />
            <div className="film-feather pointer-events-auto relative h-full w-full">
              {isDesktop === true && <HeroVideo controlsClassName="bottom-[14%] right-[12%]" />}
            </div>
            {/* HUD corners */}
            <Hud />
          </motion.div>
        </motion.div>
        </div>

        <div className="container relative">
          {/* mobile / tablet film */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="relative -mx-5 mb-8 sm:-mx-6 lg:hidden"
          >
            <div className="absolute inset-[10%] -z-10 bg-[conic-gradient(from_200deg,#22d3ee,#3b82f6,#a855f7,#e879f9,#22d3ee)] opacity-30 blur-[60px]" />
            <div className="film-feather-sm relative aspect-video w-full">
              {isDesktop === false && <HeroVideo controlsClassName="bottom-[10%] right-[6%]" />}
            </div>
          </motion.div>

          <div className="relative z-10 max-w-[42rem] text-center lg:max-w-[40rem] lg:py-32 lg:text-left xl:max-w-[44rem]">
            <motion.a
              href="#join"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-4 text-xs text-slate-300 backdrop-blur transition hover:border-white/20"
            >
              <span className="rounded-full bg-[linear-gradient(100deg,#06b6d4,#3b82f6_50%,#a855f7)] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Private beta</span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                Waitlist open<span className="hidden sm:inline">&nbsp;— invites roll out in waves</span>
              </span>
            </motion.a>

            <h1 className="mt-7 font-display text-[2.35rem] font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3.4rem] lg:text-[3.25rem] xl:text-[3.75rem]">
              {["Every", "local", "business", "|", "has", "a", "gap."].map((w, i) =>
                w === "|" ? (
                  <br key={i} className="hidden sm:block" />
                ) : (
                  <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span className="inline-block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1 + i * 0.07, ease }}>
                      {w}&nbsp;
                    </motion.span>
                  </span>
                )
              )}
              <br />
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  className="inline-block animate-shimmer bg-[linear-gradient(100deg,#67e8f9_0%,#38bdf8_25%,#818cf8_50%,#c084fc_70%,#f0abfc_85%,#67e8f9_100%)] bg-clip-text text-transparent [background-size:200%_auto]"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.6, ease }}
                >
                  Larzo finds it.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
              className="mx-auto mt-6 max-w-[36rem] text-base leading-relaxed text-slate-300/80 sm:text-lg lg:mx-0"
            >
              Scan any niche in any city. Larzo audits every website, tech stack and social profile, scores each opportunity{" "}
              <span className="text-white">with evidence</span> — then writes the pitch. Prospecting, without the forty open tabs.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1, ease }} className="mt-9 flex w-full justify-center lg:justify-start">
              <WaitlistForm id="hero-form" />
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-mute-2 lg:justify-start"
            >
              {["Free early access", "Founding-member pricing", "No spam, ever"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-cyan-400" /> {t}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#how"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mute-2 transition hover:text-white lg:flex"
        >
          See how it works
          <span className="relative h-9 w-[1px] overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-gradient-to-b from-cyan-300 to-transparent" />
          </span>
        </motion.a>
      </div>

    </section>
  );
}

function useIsDesktop() {
  const [v, setV] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return v;
}

function Hud() {
  const c = "absolute size-5 border-cyan-300/50";
  return (
    <div className="pointer-events-none absolute inset-[9%_7%_9%_16%]" aria-hidden="true">
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
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
