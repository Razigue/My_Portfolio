import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * The opening of every page but the home page: an optional way back, the
 * title, one sentence under it, and whatever the page adds beside or below.
 */
export function PageHeader({
  title,
  sub,
  back,
  aside,
  children,
}: {
  title: string;
  sub?: string;
  /** A link back up, above the title. */
  back?: { href: string; label: string };
  /** Set beside the title from a laptop up, under it otherwise. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-head page-width">
      {back ? (
        <p className="mb-8">
          <Link href={back.href} className="link-arrow type-label text-paper-2">
            <Icon name="arrowLeft" />
            {back.label}
          </Link>
        </p>
      ) : null}

      <div
        className={
          aside
            ? "grid items-end gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
            : undefined
        }
      >
        <div className="min-w-0">
          <h1 className="page-title rise">{title}</h1>
          {sub ? (
            <p className="section-lede rise" style={{ "--i": 1 } as React.CSSProperties}>
              {sub}
            </p>
          ) : null}
        </div>
        {aside ? <div className="rise" style={{ "--i": 2 } as React.CSSProperties}>{aside}</div> : null}
      </div>

      {children}
    </header>
  );
}
