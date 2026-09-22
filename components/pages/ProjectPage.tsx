import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectDiagram } from "@/components/projects/ProjectDiagram";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import {
  Eyebrow,
  ExternalLink,
  StatusDot,
  TagList,
} from "@/components/ui/primitives";
import { featuredProjects, projectNumber } from "@/content/projects";
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

export function ProjectPage({ locale, slug }: { locale: Locale; slug: string }) {
  const content = getContent(locale);
  const { copy, projects } = content;
  const project = findProject(content, slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const context = projectContext(content, project);

  return (
    <>
      <PageHeader
        ordinal={projectNumber(index)}
        eyebrow={String(project.year)}
        title={project.title}
        sub={project.subtitle ?? undefined}
        media={
          project.image ? (
            <ProjectShot
              image={project.image}
              sizes="(min-width: 1024px) 40rem, calc(100vw - 48px)"
              priority
            />
          ) : undefined
        }
      />

      <Stage className="band" stagger={0.09}>
        <div className="section-body-tight mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-24 lg:px-10">
          <div>
            <Reveal
              variant="lines"
              as="p"
              order={0}
              className="max-w-measure text-lede text-paper-2"
            >
              {project.description}
            </Reveal>

            {project.highlights.length > 0 ? (
              <>
                <ul className="mt-14 grid gap-5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      data-choreo="rise"
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

          <aside className="grid content-start gap-10">
            {context ? (
              <Reveal variant="rise">
                <Eyebrow>{copy.frameLabel}</Eyebrow>
                <p className="mt-4 text-body text-paper">{context}</p>
              </Reveal>
            ) : null}

            <Reveal variant="rise">
              {project.stackDisclosure ? (
                <details>
                  <summary className="cursor-pointer font-mono text-meta tracking-meta text-paper-2">
                    {project.stackDisclosure}
                  </summary>
                  <TagList items={project.stack} className="mt-4" />
                </details>
              ) : (
                <>
                  <Eyebrow>{copy.stackLabel}</Eyebrow>
                  <TagList items={project.stack} className="mt-4" />
                </>
              )}
            </Reveal>

            <Reveal variant="rise">
              <Eyebrow>{copy.statusLabel}</Eyebrow>
              <div className="mt-4">
                <StatusDot status={project.status} labels={copy} />
              </div>
            </Reveal>

            {project.repo || project.demo ? (
              <Reveal variant="rise">
                <Eyebrow>{copy.linksLabel}</Eyebrow>
                <ul className="mt-4 grid gap-3">
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
              </Reveal>
            ) : null}
          </aside>
        </div>
      </Stage>

      {/* The long-form account, when the project carries one. Its own Stage,
          so it is choreographed against its own scroll position rather than
          the one that revealed the summary two screens earlier. */}
      {project.approach ? (
        <Stage aria-labelledby="demarche-title" stagger={0.08}>
          <div className="section-body-tight mx-auto max-w-page px-6 lg:px-10">
            <Reveal
              variant="fade"
              as="h2"
              order={0}
              id="demarche-title"
              className="eyebrow"
            >
              {copy.approachTitle}
            </Reveal>

            <div className="mt-12 grid gap-14 lg:gap-20">
              {project.approach.map((section, sectionIndex) => (
                <section
                  key={section.title}
                  aria-labelledby={`demarche-section-${sectionIndex}`}
                  className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"
                >
                  <Reveal
                    variant="rise"
                    as="h3"
                    id={`demarche-section-${sectionIndex}`}
                    className="font-display text-h3 leading-tight tracking-tight text-paper"
                  >
                    {section.title}
                  </Reveal>
                  <div className="grid max-w-measure gap-6 text-body">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        data-choreo="lines"
                        className="prose-fr"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.media ? <ProjectMedia media={section.media} /> : null}
                  {section.diagram ? (
                    <ProjectDiagram
                      diagram={section.diagram}
                      labels={{ or: copy.diagramOr, apart: copy.diagramApart }}
                    />
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </Stage>
      ) : null}

      <Stage stagger={0.1}>
        <nav
          aria-label={copy.pagerLabel}
          className="section-body-tight mx-auto grid max-w-page gap-6 px-6 sm:grid-cols-2 lg:px-10"
        >
          <Reveal variant="rise">
            {previous ? (
              <TransitionLink
                href={pathFor(locale, "projects", previous.slug)}
                curtainLabel={previous.title}
                className="link font-mono text-meta tracking-meta text-paper-2"
              >
                ← {previous.title}
              </TransitionLink>
            ) : null}
          </Reveal>

          <Reveal variant="rise" className="sm:text-right">
            {next ? (
              <TransitionLink
                href={pathFor(locale, "projects", next.slug)}
                curtainLabel={next.title}
                className="link font-mono text-meta tracking-meta text-paper-2"
              >
                {next.title} →
              </TransitionLink>
            ) : null}
          </Reveal>
        </nav>
      </Stage>
    </>
  );
}
