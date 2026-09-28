import Image from "next/image";
import Link from "next/link";
import portrait from "@/content/media/razigue.png";
import { getContent } from "@/lib/content";
import { searchCriteria } from "@/lib/criteria";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The opening of the home page: who he is and what he is looking for in one
 * sentence, the two things to do next, then every practical fact of the
 * alternance in one panel, so a recruiter finds them together rather than
 * spread through the page.
 */
export function Hero({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, hero, site } = content;
  const criteria = searchCriteria(content);
  const facts = [
    criteria.window,
    criteria.rhythm,
    criteria.target,
    criteria.school,
    criteria.diploma,
    criteria.place,
  ];

  return (
    <section aria-labelledby="hero-title">
      <div className="page-head page-width">
        <div className="hero-grid">
          <h1
            id="hero-title"
            className="hero-name font-display text-h2 leading-tight tracking-display text-paper"
          >
            {site.name}
          </h1>

          {/* No forced aspect ratio: the photograph keeps its own 2:3. */}
          <div className="hero-portrait portrait w-28 sm:w-36 lg:w-44">
            <Image
              src={portrait}
              alt={copy.portraitAlt}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 11rem, (min-width: 640px) 9rem, 7rem"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="hero-body">
            <p className="max-w-measure text-lede text-paper-2">{hero.tagline}</p>

            <div className="mt-block flex flex-wrap items-center gap-5">
              <Link href={pathFor(locale, "contact")} className="btn btn-solid">
                {copy.heroContact}
              </Link>

              <a href={site.cvUrl} download className="btn">
                {copy.cvButton}
              </a>
            </div>
          </div>
        </div>

        {/* The practical facts, on a ground of their own: it is what sets
            them apart from the sentence above, not a frame. */}
        <div className="mt-section rounded-shot bg-ink-2 p-6 sm:p-10">
          <h2 className="part-title">
            {copy.availabilityTitle}
          </h2>

          <dl className="ruled-each mt-title grid gap-x-gutter gap-y-title sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="fact-value mt-2 text-body">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
