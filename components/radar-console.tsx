"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Globe, Mail, MapPin, Search, Sparkles, Star, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { niches, pins } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { CountUp } from "./ui/count-up";
import { ScoreRing } from "./ui/score-ring";

type Phase = "typing" | "scanning" | "results" | "focus";
const SWEEP = 3; // seconds per radar revolution

function pinPos(a: number, r: number) {
  const rad = (a * Math.PI) / 180;
  return { left: `${50 + Math.sin(rad) * r * 46}%`, top: `${50 - Math.cos(rad) * r * 46}%` };
}

function scoreColor(s: number) {
  return s >= 75 ? "#22d3ee" : s >= 50 ? "#a78bfa" : "#475569";
}

export function RadarConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [run, setRun] = useState(0);
  const niche = niches[idx];
  const sorted = [...niche.leads].sort((a, b) => b.score - a.score);
  const top = sorted[0];

  // phase machine
  useEffect(() => {
    if (!inView) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    let iv: ReturnType<typeof setInterval> | undefined;
    if (phase === "typing") {
      setTyped("");
      let i = 0;
      iv = setInterval(() => {
        i++;
        setTyped(niche.query.slice(0, i));
        if (i >= niche.query.length) {
          clearInterval(iv);
          t = setTimeout(() => setPhase("scanning"), 450);
        }
      }, 42);
    } else if (phase === "scanning") {
      t = setTimeout(() => setPhase("results"), SWEEP * 1000 + 200);
    } else if (phase === "results") {
      t = setTimeout(() => setPhase("focus"), 1700);
    } else {
      t = setTimeout(() => {
        setIdx((v) => (v + 1) % niches.length);
        setRun((r) => r + 1);
        setPhase("typing");
      }, 5600);
    }
    return () => {
      if (t) clearTimeout(t);
      if (iv) clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, inView, run]);

  function pick(i: number) {
    setIdx(i);
    setRun((r) => r + 1);
    setPhase("typing");
  }

  const scanned = phase !== "typing";
  const showResults = phase === "results" || phase === "focus";

  return (
    <div ref={ref} className="border-glow glass relative rounded-[28px] p-2 sm:p-3">
      <div className="overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#07070b]/90">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <span className="hidden font-mono text-[11px] text-mute-2 sm:block">app.leadzone.ai/scan</span>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">
            Demo · illustrative
          </span>
        </div>

        {/* search */}
        <div className="border-b border-white/[0.06] px-3 py-3 sm:px-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] py-2 pl-4 pr-2">
            <Search className="size-4 shrink-0 text-cyan-400" />
            <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-slate-100 sm:text-sm">
              {typed}
              {phase === "typing" ? <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-cyan-400" /> : null}
            </span>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-500",
                scanned ? "bg-brand-gradient text-white shadow-[0_0_24px_rgba(124,58,237,.5)]" : "bg-white/[0.06] text-mute"
              )}
            >
              <Zap className="size-3.5" />
              {phase === "scanning" ? "Scanning…" : "Scan"}
            </span>
          </div>
          <div className="mt-2.5 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {niches.map((n, i) => (
              <button
                key={n.id}
                onClick={() => pick(i)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-xs transition-all",
                  i === idx ? "border-violet-400/50 bg-violet-500/15 text-white" : "border-white/[0.08] text-mute hover:border-white/20 hover:text-slate-200"
                )}
              >
                {n.label}
              </button>
            ))}
            <span className="hidden shrink-0 items-center px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3 sm:flex">← try one</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[1.02fr_1fr]">
          {/* radar */}
          <div className="relative border-b border-white/[0.06] p-4 md:border-b-0 md:border-r sm:p-6">
            <div className="relative mx-auto aspect-square w-full max-w-[400px]">
              <RadarBackdrop />
              {/* sweep */}
              {phase === "scanning" || phase === "typing" ? (
                <div
                  key={`sweep-${run}-${phase}`}
                  className="absolute inset-[4%] rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(6,182,212,0.05) 300deg, rgba(6,182,212,0.38) 359deg, rgba(103,232,249,0.9) 360deg)",
                    animation: phase === "scanning" ? `sweep ${SWEEP}s linear 1` : "sweep 6s linear infinite",
                    opacity: phase === "typing" ? 0.35 : 1
                  }}
                />
              ) : null}

              {/* pins */}
              {scanned
                ? pins.map((p, i) => {
                    const hot = p.s >= 75;
                    const isTop = i === 0;
                    return (
                      <motion.span
                        key={`${run}-${i}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={pinPos(p.a, p.r)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: phase === "focus" && !isTop ? 0.8 : 1, opacity: phase === "focus" && !isTop ? 0.35 : 1 }}
                        transition={{ delay: phase === "scanning" ? (p.a / 360) * SWEEP : 0, type: "spring", stiffness: 400, damping: 18 }}
                      >
                        {hot ? <span className="absolute inset-0 animate-ping2 rounded-full" style={{ background: scoreColor(p.s) }} /> : null}
                        <span
                          className="relative block rounded-full"
                          style={{
                            width: hot ? 10 : 7,
                            height: hot ? 10 : 7,
                            background: scoreColor(p.s),
                            boxShadow: hot ? `0 0 14px ${scoreColor(p.s)}` : "none"
                          }}
                        />
                      </motion.span>
                    );
                  })
                : null}

              {/* focus reticle */}
              <AnimatePresence>
                {phase === "focus" ? (
                  <motion.div
                    key="reticle"
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={pinPos(pins[0].a, pins[0].r)}
                    initial={{ scale: 2.4, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative size-12">
                      {["top-0 left-0 border-l-2 border-t-2", "top-0 right-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
                        <span key={c} className={cn("absolute size-3 border-cyan-300", c)} />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* featured lead card */}
              <AnimatePresence mode="wait">
                {phase === "focus" ? (
                  <motion.div
                    key={`card-${run}`}
                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 bottom-0 z-10 rounded-2xl border border-white/10 bg-[#0c0c13]/95 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,.6)] backdrop-blur-xl sm:inset-x-2"
                  >
                    <div className="flex items-center gap-3">
                      <ScoreRing value={top.score} size={52} stroke={5} delay={0.2} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{top.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-mute">
                          <Star className="size-3 fill-amber-300 text-amber-300" /> {top.rating} · {top.reviews} reviews · {top.area}
                        </p>
                      </div>
                      <span className="hidden rounded-lg bg-cyan-400/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300 sm:block">Top pick</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {top.gaps.map((g, i) => (
                        <motion.span
                          key={g}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.12 }}
                          className="rounded-md border border-rose-400/20 bg-rose-400/[0.07] px-2 py-0.5 text-[11px] text-rose-200"
                        >
                          {g}
                        </motion.span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
                      <p className="flex min-w-0 items-center gap-1.5 truncate text-[11px] text-mute">
                        <Sparkles className="size-3.5 shrink-0 text-violet-400" /> Pitch: <span className="truncate text-slate-200">{top.pitch}</span>
                      </p>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-brand-gradient px-2.5 py-1 text-[11px] font-semibold text-white"
                      >
                        <Mail className="size-3" /> Draft email
                      </motion.span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* results */}
          <div className="flex min-h-[320px] flex-col p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-2">Ranked by opportunity</p>
              <p className="font-mono text-[11px] text-mute-2">{showResults ? "5 of " + niche.found : "—"}</p>
            </div>
            <div className="mt-3 flex-1 space-y-2">
              {showResults
                ? sorted.map((l, i) => (
                    <motion.div
                      key={`${run}-${l.name}`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: phase === "focus" && i !== 0 ? 0.45 : 1, x: 0 }}
                      transition={{ delay: phase === "results" ? i * 0.12 : 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500",
                        phase === "focus" && i === 0 ? "border-cyan-400/30 bg-cyan-400/[0.05]" : "border-white/[0.05] bg-white/[0.02]"
                      )}
                    >
                      <span className="font-mono text-[11px] text-mute-3">0{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-slate-100">{l.name}</p>
                        <p className="mt-0.5 flex items-center gap-2 truncate text-[11px] text-mute-2">
                          <span className="inline-flex items-center gap-0.5"><MapPin className="size-3" />{l.area}</span>
                          <span className="inline-flex items-center gap-0.5"><Star className="size-3" />{l.rating}</span>
                          <span className="hidden items-center gap-0.5 sm:inline-flex"><Globe className="size-3" />{l.gaps[0]}</span>
                        </p>
                      </div>
                      <div className="flex w-20 items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: scoreColor(l.score) }}
                            initial={{ width: 0 }}
                            animate={{ width: `${l.score}%` }}
                            transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <span className="w-6 text-right font-mono text-xs font-semibold" style={{ color: scoreColor(l.score) === "#475569" ? "#94a3b8" : scoreColor(l.score) }}>
                          {l.score}
                        </span>
                      </div>
                    </motion.div>
                  ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-3 py-3">
                      <span className="h-2 w-4 rounded bg-white/[0.06]" />
                      <div className="flex-1 space-y-1.5">
                        <div
                          className="h-2.5 rounded bg-gradient-to-r from-white/[0.04] via-white/[0.1] to-white/[0.04] bg-[length:200%_100%]"
                          style={{ width: `${70 - i * 8}%`, animation: phase === "scanning" ? "shimmer 1.4s linear infinite" : undefined }}
                        />
                        <div className="h-2 w-1/3 rounded bg-white/[0.04]" />
                      </div>
                      <span className="h-1.5 w-16 rounded-full bg-white/[0.05]" />
                    </div>
                  ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
              <Stat label="Found" active={scanned}>
                {scanned ? <CountUp key={`f-${run}`} to={niche.found} duration={SWEEP} /> : "0"}
              </Stat>
              <Stat label="Engines" active={scanned}>
                {scanned ? "5/5" : "0/5"}
              </Stat>
              <Stat label="Hot leads" active={showResults} hot>
                {showResults ? <CountUp key={`h-${run}`} to={niche.high} duration={1.2} /> : "—"}
              </Stat>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, children, active, hot }: { label: string; children: React.ReactNode; active: boolean; hot?: boolean }) {
  return (
    <div>
      <p className={cn("font-mono text-lg font-semibold transition-colors sm:text-xl", active ? (hot ? "text-cyan-300" : "text-white") : "text-mute-3")}>{children}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3">{label}</p>
    </div>
  );
}

function RadarBackdrop() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="rb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity=".16" />
          <stop offset="70%" stopColor="#06b6d4" stopOpacity=".04" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id="rc">
          <circle cx="200" cy="200" r="184" />
        </clipPath>
      </defs>
      <circle cx="200" cy="200" r="184" fill="url(#rb)" />
      {/* faux city streets */}
      <g clipPath="url(#rc)" stroke="rgba(148,163,184,.10)" strokeWidth="1" fill="none">
        <path d="M0 120 L400 96 M0 210 L400 236 M0 300 L400 282 M80 0 L110 400 M190 0 L176 400 M286 0 L312 400 M0 40 L400 160" />
        <path d="M-10 340 C 90 300, 140 360, 230 320 S 360 250, 420 280" stroke="rgba(6,182,212,.18)" strokeWidth="9" />
        <path d="M30 60 L140 180 L250 140 L380 220" stroke="rgba(148,163,184,.14)" strokeWidth="2" />
      </g>
      {[46, 92, 138, 184].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeDasharray={r === 184 ? "0" : "2 5"} />
      ))}
      <path d="M200 16 V384 M16 200 H384" stroke="rgba(255,255,255,.06)" />
      {Array.from({ length: 72 }).map((_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const l = i % 6 === 0 ? 8 : 4;
        return (
          <line
            key={i}
            x1={200 + Math.sin(a) * 184}
            y1={200 - Math.cos(a) * 184}
            x2={200 + Math.sin(a) * (184 - l)}
            y2={200 - Math.cos(a) * (184 - l)}
            stroke="rgba(255,255,255,.18)"
          />
        );
      })}
      <circle cx="200" cy="200" r="4" fill="#22d3ee" />
      <circle cx="200" cy="200" r="10" fill="none" stroke="#22d3ee" strokeOpacity=".4" />
    </svg>
  );
}
