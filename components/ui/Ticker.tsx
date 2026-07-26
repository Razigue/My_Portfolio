import { Scrub } from "@/components/motion/Scrub";

/**
 * The band above the availability block. Two identical tracks sit side by side
 * and the pair is slid half its own width as the section crosses the viewport,
 * so the text runs continuously without ever showing an edge.
 *
 * It is decorative reinforcement: every phrase in it is a fact set properly in
 * the section directly below, so the whole strip is hidden from assistive
 * technology rather than read out twice.
 */
export function Ticker({ items }: { items: readonly string[] }) {
  const track = items.map((item, index) => (
    <span key={`${item}-${index}`}>{item}</span>
  ));

  return (
    <div className="ticker" aria-hidden="true" data-print="hide">
      {/* The mask fades the text and nothing else: the strip has no ground of
          its own, sitting directly in the band of the section it belongs to. */}
      <div className="ticker-mask">
        {/* shrink-0 so the pair keeps its full intrinsic width; -50% is then
            exactly one track, which is what makes the wrap invisible. */}
        <Scrub
          className="flex shrink-0"
          triggerClosest="section"
          from={{ xPercent: 0 }}
          to={{ xPercent: -50 }}
        >
          <div className="ticker-track">{track}</div>
          <div className="ticker-track">{track}</div>
        </Scrub>
      </div>
    </div>
  );
}
