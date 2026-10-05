"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/faqs";
import { SectionHeading } from "./ui/section-heading";



export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading align="left" eyebrow="FAQ" title="Questions," accent="answered." copy={<>Anything else? <a href="mailto:larzoai@gmail.com" className="text-cyan-300 underline-offset-4 hover:underline">Email the team</a> — a human reads every one.</>} />
        <div className="min-w-0 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={cn("rounded-2xl border transition-colors duration-300", isOpen ? "border-violet-400/25 bg-white/[0.035]" : "border-white/[0.07] bg-white/[0.015] hover:border-white/15")}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6" aria-expanded={isOpen}>
                  <span className="font-medium text-white sm:text-[17px]">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border", isOpen ? "border-transparent bg-brand-gradient" : "border-white/10")}>
                    <Plus className="size-4 text-white" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-mute sm:px-6">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
