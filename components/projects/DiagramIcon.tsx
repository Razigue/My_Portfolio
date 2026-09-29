import type { ReactNode } from "react";
import type { DiagramIcon as Icon } from "@/content/projects";

/*
 * Pictograms for the project diagrams, drawn like the site's other icons
 * (`components/ui/Icon.tsx`): one 1.75 stroke on a 24-unit grid, round caps
 * and joins, never filled. Where Lucide has the object (speaker, headphones,
 * monitor, chip, database, file) the shape follows it; the rest are drawn to
 * the same rules.
 */
const SHAPES: Record<Icon, ReactNode> = {
  // Drawn along its own axis, then laid on the diagonal and scaled to fill
  // the square like the others; 1.4 × 1.25 keeps the stroke at 1.75.
  guitar: (
    <g
      transform="rotate(45 12 12) translate(12 12) scale(1.25) translate(-12 -12)"
      strokeWidth={1.4}
    >
      <path d="M12 11V3" />
      <path d="M10.75 1h2.5v2.5h-2.5z" />
      <path d="M12 11c-1.9 0-3 1.2-3 2.8 0 .8.3 1.4.7 1.9-1.2.7-1.9 1.8-1.9 3.1C7.8 21 9.6 23 12 23s4.2-2 4.2-4.2c0-1.3-.7-2.4-1.9-3.1.4-.5.7-1.1.7-1.9 0-1.6-1.1-2.8-3-2.8z" />
      <circle cx="12" cy="17.5" r="1.25" />
    </g>
  ),
  funnel: <path d="M3 4h18l-7 8v7l-4 2v-9z" />,
  pedal: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <circle cx="9.5" cy="6.5" r="1" />
      <circle cx="14.5" cy="6.5" r="1" />
      <circle cx="12" cy="16" r="2.25" />
      <path d="M3 10h3" />
      <path d="M18 10h3" />
    </>
  ),
  amp: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 7h.01" />
      <path d="M11 7h.01" />
      <path d="M15 7h.01" />
      <path d="M7 14h10" />
      <path d="M7 17h10" />
    </>
  ),
  speaker: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="14" r="4" />
      <path d="M12 6h.01" />
    </>
  ),
  sliders: (
    <>
      <path d="M6 3v9" />
      <path d="M6 16v5" />
      <path d="M12 3v2" />
      <path d="M12 9v12" />
      <path d="M18 3v11" />
      <path d="M18 18v3" />
      <path d="M4 14h4" />
      <path d="M10 7h4" />
      <path d="M16 16h4" />
    </>
  ),
  volume: (
    <>
      <path d="M3 9h4l5-5v16l-5-5H3z" />
      <path d="M16 9a4.5 4.5 0 0 1 0 6" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
  headphones: (
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  ),
  record: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  loop: (
    <>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </>
  ),
  note: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  metronome: (
    <>
      <path d="M9.5 3h5l4.5 18H5z" />
      <path d="M6.3 16h11.4" />
      <path d="m12 16 3.5-9" />
    </>
  ),
  screen: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
  chip: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v2" />
      <path d="M15 2v2" />
      <path d="M9 20v2" />
      <path d="M15 20v2" />
      <path d="M2 9h2" />
      <path d="M2 15h2" />
      <path d="M20 9h2" />
      <path d="M20 15h2" />
    </>
  ),
  browser: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20" />
      <path d="M6 6.5h.01" />
      <path d="M9 6.5h.01" />
    </>
  ),
  install: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </>
  ),
  export: (
    <>
      <path d="M12 15V3" />
      <path d="m17 8-5-5-5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </>
  ),
  wave: (
    <>
      <path d="M2.5 10.5v3" />
      <path d="M6.5 7v10" />
      <path d="M10.5 4v16" />
      <path d="M14.5 8v8" />
      <path d="M18.5 6v12" />
      <path d="M21.5 10.5v3" />
    </>
  ),
  storage: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  sheet: (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </>
  ),
};

export function DiagramIcon({
  icon,
  className,
}: {
  icon: Icon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {SHAPES[icon]}
    </svg>
  );
}
