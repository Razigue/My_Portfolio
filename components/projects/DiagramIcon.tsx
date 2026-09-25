import type { ReactNode } from "react";
import type { DiagramIcon as Icon } from "@/content/projects";

/*
 * Pictograms for the project diagrams. Every shape is filled with the current
 * colour, never stroked: an outline is a line, and the site draws none. Holes
 * are cut with `evenodd` rather than painted in a second colour.
 */
const SHAPES: Record<Icon, ReactNode> = {
  guitar: (
    <g transform="rotate(45 12 12)">
      <rect x="10" y="0.5" width="4" height="3" />
      <rect x="11" y="2" width="2" height="10" />
      <circle cx="12" cy="13.5" r="3.6" />
      <circle cx="12" cy="18" r="5" />
    </g>
  ),
  funnel: <path d="M3 4h18l-7 8v7l-4 2v-9z" />,
  pedal: (
    <>
      <path
        fillRule="evenodd"
        d="M6 2h12v20H6z M8 6.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z M13 6.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z M9.6 16a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0z"
      />
      <rect x="3" y="9" width="3" height="2.5" />
      <rect x="18" y="9" width="3" height="2.5" />
    </>
  ),
  amp: (
    <>
      <path
        fillRule="evenodd"
        d="M3 4h18v16H3z M5 11h14v7H5z M6.8 7.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0z M10.8 7.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0z M14.8 7.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0z"
      />
      <rect x="6.5" y="12.5" width="11" height="1.5" />
      <rect x="6.5" y="15.5" width="11" height="1.5" />
    </>
  ),
  speaker: (
    <>
      <path
        fillRule="evenodd"
        d="M4 2h16v20H4z M7 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0z M10.2 6a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0z"
      />
      <circle cx="12" cy="14" r="2" />
    </>
  ),
  sliders: (
    <>
      <rect x="4" y="3" width="2" height="18" />
      <rect x="11" y="3" width="2" height="18" />
      <rect x="18" y="3" width="2" height="18" />
      <rect x="2" y="13" width="6" height="3.5" />
      <rect x="9" y="6" width="6" height="3.5" />
      <rect x="16" y="15" width="6" height="3.5" />
    </>
  ),
  volume: (
    <>
      <path d="M3 9h4l5-5v16l-5-5H3z" />
      <path d="M15.5 7.2l1.2-1.2a8.5 8.5 0 0 1 0 12l-1.2-1.2a6.8 6.8 0 0 0 0-9.6z" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0v1h-2v-1a6 6 0 0 0-12 0v1H4z" />
      <rect x="3" y="13" width="5" height="8" />
      <rect x="16" y="13" width="5" height="8" />
    </>
  ),
  record: (
    <>
      <path
        fillRule="evenodd"
        d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0z M5 12a7 7 0 1 1 14 0a7 7 0 1 1-14 0z"
      />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  loop: (
    <path d="M12 4.5V2l4 3.5-4 3.5V6.5a5.5 5.5 0 1 0 5.5 5.5h2A7.5 7.5 0 1 1 12 4.5z" />
  ),
  note: (
    <path d="M9 18.5a3 3 0 1 1-2-2.83V4l12-2v13.5a3 3 0 1 1-2-2.83V6.3L9 7.6z" />
  ),
  metronome: (
    <path
      fillRule="evenodd"
      d="M9 2h6l5 20H4z M7.2 18h9.6l.4 2H6.8z M11 16l3-8.5 1.3.45-3 8.5z"
    />
  ),
  screen: (
    <>
      <path fillRule="evenodd" d="M2 4h20v13H2z M4 6h16v9H4z" />
      <rect x="6" y="8" width="7" height="2" />
      <rect x="6" y="11" width="10" height="2" />
      <rect x="11" y="17" width="2" height="2" />
      <rect x="8" y="19" width="8" height="2" />
    </>
  ),
  chip: (
    <>
      <path fillRule="evenodd" d="M6 6h12v12H6z M9.5 9.5h5v5h-5z" />
      {[8, 11.25, 14.5].map((at) => (
        <g key={at}>
          <rect x={at} y="2.5" width="1.5" height="3.5" />
          <rect x={at} y="18" width="1.5" height="3.5" />
          <rect x="2.5" y={at} width="3.5" height="1.5" />
          <rect x="18" y={at} width="3.5" height="1.5" />
        </g>
      ))}
    </>
  ),
  browser: (
    <path
      fillRule="evenodd"
      d="M2 4h20v16H2z M4 9h16v9H4z M4.7 6.5a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z M7.2 6.5a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z"
    />
  ),
  install: (
    <>
      <path d="M11 3h2v8.2l3-3 1.4 1.4L12 15 6.6 9.6 8 8.2l3 3z" />
      <path d="M3 15h2v4h14v-4h2v6H3z" />
    </>
  ),
  export: (
    <>
      <path d="M11 15h2V6.8l3 3 1.4-1.4L12 3 6.6 8.4 8 9.8l3-3z" />
      <path d="M3 15h2v4h14v-4h2v6H3z" />
    </>
  ),
  wave: (
    <>
      <rect x="1.5" y="10" width="2" height="4" />
      <rect x="5.5" y="7" width="2" height="10" />
      <rect x="9.5" y="4" width="2" height="16" />
      <rect x="13.5" y="8" width="2" height="8" />
      <rect x="17.5" y="6" width="2" height="12" />
      <rect x="21" y="10.5" width="1.5" height="3" />
    </>
  ),
  storage: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 8.5v3c0 1.66 3.58 3 8 3s8-1.34 8-3v-3c0 1.66-3.58 3-8 3s-8-1.34-8-3z" />
      <path d="M4 14.5v3c0 1.66 3.58 3 8 3s8-1.34 8-3v-3c0 1.66-3.58 3-8 3s-8-1.34-8-3z" />
    </>
  ),
  sheet: (
    <path
      fillRule="evenodd"
      d="M5 2h10l4 4v16H5z M8 10h8v1.5H8z M8 13.5h8V15H8z M8 17h5v1.5H8z"
    />
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
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {SHAPES[icon]}
    </svg>
  );
}
