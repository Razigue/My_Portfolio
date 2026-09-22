import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export function PageHeader({
  eyebrow,
  ordinal,
  title,
  sub,
  media,
  backdrop,
  children,
}: {
  eyebrow: string;
  /** Set in gold above the label, when the page has a position in a series. */
  ordinal?: string;
  title: string;
  sub?: string;
  /**
   * Set under the title, across the full width of the page. The header is a
   * page's opening frame, so what goes here has to be worth as much room as
   * the title itself — in practice, a capture of the thing the page is about.
   */
  media?: React.ReactNode;
  /** Laid behind the whole header, from edge to edge of the screen. */
  backdrop?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Stage
      immediate
      as="header"
      delay={0.12}
      stagger={0.11}
      className={backdrop ? "relative isolate overflow-hidden" : undefined}
    >
      {backdrop}
      <div className="mx-auto max-w-page px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-48">
        <div>
          <Reveal variant="fade" as={SectionLabel} ordinal={ordinal} order={0}>
            {eyebrow}
          </Reveal>

          <Reveal
            variant="chars"
            as="h1"
            order={1}
            className="mt-8 block font-display text-h1 leading-display tracking-display text-paper"
          >
            {title}
          </Reveal>

          {sub ? (
            <Reveal
              variant="lines"
              as="p"
              order={2}
              className="mt-7 max-w-measure text-lede text-paper-2"
            >
              {sub}
            </Reveal>
          ) : null}
        </div>

        {media ? (
          <Reveal variant="mask" order={3} className="mt-14 lg:mt-20">
            {media}
          </Reveal>
        ) : null}

        {children}
      </div>
    </Stage>
  );
}
