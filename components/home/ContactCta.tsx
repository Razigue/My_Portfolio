import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, SectionLabel } from "@/components/ui/primitives";
import { copy, sections, site } from "@/content/site";

/**
 * The buttons here hold still. Their fill rises and their label swaps for a
 * copy of itself, but the target never moves out from under the pointer.
 */
export function ContactCta() {
  return (
    <Stage
      as="section"
      aria-labelledby="contact-title"
      stagger={0.1}
      className="band"
    >
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <Reveal
          variant="fade"
          as={SectionLabel}
          ordinal={sections.contact.ordinal}
          order={0}
        >
          {sections.contact.label}
        </Reveal>

        <Reveal
          variant="chars"
          as="h2"
          order={1}
          id="contact-title"
          className="mt-8 block font-display text-h1 leading-display tracking-display text-paper"
        >
          {copy.contactHeading}
        </Reveal>

        <Reveal
          variant="lines"
          as="p"
          order={2}
          className="mt-8 max-w-measure text-lede text-paper-2"
        >
          {copy.contactSub}
        </Reveal>

        <Reveal
          variant="rise"
          order={3}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <TransitionLink
            href="/contact"
            curtainLabel="Contact"
            className="btn btn-solid"
          >
            <BtnLabel>Écrire un message</BtnLabel>
          </TransitionLink>

          <a href={`mailto:${site.email}`} className="btn">
            <BtnLabel>{site.email}</BtnLabel>
          </a>
        </Reveal>
      </div>
    </Stage>
  );
}
