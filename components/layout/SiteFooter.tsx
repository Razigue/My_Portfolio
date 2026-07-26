import { Scrub } from "@/components/motion/Scrub";
import { Stage } from "@/components/motion/Stage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, ExternalLink } from "@/components/ui/primitives";
import { buildInfo } from "@/lib/build-info";
import { copy, site } from "@/content/site";

export function SiteFooter() {
  return (
    <Stage
      as="footer"
      data-print="hide"
      className="relative isolate overflow-hidden"
      stagger={0.08}
    >
      {/* The watermark name is absolutely placed at the bottom edge, so the
          bottom padding here is what keeps the metadata clear of it. */}
      <div className="mx-auto max-w-page px-6 pb-32 pt-28 sm:pb-40 lg:px-10 lg:pb-56 lg:pt-40">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal variant="fade" as={Eyebrow} order={0}>
              Écrivez-moi
            </Reveal>
            <Reveal
              variant="chars"
              as="p"
              order={1}
              className="mt-5 font-display text-h3 tracking-tight text-paper"
            >
              {site.email}
            </Reveal>
          </div>

          <Reveal variant="rise" order={2}>
            <ul className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-micro tracking-meta text-paper-3">
              <li>
                <ExternalLink href={site.github}>GitHub ↗</ExternalLink>
              </li>
              <li>
                <a href={site.cvUrl} download className="link">
                  CV (PDF) ↓
                </a>
              </li>
              {site.linkedin ? (
                <li>
                  <ExternalLink href={site.linkedin}>LinkedIn ↗</ExternalLink>
                </li>
              ) : null}
              {site.sourceRepo ? (
                <li>
                  <ExternalLink href={site.sourceRepo}>
                    {copy.sourceLink}
                  </ExternalLink>
                </li>
              ) : null}
            </ul>
          </Reveal>
        </div>

        {/* Each figure is a labelled term, not three strings run together. */}
        <div className="mt-24 flex flex-col gap-6 font-mono text-micro tracking-meta text-paper-3 sm:flex-row sm:items-baseline sm:justify-between">
          <Reveal variant="fade" as="p" order={3}>
            {site.name}
          </Reveal>
          <Reveal variant="fade" order={4}>
            <dl className="flex flex-wrap gap-x-8 gap-y-2">
              <div className="flex gap-2">
                <dt>Next.js</dt>
                <dd className="tnum text-paper-2">{buildInfo.next}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Build</dt>
                <dd className="tnum text-paper-2">{buildInfo.date}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Lieu</dt>
                <dd className="text-paper-2">{buildInfo.place}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      {/* The name slides sideways under the page as the bottom arrives. */}
      <Scrub
        className="wordmark-slot"
        from={{ xPercent: 5 }}
        to={{ xPercent: -5 }}
        start="top bottom"
        end="bottom bottom"
      >
        <p className="footer-wordmark" aria-hidden="true">
          {site.name}
        </p>
      </Scrub>
    </Stage>
  );
}
