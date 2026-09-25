"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

/**
 * After a client navigation, focus moves to the main content, so a keyboard
 * or screen reader user starts reading the new page rather than wherever the
 * old link was. ScrollTrigger measures the new document at the same time.
 * The first render is left alone: the browser has already placed focus.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const frame = requestAnimationFrame(() => {
      registerGsap();
      ScrollTrigger.refresh();
      document.getElementById("contenu")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
