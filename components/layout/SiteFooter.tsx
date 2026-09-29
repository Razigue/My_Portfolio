import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { otherLocale, type Locale } from "@/lib/i18n";

/** The name and role, the ways to reach him, and the other language. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { copy, site } = getContent(locale);

  return (
    <footer data-print="hide" className="site-footer">
      <div className="page-width flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-label text-paper-3">
          <span className="font-medium text-paper">{site.name}</span>,{" "}
          {site.role}
        </p>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 type-label text-paper-2 pointer-coarse:gap-y-5">
          <li>
            <a href={`mailto:${site.email}`} className="link-arrow tap-area font-normal text-paper-2">
              <Icon name="mail" />
              {copy.emailLabel}
            </a>
          </li>
          <li>
            <ExternalLink
              href={site.github}
              newTab={copy.newTab}
              className="link-arrow tap-area font-normal text-paper-2"
            >
              <Icon name="github" />
              GitHub
            </ExternalLink>
          </li>
          {site.linkedin ? (
            <li>
              <ExternalLink
                href={site.linkedin}
                newTab={copy.newTab}
                className="link-arrow tap-area font-normal text-paper-2"
              >
                <Icon name="linkedin" />
                LinkedIn
              </ExternalLink>
            </li>
          ) : null}
          <li>
            <a href={site.cvUrl} download className="link-arrow tap-area font-normal text-paper-2">
              <Icon name="download" />
              {copy.cvShort}
            </a>
          </li>
          {site.sourceRepo ? (
            <li>
              <ExternalLink
                href={site.sourceRepo}
                newTab={copy.newTab}
                className="link-arrow tap-area font-normal text-paper-2"
              >
                {copy.sourceLink}
              </ExternalLink>
            </li>
          ) : null}
          <li className="text-paper">
            <LocaleSwitch
              locale={locale}
              label={getContent(otherLocale(locale)).copy.languageName}
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}
