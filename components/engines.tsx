"use client";

import { motion } from "framer-motion";
import { BarChart3, Check, Clock, FileSearch, Globe, ImageIcon, Link2, MapPin, Phone, Share2, Store, TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon } from "./ui/brand-icons";
import { CountUp } from "./ui/count-up";
import { Reveal } from "./ui/reveal";
import { ScoreRing } from "./ui/score-ring";
import { SectionHeading } from "./ui/section-heading";
import { SpotlightCard } from "./ui/spotlight-card";

function EngineHeader({ icon: Icon, n, title, color }: { icon: typeof Globe; n: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08]" style={{ background: `${color}14` }}>
        <Icon className="size-[18px]" style={{ color }} />
      </span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute-3">Engine {n}</p>
        <p className="font-display text-lg font-bold tracking-tight text-white">{title}</p>
      </div>
    </div>
  );
}

export function Engines() {
  return (
    <section id="engines" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,.14),transparent_60%)]" />
      <div className="container">
        <SectionHeading
          eyebrow="The intelligence layer"
          title="Five engines."
          accent="One verdict."
          copy="Every lead runs through five specialised engines. Each one shows its work — so you walk into the call knowing exactly what's broken and how to fix it."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {/* Website */}
          <Reveal className="md:col-span-4">
            <SpotlightCard className="h-full p-6 sm:p-7" glow="6,182,212">
              <EngineHeader icon={Globe} n="01" title="Website intelligence" color="#22d3ee" />
              <p className="mt-3 max-w-md text-sm text-mute">Real-world Core Web Vitals from Google PageSpeed & CrUX, mobile experience, SSL and ownership checks — measured, not eyeballed.</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Gauge label="LCP" value="4.9s" pct={82} tone="bad" note="Poor" />
                <Gauge label="INP" value="310ms" pct={55} tone="warn" note="Needs work" />
                <Gauge label="CLS" value="0.02" pct={12} tone="good" note="Good" />
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Technology */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <SpotlightCard className="h-full p-6 sm:p-7" glow="167,139,250">
              <EngineHeader icon={BarChart3} n="02" title="Technology" color="#a78bfa" />
              <div className="mt-5 space-y-2">
                {[
                  ["WordPress", true],
                  ["Google Analytics 4", true],
                  ["Elementor", true],
                  ["Meta Pixel", false],
                  ["Google Tag Manager", false]
                ].map(([t, ok], i) => (
                  <motion.div
                    key={t as string}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[13px]"
                  >
                    <span className={ok ? "text-slate-200" : "text-mute-2"}>{t as string}</span>
                    {ok ? <Check className="size-3.5 text-emerald-400" /> : <span className="flex items-center gap-1 font-mono text-[10px] text-rose-300"><X className="size-3" />missing</span>}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Social */}
          <Reveal className="md:col-span-2" delay={0.05}>
            <SpotlightCard className="h-full p-6 sm:p-7" glow="129,140,248">
              <EngineHeader icon={Share2} n="03" title="Social presence" color="#818cf8" />
              <p className="mt-3 text-sm text-mute">Verified profiles only — linked from the business itself, never guessed.</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  { I: InstagramIcon, n: "Instagram", s: "Dormant 7 mo", tone: "warn" },
                  { I: FacebookIcon, n: "Facebook", s: "Active", tone: "good" },
                  { I: TiktokIcon, n: "TikTok", s: "Not found", tone: "bad" },
                  { I: LinkedinIcon, n: "LinkedIn", s: "Not found", tone: "bad" }
                ].map(({ I, n, s, tone }) => (
                  <div key={n} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                    <I className="size-4 text-slate-300" />
                    <p className="mt-2 text-xs text-slate-200">{n}</p>
                    <p className={cn("font-mono text-[10px]", tone === "good" ? "text-emerald-300" : tone === "warn" ? "text-amber-300" : "text-rose-300")}>{s}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Business */}
          <Reveal className="md:col-span-2" delay={0.1}>
            <SpotlightCard className="h-full p-6 sm:p-7" glow="103,232,249">
              <EngineHeader icon={Store} n="04" title="Business signals" color="#67e8f9" />
              <div className="mt-5 flex items-end gap-2">
                <span className="font-display text-5xl font-bold text-white">
                  <CountUp to={4.8} decimals={1} />
                </span>
                <span className="mb-2 text-amber-300">★★★★★</span>
              </div>
              <p className="font-mono text-xs text-mute-2">
                <CountUp to={312} /> Google reviews
              </p>
              <div className="mt-5 space-y-2 text-[13px] text-mute">
                <p className="flex items-center gap-2"><Clock className="size-3.5 text-cyan-300" /> Open · closes 6pm</p>
                <p className="flex items-center gap-2"><Phone className="size-3.5 text-cyan-300" /> Phone & email found</p>
                <p className="flex items-center gap-2"><ImageIcon className="size-3.5 text-cyan-300" /> 48 listing photos</p>
                <p className="flex items-center gap-2"><MapPin className="size-3.5 text-cyan-300" /> South Congress, Austin</p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Opportunity */}
          <Reveal className="md:col-span-2" delay={0.15}>
            <SpotlightCard className="relative h-full p-6 sm:p-7" glow="124,58,237">
              <EngineHeader icon={TrendingUp} n="05" title="Opportunity" color="#c4b5fd" />
              <div className="mt-5 flex items-center gap-4">
                <ScoreRing value={91} size={86} stroke={7} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">High opportunity</p>
                  <p className="mt-1 text-sm text-slate-200">Speed fix + online booking</p>
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                {["Mobile LCP 4.9s (CrUX)", "No booking widget on site", "No Meta Pixel → no retargeting"].map((e) => (
                  <p key={e} className="flex items-center gap-2 text-[12px] text-mute">
                    <Link2 className="size-3 shrink-0 text-violet-400" /> {e}
                  </p>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-mute-2">
            <FileSearch className="size-3.5" /> Every finding links back to the evidence that produced it. Example values shown.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Gauge({ label, value, pct, tone, note }: { label: string; value: string; pct: number; tone: "good" | "warn" | "bad"; note: string }) {
  const c = tone === "good" ? "#34d399" : tone === "warn" ? "#fbbf24" : "#fb7185";
  const R = 42;
  const C = Math.PI * R; // half circle
  return (
    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 text-center sm:p-4">
      <svg viewBox="0 0 100 58" className="mx-auto w-full max-w-[140px]">
        <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="8" strokeLinecap="round" />
        <motion.path
          d="M8 50 A42 42 0 0 1 92 50"
          fill="none"
          stroke={c}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C - (pct / 100) * C }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 5px ${c})` }}
        />
      </svg>
      <p className="-mt-3 font-mono text-lg font-semibold text-white sm:text-xl">{value}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-3">
        {label} · <span style={{ color: c }}>{note}</span>
      </p>
    </div>
  );
}
