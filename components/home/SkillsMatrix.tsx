import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { projects } from "@/content/projects";
import { sections } from "@/content/site";
import { projectCountLabel, skillMatrix } from "@/lib/skills";

/**
 * Every number here is counted from `content/projects.ts` at build time; see
 * `lib/skills.ts`.
 *
 * The two figures at the top are `data-choreo="counter"`, which counts the
 * numeral up to whatever the server already printed. With scripting off the
 * real figure is simply there.
 */
export function SkillsMatrix() {
  const skills = skillMatrix();

  return (
    <Stage
      as="section"
      aria-labelledby="competences-title"
      stagger={0.04}
      start="top 88%"
    >
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <Reveal
          variant="fade"
          as={SectionLabel}
          ordinal={sections.competences.ordinal}
          order={0}
        >
          {sections.competences.label}
        </Reveal>

        <Reveal
          variant="words"
          as="h2"
          order={1}
          id="competences-title"
          className="mt-8 max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
        >
          Ce que ces projets utilisent
        </Reveal>

        <div className="mt-12 flex flex-wrap items-end gap-x-14 gap-y-6">
          <p className="flex items-end gap-4">
            <span
              data-choreo="counter"
              data-choreo-order="2"
              className="tnum font-display text-h2 leading-none text-flare"
            >
              {skills.length}
            </span>
            <span
              data-choreo="fade"
              data-choreo-order="3"
              className="eyebrow pb-1"
            >
              technologies distinctes
            </span>
          </p>

          <p className="flex items-end gap-4">
            <span
              data-choreo="counter"
              data-choreo-order="4"
              className="tnum font-display text-h2 leading-none text-flare"
            >
              {projects.length}
            </span>
            <span
              data-choreo="fade"
              data-choreo-order="5"
              className="eyebrow pb-1"
            >
              projets recensés
            </span>
          </p>
        </div>

        <ul className="mt-16 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <li key={skill.name} data-choreo="rise" className="skill-row">
              <div className="flex items-baseline justify-between gap-4">
                <span className="skill-name text-body text-paper">
                  {skill.name}
                </span>
                <span className="tnum font-mono text-micro tracking-meta text-paper-3">
                  {projectCountLabel(skill.count)}
                </span>
              </div>

              {/* One block per project, not a bar of proportional length: the
                  counts are small enough to be read rather than estimated. The
                  figure beside it says the same thing for anyone not seeing. */}
              <span className="units mt-3" aria-hidden="true">
                {Array.from({ length: skill.count }, (_, unit) => (
                  <span key={unit} className="unit" />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}
