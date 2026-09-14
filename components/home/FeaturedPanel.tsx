import { Scrub } from "@/components/motion/Scrub";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ProjectShotDisclosure } from "@/components/projects/ProjectShot";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink, StatusDot, TagList } from "@/components/ui/primitives";
import { projectContext, type Project } from "@/content/projects";

/**
 * One featured project, taking the full viewport: meta pinned to the top, the
 * title holding the middle, everything else weighted to the bottom edge. The
 * ordinal drifts behind it at its own rate.
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
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ordinal = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  const titleId = `projet-${project.slug}`;
  const align = flip ? "lg:text-right" : "";
  const context = projectContext(project);

  return (
    <Stage
      as="article"
      aria-labelledby={titleId}
      start="top 80%"
      stagger={0.09}
      className={`relative isolate overflow-hidden ${flip ? "" : "band"}`}
    >
      <div
        aria-hidden="true"
        className={`ghost-slot ${flip ? "ghost-slot-left" : "ghost-slot-right"}`}
      >
        <Scrub
          from={{ yPercent: 14, rotate: flip ? 2 : -2 }}
          to={{ yPercent: -14, rotate: flip ? -2 : 2 }}
        >
          <span className="ghost-number block">{ordinal}</span>
        </Scrub>
      </div>

      <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-between gap-14 px-6 py-24 lg:px-10 lg:py-28">
        <Reveal
          variant="fade"
          order={0}
          className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-micro tracking-meta text-paper-3"
        >
          <span className="tnum text-flare">{ordinal}</span>
          <span className="tnum">sur {String(total).padStart(2, "0")}</span>
          {context ? <span>{context}</span> : null}
          <span className="ml-auto flex items-center gap-6">
            <span className="tnum">{project.year}</span>
            <StatusDot status={project.status} />
          </span>
        </Reveal>

        <div className={align}>
          <Reveal
            variant="chars"
            as="h3"
            order={1}
            id={titleId}
            className="block font-display text-h1 leading-display tracking-display text-paper"
          >
            {project.title}
          </Reveal>

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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
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
              <TagList items={project.stack} />
            </Reveal>

            <Reveal
              variant="rise"
              order={5}
              className={`mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 ${
                flip ? "" : "lg:justify-end"
              }`}
            >
              <TransitionLink
                href={`/projets/${project.slug}`}
                curtainLabel={project.title}
                className="link font-mono text-meta tracking-meta text-paper"
              >
                Voir le projet →
              </TransitionLink>

              {project.repo ? (
                <ExternalLink
                  href={project.repo}
                  label={`Dépôt GitHub de ${project.title}`}
                  className="link font-mono text-meta tracking-meta text-paper-3"
                >
                  Dépôt ↗
                </ExternalLink>
              ) : null}

              {project.demo ? (
                <ExternalLink
                  href={project.demo}
                  label={`Démo en ligne de ${project.title}`}
                  className="link font-mono text-meta tracking-meta text-paper-3"
                >
                  Démo ↗
                </ExternalLink>
              ) : null}
            </Reveal>

            {/* Folded away by default. A panel is one screenful and its subject
                is the title; a picture pinned open here would outweigh it. */}
            {project.image ? (
              <Reveal
                variant="rise"
                order={6}
                className={`mt-8 ${flip ? "" : "lg:flex lg:flex-col lg:items-end"}`}
              >
                <ProjectShotDisclosure
                  image={project.image}
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="max-w-[22rem]"
                />
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </Stage>
  );
}
