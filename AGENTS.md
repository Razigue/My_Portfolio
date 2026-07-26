# Instructions for an agent working on this project

This is Razigue Benhmida's portfolio (he/him): a French-language site for a
full-stack web developer looking for a 14-month alternance from September 2026.

Razigue is the owner. He may not read code, and he is the one who has to live
with whatever you leave behind. Prefer the change he could have made himself.

**Write your replies to him in French.** Everything in `content/` is French
because he reads it. Everything else — code, identifiers, comments — is English.

---

## What you will almost always be asked to do

Add a project, edit one, change a piece of text. All of it lives in `content/`,
and none of it requires touching a component.

`MODIFIER.md` is the same instructions written for Razigue. Read it — it is
shorter than this file and it is the contract you are working to. If he asks for
something it covers, do exactly what it says.

| File | Holds |
| --- | --- |
| `content/projects.ts` | the projects, and which three the home page features |
| `content/site.ts` | identity, availability, every interface label |
| `content/about.ts` | the long-form story, experience, education, languages |
| `content/check.ts` | the rules that stop a bad edit; read before editing content |
| `content/media/razigue.png` | the portrait, imported as a module, not from `public/` |
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

That last one is the only rule that is hard to satisfy blind. French wants a
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
   middot or pipe used as layout punctuation either. Three exceptions exist and
   none of them separates anything: the focus ring, the read-position mark in
   the right margin, and a 1px clip that hides text visually while leaving it in
   the accessibility tree.
2. **Nothing is set in capitals.** No `uppercase`, no `capitalize`, no small
   caps, anywhere. Acronyms stay acronyms — HTML, PHP, JWT, RNCP. The `RB`
   monogram is the site's mark.
3. **One accent, and the two themes do not share it.** Pale gold at night, dark
   orange by day. The daylight value is capped by contrast arithmetic against
   `--ink-3`; see the README before touching it.
4. **Every colour lives in `app/globals.css`.** ESLint rejects a colour literal
   in any `.ts` or `.tsx`. The one exception is `lib/palette.ts`, for the three
   surfaces that render without a stylesheet.
5. **No invented facts.** No metric, date, duration, team size, client name or
   outcome that is not already in the CV, on GitHub, or in the existing content.
   A project's `highlights` may only restate what its `description` or `stack`
   already says. A recruiter opening the repo has to find what the page claims.
6. **Nothing that can be counted is typed.** The project count, the years the
   index spans, the per-technology counters, the row numbers — all derived. If
   you find yourself typing a number that describes the data, you are about to
   make it wrong at the next edit.
7. **`null` renders nothing.** Never a disabled link, a `mailto:#`, a greyed
   button or « bientôt ». An absence has to read as a decision.

---

## Things that look like mistakes and are not

Leave these alone unless Razigue asks, and say why if you think he should.

- **`phone: null`** in `content/site.ts`. The number is on the CV PDF and is kept
  out of the markup deliberately, to avoid scraping.
- **`prefers-reduced-motion` is not honoured.** Removed on purpose. Do not
  reintroduce it as a courtesy.
- **The native scrollbar is hidden**, and the gold mark in the right margin
  replaces it. It is a display, not a control: nothing to grab, nothing to drag.
- **Six repository links point at personal mirrors**, not at the
  `EpitechWebAcademiePromo2027` organisation, which 404s for every visitor.
  Repointing them "back" would break them.
- **The contact form has no success state without a key.** Without
  `RESEND_API_KEY` it says so and gives the email address. It must never fake a
  send.
- **`site.url` is `https://razigue.com`** and the domain is not wired up yet.
  That is Razigue's to do, outside this project. Do not "fix" it to a localhost
  origin or to whatever host it happens to be deployed on: it feeds
  `metadataBase`, the canonical URLs, the sitemap and the social images, and it
  is meant to name the final address. See `TODO.md` §1.

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
at 320px wide. The site is choreographed on scroll, so a full-page screenshot
catches half the elements mid-animation and tells you nothing; step down the
page a screen at a time instead.

Report what you changed and what you did not. If something in the request could
not be done honestly — a claim that needs a number nobody has, a link that does
not resolve — say so plainly rather than filling the gap.
