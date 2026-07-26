import { formation } from "@/content/about";
import { hero, presentation, site } from "@/content/site";

/**
 * Only facts that exist in `content/` end up here. Nothing is asserted about
 * Razigue that is not already on the page.
 */
const person = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  jobTitle: site.role,
  description: presentation,
  email: `mailto:${site.email}`,
  url: site.url,
  image: `${site.url}/opengraph-image`,
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
  knowsLanguage: [
    { "@type": "Language", name: "Français" },
    { "@type": "Language", name: "Anglais" },
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name}, ${site.role}`,
  description: hero.tagline,
  inLanguage: "fr-FR",
  publisher: { "@id": `${site.url}/#person` },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [person, website],
};
