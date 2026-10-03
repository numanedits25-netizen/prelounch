"use client";

import { motion } from "framer-motion";
import { Eye, KanbanSquare, Map, MousePointerClick, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { SpotlightCard } from "./ui/spotlight-card";

const stages = ["New", "Contacted", "Meeting", "Won"];

function Kanban() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setStage((s) => (s + 1) % stages.length), 1600);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="mt-6 grid grid-cols-4 gap-1.5">
      {stages.map((s, i) => (
        <div key={s} className="min-h-[150px] rounded-xl border border-white/[0.05] bg-white/[0.02] p-1.5">
          <p className="px-1 pb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-mute-3">{s}</p>
          <div className="space-y-1.5">
            {i === stage ? (
              <motion.div layoutId="kanban-card" transition={{ type: "spring", stiffness: 300, damping: 28 }} className="rounded-lg border border-cyan-400/30 bg-cyan-400/[0.08] p-1.5">
                <p className="truncate text-[10px] font-medium text-white">Bright Smile</p>
                <p className="font-mono text-[9px] text-cyan-300">91</p>
              </motion.div>
            ) : null}
            {Array.from({ length: (i * 7 + 2) % 3 + 1 }).map((_, k) => (
              <div key={k} className="h-8 rounded-lg bg-white/[0.035]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniMap() {
  const pts = [[18, 30, 1], [34, 58, 0], [52, 24, 1], [70, 46, 0], [44, 76, 1], [80, 70, 0], [26, 80, 0], [62, 62, 1], [86, 28, 0]];
  return (
    <div className="relative mt-6 h-[150px] overflow-hidden rounded-xl border border-white/[0.05] bg-[#08080d]">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0 40 L100 34 M0 72 L100 80 M28 0 L22 100 M66 0 L72 100" stroke="rgba(148,163,184,.18)" strokeWidth=".5" fill="none" />
        <path d="M-5 92 C 25 70, 55 98, 105 76" stroke="rgba(6,182,212,.3)" strokeWidth="3" fill="none" />
      </svg>
      {pts.map(([x, y, hot], i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 400 }}
        >
          {hot ? <span className="absolute -inset-1 animate-ping2 rounded-full bg-cyan-400" /> : null}
          <span className={`relative block size-2.5 rounded-full ${hot ? "bg-cyan-300 shadow-[0_0_10px_#22d3ee]" : "bg-violet-400/70"}`} />
        </motion.span>
      ))}
    </div>
  );
}

function Tracking() {
  const rows = [
    { icon: Send, l: "Sent", v: 48, w: 100 },
    { icon: Eye, l: "Opened", v: 31, w: 65 },
    { icon: MousePointerClick, l: "Clicked", v: 12, w: 25 }
  ];
  return (
    <div className="mt-6 space-y-3">
      {rows.map((r, i) => (
        <div key={r.l}>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-mute"><r.icon className="size-3.5 text-violet-300" /> {r.l}</span>
            <span className="font-mono text-slate-200">{r.v}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${r.w}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
      <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3">Open & click tracking per lead</p>
    </div>
  );
}

export function Workflow() {
  const cards = [
    { icon: KanbanSquare, t: "Built-in CRM", c: "Pipeline stages, notes and tasks — every lead keeps its intelligence attached.", v: <Kanban /> },
    { icon: Map, t: "Map intelligence", c: "See your saved leads geographically and plan territory by opportunity.", v: <MiniMap /> },
    { icon: Send, t: "Outreach tracking", c: "Send from your own inbox and see exactly who opened and clicked.", v: <Tracking /> }
  ];
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading eyebrow="The rest of the workflow" title="Replace the stack," accent="keep the context." copy="Finding the lead is half the job. Larzo carries every insight through outreach and into your pipeline — no exports, no copy-paste." />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <SpotlightCard className="h-full p-6">
                <c.icon className="size-5 text-cyan-300" />
                <p className="mt-4 font-display text-xl font-bold tracking-tight text-white">{c.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{c.c}</p>
                {c.v}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
