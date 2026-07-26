import { ImageResponse } from "next/og";
import { FLARE, INK, loadDisplayFont } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await loadDisplayFont("RB");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: FLARE,
          color: INK,
          fontSize: 40,
          fontFamily: font ? "Display" : "serif",
          letterSpacing: "-0.04em",
        }}
      >
        RB
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Display", data: font, style: "normal", weight: 400 }]
        : undefined,
    },
  );
}
