"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;

/** Used by the route transition and the rail to move without a smooth glide. */
export function getLenis(): Lenis | null {
  return instance;
}

export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      // 0.085 felt like wading. The wheel should still land where you threw it:
      // high enough to feel direct, low enough to keep the glide.
      lerp: 0.18,
      wheelMultiplier: 1.2,
      smoothWheel: true,
      // Native touch scrolling stays native; hijacking it costs more than it buys.
      syncTouch: false,
    });
    instance = lenis;

    // Called rather than passed: Lenis hands its listeners the instance, and
    // `ScrollTrigger.update` reads its first argument as a reset flag.
    lenis.on("scroll", () => ScrollTrigger.update());

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}

/*
 * No `--progress` custom property on the root element, deliberately.
 *
 * Custom properties inherit, so writing one on <html> per frame invalidates the
 * computed style of every element in the document: measured at 1.7s of style
 * recalculation over a five second scroll, across 1832 recalcs. The one thing
 * that wants the read position writes its own transform on its own element, in
 * components/layout/SiteHeader.tsx.
 */
