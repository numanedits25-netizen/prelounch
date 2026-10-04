"use client";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 → `to` the first time it scrolls into view (own IO + rAF: no dependency on motion values). */
export function CountUp({ to, decimals = 0, duration = 1.6, suffix = "", className }: { to: number; decimals?: number; duration?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / (duration * 1000));
        const eased = 1 - Math.pow(1 - p, 4);
        setV(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}
