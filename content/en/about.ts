/**
 * The background, in English. Every list follows its French twin in
 * `content/about.ts` entry for entry, in the same order; the build refuses a
 * list that has one more or one fewer. See MODIFIER.md.
 */

import { checkAboutTranslation } from "@/content/check";
import {
    atouts as frenchAtouts,
    competences as frenchCompetences,
    experiences as frenchExperiences,
    formation as frenchFormation,
    ia as frenchIa,
    interets as frenchInterets,
    langues as frenchLangues,
    principes as frenchPrincipes,
    recherche as frenchRecherche,
} from "@/content/about";
import type { Localized } from "@/lib/i18n";

export const parcours: readonly string[] = [
    "Before Epitech, I worked in catering and grounds maintenance. Then I started an online shop selling AI-generated visuals, on Etsy.",
    "For that shop, I wanted my own website. I learned HTML and CSS there, and the wish to make it my job: personal projects, then Web@cadémie by Epitech in 2025, as agentic coding took off.",
    "There I learn the job from both ends. Writing code by hand to understand it, like My Cinema, my first API, with no framework. And developing with an AI agent from a precise specification, testing everything and deciding what is kept.",
    "The shop taught me to see a product through the customer’s eyes. An unclear page or one step too many showed in the sales. I code the same way: I start from the user’s path, ship, then improve. Tonecraft began like that, from a problem I had as a guitarist.",
];

/** The line that opens the About page, under its title. */
export const devise =
    "I seize opportunities, I get organised, and I see things through.";

/** The "As an apprentice" part, in the words of `recherche` in `content/about.ts`. */
export const recherche: Localized<typeof frenchRecherche> = {
    title: "As an apprentice",
    firstMonthTitle: "From the first month",
    firstMonth: [
        "Fix display issues on mobile and desktop, the core of my web integrator qualification.",
        "Make a page accessible to everyone: contrast, forms, keyboard navigation.",
        "Extend an existing API: new filters, checks on incoming data, documentation.",
        "Automate the checks before each release, or speed up the ones slowing the team.",
        "Automate a repetitive team task: reporting, exports, release notes.",
    ],
    learnTitle: "What I want to learn",
    learn: [
        "Live the agile rituals from the inside: estimates, a short and useful daily stand-up.",
        "Make my progress visible without being asked, especially when remote.",
        "Present a feature through what it brings to the user.",
        "Understand what QA, support and design expect from me.",
        "Share what I learn: documentation, talks, welcoming newcomers.",
    ],
};

export const experiences: Localized<typeof frenchExperiences> = [
    {
        role: "Sole trader",
        period: "January 2022 to December 2024",
        context: "AI digital content and e-commerce",
        description:
            "A shop selling AI-generated visuals, run alone end to end: production, catalogue, customer relations. Sold on Etsy, then through Discord and partners paid on commission. Each visual was reworked until it looked right before publishing, a habit I keep with tests.",
    },
    {
        role: "Groundskeeper",
        period: "2021 to 2022",
        context: "AITA, temporary work in Angers",
        description:
            "Maintaining the green spaces of Angers, in a team, with an area to finish within the day. In temporary work, you are only called back if you are reliable: on time, at the team’s pace, strict on safety.",
    },
];

export const formation: Localized<typeof frenchFormation> = {
    title: "Web Developer and Integrator",
    credential: "RNCP level 5 qualification",
    period: "2025 to 2027",
    school: "Web@cadémie by Epitech",
    place: "Le Kremlin-Bicêtre (94)",
    detail: "24-month programme, 12 of them as an apprenticeship",
    firstYear:
        "12 projects delivered in the first year: 5 alone, 5 in pairs, 2 in teams.",
    cycle: "Every project follows the same cycle: kick-off, tasks shared on Trello, daily stand-up, oral defence.",
    proudest:
        "The one that taught me the most: My Cinema, my first API, written by hand in PHP, with no framework.",
};

export const langues: Localized<typeof frenchLangues> = [
    { name: "French", level: "native" },
    { name: "English", level: "fluent, daily for more than ten years" },
];

export const atouts: Localized<typeof frenchAtouts> = [
    {
        name: "Logical mind",
        detail: "I break a problem down before coding it. On JeuVideOPS, that breakdown revealed two gaps from the outset: deployment and secrets management.",
    },
    {
        name: "Coding with AI",
        detail: "Generative AI every day since 2022. I developed Tonecraft with Claude Code, from my specification. I test everything, and I rein it in when it gets things wrong.",
    },
    {
        name: "Autonomy",
        detail: "Tonecraft, carried alone from the idea to release. A shop run alone for three years.",
    },
    {
        name: "Teamwork",
        detail: "On Overkill, as five, I reviewed every approved contribution to keep the code consistent.",
    },
    {
        name: "Reliability",
        detail: "I deliver what I take on. When something blocks, I say so straight away.",
    },
    {
        name: "Product sense",
        detail: "I start from the user’s path and move forward with their feedback. That is how Tonecraft evolves.",
    },
];

export const interets: Localized<typeof frenchInterets> = [
    {
        name: "Guitar",
        detail: "Almost 15 years of playing, mostly technical, fast pieces. An Archspire solo: one month to learn it phrase by phrase, another to reach the tempo.",
        link: {
            label: "A few covers",
            href: "https://www.youtube.com/playlist?list=PLc8AWPHGVg0E9qopSmr0WWPlNUrqF6mg3",
        },
    },
    {
        name: "Technology",
        detail: "I follow the impact of AI on cars, robotics and medical research.",
    },
];

/** The method, in the order of `principes`. The projects each one cites are taken from there. */
export const principes: readonly {
    readonly title: string;
    readonly body: string;
}[] = [
    {
        title: "Frame before coding",
        body: "The need is written down before the first line. Before developing Tonecraft, I wrote its specification with the BMAD method. I then decide what is kept.",
    },
    {
        title: "Check what comes in",
        body: "Nothing from outside is used unchecked. On Overkill, collected offers are checked before they are saved. On Corelab, so are login details.",
    },
    {
        title: "Control access",
        body: "Everyone reaches only what their role allows. On Corelab, every request is authenticated and passwords are never stored in plain text.",
    },
    {
        title: "Report failures",
        body: "A failure is never passed over in silence. Tonecraft only says an amp is ready when it is, and reports the failure otherwise. Tests check it before each release.",
    },
    {
        title: "Simplify the path",
        body: "As few steps as possible. Tonecraft puts everything on one page, loads the score reader only when needed, and can be tried without a microphone.",
    },
];

/** The names of the skill domains, in the order of `competences`. The technologies are not translated. */
export const competenceDomains: readonly string[] = [
    "Front-end",
    "Back-end",
    "DevOps and quality",
    "Tools",
    "Delegated to AI",
];

/** The AI note, in the words of `ia` in `content/about.ts`, paragraph for paragraph. */
export const ia: Localized<typeof frenchIa> = {
    title: "Coding with AI",
    headings: ["Since 2022", "What I hand it", "What I check", "What I never delegate"],
    paragraphs: [
        "I have used generative AI since 2022, with Midjourney for my shop. I joined Web@cadémie in 2025, as agentic coding exploded: I learned to code while learning to pilot these tools.",
        "I mostly use Claude, by Anthropic, to learn, debug and write code. Facing a new technology, I ask it the why of every step and check the official documentation. I developed Tonecraft with Claude Code in agent mode, from my specification written with the BMAD method.",
        "When it goes off track, I rein it in. On JeuVideOPS, it suggested a solution the brief ruled out. I test everything it suggests before keeping it, and check that it meets the need. On Tonecraft, my ear judges the sound.",
        "I never hand over the idea of a product, the interface choices, what goes into the project, or what I claim about myself. At a company, no code or internal data will go into a tool that is not approved.",
    ],
};

checkAboutTranslation(
    {
        experiences: frenchExperiences.length,
        langues: frenchLangues.length,
        atouts: frenchAtouts.length,
        interets: frenchInterets.length,
        principes: frenchPrincipes.length,
        competences: frenchCompetences.length,
        firstMonth: frenchRecherche.firstMonth.length,
        learn: frenchRecherche.learn.length,
        iaParagraphs: frenchIa.paragraphs.length,
    },
    {
        parcours,
        experiences,
        formation,
        langues,
        atouts,
        interets,
        principes,
        competenceDomains,
        ia,
        devise,
        recherche,
    },
);
