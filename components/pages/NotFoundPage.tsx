import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, Eyebrow } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/** A 404 inside one language's layout, for a `notFound()` raised by a page. */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { copy, nav } = getContent(locale);

  return (
    <Stage immediate delay={0.1} stagger={0.11}>
      <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-center px-6 page-head lg:px-10">
        <Reveal variant="fade" as={Eyebrow} order={0}>
          {copy.notFoundEyebrow}
        </Reveal>

        <Reveal
          variant="chars"
          as="h1"
          order={1}
          className="mt-block block font-display text-h1 leading-display tracking-display text-paper"
        >
          {copy.notFoundTitle}
        </Reveal>

        <Reveal
          variant="lines"
          as="p"
          order={2}
          className="mt-title max-w-measure text-lede text-paper-2"
        >
          {copy.notFoundBody}
        </Reveal>

        <Reveal variant="rise" order={3} className="mt-block">
          <TransitionLink
            href={pathFor(locale, "home")}
            curtainLabel={nav.home}
            className="btn"
          >
            <BtnLabel>{copy.notFoundLink}</BtnLabel>
          </TransitionLink>
        </Reveal>
      </div>
    </Stage>
  );
}
