import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink, SectionLabel } from "@/components/ui/primitives";

export function PageHeader({
  eyebrow,
  ordinal,
  title,
  titleLink,
  sub,
  media,
  backdrop,
  children,
}: {
  eyebrow: string;
  /** Set in gold above the label, when the page has a position in a series. */
  ordinal?: string;
  title: string;
  titleLink?: { href: string; newTab: string };
  sub?: string;
  /**
   * Set beside the title on wide screens, under it otherwise. The header is a
   * page's opening frame, so what goes here has to be worth as much room as
   * the title itself — in practice, a capture of the thing the page is about.
   *
   * Its track takes up to 40rem and gives way before the title does: the title
   * track floors at `min-content`, because a display-size h1 is usually one
   * word and a single word cannot wrap out of a column too narrow for it.
   */
  media?: React.ReactNode;
  /** Laid behind the whole header, from one edge of the screen to the other. */
  backdrop?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const heading = (
    <Reveal
      variant="chars"
      as="h1"
      order={1}
      className="mt-8 block font-display text-h1 leading-display tracking-display text-paper"
    >
      {title}
    </Reveal>
  );

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
        {/* Two tracks only when there is something to put in the second one,
            so every other page keeps the markup it had. */}
        <div
          className={
            media
              ? "grid gap-12 lg:grid-cols-[minmax(min-content,1fr)_minmax(0,40rem)] lg:items-end lg:gap-16"
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

            {/* Keep the link outside the split heading so SplitText cannot
                hide the interactive element from the accessibility tree. */}
            {titleLink ? (
              <ExternalLink
                href={titleLink.href}
                newTab={titleLink.newTab}
                className="block w-fit"
              >
                {heading}
              </ExternalLink>
            ) : heading}

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
