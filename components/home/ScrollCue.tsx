"use client";

import { getLenis } from "@/components/motion/SmoothScroll";

/**
 * The word at the foot of the opening screen, and a real control: pressing it
 * moves the page to the next block, so the label names something that happens.
 * The falling arrow beside it is the nav-letter roll turned downwards.
 */
export function ScrollCue({ label }: { label: string }) {
  function advance() {
    const next = document.querySelector("main > *:nth-child(2)");
    const target = next
      ? next.getBoundingClientRect().top + window.scrollY
      : window.innerHeight;

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <button type="button" onClick={advance} className="cue">
      <span>{label}</span>
      <span className="cue-track" aria-hidden="true">
        <span className="cue-arrow">↓</span>
      </span>
    </button>
  );
}
