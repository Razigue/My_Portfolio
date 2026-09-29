import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import {
  INK_LIGHT,
  loadTextFont,
  OG_SIZE,
  PAPER_2_LIGHT,
  PAPER_LIGHT,
} from "@/lib/og";

export function ogAlt(locale: Locale): string {
  const { hero, site } = getContent(locale);
  return `${site.name}. ${hero.tagline}`;
}

/**
 * The portrait, already in black and white: the site greys it with a CSS
 * filter, which Satori does not apply.
 */
async function loadPortrait(): Promise<string> {
  const file = await readFile(
    path.join(process.cwd(), "content/media/razigue-og.jpg"),
  );
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

/**
 * The social card of one language, which each root layout has. It is the
 * top of the home page as a first visit sees it, by day: the name, the
 * sentence and the portrait.
 */
export async function renderOgImage(locale: Locale): Promise<ImageResponse> {
  const { hero, site } = getContent(locale);
  // Subset to every character the card draws, since all of it is set in the
  // site's one face; the name alone takes the heavier weight.
  const [font, heavy, portrait] = await Promise.all([
    loadTextFont(hero.tagline),
    loadTextFont(site.name, 500),
    loadPortrait(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 72,
          background: INK_LIGHT,
          color: PAPER_LIGHT,
          fontFamily: font ? "Text" : "sans-serif",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.4,
              color: PAPER_2_LIGHT,
            }}
          >
            {hero.tagline}
          </div>
        </div>

        {/* The photograph keeps its own 2:3, rounded like on the site. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws a plain img */}
        <img
          src={portrait}
          alt=""
          width={320}
          height={480}
          style={{ borderRadius: 18, objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      // No font at all when both fetches failed: `next/og` then falls back
      // to its own default rather than to an empty list.
      fonts: font
        ? [
            { name: "Text", data: font, style: "normal", weight: 400 },
            ...(heavy
              ? [{ name: "Text", data: heavy, style: "normal", weight: 500 } as const]
              : []),
          ]
        : undefined,
    },
  );
}
