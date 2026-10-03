"use client";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Card with a cursor-following radial glow + glowing border. */
export function SpotlightCard({ children, className, glow = "124,58,237" }: { children: ReactNode; className?: string; glow?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-ink-800/70", className)}
      style={{ ["--glow" as string]: glow }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgba(var(--glow),0.14), transparent 45%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: 1,
          background: "radial-gradient(300px circle at var(--x) var(--y), rgba(var(--glow),0.6), transparent 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
