# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters hiring a full-stack web apprentice, HR first. They sort applications in a few minutes, usually in the light theme, and need to find at once the terms of the apprenticeship, what Razigue has built (one sentence per project), his CV and a way to reach him.

Developers and tech leads come second. They open the project pages, the live demos and the repositories to judge the code and the reasoning behind it.

The site belongs to Razigue Benhmida (he/him), who edits its text himself through `content/` and `MODIFIER.md` and may not read code.

## Product Purpose

A bilingual portfolio, French at the root and English mirrored under `/en`, with one job: land Razigue a 12-month alternance (apprenticeship), starting as soon as possible. The role he targets is full-stack web developer (JavaScript / TypeScript first, then PHP and Java), six weeks in the company and two at school, anywhere in Paris and Île-de-France, remote accepted. He trains at the Web@cadémie by Epitech, 2025 to 2027, for the titre RNCP niveau 5 « Développeur intégrateur web ».

A visit succeeds when the recruiter does any of these:

- writes to him, through the contact form or his email address;
- opens a project, a live demo or a GitHub repository;
- downloads the CV.

## Positioning

What another apprentice's portfolio could not truthfully say:

- The thread, set on 2026-09-29 at his request: a logical mind, generative AI since 2022 (Midjourney, for his shop, before ChatGPT), and his training at the Web@cadémie from 2025, as agentic coding took off. He learns both sides: code written by hand to understand it (My Cinema), and an agent coding from a precise specification, everything tested (Tonecraft). The logic rests on what the site already shows (JeuVideOPS breakdown, BMAD specification, My Cinema), never on a new claim. The hero, the About story, the strengths, the method and the AI note carry it; the AI note follows the projects on the home page.
- He is a developer and a guitarist of about fifteen years, and he built Tonecraft on his own: a web app to learn a song on guitar and record yourself playing it, live and public. He uses it himself, and other guitarists try it and send him feedback every day.
- He ran an online shop alone for three years (January 2022 to December 2024), which taught him to look at a product from the user's side.
- He says plainly how he uses AI: Claude (Opus 5.5) and Claude Code, what he checks, and what he never delegates.

## Operating Context

- Recruiters judge him from the site, the CV PDF, the live demos and the GitHub repositories, then reach him by the contact form, email or LinkedIn.
- The contact form sends through Resend when a key is set and FormSubmit otherwise, and it never fakes a send. The email address has a copy button. The phone number is only in the CV PDF, kept out of the markup against scraping.
- The visitor's browser language picks French or English; a footer link switches and remembers the choice.
- Razigue changes the site by editing `content/`. `content/check.ts` refuses a bad edit at build time, and `npm run build` is what runs on deploy.

## Capabilities and Constraints

- Pages, in both languages: home, projects index, a page per published project, about, contact. Only the slugs in `featuredSlugs` (`content/projects.ts`) are published; the other projects are a reserve with no page.
- Every rendered string lives in `content/`. English mirrors French entry for entry in `content/en/`, and the checks refuse a gap.
- Terminology: « alternance » in French, "apprenticeship" in English. The role reads « Développeur web full-stack », with the languages in order of mastery under it: JavaScript / TypeScript, PHP, Java.
- `null` renders nothing, and nothing that can be counted is typed by hand (`AGENTS.md`).
- Left out at Razigue's request: any preference for a type of company (it would close doors), the phone number, and some past activities and schooling he chose not to show. Never add an experience, an interest, a level or a claim the site does not already state, from the CV or anywhere else, without asking him.
- Open, waiting on Razigue:
    - The CV PDF is older than the site and still lists some of what the site deliberately leaves out; he will update it. The site is the reference: nothing moves from the PDF to the site without him.
    - Tonecraft's amp captures come from the community; the site claims no model of his own unless he points to one in the repository.
    - `razigue.com` is the chosen domain and is not wired up yet (`TODO.md` §1).
    - There is no English CV; the English CV buttons say the PDF is in French.

## Brand Commitments

- Name: Razigue Benhmida. Role: « Développeur web full-stack ». Mark: the `RB` monogram.
- Voice: first person, plain and factual, in his words. His motto opens the About page: « Je saisis les occasions, je m’organise, et je vais au bout. »
- French typography is part of the voice and `content/check.ts` enforces it: curly apostrophes, a no-break space before `: ; ! ?` and inside « ».
- Visual direction: on 2026-09-29 every earlier visual rule was reopened, facts excepted ("tout rouvrir sauf les faits"), and the category-standard developer portfolio was chosen, executed at the top of its craft and free of AI-slop tells. `DESIGN.md` records the system. The `RB` mark survives as the header badge.
- Positioning chosen the same day, from the market: companies hire judgment, ownership and people who pilot AI without handing it their decisions, and a real project with users. Tonecraft carries that proof and leads the projects.
- Reference: a friend’s portfolio, kisukesaama.com, for its simplicity and how fast its information reads. Never copy its wording.

## Evidence on Hand

- **Tonecraft**: personal project, 2026. Live demo https://razigue.github.io/Tonecraft/, public repository https://github.com/Razigue/Tonecraft. Designed alone and developed with Claude Code and Opus 5.5 working as an agent, from specifications he built with the BMAD method; a first working version in two weeks, the v1 one week later. The amp captures are shared by the community (the repository credits `pelennor2170/NAM_models`, GPL v3); the cabinet, boost, correction and reverb are the project's own.
- **Overkill**: school project, 2026, a team of five over three weeks. Symfony API, React, PostgreSQL; his part is the offers and the favourites. Demo https://overkill.kisukesaama.com/, hosted by a classmate; no public repository link.
- **Corelab**: school project, 2026, a team of three, and the site says so and nothing more: no word of how the work was shared out in the end, at Razigue's request (2026-09-28). Express API, MongoDB; his part is the data models and the routes. Repository https://github.com/Razigue/Corelab; no demo.
- **CV**: `public/cv-razigue-benhmida.pdf`, French only, out of step with the site as noted above.
- **Images**: the portrait `content/media/razigue.png` and the project captures in `content/media/`.
- **Experience**: auto-entrepreneur, January 2022 to December 2024, AI-generated visuals made with Midjourney and sold on Etsy, clients found by word of mouth, a Discord server and commission-based platforms; green-spaces agent, 2021 to 2022, through a temp agency in Angers.
- **School**: in the first year, 12 projects (5 alone, 5 in pairs, 2 in teams). The one that taught him most is My Cinema, his first REST API, in PHP without a framework.
- **English**: fluent, used daily for more than ten years, no certificate.
- **Absent, never to be made up**: sales figures, client names, testimonials, Tonecraft usage numbers, a CEFR level or language certificate, and any metric that is not in the CV, a repository or the content.

## Product Principles

1. **Information over showcase.** A recruiter finds the terms, the projects and the way to reach him within minutes. Anything that slows reading goes, however well made.
2. **Only what can be checked.** Each claim traces to the CV, a repository, a demo or Razigue's own words. When a fact is unknown, the page says less rather than guess.
3. **Keep every door open.** Leave out what could cost him an application, and keep the story true.
4. **HR first, depth for whoever looks further.** The terms, the projects in one sentence, the CV and the contact are never buried; the technical accounts, repositories and demos stay one step away for developers.
5. **His own words.** Other portfolios may inform the structure, never the phrasing. Every sentence has to sound like him and hold up if a recruiter asks about it.

## Accessibility & Inclusion

- Every text must stay readable in both themes, the light one first since recruiters read by day. WCAG AA contrast is the measure; the check on 2026-09-28 found every text passing in both themes, the lowest at 5.26:1 by day and 5.54:1 at night.
- No text under 14px, and reading lines of 65 to 75 characters.
- Keyboard focus is never hidden: not under the fixed header, not behind the open mobile menu. On a touch screen, the header's controls and the footer's links answer a tap over at least 44px; every other target meets WCAG 2.5.8 through the space around it.
- The contact form keeps what the visitor typed through every outcome short of a success, and works without JavaScript.
- Each language is its own document with its own `<html lang>`. The site has a skip link and a visible focus ring, and its layouts hold at 320px wide.
- `prefers-reduced-motion` is deliberately not honoured (`AGENTS.md`); do not reintroduce it unless Razigue asks.
