import { Geist } from "next/font/google";

/*
 * Declared once and shared by both root layouts and the global 404, which
 * each render their own <html>.
 *
 * Geist sets the whole site, dates and technology names included. There is
 * no monospace face.
 */

// Variable, so no `weight`: the whole range ships in one file. Latin only:
// French and English need nothing more.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/** The font variable, set on <html>. */
export const fontVariables = geist.variable;
