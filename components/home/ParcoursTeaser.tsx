import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The path as a timeline, newest first: the school, then the shop he ran
 * alone, then the job before it. The full account is on the About page.
 */
export function ParcoursTeaser({ locale }: { locale: Locale }) {
  const { copy, experiences, formation, sections } = getContent(locale);

  const entries = [
    {
      period: formation.period,
      title: formation.title,
      context: `${formation.school}, ${formation.credential}`,
      body: formation.detail,
    },
    ...experiences.map((experience) => ({
      period: experience.period,
      title: experience.role,
      context: experience.context,
      body: null,
    })),
  ];

  return (
    <section aria-labelledby="parcours-title">
      <div className="section-body page-width grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <h2 id="parcours-title" className="section-title">
            {sections.parcours}
          </h2>
          <p className="mt-6">
            <Link href={pathFor(locale, "about")} className="link-arrow type-label">
              {copy.parcoursLink}
              <Icon name="arrowRight" />
            </Link>
          </p>
        </div>

        <ol className="timeline grid gap-block">
          {entries.map((entry) => (
            <li key={entry.title}>
              <p className="data text-paper-3">{entry.period}</p>
              <h3 className="mt-1.5 part-title">{entry.title}</h3>
              <p className="mt-1 text-body text-paper-2">{entry.context}</p>
              {entry.body ? (
                <p className="mt-1 type-label text-paper-3">{entry.body}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
