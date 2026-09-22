import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { Scrub } from "@/components/motion/Scrub";
import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { otherLocale, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { copy, site } = getContent(locale);

  return (
    <Stage
      as="footer"
      data-print="hide"
      className="relative isolate overflow-hidden"
      stagger={0.08}
    >
      {/* The watermark name is absolutely placed at the bottom edge, so the
          bottom padding here is what keeps the metadata clear of it. */}
      <div className="mx-auto max-w-page px-6 pb-32 pt-28 sm:pb-40 lg:px-10 lg:pb-56 lg:pt-40">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal variant="fade" as={Eyebrow} order={0}>
              {copy.footerWrite}
            </Reveal>
            <Reveal
              variant="chars"
              as="p"
              order={1}
              className="mt-5 font-display text-h3 tracking-tight text-paper"
            >
              {site.email}
            </Reveal>
          </div>

          <Reveal variant="rise" order={2}>
            <ul className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-micro tracking-meta text-paper-3">
              <li>
                <ExternalLink href={site.github} newTab={copy.newTab}>
                  GitHub ↗
                </ExternalLink>
              </li>
              <li>
                <a href={site.cvUrl} download className="link">
                  {copy.cvShort} ↓
                </a>
              </li>
              {site.linkedin ? (
                <li>
                  <ExternalLink href={site.linkedin} newTab={copy.newTab}>
                    LinkedIn ↗
                  </ExternalLink>
                </li>
              ) : null}
              {site.sourceRepo ? (
                <li>
                  <ExternalLink href={site.sourceRepo} newTab={copy.newTab}>
                    {copy.sourceLink}
                  </ExternalLink>
                </li>
              ) : null}
            </ul>
          </Reveal>
        </div>

        {/* A name at one end and a place at the other. Two plain sentences,
            since a description list stopped earning its markup once the build
            figures came out of it. */}
        <div className="mt-24 flex flex-col gap-6 font-mono text-micro tracking-meta text-paper-3 sm:flex-row sm:items-baseline sm:justify-between">
          <Reveal variant="fade" as="p" order={3}>
            {site.name}
          </Reveal>
          <Reveal
            variant="fade"
            order={4}
            className="flex items-baseline gap-7 text-paper-2"
          >
            <p>{copy.footerPlace}</p>
            <LocaleSwitch
              locale={locale}
              label={getContent(otherLocale(locale)).copy.languageName}
            />
          </Reveal>
        </div>
      </div>

      {/* The name slides sideways under the page as the bottom arrives. */}
      <Scrub
        className="wordmark-slot"
        from={{ xPercent: 5 }}
        to={{ xPercent: -5 }}
        start="top bottom"
        end="bottom bottom"
      >
        <p className="footer-wordmark" aria-hidden="true">
          {site.name}
        </p>
      </Scrub>
    </Stage>
  );
}
