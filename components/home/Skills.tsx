import Link from "next/link";
import { Fragment } from "react";
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
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <h2
          id="competences-title"
          className="font-display text-h3 leading-tight tracking-tight text-paper"
        >
          {sections.competences}
        </h2>

        <ul className="mt-block grid gap-x-gutter gap-y-block lg:grid-cols-2">
          {domains.map((domain) => (
            <li key={domain.domain}>
              <h3 className="font-display text-lede leading-tight tracking-tight text-paper">
                {domain.domain}
              </h3>

              <p className="mt-label max-w-measure text-body text-paper">
                {domain.skills.map((skill) => skill.name).join(", ")}
              </p>

              {domain.projects.length > 0 ? (
                <p className="mt-label text-meta text-paper-3">
                  {copy.skillsUsedIn}{" "}
                  {domain.projects.map((project, index) => (
                    <Fragment key={project.slug}>
                      {index > 0 ? ", " : null}
                      <Link
                        href={pathFor(locale, "projects", project.slug)}
                        className="link text-paper-2"
                      >
                        {project.title}
                      </Link>
                    </Fragment>
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
