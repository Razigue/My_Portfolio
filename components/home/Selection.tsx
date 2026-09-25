import { FeaturedPanel } from "@/components/home/FeaturedPanel";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, SectionLabel } from "@/components/ui/primitives";
import { countWord, getContent } from "@/lib/content";
import { fill, pathFor, type Locale } from "@/lib/i18n";

export function Selection({ locale }: { locale: Locale }) {
  const { copy, nav, projects, sections } = getContent(locale);
  const count = projects.length;

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
            className="mt-title max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
          >
            {count === 1
              ? copy.selectionOne
              : fill(copy.selectionMany, { count: countWord(locale, count) })}
          </Reveal>

          <Reveal
            variant="rise"
            as="p"
            order={2}
            className="mt-title max-w-measure text-body text-paper-3"
          >
            {copy.selectionSub}
          </Reveal>
        </div>
      </Stage>

      {projects.map((project, index) => (
        <FeaturedPanel
          key={project.slug}
          project={project}
          index={index}
          total={count}
          locale={locale}
        />
      ))}

      <Stage stagger={0.08}>
        <div className="mx-auto max-w-page px-6 pt-section lg:px-10">
          <Reveal variant="rise">
            <TransitionLink
              href={pathFor(locale, "projects")}
              className="btn"
              curtainLabel={nav.projects}
            >
              <BtnLabel>{copy.selectionIndex}</BtnLabel>
              <span aria-hidden="true">→</span>
            </TransitionLink>
          </Reveal>
        </div>
      </Stage>
    </section>
  );
}
