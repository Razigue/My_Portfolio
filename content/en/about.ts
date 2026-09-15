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
  interets as frenchInterets,
  langues as frenchLangues,
  principes as frenchPrincipes,
} from "@/content/about";
import type { Localized } from "@/lib/i18n";

export const parcours: readonly string[] = [
  "Before Epitech, I worked various jobs to pay the bills, including in restaurants. As AI and diffusion models such as Midjourney became widely available, I saw an opportunity to start working for myself.",
  "That is when I discovered web development, building my first personal projects. I quickly got hooked, and it made me want to make it my profession.",
];

export const experiences: Localized<typeof frenchExperiences> = [
  {
    role: "Sole trader",
    period: "January 2022 to December 2024",
    context: "AI digital content and e-commerce",
    description:
      "An online shop selling AI-generated visuals, run entirely on my own: production, product and customer relations. The visuals were made in Midjourney, iterating on prompts to hold the style, the framing and the quality. The starting point of my move into web development.",
  },
  {
    role: "Groundskeeper",
    period: "2021 to 2022",
    context: "AITA, temporary work in Angers",
    description:
      "Maintaining the green spaces of the municipalities around Angers as part of a team: coordination, rigour and following safety instructions.",
  },
  {
    role: "Esports coach & player",
    period: "2016 to 2021",
    context: "Competition & coaching",
    description:
      "Supervising players and teams: performance analysis, teaching, communication and group management.",
  },
];

export const formation: Localized<typeof frenchFormation> = {
  title: "Web Integrator-Developer",
  credential: "RNCP level 5 qualification",
  period: "2025 to 2027",
  school: "Web@cadémie by Epitech",
  place: "Le Kremlin-Bicêtre (94)",
  detail: "24-month programme, 12 of them as an apprenticeship",
};

export const langues: Localized<typeof frenchLangues> = [
  { name: "French", level: "native" },
  { name: "English", level: "C2, fluent" },
];

export const atouts: Localized<typeof frenchAtouts> = [
  {
    name: "Autonomy",
    detail: "A business run alone, from the idea to going live.",
  },
  {
    name: "Team spirit",
    detail: "Peer learning every day at the Web@cadémie.",
  },
  {
    name: "Product sense",
    detail: "The habit of thinking about the customer, the use and the result.",
  },
];

export const interets: Localized<typeof frenchInterets> = [
  {
    name: "Competitive esports",
    detail:
      "Many team tournaments, and a strategic mindset shaped by competition.",
  },
  {
    name: "Guitar",
    detail: "International competitions, in the solo category.",
  },
  {
    name: "Technology",
    detail: "Constantly keeping up with digital tools and products.",
  },
];

/** The method, in the order of `principes`. The projects each one cites are taken from there. */
export const principes: readonly {
  readonly title: string;
  readonly body: string;
}[] = [
  {
    title: "Validate on the way in, never after",
    body: "Overkill’s offers come from a collector, not from a form: nobody reviews what comes in, so a DTO validates every JSON payload before it reaches the database. On Corelab, the login form goes through Zod before it touches anything.",
  },
  {
    title: "Control who is allowed",
    body: "On Corelab, access goes through a middleware that checks the JWT, then the role. The passwords generated when users are imported are hashed with bcrypt.",
  },
  {
    title: "Report what fails silently",
    body: "When an amp capture fails to load in Tonecraft, hearing sound does not prove it works. The interface waits for the engine to confirm and reports the failure. Browser tests check this loading before each release.",
  },
  {
    title: "Simplify the journey",
    body: "Tonecraft brings guitar simulation, tablature and practice tools together on one page. The player and its instruments load only when a score is opened. A visitor can listen to the demo without turning on the microphone.",
  },
];

/** The names of the skill domains, in the order of `competences`. The technologies are not translated. */
export const competenceDomains: readonly string[] = [
  "Back-end",
  "Front-end",
  "Audio and native",
  "DevOps and quality",
  "Tools",
];

checkAboutTranslation(
  {
    experiences: frenchExperiences.length,
    langues: frenchLangues.length,
    atouts: frenchAtouts.length,
    interets: frenchInterets.length,
    principes: frenchPrincipes.length,
    competences: frenchCompetences.length,
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
  },
);
