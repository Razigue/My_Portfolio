"use client";

/**
 * Route choreography: the outgoing page is covered, the route changes behind
 * the curtain, then the curtain sweeps away and the incoming page plays its own
 * intros. Panels enter from below and exit through the top, so a navigation
 * reads as one continuous upward movement rather than a cover-and-uncover.
 *
 * Every link still works if any of this fails: TransitionLink renders a real
 * <Link>, and only calls preventDefault when a provider is actually present.
 */

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/components/motion/SmoothScroll";

type Navigate = (href: string, label?: string) => void;

const TransitionContext = createContext<Navigate | null>(null);

export function useRouteTransition(): Navigate | null {
  return useContext(TransitionContext);
}

const PANELS = 5;

export function TransitionProvider({
  children,
  labels,
}: {
  children: React.ReactNode;
  labels: Readonly<Record<string, string>>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const firstRender = useRef(true);
  const bailTimer = useRef(0);

  const uncover = useCallback(() => {
    const el = curtain.current;
    if (!el) return;
    const panels = gsap.utils.toArray<HTMLElement>("[data-curtain-panel]", el);
    const label = el.querySelector("[data-curtain-label]");

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(el, { display: "none" });
          ScrollTrigger.refresh();
          document.getElementById("contenu")?.focus({ preventScroll: true });
        },
      })
      .to(label, { opacity: 0, y: -12, duration: 0.28, ease: "cineIn" })
      .to(
        panels,
        {
          yPercent: -100,
          duration: 0.72,
          ease: "cine",
          stagger: { each: 0.055, from: "end" },
        },
        "-=0.12",
      );
  }, []);

  const navigate = useCallback<Navigate>(
    (href, label) => {
      if (href === pathname) return;
      registerGsap();

      const el = curtain.current;
      if (!el) {
        router.push(href);
        return;
      }

      pending.current = href;

      const panels = gsap.utils.toArray<HTMLElement>("[data-curtain-panel]", el);
      const labelEl = el.querySelector("[data-curtain-label]");
      if (labelEl) labelEl.textContent = label ?? labels[href] ?? "";

      gsap
        .timeline()
        .set(el, { display: "grid" })
        .fromTo(
          panels,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.62,
            ease: "cine",
            stagger: { each: 0.055, from: "start" },
          },
        )
        .fromTo(
          labelEl,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.34, ease: "cine" },
          "-=0.26",
        )
        .call(() => router.push(href));

      // If the route never commits, do not leave the visitor staring at a wall.
      window.clearTimeout(bailTimer.current);
      bailTimer.current = window.setTimeout(() => {
        if (pending.current) {
          pending.current = null;
          uncover();
        }
      }, 4000);
    },
    [labels, pathname, router, uncover],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Back / forward: no curtain was raised, so just let ScrollTrigger
    // re-measure the new document and keep the browser's restored position.
    if (!pending.current) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    pending.current = null;
    window.clearTimeout(bailTimer.current);

    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      uncover();
    });
  }, [pathname, uncover]);

  useEffect(() => () => window.clearTimeout(bailTimer.current), []);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        ref={curtain}
        className="curtain"
        aria-hidden="true"
        data-print="hide"
      >
        <div className="curtain-panels">
          {Array.from({ length: PANELS }, (_, i) => (
            <span key={i} data-curtain-panel />
          ))}
        </div>
        <p className="curtain-label" data-curtain-label />
      </div>
    </TransitionContext.Provider>
  );
}
