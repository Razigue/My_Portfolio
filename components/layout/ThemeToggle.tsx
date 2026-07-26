"use client";

import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

/**
 * A switch, not a cycle: two positions, and no third setting to step through.
 * The operating system's preference applies until the switch is touched, and
 * stops applying afterwards.
 *
 * Which position is drawn, and which of the two labels is in the accessible
 * tree, both come from the `dark` class. See `.lightswitch` in globals.css.
 */
export function ThemeToggle() {
  // Follow the operating system for as long as nothing is stored.
  useEffect(() => {
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
  }

  return (
    <button type="button" onClick={flip} className="lightswitch">
      <span className="lightswitch-disc" aria-hidden="true" />
      <span className="sr-only theme-say" data-when="dark">
        Passer en mode jour
      </span>
      <span className="sr-only theme-say" data-when="light">
        Passer en mode nuit
      </span>
    </button>
  );
}
