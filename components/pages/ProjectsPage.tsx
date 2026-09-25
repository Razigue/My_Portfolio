import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stage } from "@/components/motion/Stage";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { Reveal } from "@/components/ui/Reveal";
import { projectNumber, type ProjectKind } from "@/content/projects";
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

  // Grouped by kind. The ordinal stays the project's position in the
  // published list, so it matches the home page.
  const groups = KINDS.map((kind) => ({
    kind,
    entries: projects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => project.kind === kind),
  })).filter((group) => group.entries.length > 0);

  return (
    <>
      <PageHeader
        eyebrow={copy.projectsEyebrow}
        title={copy.projectsHeading}
      />

      {groups.map((group, order) => (
        <Stage
          key={group.kind}
          as="section"
          aria-labelledby={`groupe-${group.kind}`}
          stagger={0.045}
          start="top 90%"
          className={order > 0 ? "pt-20" : undefined}
        >
          <div className="mx-auto max-w-page px-6 lg:px-10">
            <Reveal
              variant="fade"
              as="h2"
              id={`groupe-${group.kind}`}
              className="eyebrow"
            >
              {group.entries.length > 1
                ? plural[group.kind]
                : kindLabel(content, group.kind)}
            </Reveal>
          </div>

          <ol className="index mx-auto mt-4 max-w-page px-6 lg:px-10">
            {group.entries.map(({ project, index }) => (
              <ProjectRow
                key={project.slug}
                project={project}
                ordinal={projectNumber(index)}
                locale={locale}
                copy={copy}
              />
            ))}
          </ol>
        </Stage>
      ))}
    </>
  );
}
