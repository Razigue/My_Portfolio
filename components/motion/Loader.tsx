"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { signalReady } from "@/lib/ready";

/**
 * The opening curtain.
 *
 * It exists so the first frame the visitor sees is deliberate rather than a
 * flash of un-choreographed content: the server sends the page complete, GSAP
 * takes ownership a moment later, and this covers the seam.
 *
 * It is rendered `display: none` and only revealed by `html.js`, a class the
 * blocking <head> script adds. With scripting off it never appears at all, so
 * it can never trap the page behind a curtain that will not lift.
 */
export function Loader({ name }: { name: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      registerGsap();

      const finish = () => {
        gsap.set(el, { display: "none" });
        signalReady();
      };

      const fill = el.querySelector("[data-loader-fill]");
      const inner = el.querySelector("[data-loader-inner]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-loader-panel]", el);

      const tl = gsap.timeline({ onComplete: finish });

      tl.fromTo(
        inner,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "cine" },
      )
        .to(
          fill,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.85,
            ease: "power2.inOut",
          },
          0.1,
        )
        .to(inner, { opacity: 0, y: -14, duration: 0.35, ease: "cineIn" }, ">-0.05")
        .to(
          panels,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "cine",
            stagger: { each: 0.055, from: "start" },
          },
          "<0.05",
        );

      // Do not hold the page hostage to a font that never arrives.
      const bail = window.setTimeout(() => {
        if (tl.isActive()) tl.progress(1);
      }, 2600);

      return () => window.clearTimeout(bail);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="loader"
      aria-hidden="true"
      data-print="hide"
      role="presentation"
    >
      <div className="loader-panels">
        <span data-loader-panel />
        <span data-loader-panel />
        <span data-loader-panel />
        <span data-loader-panel />
      </div>

      {/* Progress is the name filling with gold from the left, not a hairline
          with a bar crawling along it. The whole curtain is aria-hidden, so
          setting the word twice is never announced twice. */}
      <div className="loader-inner" data-loader-inner>
        <p className="loader-mark">
          {name}
          <span className="loader-mark-fill" data-loader-fill>
            {name}
          </span>
        </p>
      </div>
    </div>
  );
}
