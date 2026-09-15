import type { MetadataRoute } from "next";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { LANGUAGE_TAGS, LOCALES, pathFor, type Page } from "@/lib/i18n";

/** One entry per page per language, each naming its twin in the other. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  const entries = (
    page: Page,
    slug: string | undefined,
    priority: number,
    changeFrequency: "monthly" | "yearly",
  ) =>
    LOCALES.map((locale) => ({
      url: url(pathFor(locale, page, slug)),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((other) => [
            LANGUAGE_TAGS[other].region,
            url(pathFor(other, page, slug)),
          ]),
        ),
      },
    }));

  return [
    ...entries("home", undefined, 1, "monthly"),
    ...entries("projects", undefined, 0.8, "monthly"),
    ...entries("about", undefined, 0.8, "monthly"),
    ...entries("contact", undefined, 0.8, "monthly"),
    ...featuredProjects.flatMap((project) =>
      entries("projects", project.slug, 0.6, "yearly"),
    ),
  ];
}
