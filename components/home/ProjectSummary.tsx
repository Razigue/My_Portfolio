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
 *
 * The whole card leads to the project: the title's link is stretched over
 * it, so a visitor does not have to aim at the name, and a keyboard stops on
 * the card once, outlined whole. The card has a ground of its own, so its
 * edges show what the pointer can reach. The only links left inside it go
 * somewhere else, the demo and the repository, above the stretched one.
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
    <li className="grid">
      <article
        aria-labelledby={titleId}
        className="card flex flex-col gap-y-title p-4 sm:p-5"
      >
        {visual ? (
          <ProjectShot
            image={visual}
            sizes="(min-width: 1024px) 25rem, calc(100vw - 48px)"
            placeholder={visual.cutout ? "empty" : "blur"}
          />
        ) : null}

        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3
              id={titleId}
              className="section-title"
            >
              <Link
                href={href}
                className="stretch-link card-title transition-colors duration-300"
              >
                {project.title}
              </Link>
            </h3>
            <StatusDot status={project.status} labels={copy} />
          </div>

          {context ? (
            <p className="mt-2 text-meta text-paper-3">{context}</p>
          ) : null}

          <p className="mt-title max-w-measure text-body text-paper-2">
            {project.summary ?? project.description}
          </p>

          <TagList
            items={project.primaryStack ?? project.stack}
            className="mt-title"
          />

          {project.demo || project.repo ? (
            <p className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-title">
              {project.demo ? (
                <ExternalLink
                  href={project.demo}
                  label={fill(copy.demoLabel, { title: project.title })}
                  newTab={copy.newTab}
                  className="link z-2 type-label text-paper-2"
                >
                  {copy.demoShort} ↗
                </ExternalLink>
              ) : null}

              {project.repo ? (
                <ExternalLink
                  href={project.repo}
                  label={fill(copy.repoLabel, { title: project.title })}
                  newTab={copy.newTab}
                  className="link z-2 type-label text-paper-2"
                >
                  {copy.repoShort} ↗
                </ExternalLink>
              ) : null}
            </p>
          ) : null}
        </div>
      </article>
    </li>
  );
}
