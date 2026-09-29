"use client";

import { useEffect, useState } from "react";

/**
 * The parts of a project's account, listed in the rail. The part being read
 * is set on a ground of its own, so the rail says where the reader is.
 *
 * A part is being read once its top has passed the upper third of the
 * window; at the very bottom of the page the last part is, even when it is
 * too short to reach that line.
 */
export function ApproachNav({
  label,
  titles,
}: {
  label: string;
  titles: readonly string[];
}) {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const parts = titles.map((_, index) =>
      document.getElementById(`demarche-${index}`),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let reading = -1;
      parts.forEach((part, index) => {
        if (part && part.getBoundingClientRect().top <= line) reading = index;
      });
      if (bottom && reading >= 0) reading = parts.length - 1;
      setCurrent(reading);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [titles]);

  return (
    <nav aria-label={label} className="hidden lg:block">
      <div className="sticky top-[calc(var(--spacing-header)+var(--spacing-block))]">
        <p className="eyebrow px-3">{label}</p>
        <ol className="mt-3 grid gap-0.5 border-l border-line pl-2">
          {titles.map((title, index) => (
            <li key={title}>
              <a
                href={`#demarche-${index}`}
                aria-current={index === current ? "location" : undefined}
                className="rail-link type-label"
              >
                {title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
