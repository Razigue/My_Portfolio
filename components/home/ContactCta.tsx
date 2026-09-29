import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The closing call, on the night ground in both themes: the one block of the
 * page that turns the whole of it into a next step. Used at the end of the
 * home page and of every project page.
 */
export function ContactCta({
  locale,
  headingId = "contact-title",
}: {
  locale: Locale;
  headingId?: string;
}) {
  const { copy, site } = getContent(locale);

  return (
    <section aria-labelledby={headingId}>
      <div className="section-body page-width">
        <div className="on-night relative overflow-hidden rounded-[1.5rem] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <h2 id={headingId} className="max-w-[18ch] text-h2 leading-tight tracking-display">
            {copy.closingTitle}
          </h2>

          <p className="mt-5 max-w-measure text-lede text-paper-2">
            {copy.contactSub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={pathFor(locale, "contact")} className="btn btn-solid">
              {copy.writeMessage}
              <Icon name="arrowRight" />
            </Link>

            <a href={site.cvUrl} download className="btn">
              <Icon name="download" />
              {copy.cvButton}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-8">
            <a href={`mailto:${site.email}`} className="link-arrow text-body font-normal">
              <Icon name="mail" />
              {site.email}
            </a>
            <CopyButton
              value={site.email}
              idle={copy.copyIdle}
              done={copy.copyDone}
              action={copy.copyAction}
              confirm={copy.copyConfirm}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
