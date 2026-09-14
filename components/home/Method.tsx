import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { principes } from "@/content/about";
import { featuredProjects } from "@/content/projects";
import { sections } from "@/content/site";

/**
 * How he works, said once per principle and pinned to the published projects
 * that show it, so every claim here is one click from its evidence.
 * `checkMethod` refuses a principle citing a project that is not published.
 */
export function Method() {
  return (
    <Stage
      as="section"
      aria-labelledby="methode-title"
      stagger={0.08}
      start="top 88%"
    >
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <Reveal
          variant="fade"
          as={SectionLabel}
          ordinal={sections.methode.ordinal}
          order={0}
        >
          {sections.methode.label}
        </Reveal>

        <Reveal
          variant="words"
          as="h2"
          order={1}
          id="methode-title"
          className="mt-8 max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
        >
          Ce que je tiens dans le code
        </Reveal>

        <ol className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {principes.map((principe, index) => (
            <li
              key={principe.title}
              data-choreo="rise"
              className="grid content-start gap-4"
            >
              <span className="tnum font-mono text-micro tracking-meta text-flare">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-h3 leading-tight tracking-tight text-paper">
                {principe.title}
              </h3>

              <p className="max-w-measure text-body text-paper-2">
                {principe.body}
              </p>

              <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
                {featuredProjects
                  .filter((project) => principe.projects.includes(project.slug))
                  .map((project) => (
                    <li key={project.slug}>
                      <TransitionLink
                        href={`/projets/${project.slug}`}
                        curtainLabel={project.title}
                        className="link font-mono text-meta tracking-meta text-paper-3"
                      >
                        {project.title} →
                      </TransitionLink>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Stage>
  );
}
