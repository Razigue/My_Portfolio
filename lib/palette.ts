/**
 * The one legitimate copy of the palette outside `app/globals.css`.
 *
 * Three things render without a stylesheet and so cannot read a custom
 * property: the social images, which Satori draws with no cascade; the
 * `theme-color` meta tags, which the browser chrome reads before any CSS
 * applies; and the web app manifest, which is JSON. All three import from here,
 * so the values exist twice in the project and not five times.
 *
 * Keep in step with the `:root.dark` and `:root:not(.dark)` blocks in
 * `app/globals.css`, which stay the source of truth. Nothing enforces that,
 * because nothing can: these values are read by a browser reading a manifest,
 * not by any code the project runs.
 */

/** Night, which is the primary theme. */
export const INK = "#08080a";
export const PAPER = "#f4f3f0";
export const PAPER_3 = "#8b8a85";
export const FLARE = "#ecdcb0";

/** Daylight: the browser chrome, and the social cards, which show the home
 *  page as a first visit sees it. */
export const INK_LIGHT = "#f6f5f2";
export const PAPER_LIGHT = "#121114";
export const PAPER_2_LIGHT = "#3a3835";
