/**
 * The published projects, in English. One entry per slug of `featuredSlugs`,
 * holding only the fields that are read: the stack, the links, the year and
 * the capture come from `content/projects.ts` and are never written twice.
 * The build refuses a published project without an entry here, and a field
 * present in one language but not the other. See MODIFIER.md.
 */

import { checkProjectTexts } from "@/content/check";
import {
  featuredSlugs,
  projects,
  type ProjectTranslation,
} from "@/content/projects";

export const projectTexts: Readonly<Record<string, ProjectTranslation>> = {
  tonecraft: {
    title: "Tonecraft",
    subtitle: "guitar, made simple",
    team: null,
    description:
      "Tonecraft lets you play guitar in your browser, with a virtual amp and effects. Reading tablature, tuning up, keeping time, looping a passage or recording along with a backing track: it all happens in one place.",
    highlights: [
      "Choose your amp and effects",
      "Work on a song at your own pace",
      "Record your guitar with a backing track",
    ],
    approach: [
      {
        title: "Less setup, more music",
        paragraphs: [
          "On a computer, playing guitar often means installing several programs and getting them to work together. I built Tonecraft to bring the sound and the practice tools together on a single page.",
          "You plug your guitar into an audio interface, the box that connects it to the computer, then choose your sound. Without a guitar, a demo also lets you hear the result, without turning on the microphone.",
        ],
      },
      {
        title: "Learning, and keeping a take",
        paragraphs: [
          "You can open a tablature, slow it down and loop a passage. The tuner helps tune the guitar, the metronome sets the tempo and the looper repeats what you just played. The player and its instrument sounds only load when you open a score.",
          "The recorder keeps the DI: the sound of the guitar before the effects. So you can change amps after playing, then download the take with or without effects, on its own or with its backing track. The looper, for its part, keeps the sound with its effects.",
        ],
      },
      {
        title: "The path of the sound",
        paragraphs: [
          "From the guitar to the headphones, the sound goes through a series of steps. Each one changes it a little.",
        ],
        diagram: {
          title: "From the guitar to the headphones",
          steps: [
            {
              nodes: [
                { icon: "guitar", label: "The guitar", hint: "raw sound comes in" },
              ],
              branches: [
                { flow: "out", icon: "record", label: "The recorder", hint: "keeps the raw sound" },
              ],
            },
            {
              nodes: [
                { icon: "funnel", label: "Preparation", hint: "cleans and levels" },
              ],
            },
            {
              nodes: [
                { icon: "amp", label: "The amp", hint: "gives the character" },
              ],
            },
            {
              nodes: [
                { icon: "speaker", label: "The speaker", hint: "sounds like the real thing" },
              ],
            },
            {
              nodes: [
                { icon: "sliders", label: "The colour", hint: "bass, treble, echo" },
              ],
              branches: [
                { flow: "loop", icon: "loop", label: "The looper", hint: "repeats what you play" },
              ],
            },
            {
              nodes: [
                { icon: "volume", label: "The volume", hint: "levelled, no spikes" },
              ],
              branches: [
                { flow: "in", icon: "note", label: "The song", hint: "to play along to" },
              ],
            },
            {
              nodes: [
                { icon: "headphones", label: "The headphones", hint: "what you hear" },
              ],
              branches: [
                { flow: "in", icon: "metronome", label: "The metronome", hint: "keeps the tempo" },
              ],
            },
          ],
        },
      },
      {
        title: "Behind the page",
        paragraphs: [
          "What you see, what decides and what transforms the sound are kept apart.",
        ],
        diagram: {
          title: "The main parts of Tonecraft",
          steps: [
            {
              nodes: [
                { icon: "screen", label: "The page", hint: "what you see", detail: "Astro, Svelte" },
              ],
              branches: [
                { flow: "apart", icon: "storage", label: "The memory", hint: "keeps the session", detail: "IndexedDB" },
                { flow: "apart", icon: "sheet", label: "Tablature", hint: "its own sound", detail: "alphaTab" },
              ],
            },
            {
              nodes: [
                { icon: "chip", label: "The conductor", hint: "decides the settings", detail: "TypeScript" },
              ],
            },
            {
              nodes: [
                { icon: "browser", label: "The browser", hint: "nothing to install", detail: "Web Audio API" },
                { icon: "install", label: "Tonecraft Engine", hint: "optional program", detail: "Rust" },
              ],
            },
            {
              nodes: [
                { icon: "wave", label: "Sound processing", hint: "the same in both cases", detail: "C++, WebAssembly" },
              ],
              branches: [
                { flow: "apart", icon: "export", label: "Export", hint: "replays a take" },
              ],
            },
          ],
        },
      },
      {
        title: "With or without an installed program",
        paragraphs: [
          "Sound processing runs in the browser. For some audio interfaces, an optional program, Tonecraft Engine, gives direct access to the hardware. The page keeps the same controls and the processing stays the same.",
          "The page waits for the engine to confirm the amp has loaded, and reports a failure. Before each release, tests check this loading, the demo without a microphone, playback and recording.",
        ],
      },
    ],
    stackDisclosure: "Show the technologies used",
    imageAlt:
      "The current Tonecraft interface: the amp and speaker choices above an amp with purple stained glass, and its control knobs.",
  },

  overkill: {
    title: "Overkill",
    subtitle: "job offer aggregator",
    team: "team of 5",
    description:
      "An aggregator of job, internship and apprenticeship offers, built as a team: a Symfony API, a React front end and a PostgreSQL database. My part covers the offers and the favourites: controllers, validation DTOs, filtered search and pagination.",
    highlights: [
      "Controllers for the offers and the favourites",
      "Validation DTOs for incoming data",
      "Filtered search and pagination",
    ],
    approach: [
      {
        title: "The need",
        paragraphs: [
          "Overkill brings job, internship and apprenticeship offers together in one place.",
        ],
      },
      {
        title: "My part",
        paragraphs: [
          "I took the offers and the favourites. The offers controller carries the routes of the domain: filtered reads, reads by identifier, creation and deletion.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The DTO is the boundary of the domain. The offers do not come from a form but from a collector, so nobody reviews what comes in: the title is required and bounded, the type can only take three values, the country is a two-letter code, and the coordinates must stay within their ranges. The JSON is validated before it reaches the database, never after.",
        ],
      },
      {
        title: "How it runs",
        paragraphs: [
          "It is a team project: a Symfony API, a React front end and a PostgreSQL database, all running under Docker. We split the API by domain.",
          "The search accepts criteria that can be combined (free text, city, company, contract, type, remote work, minimum salary, category), paginates them, and only returns offers published in the last thirty days, because an expired listing in an aggregator is worse than no result at all. The favourites controller keeps its own on the logged-in user.",
        ],
      },
    ],
  },

  corelab: {
    title: "Corelab",
    subtitle: "e-learning platform",
    team: "team of 3",
    description:
      "A platform for learning development, with courses and multiple-choice exams, built as a team with an Express API and a MongoDB database. My part covers the data models and the routes: JWT authentication, role-based access control, and the CRUD for courses, lessons, quizzes and results.",
    highlights: [
      "Data models and API routes",
      "JWT authentication and role-based access control",
      "CRUD for courses, lessons, quizzes and results",
    ],
    approach: [
      {
        title: "The need",
        paragraphs: [
          "Corelab is a platform for learning development: courses to follow, multiple-choice exams to check what has been learned, and an administration area to manage them.",
        ],
      },
      {
        title: "My part",
        paragraphs: [
          "It is a team project, and I took care of the server: the data models and the routes.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The models set the shape of everything else: user, course, lesson, quiz, result, notification. Written with Mongoose, they decide what a student owns, what a course contains, and what a quiz is: a series of multiple-choice questions, each with its right answer, and a threshold above which the exam is passed. A route cannot make up for a badly designed model.",
        ],
      },
      {
        title: "How it runs",
        paragraphs: [
          "The routes follow: the CRUD for courses, lessons and quizzes, saving results, a student’s progress, comparing a score with the pass mark, scheduling a lesson for a date, importing users with passwords generated through bcrypt, and a password chosen at first login. Access goes through a middleware that checks the JWT and then the role, and the login form is validated by Zod before it reaches anything.",
        ],
      },
    ],
  },
};

checkProjectTexts(projects, featuredSlugs, projectTexts);
