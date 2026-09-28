"use client";

import { usePathname } from "next/navigation";
import { LOCALE_PARAM } from "@/lib/locale-choice";
import { LANGUAGE_TAGS, otherLocale, translatePath, type Locale } from "@/lib/i18n";

/**
 * The way to the same page in the other language, in the footer, written as
 * that language's own name: « English » on a French page, « Français » on an
 * English one. Most visitors never need it, since `proxy.ts` already served
 * the language their browser asks for; this is for the ones it guessed wrong.
 *
 * The parameter tells `proxy.ts` that the visitor chose, so the choice is kept
 * for the next visits instead of being overruled by the browser again.
 *
 * A plain anchor rather than a Next <Link>: each language has its own root
 * layout, and the browser loads the other one in full whatever the link does.
 */
export function LocaleSwitch({
  locale,
  label,
}: {
  locale: Locale;
  /** The other language's name, in that language. */
  label: string;
}) {
  const pathname = usePathname();
  const to = otherLocale(locale);
  const tag = LANGUAGE_TAGS[to].html;

  return (
    <a
      href={`${translatePath(pathname, to)}?${LOCALE_PARAM}=${to}`}
      hrefLang={tag}
      lang={tag}
      className="link tap-area"
    >
      {label}
    </a>
  );
}
