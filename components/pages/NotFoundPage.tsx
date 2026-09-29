import Link from "next/link";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * A 404 inside one language's layout, for a `notFound()` raised by a page:
 * the way home, and the other pages one step away.
 */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { copy, nav } = getContent(locale);
  const pages = ["projects", "about", "contact"] as const;

  return (
    <section>
      <div className="page-width flex min-h-dvh flex-col justify-center page-head">

        <h1 className="page-title">
          {copy.notFoundTitle}
        </h1>

        <p className="mt-title max-w-measure text-lede text-paper-2">
          {copy.notFoundBody}
        </p>

        <div className="mt-block">
          <Link href={pathFor(locale, "home")} className="btn btn-solid">
            {copy.notFoundLink}
          </Link>
        </div>

        <ul className="mt-block flex flex-wrap gap-x-6 gap-y-3">
          {pages.map((page) => (
            <li key={page}>
              <Link href={pathFor(locale, page)} className="link type-label text-paper-2">
                {nav[page]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
