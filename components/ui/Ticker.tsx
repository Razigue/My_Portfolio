/**
 * The static band above the availability block.
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
        <div className="flex shrink-0">
          <div className="ticker-track">{track}</div>
        </div>
      </div>
    </div>
  );
}
