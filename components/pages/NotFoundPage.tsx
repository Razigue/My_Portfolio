import Link from "next/link";
import { BtnLabel, Eyebrow } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/** A 404 inside one language's layout, for a `notFound()` raised by a page. */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { copy } = getContent(locale);

  return (
    <section>
      <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-center px-6 page-head lg:px-10">
        <Eyebrow>{copy.notFoundEyebrow}</Eyebrow>

        <h1 className="mt-block block font-display text-h2 leading-display tracking-display text-paper">
          {copy.notFoundTitle}
        </h1>

        <p className="mt-title max-w-measure text-lede text-paper-2">
          {copy.notFoundBody}
        </p>

        <div className="mt-block">
          <Link href={pathFor(locale, "home")} className="btn">
            <BtnLabel>{copy.notFoundLink}</BtnLabel>
          </Link>
        </div>
      </div>
    </section>
  );
}
