"use client";

import { useEffect } from "react";

/**
 * Reliable in-page anchor scrolling.
 * Native `scroll-behavior: smooth` gets cancelled when layout shifts mid-scroll
 * (sticky scrollytelling, reveal animations), leaving users halfway down the page.
 * This re-measures the target every frame, so it always lands on the section.
 */
const OFFSET = 16;

function targetTop(el: Element) {
  const mt = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - Math.max(mt, OFFSET));
}

function scrollToEl(el: Element, smooth: boolean) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!smooth || reduce) {
    window.scrollTo({ top: targetTop(el), behavior: "instant" as ScrollBehavior });
    return;
  }
  const start = window.scrollY;
  const t0 = performance.now();
  const dist = Math.abs(targetTop(el) - start);
  const dur = Math.min(1400, Math.max(500, dist * 0.18));
  let cancelled = false;
  const cancel = () => (cancelled = true);
  window.addEventListener("wheel", cancel, { once: true, passive: true });
  window.addEventListener("touchstart", cancel, { once: true, passive: true });
  const step = (now: number) => {
    if (cancelled) return;
    const p = Math.min(1, (now - t0) / dur);
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const to = targetTop(el); // re-measured every frame
    window.scrollTo({ top: start + (to - start) * e, behavior: "instant" as ScrollBehavior });
    if (p < 1) requestAnimationFrame(step);
    else {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      // final settle after late layout shifts
      setTimeout(() => !cancelled && window.scrollTo({ top: targetTop(el), behavior: "instant" as ScrollBehavior }), 250);
    }
  };
  requestAnimationFrame(step);
}

export function SmoothAnchors() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";

    // deep link on load (e.g. /#compare from another page)
    if (location.hash.length > 1) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => scrollToEl(el, false));
        setTimeout(() => scrollToEl(el, false), 600);
      }
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToEl(el, true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
