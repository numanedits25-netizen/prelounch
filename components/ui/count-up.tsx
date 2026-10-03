"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to, decimals = 0, duration = 1.6, suffix = "", className }: { to: number; decimals?: number; duration?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}
