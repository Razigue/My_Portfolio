import Link from "next/link";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { ProjectSummary } from "@/components/home/ProjectSummary";
import { Icon } from "@/components/ui/Icon";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/** How many published projects the home page shows; the index has them all. */
const SHOWN = 3;

/**
 * The first published projects, in the order of `featuredSlugs`: the first
 * across the page with everything that proves it, the next two as cards side
 * by side, so the grid never ends on a lone card. The rest is one link away.
 */
export function Projects({ locale }: { locale: Locale }) {
  const { copy, projects, sections } = getContent(locale);
  const [lead, ...rest] = projects.slice(0, SHOWN);
  const hidden = projects.length > SHOWN;

  return (
    <section aria-labelledby="projets-title" className="band">
      <div className="section-body page-width">
        <div className="flex flex-wrap items-end justify-between gap-x-gutter gap-y-4">
          <div>
            <h2 id="projets-title" className="section-title">
              {sections.projets}
            </h2>
            <p className="section-lede">{copy.projectsDescription}</p>
          </div>

          <Link href={pathFor(locale, "projects")} className="link-arrow type-label">
            {copy.allProjects}
            <Icon name="arrowRight" />
          </Link>
        </div>

        {lead ? (
          <div className="mt-block">
            <FeaturedProject project={lead} locale={locale} />
          </div>
        ) : null}

        {rest.length > 0 ? (
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectSummary key={project.slug} project={project} locale={locale} />
            ))}
          </ol>
        ) : null}

        {hidden ? (
          <div className="mt-block flex justify-center">
            <Link href={pathFor(locale, "projects")} className="link-arrow type-label">
              {copy.moreProjects}
              <Icon name="arrowRight" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
