import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stage } from "@/components/motion/Stage";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { searchCriteria } from "@/lib/criteria";
import { alternates, pathFor, type Locale } from "@/lib/i18n";

export function contactMetadata(locale: Locale): Metadata {
  const { copy } = getContent(locale);
  return {
    title: copy.contactHeading,
    description: copy.contactSub,
    alternates: alternates(locale, "contact"),
    openGraph: {
      title: copy.contactHeading,
      description: copy.contactSub,
      url: pathFor(locale, "contact"),
    },
  };
}

export function ContactPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { availability, copy, form, site } = content;

  return (
    <>
      <PageHeader
        eyebrow={copy.contactEyebrow}
        title={copy.contactHeading}
        sub={copy.contactSub}
      />

      <Stage className="band" stagger={0.09}>
        <div className="section-body-tight mx-auto grid max-w-page gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-24 lg:px-10">
          <div>
            <ContactForm locale={locale} form={form} />
          </div>

          <aside className="grid content-start gap-10">
            <Reveal variant="rise" order={1}>
              <Eyebrow>{copy.emailLabel}</Eyebrow>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${site.email}`}
                  className="link text-body text-paper"
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
            </Reveal>

            <Reveal variant="rise" order={2}>
              <Eyebrow>{copy.elsewhereLabel}</Eyebrow>
              <ul className="mt-4 grid gap-3">
                <li>
                  <ExternalLink
                    href={site.github}
                    newTab={copy.newTab}
                    className="link font-mono text-meta tracking-meta text-paper-2"
                  >
                    GitHub ↗
                  </ExternalLink>
                </li>
                {site.linkedin ? (
                  <li>
                    <ExternalLink
                      href={site.linkedin}
                      newTab={copy.newTab}
                      className="link font-mono text-meta tracking-meta text-paper-2"
                    >
                      LinkedIn ↗
                    </ExternalLink>
                  </li>
                ) : null}
                <li>
                  <a
                    href={site.cvUrl}
                    download
                    className="link font-mono text-meta tracking-meta text-paper-2"
                  >
                    {copy.cvButton} ↓
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal variant="rise" order={3}>
              <Eyebrow>{copy.availabilityTitle}</Eyebrow>
              <p className="mt-4 flex items-baseline gap-3 text-body text-paper">
                <span className="mark-flare dot-baseline" aria-hidden="true" />
                {availability.headline}
              </p>
              <dl className="zebra -mx-4 mt-5 grid">
                {searchCriteria(content).map((criterion) => (
                  <div key={criterion.label} className="grid gap-1 px-4 py-3">
                    <dt className="font-mono text-micro tracking-meta text-paper-3">
                      {criterion.label}
                    </dt>
                    <dd className="text-meta text-paper">{criterion.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
      </Stage>
    </>
  );
}
