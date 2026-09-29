import Link from "next/link";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink, ProjectMeta } from "@/components/ui/primitives";
import { TagList } from "@/components/ui/TagList";
import type { Project } from "@/content/projects";
import { getContent, projectContext } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * One project as a card: its interface, its name and state, the frame, what
 * it is in one sentence, the main technologies and the links. The whole card
 * leads to the project's page; the demo and the repository sit above that
 * stretched link.
 */
export function ProjectSummary({
  project,
  locale,
  as: Wrapper = "li",
}: {
  project: Project;
  locale: Locale;
  as?: "li" | "div";
}) {
  const content = getContent(locale);
  const { copy } = content;
  const context = projectContext(content, project);
  const href = pathFor(locale, "projects", project.slug);
  const titleId = `projet-${project.slug}`;
  const visual = project.image ?? project.thumbnail ?? null;
  const stack = project.primaryStack ?? project.stack;

  return (
    <Wrapper className="grid">
      <article
        aria-labelledby={titleId}
        className="card card-link flex flex-col overflow-hidden"
      >
        {visual ? (
          <div className="border-b border-line bg-ink-2 p-4 sm:p-5">
            <ProjectShot
              image={visual}
              sizes="(min-width: 1024px) 34rem, calc(100vw - 40px)"
              placeholder={visual.cutout ? "empty" : "blur"}
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <h3 id={titleId} className="part-title">
            <Link href={href} className="stretch-link card-title">
              {project.title}
            </Link>
          </h3>

          <ProjectMeta
            context={context}
            status={project.status}
            labels={copy}
            className="mt-1.5"
          />

          <p className="mt-4 text-body text-paper-2">
            {project.summary ?? project.description}
          </p>

          <TagList items={stack} proven={stack} className="mt-5" />

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 type-label">
            {project.demo ? (
              <ExternalLink
                href={project.demo}
                label={fill(copy.demoLabel, { title: project.title })}
                newTab={copy.newTab}
                className="link-arrow relative z-2"
              >
                {copy.demoLong}
                <Icon name="arrowUpRight" />
              </ExternalLink>
            ) : null}

            {project.repo ? (
              <ExternalLink
                href={project.repo}
                label={fill(copy.repoLabel, { title: project.title })}
                newTab={copy.newTab}
                className="link-arrow relative z-2"
              >
                <Icon name="github" />
                {copy.repoShort}
              </ExternalLink>
            ) : null}

            <span className="ml-auto inline-flex items-center gap-1.5 text-paper-3" aria-hidden="true">
              {copy.caseStudy}
              <Icon name="arrowRight" />
            </span>
          </div>
        </div>
      </article>
    </Wrapper>
  );
}
