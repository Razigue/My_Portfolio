import { ProjectsPage, projectsMetadata } from "@/components/pages/ProjectsPage";

export const metadata = projectsMetadata("fr");

export default function Projets() {
  return <ProjectsPage locale="fr" />;
}
