# Instructions for an agent working on this project

This is Razigue Benhmida's portfolio (he/him): a bilingual site for a
full-stack web developer looking for a 12-month alternance from September 2026.
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

These are the art direction, and nothing enforces them. The verification harness
that used to was instrumentation, and it was not shipped. If you change styling,
you are the only check.

1. **There is not one line on this site.** No border, no rule, no divider, no
   underline, no text-stroke, no frame around a button or a field. No hyphen,
   middot or pipe used as layout punctuation either. Four exceptions exist and
   none of them separates anything: the focus ring, the read-position mark in
   the right margin, a 1px clip that hides text visually while leaving it in
   the accessibility tree, and the borders a Windows contrast theme needs to
   show where a field or a button is, drawn only under `forced-colors` and
   never in either of the site's own themes.
2. **Nothing is set in capitals.** No `uppercase`, no `capitalize`, no small
   caps, anywhere. Acronyms stay acronyms — HTML, PHP, JWT, RNCP. The `RB`
   monogram is the site's mark.
3. **A capture is shown as it is.** `.shot` is the only container a project
   capture gets: overflow, rounded corners, a ground while it loads. No window,
   no title bar, no border, no shadow: the title bar with three dots that used
   to sit above each screen was removed at Razigue's request as a mockup
   trope, so do not bring it back. An image marked `cutout: true` in
   `content/projects.ts` has no ground behind it. No capture reacts to hover:
   Razigue asked for that. It deliberately does not carry the portrait's grayscale filter —
   that exists to keep one photograph from pulling the composition off neutral,
   and a screenshot has to report the interface's own colours. On the home
   page the projects sit side by side, each with its interface (`image`, or
   `thumbnail` when it has none) above its one-sentence `summary`; the artwork
   and the scenery open its own page.
4. **One accent, and the two themes do not share it.** Pale gold at night, dark
   orange by day. The daylight value is capped by contrast arithmetic against
   `--ink-3`; see the README before touching it.
5. **Every colour lives in `app/globals.css`.** ESLint rejects a colour literal
   in any `.ts` or `.tsx`. The one exception is `lib/palette.ts`, for the three
   surfaces that render without a stylesheet.
6. **No invented facts.** No metric, date, duration, team size, client name or
   outcome that is not already in the CV, on GitHub, or in the existing content.
   A project's `highlights` and its `summary` may only restate what its
   `description` or `stack` already says. The AI note (`ia`), the About
   page's `devise` and the apprenticeship section (`recherche`), all in
   `content/about.ts`, hold only what Razigue said on 2026-09-27, in his words
   or close to them: add to them only from him. `approach`, the long-form account rendered under « La
   démarche » as titled sections (`title`, `paragraphs`), is the one place a
   choice may be explained at length — it is
   still held to the same rule: a recruiter opening the repo has to find what
   the page claims.
7. **Nothing that can be counted is typed.** The project count, the years the
   index spans, the projects named under each skill domain, the sentence the
   index quotes from each description — all derived. If
   you find yourself typing a number that describes the data, you are about to
   make it wrong at the next edit.
8. **`null` renders nothing.** Never a disabled link, a `mailto:#`, a greyed
   button or « bientôt ». An absence has to read as a decision.
9. **Every gap is one of five steps.** `app/globals.css` defines them as
   `--spacing-label`, `-title`, `-block`, `-gutter` and `-section`, and
   Tailwind turns them into `mt-label`, `mt-title`, `mt-block`,
   `gap-x-gutter`, `py-section` and so on. Choose the step by what the gap
   separates: a label and what it names, a heading and its text, two blocks
   of one section, two columns, two sections. Numeric utilities are only for
   the inside of a component, a tag or a dot and its word. Every page opens
   with `.page-head`, every section is padded by `.section-body`, and a last
   section on the page's own ground drops its bottom padding so the footer
   sits one section away, not two. No project gets a rhythm of its own:
   Razigue asked for one spacing everywhere.
10. **One face: Geist.** Headings, reading text, labels, buttons and the
    social cards are all set in Geist, a sans-serif; `font-display`,
    `font-sans` and `font-mono` all name it. The `RB` monogram, in the header
    and in the favicon, is the one thing set in Newsreader. When Razigue asked
    for a "mono font" he meant one single font, not a monospace: he wants it
    readable and professional, "pas quelque chose de fantaisie juste pour
    respecter un thème". Do not add a second face, never an expressive one,
    and no monospace. Nothing is set in italics.

---

## Things that look like mistakes and are not

Leave these alone unless Razigue asks, and say why if you think he should.

- **`phone: null`** in `content/site.ts`. The number is on the CV PDF and is kept
  out of the markup deliberately, to avoid scraping.
- **`prefers-reduced-motion` is not honoured.** Removed on purpose. Do not
  reintroduce it as a courtesy.
- **There is no loader, no route curtain, no smooth scrolling, no film grain,
  no footer watermark and no numbered sections.** Razigue had them removed so
  the site reads as information rather than a showcase. Only a technology
  list still animates, as it arrives on screen. Do not bring the others back
  as polish.
- **The native scrollbar is hidden**, and the gold mark in the right margin
  replaces it. It is a display, not a control: nothing to grab, nothing to drag.
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
at 320px wide. The technology lists rise the first time they come on screen,
so a full-page screenshot catches the ones below the fold on their first,
invisible frame; step down the page a screen at a time instead.

Report what you changed and what you did not. If something in the request could
not be done honestly — a claim that needs a number nobody has, a link that does
not resolve — say so plainly rather than filling the gap.
