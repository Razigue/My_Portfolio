export function Eyebrow({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & Record<string, unknown>) {
  return (
    <p className={`eyebrow ${className ?? ""}`} {...rest}>
      {children}
    </p>
  );
}

/**
 * A project's frame and state, as one line of text: « Projet d’école,
 * équipe de 5, en ligne ». No badge and no dot: the words say it, and « en
 * ligne » alone takes the full text colour.
 */
export function ProjectMeta({
  context,
  status,
  labels,
  className,
}: {
  context: string | null;
  status: "live" | "local" | "archived";
  labels: {
    readonly statusLive: string;
    readonly statusLocal: string;
    readonly statusArchived: string;
  };
  className?: string;
}) {
  return (
    <p className={`type-label text-paper-3 ${className ?? ""}`}>
      {context ? `${context}, ` : null}
      {status === "live" ? (
        <span className="font-medium text-paper">{labels.statusLive}</span>
      ) : status === "local" ? (
        labels.statusLocal
      ) : (
        labels.statusArchived
      )}
    </p>
  );
}

export function Tag({
  children,
  proven = false,
}: {
  children: React.ReactNode;
  /** A technology a published project uses: set in the full text colour. */
  proven?: boolean;
}) {
  return <li className={`tag ${proven ? "tag-proven" : ""}`}>{children}</li>;
}

/**
 * External links always announce that they open elsewhere, and always carry the
 * `rel` pair. `data-print-url` makes the destination visible on paper.
 */
export function ExternalLink({
  href,
  children,
  className,
  label,
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Read by assistive tech in place of the visible text, when it is terser. */
  label?: string;
  /** That the link opens a new tab, said in the language of the page. */
  newTab: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // An `aria-label` replaces everything inside the link, the new-tab
      // mention below included, so a label has to carry that mention too.
      aria-label={label ? `${label} (${newTab})` : undefined}
      data-print-url
      className={className ?? "link"}
    >
      {children}
      <span className="sr-only"> ({newTab})</span>
    </a>
  );
}
