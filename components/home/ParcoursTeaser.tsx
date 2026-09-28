import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The path in one column: the presentation first, at lede size, then the
 * experiences side by side, each with its period and context, then the way to
 * the full account. Chosen by Razigue among three layouts on 2026-09-28.
 */
export function ParcoursTeaser({ locale }: { locale: Locale }) {
  const { copy, experiences, presentation, sections } = getContent(locale);

  return (
    <section aria-labelledby="parcours-title">
      <div className="section-body page-width">
        <h2 id="parcours-title" className="section-title">
          {sections.parcours}
        </h2>

        <p className="mt-title max-w-measure text-lede text-paper-2">
          {presentation}
        </p>

        <h3 className="eyebrow mt-block">{copy.experiencesTitle}</h3>
        <ul className="ruled-each mt-label grid gap-x-gutter gap-y-title sm:grid-cols-2">
          {experiences.map((experience) => (
            <li key={experience.role}>
              <p className="part-title">{experience.role}</p>
              <p className="mt-2 type-label tnum text-paper-2">
                {experience.period}
              </p>
              <p className="mt-1 type-label text-paper-3">
                {experience.context}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-block">
          <Link
            href={pathFor(locale, "about")}
            className="link type-label text-paper"
          >
            {copy.parcoursLink} →
          </Link>
        </p>
      </div>
    </section>
  );
}
