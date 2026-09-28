import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/** The one contact block of the home page; the footer only lists the links. */
export function ContactCta({ locale }: { locale: Locale }) {
  const { copy, sections, site } = getContent(locale);

  return (
    <section aria-labelledby="contact-title" className="band">
      <div className="section-body page-width">
        <h2
          id="contact-title"
          className="section-title"
        >
          {sections.contact}
        </h2>

        <p className="mt-title max-w-measure text-lede text-paper-2">
          {copy.contactSub}
        </p>

        <div className="mt-block flex flex-wrap items-center gap-5">
          <Link href={pathFor(locale, "contact")} className="btn btn-solid">
            {copy.writeMessage}
          </Link>

          <a href={`mailto:${site.email}`} className="btn">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
