import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink } from "@/components/ui/primitives";
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

/**
 * The form on a card, and beside it everything a recruiter may prefer to a
 * form: the address with its copy button, the profiles, the CV, and the
 * search itself. On a phone the address comes first.
 */
export function ContactPage({ locale }: { locale: Locale }) {
  const { availability, copy, form, site } = getContent(locale);

  return (
    <>
      <PageHeader
        title={copy.contactHeading}
        sub={copy.contactSub}
      >
        <p
          className="rise mt-4 text-body font-medium text-paper"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {availability.headline}, {availability.window}
        </p>
      </PageHeader>

      <section className="band">
        <div className="section-body page-width grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <aside className="grid content-start gap-6 lg:col-start-2 lg:row-start-1">
            <div className="card p-6">
              <p className="eyebrow">{copy.emailLabel}</p>
              <p className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="link fact-value break-all text-body"
                >
                  {site.email}
                </a>
              </p>
              <div className="mt-4">
                <CopyButton
                  value={site.email}
                  idle={copy.copyIdle}
                  done={copy.copyDone}
                  action={copy.copyAction}
                  confirm={copy.copyConfirm}
                />
              </div>
            </div>

            <div className="card p-6">
              <p className="eyebrow">{copy.elsewhereLabel}</p>
              <ul className="mt-3 grid gap-2.5 type-label">
                <li>
                  <ExternalLink
                    href={site.github}
                    newTab={copy.newTab}
                    className="link-arrow"
                  >
                    <Icon name="github" />
                    GitHub
                    <Icon name="arrowUpRight" className="text-paper-3" />
                  </ExternalLink>
                </li>
                {site.linkedin ? (
                  <li>
                    <ExternalLink
                      href={site.linkedin}
                      newTab={copy.newTab}
                      className="link-arrow"
                    >
                      <Icon name="linkedin" />
                      LinkedIn
                      <Icon name="arrowUpRight" className="text-paper-3" />
                    </ExternalLink>
                  </li>
                ) : null}
                <li>
                  <a href={site.cvUrl} download className="link-arrow">
                    <Icon name="download" />
                    {copy.cvButton}
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="card p-6 sm:p-8 lg:col-start-1 lg:row-start-1">
            <ContactForm locale={locale} form={form} retry={copy.errorRetry} />
          </div>
        </div>
      </section>
    </>
  );
}
