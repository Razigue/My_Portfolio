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

export function StatusDot({
  status,
  labels,
}: {
  status: "live" | "archived";
  labels: { readonly statusLive: string; readonly statusArchived: string };
}) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span
        className={`dot ${status === "live" ? "dot-live" : "dot-archived"}`}
        aria-hidden="true"
      />
      <span className="type-label text-paper-3">
        {status === "live" ? labels.statusLive : labels.statusArchived}
      </span>
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-control bg-ink-3 px-3 py-1.5 type-label text-paper-2">
      {children}
    </li>
  );
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
