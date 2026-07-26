"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Motion tied to the scroll position rather than to time. Used for the drift of
 * the ghost ordinals, the hero pulling away as you leave it, and the wordmark
 * sliding under the footer.
 *
 * `from` and `to` are plain objects, so a Server Component can hand them across
 * the client boundary without ceremony.
 */
export function Scrub({
  children,
  className,
  from,
  to,
  start = "top bottom",
  end = "bottom top",
  triggerClosest,
}: {
  children: React.ReactNode;
  className?: string;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
  start?: string;
  end?: string;
  /**
   * Measure against the nearest ancestor matching this selector instead of
   * against the wrapper. A band forty pixels tall has almost no scroll range of
   * its own; the section around it has plenty.
   */
  triggerClosest?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const signature = JSON.stringify([from, to, start, end, triggerClosest]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerGsap();

      const trigger = triggerClosest
        ? (el.closest<HTMLElement>(triggerClosest) ?? el)
        : el;

      const tween = gsap.fromTo(el, from, {
        ...to,
        ease: "none",
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Kill this tween's own ScrollTrigger by reference. Filtering
      // `getAll()` by trigger element would also take down the chapter
      // gutter's trigger, which watches the same section.
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [signature], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
