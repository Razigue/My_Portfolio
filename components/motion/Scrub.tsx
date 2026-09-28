"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** One end of the fade: how opaque, how far moved up or down, how large. */
export type ScrubFrame = {
  readonly opacity: number;
  /** Vertical offset, in pixels. */
  readonly y?: number;
  readonly scale?: number;
};

function styleAt(from: ScrubFrame, to: ScrubFrame, progress: number): CSSProperties {
  const mix = (a: number, b: number) => a + (b - a) * progress;
  const y = mix(from.y ?? 0, to.y ?? 0);
  const scale = mix(from.scale ?? 1, to.scale ?? 1);
  return {
    opacity: mix(from.opacity, to.opacity),
    transform: `translateY(${y}px) scale(${scale})`,
  };
}

/**
 * A layer that fades as the section around it scrolls away: `from` while the
 * top of the section is at the top of the window, `to` once its bottom has
 * reached it. Used for the two layers of a project's header.
 *
 * The server writes the first frame, so the page opens on it rather than
 * jumping to it when the script arrives. One read of the section's position
 * per frame, then one write, and only while the page scrolls.
 */
export function Scrub({
  children,
  className,
  from,
  to,
  within,
}: {
  children: React.ReactNode;
  className?: string;
  from: ScrubFrame;
  to: ScrubFrame;
  /** The ancestor whose passage through the top of the window drives the fade. */
  within: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Plain values, so the effect does not restart on every render.
  const signature = JSON.stringify([from, to, within]);

  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;
    const [start, end, selector] = JSON.parse(signature) as [
      ScrubFrame,
      ScrubFrame,
      string,
    ];
    const section = layer.closest<HTMLElement>(selector) ?? layer;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const box = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height)));
      Object.assign(layer.style, styleAt(start, end, progress));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [signature]);

  return (
    <div ref={ref} className={className} style={styleAt(from, to, 0)}>
      {children}
    </div>
  );
}
