import Image from "next/image";
import Link from "next/link";
import portrait from "@/content/media/razigue.png";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { searchCriteria } from "@/lib/criteria";
import { pathFor, type Locale } from "@/lib/i18n";

/**
 * The first screen: that he is available and on what terms, his name and
 * role, one sentence of who he is, the two things to do next and where to
 * check his work, his photograph, then the terms of the apprenticeship in
 * one strip, so a recruiter has them all before scrolling.
 *
 * Everything rises once, in reading order: the one authored entrance.
 */
export function Hero({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { availability, copy, formation, presentation, site } = content;
  const criteria = searchCriteria(content);

  const terms: readonly {
    label: string;
    value: string;
    detail?: string;
  }[] = [
    criteria.rhythm,
    { ...criteria.target, detail: availability.languages },
    {
      label: copy.formationTitle,
      value: `${formation.title}, ${formation.credential}`,
      detail: formation.school,
    },
    criteria.place,
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="page-width pt-10 pb-section sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div className="min-w-0">
            <h1
              id="hero-title"
              className="rise display-title text-paper"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              {site.name}
            </h1>

            <p
              className="rise mt-4 text-h3 font-medium tracking-tight text-paper-2"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {site.role}
            </p>

            <p
              className="rise mt-6 max-w-measure text-lede text-paper-2"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              {presentation}
            </p>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-3"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              <Link href={pathFor(locale, "contact")} className="btn btn-solid">
                {copy.heroContact}
                <Icon name="arrowRight" />
              </Link>

              <a href={site.cvUrl} download className="btn">
                <Icon name="download" />
                {copy.cvButton}
              </a>

              <span className="flex gap-3">
              <ExternalLink
                href={site.github}
                newTab={copy.newTab}
                label="GitHub"
                className="btn btn-icon"
              >
                <Icon name="github" />
              </ExternalLink>

              {site.linkedin ? (
                <ExternalLink
                  href={site.linkedin}
                  newTab={copy.newTab}
                  label="LinkedIn"
                  className="btn btn-icon"
                >
                  <Icon name="linkedin" />
                </ExternalLink>
              ) : null}
              </span>
            </div>
          </div>

          {/* The photograph keeps its own 2:3. */}
          <div
            className="rise portrait mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:max-w-none"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <Image
              src={portrait}
              alt={copy.portraitAlt}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 22rem, 18rem"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* The terms, in one strip. */}
        <div
          className="rise card mt-block overflow-hidden"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          {/* The search itself heads the terms, as a title, not a badge. */}
          <h2 className="border-b border-line px-5 py-4 text-[1.0625rem] font-semibold tracking-tight sm:px-6">
            {availability.headline}
            <span className="font-normal text-paper-2">, {availability.window}</span>
          </h2>
          <dl className="grid divide-line sm:grid-cols-2 max-sm:divide-y lg:grid-cols-4 lg:divide-x sm:max-lg:[&>*:nth-child(-n+2)]:border-b sm:max-lg:[&>*:nth-child(odd)]:border-r sm:max-lg:[&>*]:border-line">
            {terms.map((term) => (
              <div key={term.label} className="p-5 sm:p-6">
                <div className="min-w-0">
                  <dt className="eyebrow">{term.label}</dt>
                  <dd className="fact-value mt-1 text-[0.9375rem] leading-tight">
                    {term.value}
                  </dd>
                  {term.detail ? (
                    <dd className="mt-1 type-label text-paper-3">{term.detail}</dd>
                  ) : null}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
