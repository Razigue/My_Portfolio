import Link from "next/link";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink, ProjectMeta } from "@/components/ui/primitives";
import { TagList } from "@/components/ui/TagList";
import type { Project } from "@/content/projects";
import { getContent, projectContext } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * The first of `featuredSlugs`, given the width of the page: what it is in
 * one sentence, the points that prove it, its main technologies and every way
 * to see it, beside its interface on a tinted stage.
 *
 * Not a card-wide link: it carries three destinations of its own (the demo,
 * the repository, the case study), and a hidden fourth would compete.
 */
export function FeaturedProject({
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
  const visual = project.image
    ? { ...project.image, src: project.image.cover ?? project.image.src }
    : (project.thumbnail ?? null);
  const stack = project.primaryStack ?? project.stack;

  return (
    <article
      aria-labelledby={`vedette-${project.slug}`}
      className="card grid overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
    >
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <h3
          id={`vedette-${project.slug}`}
          className="text-h2 leading-tight tracking-display"
        >
          <Link href={href} className="card-title hover:text-flare">
            {project.title}
          </Link>
        </h3>

        {project.subtitle ? (
          <p className="mt-2 text-body text-paper-2">{project.subtitle}</p>
        ) : null}

        <ProjectMeta
          context={context}
          status={project.status}
          labels={copy}
          className="mt-3"
        />

        <p className="mt-5 max-w-measure text-lede text-paper-2">
          {project.summary ?? project.description}
        </p>

        {project.highlights.length > 0 ? (
          <ul className="check-list mt-6 grid gap-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="text-body text-paper-2">
                <span className="check-mark" aria-hidden="true">
                  <Icon name="check" />
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <TagList items={stack} proven={stack} className="mt-7" />

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          {project.demo ? (
            <ExternalLink
              href={project.demo}
              label={fill(copy.demoLabel, { title: project.title })}
              newTab={copy.newTab}
              className="btn btn-solid"
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
              className="btn"
            >
              <Icon name="github" />
              {copy.repoShort}
            </ExternalLink>
          ) : null}

          <Link href={href} className="link-arrow ml-1 type-label">
            {copy.caseStudy}
            <Icon name="arrowRight" />
          </Link>
        </div>
      </div>

      {visual ? (
        <div className="feature-stage flex items-center p-4 sm:p-6 lg:p-7">
          <ProjectShot
            image={visual}
            sizes="(min-width: 1024px) 40rem, calc(100vw - 40px)"
            placeholder={visual.cutout ? "empty" : "blur"}
            className="w-full"
          />
        </div>
      ) : null}
    </article>
  );
}
