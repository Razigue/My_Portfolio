import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { otherLocale, type Locale } from "@/lib/i18n";

/** One line of links at the foot of every page, and the way to the other language. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { copy, site } = getContent(locale);

  return (
    <footer data-print="hide">
      {/* Shown only when the page ends on its own ground: after a band, the
          change of ground already says the page is over. */}
      <div className="footer-rule page-width" aria-hidden="true">
        <hr className="rule" />
      </div>
      <div className="site-footer-bar page-width flex flex-wrap items-baseline justify-between gap-x-gutter gap-y-label type-label pointer-coarse:gap-y-6">
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
