import { TransitionLink } from "@/components/motion/TransitionLink";
import { ExternalLink, StatusDot } from "@/components/ui/primitives";
import type { Project } from "@/content/projects";
import type { Copy } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

/**
 * One row of the index.
 *
 * The row is a subgrid of the index's tracks rather than a grid of its own, so
 * the year and the links sit in the same place on every line whatever a given
 * project happens to carry. The title stretches a hit area over the whole row
 * while the external links sit above it: one row, one primary destination, and
 * no nested interactive elements.
 */
export function ProjectRow({
  project,
  ordinal,
  locale,
  copy,
}: {
  project: Project;
  ordinal: string;
  locale: Locale;
  copy: Copy;
}) {
  return (
    <li data-choreo="rise" className="index-row">
      <span className="index-ordinal tnum font-mono text-micro tracking-meta text-paper-3">
        {ordinal}
      </span>

      <div>
        <h3 className="index-title font-display text-h3 leading-tight tracking-tight text-paper">
          <TransitionLink
            href={pathFor(locale, "projects", project.slug)}
            curtainLabel={project.title}
            className="stretch-link"
          >
            {project.title}
          </TransitionLink>
          <span className="index-arrow ml-3 align-middle text-body" aria-hidden="true">
            →
          </span>
        </h3>
        {project.subtitle ? (
          <p className="index-sub mt-1 font-display text-body italic text-paper-3">
            {project.subtitle}
          </p>
        ) : null}
        {/* The group heading already names the kind; only the team is new. */}
        {project.team ? (
          <p className="mt-2 font-mono text-micro tracking-meta text-paper-3">
            {project.team}
          </p>
        ) : null}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-micro tracking-meta text-paper-2">
        {project.stack.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <span className="tnum font-mono text-micro tracking-meta text-paper-3">
        {project.year}
      </span>

      <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <StatusDot status={project.status} labels={copy} />

        {project.repo ? (
          <ExternalLink
            href={project.repo}
            label={fill(copy.repoLabel, { title: project.title })}
            newTab={copy.newTab}
            className="link font-mono text-micro tracking-meta text-paper-3"
          >
            {copy.repoShort} ↗
          </ExternalLink>
        ) : null}

        {project.demo ? (
          <ExternalLink
            href={project.demo}
            label={fill(copy.demoLabel, { title: project.title })}
            newTab={copy.newTab}
            className="link font-mono text-micro tracking-meta text-live"
          >
            {copy.demoShort} ↗
          </ExternalLink>
        ) : null}
      </div>
    </li>
  );
}
