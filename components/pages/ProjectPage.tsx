import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/home/ContactCta";
import { ApproachNav } from "@/components/projects/ApproachNav";
import { ProjectDiagram } from "@/components/projects/ProjectDiagram";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectShot } from "@/components/projects/ProjectShot";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink, ProjectMeta } from "@/components/ui/primitives";
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

/**
 * A project: its name, state and frame, what it is, what proves it and how to
 * see it, with the facts in a card beside; then its interface across the
 * page; then the long-form account with its parts listed in a rail that stays
 * in view; then the neighbours and the closing call.
 */
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
  const heroImage = project.image ?? project.thumbnail;

  return (
    <>
      <header className="page-head page-width">
        <p className="mb-8">
          <Link
            href={pathFor(locale, "projects")}
            className="link-arrow type-label text-paper-2"
          >
            <Icon name="arrowLeft" />
            {copy.allProjects}
          </Link>
        </p>

        <div className="grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div className="min-w-0">
            <h1
              className="rise page-title"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {project.title}
            </h1>
            {project.subtitle ? (
              <p
                className="rise mt-3 text-h3 font-medium tracking-tight text-paper-3"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {project.subtitle}
              </p>
            ) : null}

            <div className="rise" style={{ "--i": 2 } as React.CSSProperties}>
              <ProjectMeta
                context={context}
                status={project.status}
                labels={copy}
                className="mt-4"
              />
            </div>

            <p
              className="rise mt-7 max-w-measure text-lede text-paper-2"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {project.description}
            </p>

            {project.highlights.length > 0 ? (
              <ul
                className="rise check-list mt-7 grid max-w-measure gap-3"
                style={{ "--i": 3 } as React.CSSProperties}
              >
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

            {project.demo || project.repo ? (
              <div
                className="rise mt-9 flex flex-wrap items-center gap-3"
                style={{ "--i": 4 } as React.CSSProperties}
              >
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
                    {copy.repoLong}
                  </ExternalLink>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* The facts, looked up rather than read. */}
          <aside
            className="rise card h-fit p-6"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <dl className="ruled ruled-tight grid gap-title">
              {context ? (
                <div>
                  <dt className="eyebrow">{copy.frameLabel}</dt>
                  <dd className="fact-value mt-1.5 text-body">{context}</dd>
                </div>
              ) : null}

              <div>
                <dt className="eyebrow">{copy.stackLabel}</dt>
                <dd>
                  {mainStack.length > 0 ? (
                    <TagList items={mainStack} proven={mainStack} className="mt-2.5" />
                  ) : null}
                  {project.stackDisclosure && otherStack.length > 0 ? (
                    <details className="stack-more mt-3">
                      <summary className="link-arrow type-label font-normal text-paper-2">
                        <span className="stack-more-show">
                          {project.stackDisclosure}
                        </span>
                        <span className="stack-more-hide">{copy.stackHide}</span>
                      </summary>
                      <TagList items={otherStack} className="mt-2.5" />
                    </details>
                  ) : null}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {heroImage ? (
          <div
            className="rise feature-stage mt-block rounded-[1.5rem] border border-line p-3 sm:p-6 lg:p-10"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            <ProjectShot
              image={heroImage}
              sizes="(min-width: 74rem) 68rem, calc(100vw - 48px)"
              placeholder={heroImage.cutout ? "empty" : "blur"}
              priority
            />
          </div>
        ) : null}
      </header>

      {project.approach ? (
        <section aria-labelledby="demarche-title" className="band">
          <div className="section-body page-width grid gap-x-gutter lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
            <div className="min-w-0">
              <h2 id="demarche-title" className="section-title">
                {copy.approachTitle}
              </h2>

              <div className="mt-block grid gap-section">
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
                      <div className="mt-2">
                        <ProjectMedia media={section.media} />
                      </div>
                    ) : null}
                    {section.diagram ? (
                      <div className="mt-2">
                        <ProjectDiagram
                          diagram={section.diagram}
                          labels={{ or: copy.diagramOr }}
                        />
                      </div>
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

      {previous || next ? (
        <nav aria-label={copy.pagerLabel} className="page-width pt-section">
          <ul className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <li>
                <Link
                  href={pathFor(locale, "projects", previous.slug)}
                  className="card card-link flex items-center gap-4 p-5"
                >
                  <Icon name="arrowLeft" className="text-paper-3" />
                  <span>
                    <span className="block type-label text-paper-3">{previous.subtitle}</span>
                    <span className="card-title item-title">{previous.title}</span>
                  </span>
                </Link>
              </li>
            ) : null}
            {next ? (
              <li className="sm:col-start-2">
                <Link
                  href={pathFor(locale, "projects", next.slug)}
                  className="card card-link flex items-center justify-end gap-4 p-5 text-right"
                >
                  <span>
                    <span className="block type-label text-paper-3">{next.subtitle}</span>
                    <span className="card-title item-title">{next.title}</span>
                  </span>
                  <Icon name="arrowRight" className="text-paper-3" />
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}

      <ContactCta locale={locale} headingId="projet-contact-title" />
    </>
  );
}
