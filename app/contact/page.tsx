import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, ExternalLink } from "@/components/ui/primitives";
import { availability, copy, site } from "@/content/site";
import { searchCriteria } from "@/lib/criteria";

export const metadata: Metadata = {
  title: copy.contactHeading,
  description: copy.contactSub,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: copy.contactHeading,
    description: copy.contactSub,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={copy.contactHeading}
        sub={copy.contactSub}
      />

      <Stage className="band" stagger={0.09}>
        <div className="section-body-tight mx-auto grid max-w-page gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-24 lg:px-10">
          <Reveal variant="rise" order={0}>
            <ContactForm />
          </Reveal>

          <aside className="grid content-start gap-10">
            <Reveal variant="rise" order={1}>
              <Eyebrow>Email</Eyebrow>
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
                />
              </div>
            </Reveal>

            <Reveal variant="rise" order={2}>
              <Eyebrow>Ailleurs</Eyebrow>
              <ul className="mt-4 grid gap-3">
                <li>
                  <ExternalLink
                    href={site.github}
                    className="link font-mono text-meta tracking-meta text-paper-2"
                  >
                    GitHub ↗
                  </ExternalLink>
                </li>
                {site.linkedin ? (
                  <li>
                    <ExternalLink
                      href={site.linkedin}
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
              <Eyebrow>Disponibilité</Eyebrow>
              <p className="mt-4 flex items-baseline gap-3 text-body text-paper">
                <span className="mark-flare dot-baseline" aria-hidden="true" />
                {availability.headline}
              </p>
              <dl className="zebra -mx-4 mt-5 grid">
                {searchCriteria().map((criterion) => (
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
