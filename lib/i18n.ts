/**
 * The two languages and the addresses they live at. French is the default and
 * sits at the root; English mirrors every page under `/en`, with English words
 * for the path segments. Nothing here reads content, so client components can
 * import it too.
 */

export type Locale = "fr" | "en";

export const LOCALES: readonly Locale[] = ["fr", "en"];

export type Page = "home" | "projects" | "about" | "contact";

const SEGMENTS: Record<Locale, Record<Exclude<Page, "home">, string>> = {
  fr: { projects: "projets", about: "a-propos", contact: "contact" },
  en: { projects: "projects", about: "about", contact: "contact" },
};

/** What each language declares itself as: to the browser, to search engines and to social cards. */
export const LANGUAGE_TAGS: Record<
  Locale,
  { readonly html: string; readonly region: string; readonly og: string }
> = {
  fr: { html: "fr", region: "fr-FR", og: "fr_FR" },
  en: { html: "en-GB", region: "en-GB", og: "en_GB" },
};

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

/** A page's address in one language. `slug` names a project under `projects`. */
export function pathFor(locale: Locale, page: Page, slug?: string): string {
  const root = locale === "fr" ? "" : "/en";
  if (page === "home") return root || "/";
  const path = `${root}/${SEGMENTS[locale][page]}`;
  return slug ? `${path}/${slug}` : path;
}

/** The same page in the other language. An address it does not recognise leads home. */
export function translatePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const from: Locale = parts[0] === "en" ? "en" : "fr";
  if (from === "en") parts.shift();

  const [segment, slug] = parts;
  if (!segment) return pathFor(to, "home");

  const pages = Object.keys(SEGMENTS[from]) as Exclude<Page, "home">[];
  const page = pages.find((key) => SEGMENTS[from][key] === segment);
  return page ? pathFor(to, page, slug) : pathFor(to, "home");
}

/** The canonical address of a page, and where its twin lives in the other language. */
export function alternates(locale: Locale, page: Page, slug?: string) {
  return {
    canonical: pathFor(locale, page, slug),
    languages: {
      [LANGUAGE_TAGS.fr.region]: pathFor("fr", page, slug),
      [LANGUAGE_TAGS.en.region]: pathFor("en", page, slug),
      "x-default": pathFor("fr", page, slug),
    },
  };
}

/**
 * Puts values into a sentence written with `{name}` placeholders.
 *
 * French elides « de » before a vowel, so « Démo en ligne de {title} » gives
 * « d’Overkill » but « de Tonecraft ». Only « de » directly before a
 * placeholder is touched; an English template never contains it.
 */
export function fill(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(
    /(\bde )?\{(\w+)\}/g,
    (match, de: string | undefined, key: string) => {
      const value = values[key];
      if (value === undefined) return match;
      const text = String(value);
      if (de && /^[aeiouyàâéèêëîïôûœ]/i.test(text)) return `d’${text}`;
      return `${de ?? ""}${text}`;
    },
  );
}

/**
 * The shape of a French content object with every string widened to any
 * string, so that its English twin has to carry exactly the same keys.
 */
export type Localized<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly Localized<Item>[]
    : { readonly [K in keyof T]: Localized<T[K]> };
