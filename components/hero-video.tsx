"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Product film used as the hero backdrop.
 * - muted + playsInline so it autoplays on iOS / Android
 * - pauses when scrolled off-screen (battery / CPU)
 * - respects prefers-reduced-motion (shows poster, user can press play)
 */
export function HeroVideo({ className, controlsClassName }: { className?: string; controlsClassName?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setUserPaused(true);
    if (v.readyState >= 2) setReady(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce && !userPausedRef.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const userPausedRef = useRef(userPaused);
  userPausedRef.current = userPaused;

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  }

  return (
    <>
      <video
        ref={ref}
        className={cn("h-full w-full object-cover transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0", className)}
        poster="/video/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-label="LeadZone product film: real businesses, what to sell, the tools running their site, and a full executive report"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setReady(true)}
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause product film" : "Play product film"}
        className={cn(
          "group absolute z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 py-1.5 pl-1.5 pr-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-200 backdrop-blur-md transition hover:border-cyan-300/50 hover:text-white",
          controlsClassName
        )}
      >
        <span className="grid size-6 place-items-center rounded-full bg-white/10 transition group-hover:bg-cyan-400/20">
          {playing ? <Pause className="size-3" /> : <Play className="size-3 translate-x-[1px]" />}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={cn("size-1.5 rounded-full", playing ? "animate-pulse bg-rose-400" : "bg-slate-500")} />
          Product film
        </span>
      </button>
    </>
  );
}
