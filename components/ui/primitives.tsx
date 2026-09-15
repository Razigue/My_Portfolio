import type { ElementType } from "react";

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
 * A chapter mark: the ordinal set large in gold, the name in mono directly
 * under it, and nothing between the two. Stacked rather than set on one line,
 * so that position does the separating and every section gets an opening heavy
 * enough to register while scrolling past.
 */
export function SectionLabel({
  ordinal,
  children,
  as: Tag = "p",
  className,
  ...rest
}: {
  ordinal?: string;
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
} & Record<string, unknown>) {
  return (
    <Tag className={`chapter ${className ?? ""}`} {...rest}>
      {ordinal ? (
        <span className="chapter-ordinal tnum">{ordinal}</span>
      ) : null}
      <span className="chapter-name">{children}</span>
    </Tag>
  );
}

/**
 * The two stacked copies of a button label. The first is the real text, the
 * second is `aria-hidden`, so the accessible name is exactly one copy of the
 * words no matter what the hover state is doing.
 */
export function BtnLabel({ children }: { children: string }) {
  return (
    <span className="btn-swap">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
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
      <span className="font-mono text-micro tracking-meta text-paper-3">
        {status === "live" ? labels.statusLive : labels.statusArchived}
      </span>
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-ink-3 px-3 py-1.5 font-mono text-micro tracking-meta text-paper-2 transition-colors duration-300 hover:bg-flare hover:text-ink">
      {children}
    </li>
  );
}

export function TagList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
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
      aria-label={label}
      data-print-url
      className={className ?? "link"}
    >
      {children}
      <span className="sr-only"> ({newTab})</span>
    </a>
  );
}
