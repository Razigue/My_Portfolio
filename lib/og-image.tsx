import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import {
  FLARE,
  INK,
  loadDisplayFont,
  OG_SIZE,
  PAPER,
  PAPER_3,
} from "@/lib/og";

export function ogAlt(locale: Locale): string {
  const { site } = getContent(locale);
  return `${site.name}, ${site.role}`;
}

/** The social card of one language. Each root layout has its own. */
export async function renderOgImage(locale: Locale): Promise<ImageResponse> {
  const { availability, hero, site } = getContent(locale);
  const font = await loadDisplayFont(site.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: FLARE,
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.06em",
              color: PAPER_3,
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontFamily: font ? "Display" : "serif",
          }}
        >
          {site.name}
        </div>

        {/* No rule above this block and no middot inside it. The gap does the
            separating, and the two facts are two lines. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 30, color: PAPER, maxWidth: 900 }}>
            {hero.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.045em",
              color: FLARE,
            }}
          >
            {availability.headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.045em",
              color: PAPER_3,
            }}
          >
            {availability.window}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font
        ? [{ name: "Display", data: font, style: "normal", weight: 400 }]
        : undefined,
    },
  );
}
