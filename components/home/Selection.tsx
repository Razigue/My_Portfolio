import { FeaturedPanel } from "@/components/home/FeaturedPanel";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, SectionLabel } from "@/components/ui/primitives";
import { featuredProjects } from "@/content/projects";
import { sections } from "@/content/site";
import { capitalise, cardinal } from "@/lib/french";

export function Selection() {
  const count = featuredProjects.length;

  return (
    <section
      aria-labelledby="selection-title"
    >
      <Stage stagger={0.1}>
        <div className="section-body mx-auto max-w-page px-6 lg:px-10">
          <Reveal
            variant="fade"
            as={SectionLabel}
            ordinal={sections.selection.ordinal}
            order={0}
          >
            {sections.selection.label}
          </Reveal>

          {/* Counted from the published list, so swapping a slug in
              `featuredSlugs` or adding a fourth rewrites the heading. */}
          <Reveal
            variant="words"
            as="h2"
            order={1}
            id="selection-title"
            className="mt-8 max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
          >
            {count === 1
              ? "Un projet récent"
              : `${capitalise(cardinal(count))} projets récents`}
          </Reveal>

          <Reveal
            variant="rise"
            as="p"
            order={2}
            className="mt-6 max-w-measure text-body text-paper-3"
          >
            Les plus récents et les plus substantiels.
          </Reveal>
        </div>
      </Stage>

      {featuredProjects.map((project, index) => (
        <FeaturedPanel
          key={project.slug}
          project={project}
          index={index}
          total={count}
        />
      ))}

      <Stage stagger={0.08}>
        <div className="section-body-tight mx-auto max-w-page px-6 lg:px-10">
          <Reveal variant="rise">
            <TransitionLink
              href="/projets"
              className="btn"
              curtainLabel="Projets"
            >
              <BtnLabel>Voir l’index des projets</BtnLabel>
              <span aria-hidden="true">→</span>
            </TransitionLink>
          </Reveal>
        </div>
      </Stage>
    </section>
  );
}
