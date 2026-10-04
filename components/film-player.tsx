"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, RotateCcw, Volume2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./ui/logo";

/**
 * Clean, distraction-free player for the full product film (with sound).
 * Opened from the hero "Watch full film" button via client-side navigation,
 * so the click counts as a user gesture and the film can start unmuted.
 * If the browser still blocks sound, it plays muted and offers "Tap for sound".
 */
export function FilmPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [needsTap, setNeedsTap] = useState(false);
  const [mutedFallback, setMutedFallback] = useState(false);
  const [ended, setEnded] = useState(false);

  const close = useCallback(() => {
    if (sessionStorage.getItem("larzo_film_from") === "site") {
      sessionStorage.removeItem("larzo_film_from");
      router.back();
    } else router.push("/");
  }, [router]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      // sound blocked → try muted autoplay, offer unmute
      v.muted = true;
      v.play()
        .then(() => setMutedFallback(true))
        .catch(() => setNeedsTap(true));
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  function playWithSound() {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    if (ended) v.currentTime = 0;
    setEnded(false);
    setNeedsTap(false);
    setMutedFallback(false);
    v.play().catch(() => {});
  }

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-black text-white">
      {/* top bar */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5"
      >
        <Link href="/" aria-label="Larzo home">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/#join" className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
            Get early access <ArrowRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close film"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-3 pr-3.5 text-sm text-slate-200 transition hover:border-white/30 hover:text-white"
          >
            <X className="size-4" /> <span className="hidden sm:inline">Close</span>
            <kbd className="ml-1 hidden rounded border border-white/15 px-1.5 font-mono text-[10px] text-mute lg:inline">Esc</kbd>
          </button>
        </div>
      </motion.header>

      {/* stage */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-8 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl"
          style={{ maxWidth: "min(72rem, calc((100svh - 190px) * 16 / 9))" }}
        >
          <div className="absolute -inset-8 -z-10 rounded-[40px] bg-[conic-gradient(from_200deg,#22d3ee,#3b82f6,#a855f7,#e879f9,#22d3ee)] opacity-20 blur-[70px]" />
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl sm:rounded-2xl">
            <video
              ref={ref}
              className="h-full w-full bg-black object-contain"
              src="/video/larzo-film.mp4"
              poster="/video/hero-poster.jpg"
              controls
              playsInline
              preload="auto"
              onEnded={() => setEnded(true)}
              onVolumeChange={(e) => {
                if (!e.currentTarget.muted) setMutedFallback(false);
              }}
            />

            <AnimatePresence>
              {mutedFallback ? (
                <motion.button
                  key="unmute"
                  type="button"
                  onClick={playWithSound}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-lg sm:left-4 sm:top-4 sm:text-sm"
                >
                  <Volume2 className="size-4" /> Tap for sound
                </motion.button>
              ) : null}

              {needsTap || ended ? (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 p-4 text-center backdrop-blur-sm"
                >
                  {ended ? (
                    <>
                      <p className="font-display text-xl font-bold tracking-tight sm:text-3xl">
                        Every local business has a gap. <span className="text-gradient">Larzo finds it.</span>
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Link href="/#join" className="btn-primary px-5 py-2.5 text-sm">
                          Get early access <ArrowRight className="size-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={playWithSound}
                          className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm text-slate-200 transition hover:border-white/40 hover:text-white"
                        >
                          <RotateCcw className="size-4" /> Replay
                        </button>
                      </div>
                    </>
                  ) : (
                    <button type="button" onClick={playWithSound} aria-label="Play film with sound" className="group flex flex-col items-center gap-3">
                      <span className="relative grid size-20 place-items-center rounded-full bg-brand-gradient shadow-[0_0_60px_rgba(124,58,237,.6)] transition group-hover:scale-105">
                        <span className="absolute inset-0 animate-ping2 rounded-full bg-cyan-400/40" />
                        <Play className="relative size-8 translate-x-[2px] fill-white" />
                      </span>
                      <span className="text-sm text-slate-300">Play with sound</span>
                    </button>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 px-1 text-xs text-mute sm:text-sm">
            <p>
              <span className="text-slate-200">The Larzo film</span> · 0:54 · sound on
            </p>
            <Link href="/#join" className="inline-flex items-center gap-1.5 text-cyan-300 transition hover:text-white sm:hidden">
              Get early access <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
