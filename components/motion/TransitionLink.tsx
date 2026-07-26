"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useRouteTransition } from "@/components/motion/TransitionProvider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Shown on the curtain during the transition; the route title otherwise. */
  curtainLabel?: string;
};

/**
 * A real <Link> that hands navigation to the curtain when one is available.
 * Modified clicks (new tab, new window, download) are left entirely alone, and
 * with scripting off this is just an anchor.
 */
export function TransitionLink({
  href,
  curtainLabel,
  onClick,
  children,
  ...rest
}: Props) {
  const navigate = useRouteTransition();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!navigate) return;
        if (event.defaultPrevented) return;
        if (event.button !== 0) return;
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href, curtainLabel);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
