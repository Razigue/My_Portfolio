---
name: Razigue Benhmida, portfolio
description: A bilingual portfolio that reads like a well-kept application file.
colors:
  graphite-ink: "#08080a"
  graphite-band: "#0e0f12"
  graphite-lift: "#1a1d22"
  chalk: "#f4f3f0"
  chalk-secondary: "#c0bfba"
  chalk-muted: "#8b8a85"
  pale-gold: "#ecdcb0"
  signal-green-night: "#4ed9a4"
  warm-paper: "#f6f5f2"
  warm-paper-band: "#edebe6"
  warm-paper-lift: "#dedbd2"
  ink-black: "#121114"
  ink-secondary: "#3a3835"
  ink-muted: "#63605a"
  burnt-copper: "#8a3f04"
  signal-green-day: "#10693d"
typography:
  display:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.375rem, 1.75rem + 3.1vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.625rem, 1.4rem + 1.1vw, 2.375rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.5vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.42
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.15vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.01em"
  monogram:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.55rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  none: "0px"
  hairline: "1px"
  shot: "0.75rem"
  pill: "9999px"
spacing:
  label: "1rem"
  title: "1.5rem"
  block: "clamp(2.5rem, 1.75rem + 2vw, 4rem)"
  gutter: "clamp(2rem, 0.5rem + 4.5vw, 6rem)"
  section: "clamp(4.5rem, 3rem + 4.5vw, 7.5rem)"
  header: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.burnt-copper}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.05rem 1.8rem"
  button-primary-hover:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.warm-paper}"
  button-secondary:
    backgroundColor: "{colors.warm-paper-lift}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.05rem 1.8rem"
  button-secondary-hover:
    backgroundColor: "{colors.burnt-copper}"
    textColor: "{colors.warm-paper}"
  input-field:
    backgroundColor: "color-mix(in srgb, #121114 14%, #dedbd2)"
    textColor: "{colors.ink-black}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "1rem 1.1rem"
  tag:
    backgroundColor: "{colors.warm-paper-lift}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.375rem 0.75rem"
  link-hover:
    backgroundColor: "{colors.burnt-copper}"
    textColor: "{colors.warm-paper}"
  capture:
    backgroundColor: "{colors.warm-paper-band}"
    rounded: "{rounded.shot}"
  facts-panel:
    backgroundColor: "{colors.warm-paper-band}"
    rounded: "{rounded.shot}"
    padding: "2.5rem"
  back-to-top:
    backgroundColor: "{colors.burnt-copper}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
    size: "2.75rem"
  status-dot-live:
    backgroundColor: "{colors.signal-green-day}"
    rounded: "{rounded.pill}"
    size: "0.5rem"
---

# Design System: Razigue Benhmida, portfolio

## Overview

**Creative North Star: "The Well-Kept File"**

The site is an application file a recruiter can read in a few minutes: every fact in its place, labelled, and found at a glance. Nothing is there to perform. Hierarchy comes from size, tone and position, never from ornament: one face at three weights, labels in the accent, fields of tone and a few hairlines between parts, one warm accent against cool neutrals. The design earns trust the way a tidy dossier does, by being complete, consistent and easy to check.

Two themes carry the same file. By night it is chalk on graphite with a pale gold accent; by day, the theme most recruiters read in, it is near-black ink on warm paper with a burnt copper accent. Every colour is a role token (`--color-ink`, `--color-paper`, `--color-flare`…) that swaps between the two, so a component is written once. Motion is almost gone: what remains reports something (a header scrolling away, the reading position) and never delays reading.

The system rejects the showcase: no loader, no page curtain, no smooth scrolling, no film grain, no numbered sections, no window chrome around captures, no expressive or monospace face chosen to fit a theme.

**Key Characteristics:**
- One face, Geist, at 400 for reading, 500 for subheadings and facts, 600 for the title of an item; Newsreader only for the `RB` monogram.
- Separation by ground, and by a hairline where one part of a page ends and the next begins.
- One accent per theme, used sparingly: links on hover, the primary button, small markers.
- Rounded corners everywhere but the stack's tags; round only for status.
- Five spacing steps chosen by what a gap separates.
- Reading lines of 65 to 75 characters; no text under 14px.

## Colors

Cool, near-neutral grounds with a single warm accent per theme; the accent is the only warm thing on the page, which is what makes it read as an accent rather than a tint.

### Primary
- **Pale Gold** (`pale-gold`): the night accent, `--color-flare` in the dark theme. Link hover wash, the primary button, the focus ring, the reading mark, the back-to-top block, the small markers.
- **Burnt Copper** (`burnt-copper`): the day accent, `--color-flare` in the light theme. Same roles as Pale Gold. Its darkness is set by contrast arithmetic: it must clear 4.5:1 on the lift tone, where an index row sits under the pointer (it measures 5.43:1 there, 6.31:1 on a band, 6.90:1 on the page). A lighter orange fails the row it is read on.

### Secondary
- **Signal Green** (`signal-green-night`, `signal-green-day`): `--color-live`, only for the « en ligne » status dot and the form's success message.

### Neutral
- **Graphite Ink** (`graphite-ink`) / **Warm Paper** (`warm-paper`): `--color-ink`, the page ground by night / by day.
- **Graphite Band** (`graphite-band`) / **Warm Paper Band** (`warm-paper-band`): `--color-ink-2`, the ground of every other section, of odd index rows and of the facts panel.
- **Graphite Lift** (`graphite-lift`) / **Warm Paper Lift** (`warm-paper-lift`): `--color-ink-3`, the tone of a control (secondary button, tag, copy button) and of an index row under the pointer. By day it goes down in value: white on near-white is not a raised surface.
- **Chalk** (`chalk`) / **Ink Black** (`ink-black`): `--color-paper`, headings and primary text.
- **Chalk Secondary** / **Ink Secondary**: `--color-paper-2`, reading text and ledes.
- **Chalk Muted** / **Ink Muted**: `--color-paper-3`, metadata, the archived status dot. Its lowest measured contrast is 5.26:1 by day and 5.54:1 by night.

### Named Rules
**The Hairline Rule.** A line only ever separates: `.rule` (an `hr`) or `.ruled` (a list whose items each open on one), 1px in `--color-rule`, the text colour at 16%. Razigue asked for them on 2026-09-29 to mark where one thing ends and the next begins: between a project's header and its account, between the facts of a rail (a project page's and the contact page's) and the entries of a short list (the languages), and above the footer when a page ends on its own ground (after a band, the change of ground is enough). They are not systematic: a line marks a change of kind where the ground does not change, never every block (the parts of an account read straight through, their headings are enough). Never a border framing a box or a control, never an underline, never a text-stroke. The other lines are the focus ring, the reading mark, the 1px clip that hides text visually, and the borders a Windows contrast theme needs, drawn only under `forced-colors`.

**The One Accent Rule.** Each theme has exactly one accent, and the two themes do not share it. Gold holds up as a light mark on near-black; no light mark holds up on near-white, so day's accent is a dark copper.

**The Tokens-Only Rule.** Every colour literal lives in `app/globals.css`; ESLint rejects one anywhere else. `lib/palette.ts` is the single exception, for the three surfaces that render without a stylesheet (social images, `theme-color`, the manifest).

## Typography

**Display Font:** Geist (with system-ui, -apple-system, sans-serif)
**Body Font:** Geist (with the same stack)
**Label Font:** Geist (with the same stack)

**Character:** One plain sans-serif drawn for screens, readable and professional at every size. The owner asked for exactly that, rather than a face chosen to fit a theme. The `RB` monogram in Newsreader is the site's mark, not its text.

### Hierarchy
- **Display** (400, clamp(2.375rem → 4.5rem), line-height 0.86, tracking -0.035em): page titles and the name on the home page (set at line-height 1.02 there).
- **Headline** (400, clamp(1.625rem → 2.375rem), 1.02, -0.02em): section headings, project names on cards, roles in the experience list, the parts of a project's account.
- **Title** (400, clamp(1.25rem → 1.625rem), 1.42; 500 as a subheading, `.part-title`): subheadings, a project's description and the lede under a page title, reading at most 50ch.
- **Body** (400, clamp(1rem → 1.125rem), 1.65): reading text, capped at 50ch (65 to 75 characters in Geist; `ch` is the width of a zero, about 1.34 characters of French).
- **Label** (400, clamp(0.875rem → 0.9375rem), 1.45, tracking 0.01em): labels, metadata, buttons, tags, navigation. It is the smallest size on the site. A label (`.eyebrow`) is set in the accent, so the eye finds the labels first; what it names is a **fact** (`.fact-value`, weight 500, full text colour).
- **Item title** (`.item-title`, 600, body size, 1.4): the name of one item in a list or grid, a strength, a language, a station of a diagram, set apart by weight alone.

**The Three Weights Rule.** 400 for everything read, 500 for subheadings and facts, 600 for an item's title and `strong`. Weight marks what to read first; it never replaces a heading. Display and headline stay at 400.

**The Ruled Grid.** In a grid of equal items (the availability facts, the skill domains, the principles, the experiences), each item opens on a hairline (`.ruled-each`), the first row included; in a single column list, the items after the first do (`.ruled`).

### Named Rules
**The One Face Rule.** Geist sets everything; only the monogram is Newsreader. Never add a second face, never a monospace, never an expressive one. `font-display`, `font-sans` and `font-mono` are three names for Geist, kept so markup did not change.

**The Lowercase Rule.** Nothing is set in capitals: no `uppercase`, no `capitalize`, no small caps. Acronyms stay acronyms. Nothing is set in italics either.

**The 14px Floor.** No text is smaller than the label size, 14px on a phone and 15px on a wide screen.

## Layout

The page is a single column of sections within a 88rem container, padded 1.5rem on a phone and 2.5rem from 1024px. Sections alternate between the page ground and the band ground, full-bleed, and each opens with its heading. A fixed header bar, 5rem tall at the top of the page, tightens when the page scrolls; everything the browser scrolls into view for the keyboard stops 6rem below the top, clear of it.

Breakpoints are content-driven around the defaults: 640px (the portrait moves beside the name, facts go to two columns), 1024px (the desktop navigation replaces the menu, three columns of projects and facts, side columns on project and contact pages). Under 64rem the navigation is a full-screen overlay; under 30rem of height its words drop to the headline size so a landscape phone holds them.

### Named Rules
**The Five Steps Rule.** Every gap is one of five steps, chosen by what it separates: `label` (1rem) between a label and what it names, `title` (1.5rem) between a heading and its text, `block` (2.5 → 4rem) between blocks of a section, `gutter` (2 → 6rem) between columns, `section` (4.5 → 7.5rem) between sections. Numeric spacing is only for the inside of a component. No page gets a rhythm of its own.
**The One Edge Rule.** A project page has one reading column and one rail, the same from the header down. The header reads year, title, subtitle, description and highlights, with the facts in the rail beside them, then the project's capture across both (under the description on a phone); that capture is the place a video will go. Everything read in order (the description, the captures, the diagrams, the parts of « La démarche ») starts on the column's left edge, the title's edge; nothing is centred. Everything looked up (links, status, frame, stack, the list of parts, which stays in view as the account is read) sits in the rail on the right, 14 to 18rem wide. Inside a part, the heading, the text and what illustrates it are a `title` step apart; two parts are a `block` apart, with no line between them. Reading text is never hyphenated.

## Elevation & Depth

The system is flat and has no shadows at all. Depth is tonal layering, three grounds deep: the page, the band a section sits in, and the lift a control or a pointed row takes. By day the layers go down in value, by night up; either way a raised thing is a tone the page is not.

### Named Rules
**The Ground-Not-Shadow Rule.** Never a `box-shadow`, never a glass blur. If something must stand apart, give it a ground of its own.

## Shapes

Nothing has square corners, the stack's tags included. Captures, diagrams, the portrait and the facts panel on the home page are rounded at 0.75rem (`--radius-shot`); the wash behind a hovered link at 0.3rem; buttons, fields, the copy button, the stack's tags, the back-to-top block and the diagram's tiles at 0.5rem (`--radius-control`); the small accent markers (the availability marker, the items of a project's highlights) are softened at 0.15rem (`--radius-mark`), not made round. Round is reserved for status: the status dot and the theme switch's disc.

### Named Rules
**The Round-Means-Status Rule.** A circle says « this is a state ». Nothing else on the site is round.

## Components

Sober and precise: flat fields of colour with no outline, that never move; on hover only a fill rises.

Four shared classes in `app/globals.css` carry the structure every page repeats: `.page-width` (the page's width with its gutter, 1.5rem then 2.5rem from 1024px), `.section-title` (the headline role), `.part-title` (the title role) and `.type-label` (the label role).

### Buttons
- **Shape:** 0.5rem corners, padding 1.05rem 1.8rem, label size.
- **Primary:** the accent fill with page-colour text (Burnt Copper on Warm Paper by day). On hover or keyboard focus, a fill of the text colour rises from the bottom edge (420ms, cubic-bezier(0.16, 1, 0.3, 1)); the label stays where it is read.
- **Secondary:** the lift tone with text colour; the rising fill is the accent.
- **Disabled:** the label says what is happening (« Envoi… »); contrast is never dimmed.

### Chips (technology tags)
- **Style:** lift tone, secondary text, label size, 0.5rem corners, padding 0.375rem 0.75rem, in a wrapping row with 0.5rem gaps.
- **State:** none. A tag is not a control and does not react to the pointer. A list of tags does not move: it is simply there, like the text around it.

### Cards / Containers
- **Captures:** shown as they are, rounded 0.75rem, band ground only while loading; no window chrome, border or shadow, and no reaction to the pointer. A cutout artwork has no ground at all.
- **Facts panel:** band ground, 0.75rem corners, 1.5rem padding on a phone and 2.5rem from 640px; a heading and six labelled facts.
- **Project cards (home):** a card with a ground of its own on the band (`--color-card`, one step lighter than the band in both themes), 0.75rem corners, padded 1rem then 1.25rem. The whole card is one link, the title's, stretched over it (`.card`, `.stretch-link`): under the pointer the ground lightens a step further (`--color-card-hover`) and the title turns to the accent; the keyboard's ring goes round the card. The only links inside it lead elsewhere, the demo and the repository, above the stretched one. The capture itself does not react.
- **Index rows:** full-bleed bands, every other one lifted to the band tone, one tone further under the pointer, with the title in the accent and an arrow appearing on hover.

### Inputs / Fields
- **Style:** a filled trough, 0.5rem corners, body size, padding 1rem 1.1rem. Its fill is the lift tone with 14% of the text colour mixed in, about 1.55:1 against the band it sits on in both themes; the label above names it.
- **Focus:** the global 2px accent ring, offset 3px.
- **Error:** the field takes a 22% wash of the accent and the message under it states the problem; colour is never the only signal.

### Navigation
- **Desktop:** bare words at label size in muted text at the right of the bar. Pointing at a word turns it to the accent (180ms); the current page keeps the accent, so nothing is drawn under it.
- **Mobile:** the word « Menu » opens a full-screen overlay on the page ground, the four words at headline-to-display size; the page under it leaves the focus order, Escape closes it and returns focus.
- **Monogram and switch:** `RB` at the left, the theme switch (a gold or copper disc that becomes a crescent at night) at the right; both answer a tap over 44px. Their vertical centres are optically aligned on painted pixels, not on boxes.

### Links
- **Style:** text colour with no underline; internal links that lead to a page carry « → », external ones « ↗ » and say « nouvel onglet » to assistive technology.
- **Hover / Focus:** an accent wash sweeps in behind the word and the text takes the page colour.

### Reading mark
A 3px accent mark in the right margin, as long against the margin as the window is against the page, travelling with the scroll position; it never stretches. It shows only while the page moves and replaces the hidden native scrollbar. It is a readout, not a control.

## Do's and Don'ts

### Do:
- **Do** separate by ground: page, band (`--color-ink-2`), lift (`--color-ink-3`).
- **Do** take every colour from the role tokens in `app/globals.css`, so both themes follow.
- **Do** set everything in Geist and build hierarchy from the five sizes, the three text tones, the accent on labels and the three weights.
- **Do** keep reading text within 50ch and every text at 14px or more.
- **Do** choose every gap from the five spacing steps by what it separates.
- **Do** mark a link to a page with « → », an external link with « ↗ ».
- **Do** round every corner (controls 0.5rem, captures 0.75rem) except the stack's tags, and keep round for status only.

### Don't:
- **Don't** draw a line that frames or underlines: no border around a box, button or field, no underline, no text-stroke. A hairline between two parts is the only line that separates.
- **Don't** set anything in capitals, small caps or italics.
- **Don't** add a second typeface, a monospace or an expressive face.
- **Don't** use shadows, glass or blur.
- **Don't** wrap a capture in a window, a border, a shadow, or make it react to the pointer.
- **Don't** give the two themes the same accent, or lighten the day accent below its contrast cap.
- **Don't** bring back a loader, a page curtain, smooth scrolling, grain or numbered sections.
- **Don't** make text turn over, roll or duplicate itself on hover: a hover changes a colour or raises a fill, nothing more.
- **Don't** put a label above a heading that only repeats it.
