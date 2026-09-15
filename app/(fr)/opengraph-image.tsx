import { OG_SIZE } from "@/lib/og";
import { ogAlt, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("fr");

export default function OpenGraphImage() {
  return renderOgImage("fr");
}
