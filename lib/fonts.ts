import { Geist, Geist_Mono, Newsreader } from "next/font/google";

/*
 * Declared once and shared by both root layouts and the global 404, which
 * each render their own <html>.
 */

// Variable, so no `weight`: the range ships in one file. `opsz` earns its bytes
// — the browser thins the display sizes and thickens the reading sizes on its
// own, which a static face cannot do.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** The three font variables, set on <html>. */
export const fontVariables = `${newsreader.variable} ${geist.variable} ${geistMono.variable}`;
