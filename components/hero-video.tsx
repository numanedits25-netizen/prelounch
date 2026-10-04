"use client";

import Link from "next/link";
import { Pause, Play, Volume2 } from "lucide-react";
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
        aria-label="Larzo product film: real businesses, what to sell, the tools running their site, and a full executive report"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setReady(true)}
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className={cn("absolute z-20 flex items-center gap-2", controlsClassName)}>
        <Link
          href="/watch"
          onClick={() => sessionStorage.setItem("larzo_film_from", "site")}
          aria-label="Watch the full Larzo film with sound"
          className="group/watch relative flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-ink shadow-[0_10px_40px_-8px_rgba(34,211,238,.65)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_14px_50px_-6px_rgba(124,58,237,.8)] sm:text-sm"
        >
          <span className="relative grid size-7 place-items-center rounded-full bg-brand-gradient text-white sm:size-8">
            <span className="absolute inset-0 animate-ping2 rounded-full bg-cyan-400/60" />
            <Play className="relative size-3.5 translate-x-[1px] fill-white sm:size-4" />
          </span>
          Watch full film
          <Volume2 className="size-3.5 text-slate-500 transition group-hover/watch:text-violet-600" />
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background film" : "Play background film"}
          title={playing ? "Pause" : "Play"}
          className="grid size-9 place-items-center rounded-full border border-white/15 bg-black/50 text-slate-200 backdrop-blur-md transition hover:border-cyan-300/50 hover:text-white sm:size-10"
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 translate-x-[1px]" />}
        </button>
      </div>
    </>
  );
}
