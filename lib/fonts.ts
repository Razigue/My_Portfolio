import { Geist } from "next/font/google";
import localFont from "next/font/local";

/*
 * Declared once and shared by both root layouts and the global 404, which
 * each render their own <html>.
 *
 * The whole site is set in one face, Geist: a sans-serif drawn for screens,
 * plain and readable at every size. Newsreader is kept for the `RB` monogram
 * in the header, and for nothing else.
 */

// Variable, so no `weight`: the whole range ships in one file. Latin only:
// French and English need nothing more, and every file named here is
// preloaded on every page whether a character of it is used or not.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// The monogram is two letters, so the file holds two letters: 1.7 KB, where
// the full face was 132 KB preloaded on every page. It keeps the `opsz` axis,
// so the letters are drawn the way the header's optical centring was measured
// on. Cut from Google Fonts with `text=RB`:
//   https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&text=RB
// Newsreader, © The Newsreader Project Authors, SIL Open Font License 1.1.
const newsreader = localFont({
  src: "./fonts/newsreader-rb.woff2",
  variable: "--font-newsreader",
  weight: "400",
  display: "swap",
});

/** The two font variables, set on <html>. */
export const fontVariables = `${geist.variable} ${newsreader.variable}`;
