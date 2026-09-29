import { ImageResponse } from "next/og";
import { INK_LIGHT, loadTextFont, PAPER_LIGHT } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The header's badge: the two initials, light on the text colour. */
export default async function Icon() {
  const font = await loadTextFont("RB", 700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PAPER_LIGHT,
          color: INK_LIGHT,
          borderRadius: 16,
          fontSize: 30,
          fontWeight: 700,
          fontFamily: font ? "Text" : "sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        RB
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Text", data: font, style: "normal", weight: 700 }]
        : undefined,
    },
  );
}
