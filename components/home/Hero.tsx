import Image from "next/image";
import Link from "next/link";
import portrait from "@/content/media/razigue.png";
import { BtnLabel } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { searchCriteria } from "@/lib/criteria";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The opening screen: who he is, what he is looking for, the facts a recruiter
 * checks first, and how to reach him. The sentence already names the school,
 * the length and the start of the alternance, so the list holds the rest.
 */
export function Hero({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { copy, hero, site } = content;
  const criteria = searchCriteria(content);
  const facts = [
    criteria.rhythm,
    criteria.target,
    criteria.diploma,
    criteria.place,
  ];

  return (
    <section aria-labelledby="hero-title">
      <div className="hero-grid page-head mx-auto min-h-dvh max-w-page px-6 lg:px-10">
        <h1
          id="hero-title"
          className="hero-name font-display text-h1 leading-display tracking-display text-paper"
        >
          {site.name}
        </h1>

        {/* No forced aspect ratio: the photograph keeps its own 2:3. */}
        <div className="hero-portrait portrait w-28 sm:w-36 lg:w-48">
          <Image
            src={portrait}
            alt={copy.portraitAlt}
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 12rem, (min-width: 640px) 9rem, 7rem"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="hero-body">
          <p className="max-w-measure text-lede text-paper-2">{hero.tagline}</p>

          <dl className="mt-block grid max-w-[52rem] gap-x-gutter gap-y-title sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-body text-paper">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-block flex flex-wrap items-center gap-5">
            <Link href={pathFor(locale, "contact")} className="btn btn-solid">
              <BtnLabel>{copy.heroContact}</BtnLabel>
            </Link>

            <a href={site.cvUrl} download className="btn">
              <BtnLabel>{copy.cvButton}</BtnLabel>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
