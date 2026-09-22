/**
 * How a visitor's choice of language travels: the footer link adds the
 * parameter, `proxy.ts` turns it into the cookie, and the cookie then wins over
 * the browser's own languages on every visit. Shared so the two cannot drift.
 */
export const LOCALE_PARAM = "lang";
export const LOCALE_COOKIE = "locale";
