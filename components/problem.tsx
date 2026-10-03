"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Clock, FileSpreadsheet, Gauge, Globe, MapPin, MessageSquare, Search, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./ui/section-heading";
import { InstagramIcon } from "./ui/brand-icons";
import { ScoreRing } from "./ui/score-ring";

const tabs = [
  { icon: MapPin, title: "Google Maps", sub: "dentists near austin", x: -380, y: -150, r: -12 },
  { icon: Globe, title: "brightsmile-dental.com", sub: "loading… 5s", x: 330, y: -170, r: 9 },
  { icon: Gauge, title: "PageSpeed Insights", sub: "mobile: 38", x: -420, y: 40, r: 6 },
  { icon: InstagramIcon, title: "Instagram", sub: "last post: 7 months ago", x: 380, y: 30, r: -8 },
  { icon: Search, title: "BuiltWith", sub: "what CMS is this?", x: -300, y: 190, r: -4 },
  { icon: FileSpreadsheet, title: "leads_FINAL_v3.xlsx", sub: "row 214 of ???", x: 290, y: 200, r: 11 },
  { icon: Star, title: "Google reviews", sub: "312 reviews · 4.8", x: -60, y: -230, r: 3 },
  { icon: MessageSquare, title: "ChatGPT", sub: "write a cold email for…", x: 40, y: 250, r: -6 }
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useTransform(scrollYProgress, [0.25, 1], [0, 1]);
  const cardOpacity = useTransform(p, [0.7, 1], [0, 1]);
  const cardScale = useTransform(p, [0.7, 1], [0.8, 1]);
  const timerOpacity = useTransform(p, [0, 0.5], [1, 0]);
  const labelBefore = useTransform(p, [0.4, 0.6], [1, 0]);
  const labelAfter = useTransform(p, [0.6, 0.8], [0, 1]);
  const [k, setK] = useState(1);
  useEffect(() => {
    const f = () => setK(window.innerWidth < 640 ? 0.42 : window.innerWidth < 1024 ? 0.75 : 1);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="The problem"
          title="Prospecting still means"
          accent="forty open tabs."
          copy="Maps for the list. Their site for the speed. PageSpeed for proof. Instagram for activity. A spreadsheet to hold it together — and still guessing what to pitch. Scroll to see what changes."
        />

        <div ref={ref} className="relative mx-auto mt-16 h-[560px] max-w-5xl overflow-hidden rounded-[32px] border border-white/[0.06] bg-ink-900/60 sm:h-[620px]">
          <div className="dot-bg absolute inset-0 opacity-50" />
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

          {/* state label */}
          <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2">
            <div className="relative h-8 w-60">
              <motion.span style={{ opacity: labelBefore }} className="absolute inset-0 flex items-center justify-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/[0.06] font-mono text-[11px] uppercase tracking-[0.2em] text-rose-200">
                Without Larzo
              </motion.span>
              <motion.span style={{ opacity: labelAfter }} className="absolute inset-0 flex items-center justify-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                With Larzo
              </motion.span>
            </div>
          </div>

          <motion.div style={{ opacity: timerOpacity }} className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 font-mono text-xs text-rose-200">
            <Clock className="size-3.5" /> Hours of tab-switching per lead list
          </motion.div>

          <div className="absolute left-1/2 top-1/2">
            {tabs.map((t, i) => (
              <Tab key={`${t.title}-${k}`} t={t} p={p} i={i} k={k} />
            ))}

            <motion.div style={{ opacity: cardOpacity, scale: cardScale }} className="absolute left-0 top-0 z-20">
              <div className="border-glow glass w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 sm:w-[360px]">
                <div className="flex items-center gap-3">
                  <ScoreRing value={91} size={58} />
                  <div className="min-w-0">
                    <p className="font-semibold text-white">Bright Smile Dental</p>
                    <p className="text-xs text-mute">4.8 ★ · 312 reviews · Austin, TX</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    ["Website", "4.9s mobile LCP"],
                    ["Tech", "WordPress · no Pixel"],
                    ["Social", "IG dormant 7 mo"],
                    ["Business", "No online booking"]
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mute-3">{k}</p>
                      <p className="mt-0.5 text-slate-200">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand-gradient/10 p-2.5 text-xs text-slate-200" style={{ background: "linear-gradient(135deg,rgba(124,58,237,.18),rgba(6,182,212,.12))" }}>
                  <Sparkles className="size-4 shrink-0 text-cyan-300" /> Pitch ready: speed fix + online booking
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tab({ t, p, i, k }: { t: (typeof tabs)[number]; p: MotionValue<number>; i: number; k: number }) {
  const x = useTransform(p, [0, 0.75], [t.x * k, 0]);
  const y = useTransform(p, [0, 0.75], [t.y * (k < 1 ? 0.95 : 1), 0]);
  const rotate = useTransform(p, [0, 0.75], [t.r, 0]);
  const opacity = useTransform(p, [0, 0.55, 0.75], [1, 0.9, 0]);
  const scale = useTransform(p, [0, 0.75], [1, 0.5]);
  const Icon = t.icon;
  return (
    <motion.div style={{ x, y, rotate, opacity, scale, zIndex: i }} className="absolute left-0 top-0">
      <div className="-translate-x-1/2 -translate-y-1/2 scale-[.72] sm:scale-100">
        <div className="w-[230px] rounded-2xl border border-white/10 bg-[#111118] shadow-[0_20px_50px_rgba(0,0,0,.5)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
            <span className="size-2 rounded-full bg-rose-400/60" />
            <span className="size-2 rounded-full bg-amber-300/60" />
            <span className="size-2 rounded-full bg-emerald-400/60" />
          </div>
          <div className="flex items-center gap-3 p-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.05]">
              <Icon className="size-4 text-slate-300" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-slate-100">{t.title}</p>
              <p className="truncate font-mono text-[10px] text-mute-2">{t.sub}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
