import { Eyebrow, ExternalLink } from "@/components/ui/primitives";

export function PageHeader({
  eyebrow,
  title,
  titleLink,
  sub,
  media,
  backdrop,
  centered = false,
  children,
}: {
  /** Omitted, the header opens on the title. */
  eyebrow?: string;
  title: string;
  titleLink?: { href: string; newTab: string };
  sub?: string;
  /**
   * Set beside the title on wide screens, under it otherwise. The header is a
   * page's opening frame, so what goes here has to be worth as much room as
   * the title itself — in practice, a capture of the thing the page is about.
   *
   * Its track takes up to 40rem and gives way before the title does: the title
   * track floors at `min-content`, because a page title is usually one or two
   * words and a word cannot wrap out of a column too narrow for it.
   */
  media?: React.ReactNode;
  /** Laid behind the whole header, from one edge of the screen to the other. */
  backdrop?: React.ReactNode;
  /**
   * Sets the label and the title halfway down the header, with as much ground
   * above them, counted from the top of the page, as below them. For a header
   * that is nothing but its title: the default padding leaves room for a line
   * under it, and without one the title reads as sitting low.
   */
  centered?: boolean;
  children?: React.ReactNode;
}) {
  const heading = (
    <h1
      className={`${eyebrow ? "mt-block " : ""}block font-display text-h2 leading-display tracking-display text-paper`}
    >
      {title}
    </h1>
  );

  return (
    <header
      className={backdrop ? "relative isolate overflow-hidden" : undefined}
    >
      {backdrop}
      <div
        className={`page-head page-width ${
          centered ? "page-head-centered" : ""
        }`}
      >
        {/* Two tracks only when there is something to put in the second one,
            so every other page keeps the markup it had. */}
        <div
          className={
            media
              ? "grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(min-content,1fr)_minmax(0,40rem)] lg:items-end"
              : undefined
          }
        >
          <div>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

            {titleLink ? (
              <ExternalLink
                href={titleLink.href}
                newTab={titleLink.newTab}
                className="block w-fit"
              >
                {heading}
              </ExternalLink>
            ) : heading}

            {sub ? (
              <p className="mt-title max-w-measure text-lede text-paper-2">
                {sub}
              </p>
            ) : null}
          </div>

          {media ? (
            <div>{media}</div>
          ) : null}
        </div>

        {children}
      </div>
    </header>
  );
}
