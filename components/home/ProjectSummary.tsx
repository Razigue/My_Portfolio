import Link from "next/link";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink, StatusDot, TagList } from "@/components/ui/primitives";
import type { Project } from "@/content/projects";
import { getContent, projectContext } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * One published project on the home page: its interface beside what it is,
 * the frame and the year, what he did on it, the stack and the links. Enough
 * to decide whether to open the page, without scrolling through a screen of
 * scenery first.
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
      <article
        aria-labelledby={titleId}
        className="grid items-start gap-x-gutter gap-y-title lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        {visual ? (
          <ProjectShot
            image={visual}
            sizes="(min-width: 1024px) 33rem, calc(100vw - 48px)"
            placeholder={visual.cutout ? "empty" : "blur"}
          />
        ) : null}

        <div className={visual ? undefined : "lg:col-start-2"}>
          <h3
            id={titleId}
            className="font-display text-h3 leading-tight tracking-tight text-paper"
          >
            <Link
              href={href}
              className="transition-colors duration-300 hover:text-flare"
            >
              {project.title}
            </Link>
          </h3>

          {project.subtitle ? (
            <p className="mt-1 text-body text-paper-3">{project.subtitle}</p>
          ) : null}

          <p className="mt-label flex flex-wrap items-center gap-x-5 gap-y-1 text-meta text-paper-3">
            {context ? <span>{context}</span> : null}
            <span className="tnum">{project.year}</span>
            <StatusDot status={project.status} labels={copy} />
          </p>

          <p className="mt-title max-w-measure text-body text-paper-2">
            {project.description}
          </p>

          <Reveal variant="rise" className="mt-title">
            <TagList items={project.primaryStack ?? project.stack} />
          </Reveal>

          <p className="mt-title flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={href}
              className="link font-mono text-meta tracking-meta text-paper"
            >
              {copy.viewProject} →
            </Link>

            {project.repo ? (
              <ExternalLink
                href={project.repo}
                label={fill(copy.repoLabel, { title: project.title })}
                newTab={copy.newTab}
                className="link font-mono text-meta tracking-meta text-paper-3"
              >
                {copy.repoShort} ↗
              </ExternalLink>
            ) : null}

            {project.demo ? (
              <ExternalLink
                href={project.demo}
                label={fill(copy.demoLabel, { title: project.title })}
                newTab={copy.newTab}
                className="link font-mono text-meta tracking-meta text-paper-3"
              >
                {copy.demoShort} ↗
              </ExternalLink>
            ) : null}
          </p>
        </div>
      </article>
    </li>
  );
}
