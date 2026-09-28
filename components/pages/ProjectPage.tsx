import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectDiagram } from "@/components/projects/ProjectDiagram";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectShot } from "@/components/projects/ProjectShot";
import {
  ProjectArtwork,
  ProjectAtmosphere,
} from "@/components/projects/ProjectVisual";
import Link from "next/link";
import {
  Eyebrow,
  ExternalLink,
  StatusDot,
} from "@/components/ui/primitives";
import { TagList } from "@/components/ui/TagList";
import { featuredProjects } from "@/content/projects";
import { findProject, getContent, projectContext } from "@/lib/content";
import { alternates, fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * Every published project. The slugs are the same in both languages, and
 * projects kept in reserve get no page: an address nobody can reach from the
 * site should not answer either.
 */
export function projectParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export function projectMetadata(locale: Locale, slug: string): Metadata {
  const project = findProject(getContent(locale), slug);
  if (!project) return {};

  const title = project.subtitle
    ? `${project.title}, ${project.subtitle}`
    : project.title;

  return {
    title,
    description: project.description,
    alternates: alternates(locale, "projects", slug),
    openGraph: {
      title,
      description: project.description,
      url: pathFor(locale, "projects", slug),
    },
  };
}

export function ProjectPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const content = getContent(locale);
  const { copy, projects } = content;
  const project = findProject(content, slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const context = projectContext(content, project);
  const titleHref = project.demo ?? project.repo;

  return (
    <>
      <PageHeader
        eyebrow={String(project.year)}
        title={project.title}
        titleLink={titleHref ? { href: titleHref, newTab: copy.newTab } : undefined}
        sub={project.subtitle ?? undefined}
        backdrop={
          project.thumbnail?.background ? (
            <ProjectAtmosphere background={project.thumbnail.background} />
          ) : undefined
        }
        media={
          project.thumbnail ? (
            <ProjectArtwork
              image={project.thumbnail}
              sizes="(min-width: 1024px) 40rem, calc(100vw - 48px)"
            />
          ) : project.image ? (
            <ProjectShot
              image={project.image}
              sizes="(min-width: 1024px) 40rem, calc(100vw - 48px)"
              priority
            />
          ) : undefined
        }
      />

      <section className="band">
        <div className="section-body mx-auto grid max-w-page gap-x-gutter gap-y-block px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-10">
          <div>
            <p className="max-w-measure text-lede text-paper-2">
              {project.description}
            </p>

            {project.highlights.length > 0 ? (
              <>
                <ul className="mt-block grid gap-label">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-baseline gap-4 text-body text-paper-2"
                    >
                      <span
                        className="mark-flare dot-baseline"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div className="grid content-start gap-block">
            {context ? (
              <div>
                <Eyebrow>{copy.frameLabel}</Eyebrow>
                <p className="mt-label text-body text-paper">{context}</p>
              </div>
            ) : null}

            <div>
              {project.stackDisclosure ? (
                <details>
                  <summary className="link list-none font-mono text-meta tracking-meta text-paper-2 [&::-webkit-details-marker]:hidden">
                    {project.stackDisclosure}
                  </summary>
                  <TagList items={project.stack} className="mt-label" />
                </details>
              ) : (
                <>
                  <Eyebrow>{copy.stackLabel}</Eyebrow>
                  <TagList items={project.stack} className="mt-label" />
                </>
              )}
            </div>

            <div>
              <Eyebrow>{copy.statusLabel}</Eyebrow>
              <div className="mt-label">
                <StatusDot status={project.status} labels={copy} />
              </div>
            </div>

            {project.repo || project.demo ? (
              <div>
                <Eyebrow>{copy.linksLabel}</Eyebrow>
                <ul className="mt-label grid gap-3">
                  {project.repo ? (
                    <li>
                      <ExternalLink
                        href={project.repo}
                        label={fill(copy.repoLabel, { title: project.title })}
                        newTab={copy.newTab}
                        className="link font-mono text-meta tracking-meta text-paper"
                      >
                        {copy.repoLong} ↗
                      </ExternalLink>
                    </li>
                  ) : null}
                  {project.demo ? (
                    <li>
                      <ExternalLink
                        href={project.demo}
                        label={fill(copy.demoLabel, { title: project.title })}
                        newTab={copy.newTab}
                        className="link font-mono text-meta tracking-meta text-flare"
                      >
                        {copy.demoLong} ↗
                      </ExternalLink>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </div>

          {/* When the header carries the artwork, the interface itself opens
              the page's body, across both columns. */}
          {project.thumbnail && project.image ? (
            <ProjectMedia media={[project.image]} />
          ) : null}
        </div>
      </section>

      {/* The long-form account, when the project carries one. */}
      {project.approach ? (
        <section aria-labelledby="demarche-title">
          <div className="section-body mx-auto max-w-page px-6 lg:px-10">
            <h2 id="demarche-title" className="eyebrow">
              {copy.approachTitle}
            </h2>

            {/* A part is a section of its own inside the account, so parts
                are a section apart: further from each other than anything
                within one part is from the rest of it. */}
            <div className="mt-block grid gap-section">
              {project.approach.map((section, sectionIndex) => (
                <section
                  key={section.title}
                  aria-labelledby={`demarche-section-${sectionIndex}`}
                  className="grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
                >
                  {/* The heading and its paragraphs sit on the part's two
                      columns through a subgrid, so that what illustrates them
                      can take either the text column or both. On a phone the
                      heading keeps closer to its text than the text keeps to
                      its illustration. */}
                  <div className="grid gap-x-gutter gap-y-title lg:col-span-2 lg:grid-cols-subgrid">
                    <h3
                      id={`demarche-section-${sectionIndex}`}
                      className="font-display text-h3 leading-tight tracking-tight text-paper"
                    >
                      {section.title}
                    </h3>
                    <div className="grid max-w-measure gap-title text-body">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="prose-fr">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  {section.media ? (
                    <ProjectMedia media={section.media} align="text" />
                  ) : null}
                  {section.diagram ? (
                    <ProjectDiagram
                      diagram={section.diagram}
                      labels={{ or: copy.diagramOr }}
                    />
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div>
        <nav
          aria-label={copy.pagerLabel}
          className={`section-body mx-auto grid max-w-page gap-title px-6 sm:grid-cols-2 lg:px-10 ${project.approach ? "pt-0" : ""}`}
        >
          {previous ? (
            <div>
              <Link
                href={pathFor(locale, "projects", previous.slug)}
                className="link font-mono text-meta tracking-meta text-paper-2"
              >
                ← {previous.title}
              </Link>
            </div>
          ) : null}

          {next ? (
            <div className="sm:col-start-2 sm:text-right">
              <Link
                href={pathFor(locale, "projects", next.slug)}
                className="link font-mono text-meta tracking-meta text-paper-2"
              >
                {next.title} →
              </Link>
            </div>
          ) : null}
        </nav>
      </div>
    </>
  );
}
