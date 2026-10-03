"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BarChart3, Check, Eye, Fingerprint, Globe, Layers, Mail, MapPin, MousePointerClick, Radar, Send, Share2, Store, Target, TrendingUp, Wand2 } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

const steps = [
  {
    key: "discover",
    n: "01",
    icon: Radar,
    title: "Discover",
    lead: "Every business on the map — not just page one.",
    copy: "Type a niche and a city. LeadZone fans the query out across keywords, sub-categories and map tiles, then de-duplicates every result on its Google Place ID. One search, the whole market."
  },
  {
    key: "understand",
    n: "02",
    icon: Layers,
    title: "Understand",
    lead: "Five engines audit every lead in parallel.",
    copy: "Website performance from real Core Web Vitals, the full technology stack, verified social presence, business signals and the opportunity itself — each backed by the evidence it found."
  },
  {
    key: "prioritise",
    n: "03",
    icon: Target,
    title: "Prioritise",
    lead: "Know who to call first, and why.",
    copy: "Every business gets an opportunity score that reflects where you can genuinely add value — not who has the worst website. Your list re-orders itself around the deals worth chasing."
  },
  {
    key: "engage",
    n: "04",
    icon: Send,
    title: "Engage",
    lead: "From gap to sent pitch in one click.",
    copy: "Generate a cold email, call script, proposal or audit grounded in that lead's real findings. Send it, track opens and clicks, and move the deal through your pipeline."
  }
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProg(v);
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  return (
    <section id="how" className="relative pt-20 sm:pt-28">
      <div className="container">
        <SectionHeading eyebrow="How it works" title="One flow." accent="Search to signed." copy="Four moves replace the spreadsheet, the tabs and the guesswork." />
      </div>

      {/* desktop: sticky scrollytelling */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${steps.length * 85}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container grid grid-cols-[0.9fr_1.1fr] items-center gap-16">
            <div className="relative">
              <div className="absolute bottom-3 left-[19px] top-3 w-px bg-white/[0.07]">
                <motion.div className="w-full origin-top bg-gradient-to-b from-violet-500 to-cyan-400" style={{ height: `${prog * 100}%` }} />
              </div>
              <div className="space-y-2">
                {steps.map((s, i) => (
                  <div key={s.key} className={cn("relative flex gap-6 rounded-3xl p-4 pl-0 transition-all duration-500", i === active ? "opacity-100" : "opacity-40")}>
                    <span
                      className={cn(
                        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        i <= active ? "border-transparent bg-brand-gradient shadow-[0_0_24px_rgba(124,58,237,.5)]" : "border-white/10 bg-ink"
                      )}
                    >
                      <s.icon className="size-4 text-white" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-2">
                        {s.n} — {s.title}
                      </p>
                      <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white">{s.lead}</p>
                      <AnimatePresence initial={false}>
                        {i === active ? (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden text-[15px] leading-relaxed text-mute"
                          >
                            <span className="block pt-2">{s.copy}</span>
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 -z-10 rounded-full bg-violet-600/15 blur-[100px]" />
              <div className="border-glow glass relative aspect-[1.1] overflow-hidden rounded-[32px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <StepVisual k={steps[active].key} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile / tablet: stacked */}
      <div className="container mt-14 space-y-14 pb-8 lg:hidden">
        {steps.map((s) => (
          <motion.div key={s.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-gradient">
                <s.icon className="size-4 text-white" />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-2">
                {s.n} — {s.title}
              </p>
            </div>
            <p className="mt-4 font-display text-2xl font-bold tracking-tight text-white">{s.lead}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.copy}</p>
            <div className="glass relative mt-6 aspect-[1.05] overflow-hidden rounded-[28px]">
              <StepVisual k={s.key} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StepVisual({ k }: { k: string }) {
  if (k === "discover") return <DiscoverVisual />;
  if (k === "understand") return <UnderstandVisual />;
  if (k === "prioritise") return <PrioritiseVisual />;
  return <EngageVisual />;
}

/* ── 01 Discover: fan-out grid + pins dropping + dedupe ── */
function DiscoverVisual() {
  const tiles = Array.from({ length: 16 });
  const pinsPos = [
    [14, 22], [32, 16], [58, 26], [78, 18], [22, 44], [44, 38], [66, 48], [86, 40],
    [12, 70], [36, 64], [54, 72], [74, 66], [28, 86], [62, 88], [84, 82], [48, 54]
  ];
  return (
    <div className="absolute inset-0 p-6 sm:p-8">
      <div className="flex flex-wrap gap-1.5">
        {["dentist", "dental clinic", "orthodontist", "cosmetic dentist", "emergency dentist"].map((q, i) => (
          <motion.span
            key={q}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-full border border-violet-400/25 bg-violet-500/10 px-2.5 py-1 font-mono text-[10px] text-violet-200"
          >
            {q}
          </motion.span>
        ))}
      </div>
      <div className="relative mt-4 h-[calc(100%-110px)] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#08080d]">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {tiles.map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyan-400/[0.08]"
              initial={{ backgroundColor: "rgba(6,182,212,0)" }}
              animate={{ backgroundColor: ["rgba(6,182,212,0)", "rgba(6,182,212,0.12)", "rgba(6,182,212,0.02)"] }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.8 }}
            />
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 30 L100 22 M0 62 L100 70 M30 0 L26 100 M70 0 L74 100" stroke="rgba(148,163,184,.25)" strokeWidth=".4" fill="none" />
          <path d="M0 90 C 30 75, 50 95, 100 80" stroke="rgba(6,182,212,.35)" strokeWidth="2" fill="none" />
        </svg>
        {pinsPos.map(([x, y], i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.06, type: "spring", stiffness: 500, damping: 16 }}
          >
            <MapPin className={cn("size-4 -translate-x-1/2 -translate-y-full", i % 3 === 0 ? "fill-cyan-400/30 text-cyan-300" : "fill-violet-400/20 text-violet-300")} />
          </motion.span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[11px]">
        <span className="text-mute-2">keyword × subtype × tile</span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="flex items-center gap-1.5 text-cyan-300">
          <Fingerprint className="size-3.5" /> de-duplicated by Place ID
        </motion.span>
      </div>
    </div>
  );
}

/* ── 02 Understand: five engines running ── */
function UnderstandVisual() {
  const engines = [
    { icon: Globe, name: "Website", out: "LCP 4.9s · CLS 0.02", c: "#22d3ee" },
    { icon: BarChart3, name: "Technology", out: "WordPress · GA4 · no Pixel", c: "#a78bfa" },
    { icon: Share2, name: "Social", out: "IG dormant · no TikTok", c: "#818cf8" },
    { icon: Store, name: "Business", out: "4.8★ · 312 reviews", c: "#67e8f9" },
    { icon: TrendingUp, name: "Opportunity", out: "Score 91 · 3 gaps", c: "#c4b5fd" }
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-10">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute-2">Analysing · Bright Smile Dental</p>
      {engines.map((e, i) => (
        <motion.div
          key={e.name}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3.5"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg" style={{ background: `${e.c}1a` }}>
              <e.icon className="size-4" style={{ color: e.c }} />
            </span>
            <span className="text-sm font-medium text-white">{e.name}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.25 }}
              className="ml-auto truncate pl-2 font-mono text-[11px] text-mute"
            >
              {e.out}
            </motion.span>
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55 + i * 0.25, type: "spring" }}>
              <Check className="size-4 text-emerald-400" />
            </motion.span>
          </div>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: e.c }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 + i * 0.25, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── 03 Prioritise: list re-sorts by score ── */
function PrioritiseVisual() {
  const base = [
    { n: "Mueller Dental Care", s: 41 },
    { n: "Capitol Dental Studio", s: 72 },
    { n: "Hill Country Ortho", s: 66 },
    { n: "Bright Smile Dental", s: 91 },
    { n: "Lakeway Family Dentistry", s: 84 }
  ];
  const [sorted, setSorted] = useState(false);
  const list = sorted ? [...base].sort((a, b) => b.s - a.s) : base;
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-2">{sorted ? "Ranked by opportunity" : "Raw search order"}</p>
        <motion.span
          onAnimationComplete={() => setSorted(true)}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className={cn("rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors", sorted ? "bg-cyan-400/10 text-cyan-300" : "bg-white/[0.05] text-mute")}
        >
          {sorted ? "Sorted" : "Scoring…"}
        </motion.span>
      </div>
      <div className="space-y-2.5">
        {list.map((l, i) => {
          const c = l.s >= 75 ? "#22d3ee" : l.s >= 50 ? "#a78bfa" : "#64748b";
          return (
            <motion.div
              layout
              key={l.n}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className={cn("flex items-center gap-3 rounded-2xl border p-3.5", sorted && i === 0 ? "border-cyan-400/30 bg-cyan-400/[0.05]" : "border-white/[0.06] bg-white/[0.025]")}
            >
              <span className="w-5 font-mono text-[11px] text-mute-3">{i + 1}</span>
              <span className="flex-1 truncate text-sm text-slate-100">{l.n}</span>
              <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.06] sm:block">
                <motion.div className="h-full rounded-full" style={{ background: c }} initial={{ width: 0 }} animate={{ width: `${l.s}%` }} transition={{ duration: 0.9 }} />
              </div>
              <span className="w-7 text-right font-mono text-sm font-semibold" style={{ color: c }}>
                {l.s}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 04 Engage: draft → send → tracked ── */
function EngageVisual() {
  const line = "Hi Dr. Patel — your site takes 4.9s to load on mobile, and there's no way to book online. Patients searching “dentist near me” bounce before…";
  const events = [
    { icon: Send, label: "Sent", t: "09:12" },
    { icon: Eye, label: "Opened", t: "09:47" },
    { icon: MousePointerClick, label: "Clicked audit", t: "10:03" },
    { icon: Target, label: "Moved to Meeting", t: "10:05" }
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 sm:p-10">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs text-mute">
          <Wand2 className="size-3.5 text-violet-400" /> Cold email · grounded in 3 findings
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">
          {line.split("").map((ch, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.012 }}>
              {ch}
            </motion.span>
          ))}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {events.map((e, i) => (
          <motion.div
            key={e.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 + i * 0.35 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3"
          >
            <e.icon className={cn("size-4", i === 3 ? "text-cyan-300" : "text-violet-300")} />
            <p className="mt-2 text-xs font-medium text-white">{e.label}</p>
            <p className="font-mono text-[10px] text-mute-3">{e.t}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="flex items-center gap-2 self-start rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300"
      >
        <Mail className="size-3.5" /> Every touch logged to the lead’s CRM timeline
      </motion.div>
    </div>
  );
}
