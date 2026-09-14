import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stage } from "@/components/motion/Stage";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { Reveal } from "@/components/ui/Reveal";
import {
  featuredProjects,
  kindLabels,
  projectNumber,
  projectsSummary,
  type ProjectKind,
} from "@/content/projects";
import { copy } from "@/content/site";

const summary = projectsSummary();

export const metadata: Metadata = {
  title: copy.projectsHeading,
  description: `${summary} Applications web full-stack, en solo et en équipe.`,
  alternates: { canonical: "/projets" },
  openGraph: {
    title: copy.projectsHeading,
    description: summary,
    url: "/projets",
  },
};

const groupLabels: Readonly<Record<ProjectKind, string>> = {
  personnel: "Projets personnels",
  ecole: "Projets d’école",
};

export default function ProjetsPage() {
  // Grouped by kind, in the order of `kindLabels`. The ordinal stays the
  // project's position in the published list, so it matches the home page.
  const groups = (Object.keys(kindLabels) as ProjectKind[])
    .map((kind) => ({
      kind,
      entries: featuredProjects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => project.kind === kind),
    }))
    .filter((group) => group.entries.length > 0);

  return (
    <>
      <PageHeader eyebrow="Index" title={copy.projectsHeading} sub={summary} />

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
                ? groupLabels[group.kind]
                : kindLabels[group.kind]}
            </Reveal>
          </div>

          <ol className="index mx-auto mt-4 max-w-page px-6 lg:px-10">
            {group.entries.map(({ project, index }) => (
              <ProjectRow
                key={project.slug}
                project={project}
                ordinal={projectNumber(index)}
              />
            ))}
          </ol>
        </Stage>
      ))}
    </>
  );
}
