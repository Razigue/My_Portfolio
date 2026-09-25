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
    thumbnailAlt: "Tonecraft’s white Guilt amp with purple stained glass and control knobs.",
    title: "Tonecraft",
    subtitle: "guitar in the studio",
    team: null,
    description:
      "Tonecraft is a web application that brings together on a single page everything you need to learn a song on guitar and record yourself playing it. You plug your guitar into the computer and open the site, with nothing to install and no account to create: you pick your sound, follow the sheet music while the rest of the band plays along with you, then record your version and download it. A tuner and a metronome round it out.",
    highlights: [],
    approach: [
      {
        title: "The need",
        paragraphs: [
          "Working on a cover on guitar takes several tools: something to read your part, the original song to play over, the sound of an amp and a way to record yourself. On a computer, that often means installing several programs and getting them to work together, which is enough to put you off before you have played a single note.",
        ],
      },
      {
        title: "The sound of a real amp",
        paragraphs: [
          "Without an amp, an electric guitar is almost silent. The sound people know comes from the gear it is plugged into: the effect pedals, the amp and its speaker. Tonecraft recreates all of it in software.",
          "The heart of the sound is a capture: a reproduction of a real amp, learned by a neural network, that responds to your playing the way the original does. Tonecraft offers four, shared online by the community. The main one, GUILT, is set up to my own taste: a sound for solos, with a touch of echo to give it an epic feel. That reverb made me think of a guitar played in a church, and I designed stained-glass windows to dress its amp. Without a guitar to hand, one button lets you hear the result on a demo recording.",
        ],
        diagram: {
          title: "The path of the sound, from the guitar to the headphones",
          steps: [
            {
              nodes: [
                { icon: "guitar", label: "The guitar", hint: "the raw sound" },
              ],
            },
            {
              nodes: [
                { icon: "pedal", label: "The pedals", hint: "clean up and push" },
              ],
            },
            {
              nodes: [
                { icon: "amp", label: "The amp", hint: "gives the character" },
              ],
            },
            {
              nodes: [
                { icon: "speaker", label: "The speaker", hint: "softens, adds body" },
              ],
            },
            {
              nodes: [
                { icon: "sliders", label: "The finish", hint: "bass, treble, room sound" },
              ],
            },
            {
              nodes: [
                { icon: "headphones", label: "The headphones", hint: "what you hear" },
              ],
            },
          ],
        },
      },
      {
        title: "Follow the score",
        paragraphs: [
          "Guitarists often learn a song from a tab, a simplified score that shows which string and which fret to play. The file opens in the page without being sent anywhere: the score scrolls in time with the music, the passage being played stays in the middle of the screen, and a guitar neck drawn underneath shows where to put your fingers.",
          "You can slow the song down, loop a difficult passage or mute the guitar to play its part yourself. You can also write your own tabs, hearing each note as you enter it. So that the page opens quickly, this reader only loads when a score is opened.",
        ],
        mediaAlt: [
          "Tonecraft’s tab reader: a study in E, its tablature with the playhead on the first bar, and below it the guitar neck showing the notes of the E minor pentatonic scale.",
        ],
      },
      {
        title: "Record your version",
        paragraphs: [
          "You add the original song as a backing track, play over it and record yourself. Tonecraft keeps the guitar’s sound as it comes out of the instrument, before the amp, so you can change the sound after playing. The downloaded file holds, as you choose, the raw sound or the amp’s, on its own or mixed with the song.",
          "The looper, for its part, records a passage as you hear it, then plays it back in a loop so you can practise over it.",
        ],
        mediaAlt: [
          "Tonecraft’s session panel: the play and record buttons, the looper, and the guitar and backing tracks, with the waveform of a take, the choice between DI and processed sound, and the WAV export.",
        ],
      },
      {
        title: "Tune up and keep time",
        paragraphs: [
          "The tuner shows the note being played and whether it is too high or too low, to a hundredth of a semitone. The metronome keeps time at the chosen tempo, which you can also set by tapping the beat on a button. Its click is heard in the headphones, but never ends up in a loop or a recording.",
        ],
        mediaAlt: [
          "Tonecraft’s tuner showing the note G, 42 cents sharp, with a prompt to tune down.",
          "Tonecraft’s metronome set to 132 BPM, with the tap button, tab sync and the click volume.",
        ],
      },
      {
        title: "Behind the page",
        paragraphs: [
          "The sound is computed by an audio engine that runs right in the browser. For those who want the least possible delay between the note played and the note heard, a small optional program, Tonecraft Engine, runs exactly the same engine outside the browser, without the page changing.",
          "The interface only says the amp is ready once the engine has confirmed it, and reports the error otherwise. Before each release, automated tests open the site in a real browser and check this loading, the demo without a microphone, score playback and recording.",
        ],
        diagram: {
          title: "The main parts of Tonecraft",
          steps: [
            {
              nodes: [
                { icon: "screen", label: "The page", hint: "what you see", detail: "Astro, Svelte" },
              ],
              branches: [
                { flow: "apart", icon: "sheet", label: "The scores", hint: "a separate reader", detail: "alphaTab" },
              ],
            },
            {
              nodes: [
                { icon: "chip", label: "The conductor", hint: "coordinates everything", detail: "TypeScript" },
              ],
              branches: [
                { flow: "apart", icon: "storage", label: "The memory", hint: "keeps the settings", detail: "IndexedDB" },
              ],
            },
            {
              nodes: [
                { icon: "browser", label: "The browser", hint: "by default", detail: "Web Audio API" },
                { icon: "install", label: "Tonecraft Engine", hint: "optional", detail: "Rust" },
              ],
            },
            {
              nodes: [
                { icon: "wave", label: "The audio engine", hint: "transforms the sound", detail: "C++, WebAssembly" },
              ],
            },
          ],
        },
      },
    ],
    stackDisclosure: "Show the technologies used",
    imageAlt:
      "Tonecraft’s studio in the Tone tab, with the amp switched on: the settings bar at the top, with input, gate, amp, cabinet and the Lead preset, the Guilt amp with its lit purple stained glass in the middle, and the tab player, the looper and the guitar and backing tracks at the bottom.",
  },

  overkill: {
    thumbnailAlt:
      "Overkill’s home page, with its headline about a centralised job search and a quick search form by role, location and contract type.",
    imageAlt:
      "Overkill’s list of offers: a search by role and city, filters by offer type and contract, and the recent offers with their company, location, contract and salary.",
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
        mediaAlt: [
          "The detail of an offer in Overkill, open next to the list: the title, company, location, working arrangement, salary, publication date, required stack and a summary of the offer.",
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
        mediaAlt: [
          "A search in Overkill for developer roles in Paris, returning seven offers, with the offer type and contract filters on the left.",
        ],
      },
    ],
  },

  corelab: {
    thumbnailAlt:
      "Corelab’s home page, with its English headline over a black sphere, followed by the carousel of the latest courses.",
    imageAlt:
      "Corelab’s list of courses, as dark cards with their title, their description and a button to open the course.",
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
        mediaAlt: [
          "A quiz in Corelab: the first of three questions, with four answers to choose from and the button to move on to the next one.",
        ],
      },
      {
        title: "How it runs",
        paragraphs: [
          "The routes follow: the CRUD for courses, lessons and quizzes, saving results, a student’s progress, comparing a score with the pass mark, scheduling a lesson for a date, importing users with generated passwords hashed with bcrypt, and a password chosen at first login. Middleware verifies the JWT, the relevant routes check the user’s role, and Zod validates login data before the user lookup.",
        ],
        mediaAlt: [
          "A student’s progress in Corelab: one bar per quiz, with the score obtained and a mark at the pass threshold.",
          "Corelab’s admin area: importing a list of students, creating an account and the list of students.",
        ],
      },
    ],
  },
};

checkProjectTexts(projects, featuredSlugs, projectTexts);
