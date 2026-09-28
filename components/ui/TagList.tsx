"use client";

import { useEffect, useRef } from "react";
import { Tag } from "@/components/ui/primitives";

/**
 * The one movement left on the site: a list of technologies rises into place
 * the first time it comes on screen.
 *
 * A list already on screen when the page opens is left as it is, so nothing
 * the visitor can see ever blinks out. Lists that arrive together, the three
 * project cards side by side, follow one another by a beat. Nothing is hidden
 * in CSS: without a script, every list is simply there.
 */

const RISE: Keyframe[] = [
  { opacity: 0, transform: "translateY(3.5rem)" },
  { opacity: 1, transform: "translateY(0)" },
];

const TIMING: KeyframeAnimationOptions = {
  duration: 1050,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  // The first frame holds through the delay; once finished, the list is back
  // on its own styles, with nothing left behind on it.
  fill: "backwards",
};

/** Milliseconds between two lists that arrive together. */
const BEAT = 90;

const waiting = new Map<Element, Animation>();
let observer: IntersectionObserver | null = null;

function byPosition(a: Element, b: Element): number {
  const ra = a.getBoundingClientRect();
  const rb = b.getBoundingClientRect();
  return ra.top - rb.top || ra.left - rb.left;
}

function arrive(entries: IntersectionObserverEntry[]) {
  entries
    .filter((entry) => entry.isIntersecting)
    .map((entry) => entry.target)
    .sort(byPosition)
    .forEach((list, index) => {
      const animation = waiting.get(list);
      observer?.unobserve(list);
      if (!animation) return;
      waiting.delete(list);
      animation.effect?.updateTiming({ delay: index * BEAT });
      animation.play();
    });
}

/** Holds a list below the fold on its first frame until it is scrolled to. */
function watch(list: HTMLElement): () => void {
  if (list.getBoundingClientRect().top < window.innerHeight * 0.94) {
    return () => undefined;
  }

  const animation = list.animate(RISE, TIMING);
  animation.pause();
  waiting.set(list, animation);

  observer ??= new IntersectionObserver(arrive, {
    // A list moves once its top is 12% above the bottom of the window.
    rootMargin: "0px 0px -12% 0px",
  });
  observer.observe(list);

  return () => {
    observer?.unobserve(list);
    waiting.get(list)?.cancel();
    waiting.delete(list);
  };
}

export function TagList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = list.current;
    return element ? watch(element) : undefined;
  }, []);

  return (
    <ul
      ref={list}
      data-stack
      className={`flex flex-wrap gap-2 ${className ?? ""}`}
    >
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
