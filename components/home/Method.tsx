import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * How he works, said once per principle and pinned to the published projects
 * that show it, so every claim here is one click from its evidence. How he
 * uses AI is on the home page. `checkMethod` refuses a principle citing a project that is not
 * published.
 */
export function Method({ locale }: { locale: Locale }) {
  const { principes, projects, sections } = getContent(locale);

  return (
    <section aria-labelledby="methode-title" className="band">
      <div className="section-body page-width">
        <h2 id="methode-title" className="section-title">
          {sections.methode}
        </h2>

        <ul className="ruled-each mt-block grid gap-x-gutter gap-y-block md:grid-cols-2">
          {principes.map((principe) => (
            <li key={principe.title} className="flex flex-col">
              <h3 className="part-title">{principe.title}</h3>

              <p className="mt-3 text-body text-paper-2">{principe.body}</p>

              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 type-label">
                {projects
                  .filter((project) => principe.projects.includes(project.slug))
                  .map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={pathFor(locale, "projects", project.slug)}
                        className="link-arrow"
                      >
                        {project.title}
                        <Icon name="arrowRight" />
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
