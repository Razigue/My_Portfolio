import { LANGUAGE_TAGS, type Locale } from "@/lib/i18n";

/**
 * The flag of the language the link leads to, never of the one being read: it
 * is a way out, so it shows where it goes. Its name is said in that language
 * too, which is what `lang` on the link is for.
 *
 * A plain anchor rather than a TransitionLink: each language has its own root
 * layout, and the browser loads the other one in full whatever the link does.
 */
export function LocaleSwitch({
  href,
  to,
  label,
}: {
  href: string;
  to: Locale;
  label: string;
}) {
  const tag = LANGUAGE_TAGS[to].html;

  return (
    <a href={href} hrefLang={tag} lang={tag} className="langswitch">
      <span className="langswitch-flag" aria-hidden="true">
        {to === "en" ? <UnionFlag /> : <FrenchFlag />}
      </span>
      <span className="sr-only">{label}</span>
    </a>
  );
}

/*
 * Both flags are drawn on the same 4:3 field and cropped to a disc by the
 * stylesheet. Every shape is a fill: the crosses are areas of colour, not
 * strokes. The colours are the flags' own, and live in globals.css.
 */

function UnionFlag() {
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" focusable="false">
      <path className="flag-uk-blue" d="M0 0h640v480H0z" />
      <path
        className="flag-white"
        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"
      />
      <path
        className="flag-uk-red"
        d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
      />
      <path className="flag-white" d="M241 0v480h160V0zM0 160v160h640V160z" />
      <path className="flag-uk-red" d="M0 193v96h640v-96zM273 0v480h96V0z" />
    </svg>
  );
}

function FrenchFlag() {
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" focusable="false">
      <path className="flag-white" d="M0 0h640v480H0z" />
      <path className="flag-fr-blue" d="M0 0h213.3v480H0z" />
      <path className="flag-fr-red" d="M426.7 0H640v480H426.7z" />
    </svg>
  );
}
