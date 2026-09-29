import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { TagList } from "@/components/ui/TagList";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";
import { skillDomains } from "@/lib/skills";

/**
 * One row per domain: its technologies, those a published project uses set
 * in the full text colour, and the projects that use any of them, derived
 * from `content/projects.ts` and linked. See `lib/skills.ts`.
 */
export function Skills({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, sections } = content;
  const domains = skillDomains(content);

  return (
    <section aria-labelledby="competences-title" className="band">
      <div className="section-body page-width">
        <h2 id="competences-title" className="section-title">
          {sections.competences}
        </h2>

        <ul className="mt-block grid border-t border-line">
          {domains.map((domain) => (
            <li
              key={domain.domain}
              className="grid gap-x-gutter gap-y-3 border-b border-line py-6 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_minmax(0,17rem)] md:items-baseline"
            >
              <h3 className="item-title">{domain.domain}</h3>

              <TagList
                items={domain.skills.map((skill) => skill.name)}
                proven={domain.skills
                  .filter((skill) => skill.projects.length > 0)
                  .map((skill) => skill.name)}
              />

              {domain.projects.length > 0 ? (
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 type-label text-paper-3 md:justify-end">
                  <span>{copy.skillsUsedIn}</span>
                  {domain.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={pathFor(locale, "projects", project.slug)}
                      className="link-arrow"
                    >
                      {project.title}
                      <Icon name="arrowRight" />
                    </Link>
                  ))}
                </p>
              ) : (
                <span aria-hidden="true" className="hidden md:block" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
