import { Geist, Newsreader } from "next/font/google";

/*
 * Declared once and shared by both root layouts and the global 404, which
 * each render their own <html>.
 *
 * The whole site is set in one face, Geist: a sans-serif drawn for screens,
 * plain and readable at every size. Newsreader is kept for the `RB` monogram
 * in the header, and for nothing else.
 */

// Variable, so no `weight`: the whole range ships in one file.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// `opsz` keeps the two letters drawn the way the header's optical centring
// was measured on.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

/** The two font variables, set on <html>. */
export const fontVariables = `${geist.variable} ${newsreader.variable}`;
