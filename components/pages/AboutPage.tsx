import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/content/media/razigue.png";
import { PageHeader } from "@/components/layout/PageHeader";
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

/** The items of a list, each behind a small square in the accent. */
function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-label grid gap-label">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-4 text-body text-paper-2"
        >
          <span className="mark-flare dot-baseline" aria-hidden="true" />
          <span className="max-w-measure">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The CV, set as a page: the story, what he can take on as an apprentice and
 * what he wants to learn, the experience, the education and the languages,
 * then what he brings and what he does besides. Grounds alternate from the
 * story on.
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
      <PageHeader
        title={copy.aboutTitle}
        sub={devise}
      />

      {/* Portrait + the longer-form story */}
      <section className="band">
        <div className="section-body page-width grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="prose-fr max-w-measure text-body">
            {parcours.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="portrait h-fit">
            <Image
              src={portrait}
              alt={copy.portraitAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* As an apprentice: what he can take on, and what he wants to learn */}
      <section aria-labelledby="recherche-title">
        <div className="section-body page-width">
          <h2 id="recherche-title" className="section-title">
            {recherche.title}
          </h2>

          <div className="ruled-each mt-block grid gap-x-gutter gap-y-block lg:grid-cols-2">
            <div>
              <h3 className="part-title">
                {recherche.firstMonthTitle}
              </h3>
              <Points items={recherche.firstMonth} />
            </div>

            <div>
              <h3 className="part-title">
                {recherche.learnTitle}
              </h3>
              <Points items={recherche.learn} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experiences-title" className="band">
        <div className="section-body page-width">
          <h2 id="experiences-title" className="section-title">
            {copy.experiencesTitle}
          </h2>

          <ol className="ruled mt-block grid gap-block">
            {experiences.map((experience) => (
              <li
                key={experience.role}
                className="grid gap-3 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-x-gutter"
              >
                <div>
                  <p className="tnum text-meta text-paper-2">
                    {experience.period}
                  </p>
                  <p className="mt-1 text-meta text-paper-3">
                    {experience.context}
                  </p>
                </div>

                <div>
                  <h3 className="part-title">
                    {experience.role}
                  </h3>
                  <p className="prose-fr mt-3 max-w-measure text-body">
                    {experience.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Education, languages, CV */}
      <section aria-labelledby="formation-title">
        <div className="section-body page-width grid gap-x-gutter gap-y-block lg:grid-cols-3">
          <div className="lg:col-span-2 lg:row-span-2">
            <h2 id="formation-title" className="section-title">
              {copy.formationTitle}
            </h2>
            <div className="mt-title">
              <p className="part-title">
                {formation.title}
              </p>
              <p className="mt-2 text-body text-paper-2">
                {formation.credential}
              </p>
              <ul className="mt-label grid gap-1 text-meta text-paper-3">
                <li>{formation.school}</li>
                <li>{formation.place}</li>
                <li className="tnum">{formation.period}</li>
                <li className="tnum">{formation.detail}</li>
              </ul>
            </div>
            <div className="mt-title grid max-w-measure gap-label text-body text-paper-2">
              <p>{formation.firstYear}</p>
              <p>{formation.cycle}</p>
              <p>{formation.proudest}</p>
            </div>
          </div>

          <div>
            <h2 className="section-title">
              {copy.languagesTitle}
            </h2>
            <div className="mt-title">
              <dl className="ruled ruled-tight grid gap-title">
                {langues.map((langue) => (
                  <div key={langue.name} className="grid gap-1">
                    <dt className="item-title">{langue.name}</dt>
                    <dd className="text-meta text-paper-3">{langue.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div data-print="hide">
            <h2 className="section-title">
              {copy.documentTitle}
            </h2>
            <div className="mt-title">
              <a href={site.cvUrl} download className="btn">
                {copy.cvButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths, and what fills the rest of the time */}
      <section aria-labelledby="atouts-title" className="band">
        <div className="section-body page-width grid gap-x-gutter gap-y-block lg:grid-cols-2">
          {[
            { id: "atouts-title", title: copy.strengthsTitle, items: atouts },
            { id: "interets-title", title: copy.interestsTitle, items: interets },
          ].map((column) => (
            <div key={column.id}>
              <h2 id={column.id} className="section-title">
                {column.title}
              </h2>
              <div className="mt-title">
                <dl className="ruled ruled-tight grid gap-title">
                  {column.items.map((item) => (
                    <div key={item.name}>
                      <dt className="item-title">{item.name}</dt>
                      <dd className="mt-1 max-w-measure text-body text-paper-2">
                        {item.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
