"use client";

import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getLenis } from "@/components/motion/SmoothScroll";
import { gsap, quickSetter, registerGsap, ScrollTrigger } from "@/lib/gsap";
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
  /** How far the mark can travel, cached so no layout is read per frame. */
  const travel = useRef(0);

  function backToTop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const measure = useCallback(() => {
    const track = rail.current;
    const mark = thumb.current;
    if (!track || !mark) return;

    const trackHeight = track.getBoundingClientRect().height;
    const documentHeight = document.documentElement.scrollHeight;

    // The mark is as long, against the margin, as the window is against the
    // page. A short mark on a long page is the honest reading of a long page.
    const share = documentHeight > 0 ? window.innerHeight / documentHeight : 1;
    const height = Math.min(trackHeight, Math.max(MIN_THUMB, trackHeight * share));

    mark.style.height = `${height}px`;
    travel.current = Math.max(0, trackHeight - height);
  }, []);

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

  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;
      registerGsap();

      let scrolled: boolean | null = null;
      let deep: boolean | null = null;
      let live: boolean | null = null;
      let heading = 0;
      let settle = 0;
      let idle = 0;

      measure();

      // Both go through GSAP so position and stretch compose into one matrix
      // rather than fighting over `transform`. Position is set outright; the
      // stretch is tweened, so it can settle after updates stop.
      const setY = thumb.current
        ? quickSetter(thumb.current, "y", "px")
        : null;
      const setStretch = thumb.current
        ? gsap.quickTo(thumb.current, "scaleY", {
            duration: 0.5,
            ease: "power3",
          })
        : null;

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          // Written to the element's own transform. A custom property on :root
          // reads better but invalidates the whole document's computed style
          // once per frame.
          if (setY && setStretch) {
            setY(self.progress * travel.current);

            // Faster scrolling draws the mark out behind itself; at rest it
            // settles back to its true length, which is the one that means
            // something.
            setStretch(1 + Math.min(0.45, Math.abs(self.getVelocity()) / 11000));

            // A glide decays on its own; a jump does not. The page arrives in
            // one frame, updates stop, and the mark keeps whatever length it
            // was drawn out to. This puts it back.
            window.clearTimeout(settle);
            settle = window.setTimeout(() => {
              setStretch(1);
            }, 140);

            if (self.direction !== heading) {
              heading = self.direction;
              gsap.set(thumb.current, {
                transformOrigin:
                  heading > 0 ? "center bottom" : "center top",
              });
            }
          }

          // Far enough down that getting back is a chore worth sparing.
          const isDeep = self.scroll() > window.innerHeight * 1.5;
          if (isDeep !== deep) {
            deep = isDeep;
            if (toTop.current) {
              toTop.current.dataset.shown = isDeep ? "true" : "false";
            }
          }

          // Only on a real change: setting an attribute every frame
          // invalidates the styles of both elements for nothing.
          const isScrolled = self.scroll() > 24;
          if (isScrolled !== scrolled) {
            scrolled = isScrolled;
            el.dataset.scrolled = isScrolled ? "true" : "false";
          }

          // Present only while the page moves: a position is worth reporting
          // while it changes, and is a dash in the margin once it does not.
          const show = (value: boolean) => {
            if (value === live) return;
            live = value;
            if (rail.current) rail.current.dataset.live = value ? "true" : "false";
          };

          window.clearTimeout(idle);
          if (isScrolled) {
            show(true);
            idle = window.setTimeout(() => show(false), 850);
          } else {
            show(false);
          }
        },
      });

      // The page's own height decides the slices, so they are re-cut whenever
      // ScrollTrigger recomputes: a resize, a font landing, an image arriving.
      ScrollTrigger.addEventListener("refreshInit", measure);

      return () => {
        window.clearTimeout(settle);
        window.clearTimeout(idle);
        ScrollTrigger.removeEventListener("refreshInit", measure);
        trigger.kill();
      };
    },
    { scope: header, dependencies: [pathname] },
  );

  const links = items.map((item) => {
    const active = isActive(pathname, item.href, home);
    return (
      <li key={item.href}>
        <TransitionLink
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
        </TransitionLink>
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
          <TransitionLink href={home} className="wordmark">
            <span aria-hidden="true">RB</span>
            <span className="sr-only">RB, {name}</span>
          </TransitionLink>

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
                <div className="menu-panel">
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
