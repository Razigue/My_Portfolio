import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * How he works, said once per principle and pinned to the published projects
 * that show it, so every claim here is one click from its evidence.
 * `checkMethod` refuses a principle citing a project that is not published.
 */
export function Method({ locale }: { locale: Locale }) {
  const { principes, projects, sections } = getContent(locale);

  return (
    <section aria-labelledby="methode-title">
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <h2
          id="methode-title"
          className="font-display text-h3 leading-tight tracking-tight text-paper"
        >
          {sections.methode}
        </h2>

        <ul className="mt-block grid gap-x-gutter gap-y-block lg:grid-cols-2">
          {principes.map((principe) => (
            <li key={principe.title} className="grid content-start gap-label">
              <h3 className="font-display text-lede leading-tight tracking-tight text-paper">
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
                        className="link font-mono text-meta tracking-meta text-paper-3"
                      >
                        {project.title} →
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
