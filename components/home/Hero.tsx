import Image from "next/image";
import portrait from "@/content/media/razigue.png";
import { ScrollCue } from "@/components/home/ScrollCue";
import { Scrub } from "@/components/motion/Scrub";
import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, Eyebrow } from "@/components/ui/primitives";
import { copy, hero, site } from "@/content/site";

/**
 * The opening frame. Everything inside arrives on load, and the whole block
 * then pulls away as you leave it, so the first scroll of the page reads as a
 * camera move rather than as content sliding under a header.
 */
export function Hero() {
  return (
    <Stage
      immediate
      as="section"
      aria-labelledby="hero-title"
      delay={0.15}
      stagger={0.12}
      className="relative"
    >
      <Scrub
        from={{ y: 0, opacity: 1, scale: 1 }}
        to={{ y: -90, opacity: 0.12, scale: 0.97 }}
        start="top top"
        end="bottom top"
      >
        {/* One grid for the whole screen rather than three stacked rows. The
            photograph and the location line are the only two things in the
            right-hand column, which makes that column exactly as wide as the
            wider of them and lets both sit centred in it: their centres line
            up at any width, without a measurement anywhere. The photograph is
            on the same grid row as the name, so centring it in that row
            centres it on the name and not on the label above it. */}
        <div className="hero-grid mx-auto min-h-dvh max-w-page px-6 pb-10 pt-28 lg:px-10 lg:pb-14 lg:pt-36">
          <Reveal
            variant="fade"
            as={Eyebrow}
            order={0}
            className="hero-role"
          >
            {site.role}
          </Reveal>

          {/* The split sits on the heading, not on the two lines inside it:
              SplitText names what it splits with `aria-label`, which is valid
              on a heading and prohibited on a span. */}
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
              alt={`Portrait de ${site.name}`}
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
                href="/contact"
                curtainLabel="Contact"
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
            <ScrollCue label="Défiler" />
          </Reveal>

          <Reveal variant="fade" as="p" order={6} className="hero-place eyebrow">
            {site.location}
          </Reveal>
        </div>
      </Scrub>
    </Stage>
  );
}
