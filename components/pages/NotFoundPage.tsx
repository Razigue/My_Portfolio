import Link from "next/link";
import { Eyebrow } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/** A 404 inside one language's layout, for a `notFound()` raised by a page. */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { copy } = getContent(locale);

  return (
    <section>
      <div className="page-width flex min-h-dvh flex-col justify-center page-head">
        <Eyebrow>{copy.notFoundEyebrow}</Eyebrow>

        <h1 className="mt-block block font-display text-h2 leading-display tracking-display text-paper">
          {copy.notFoundTitle}
        </h1>

        <p className="mt-title max-w-measure text-lede text-paper-2">
          {copy.notFoundBody}
        </p>

        <div className="mt-block">
          <Link href={pathFor(locale, "home")} className="btn">
            {copy.notFoundLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
