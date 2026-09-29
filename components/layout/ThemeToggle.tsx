"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { INK, INK_LIGHT } from "@/lib/palette";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

/**
 * The colour the browser paints its own bar in, on a phone. The two
 * `theme-color` tags follow the operating system through their `media`
 * queries; once the visitor has picked a theme, both follow that instead.
 */
function paintBrowserBar(dark: boolean) {
  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )) {
    meta.content = dark ? INK : INK_LIGHT;
  }
}

/**
 * A switch, not a cycle: two positions. The operating system's preference
 * applies until the switch is touched. The icon shows what a press gives, a
 * moon by day and a sun by night, and which one is drawn comes from the
 * `dark` class the <head> script writes before first paint.
 */
export function ThemeToggle({
  toDay,
  toNight,
}: {
  toDay: string;
  toNight: string;
}) {
  // Follow the operating system for as long as nothing is stored.
  useEffect(() => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) {
      paintBrowserBar(document.documentElement.classList.contains("dark"));
    }
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        document.documentElement.classList.toggle("dark", query.matches);
        document.documentElement.style.colorScheme = query.matches
          ? "dark"
          : "light";
      }
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function flip() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    root.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
    paintBrowserBar(dark);
  }

  return (
    <button
      type="button"
      onClick={flip}
      className="lightswitch btn btn-sm btn-icon"
    >
      <span className="theme-say inline-flex" data-when="light">
        <Icon name="moon" />
      </span>
      <span className="theme-say inline-flex" data-when="dark">
        <Icon name="sun" />
      </span>
      <span className="sr-only theme-say" data-when="dark">
        {toDay}
      </span>
      <span className="sr-only theme-say" data-when="light">
        {toNight}
      </span>
    </button>
  );
}
