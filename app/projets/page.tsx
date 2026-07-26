import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stage } from "@/components/motion/Stage";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { projectNumber, projects, projectsSummary } from "@/content/projects";
import { copy } from "@/content/site";

const summary = projectsSummary();

export const metadata: Metadata = {
  title: copy.projectsHeading,
  description: `${summary} Applications web full-stack, CI/CD, WordPress et expérimentations IA.`,
  alternates: { canonical: "/projets" },
  openGraph: {
    title: copy.projectsHeading,
    description: summary,
    url: "/projets",
  },
};

export default function ProjetsPage() {
  return (
    <>
      <PageHeader eyebrow="Index" title={copy.projectsHeading} sub={summary} />

      <Stage stagger={0.045} start="top 90%">
        <ol className="index mx-auto max-w-page px-6 lg:px-10">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              ordinal={projectNumber(index)}
            />
          ))}
        </ol>
      </Stage>
    </>
  );
}
