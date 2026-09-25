import Link from "next/link";
import { BtnLabel } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/** The one contact block of the home page; the footer only lists the links. */
export function ContactCta({ locale }: { locale: Locale }) {
  const { copy, sections, site } = getContent(locale);

  return (
    <section aria-labelledby="contact-title" className="band">
      <div className="section-body mx-auto max-w-page px-6 lg:px-10">
        <h2
          id="contact-title"
          className="font-display text-h3 leading-tight tracking-tight text-paper"
        >
          {sections.contact}
        </h2>

        <p className="mt-title max-w-measure text-lede text-paper-2">
          {copy.contactSub}
        </p>

        <div className="mt-block flex flex-wrap items-center gap-5">
          <Link href={pathFor(locale, "contact")} className="btn btn-solid">
            <BtnLabel>{copy.writeMessage}</BtnLabel>
          </Link>

          <a href={`mailto:${site.email}`} className="btn">
            <BtnLabel>{site.email}</BtnLabel>
          </a>
        </div>
      </div>
    </section>
  );
}
