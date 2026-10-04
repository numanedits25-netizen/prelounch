"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./ui/logo";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#engines", label: "Engines" },
  { href: "/#proof", label: "Proof" },
  { href: "/#pitch", label: "AI pitch" },
  { href: "/compare", label: "Compare" },
  { href: "/#faq", label: "FAQ" }
];

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-gradient" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled ? "glass" : "border border-transparent"
          )}
        >
          <a href="/#top" className="shrink-0" aria-label="Larzo home">
            <Logo />
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm text-mute xl:px-3.5 transition hover:bg-white/[0.05] hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="/#join" className="btn-primary hidden px-4 py-2 sm:inline-flex">
              Join waitlist <ArrowRight className="size-3.5" />
            </a>
            <button onClick={() => setOpen((o) => !o)} className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden"
            >
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-slate-200 hover:bg-white/[0.05]">
                  {l.label}
                </a>
              ))}
              <a href="/watch" onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-slate-200 hover:bg-white/[0.05]">
                Watch the film
              </a>
              <a href="/#join" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                Join waitlist <ArrowRight className="size-4" />
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
