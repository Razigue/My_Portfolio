import type { CSSProperties } from "react";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

/** The tallest a capture is allowed to stand, so a portrait one never fills the screen. */
const MAX_HEIGHT_REM = 36;
const GAP_REM = 1.5;

/**
 * The captures under one part of « La démarche »: one, or two side by side.
 *
 * By default they are centred on the page's axis, under both columns of the
 * part, the same way the diagrams are. With `align="text"` they start where
 * the paragraphs start and fill the text column instead, so every capture of
 * the page is the same width and reads as part of the text above it. Two
 * captures share one height whatever their shapes: each takes a share of the
 * width proportional to its own ratio, so their tops and their bottoms line
 * up. A whole screen gets its window from `ProjectShot`; a panel cut out of
 * the interface, marked `cutout`, keeps its own rounded corners and no ground.
 *
 * On a phone they are stacked, each at the full width.
 */
export function ProjectMedia({
  media,
  align = "center",
}: {
  media: readonly ProjectImage[];
  align?: "center" | "text";
}) {
  const ratios = media.map((image) => image.src.width / image.src.height);
  const sum = ratios.reduce((total, ratio) => total + ratio, 0);
  const gaps = GAP_REM * (media.length - 1);

  return (
    <div
      data-choreo="rise"
      className={`flex w-full flex-col gap-6 sm:flex-row ${
        align === "text" ? "lg:col-start-2" : "mx-auto lg:col-span-2"
      }`}
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
                (ratio / sum) * (align === "text" ? 53 : 76),
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
