import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";
import { skillDomains } from "@/lib/skills";

/**
 * One block per domain: its technologies on one line, and under them the
 * published projects that use any of them, derived from `content/projects.ts`
 * and linked, so the list also says where to see it. A domain no published
 * project uses shows its technologies alone. See `lib/skills.ts`.
 */
export function Skills({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, sections } = content;
  const domains = skillDomains(content);

  return (
    <section aria-labelledby="competences-title" className="band">
      <div className="section-body page-width">
        <h2
          id="competences-title"
          className="section-title"
        >
          {sections.competences}
        </h2>

        <ul className="mt-block grid gap-x-gutter gap-y-block lg:grid-cols-2">
          {domains.map((domain) => (
            <li key={domain.domain}>
              <h3 className="part-title">
                {domain.domain}
              </h3>

              <p className="mt-label max-w-measure text-body text-paper">
                {domain.skills.map((skill) => skill.name).join(", ")}
              </p>

              {/* Each project carries the arrow every other link to a page on
                  this site carries: set in running text with nothing drawn
                  under it, a name told apart by its colour alone does not
                  read as something to click. */}
              {domain.projects.length > 0 ? (
                <p className="mt-label flex flex-wrap items-baseline gap-x-5 gap-y-2 text-meta text-paper-3">
                  <span>{copy.skillsUsedIn}</span>
                  {domain.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={pathFor(locale, "projects", project.slug)}
                      className="link text-paper"
                    >
                      {project.title}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
