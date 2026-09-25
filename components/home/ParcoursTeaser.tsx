import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

export function ParcoursTeaser({ locale }: { locale: Locale }) {
  const { copy, experiences, nav, presentation, sections } =
    getContent(locale);

  return (
    <Stage
      as="section"
      aria-labelledby="parcours-title"
      stagger={0.09}
    >
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <Reveal
          variant="fade"
          as={SectionLabel}
          ordinal={sections.parcours.ordinal}
          order={0}
          id="parcours-title"
        >
          {sections.parcours.label}
        </Reveal>

        <div className="mt-title grid gap-x-gutter gap-y-block lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal
              variant="lines"
              as="p"
              order={1}
              className="max-w-measure text-lede text-paper-2"
            >
              {presentation}
            </Reveal>

            <Reveal variant="rise" order={2} className="mt-title">
              <TransitionLink
                href={pathFor(locale, "about")}
                curtainLabel={nav.about}
                className="link font-mono text-meta tracking-meta text-paper"
              >
                {copy.parcoursLink} →
              </TransitionLink>
            </Reveal>
          </div>

          <div>
            <dl className="grid gap-block">
              <Reveal variant="rise" order={3}>
                <dt className="eyebrow">{copy.experiencesTitle}</dt>
                <dd className="mt-label">
                  {/* Rows were told apart by a filet under each one. Every
                      other row is lifted instead, which separates them the way
                      a table without rules does. The list is then pulled left
                      by its own padding, so the roles line up with the label
                      above them and the lifted band keeps its air on both
                      sides. */}
                  <ul className="zebra -mx-4 grid">
                    {experiences.map((experience) => (
                      <li
                        key={experience.role}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 text-meta"
                      >
                        <span className="text-paper">{experience.role}</span>
                        <span className="tnum text-paper-3">
                          {experience.period}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </Reveal>
            </dl>
          </div>
        </div>
      </div>
    </Stage>
  );
}
