"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { pathFor, type Locale } from "@/lib/i18n";

function isActive(pathname: string, href: string, home: string): boolean {
  if (href === home) return pathname === home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export type HeaderLabels = {
  readonly navLabel: string;
  readonly menuOpen: string;
  readonly menuClose: string;
  readonly themeToDay: string;
  readonly themeToNight: string;
  readonly cv: string;
  readonly cvShort: string;
};

/**
 * A sticky bar: the badge and the name at the left, the pages and the CV at
 * the right, and the theme switch. It draws its bottom edge once the page
 * has moved, so at the top the first screen reads as one piece.
 *
 * Under 64rem the pages go behind « Menu », a full-screen overlay driven by
 * <details>, so it opens without a script.
 */
export function SiteHeader({
  locale,
  name,
  links: items,
  labels,
  cvUrl,
}: {
  locale: Locale;
  name: string;
  cvUrl: string;
  links: readonly { readonly href: string; readonly title: string }[];
  labels: HeaderLabels;
}) {
  const pathname = usePathname();
  const home = pathFor(locale, "home");
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  // Close the mobile overlay after a navigation.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  // Escape closes it too, and gives focus back to its button.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // The bar's edge, drawn once the page has left the top.
  useEffect(() => {
    const bar = header.current;
    if (!bar) return;
    let frame = 0;
    let scrolled: boolean | null = null;
    const update = () => {
      frame = 0;
      const value = window.scrollY > 8;
      if (value === scrolled) return;
      scrolled = value;
      bar.dataset.scrolled = value ? "true" : "false";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  const links = items.map((item) => {
    const active = isActive(pathname, item.href, home);
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`navlink ${active ? "is-active" : ""}`}
        >
          {item.title}
        </Link>
      </li>
    );
  });

  return (
    <header
      ref={header}
      data-print="hide"
      data-scrolled="false"
      className="site-header"
    >
      <div className="site-header-bar page-width flex items-center justify-between gap-6">
        <Link href={home} className="wordmark">
          <span className="wordmark-badge" aria-hidden="true">
            RB
          </span>
          <span className="hidden sm:inline">{name}</span>
          <span className="sr-only sm:hidden">{name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label={labels.navLabel} className="hidden lg:block">
            <ul className="navrow">{links}</ul>
          </nav>

          <a
            href={cvUrl}
            download
            className="btn btn-sm ml-2 hidden lg:inline-flex"
          >
            <Icon name="download" />
            {labels.cvShort}
          </a>

          <nav aria-label={labels.navLabel} className="lg:hidden">
            <details ref={menu} className="disclosure">
              <summary className="menu-button">
                <span className="menu-word" data-menu-word="closed">
                  {labels.menuOpen}
                </span>
                <span className="menu-word" data-menu-word="open">
                  {labels.menuClose}
                </span>
              </summary>
              {/* A link to the page already on screen changes no pathname,
                  so the effect above never closes the overlay for it: it is
                  closed here instead, and focus goes back to its button. */}
              <div
                className="menu-panel"
                onClick={(event) => {
                  const link = (event.target as Element).closest("a");
                  if (link?.getAttribute("aria-current") !== "page") return;
                  if (menu.current) menu.current.open = false;
                  menu.current?.querySelector("summary")?.focus();
                }}
              >
                <ul className="grid gap-3">{links}</ul>
                <p>
                  <a href={cvUrl} download className="btn">
                    <Icon name="download" />
                    {labels.cv}
                  </a>
                </p>
              </div>
            </details>
          </nav>

          <ThemeToggle toDay={labels.themeToDay} toNight={labels.themeToNight} />
        </div>
      </div>
    </header>
  );
}
