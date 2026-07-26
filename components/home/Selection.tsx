import { FeaturedPanel } from "@/components/home/FeaturedPanel";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, SectionLabel } from "@/components/ui/primitives";
import { featuredProjects, projects } from "@/content/projects";
import { sections } from "@/content/site";
import { capitalise, cardinal } from "@/lib/french";

export function Selection() {
  // Tout ce qui se compte ici se compte à partir des données : mettre un
  // quatrième projet en avant, ou en ajouter un à l'index, réécrit la phrase.
  const rest = projects.length - featuredProjects.length;
  const others =
    rest === 0
      ? null
      : rest === 1
        ? "Le dernier est dans l’index."
        : `Les ${cardinal(rest)} autres sont dans l’index.`;

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

          <Reveal
            variant="words"
            as="h2"
            order={1}
            id="selection-title"
            className="mt-8 max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
          >
            {`${capitalise(cardinal(featuredProjects.length))} projets récents`}
          </Reveal>

          <Reveal
            variant="rise"
            as="p"
            order={2}
            className="mt-6 max-w-measure text-body text-paper-3"
          >
            Les plus récents et les plus substantiels. {others}
          </Reveal>
        </div>
      </Stage>

      {featuredProjects.map((project, index) => (
        <FeaturedPanel
          key={project.slug}
          project={project}
          index={index}
          total={featuredProjects.length}
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
              <BtnLabel>
                {projects.length === 1
                  ? "Voir le projet"
                  : `Voir les ${projects.length} projets`}
              </BtnLabel>
              <span aria-hidden="true">→</span>
            </TransitionLink>
          </Reveal>
        </div>
      </Stage>
    </section>
  );
}
