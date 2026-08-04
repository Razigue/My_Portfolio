import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { Loader } from "@/components/motion/Loader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { hero, navItems, site } from "@/content/site";
import { INK, INK_LIGHT } from "@/lib/palette";
import { themeScript } from "@/lib/theme-script";
import { jsonLd } from "@/lib/jsonld";

// Variable, so no `weight`: the range ships in one file. `opsz` earns its bytes
// — the browser thins the display sizes and thickens the reading sizes on its
// own, which a static face cannot do.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const curtainLabels = Object.fromEntries(
  navItems.map((item) => [item.href, item.title]),
);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // A comma, not a middot and not a dash. The tab title is user-facing text
  // like any other, so the same rule applies to it.
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s, ${site.name}`,
  },
  description: hero.tagline,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "développeur web",
    "full-stack",
    "alternance",
    "Paris",
    "React",
    "Laravel",
    "Spring Boot",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.name}, ${site.role}`,
    description: hero.tagline,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.role}`,
    description: hero.tagline,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: INK_LIGHT },
    { media: "(prefers-color-scheme: dark)", color: INK },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <Loader name={site.name} />

        <TransitionProvider labels={curtainLabels}>
          <SkipLink />
          <SiteHeader />
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </TransitionProvider>

        <div className="film" aria-hidden="true" />
      </body>
    </html>
  );
}
