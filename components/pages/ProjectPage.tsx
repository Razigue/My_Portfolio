import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApproachNav } from "@/components/projects/ApproachNav";
import { ProjectDiagram } from "@/components/projects/ProjectDiagram";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { ProjectAtmosphere } from "@/components/projects/ProjectVisual";
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
  const mainStack = project.stackDisclosure
    ? (project.primaryStack ?? [])
    : project.stack;
  const otherStack = project.stack.filter((item) => !mainStack.includes(item));
  const titleHref = project.demo ?? project.repo;
  const heroImage = project.image ?? project.thumbnail;
  const heading = (
    <h1 className="block font-display text-h2 leading-display tracking-display text-paper">
      {project.title}
    </h1>
  );

  return (
    <>
      {/* The page has one reading column and one rail beside it, from the
          header down. Everything read in order (the title, the description,
          the capture, the account) starts on the column's left edge;
          everything looked up (the links, the status, the stack, the parts
          of the account) sits in the rail on the right. */}
      <header
        className={
          project.thumbnail?.background
            ? "relative isolate overflow-hidden"
            : undefined
        }
      >
        {project.thumbnail?.background ? (
          <ProjectAtmosphere background={project.thumbnail.background} />
        ) : null}
        <div className="page-head page-width">
          <div className="grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)]">
            <div className="min-w-0">
              {titleHref ? (
                <ExternalLink
                  href={titleHref}
                  newTab={copy.newTab}
                  className="block w-fit"
                >
                  {heading}
                </ExternalLink>
              ) : (
                <div>{heading}</div>
              )}
              {project.subtitle ? (
                <p className="mt-title max-w-measure text-lede text-paper-2">
                  {project.subtitle}
                </p>
              ) : null}

              <p className="mt-block max-w-measure text-lede text-paper">
                {project.description}
              </p>

              {project.highlights.length > 0 ? (
                <ul className="mt-block grid max-w-measure gap-label">
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
              ) : null}
            </div>

            {/* What the project looks like: under the description on a
                phone, and across the column and the rail from a laptop up,
                under both. The interface, or the artwork when there is no
                capture. */}
            {heroImage ? (
              <div className="min-w-0 lg:col-span-2 lg:row-start-2">
                <ProjectShot
                  image={heroImage}
                  sizes="(min-width: 88rem) 83rem, calc(100vw - 48px)"
                  priority
                />
              </div>
            ) : null}

            <div className="ruled ruled-tight grid content-start gap-title lg:col-start-2 lg:row-start-1">
              {project.repo || project.demo ? (
                <div>
                  <Eyebrow>{copy.linksLabel}</Eyebrow>
                  <ul className="mt-label grid gap-3">
                    {project.demo ? (
                      <li>
                        <ExternalLink
                          href={project.demo}
                          label={fill(copy.demoLabel, { title: project.title })}
                          newTab={copy.newTab}
                          className="link fact-value type-label"
                        >
                          {copy.demoLong} ↗
                        </ExternalLink>
                      </li>
                    ) : null}
                    {project.repo ? (
                      <li>
                        <ExternalLink
                          href={project.repo}
                          label={fill(copy.repoLabel, { title: project.title })}
                          newTab={copy.newTab}
                          className="link type-label text-paper-2"
                        >
                          {copy.repoLong} ↗
                        </ExternalLink>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}

              <div>
                <Eyebrow>{copy.statusLabel}</Eyebrow>
                <div className="mt-label">
                  <StatusDot status={project.status} labels={copy} />
                </div>
              </div>

              {context ? (
                <div>
                  <Eyebrow>{copy.frameLabel}</Eyebrow>
                  <p className="fact-value mt-label text-body">{context}</p>
                </div>
              ) : null}

              {/* The main technologies stay in view: they are what a
                  recruiter scans for. With a disclosure, the others wait
                  behind a link that says whether it will show or hide them. */}
              <div>
                <Eyebrow>{copy.stackLabel}</Eyebrow>
                {mainStack.length > 0 ? (
                  <TagList items={mainStack} className="mt-label" />
                ) : null}
                {project.stackDisclosure && otherStack.length > 0 ? (
                  <details className="stack-more mt-label">
                    <summary className="link list-none type-label text-paper-2 [&::-webkit-details-marker]:hidden">
                      <span className="stack-more-show">
                        {project.stackDisclosure}
                      </span>
                      <span className="stack-more-hide">{copy.stackHide}</span>
                    </summary>
                    <TagList items={otherStack} className="mt-label" />
                  </details>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="page-width" aria-hidden="true">
        <hr className="rule" />
      </div>

      {/* The long-form account, when the project carries one: on the same
          column and rail as the section above, with the parts listed in the
          rail, where they stay in view as the account is read. */}
      {project.approach ? (
        <section aria-labelledby="demarche-title">
          <div className="section-body page-width grid gap-x-gutter lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)]">
            <div className="min-w-0">
              <h2 id="demarche-title" className="section-title">
                {copy.approachTitle}
              </h2>

              {/* Inside a part, the heading, the text and what illustrates
                  it are a title step apart; two parts are a block apart. The
                  account reads straight through, so no line cuts it: its
                  headings are enough. */}
              <div className="mt-block grid gap-block">
                {project.approach.map((section, sectionIndex) => (
                  <section
                    key={section.title}
                    id={`demarche-${sectionIndex}`}
                    aria-labelledby={`demarche-section-${sectionIndex}`}
                    className="grid min-w-0 gap-title"
                  >
                    <h3
                      id={`demarche-section-${sectionIndex}`}
                      className="part-title"
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
                    {section.media ? (
                      <ProjectMedia media={section.media} />
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

            <ApproachNav
              label={copy.approachTitle}
              titles={project.approach.map((section) => section.title)}
            />
          </div>
        </section>
      ) : null}

      <div>
        <nav
          aria-label={copy.pagerLabel}
          className="section-body page-width grid gap-title pt-block sm:grid-cols-2"
        >
          {previous ? (
            <div>
              <Link
                href={pathFor(locale, "projects", previous.slug)}
                className="link type-label text-paper-2"
              >
                ← {previous.title}
              </Link>
            </div>
          ) : null}

          {next ? (
            <div className="sm:col-start-2 sm:text-right">
              <Link
                href={pathFor(locale, "projects", next.slug)}
                className="link type-label text-paper-2"
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
