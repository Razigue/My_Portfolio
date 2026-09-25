import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { getContent } from "@/lib/content";
import { searchCriteria } from "@/lib/criteria";
import type { Locale } from "@/lib/i18n";

/**
 * The single most useful thing on the site for the person reading it, so it is
 * the second thing they meet.
 */
export function Availability({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { availability, copy } = content;

  return (
    <Stage
      as="section"
      aria-labelledby="dispo-title"
      className="band"
      stagger={0.1}
      start="top 90%"
    >
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <Reveal variant="fade" order={0} className="flex items-center gap-3.5">
          <span className="mark-flare" aria-hidden="true" />
          <span className="eyebrow">{copy.availabilityTitle}</span>
        </Reveal>

        <Reveal
          variant="words"
          as="h2"
          order={1}
          id="dispo-title"
          className="mt-title max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
        >
          {availability.headline}
        </Reveal>

        <dl className="mt-block grid gap-x-gutter gap-y-block sm:grid-cols-2 lg:grid-cols-3">
          {searchCriteria(content).map((criterion, index) => (
            <Reveal key={criterion.label} variant="rise" order={2 + index}>
              <dt className="eyebrow">{criterion.label}</dt>
              <dd className="mt-label text-lede text-paper">{criterion.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Stage>
  );
}
