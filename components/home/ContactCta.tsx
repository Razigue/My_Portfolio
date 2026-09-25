import { Stage } from "@/components/motion/Stage";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel, SectionLabel } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The buttons here hold still. Their fill rises and their label swaps for a
 * copy of itself, but the target never moves out from under the pointer.
 */
export function ContactCta({ locale }: { locale: Locale }) {
  const { copy, nav, sections, site } = getContent(locale);

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
          variant="rise"
          order={3}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <TransitionLink
            href={pathFor(locale, "contact")}
            curtainLabel={nav.contact}
            className="btn btn-solid"
          >
            <BtnLabel>{copy.writeMessage}</BtnLabel>
          </TransitionLink>

          <a href={`mailto:${site.email}`} className="btn">
            <BtnLabel>{site.email}</BtnLabel>
          </a>
        </Reveal>
      </div>
    </Stage>
  );
}
