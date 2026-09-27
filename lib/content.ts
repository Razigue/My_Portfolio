/**
 * Everything a page shows, in one language. French is read straight from
 * `content/`; English takes the same facts and lays the words of
 * `content/en/` over them, so a link, a year or a stack is written once.
 */

import * as frenchAbout from "@/content/about";
import * as englishAbout from "@/content/en/about";
import { projectTexts } from "@/content/en/projects";
import * as englishSite from "@/content/en/site";
import {
  featuredProjects,
  type Project,
  type ProjectKind,
} from "@/content/projects";
import * as frenchSite from "@/content/site";
import { cardinal as englishCardinal } from "@/lib/english";
import { capitalise, cardinal as frenchCardinal } from "@/lib/french";
import { fill, type Locale, type Localized } from "@/lib/i18n";

export type Copy = Localized<typeof frenchSite.copy>;
export type FormCopy = Localized<typeof frenchSite.form>;

export type Content = {
  readonly locale: Locale;
  readonly site: Omit<typeof frenchSite.site, "role" | "location"> & {
    readonly role: string;
    readonly location: string;
  };
  readonly availability: Localized<typeof frenchSite.availability>;
  readonly hero: Localized<typeof frenchSite.hero>;
  readonly presentation: string;
  readonly nav: Localized<typeof frenchSite.nav>;
  readonly sections: Localized<typeof frenchSite.sections>;
  readonly copy: Copy;
  readonly form: FormCopy;
  readonly parcours: readonly string[];
  readonly experiences: Localized<typeof frenchAbout.experiences>;
  readonly formation: Localized<typeof frenchAbout.formation>;
  readonly langues: Localized<typeof frenchAbout.langues>;
  readonly atouts: Localized<typeof frenchAbout.atouts>;
  readonly interets: Localized<typeof frenchAbout.interets>;
  readonly principes: typeof frenchAbout.principes;
  readonly competences: typeof frenchAbout.competences;
  readonly ia: Localized<typeof frenchAbout.ia>;
  readonly devise: string;
  readonly recherche: Localized<typeof frenchAbout.recherche>;
  /** The published projects, in the order of `featuredSlugs`. */
  readonly projects: readonly Project[];
};

const french: Content = {
  locale: "fr",
  site: frenchSite.site,
  availability: frenchSite.availability,
  hero: frenchSite.hero,
  presentation: frenchSite.presentation,
  nav: frenchSite.nav,
  sections: frenchSite.sections,
  copy: frenchSite.copy,
  form: frenchSite.form,
  parcours: frenchAbout.parcours,
  experiences: frenchAbout.experiences,
  formation: frenchAbout.formation,
  langues: frenchAbout.langues,
  atouts: frenchAbout.atouts,
  interets: frenchAbout.interets,
  principes: frenchAbout.principes,
  competences: frenchAbout.competences,
  ia: frenchAbout.ia,
  devise: frenchAbout.devise,
  recherche: frenchAbout.recherche,
  projects: featuredProjects,
};

/** A published project with its English words. `checkProjectTexts` has already refused one without them. */
function inEnglish(project: Project): Project {
  const text = projectTexts[project.slug];
  if (!text) return project;
  return {
    ...project,
    title: text.title,
    subtitle: text.subtitle,
    team: text.team,
    description: text.description,
    summary: text.summary,
    highlights: text.highlights,
    approach:
      text.approach?.map(({ mediaAlt, ...section }, i) => {
        const media = project.approach?.[i]?.media;
        return media
          ? {
              ...section,
              media: media.map((image, j) => ({
                ...image,
                alt: mediaAlt?.[j] ?? image.alt,
              })),
            }
          : section;
      }) ?? null,
    stackDisclosure: text.stackDisclosure,
    thumbnail:
      project.thumbnail && text.thumbnailAlt
        ? { ...project.thumbnail, alt: text.thumbnailAlt }
        : project.thumbnail,
    image:
      project.image && text.imageAlt
        ? { ...project.image, alt: text.imageAlt }
        : project.image,
  };
}

const english: Content = {
  locale: "en",
  site: { ...frenchSite.site, ...englishSite.site },
  availability: englishSite.availability,
  hero: englishSite.hero,
  presentation: englishSite.presentation,
  nav: englishSite.nav,
  sections: englishSite.sections,
  copy: englishSite.copy,
  form: englishSite.form,
  parcours: englishAbout.parcours,
  experiences: englishAbout.experiences,
  formation: englishAbout.formation,
  langues: englishAbout.langues,
  atouts: englishAbout.atouts,
  interets: englishAbout.interets,
  principes: frenchAbout.principes.map((principe, index) => ({
    ...principe,
    ...englishAbout.principes[index],
  })),
  competences: frenchAbout.competences.map((group, index) => ({
    domain: englishAbout.competenceDomains[index] ?? group.domain,
    technologies: group.technologies,
  })),
  ia: englishAbout.ia,
  devise: englishAbout.devise,
  recherche: englishAbout.recherche,
  projects: featuredProjects.map(inEnglish),
};

export function getContent(locale: Locale): Content {
  return locale === "en" ? english : french;
}

/** « Trois », “Three”: a count written out, to open a sentence. */
export function countWord(locale: Locale, n: number): string {
  return capitalise(locale === "en" ? englishCardinal(n) : frenchCardinal(n));
}

/**
 * The first sentence of a text: what a project is, before what he did on it.
 * The index sets it under each title, so the description is never retyped.
 */
export function leadSentence(text: string): string {
  return /^.+?[.!?](?=\s|$)/.exec(text)?.[0] ?? text;
}

export function findProject(content: Content, slug: string): Project | undefined {
  return content.projects.find((project) => project.slug === slug);
}

export function kindLabel(content: Content, kind: ProjectKind): string {
  return kind === "personnel" ? content.copy.kindPersonal : content.copy.kindSchool;
}

/** « Projet d’école, équipe de 5 », or just the kind when he worked alone. */
export function projectContext(content: Content, project: Project): string | null {
  if (!project.kind) return null;
  const kind = kindLabel(content, project.kind);
  return project.team ? `${kind}, ${project.team}` : kind;
}

/**
 * « Trois projets, en 2026. » — counted, never typed. Adding a project
 * rewrites the sentence on its own, years included.
 */
export function projectsSummary(content: Content): string {
  const { copy, locale, projects } = content;
  const years = projects.map((project) => project.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const span =
    first === last
      ? fill(copy.yearsSingle, { year: first })
      : fill(copy.yearsRange, { first, last });
  const count = projects.length;
  return fill(count > 1 ? copy.projectsSummaryMany : copy.projectsSummaryOne, {
    count: countWord(locale, count),
    years: span,
  });
}
