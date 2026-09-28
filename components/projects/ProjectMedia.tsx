import type { CSSProperties } from "react";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

/** The tallest a capture is allowed to stand, so a portrait one never fills the screen. */
const MAX_HEIGHT_REM = 36;
const GAP_REM = 1.5;

/**
 * The captures of a project page: one, or two side by side.
 *
 * They start where the text starts, on the reading column's left edge, so
 * the eye never has to find a new margin between a paragraph and what
 * illustrates it. Two captures share one height whatever their shapes: each
 * takes a share of the width proportional to its own ratio, so their tops and
 * their bottoms line up. A panel cut out of the interface, marked `cutout`,
 * keeps its own rounded corners and no ground.
 *
 * On a phone they are stacked, each at the full width.
 */
export function ProjectMedia({
  media,
}: {
  media: readonly ProjectImage[];
}) {
  const ratios = media.map((image) => image.src.width / image.src.height);
  const sum = ratios.reduce((total, ratio) => total + ratio, 0);
  const gaps = GAP_REM * (media.length - 1);

  return (
    <div
      className="flex w-full min-w-0 flex-col gap-6 sm:flex-row"
      style={{ maxWidth: `calc(${MAX_HEIGHT_REM}rem * ${sum} + ${gaps}rem)` }}
    >
      {media.map((image, index) => {
        const ratio = ratios[index] ?? 1;
        return (
          <div
            key={image.alt}
            className="min-w-0 sm:[flex:var(--ratio)_1_0%]"
            style={{ "--ratio": ratio } as CSSProperties}
          >
            <ProjectShot
              image={image}
              sizes={`(min-width: 1024px) ${Math.round(
                (ratio / sum) * 60,
              )}rem, calc(100vw - 48px)`}
              placeholder="empty"
              className="shot-bare"
            />
          </div>
        );
      })}
    </div>
  );
}
