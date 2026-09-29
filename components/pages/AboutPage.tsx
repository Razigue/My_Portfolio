import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/content/media/razigue.png";
import { Method } from "@/components/home/Method";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { ExternalLink } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { alternates, pathFor, type Locale } from "@/lib/i18n";

export function aboutMetadata(locale: Locale): Metadata {
  const { copy, presentation } = getContent(locale);
  return {
    title: copy.aboutTitle,
    description: presentation,
    alternates: alternates(locale, "about"),
    openGraph: {
      title: copy.aboutTitle,
      description: presentation,
      url: pathFor(locale, "about"),
    },
  };
}

/** A list whose items each open on a check in the accent. */
function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list mt-5 grid gap-3.5">
      {items.map((item) => (
        <li key={item} className="text-body text-paper-2">
          <span className="check-mark" aria-hidden="true">
            <Icon name="check" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The CV, set as a page: the story beside the photograph, what he can take
 * on as an apprentice and what he wants to learn, the path, the languages
 * and the CV, what he brings and what he does besides, then how he works
 * and how he uses AI.
 */
export function AboutPage({ locale }: { locale: Locale }) {
  const {
    atouts,
    copy,
    devise,
    experiences,
    formation,
    interets,
    langues,
    parcours,
    recherche,
    site,
  } = getContent(locale);

  return (
    <>
      <PageHeader title={copy.aboutTitle} sub={devise} />

      {/* The story, beside the photograph */}
      <section className="band">
        <div className="section-body page-width grid items-start gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="prose-fr max-w-measure text-lede">
            {parcours.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="portrait mx-auto w-full max-w-[18rem] lg:sticky lg:top-[calc(var(--spacing-header)+var(--spacing-block))] lg:max-w-none">
            <Image
              src={portrait}
              alt={copy.portraitAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 20rem, 18rem"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* As an apprentice */}
      <section aria-labelledby="recherche-title">
        <div className="section-body page-width">
          <h2 id="recherche-title" className="section-title">
            {recherche.title}
          </h2>

          <div className="ruled-each mt-block grid gap-x-gutter gap-y-block lg:grid-cols-2">
            <div>
              <h3 className="part-title">{recherche.firstMonthTitle}</h3>
              <Checks items={recherche.firstMonth} />
            </div>
            <div>
              <h3 className="part-title">{recherche.learnTitle}</h3>
              <Checks items={recherche.learn} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience and education */}
      <section aria-labelledby="experiences-title" className="band">
        <div className="section-body page-width grid gap-x-gutter gap-y-section lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h2 id="experiences-title" className="section-title">
              {copy.experiencesTitle}
            </h2>

            <ol className="timeline mt-block grid gap-block">
              {experiences.map((experience) => (
                <li key={experience.role}>
                  <p className="data text-paper-3">{experience.period}</p>
                  <h3 className="mt-1.5 part-title">{experience.role}</h3>
                  <p className="mt-1 type-label text-paper-3">{experience.context}</p>
                  <p className="prose-fr mt-3 max-w-measure text-body">
                    {experience.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid content-start gap-6">
            <div className="card p-6 sm:p-7">
              <h2 id="formation-title" className="item-title text-paper-3">
                {copy.formationTitle}
              </h2>
              <p className="mt-3 part-title">{formation.title}</p>
              <p className="mt-1 text-body text-paper-2">{formation.credential}</p>
              <ul className="mt-4 grid gap-1 type-label text-paper-3">
                <li>{formation.school}, {formation.place}</li>
                <li className="data">{formation.period}</li>
                <li>{formation.detail}</li>
              </ul>
              <div className="mt-5 grid gap-3 border-t border-line pt-5 text-body text-paper-2">
                <p>{formation.firstYear}</p>
                <p>{formation.cycle}</p>
                <p>{formation.proudest}</p>
              </div>
            </div>

            <div className="card p-6 sm:p-7">
              <h2 className="item-title text-paper-3">{copy.languagesTitle}</h2>
              <dl className="ruled ruled-tight mt-4 grid gap-title">
                {langues.map((langue) => (
                  <div key={langue.name}>
                    <dt className="item-title">{langue.name}</dt>
                    <dd className="mt-0.5 type-label text-paper-3">{langue.level}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div data-print="hide">
              <a href={site.cvUrl} download className="btn w-full">
                <Icon name="download" />
                {copy.cvButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths, and what fills the rest of the time */}
      <section aria-labelledby="atouts-title">
        <div className="section-body page-width grid gap-x-gutter gap-y-section lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h2 id="atouts-title" className="section-title">
              {copy.strengthsTitle}
            </h2>
            <dl className="ruled-each mt-block grid gap-y-6">
              {atouts.map((atout) => (
                <div key={atout.name}>
                  <dt className="item-title">{atout.name}</dt>
                  <dd className="mt-2 text-body text-paper-2">{atout.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 id="interets-title" className="section-title">
              {copy.interestsTitle}
            </h2>
            <dl className="ruled-each mt-block grid gap-y-6">
              {interets.map((interet) => (
                <div key={interet.name}>
                  <dt className="item-title">{interet.name}</dt>
                  <dd className="mt-2 text-body text-paper-2">{interet.detail}</dd>
                  {interet.link ? (
                    <dd className="mt-3">
                      <ExternalLink
                        href={interet.link.href}
                        newTab={copy.newTab}
                        className="link-arrow type-label"
                      >
                        {interet.link.label}
                        <Icon name="arrowUpRight" />
                      </ExternalLink>
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Method locale={locale} />
    </>
  );
}
