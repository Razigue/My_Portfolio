import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export function PageHeader({
  eyebrow,
  ordinal,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  /** Set in gold above the label, when the page has a position in a series. */
  ordinal?: string;
  title: string;
  sub?: string;
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

        {children}
      </div>
    </Stage>
  );
}
