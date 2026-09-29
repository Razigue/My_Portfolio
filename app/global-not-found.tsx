import type { Metadata } from "next";
import "@/app/globals.css";
import { copy as englishCopy } from "@/content/en/site";
import { copy as frenchCopy, nav } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { LANGUAGE_TAGS, pathFor } from "@/lib/i18n";
import { themeScript } from "@/lib/theme-script";

/*
 * An address that matches no route at all. Each language has its own root
 * layout, so there is no single layout for Next to put a 404 in, and nothing
 * says which language the visitor meant: the page answers in both, French
 * first. It renders its own document, theme script included. It has no
 * header, so the way on is given here: home, the other pages, and the
 * English site as a plain link rather than a second button of equal weight.
 */

const PAGES = ["projects", "about", "contact"] as const;

export const metadata: Metadata = {
  title: `${frenchCopy.notFoundTitle}, ${englishCopy.notFoundTitle}`,
};

export default function GlobalNotFound() {
  const english = LANGUAGE_TAGS.en.html;

  return (
    <html
      lang={LANGUAGE_TAGS.fr.html}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="page-width flex min-h-dvh flex-col justify-center page-head">

          <h1 className="page-title">
            {frenchCopy.notFoundTitle}
          </h1>

          <p className="mt-title max-w-measure text-lede text-paper-2">
            {frenchCopy.notFoundBody}
          </p>

          <p lang={english} className="mt-label max-w-measure text-body text-paper-3">
            {englishCopy.notFoundTitle}. {englishCopy.notFoundBody}
          </p>

          <div className="mt-block">
            <a href={pathFor("fr", "home")} className="btn btn-solid">
              {frenchCopy.notFoundLink}
            </a>
          </div>

          <ul className="mt-block flex flex-wrap gap-x-6 gap-y-3">
            {PAGES.map((page) => (
              <li key={page}>
                <a href={pathFor("fr", page)} className="link type-label text-paper-2">
                  {nav[page]}
                </a>
              </li>
            ))}
            <li>
              <a
                href={pathFor("en", "home")}
                hrefLang={english}
                lang={english}
                className="link type-label text-paper-3"
              >
                {englishCopy.notFoundLink}
              </a>
            </li>
          </ul>
        </main>
      </body>
    </html>
  );
}
