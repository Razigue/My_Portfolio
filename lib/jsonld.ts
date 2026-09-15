import portrait from "@/content/media/razigue.png";
import type { Content } from "@/lib/content";
import { LANGUAGE_TAGS, pathFor } from "@/lib/i18n";

/**
 * Only facts that exist in `content/` end up here. Nothing is asserted about
 * Razigue that is not already on the page, in the language of the page.
 */
export function jsonLd({
  formation,
  hero,
  langues,
  locale,
  presentation,
  site,
}: Content) {
  const home = `${site.url}${pathFor(locale, "home") === "/" ? "" : pathFor(locale, "home")}`;

  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    description: presentation,
    email: `mailto:${site.email}`,
    url: site.url,
    // The photograph itself. The social card's address carries a hash once it
    // sits in a route group, and a card is not a picture of the person anyway.
    image: `${site.url}${portrait.src}`,
    sameAs: [site.github, site.linkedin].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: formation.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Le Kremlin-Bicêtre",
        addressCountry: "FR",
      },
    },
    knowsLanguage: langues.map((langue) => ({
      "@type": "Language",
      name: langue.name,
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${home}#website`,
    url: home,
    name: `${site.name}, ${site.role}`,
    description: hero.tagline,
    inLanguage: LANGUAGE_TAGS[locale].region,
    publisher: { "@id": `${site.url}/#person` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };
}
