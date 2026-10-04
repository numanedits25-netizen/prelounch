"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { useState } from "react";
import { rivals, rows, type Mark, type RivalId } from "@/lib/compare";
import { cn } from "@/lib/utils";
import { LogoMark } from "./ui/logo";

const ease = [0.22, 1, 0.36, 1] as const;

function MarkIcon({ m, delay = 0 }: { m: Mark; delay?: number }) {
  const label = m === "yes" ? "Yes" : m === "partial" ? "Partly" : "No";
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 420, damping: 20, delay }}
      title={label}
      aria-label={label}
      className={cn(
        "inline-grid size-6 shrink-0 place-items-center rounded-full",
        m === "yes" && "bg-emerald-400/15 text-emerald-300",
        m === "partial" && "bg-amber-300/10 text-amber-300",
        m === "no" && "bg-white/[0.04] text-mute-3"
      )}
    >
      {m === "yes" ? <Check className="size-3.5" strokeWidth={3} /> : m === "partial" ? <Minus className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={2.5} />}
    </motion.span>
  );
}

function LarzoMark({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 420, damping: 18, delay }}
      aria-label="Yes"
      className="inline-grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_0_16px_rgba(34,211,238,.45)]"
    >
      <Check className="size-3.5" strokeWidth={3} />
    </motion.span>
  );
}

export function Legend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-mute-2", className)}>
      <span className="flex items-center gap-2"><MarkIcon m="yes" /> Does it</span>
      <span className="flex items-center gap-2"><MarkIcon m="partial" /> Partly / manual</span>
      <span className="flex items-center gap-2"><MarkIcon m="no" /> Doesn't</span>
    </div>
  );
}

export function CompareTable() {
  const [pick, setPick] = useState<RivalId>("maps");
  const rival = rivals.find((r) => r.id === pick)!;

  return (
    <div>
      {/* ───────── desktop / tablet: full matrix ───────── */}
      <div className="relative hidden lg:block">
        <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-ink-800/60">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Larzo compared with other prospecting tools</caption>
            <colgroup>
              <col className="w-[26%] xl:w-[27%]" />
              <col className="w-[18%] xl:w-[19%]" />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="align-bottom">
                <th scope="col" className="p-5 font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-mute-3 lg:p-6">What you need</th>
                <th scope="col" className="relative p-5 lg:p-6">
                  <div className="absolute inset-x-1.5 bottom-0 top-3 rounded-t-2xl border border-b-0 border-cyan-400/30 bg-[linear-gradient(180deg,rgba(124,58,237,.22),rgba(6,182,212,.06))]" />
                  <span className="relative flex items-center gap-2">
                    <LogoMark className="size-7" />
                    <span className="font-display text-lg font-bold tracking-tight text-white">Larzo</span>
                  </span>
                  <span className="relative mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">All in one</span>
                </th>
                {rivals.map((r) => (
                  <th key={r.id} scope="col" className="p-4 font-normal lg:p-5">
                    <span className="block text-sm font-semibold text-slate-200">{r.name}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-mute-3">e.g. {r.eg}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease }}
                  className="group border-t border-white/[0.06] align-top transition-colors hover:bg-white/[0.015]"
                >
                  <th scope="row" className="p-5 font-normal lg:px-6">
                    <span className="block text-[15px] font-medium text-white">{row.feature}</span>
                    <span className="mt-0.5 block text-xs text-mute-2">{row.detail}</span>
                  </th>
                  <td className="relative p-5 lg:px-6">
                    <div className={cn("absolute inset-x-1.5 inset-y-0 border-x border-cyan-400/30 bg-[linear-gradient(180deg,rgba(6,182,212,.05),rgba(124,58,237,.05))]", i === rows.length - 1 && "bottom-1.5 rounded-b-2xl border-b")} />
                    <span className="relative flex items-start gap-2.5">
                      <LarzoMark delay={0.15 + i * 0.06} />
                      <span className="text-[13px] leading-snug text-cyan-100/90">{row.larzo}</span>
                    </span>
                  </td>
                  {rivals.map((r, k) => (
                    <td key={r.id} className="p-4 lg:p-5">
                      <span className="flex items-start gap-2">
                        <MarkIcon m={row.marks[r.id]} delay={0.25 + i * 0.06 + k * 0.04} />
                        {row.notes?.[r.id] ? <span className="hidden text-[11px] leading-snug text-mute-2 xl:block">{row.notes[r.id]}</span> : null}
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────── mobile: Larzo vs one rival at a time ───────── */}
      <div className="lg:hidden">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">Compare Larzo with</p>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:justify-center" role="tablist" aria-label="Choose a tool type">
          {rivals.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={pick === r.id}
              onClick={() => setPick(r.id)}
              className={cn(
                "relative shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                pick === r.id ? "border-transparent text-white" : "border-white/10 text-mute"
              )}
            >
              {pick === r.id ? <motion.span layoutId="cmp-pill" className="absolute inset-0 rounded-full bg-brand-gradient" transition={{ type: "spring", stiffness: 400, damping: 32 }} /> : null}
              <span className="relative">{r.name}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-4 max-w-2xl overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-800/60">
          <div className="grid grid-cols-[1fr_4.25rem_4.25rem] items-end gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="text-[11px] leading-snug text-mute-3">vs {rival.name.toLowerCase()} <span className="block">e.g. {rival.eg}</span></span>
            <span className="flex flex-col items-center gap-1 text-[11px] font-semibold text-white">
              <LogoMark className="size-6" /> Larzo
            </span>
            <span className="text-center text-[11px] font-medium leading-tight text-mute">{rival.name}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul key={pick} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              {rows.map((row, i) => (
                <li key={row.feature} className="grid grid-cols-[1fr_4.25rem_4.25rem] items-center gap-2 border-t border-white/[0.05] px-4 py-3.5 first:border-t-0">
                  <span>
                    <span className="block text-[13px] font-medium leading-snug text-white">{row.feature}</span>
                    {row.notes?.[pick] ? <span className="mt-0.5 block text-[11px] leading-snug text-mute-2">{rival.name}: {row.notes[pick]}</span> : <span className="mt-0.5 block text-[11px] leading-snug text-cyan-200/70">{row.larzo}</span>}
                  </span>
                  <span className="flex justify-center"><LarzoMark delay={0.05 + i * 0.04} /></span>
                  <span className="flex justify-center"><MarkIcon m={row.marks[pick]} delay={0.1 + i * 0.04} /></span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
