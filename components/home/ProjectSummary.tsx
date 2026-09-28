import Link from "next/link";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { ExternalLink, StatusDot } from "@/components/ui/primitives";
import { TagList } from "@/components/ui/TagList";
import type { Project } from "@/content/projects";
import { getContent, projectContext } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * One published project on the home page, as a column: its interface, its
 * name and state, the frame and the year, what it is in one sentence, the
 * main technologies and the links. The full description waits on the
 * project's page.
 */
export function ProjectSummary({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const content = getContent(locale);
  const { copy } = content;
  const context = projectContext(content, project);
  const href = pathFor(locale, "projects", project.slug);
  const titleId = `projet-${project.slug}`;
  // The interface itself; the artwork made for the project page's header
  // only when there is no capture.
  const visual = project.image ?? project.thumbnail ?? null;

  return (
    <li>
      <article aria-labelledby={titleId} className="grid content-start gap-y-title">
        {visual ? (
          <ProjectShot
            image={visual}
            sizes="(min-width: 1024px) 25rem, calc(100vw - 48px)"
            placeholder={visual.cutout ? "empty" : "blur"}
          />
        ) : null}

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3
              id={titleId}
              className="section-title"
            >
              <Link
                href={href}
                className="transition-colors duration-300 hover:text-flare"
              >
                {project.title}
              </Link>
            </h3>
            <StatusDot status={project.status} labels={copy} />
          </div>

          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-meta text-paper-3">
            {context ? <span>{context}</span> : null}
            <span className="tnum">{project.year}</span>
          </p>

          <p className="mt-title max-w-measure text-body text-paper-2">
            {project.summary ?? project.description}
          </p>

          <TagList
            items={project.primaryStack ?? project.stack}
            className="mt-title"
          />

          <p className="mt-title flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={href}
              className="link type-label text-paper"
            >
              {copy.viewProject} →
            </Link>

            {project.demo ? (
              <ExternalLink
                href={project.demo}
                label={fill(copy.demoLabel, { title: project.title })}
                newTab={copy.newTab}
                className="link type-label text-paper-3"
              >
                {copy.demoShort} ↗
              </ExternalLink>
            ) : null}

            {project.repo ? (
              <ExternalLink
                href={project.repo}
                label={fill(copy.repoLabel, { title: project.title })}
                newTab={copy.newTab}
                className="link type-label text-paper-3"
              >
                {copy.repoShort} ↗
              </ExternalLink>
            ) : null}
          </p>
        </div>
      </article>
    </li>
  );
}
