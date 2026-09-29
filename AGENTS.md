# Instructions for an agent working on this project

This is Razigue Benhmida's portfolio (he/him): a bilingual site for a
full-stack web developer looking for a 12-month alternance, starting as soon as possible.
French is the default, at the root; English mirrors every page under `/en`.

Razigue is the owner. He may not read code, and he is the one who has to live
with whatever you leave behind. Prefer the change he could have made himself.

**Write your replies to him in French.** Everything in `content/` is French
because he reads it, except `content/en/`, which is the English site's text.
Everything else — code, identifiers, comments — is English.

---

## What you will almost always be asked to do

Add a project, edit one, change a piece of text. All of it lives in `content/`,
and none of it requires touching a component.

`MODIFIER.md` is the same instructions written for Razigue. Read it — it is
shorter than this file and it is the contract you are working to. If he asks for
something it covers, do exactly what it says.

| File | Holds |
| --- | --- |
| `content/projects.ts` | the projects, and `featuredSlugs`: the only ones published anywhere; the rest are a reserve with no page |
| `content/site.ts` | identity, availability, every interface label |
| `content/about.ts` | the long-form story, the About page's motto (`devise`) and apprenticeship section (`recherche`), experience, education, languages, strengths, interests, the home page's principles, skill domains and AI note (`ia`) |
| `content/en/site.ts`, `content/en/about.ts` | the English words of the two files above, key for key and entry for entry |
| `content/en/projects.ts` | the English words of each published project, keyed by slug; facts stay in `content/projects.ts` |
| `content/check.ts` | the rules that stop a bad edit; read before editing content |
| `lib/i18n.ts` | the two languages, their path segments (`/projets` and `/en/projects`), `fill()` for `{placeholders}` |
| `lib/content.ts` | `getContent(locale)`: what a page reads; English is the French facts with the English words laid over them |
| `content/media/razigue.png` | the portrait, imported as a module, not from `public/` |
| `content/media/*.png` | project captures, imported the same way and set on `image` |
| `public/cv-razigue-benhmida.pdf` | the downloadable CV |

No rendered string is written anywhere else. If you are hunting for a phrase, it
is in one of those files.

---

## The rules that will stop your build

`content/check.ts` runs at import, so `npm run dev` and `npm run build` refuse
the edit rather than publishing a wrong page. Every string under `content/` goes
through it. The messages are French, name the field, and say what to do.

It rejects: an empty string where prose is expected, a duplicate or malformed
slug, a project marked `status: "live"` with no `demo` (and the reverse), a URL
that is not absolute, a featured slug that matches no project, a straight
apostrophe or quote in French text, and an ordinary space against `:` `;` `!`
`?` or inside `« »`.

For the English files it also rejects: a key present in one language and not
the other (the types do that), a list with a different number of entries than
its French twin, a published project with no entry in `content/en/projects.ts`,
a subtitle, team, approach, diagram or image description present in only one
language, and French punctuation in English text — any space before `:` `;`
`!` `?`, or `« »`.

The French no-break space is the only rule that is hard to satisfy blind. French wants a
no-break space there, it is invisible in the file, and it will not survive being
retyped. **Write `\u00A0` in the string.** TypeScript reads it as the character:

```ts
description: "Trois services\u00A0: vote, worker, result.",
```

Existing content uses the literal character in places. Both work. Do not
"normalise" one into the other.

---

## Rules the build will not stop you breaking

The visual system was redesigned on 2026-09-29: every earlier rule was reopened
("tout rouvrir sauf les faits") and the site became the developer portfolio,
played straight and finished carefully, for HR first and tech leads second.
`DESIGN.md` records it with its tokens; change a token in `app/globals.css`
or a rule here, and update it too. Nothing below is enforced by a check.

1. **Facts only.** No metric, date, duration, team size, client name or
   outcome that is not already in the CV, on GitHub, or in `content/`. A
   project's `highlights` and `summary` restate its `description`, `stack` or
   `approach`. The AI note (`ia`), the `devise` and the apprenticeship section
   (`recherche`), all in `content/about.ts`, hold only what Razigue said, in his
   words or close to them; the `ia.headings` only name what each
   paragraph already says.
2. **Nothing that can be counted is typed.** The project count, the projects
   named under each skill domain, the index's sentences are all derived.
3. **`null` renders nothing.** Never a disabled link, a `mailto:#`, a greyed
   button or « bientôt ».
4. **Every colour lives in `app/globals.css`.** ESLint rejects a colour
   literal in any `.ts` or `.tsx`, except `lib/palette.ts` for the surfaces
   that render without a stylesheet (social images, favicon, `theme-color`,
   manifest). Light is the default theme; `:root.dark` swaps the tokens.
   Blue (`--color-flare`) is the one accent. Green (`--color-live`) is
   declared and reserved: no component uses it, and a state is said in words
   (« en ligne » in medium full ink), never with a dot.
5. **Type: Geist only.** No monospace or terminal-style font, not even for
   dates or technology names (dates use `.data`, tabular figures). A second
   family is only a deliberate pairing Razigue asks for. Headings at 600 with tight tracking; nothing under 14px except the two
   letters of the header badge.
6. **No AI-slop tells** (researched on 2026-09-29, see `DESIGN.md`): no pill
   or label above a heading, no pulsing dot, no icon in a tinted tile, no
   accent glow or gradient text, no grid of identical cards for prose (use a
   hairline-ruled list), no emoji or text glyph standing in for an icon (use
   `components/ui/Icon.tsx`), no em dash in the copy, no « passionné »,
   « n’hésitez pas », « véritable » or « not X but Y » phrasing.
7. **Cards are for things you open or look up**: a project, the facts beside
   a project, the contact channels. One elevation per element: a border, or a
   shadow under the pointer, never both at rest.
8. **Motion is one entrance** (`.rise`, staggered with `--i`) on the opening
   of a page, plus hover states. Do not add scroll-triggered reveals.
9. **A capture is shown as it is**: `.shot`, rounded, a 1px ring, no window
   chrome. Portrait in colour.

## Things that look like mistakes and are not

Leave these alone unless Razigue asks, and say why if you think he should.

- **`phone: null`** in `content/site.ts`. The number is on the CV PDF and is kept
  out of the markup deliberately, to avoid scraping.
- **`prefers-reduced-motion` is not honoured.** Removed on purpose. Do not
  reintroduce it as a courtesy.
- **There is no loader, no route curtain, no smooth scrolling, no film grain
  and no numbered sections.** Do not bring them back as polish.
- **Six repository links point at personal mirrors**, not at the
  `EpitechWebAcademiePromo2027` organisation, which 404s for every visitor.
  Repointing them "back" would break them.
- **The contact form sends through FormSubmit when there is no Resend key.**
  With `RESEND_API_KEY` it uses Resend; without it, it posts to FormSubmit's
  JSON endpoint for `CONTACT_TO_EMAIL`, or `site.email`. FormSubmit forwards
  nothing until that mailbox has clicked the activation link it mails on the
  first submission, and until then the form says it is not set up and gives
  the email address. It must never fake a send.
- **`site.url` is `https://razigue.com`** and the domain is not wired up yet.
  That is Razigue's to do, outside this project. Do not "fix" it to a localhost
  origin or to whatever host it happens to be deployed on: it feeds
  `metadataBase`, the canonical URLs, the sitemap and the social images, and it
  is meant to name the final address. See `TODO.md` §1.
- **There is no `app/layout.tsx`.** Each language has its own root layout,
  `app/(fr)/layout.tsx` and `app/en/layout.tsx`, so that `<html lang>` names
  the language on screen; both render `components/layout/RootDocument.tsx`.
  Moving between languages is a full page load, which is why the language
  link in the footer is a plain anchor and not a Next `<Link>`. With no single layout, a URL that
  matches nothing is answered by `app/global-not-found.tsx`, in both
  languages, behind `experimental.globalNotFound` in `next.config.ts`.
- **The language is chosen by `proxy.ts`, not by the header.** A visitor is
  redirected to the language their browser asks for (English when it names
  neither French nor English); a request with no `Accept-Language`, which is
  what crawlers send, is never redirected. The footer link, written as the
  other language's own name, adds `?lang=` so the proxy stores the choice in a
  cookie that then wins. There is no flag, on purpose.
- **The English CV buttons say « in French ».** There is only a French CV. Do
  not drop the mention unless an English PDF is added.
- **The contact email's subject stays French** whichever page it was sent
  from, with « (version anglaise) » when it came from `/en`: Razigue reads it,
  the visitor does not.

---

## Before you tell him it is done

```bash
npm run typecheck
npm run lint
npm run build
```

All three silent. `npm run build` is the one that matters — it runs the content
checks and it is exactly what runs on deploy.

If you changed anything visual, also look at it: `npm run dev`, both themes, and
at 320px wide. The opening of each page rises in once; wait a second before a
screenshot, or it catches the first, invisible frame.

Report what you changed and what you did not. If something in the request could
not be done honestly — a claim that needs a number nobody has, a link that does
not resolve — say so plainly rather than filling the gap.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
