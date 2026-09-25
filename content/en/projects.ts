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
    highlights: [
      "Everything to play and record a song, on a single page",
      "The sheet music scrolls while the band plays along with you",
      "Nothing to install, no account to create",
    ],
    approach: [
      {
        title: "Everything a cover needs, in one place",
        paragraphs: [
          "A cover takes several tools: something to read the part, the song to play over, a tone that fits, a way to work on the hard passages, and a recorder. On a computer, that often means installing several programs and getting them to work together. Tonecraft brings them onto a single screen.",
          "You plug your guitar into an audio interface, the box that connects it to the computer, then choose your sound. Without a guitar, a demo lets you hear the result without turning on the microphone. Your settings stay on your computer, and a tone is shared as a link.",
        ],
      },
      {
        title: "Open the tab, the band plays along",
        paragraphs: [
          "Guitar Pro, MusicXML and other formats open right in the page, without being sent anywhere. The score scrolls under a fixed playhead, the neck lights up under the notes, and the band plays with you: slowed down, looped on a passage, or with your part muted.",
          "You can also write your own tabs: type a fret, hear the note. The player and its instrument sounds only load when you open a score.",
        ],
        mediaAlt: [
          "Tonecraft’s tab reader: a study in E, its tablature with the playhead on the first bar, and below it the guitar neck showing the notes of the E minor pentatonic scale.",
        ],
      },
      {
        title: "Play over the song, keep the take",
        paragraphs: [
          "You drop the song in as a backing track and record your part over it. The recorder keeps the DI, the sound of the guitar before the effects: you can change amps after playing, then download the take with or without effects, on its own or mixed with the backing track.",
          "The tab player’s sound stays separate and is not part of this export. The looper, for its part, records what you hear, effects included, and plays it back in a loop so you can work on a riff.",
        ],
        mediaAlt: [
          "Tonecraft’s session panel: the play and record buttons, the looper, and the guitar and backing tracks, with the waveform of a take, the choice between DI and processed sound, and the WAV export.",
        ],
      },
      {
        title: "An amp and its chain",
        paragraphs: [
          "The main amp, GUILT, is a neural capture of a real high-gain amp head. Four captures from the community sit next to it.",
          "Around it, a short chain in a fixed order: gate, boost, pitch and reverb. Each capture comes with its cabinet, and you can load your own impulse response from your disk, as WAV, AIFF or FLAC.",
        ],
        mediaAlt: [
          "Tonecraft’s settings bar: input gain, the gate, the GUILT Lead amp and cabinet selectors, the Lead preset, the doubler and the output level.",
        ],
      },
      {
        title: "Tune up and keep time",
        paragraphs: [
          "The tuner is chromatic and accurate to the cent. The metronome sets the tempo and the time signature, and follows a tap. Its click never ends up in a loop or a take.",
        ],
        mediaAlt: [
          "Tonecraft’s tuner showing the note G, 42 cents sharp, with a prompt to tune down.",
          "Tonecraft’s metronome set to 132 BPM, with the tap button, tab sync and the click volume.",
        ],
      },
      {
        title: "The path of the sound",
        paragraphs: [
          "The sound goes through a series of steps that gradually transform it.",
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
                { icon: "speaker", label: "The virtual cabinet", hint: "simulates the speakers" },
              ],
            },
            {
              nodes: [
                { icon: "sliders", label: "The colour", hint: "EQ and reverb" },
              ],
              branches: [
                { flow: "loop", icon: "loop", label: "The looper", hint: "repeats what you play" },
              ],
            },
            {
              nodes: [
                { icon: "volume", label: "The volume", hint: "level control and limiter" },
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
                { flow: "apart", icon: "sheet", label: "Tablature", hint: "its own sound", detail: "alphaTab" },
              ],
            },
            {
              nodes: [
                { icon: "chip", label: "The conductor", hint: "decides the settings", detail: "TypeScript" },
              ],
              branches: [
                { flow: "apart", icon: "storage", label: "The memory", hint: "keeps the session", detail: "IndexedDB" },
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
          "Sound processing runs in the browser. Tonecraft Engine, a small optional program written in Rust, runs the same chain outside the browser, through ASIO on Windows, CoreAudio on macOS or ALSA on Linux, at the lowest latency the interface allows. It is chosen in the audio settings, and the page keeps the same controls.",
          "The interface waits for confirmation from the engine before showing that the amp has loaded, and reports loading errors. Site deployment runs browser tests that check this loading, the demo without a microphone, tablature playback and recording.",
        ],
        mediaAlt: [
          "Tonecraft’s audio settings: the choice between the browser and the native engine, audio input detection, the input device, the channel and the output device.",
        ],
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
