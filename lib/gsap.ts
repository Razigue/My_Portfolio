"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function registerGsap(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("cine", "0.16, 1, 0.3, 1");
  CustomEase.create("cineIn", "0.7, 0, 0.84, 0");
  CustomEase.create("cineOut", "0.22, 1, 0.36, 1");
  gsap.defaults({ ease: "cine", duration: 0.9 });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };

/**
 * `gsap.quickSetter` is declared as returning a bare `Function`, which makes
 * every call through it unchecked. This is the one place that narrows it, so
 * the callers get a signature instead of an assertion each.
 *
 * It writes straight to the element's transform, skipping the tween machinery,
 * which is what makes it safe to call once per frame.
 */
export function quickSetter(
  target: Element,
  property: string,
  unit?: string,
): (value: number) => void {
  return gsap.quickSetter(target, property, unit) as (value: number) => void;
}

/* ---------------------------------------------------------------------------
   The choreography vocabulary.

   Server components tag elements with `data-choreo="<name>"`; a client <Stage>
   reads the tag and looks the pair up here. Nothing is hidden in CSS: the
   `from` state is only ever applied by GSAP, after a Stage has mounted.

   `opacity` is used rather than `autoAlpha` on purpose. `autoAlpha` sets
   `visibility: hidden`, which would pull every below-the-fold element out of
   the accessibility tree until it happened to be scrolled past.
   --------------------------------------------------------------------------- */

export type ChoreoVariant =
  | "fade"
  | "rise"
  | "fall"
  | "scale"
  | "blur"
  | "mask"
  | "wipe"
  | "chars"
  | "words"
  | "lines"
  | "drift"
  | "sweep"
  | "counter";

type Step = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  /** Split the element first; the tween then runs on the pieces. */
  split?: "chars" | "words" | "lines";
  duration?: number;
  /** Stagger *within* a split element. */
  innerStagger?: number;
};

export const CHOREO: Record<ChoreoVariant, Step> = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 0.85,
  },
  rise: {
    from: { opacity: 0, y: 56 },
    to: { opacity: 1, y: 0 },
    duration: 1.05,
  },
  fall: {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
    duration: 0.95,
  },
  scale: {
    from: { opacity: 0, scale: 0.92 },
    to: { opacity: 1, scale: 1 },
    duration: 1.1,
  },
  blur: {
    from: { opacity: 0, filter: "blur(18px)", scale: 1.04 },
    to: { opacity: 1, filter: "blur(0px)", scale: 1 },
    duration: 1.15,
  },
  /** Enters from the left. */
  drift: {
    from: { opacity: 0, x: -64 },
    to: { opacity: 1, x: 0 },
    duration: 1.05,
  },
  /** Enters from the right. */
  sweep: {
    from: { opacity: 0, x: 64 },
    to: { opacity: 1, x: 0 },
    duration: 1.05,
  },
  /** Image reveal: the frame uncovers from the bottom edge upward. */
  mask: {
    from: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.18 },
    to: { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
    duration: 1.45,
  },
  /** Horizontal reveal, left to right. */
  wipe: {
    from: { clipPath: "inset(0% 100% 0% 0%)" },
    to: { clipPath: "inset(0% 0% 0% 0%)" },
    duration: 1.15,
  },
  chars: {
    split: "chars",
    from: { yPercent: 128, opacity: 0 },
    to: { yPercent: 0, opacity: 1 },
    duration: 1.15,
    innerStagger: 0.028,
  },
  words: {
    split: "words",
    from: { yPercent: 118, opacity: 0 },
    to: { yPercent: 0, opacity: 1 },
    duration: 1,
    innerStagger: 0.055,
  },
  lines: {
    split: "lines",
    from: { yPercent: 112, opacity: 0 },
    to: { yPercent: 0, opacity: 1 },
    duration: 1,
    innerStagger: 0.09,
  },
  /**
   * Numerals that count up to whatever the server rendered. The text content is
   * the target, so the printed page and the no-JavaScript page both show the
   * real figure.
   */
  counter: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    duration: 0.75,
  },
};

export function isChoreoVariant(
  value: string | undefined,
): value is ChoreoVariant {
  return value !== undefined && value in CHOREO;
}
