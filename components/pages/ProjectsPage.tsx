import type { Metadata } from "next";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { ProjectSummary } from "@/components/home/ProjectSummary";
import { PageHeader } from "@/components/layout/PageHeader";
import type { ProjectKind } from "@/content/projects";
import { getContent, kindLabel, projectsSummary } from "@/lib/content";
import { alternates, pathFor, type Locale } from "@/lib/i18n";

/** The order the groups are shown in. */
const KINDS: readonly ProjectKind[] = ["personnel", "ecole"];

export function projectsMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  const { copy } = content;
  const summary = projectsSummary(content);

  return {
    title: copy.projectsHeading,
    description: `${summary} ${copy.projectsDescription}`,
    alternates: alternates(locale, "projects"),
    openGraph: {
      title: copy.projectsHeading,
      description: summary,
      url: pathFor(locale, "projects"),
    },
  };
}

/** Every published project, grouped by kind, as the same cards as the home page. */
export function ProjectsPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, projects } = content;
  const summary = projectsSummary(content);
  const plural: Readonly<Record<ProjectKind, string>> = {
    personnel: copy.groupPersonal,
    ecole: copy.groupSchool,
  };

  const groups = KINDS.map((kind) => ({
    kind,
    entries: projects.filter((project) => project.kind === kind),
  })).filter((group) => group.entries.length > 0);

  return (
    <>
      <PageHeader
        title={copy.projectsHeading}
        sub={`${summary} ${copy.projectsDescription}`}
      />

      <div className="band">
        <div className="section-body page-width grid gap-section">
          {groups.map((group) => (
            <section key={group.kind} aria-labelledby={`groupe-${group.kind}`}>
              <h2 id={`groupe-${group.kind}`} className="part-title">
                {group.entries.length > 1
                  ? plural[group.kind]
                  : kindLabel(content, group.kind)}
              </h2>

              {/* A group of one takes the page's width, as on the home page. */}
              {group.entries.length === 1 && group.entries[0] ? (
                <div className="mt-6">
                  <FeaturedProject project={group.entries[0]} locale={locale} />
                </div>
              ) : (
                <ol className="mt-6 grid gap-6 md:grid-cols-2">
                  {group.entries.map((project) => (
                    <ProjectSummary key={project.slug} project={project} locale={locale} />
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
