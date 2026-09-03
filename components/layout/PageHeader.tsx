import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export function PageHeader({
  eyebrow,
  ordinal,
  title,
  sub,
  media,
  children,
}: {
  eyebrow: string;
  /** Set in gold above the label, when the page has a position in a series. */
  ordinal?: string;
  title: string;
  sub?: string;
  /**
   * Set beside the title on wide screens, under it otherwise. The header is a
   * page's opening frame, so what goes here has to be worth as much room as
   * the title itself — in practice, a capture of the thing the page is about.
   */
  media?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Stage
      immediate
      as="header"
      delay={0.12}
      stagger={0.11}
    >
      <div className="mx-auto max-w-page px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-48">
        {/* Two tracks only when there is something to put in the second one,
            so every other page keeps the markup it had. */}
        <div
          className={
            media
              ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end lg:gap-16"
              : undefined
          }
        >
          <div>
            <Reveal
              variant="fade"
              as={SectionLabel}
              ordinal={ordinal}
              order={0}
            >
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
            <Reveal variant="mask" order={3}>
              {media}
            </Reveal>
          ) : null}
        </div>

        {children}
      </div>
    </Stage>
  );
}
