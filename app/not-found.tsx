import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, Eyebrow } from "@/components/ui/primitives";
import { copy } from "@/content/site";

export const metadata = { title: copy.notFoundTitle };

export default function NotFound() {
  return (
    <Stage immediate delay={0.1} stagger={0.11}>
      <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-center px-6 py-32 lg:px-10">
        <Reveal variant="fade" as={Eyebrow} order={0}>
          Erreur 404
        </Reveal>

        <Reveal
          variant="chars"
          as="h1"
          order={1}
          className="mt-6 block font-display text-h1 leading-display tracking-display text-paper"
        >
          {copy.notFoundTitle}
        </Reveal>

        <Reveal
          variant="lines"
          as="p"
          order={2}
          className="mt-7 max-w-measure text-lede text-paper-2"
        >
          {copy.notFoundBody}
        </Reveal>

        <Reveal variant="rise" order={3} className="mt-12">
          <TransitionLink href="/" curtainLabel="Accueil" className="btn">
            <BtnLabel>{copy.notFoundLink}</BtnLabel>
          </TransitionLink>
        </Reveal>
      </div>
    </Stage>
  );
}
