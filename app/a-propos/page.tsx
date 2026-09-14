import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/content/media/razigue.png";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { BtnLabel } from "@/components/ui/primitives";
import {
  atouts,
  experiences,
  formation,
  interets,
  langues,
  parcours,
} from "@/content/about";
import { copy, presentation, site } from "@/content/site";

export const metadata: Metadata = {
  title: "À propos",
  description: presentation,
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos",
    description: presentation,
    url: "/a-propos",
  },
};

export default function AProposPage() {
  return (
    <>
      <PageHeader eyebrow="Parcours" title="À propos" sub={presentation} />

      {/* Portrait + the longer-form story */}
      <Stage className="band" stagger={0.09}>
        <div className="section-body-tight mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-24 lg:px-10">
          <div className="prose-fr max-w-measure text-body">
            {parcours.map((paragraph, index) => (
              <p key={paragraph} data-choreo="lines" data-choreo-order={index}>
                {paragraph}
              </p>
            ))}
          </div>

          <Reveal variant="mask" order={9} className="portrait h-fit">
            <Image
              src={portrait}
              alt={`Portrait de ${site.name}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </Stage>

      {/* Expériences */}
      <Stage aria-labelledby="experiences-title" stagger={0.08}>
        <div className="section-body-tight mx-auto max-w-page px-6 lg:px-10">
          <Reveal
            variant="fade"
            as="h2"
            order={0}
            id="experiences-title"
            className="eyebrow"
          >
            Expériences
          </Reveal>

          <ol className="zebra -mx-5 mt-12 grid">
            {experiences.map((experience) => (
              <li
                key={experience.role}
                data-choreo="rise"
                className="grid gap-3 px-5 py-9 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12"
              >
                <div>
                  <p className="tnum font-mono text-micro tracking-meta text-paper-3">
                    {experience.period}
                  </p>
                  <p className="mt-2 font-mono text-micro tracking-meta text-paper-3">
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
      </Stage>

      {/* Formation, langues, CV */}
      <Stage aria-labelledby="formation-title" className="band" stagger={0.08}>
        <div className="section-body-tight mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-3 lg:gap-16 lg:px-10">
          <div>
            <Reveal
              variant="fade"
              as="h2"
              order={0}
              id="formation-title"
              className="eyebrow"
            >
              Formation
            </Reveal>
            <Reveal variant="rise" order={1} className="mt-6">
              <p className="font-display text-h3 leading-tight tracking-tight text-paper">
                {formation.title}
              </p>
              <p className="mt-3 text-body text-paper-2">
                {formation.credential}
              </p>
              <ul className="mt-5 grid gap-1 font-mono text-micro tracking-meta text-paper-3">
                <li>{formation.school}</li>
                <li>{formation.place}</li>
                <li className="tnum">{formation.period}</li>
                <li className="tnum">{formation.detail}</li>
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal variant="fade" as="h2" order={2} className="eyebrow">
              Langues
            </Reveal>
            <Reveal variant="rise" order={3} className="mt-6">
              <dl className="zebra -mx-4 grid">
                {langues.map((langue) => (
                  <div
                    key={langue.name}
                    className="flex items-baseline justify-between gap-4 px-4 py-3"
                  >
                    <dt className="text-body text-paper">{langue.name}</dt>
                    <dd className="font-mono text-micro tracking-meta text-paper-3">
                      {langue.level}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div data-print="hide">
            <Reveal variant="fade" as="h2" order={4} className="eyebrow">
              Document
            </Reveal>
            <Reveal variant="rise" order={5} className="mt-6">
              <a href={site.cvUrl} download className="btn">
                <BtnLabel>{copy.cvButton}</BtnLabel>
              </a>
            </Reveal>
          </div>
        </div>
      </Stage>

      {/* Atouts, and what fills the rest of the time */}
      <Stage aria-labelledby="atouts-title" stagger={0.08}>
        <div className="section-body-tight mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          {[
            { id: "atouts-title", title: "Atouts", items: atouts },
            { id: "interets-title", title: "Au-delà du code", items: interets },
          ].map((column, columnIndex) => (
            <div key={column.id}>
              <Reveal
                variant="fade"
                as="h2"
                order={columnIndex * 2}
                id={column.id}
                className="eyebrow"
              >
                {column.title}
              </Reveal>
              <Reveal variant="rise" order={columnIndex * 2 + 1} className="mt-6">
                <dl className="zebra -mx-4 grid">
                  {column.items.map((item) => (
                    <div key={item.name} className="grid gap-1 px-4 py-4">
                      <dt className="text-body text-paper">{item.name}</dt>
                      <dd className="text-meta text-paper-3">{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          ))}
        </div>
      </Stage>
    </>
  );
}
