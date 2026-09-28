import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/content/media/razigue.png";
import { PageHeader } from "@/components/layout/PageHeader";
import { BtnLabel } from "@/components/ui/primitives";
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
        <div className="section-body mx-auto grid max-w-page gap-x-gutter gap-y-block px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-10">
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
        <div className="section-body mx-auto max-w-page px-6 lg:px-10">
          <h2 id="recherche-title" className="eyebrow">
            {recherche.title}
          </h2>

          <div className="mt-label grid gap-x-gutter gap-y-block lg:grid-cols-2">
            <div>
              <h3 className="font-display text-lede leading-tight tracking-tight text-paper">
                {recherche.firstMonthTitle}
              </h3>
              <Points items={recherche.firstMonth} />
            </div>

            <div>
              <h3 className="font-display text-lede leading-tight tracking-tight text-paper">
                {recherche.learnTitle}
              </h3>
              <Points items={recherche.learn} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experiences-title" className="band">
        <div className="section-body mx-auto max-w-page px-6 lg:px-10">
          <h2 id="experiences-title" className="eyebrow">
            {copy.experiencesTitle}
          </h2>

          <ol className="mt-label grid gap-block">
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
                  <h3 className="font-display text-h3 leading-tight tracking-tight text-paper">
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
        <div className="section-body mx-auto grid max-w-page gap-x-gutter gap-y-block px-6 lg:grid-cols-3 lg:px-10">
          <div className="lg:col-span-2 lg:row-span-2">
            <h2 id="formation-title" className="eyebrow">
              {copy.formationTitle}
            </h2>
            <div className="mt-label">
              <p className="font-display text-h3 leading-tight tracking-tight text-paper">
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
            <h2 className="eyebrow">
              {copy.languagesTitle}
            </h2>
            <div className="mt-label">
              <dl className="zebra -mx-4 grid">
                {langues.map((langue) => (
                  <div key={langue.name} className="grid gap-1 px-4 py-3">
                    <dt className="text-body text-paper">{langue.name}</dt>
                    <dd className="text-meta text-paper-3">{langue.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div data-print="hide">
            <h2 className="eyebrow">
              {copy.documentTitle}
            </h2>
            <div className="mt-label">
              <a href={site.cvUrl} download className="btn">
                <BtnLabel>{copy.cvButton}</BtnLabel>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths, and what fills the rest of the time */}
      <section aria-labelledby="atouts-title" className="band">
        <div className="section-body mx-auto grid max-w-page gap-x-gutter gap-y-block px-6 lg:grid-cols-2 lg:px-10">
          {[
            { id: "atouts-title", title: copy.strengthsTitle, items: atouts },
            { id: "interets-title", title: copy.interestsTitle, items: interets },
          ].map((column) => (
            <div key={column.id}>
              <h2 id={column.id} className="eyebrow">
                {column.title}
              </h2>
              <div className="mt-label">
                <dl className="grid gap-title">
                  {column.items.map((item) => (
                    <div key={item.name}>
                      <dt className="text-body text-paper">{item.name}</dt>
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
