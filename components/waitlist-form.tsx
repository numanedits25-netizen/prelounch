"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Loader2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { isValidEmail, joinWaitlist, type WaitlistResult } from "@/lib/waitlist";
import { cn } from "@/lib/utils";
import { LinkedinIcon, XIcon } from "./ui/brand-icons";

const roles = ["Web design", "SEO", "Social media", "Paid ads", "Freelancer", "Other"];

export function WaitlistForm({ size = "lg", className, id }: { size?: "lg" | "md"; className?: string; id?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WaitlistResult | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid work email.");
      return;
    }
    setError(null);
    setState("loading");
    const ref = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") : null;
    const res = await joinWaitlist({ email, ref });
    if (!res.ok) {
      setError(res.error);
      setState("idle");
      return;
    }
    setResult(res);
    setState("done");
  }

  const link = result && typeof window !== "undefined" ? `${window.location.origin}/?ref=${result.referralCode}` : "";
  const shareText = encodeURIComponent("Just joined the LeadZone AI private beta — it finds local businesses with real gaps and writes the pitch. Get in early:");

  return (
    <div id={id} className={cn("w-full", size === "lg" ? "max-w-xl" : "max-w-lg", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {state !== "done" ? (
          <motion.form
            key="form"
            onSubmit={submit}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.35 }}
            noValidate
          >
            <div
              className={cn(
                "group relative flex items-center gap-2 rounded-full border bg-white/[0.04] p-1.5 pl-5 backdrop-blur-xl transition-all duration-300 focus-within:border-violet-400/50 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_4px_rgba(124,58,237,.15),0_20px_60px_-15px_rgba(124,58,237,.5)]",
                error ? "border-rose-400/50" : "border-white/10"
              )}
            >
              <Mail className="size-4 shrink-0 text-mute-2 transition-colors group-focus-within:text-cyan-400" />
              <label htmlFor={`email-${id ?? size}`} className="sr-only">
                Work email
              </label>
              <input
                id={`email-${id ?? size}`}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@agency.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className={cn("min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-mute-3", size === "lg" ? "py-2.5 text-[15px]" : "py-2 text-sm")}
                style={{ outline: "none" }}
              />
              <button type="submit" disabled={state === "loading"} className={cn("btn-primary shrink-0", size === "lg" ? "px-5 py-3 sm:px-6" : "px-4 py-2.5")}>
                {state === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> <span className="hidden sm:inline">Reserving…</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Get early access</span>
                    <span className="sm:hidden">Join</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
            <AnimatePresence>
              {error ? (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 pl-5 text-left text-xs text-rose-300">
                  {error}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative overflow-hidden rounded-3xl p-5 text-left"
          >
            <Burst />
            <div className="flex items-start gap-4">
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient shadow-[0_0_30px_rgba(6,182,212,.5)]"
              >
                <Check className="size-5 text-white" strokeWidth={3} />
              </motion.span>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-white">{result?.alreadyJoined ? "You're already on the list." : "You're in. Spot reserved."}</p>
                <p className="mt-1 text-sm text-mute">
                  We'll email <span className="text-slate-200">{result?.email}</span> when your invite is ready. Share your link to move up the queue.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">What do you sell? (optional)</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition",
                      role === r ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200" : "border-white/10 text-mute hover:text-white"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1.5 pl-4">
              <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-300">{link}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white/[0.07] px-3 py-2 text-xs font-medium text-white transition hover:bg-white/[0.12]"
              >
                {copied ? <Check className="size-3.5 text-cyan-300" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                aria-label="Share on X"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(link)}`}
                className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white transition hover:bg-white/[0.12]"
              >
                <XIcon className="size-3.5" />
              </a>
              <a
                aria-label="Share on LinkedIn"
                target="_blank"
                rel="noreferrer"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`}
                className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white transition hover:bg-white/[0.12]"
              >
                <LinkedinIcon className="size-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Burst() {
  const parts = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute left-10 top-10" aria-hidden="true">
      {parts.map((_, i) => {
        const a = (i / parts.length) * Math.PI * 2;
        const d = 60 + (i % 3) * 30;
        return (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full"
            style={{ background: i % 2 ? "#22d3ee" : "#a78bfa" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, opacity: 0, scale: 0.4 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
          />
        );
      })}
    </div>
  );
}
