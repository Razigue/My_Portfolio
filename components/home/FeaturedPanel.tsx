import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ProjectArtwork, ProjectAtmosphere } from "@/components/projects/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink, StatusDot, TagList } from "@/components/ui/primitives";
import type { Project } from "@/content/projects";
import { getContent, projectContext } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * One featured project, taking the full viewport: meta pinned to the top, the
 * title holding the middle, everything else weighted to the bottom edge. The
 * ordinal sits behind it.
 *
 * Panels alternate ground as well as alignment, so a run of full screens reads
 * as separate frames without anything drawn between them: odd ones sit in a
 * band, even ones on the page itself, and the flip puts the type on the
 * opposite side.
 */
export function FeaturedPanel({
  project,
  index,
  total,
  locale,
}: {
  project: Project;
  index: number;
  total: number;
  locale: Locale;
}) {
  const content = getContent(locale);
  const { copy } = content;
  const ordinal = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  const titleId = `projet-${project.slug}`;
  const align = flip ? "lg:text-right" : "";
  const context = projectContext(content, project);
  const background = project.thumbnail?.background;

  return (
    <Stage
      as="article"
      aria-labelledby={titleId}
      start="top 80%"
      stagger={0.09}
      className={`relative isolate overflow-hidden ${flip ? "" : "band"}`}
    >
      {background ? (
        <ProjectAtmosphere background={background} />
      ) : (
        <div
          aria-hidden="true"
          className={`ghost-slot ${flip ? "ghost-slot-left" : "ghost-slot-right"}`}
        >
          <div>
            <span className="ghost-number block">{ordinal}</span>
          </div>
        </div>
      )}

      <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-between gap-block px-6 py-section lg:px-10">
        <Reveal
          variant="fade"
          order={0}
          className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-micro tracking-meta text-paper-3"
        >
          <span className="tnum text-flare">{ordinal}</span>
          <span className="tnum">
            {copy.panelOf} {String(total).padStart(2, "0")}
          </span>
          {context ? <span>{context}</span> : null}
          <span className="ml-auto flex items-center gap-6">
            <span className="tnum">{project.year}</span>
            <StatusDot status={project.status} labels={copy} />
          </span>
        </Reveal>

        <div className={project.thumbnail ? "grid items-center gap-x-gutter gap-y-block lg:grid-cols-2" : align}>
          <div className={`${align} ${project.thumbnail && flip ? "lg:order-2" : ""}`}>
            <TransitionLink
              href={pathFor(locale, "projects", project.slug)}
              curtainLabel={project.title}
              className={`block w-fit ${flip ? "lg:ml-auto" : ""}`}
            >
              <Reveal
                variant="chars"
                as="h3"
                order={1}
                id={titleId}
                className="title-slot block font-display text-h2 leading-display tracking-display text-paper"
              >
                {project.title}
              </Reveal>
            </TransitionLink>

            {project.subtitle ? (
              <Reveal
                variant="fade"
                as="p"
                order={2}
                className="mt-2 font-display text-h3 italic text-paper-3"
              >
                {project.subtitle}
              </Reveal>
            ) : null}
          </div>

          {project.thumbnail ? (
            <Reveal
              variant="rise"
              order={2}
              className={`w-full max-w-96 ${flip ? "lg:order-1" : "justify-self-end"} lg:max-w-[34rem]`}
            >
              <ProjectArtwork
                image={project.thumbnail}
                sizes="(min-width: 1232px) 34rem, (min-width: 1024px) calc((100vw - 144px) / 2), (min-width: 432px) 24rem, calc(100vw - 48px)"
              />
            </Reveal>
          ) : null}
        </div>

        <div className="grid gap-x-gutter gap-y-block lg:grid-cols-2 lg:items-end">
          <Reveal
            variant="lines"
            as="p"
            order={3}
            className={`max-w-measure text-body text-paper-2 ${flip ? "lg:order-2" : ""}`}
          >
            {project.description}
          </Reveal>

          <div className={flip ? "lg:order-1" : ""}>
            <Reveal
              variant={flip ? "drift" : "sweep"}
              order={4}
              className={flip ? "lg:flex lg:justify-start" : "lg:flex lg:justify-end"}
            >
              <TagList items={project.primaryStack ?? project.stack} />
            </Reveal>

            <Reveal
              variant="rise"
              order={5}
              className={`mt-title flex flex-wrap items-center gap-x-8 gap-y-4 ${
                flip ? "" : "lg:justify-end"
              }`}
            >
              <TransitionLink
                href={pathFor(locale, "projects", project.slug)}
                curtainLabel={project.title}
                className="link font-mono text-meta tracking-meta text-paper"
              >
                {copy.viewProject} →
              </TransitionLink>

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
            </Reveal>

          </div>
        </div>
      </div>
    </Stage>
  );
}
