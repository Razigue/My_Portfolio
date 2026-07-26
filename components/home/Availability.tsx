import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { Ticker } from "@/components/ui/Ticker";
import { availability } from "@/content/site";

/**
 * The single most useful thing on the site for the person reading it, so it is
 * the second thing they meet and the only place the accent is allowed to move
 * on its own.
 */
export function Availability() {
  return (
    <Stage
      as="section"
      aria-labelledby="dispo-title"
      className="band"
      stagger={0.1}
      start="top 90%"
    >
      <Ticker items={availability.ticker} />

      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <Reveal variant="fade" order={0} className="flex items-center gap-3.5">
          <span className="mark-flare" aria-hidden="true" />
          <span className="eyebrow">Disponibilité</span>
        </Reveal>

        <Reveal
          variant="words"
          as="h2"
          order={1}
          id="dispo-title"
          className="mt-8 max-w-measure font-display text-h2 leading-tight tracking-display text-paper"
        >
          {availability.headline}
        </Reveal>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2">
          <Reveal variant="rise" order={2}>
            <dt className="eyebrow">{availability.windowLabel}</dt>
            <dd className="mt-3 text-lede text-paper">{availability.window}</dd>
          </Reveal>

          <Reveal variant="rise" order={3}>
            <dt className="eyebrow">{availability.rhythmLabel}</dt>
            <dd className="mt-3 text-lede text-paper">{availability.rhythm}</dd>
          </Reveal>
        </dl>
      </div>
    </Stage>
  );
}
