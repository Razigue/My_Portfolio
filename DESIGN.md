---
name: Razigue Benhmida, portfolio
description: The developer portfolio played straight and finished to the last pixel, by day and by night.
colors:
  # Daylight (the default theme; what the utilities compile against)
  day-ground: "#fafaf9"
  day-band: "#f3f3f1"
  day-raised: "#e9e9e6"
  day-card: "#ffffff"
  day-hairline: "#e4e4e0"
  day-hairline-strong: "#cfcfca"
  day-ink: "#0b0b0d"
  day-ink-secondary: "#3f3f46"
  day-ink-muted: "#62626a"
  day-signal-blue: "#2851e0"
  day-on-blue: "#ffffff"
  day-live-green: "#157a3c"
  day-error-red: "#b42318"
  # Night (:root.dark)
  night-ground: "#09090b"
  night-band: "#0e0e11"
  night-raised: "#1b1b20"
  night-card: "#111114"
  night-card-hover: "#151519"
  night-hairline: "#232329"
  night-hairline-strong: "#34343c"
  night-ink: "#f4f4f5"
  night-ink-secondary: "#babac2"
  night-ink-muted: "#8e8e98"
  night-signal-blue: "#86a2ff"
  night-on-blue: "#09090b"
  night-live-green: "#4ade80"
  night-error-red: "#ff8a80"
typography:
  display:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.75rem, 2rem + 3.4vw, 5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 1.9rem + 2.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.875rem, 1.6rem + 1.2vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.25rem, 1.18rem + 0.3vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  item-title:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.979rem + 0.093vw, 1.0625rem)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.125rem, 1.07rem + 0.25vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.979rem + 0.093vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.3
  label:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0em"
  data:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
    fontFeature: "tnum"
rounded:
  mark: "0.25rem"
  badge: "0.5rem"
  control: "0.625rem"
  shot: "0.875rem"
  card: "1.125rem"
  panel: "1.5rem"
  pill: "9999px"
spacing:
  label: "0.75rem"
  title: "1.25rem"
  block: "clamp(2rem, 1.6rem + 1.6vw, 3rem)"
  gutter: "clamp(1.5rem, 0.8rem + 3vw, 4rem)"
  section: "clamp(4.5rem, 3.4rem + 4.6vw, 8rem)"
  header: "4rem"
  page-inline: "1.25rem"
  page-inline-wide: "2rem"
components:
  button-solid:
    backgroundColor: "{colors.day-ink}"
    textColor: "{colors.day-ground}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0.55rem 1.15rem"
    height: "2.75rem"
  button-solid-hover:
    backgroundColor: "{colors.day-signal-blue}"
    textColor: "{colors.day-on-blue}"
  button:
    backgroundColor: "{colors.day-card}"
    textColor: "{colors.day-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0.55rem 1.15rem"
    height: "2.75rem"
  button-hover:
    backgroundColor: "{colors.day-raised}"
    textColor: "{colors.day-ink}"
  button-small:
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.35rem 0.85rem"
    height: "2.25rem"
  button-icon:
    backgroundColor: "{colors.day-card}"
    textColor: "{colors.day-ink}"
    rounded: "{rounded.control}"
    size: "2.75rem"
  input-field:
    backgroundColor: "{colors.day-card}"
    textColor: "{colors.day-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.8rem 0.95rem"
  nav-link:
    textColor: "{colors.day-ink-secondary}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.8rem"
  nav-link-active:
    backgroundColor: "{colors.day-raised}"
    textColor: "{colors.day-ink}"
  project-meta:
    textColor: "{colors.day-ink-muted}"
    typography: "{typography.label}"
  project-meta-live:
    textColor: "{colors.day-ink}"
  tag:
    textColor: "{colors.day-ink-muted}"
    typography: "{typography.data}"
  tag-proven:
    textColor: "{colors.day-ink}"
  terms-card-title:
    textColor: "{colors.day-ink}"
    typography: "{typography.item-title}"
    padding: "1rem 1.5rem"
  card:
    backgroundColor: "{colors.day-card}"
    rounded: "{rounded.card}"
  capture:
    backgroundColor: "{colors.day-raised}"
    rounded: "{rounded.shot}"
  feature-stage:
    backgroundColor: "{colors.day-raised}"
    padding: "1.75rem"
  wordmark-badge:
    backgroundColor: "{colors.day-ink}"
    textColor: "{colors.day-ground}"
    rounded: "{rounded.badge}"
    size: "2rem"
  closing-panel:
    backgroundColor: "{colors.night-ground}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)"
---

# Design System: Razigue Benhmida, portfolio

## Overview

**Creative North Star: "The Category Standard, Played Straight"**

This is the developer portfolio as the genre knows it (near-white page, near-black night, zinc neutrals, one confident blue, Geist throughout) executed at the top of its craft rather than reinvented. The first screen says who, on what terms, and that he is available; proof comes before prose. Confidence comes from finish: exact type, 1px hairlines, generous section rhythm, one authored entrance, and nothing decorative that a recruiter would have to read past.

Density is calm and editorial. Sections breathe on a large vertical rhythm, alternate between the page ground and a slightly darker band, and hold their content on a 74rem page with a 62ch reading measure. Structure is drawn with hairlines, not boxes: lists of prose are ruled, not tiled. Cards exist where a thing is an object you can open (a project, the terms strip, a fact panel), never as wrappers for paragraphs.

The system consciously refuses the tells of generated landing pages: badges and pills for status or metadata, status dots, glass headers and backdrop blur, chip-styled tags, icon tiles, accent glows and gradient text, and grids of identical cards for prose. State and metadata are said in words. Both themes are first-class; daylight is the default because recruiters read there.

**Key Characteristics:**
- Near-white day (#fafaf9) and near-black night (#09090b), zinc neutrals, one blue accent.
- State and metadata are words in a line of text: no pills, no badges, no status dots.
- Geist semibold headings with tight negative tracking over Geist body; one family, no monospace.
- 1px hairlines and hairline-ruled lists carry structure; cards only for openable objects.
- Drawn single-stroke SVG icons, sized to the text they sit in.
- One staggered entrance on the first screen; hover shadows on project cards, never a movement; nothing loops.

## Colors

A restrained zinc palette with one saturated blue for action and focus. Everything else is ink on ground.

### Primary
- **Signal Blue** (day #2851e0, night #86a2ff): links under the pointer, the solid button's hover ground, focus rings, text selection, the caret, check marks, timeline nodes, the wordmark badge on hover. Text set on it uses **On-Blue** (day #ffffff, night #09090b).

### Secondary
- **Error Red** (day #b42318, night #ff8a80): an invalid field's border, its 18% focus wash, and the error message under it. Nowhere else.

### Neutral
- **Ground** (day #fafaf9, night #09090b): the page.
- **Band** (day #f3f3f1, night #0e0e11): alternating sections, a project summary's capture header.
- **Raised** (day #e9e9e6, night #1b1b20): hover and active fill for buttons and nav links, the featured project's capture stage, the placeholder behind images.
- **Card** (day #ffffff, night #111114; hover #151519): cards, buttons, fields.
- **Hairline** (day #e4e4e0, night #232329): every 1px divider, card border, band edge, ruled list, the scrolled header's bottom edge.
- **Hairline Strong** (day #cfcfca, night #34343c): button and field borders, link underlines at rest, the timeline spine, the scrollbar thumb.
- **Ink** (day #0b0b0d, night #f4f4f5): headings, strong text, the solid button's ground, proven technology names, « en ligne ».
- **Ink Secondary** (day #3f3f46, night #babac2): body copy, ledes, nav links at rest, the availability window.
- **Ink Muted** (day #62626a, night #8e8e98): fact labels, dates, captions, project meta lines, technology names, placeholders.

### Reserved
- **Live Green** (day #157a3c, night #4ade80): still declared as `--color-live` in `app/globals.css`, used by no component since the status dots were removed. Kept documented as reserved and unused; it is not a license to bring a dot back.

The closing call panel always uses night values, in both themes (ground #09090b in day, lifted to #121216 with a hairline border in night so it still separates).

### Named Rules
**The One Blue Rule.** Blue is the only accent. It marks what responds (hover, focus, selection) and the check marks that prove a claim; it is never a fill for decoration, a gradient, a glow or a heading color.

**The Words Not Dots Rule.** A state is a word set in the text's own colors: « en ligne » in medium weight full Ink, availability as a heading row. No colored dot, pill or badge carries status; green has no component role.

**The One File Rule.** Every color literal lives in `app/globals.css`. The only mirror is `lib/palette.ts`, for surfaces with no cascade (social images, `theme-color`, the manifest), and it follows globals.css, never leads it.

## Typography

**Display Font:** Geist (with system-ui, -apple-system, sans-serif)
**Body Font:** Geist (same stack)
**No monospace face.** Dates and technology names are Geist too.

**Character:** One grotesque family doing all the work: semibold and tightly tracked at size so headings feel engineered, regular and open at body size so paragraphs read easily. Data is marked by size, colour and tabular figures, never by a second face.

### Hierarchy
- **Display** (600, clamp(2.75rem → 5rem), 1, -0.035em): the name on the home page only.
- **Page Title** (600, clamp(2.5rem → 4rem), 1.02, -0.035em): the title of every other page.
- **Headline** (600, clamp(1.875rem → 2.75rem), 1.15, -0.035em): section titles, the featured project's name, the closing call, the small-screen menu links.
- **Title** (600, clamp(1.25rem → 1.5rem), 1.15, -0.025em): parts inside a section (a project card's name, a timeline role, an AI-practice heading). Also the role line under the name, at weight 500.
- **Item Title** (600, body size, 1.4, -0.01em): the name of a list item (a skill domain, a strength, a language).
- **Lede** (400, clamp(1.125rem → 1.3125rem), 1.55): the sentence under a title, capped at 62ch.
- **Body** (400, clamp(1rem → 1.0625rem), 1.65): running text, max 62ch, `text-wrap: pretty`.
- **Control** (500, 0.9375rem, 1.3): the words of controls and compact facts: button labels, header nav links, the wordmark name (600, -0.01em), the term values in the hero's terms card.
- **Label** (500 or 400, 0.875rem, 1.45): fact labels, buttons at small size, footer links, captions. 14px is the floor: nothing on the site is smaller.
- **Data** (Geist 400, 0.875rem, tabular numerals): dates and periods, technology names.

### Named Rules
**The One Family Rule.** Geist sets everything. No monospace or terminal-style face anywhere, not even for dates, code-like names or labels. A second family is only ever a deliberate pairing decided with Razigue, never a mono.

**The Fourteen Floor Rule.** No text below 0.875rem (14px), anywhere, including legal lines and captions.

**The Sentence Case Rule.** Headings and labels are sentence case at their natural tracking; no uppercase kickers, no letter-spaced small caps.

## Layout

A centered page of 74rem max with 1.25rem side padding (2rem from 40rem up). Long text holds to a 62ch measure (about 70 characters of Geist).

Space comes from five named steps chosen by what a gap separates: **label** (0.75rem, a label and what it names), **title** (1.25rem, a heading and its text), **block** (clamp 2rem → 3rem, two blocks of a section), **gutter** (clamp 1.5rem → 4rem, two columns), **section** (clamp 4.5rem → 8rem, two sections). The sticky header is 4rem tall and scroll padding clears it.

Sections alternate between the ground and a band (Band fill with a hairline top and bottom). Two-column sections use asymmetric splits, most often 5/7 (title and link left, sticky on large screens; content right) or 7/5, collapsing to one column below 64rem. The hero is name, role, one sentence and the actions on the left, the portrait on the right (22rem column). Underneath, still in the first viewport on a laptop, the terms card: its title row states the availability, then four term cells reflow 4 → 2 → 1 columns with hairline dividers between them.

Breakpoints follow Tailwind's defaults as used: 40rem (sm), 48rem (md), 64rem (lg, where the header nav appears and the menu disclosure disappears).

### Named Rules
**The Ruled List Rule.** Prose collections (first-month tasks, AI practice, method principles, skills, strengths, interests) are hairline-ruled lists, one item per row, not grids of identical cards.

## Elevation & Depth

Mostly flat, depth by tone and hairline. Surfaces separate by ground (Ground → Band → Card) and 1px borders. A single soft shadow exists and is used sparingly: on the portrait at rest, on a project card as a hover response, and under the featured project's capture on its stage.

### Shadow Vocabulary
- **Lift, day** (`box-shadow: 0 1px 2px rgb(10 10 12 / 0.04), 0 12px 32px -12px rgb(10 10 12 / 0.14)`): portrait, project card on hover, featured capture.
- **Lift, night** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.3), 0 16px 40px -16px rgb(0 0 0 / 0.7)`): the same roles at night.
- **Capture ring** (`box-shadow: 0 0 0 1px var(--color-line)`): the hairline around a screenshot, drawn as a ring so it does not shift layout.
- **Field focus wash** (`box-shadow: 0 0 0 4px` Signal Blue at 16%): a focused text field only.

The sticky header sits on a solid page-colored ground (no translucency, no blur) and gains a bottom hairline only once the page has scrolled.

### Named Rules
**The Solid Ground Rule.** Every surface is opaque. No glass, no `backdrop-filter`, no translucent header or panel; a scrolled header shows its edge with a hairline, not a blur.

**The No Glow Rule.** No colored shadows, no accent glows, no gradient text, no gradient washes behind content. A capture brings its own color.

**The Hover Lift Rule.** Cards are flat at rest; a card that is a link never moves: it darkens its border to Hairline Strong and gains the Lift shadow under the pointer or focus.

## Shapes

Softly rounded, on a fixed scale tied to the element's size: 0.25rem (mark, kept in the scale), the wordmark badge 0.5rem, controls (buttons, fields, rail links, menu button) 0.625rem, screenshots 0.875rem, cards and the portrait 1.125rem, the closing panel 1.5rem, and full rounding only for the nav links' hover fill and the timeline's ring nodes. Borders are always 1px. Images are clipped by their container's radius; the portrait keeps its own 2:3 ratio.

## Components

### Buttons
Quiet, solid, and exact.
- **Shape:** gently rounded (0.625rem), min height 2.75rem, 1px border; label in the control size (0.9375rem, 500).
- **Solid (primary):** the ink color as a ground with ground-colored text; on hover or focus it turns Signal Blue with On-Blue text. One per group: « Me contacter », « Envoyer », the demo link.
- **Default:** Card fill, Hairline Strong border, Ink text; hover fills Raised.
- **Small:** 2.25rem high, 0.875rem text (the header's CV button).
- **Icon-only:** a 2.75rem square (2.25rem small), always with an accessible name (GitHub, LinkedIn, theme switch).
- **Motion:** press moves down 1px; a trailing arrow steps 3px right, an out-arrow steps up-right, a download arrow steps down (320ms, ease-out).

### Project Meta and Technology Names
There are no chips in this system.
- **Project meta line:** a project's frame and state as one line of 0.875rem Ink Muted text, placed under the title: « Projet d’école, équipe de 5, en ligne ». « en ligne » alone is medium weight in full Ink; « archivé » stays muted.
- **Technology names:** plain Geist words (0.875rem) in a wrapping row (1rem between words, 0.25rem between lines), Ink Muted. **Proven** names (used in a published project) take full Ink. No border, no background, no radius.

### Cards / Containers
- **Corner Style:** 1.125rem.
- **Background:** Card.
- **Shadow Strategy:** flat at rest; Lift on hover for link cards (see Elevation).
- **Border:** 1px Hairline.
- **Internal Padding:** 1.5rem to 2.5rem by breakpoint.
- **Use:** only for openable objects and fact panels: the featured project, project summaries, the terms strip, the formation and languages panels. A whole-card link uses a stretched link and moves its focus ring to the card; the title turns blue on hover.

### Inputs / Fields
- **Style:** Card fill, 1px Hairline Strong, 0.625rem corners, 0.8rem × 0.95rem padding, body-size text, blue caret.
- **Hover:** border darkens to Ink Muted.
- **Focus:** border turns Signal Blue with a 4px 16% blue wash; no outline.
- **Error:** border Error Red, focus wash in red at 18%, message below in medium 0.875rem red.
- **Form outcome:** the line under the send button is medium 0.875rem: full Ink for a success, Error Red for anything else. No green.

### Navigation
- **Header:** sticky, 4rem, solid page-colored ground, hairline bottom border once scrolled. Left, the wordmark: a 2rem Ink badge (0.5rem corners) carrying the « RB » mark in Geist 700 at 0.8125rem, -0.02em (a mark sized to its badge, not a type step), turning Signal Blue on hover; then the name in the control size at 600. Right, fully rounded nav links in the control size (Ink Secondary; hover and current page fill Raised with Ink text), a small CV button, the locale and theme switches.
- **Below 64rem:** a bordered « Menu » word button opens a full-screen panel on the ground with links at headline size, current page in Ink, others muted, rising in once.
- **Rail (project pages):** 0.625rem rounded links in Ink Muted; current section fills Raised.
- **Text links:** a 1px Hairline Strong underline at 0.28em offset; under the pointer word and underline turn blue. Standalone links (« Tous les projets ») drop the underline and carry an arrow that steps on hover.

### Feature Project (signature)
The first published project spans the page as one card split text-left, capture-right (1 : 1.5 from 64rem). The text side carries the name at headline size, the subtitle, the project meta line, a lede, proof points as a check list (blue drawn checks), the proven technology names, and its three destinations (solid demo button, repository button, case-study arrow link). The capture sits on a Raised-colored stage that runs to the card's edge, separated from the text by a 1px Hairline on its left edge (its top edge below 64rem), with the capture ring and Lift shadow. It is not a whole-card link.

### Terms Card (signature)
The card under the hero. Its title row, above a hairline, states the availability: « Recherche alternance 12 mois » in semibold Ink, then «, dès que possible » in regular Ink Secondary (body size, tight tracking, 1rem × 1.5rem padding). Below, four cells (rhythm, role, training, place), each a muted fact label over a medium value. This title row is the only place the home page states availability; there is no status line under the role. The contact page says it as a plain medium-weight sentence under its lede.

### Closing Call (signature)
A 1.5rem-rounded panel that is always night (in day it is a dark island; at night a slightly lifted one with a hairline). Headline capped at 18ch, lede, solid and default buttons, then a hairline and the email with a copy button. No availability line.

### Timeline
Dates in Geist, tabular figures, above each role; a 0.6rem ring node outlined in Signal Blue on the ground, joined by a 1px Hairline Strong spine.

### Icons
Drawn in one 1.75 stroke on a 24-unit grid (Lucide shapes, copied into `components/ui/Icon.tsx`), sized 1.05em to match their text, always decorative with the meaning carried by adjacent text or the control's name.

The case-study diagrams' pictograms (`components/projects/DiagramIcon.tsx`) follow the same stroke, caps and grid, at 2 to 2.25rem. A station is its pictogram in Ink over its label, with no tile or tint; a branch's pictogram is Ink Muted. The arrows between stations are the drawn arrows of `Icon.tsx`, in Ink Muted.

## Do's and Don'ts

### Do:
- **Do** keep every color in `app/globals.css` and use its role tokens (ground, band, raised, card, hairline, ink, blue); mirror to `lib/palette.ts` only for cascade-less surfaces.
- **Do** say state and metadata in words: availability as the terms card's title row, a project's frame and state as one meta line with « en ligne » in medium full Ink.
- **Do** separate prose items with 1px hairlines in a single ruled list; reserve cards for projects and fact panels.
- **Do** use icons only from `components/ui/Icon.tsx`, stroked, at 1.05em, beside text.
- **Do** set dates in Geist with tabular numerals (`.data`).
- **Do** keep text at 0.875rem or above, and body copy within 62ch.
- **Do** give the first screen its one staggered entrance (rise: 14px up, 6px blur, 900ms ease-out, 70ms per step) and let everything else simply be there.
- **Do** show both themes with equal care; test every surface in daylight first.

### Don't:
- **Don't** put a badge, pill or kicker above a heading.
- **Don't** use pills or badges for status or metadata.
- **Don't** use status dots, static or pulsing.
- **Don't** use glass or backdrop blur; headers and panels are opaque.
- **Don't** style technology names as chips: no border, background or radius around a tag.
- **Don't** place icons in tinted tiles or circles; an icon never gets its own background.
- **Don't** use accent glows, colored shadows, gradient text or gradient backgrounds.
- **Don't** lay prose content out as a grid of identical cards; use a hairline-ruled list.
- **Don't** use icon fonts, emoji or glyph characters as icons; only drawn SVG from `components/ui/Icon.tsx`.
- **Don't** add a monospace or terminal-style font, for anything.
- **Don't** introduce a second accent color; the reserved green has no component role.
- **Don't** set uppercase, letter-spaced labels.
