"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { pathFor, type Locale } from "@/lib/i18n";

function isActive(pathname: string, href: string, home: string): boolean {
  if (href === home) return pathname === home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Short enough to stay a mark rather than a stripe, long enough to find. */
const MIN_THUMB = 26;

export type HeaderLabels = {
  readonly navLabel: string;
  readonly menuOpen: string;
  readonly menuClose: string;
  readonly toTop: string;
  readonly themeToDay: string;
  readonly themeToNight: string;
};

/**
 * The header, the read position and the back-to-top button.
 *
 * The read position runs down the right-hand margin rather than sitting in the
 * header, an equal distance from top, right and bottom. It is a readout and not
 * a control: nothing to grab, nothing to drag.
 *
 * It is a mark that travels, not a fill that grows. A fill says one thing, the
 * fraction passed. A mark says two, because it has a length as well as a
 * position: the window's share of the page, and where in the page you are. On a
 * page where several sections are a full screen each, the first is the more
 * useful fact.
 */
export function SiteHeader({
  locale,
  name,
  links: items,
  labels,
}: {
  locale: Locale;
  name: string;
  links: readonly { readonly href: string; readonly title: string }[];
  labels: HeaderLabels;
}) {
  const pathname = usePathname();
  const home = pathFor(locale, "home");
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const toTop = useRef<HTMLButtonElement>(null);

  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Close the mobile overlay after a navigation.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  // Escape closes it too.
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

  // The read position, the header's ground and the back-to-top, all driven by
  // the scroll position: one listener, at most one update per frame. The mark
  // is moved on every frame; the three attributes are only written when their
  // value changes, since each write restyles the elements that carry them.
  useEffect(() => {
    const bar = header.current;
    const track = rail.current;
    const mark = thumb.current;
    if (!bar) return;

    /** How far the mark can travel, measured on resize, never per frame. */
    let travel = 0;
    let frame = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let heading = 0;
    let scrolled: boolean | null = null;
    let deep: boolean | null = null;
    let live: boolean | null = null;
    let settle = 0;
    let idle = 0;

    const measure = () => {
      if (!track || !mark) return;
      const trackHeight = track.getBoundingClientRect().height;
      const documentHeight = document.documentElement.scrollHeight;

      // The mark is as long, against the margin, as the window is against
      // the page. A short mark on a long page is the honest reading of a
      // long page.
      const share =
        documentHeight > 0 ? window.innerHeight / documentHeight : 1;
      const height = Math.min(
        trackHeight,
        Math.max(MIN_THUMB, trackHeight * share),
      );

      mark.style.height = `${height}px`;
      travel = Math.max(0, trackHeight - height);
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const now = performance.now();
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const progress = room > 0 ? Math.min(1, Math.max(0, y / room)) : 0;
      const velocity = ((y - lastY) / Math.max(1, now - lastTime)) * 1000;
      const direction = Math.sign(y - lastY);
      lastY = y;
      lastTime = now;

      if (mark) {
        // Position is set outright. The stretch eases through a transition
        // in globals.css, so it can settle after the scrolling stops: faster
        // scrolling draws the mark out behind itself, and at rest it goes
        // back to its true length, the one that means something.
        mark.style.translate = `0 ${progress * travel}px`;
        mark.style.scale = `1 ${1 + Math.min(0.45, Math.abs(velocity) / 11000)}`;
        window.clearTimeout(settle);
        settle = window.setTimeout(() => {
          mark.style.scale = "1 1";
        }, 140);

        if (direction !== 0 && direction !== heading) {
          heading = direction;
          mark.style.transformOrigin =
            heading > 0 ? "center bottom" : "center top";
        }
      }

      // Far enough down that getting back is a chore worth sparing.
      const isDeep = y > window.innerHeight * 1.5;
      if (isDeep !== deep) {
        deep = isDeep;
        if (toTop.current) {
          toTop.current.dataset.shown = isDeep ? "true" : "false";
        }
      }

      const isScrolled = y > 24;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        bar.dataset.scrolled = isScrolled ? "true" : "false";
      }

      // Present only while the page moves: a position is worth reporting
      // while it changes, and is a dash in the margin once it does not.
      const show = (value: boolean) => {
        if (value === live) return;
        live = value;
        if (track) track.dataset.live = value ? "true" : "false";
      };

      window.clearTimeout(idle);
      if (isScrolled && direction !== 0) {
        show(true);
        idle = window.setTimeout(() => show(false), 850);
      } else if (!isScrolled) {
        show(false);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    // The page's own height decides the mark's length, and it changes as
    // fonts and images arrive, not only when the window does.
    const growth = new ResizeObserver(remeasure);
    growth.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.clearTimeout(idle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      growth.disconnect();
    };
  }, [pathname]);

  const links = items.map((item) => {
    const active = isActive(pathname, item.href, home);
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`navlink ${active ? "is-active" : ""}`}
        >
          {/* One column per letter, each holding the letter twice, so the
              columns can turn over left to right. The current page is that
              same mechanism left finished, which is why nothing is drawn under
              it. Hidden from assistive technology and restated once, so the
              accessible name is the word rather than eight characters. */}
          <span className="navlink-kinetic" aria-hidden="true">
            {[...item.title].map((letter, index) => (
              <span
                key={index}
                className="navlink-col"
                style={{ "--i": index } as React.CSSProperties}
              >
                <span className="navlink-face">
                  {letter === " " ? " " : letter}
                </span>
                <span className="navlink-face navlink-face-alt">
                  {letter === " " ? " " : letter}
                </span>
              </span>
            ))}
          </span>
          <span className="sr-only">{item.title}</span>
        </Link>
      </li>
    );
  });

  return (
    <>
      <header
        ref={header}
        data-print="hide"
        data-scrolled="false"
        className="site-header fixed inset-x-0 top-0 z-50"
      >
        <div className="site-header-bar mx-auto flex max-w-page items-center justify-between gap-6 px-6 lg:px-10">
          {/* The accessible name starts with the two letters actually on
              screen, so that a spoken « RB » still matches what is visible. */}
          <Link href={home} className="wordmark">
            <span aria-hidden="true">RB</span>
            <span className="sr-only">RB, {name}</span>
          </Link>

          <div className="flex items-center gap-6 lg:gap-9">
            <nav aria-label={labels.navLabel} className="hidden lg:block">
              <ul className="navrow">{links}</ul>
            </nav>

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
                  <ul className="grid gap-4">{links}</ul>
                </div>
              </details>
            </nav>

            <ThemeToggle
              toDay={labels.themeToDay}
              toNight={labels.themeToNight}
            />
          </div>
        </div>
      </header>

      <div
        ref={rail}
        className="site-progress"
        data-print="hide"
        data-live="false"
        aria-hidden="true"
      >
        <span ref={thumb} className="site-progress-thumb" />
      </div>

      {/* Hidden rather than merely transparent while it is not offered, so it
          is never a tab stop that lands on nothing. */}
      <button
        ref={toTop}
        type="button"
        onClick={backToTop}
        className="to-top"
        data-print="hide"
        data-shown="false"
      >
        {/* Two copies, so the arrow can leave through the top while the second
            follows it in from below. Same mechanism as the nav letters. */}
        <span className="to-top-roll" aria-hidden="true">
          <span className="to-top-face">↑</span>
          <span className="to-top-face to-top-face-alt">↑</span>
        </span>
        <span className="sr-only">{labels.toTop}</span>
      </button>
    </>
  );
}
