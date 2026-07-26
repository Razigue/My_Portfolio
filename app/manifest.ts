import type { MetadataRoute } from "next";
import { hero, site } from "@/content/site";
import { INK } from "@/lib/palette";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, ${site.role}`,
    short_name: site.name,
    description: hero.tagline,
    lang: "fr-FR",
    start_url: "/",
    display: "standalone",
    background_color: INK,
    theme_color: INK,
  };
}
