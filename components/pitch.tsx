"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ClipboardList, FileText, Mail, MessageCircle, Phone, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

const assets = [
  {
    id: "email",
    icon: Mail,
    label: "Cold email",
    meta: "Subject: Patients are leaving brightsmile-dental.com before it loads",
    body: "Hi Dr. Patel,\n\nI ran your site through Google's real-user data: on mobile it takes 4.9s to show anything, and more than half of mobile visitors leave after 3. There's also no way to book online, so the 312 people who loved you on Google have to call during office hours.\n\nWe can fix both in about three weeks. Want the 1-page audit?"
  },
  {
    id: "call",
    icon: Phone,
    label: "Call script",
    meta: "Opener · 30 seconds · then discovery",
    body: "“Hi, is this the practice manager? I'll be quick — I was looking at Bright Smile online. Your reviews are excellent, 4.8 from over 300 patients. But on a phone your site takes almost five seconds to load and there's no online booking.\n\nHow are most new patients booking with you today?”"
  },
  {
    id: "proposal",
    icon: FileText,
    label: "Proposal",
    meta: "Scope · timeline · outcome",
    body: "1. Performance rebuild — target mobile LCP under 2.5s\n2. Online booking integrated into every service page\n3. Meta Pixel + GA4 conversion tracking\n4. Instagram reactivation: 12 posts from existing patient stories\n\nTimeline: 3 weeks · Outcome: more booked appointments from existing traffic."
  },
  {
    id: "audit",
    icon: ClipboardList,
    label: "Audit",
    meta: "Findings with evidence",
    body: "✕ Mobile LCP 4.9s — Poor (CrUX, 28-day field data)\n✕ No booking widget detected on any crawled page\n✕ Meta Pixel not installed — no retargeting possible\n△ Instagram: last post 7 months ago\n✓ Google rating 4.8 from 312 reviews — strong trust signal"
  },
  {
    id: "social",
    icon: MessageCircle,
    label: "Social DM",
    meta: "Instagram · short & human",
    body: "Love what you've built at Bright Smile — those reviews are seriously good 🙌 Noticed the IG has been quiet since spring. We help dental practices turn happy-patient stories into weekly posts. Want 3 free post ideas made from your own reviews?"
  }
];

const grounds = ["4.9s mobile LCP", "No online booking", "312 reviews · 4.8★", "No Meta Pixel", "IG dormant 7 mo"];

export function Pitch() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [n, setN] = useState(0);
  const a = assets[i];

  useEffect(() => {
    if (!inView) return;
    setN(0);
    const iv = setInterval(() => setN((v) => (v >= a.body.length ? v : v + 3)), 16);
    return () => clearInterval(iv);
  }, [i, inView, a.body.length]);

  useEffect(() => {
    if (!auto || !inView || n < a.body.length) return;
    const t = setTimeout(() => setI((v) => (v + 1) % assets.length), 3200);
    return () => clearTimeout(t);
  }, [n, auto, inView, a.body.length]);

  return (
    <section id="pitch" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-[500px] w-[600px] rounded-full bg-violet-700/15 blur-[140px]" />
      <div className="container grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            align="left"
            eyebrow="AI lead assistant"
            title="The pitch writes"
            accent="itself."
            copy="Not generic AI copy. Every email, script and proposal is grounded in what the engines actually found on that business — so it reads like you spent an hour on research."
          />
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-3">Grounded in</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {grounds.map((g, k) => (
                <motion.span
                  key={g}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: k * 0.08 }}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 font-mono text-[11px] text-cyan-200"
                >
                  {g}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div ref={ref} className="relative min-w-0">
          <div className="absolute -inset-6 -z-10 rounded-[40px] bg-brand-gradient opacity-20 blur-[70px]" />
          <div className="border-glow glass rounded-[28px] p-2">
            <div className="rounded-[22px] border border-white/[0.06] bg-[#08080d]/90">
              <div className="flex gap-1 overflow-x-auto border-b border-white/[0.06] p-2 [scrollbar-width:none]">
                {assets.map((x, k) => (
                  <button
                    key={x.id}
                    onClick={() => {
                      setAuto(false);
                      setI(k);
                    }}
                    className={cn("relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition", k === i ? "text-white" : "text-mute hover:text-slate-200")}
                  >
                    {k === i ? <motion.span layoutId="pitch-tab" className="absolute inset-0 rounded-xl bg-white/[0.07]" transition={{ type: "spring", stiffness: 400, damping: 32 }} /> : null}
                    <x.icon className="relative size-3.5" />
                    <span className="relative">{x.label}</span>
                  </button>
                ))}
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex min-w-0 items-center gap-2 truncate text-xs text-mute">
                    <Sparkles className="size-3.5 shrink-0 text-violet-400" />
                    <span className="truncate">{a.meta}</span>
                  </p>
                  <button
                    onClick={() => {
                      setAuto(false);
                      setN(0);
                      setI((v) => v);
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-2 py-1 text-[11px] text-mute transition hover:text-white"
                  >
                    <RefreshCw className="size-3" /> Regenerate
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={a.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 min-h-[280px] whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-slate-200 sm:min-h-[260px] sm:text-[15px]"
                  >
                    {a.body.slice(0, n)}
                    {n < a.body.length ? <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-cyan-400" /> : null}
                  </motion.pre>
                </AnimatePresence>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <div className="flex gap-1">
                    {assets.map((x, k) => (
                      <span key={x.id} className={cn("h-1 rounded-full transition-all duration-500", k === i ? "w-6 bg-cyan-400" : "w-2 bg-white/15")} />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3">Example output</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
