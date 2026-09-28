import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectRow } from "@/components/projects/ProjectRow";
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

export function ProjectsPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, projects } = content;
  const plural: Readonly<Record<ProjectKind, string>> = {
    personnel: copy.groupPersonal,
    ecole: copy.groupSchool,
  };

  // Grouped by kind, each group in the order of the published list.
  const groups = KINDS.map((kind) => ({
    kind,
    entries: projects.filter((project) => project.kind === kind),
  })).filter((group) => group.entries.length > 0);

  return (
    <>
      <PageHeader title={copy.projectsHeading} centered />

      {groups.map((group, order) => (
        <section
          key={group.kind}
          aria-labelledby={`groupe-${group.kind}`}
          className={order > 0 ? "pt-block" : undefined}
        >
          <div className="page-width">
            <h2 id={`groupe-${group.kind}`} className="eyebrow">
              {group.entries.length > 1
                ? plural[group.kind]
                : kindLabel(content, group.kind)}
            </h2>
          </div>

          <ol className="index page-width mt-label">
            {group.entries.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                locale={locale}
                copy={copy}
              />
            ))}
          </ol>
        </section>
      ))}
    </>
  );
}
