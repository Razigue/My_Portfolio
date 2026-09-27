import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

export function ParcoursTeaser({ locale }: { locale: Locale }) {
  const { copy, experiences, presentation, sections } = getContent(locale);

  return (
    <section aria-labelledby="parcours-title">
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <h2
          id="parcours-title"
          className="font-display text-h3 leading-tight tracking-tight text-paper"
        >
          {sections.parcours}
        </h2>

        <div className="mt-block grid gap-x-gutter gap-y-block lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="max-w-measure text-body text-paper-2">{presentation}</p>

            <p className="mt-title">
              <Link
                href={pathFor(locale, "about")}
                className="link font-mono text-meta tracking-meta text-paper"
              >
                {copy.parcoursLink} →
              </Link>
            </p>
          </div>

          <div>
            <h3 className="eyebrow">{copy.experiencesTitle}</h3>
            {/* Every other row is lifted rather than ruled off, and the list
                is pulled out by its own padding so the roles line up with the
                label above them. */}
            <ul className="zebra -mx-4 mt-label grid">
              {experiences.map((experience) => (
                <li
                  key={experience.role}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 text-meta"
                >
                  <span className="text-paper">{experience.role}</span>
                  <span className="tnum text-paper-3">{experience.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
