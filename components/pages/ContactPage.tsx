import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow, ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { alternates, pathFor, type Locale } from "@/lib/i18n";

export function contactMetadata(locale: Locale): Metadata {
  const { availability, copy } = getContent(locale);
  // What the page is for, read from the search itself rather than typed.
  const description = `${availability.headline}, ${availability.window}.`;
  return {
    title: copy.contactHeading,
    description,
    alternates: alternates(locale, "contact"),
    openGraph: {
      title: copy.contactHeading,
      description,
      url: pathFor(locale, "contact"),
    },
  };
}

export function ContactPage({ locale }: { locale: Locale }) {
  const { availability, copy, form, site } = getContent(locale);

  return (
    <>
      <PageHeader
        title={copy.contactHeading}
        sub={copy.contactSub}
      />

      <section className="band">
        <div className="section-body page-width grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <ContactForm locale={locale} form={form} retry={copy.errorRetry} />
          </div>

          {/* The same rail as a project page: each fact a hairline apart. */}
          <div className="ruled ruled-tight grid content-start gap-title">
            <div>
              <Eyebrow>{copy.emailLabel}</Eyebrow>
              <div className="mt-label flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${site.email}`}
                  className="link fact-value text-body"
                >
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

            <div>
              <Eyebrow>{copy.elsewhereLabel}</Eyebrow>
              <ul className="mt-label grid gap-3">
                <li>
                  <ExternalLink
                    href={site.github}
                    newTab={copy.newTab}
                    className="link type-label text-paper-2"
                  >
                    GitHub ↗
                  </ExternalLink>
                </li>
                {site.linkedin ? (
                  <li>
                    <ExternalLink
                      href={site.linkedin}
                      newTab={copy.newTab}
                      className="link type-label text-paper-2"
                    >
                      LinkedIn ↗
                    </ExternalLink>
                  </li>
                ) : null}
                <li>
                  <a
                    href={site.cvUrl}
                    download
                    className="link type-label text-paper-2"
                  >
                    {copy.cvButton} ↓
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Eyebrow>{copy.availabilityTitle}</Eyebrow>
              <p className="mt-label flex items-baseline gap-3 text-body text-paper">
                <span className="mark-flare dot-baseline" aria-hidden="true" />
                <span>
                  {availability.headline}, {availability.window}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
