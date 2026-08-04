import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import {
  Eyebrow,
  ExternalLink,
  StatusDot,
  TagList,
} from "@/components/ui/primitives";
import { getProject, projectNumber, projects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = project.subtitle
    ? `${project.title}, ${project.subtitle}`
    : project.title;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      url: `/projets/${project.slug}`,
    },
  };
}

export default async function ProjetPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <>
      <PageHeader
        ordinal={projectNumber(index)}
        eyebrow={String(project.year)}
        title={project.title}
        sub={project.subtitle ?? undefined}
      />

      <Stage className="band" stagger={0.09}>
        <div className="section-body-tight mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-24 lg:px-10">
          <div>
            <Reveal
              variant="lines"
              as="p"
              order={0}
              className="max-w-measure text-lede text-paper-2"
            >
              {project.description}
            </Reveal>

            {project.highlights.length > 0 ? (
              <>
                <ul className="mt-14 grid gap-5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      data-choreo="rise"
                      className="flex items-baseline gap-4 text-body text-paper-2"
                    >
                      <span
                        className="mark-flare dot-baseline"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="grid content-start gap-10">
            <Reveal variant="rise">
              <Eyebrow>Stack</Eyebrow>
              <TagList items={project.stack} className="mt-4" />
            </Reveal>

            <Reveal variant="rise">
              <Eyebrow>État</Eyebrow>
              <div className="mt-4">
                <StatusDot status={project.status} />
              </div>
            </Reveal>

            {project.repo || project.demo ? (
              <Reveal variant="rise">
                <Eyebrow>Liens</Eyebrow>
                <ul className="mt-4 grid gap-3">
                  {project.repo ? (
                    <li>
                      <ExternalLink
                        href={project.repo}
                        label={`Dépôt GitHub de ${project.title}`}
                        className="link font-mono text-meta tracking-meta text-paper"
                      >
                        Dépôt GitHub ↗
                      </ExternalLink>
                    </li>
                  ) : null}
                  {project.demo ? (
                    <li>
                      <ExternalLink
                        href={project.demo}
                        label={`Démo en ligne de ${project.title}`}
                        className="link font-mono text-meta tracking-meta text-flare"
                      >
                        Démo en ligne ↗
                      </ExternalLink>
                    </li>
                  ) : null}
                </ul>
              </Reveal>
            ) : null}
          </aside>
        </div>
      </Stage>

      <Stage stagger={0.1}>
        <nav
          aria-label="Projet précédent et suivant"
          className="section-body-tight mx-auto grid max-w-page gap-6 px-6 sm:grid-cols-2 lg:px-10"
        >
          <Reveal variant="rise">
            {previous ? (
              <TransitionLink
                href={`/projets/${previous.slug}`}
                curtainLabel={previous.title}
                className="link font-mono text-meta tracking-meta text-paper-2"
              >
                ← {previous.title}
              </TransitionLink>
            ) : null}
          </Reveal>

          <Reveal variant="rise" className="sm:text-right">
            {next ? (
              <TransitionLink
                href={`/projets/${next.slug}`}
                curtainLabel={next.title}
                className="link font-mono text-meta tracking-meta text-paper-2"
              >
                {next.title} →
              </TransitionLink>
            ) : null}
          </Reveal>
        </nav>
      </Stage>
    </>
  );
}
