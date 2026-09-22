import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_PARAM } from "@/lib/locale-choice";
import { translatePath, type Locale } from "@/lib/i18n";

/**
 * Which language a visitor reads, decided before the page is rendered.
 *
 * A choice made with the link in the footer wins, and is kept in a cookie for
 * a year. Without one, the browser's own list of languages decides: the first
 * of French or English it names is the one served, and a visitor whose browser
 * names neither is served English, the language they are likelier to read. A
 * request that names no language at all, which is what crawlers send, is never
 * redirected, so each address stays indexed in its own language.
 */

const YEAR = 60 * 60 * 24 * 365;

function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en";
}

/** The first of French or English in an Accept-Language header, by weight. */
function negotiate(header: string | null): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      const weight = q ? Number(q.trim().slice(2)) : 1;
      return { tag, weight: Number.isNaN(weight) ? 0 : weight, index };
    })
    .filter(({ tag, weight }) => tag && weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  if (ranked.length === 0) return null;
  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return "en";
}

function localeOf(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();
  const current = localeOf(nextUrl.pathname);

  // The footer link: remember the choice, then land on a clean address.
  const chosen = nextUrl.searchParams.get(LOCALE_PARAM);
  if (isLocale(chosen)) {
    const target = nextUrl.clone();
    target.searchParams.delete(LOCALE_PARAM);
    target.pathname = translatePath(nextUrl.pathname, chosen);
    const response = NextResponse.redirect(target);
    response.cookies.set(LOCALE_COOKIE, chosen, {
      maxAge: YEAR,
      path: "/",
      sameSite: "lax",
    });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const wanted = isLocale(saved)
    ? saved
    : negotiate(request.headers.get("accept-language"));

  if (!wanted || wanted === current) return NextResponse.next();

  const target = nextUrl.clone();
  target.pathname = translatePath(nextUrl.pathname, wanted);
  const response = NextResponse.redirect(target);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: [
    {
      // Pages only: not the build's files, not the images, not the metadata
      // routes, not anything with a file extension.
      source:
        "/((?!_next/|api/|(?:en/)?(?:favicon|icon|apple-icon|manifest|robots|sitemap|opengraph-image|twitter-image)|.*\\.[a-z0-9]+$).*)",
      missing: [
        { type: "header", key: "next-action" },
        { type: "header", key: "rsc" },
      ],
    },
  ],
};
