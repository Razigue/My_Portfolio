import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { otherLocale, type Locale } from "@/lib/i18n";

/** One line of links at the foot of every page, and the way to the other language. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { copy, site } = getContent(locale);

  return (
    <footer data-print="hide">
      <div className="site-footer-bar mx-auto flex max-w-page flex-wrap items-baseline justify-between gap-x-gutter gap-y-label px-6 font-mono text-meta tracking-meta pointer-coarse:gap-y-6 lg:px-10">
        <ul className="flex flex-wrap gap-x-7 gap-y-3 text-paper-3 pointer-coarse:gap-y-6">
          <li>
            <a href={`mailto:${site.email}`} className="link tap-area">
              {site.email}
            </a>
          </li>
          <li>
            <ExternalLink
              href={site.github}
              newTab={copy.newTab}
              className="link tap-area"
            >
              GitHub ↗
            </ExternalLink>
          </li>
          {site.linkedin ? (
            <li>
              <ExternalLink
                href={site.linkedin}
                newTab={copy.newTab}
                className="link tap-area"
              >
                LinkedIn ↗
              </ExternalLink>
            </li>
          ) : null}
          <li>
            <a href={site.cvUrl} download className="link tap-area">
              {copy.cvShort} ↓
            </a>
          </li>
          {site.sourceRepo ? (
            <li>
              <ExternalLink
                href={site.sourceRepo}
                newTab={copy.newTab}
                className="link tap-area"
              >
                {copy.sourceLink}
              </ExternalLink>
            </li>
          ) : null}
        </ul>

        <p className="text-paper-2">
          <LocaleSwitch
            locale={locale}
            label={getContent(otherLocale(locale)).copy.languageName}
          />
        </p>
      </div>
    </footer>
  );
}
