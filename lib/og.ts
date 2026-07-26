/**
 * Satori, which is what `next/og` renders with, cannot read WOFF2, and the
 * output of `next/font` cannot be reused. So the display face is fetched as a
 * TTF at build time, subset to just the characters the image actually draws.
 *
 * Omitting a User-Agent is deliberate: Google Fonts serves TTF to clients it
 * does not recognise, and WOFF2 to modern browsers.
 */
export async function loadDisplayFont(
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const api = `https://fonts.googleapis.com/css2?family=Instrument+Serif&text=${encodeURIComponent(text)}`;
    const css = await fetch(api).then((response) => response.text());
    const url = /src:\s*url\(([^)]+)\)/.exec(css)?.[1];
    if (!url) return null;
    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    // A broken font fetch must never fail the build. The image falls back to
    // the default stack and is still perfectly legible.
    return null;
  }
}

export const OG_SIZE = { width: 1200, height: 630 };

// Satori has no cascade and no custom properties, so the images are drawn from
// the mirrored palette rather than from the stylesheet.
export { FLARE, INK, PAPER, PAPER_3 } from "@/lib/palette";
