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
  "Before Epitech, I worked in several jobs, including catering and grounds maintenance. I then built an online business selling AI-generated visuals made with Midjourney, first on Etsy.",
  "For that shop, I started building my own website. That is where I learned the basics of HTML and CSS, and found I wanted to go further: I carried on with personal projects, then joined Web@cadémie by Epitech to make it my career.",
  "Above all, the shop taught me to look at a product from the side of the person using it. An unclear product page or one step too many at checkout showed up straight away in the sales, so I kept adjusting. Today, when I code an interface, I start from the user’s journey and what might block them, I ship a first version, then improve it from what I observe. That same logic gave rise to Tonecraft, which started from a problem I had myself as a guitarist.",
];

/** The line that opens the About page, under its title. */
export const devise =
  "I seize opportunities, I get organised, and I see things through.";

/** The "As an apprentice" part, in the words of `recherche` in `content/about.ts`. */
export const recherche: Localized<typeof frenchRecherche> = {
  title: "As an apprentice",
  firstMonthTitle: "What I can take on from the first month",
  firstMonth: [
    "Fix integration bugs (responsive, CSS, components), the core of my web developer and integrator qualification.",
    "Audit a page’s accessibility with axe or Lighthouse, then fix the simple issues: contrast, form labels, alternative text, keyboard navigation.",
    "Extend an existing API: add a filter or pagination, tighten input validation, document the routes in OpenAPI.",
    "Wire linting and tests into the CI, or speed up a slow pipeline.",
    "Automate a manual team task (reporting, exports, release notes) with a script or an n8n workflow.",
    "Write a fresh-eyes report on what I notice as a newcomer.",
  ],
  learnTitle: "What I want to learn in a company",
  learn: [
    "Live the agile rituals from the inside: understand everyone’s role, take part in estimates, and give a useful one-minute daily update on what is done, what is left and what blocks.",
    "Make my progress visible without being asked, with tickets and statuses kept up to date, especially when working remotely.",
    "Present a feature at sprint review through what it brings to the user.",
    "Know what other roles expect from me: QA to test, support to answer users, the designer to adjust a mock-up.",
    "Share what I learn: documentation, a short internal talk, help for the next newcomer.",
  ],
};

export const experiences: Localized<typeof frenchExperiences> = [
  {
    role: "Sole trader",
    period: "January 2022 to December 2024",
    context: "AI digital content and e-commerce",
    description:
      "An online shop selling AI-generated visuals, run entirely on my own: production, product and customer relations. Sold on Etsy, with customers found through word of mouth, then through a Discord server and visibility platforms paid on commission. The visuals were made in Midjourney, iterating on prompts to hold the style, the framing and the quality before publishing, a habit I keep with tests. The starting point of my move into web development.",
  },
  {
    role: "Groundskeeper",
    period: "2021 to 2022",
    context: "AITA, temporary work in Angers",
    description:
      "Maintaining the green spaces of the municipalities around Angers, in a team that splits the mowing, pruning and clearing to finish an area within the day. In temporary work, you are only called back for the next assignment if you are reliable: on time, at the team’s pace, strict with the safety rules on the machines.",
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
    "In the first year, 12 projects delivered: 5 alone, 5 in pairs and 2 in teams. The largest, Overkill, was built by five of us in three weeks.",
  cycle:
    "Every project follows the same cycle: a kick-off presenting the brief, getting to grips with the project and its technologies, tasks split on Trello, a progress check every day, then an oral defence in front of the teaching staff.",
  proudest:
    "The project that taught me the most: My Cinema, my first REST API connecting the back end to the front end, written entirely by hand in PHP, without a framework. A demanding project, which made me understand the role of controllers, models and entities.",
};

export const langues: Localized<typeof frenchLangues> = [
  { name: "French", level: "native" },
  { name: "English", level: "fluent, used daily for more than ten years" },
];

export const atouts: Localized<typeof frenchAtouts> = [
  {
    name: "Autonomy",
    detail:
      "Tonecraft, which I run on my own from the idea to release, and an online shop I ran alone for three years.",
  },
  {
    name: "Organisation",
    detail:
      "Before coding, I break the brief into Trello cards and check that they cover all of it. On JeuVideOPS, that is what showed that deployment and secrets management were missing, before the first line of code.",
  },
  {
    name: "Teamwork",
    detail:
      "On Overkill, as five, I read every approved pull request to keep the code consistent.",
  },
  {
    name: "Reliability",
    detail:
      "What I take on, I deliver, and when something blocks, I say so straight away: a habit kept from temporary work.",
  },
  {
    name: "Product sense",
    detail:
      "I start from the user’s journey, and decide what comes next from their feedback: that is how Tonecraft evolves.",
  },
];

export const interets: Localized<typeof frenchInterets> = [
  {
    name: "Guitar",
    detail:
      "Almost 15 years of playing, mostly technical, fast pieces. For a demanding solo such as Born of Osiris’s Behold, I allow one month to learn it, breaking it into phrases I work slowly with a metronome, then one more month to build the speed cleanly up to the original tempo.",
  },
  {
    name: "Technology",
    detail:
      "Above all, I follow how AI is transforming what already exists: cars, robotics and, more recently, medical research.",
  },
];

/** The method, in the order of `principes`. The projects each one cites are taken from there. */
export const principes: readonly {
  readonly title: string;
  readonly body: string;
}[] = [
  {
    title: "Validate incoming data",
    body: "What comes in from outside is checked before it is used. On Overkill, a DTO defines the constraints for offers received from the collector, and Symfony validates them before writing to the database. On Corelab, Zod validates login data before the user lookup.",
  },
  {
    title: "Control access",
    body: "Everyone reaches only what their role allows. On Corelab, middleware verifies the JWT, and the relevant routes check the user’s role. Passwords generated when users are imported are hashed with bcrypt.",
  },
  {
    title: "Report loading failures",
    body: "What fails is reported, never passed over in silence. When an amp capture fails to load in Tonecraft, hearing sound does not prove it works. The interface waits for the engine to confirm and reports the failure. Browser tests check this loading before each release.",
  },
  {
    title: "Simplify the journey",
    body: "As few steps as possible for the visitor. Tonecraft brings guitar simulation, tablature and practice tools together on one page. The player and its instruments load only when a score is opened. A visitor can listen to the demo without turning on the microphone.",
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

/** The AI note, in the words of `ia` in `content/about.ts`, paragraph for paragraph. */
export const ia: Localized<typeof frenchIa> = {
  title: "How I use AI",
  paragraphs: [
    "I mostly use Claude, by Anthropic, with the Opus 5 model, to learn, debug and write code, tests and CI pipelines included. When I discover a technology, I ask it why each step is there, and I check the official documentation whenever I am unsure. On Tonecraft, I had it work as an agent with Claude Code, from specifications I built with the BMAD method.",
    "I test everything it produces, with Postman, tests or the CI, and check that the result really meets the need. On JeuVideOPS, it suggested an nginx server when the brief required GitHub Pages, and I set it straight. On Tonecraft, my ear judges the sound.",
    "What I never hand over to it: the idea of a product, its interface choices, what goes into the repository and what I claim about myself. In a company, no code or internal data will go into a tool the company has not approved.",
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
