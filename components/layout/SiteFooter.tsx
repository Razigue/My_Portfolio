import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
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
      <div className="footer-body mx-auto max-w-page px-6 lg:px-10">
        <div className="grid gap-x-gutter gap-y-block md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal variant="fade" as={Eyebrow} order={0}>
              {copy.footerWrite}
            </Reveal>
            <Reveal
              variant="chars"
              as="p"
              order={1}
              className="mt-label font-display text-h3 tracking-tight text-paper"
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

        <div className="mt-block flex font-mono text-micro tracking-meta sm:justify-end">
          <Reveal variant="fade" order={3} className="text-paper-2">
            <LocaleSwitch
              locale={locale}
              label={getContent(otherLocale(locale)).copy.languageName}
            />
          </Reveal>
        </div>
      </div>

      <div className="wordmark-slot">
        <p className="footer-wordmark" aria-hidden="true">
          {site.name}
        </p>
      </div>
    </Stage>
  );
}
