import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { RouteFocus } from "@/components/motion/RouteFocus";
import { getContent } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { LANGUAGE_TAGS, otherLocale, pathFor, type Locale } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { INK, INK_LIGHT } from "@/lib/palette";
import { themeScript } from "@/lib/theme-script";

/**
 * The document around every page, in one language. Each language has its own
 * root layout, `app/(fr)/layout.tsx` and `app/en/layout.tsx`, so that <html>
 * declares the language actually on screen; both render this.
 */

export function rootMetadata(locale: Locale): Metadata {
  const { copy, hero, site } = getContent(locale);
  const title = `${site.name}, ${site.role}`;

  return {
    metadataBase: new URL(site.url),
    // A comma, not a middot and not a dash. The tab title is user-facing text
    // like any other, so the same rule applies to it.
    title: {
      default: title,
      template: `%s, ${site.name}`,
    },
    description: hero.tagline,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.github }],
    creator: site.name,
    keywords: [...copy.keywords],
    openGraph: {
      type: "website",
      locale: LANGUAGE_TAGS[locale].og,
      alternateLocale: LANGUAGE_TAGS[otherLocale(locale)].og,
      siteName: site.name,
      title,
      description: hero.tagline,
      url: pathFor(locale, "home"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: hero.tagline,
    },
  };
}

export const rootViewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: INK_LIGHT },
    { media: "(prefers-color-scheme: dark)", color: INK },
  ],
};

export function RootDocument({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  const content = getContent(locale);
  const { copy, nav, site } = content;

  const links = [
    { href: pathFor(locale, "home"), title: nav.home },
    { href: pathFor(locale, "projects"), title: nav.projects },
    { href: pathFor(locale, "about"), title: nav.about },
    { href: pathFor(locale, "contact"), title: nav.contact },
  ];

  return (
    <html
      lang={LANGUAGE_TAGS[locale].html}
      suppressHydrationWarning
      className={fontVariables}
    >
      {/* The rule is meant for the Pages Router, and exempts files under
          `app/`. This is the App Router's root <head>, rendered from here so
          both languages share it. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(content)) }}
        />
      </head>
      <body>
        <RouteFocus />
        <SkipLink label={copy.skipLink} />
        <SiteHeader
          locale={locale}
          name={site.name}
          links={links}
          labels={{
            navLabel: copy.navLabel,
            menuOpen: copy.menuOpen,
            menuClose: copy.menuClose,
            toTop: copy.toTop,
            themeToDay: copy.themeToDay,
            themeToNight: copy.themeToNight,
          }}
        />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
