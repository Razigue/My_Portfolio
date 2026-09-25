import { Fragment } from "react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { skillDomains } from "@/lib/skills";

/**
 * One line per domain. A technology that a published project uses carries
 * that project's name beside it, derived from `content/projects.ts`, so the
 * list also says where to see it. See `lib/skills.ts`.
 */
export function Skills({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const domains = skillDomains(content);

  return (
    <section aria-labelledby="competences-title" className="band">
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <h2
          id="competences-title"
          className="font-display text-h3 leading-tight tracking-tight text-paper"
        >
          {content.sections.competences}
        </h2>

        <dl className="mt-block grid gap-y-title">
          {domains.map((domain) => (
            <div
              key={domain.domain}
              className="grid gap-y-2 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-x-gutter"
            >
              <dt className="eyebrow">{domain.domain}</dt>
              <dd className="max-w-[60rem] text-body text-paper">
                {domain.skills.map((skill, index) => (
                  <Fragment key={skill.name}>
                    {index > 0 ? ", " : null}
                    <span className="whitespace-nowrap">
                      {skill.name}
                      {skill.projects.length > 0 ? (
                        <span className="text-paper-3">
                          {" "}
                          ({skill.projects.map((p) => p.title).join(", ")})
                        </span>
                      ) : null}
                    </span>
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
