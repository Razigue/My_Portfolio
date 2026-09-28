import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * How he works, said once per principle and pinned to the published projects
 * that show it, so every claim here is one click from its evidence.
 * `checkMethod` refuses a principle citing a project that is not published.
 */
export function Method({ locale }: { locale: Locale }) {
  const { ia, principes, projects, sections } = getContent(locale);

  return (
    <section aria-labelledby="methode-title">
      <div className="section-body page-width">
        <h2
          id="methode-title"
          className="section-title"
        >
          {sections.methode}
        </h2>

        <ul className="mt-block grid gap-x-gutter gap-y-block lg:grid-cols-2">
          {principes.map((principe) => (
            <li key={principe.title} className="grid content-start gap-label">
              <h3 className="part-title">
                {principe.title}
              </h3>

              <p className="max-w-measure text-body text-paper-2">
                {principe.body}
              </p>

              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {projects
                  .filter((project) => principe.projects.includes(project.slug))
                  .map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={pathFor(locale, "projects", project.slug)}
                        className="link type-label text-paper-3"
                      >
                        {project.title} →
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Set apart on a ground of its own: it says which tool he works
            with, where the principles above say how. The ground fits the
            text, whose width the reading measure sets, so no empty band is
            left beside it. */}
        <div className="mt-block w-fit max-w-full rounded-shot bg-ink-2 p-6 sm:p-8">
          <h3 className="part-title">
            {ia.title}
          </h3>
          <div className="mt-label grid max-w-measure gap-label text-body text-paper-2">
            {ia.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
