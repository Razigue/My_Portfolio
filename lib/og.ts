/**
 * Satori, which is what `next/og` renders with, cannot read WOFF2, and the
 * output of `next/font` cannot be reused. So a face is fetched as a TTF at
 * build time, subset to just the characters the image actually draws.
 *
 * Omitting a User-Agent is deliberate: Google Fonts serves TTF to clients it
 * does not recognise, and WOFF2 to modern browsers.
 */
async function loadFont(
  family: string,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    // The family is a parameter, and only ever Newsreader or Geist, both in
    // DESIGN.md: the detector cannot read a variable.
    // impeccable-disable-next-line design-system-font
    const api = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
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

/** Newsreader, for the `RB` monogram of the favicon. */
export function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
  return loadFont("Newsreader:opsz,wght@72,400", text);
}

/** Geist, the face of the site, for everything the social cards write. */
export function loadTextFont(
  text: string,
  weight: 400 | 500 = 400,
): Promise<ArrayBuffer | null> {
  return loadFont(`Geist:wght@${weight}`, text);
}

export const OG_SIZE = { width: 1200, height: 630 };

// Satori has no cascade and no custom properties, so the images are drawn from
// the mirrored palette rather than from the stylesheet.
export {
  FLARE,
  INK,
  INK_LIGHT,
  PAPER_2_LIGHT,
  PAPER_LIGHT,
} from "@/lib/palette";
