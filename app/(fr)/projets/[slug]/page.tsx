import type { Metadata } from "next";
import {
  ProjectPage,
  projectMetadata,
  projectParams,
} from "@/components/pages/ProjectPage";

type Params = { params: Promise<{ slug: string }> };

// Projects kept in reserve get no page.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectParams();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata("fr", slug);
}

export default async function Projet({ params }: Params) {
  const { slug } = await params;
  return <ProjectPage locale="fr" slug={slug} />;
}
