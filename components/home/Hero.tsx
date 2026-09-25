import Image from "next/image";
import portrait from "@/content/media/razigue.png";
import { ScrollCue } from "@/components/home/ScrollCue";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The opening frame stays fully visible as the visitor scrolls past it.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { copy, hero, nav, site } = getContent(locale);

  return (
    <Stage
      immediate
      as="section"
      aria-labelledby="hero-title"
      delay={0.15}
      stagger={0.12}
      className="relative"
    >
      <div>
        {/* One grid for the whole screen rather than three stacked rows. The
            photograph is the only thing in the right-hand column and shares
            its row with the name, so it sits centred on the name. */}
        <div className="hero-grid mx-auto min-h-dvh max-w-page px-6 pb-10 pt-28 lg:px-10 lg:pb-14 lg:pt-36">
          <Reveal
            variant="chars"
            as="h1"
            order={2}
            id="hero-title"
            className="hero-name font-display text-display leading-display tracking-display text-paper"
          >
            {/* The space is load-bearing: the two lines are block spans, so it
                collapses visually, but without it the heading's accessible
                name reads "RazigueBenhmida". */}
            <span className="block">Razigue</span>{" "}
            <span className="block">Benhmida</span>
          </Reveal>

          {/* No forced aspect ratio: the photograph keeps its own 2:3, and the
              width is set so that at that ratio the whole hero still lands
              inside one screen. */}
          <Reveal
            variant="mask"
            order={1}
            className="hero-portrait portrait w-28 sm:w-36 lg:w-48"
          >
            <Image
              src={portrait}
              alt={copy.portraitAlt}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 12rem, (min-width: 640px) 9rem, 7rem"
              className="h-full w-full object-cover"
            />
            <span className="sheen" aria-hidden="true" />
          </Reveal>

          {/* Wide enough to set in two lines. At the lede measure this sentence
              broke into four, which reads as four separate thoughts. */}
          <div className="hero-lede max-w-measure">
            <Reveal
              variant="lines"
              as="p"
              order={3}
              className="text-lede text-paper-2"
            >
              {hero.tagline}
            </Reveal>

            <Reveal
              variant="rise"
              order={4}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <TransitionLink
                href={pathFor(locale, "contact")}
                curtainLabel={nav.contact}
                className="btn btn-solid"
              >
                <BtnLabel>{copy.heroContact}</BtnLabel>
              </TransitionLink>

              <a href={site.cvUrl} download className="btn">
                <BtnLabel>{copy.cvButton}</BtnLabel>
              </a>
            </Reveal>
          </div>

          <Reveal variant="fade" order={5} className="hero-cue">
            <ScrollCue label={copy.scrollCue} />
          </Reveal>
        </div>
      </div>
    </Stage>
  );
}
