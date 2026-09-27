import Link from "next/link";
import { ProjectSummary } from "@/components/home/ProjectSummary";
import { Stage } from "@/components/motion/Stage";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The published projects, in the order of `featuredSlugs`, side by side from
 * a laptop up so the three can be compared at a glance.
 */
export function Projects({ locale }: { locale: Locale }) {
  const { copy, projects, sections } = getContent(locale);

  return (
    <Stage
      as="section"
      aria-labelledby="projets-title"
      className="band"
      stagger={0.08}
    >
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-gutter gap-y-label">
          <h2
            id="projets-title"
            className="font-display text-h3 leading-tight tracking-tight text-paper"
          >
            {sections.projets}
          </h2>

          <Link
            href={pathFor(locale, "projects")}
            className="link font-mono text-meta tracking-meta text-paper-2"
          >
            {copy.selectionIndex} →
          </Link>
        </div>

        <ol className="mt-block grid gap-x-gutter gap-y-block lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectSummary
              key={project.slug}
              project={project}
              locale={locale}
            />
          ))}
        </ol>
      </div>
    </Stage>
  );
}
