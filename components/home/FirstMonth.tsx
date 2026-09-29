import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getContent } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * What he can take on in the first month, in his own words: the question a
 * team asks of an apprentice before any other. What he wants to learn is one
 * link away, on the About page.
 */
export function FirstMonth({ locale }: { locale: Locale }) {
  const { copy, recherche } = getContent(locale);

  return (
    <section aria-labelledby="premier-mois-title" className="band">
      <div className="section-body page-width grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+var(--spacing-block))]">
            <h2 id="premier-mois-title" className="section-title">
              {recherche.firstMonthTitle}
            </h2>
            <p className="mt-6">
              <Link href={pathFor(locale, "about")} className="link-arrow type-label">
                {copy.learnLink}
                <Icon name="arrowRight" />
              </Link>
            </p>
          </div>
        </div>

        <ul className="check-list grid">
          {recherche.firstMonth.map((item) => (
            <li
              key={item}
              className="border-b border-line py-5 text-body text-paper-2 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="check-mark" aria-hidden="true">
                <Icon name="check" />
              </span>
              <span className="max-w-measure">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
