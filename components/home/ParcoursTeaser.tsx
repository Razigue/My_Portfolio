import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { experiences, formation } from "@/content/about";
import { presentation, sections } from "@/content/site";

export function ParcoursTeaser() {
  return (
    <Stage
      as="section"
      aria-labelledby="parcours-title"
      className="band"
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

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal
              variant="lines"
              as="p"
              order={1}
              className="max-w-measure text-lede text-paper-2"
            >
              {presentation}
            </Reveal>

            <Reveal variant="rise" order={2} className="mt-10">
              <TransitionLink
                href="/a-propos"
                curtainLabel="À propos"
                className="link font-mono text-meta tracking-meta text-paper"
              >
                Parcours complet →
              </TransitionLink>
            </Reveal>
          </div>

          <div>
            <dl className="grid gap-12">
              <Reveal variant="rise" order={3}>
                <dt className="eyebrow">Formation</dt>
                <dd className="mt-4 text-body text-paper">
                  {formation.title}
                  <span className="mt-2 block text-meta text-paper-3">
                    {formation.school}
                  </span>
                  <span className="tnum block text-meta text-paper-3">
                    {formation.period}
                  </span>
                </dd>
              </Reveal>

              <Reveal variant="rise" order={4}>
                <dt className="eyebrow">Expériences</dt>
                <dd className="mt-4">
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
