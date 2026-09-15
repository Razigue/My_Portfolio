import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { skillDomains, technologyCount } from "@/lib/skills";

/**
 * The domains come from `content/about.ts`; every figure and every project
 * name beside a technology is derived from `content/projects.ts`. See
 * `lib/skills.ts`.
 *
 * The two figures at the top are `data-choreo="counter"`, which counts the
 * numeral up to whatever the server already printed. With scripting off the
 * real figure is simply there.
 */
export function SkillsMatrix({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, projects, sections } = content;
  const domains = skillDomains(content);

  return (
    <Stage
      as="section"
      aria-labelledby="competences-title"
      className="band"
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
          {copy.skillsTitle}
        </Reveal>

        <div className="mt-12 flex flex-wrap items-end gap-x-14 gap-y-6">
          <p className="flex items-end gap-4">
            <span
              data-choreo="counter"
              data-choreo-order="2"
              className="tnum font-display text-h2 leading-none text-flare"
            >
              {technologyCount(content)}
            </span>
            <span
              data-choreo="fade"
              data-choreo-order="3"
              className="eyebrow pb-1"
            >
              {copy.skillsTechnologies}
            </span>
          </p>

          <p className="flex items-end gap-4">
            <span
              data-choreo="counter"
              data-choreo-order="4"
              className="tnum font-display text-h2 leading-none text-flare"
            >
              {domains.length}
            </span>
            <span
              data-choreo="fade"
              data-choreo-order="5"
              className="eyebrow pb-1"
            >
              {copy.skillsDomains}
            </span>
          </p>

          <p className="flex items-end gap-4">
            <span
              data-choreo="counter"
              data-choreo-order="6"
              className="tnum font-display text-h2 leading-none text-flare"
            >
              {projects.length}
            </span>
            <span
              data-choreo="fade"
              data-choreo-order="7"
              className="eyebrow pb-1"
            >
              {projects.length > 1
                ? copy.skillsProjectMany
                : copy.skillsProjectOne}
            </span>
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain) => (
            <div key={domain.domain}>
              <h3 data-choreo="fade" className="eyebrow">
                {domain.domain}
              </h3>

              <ul className="mt-6 grid gap-y-5">
                {domain.skills.map((skill) => (
                  <li key={skill.name} data-choreo="rise" className="skill-row">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="skill-name text-body text-paper">
                        {skill.name}
                      </span>
                      {skill.projects.length > 0 ? (
                        <span className="font-mono text-micro tracking-meta text-paper-3">
                          {skill.projects.map((p) => p.title).join(", ")}
                        </span>
                      ) : null}
                    </div>

                    {/* One block per published project using it. The names
                        beside it say the same thing for anyone not seeing. */}
                    {skill.projects.length > 0 ? (
                      <span className="units mt-3" aria-hidden="true">
                        {skill.projects.map((p) => (
                          <span key={p.slug} className="unit" />
                        ))}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
