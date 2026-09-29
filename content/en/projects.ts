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
        thumbnailAlt:
            "Tonecraft’s white Guilt amp with purple stained glass and control knobs.",
        title: "Tonecraft",
        subtitle: "guitar in the studio",
        team: null,
        description:
            "A web application for learning a song on guitar and recording yourself, on a single page. Plug in your guitar and open the site, with nothing to install and no account: pick your tone, follow the score with the band behind you, then record your take.",
        summary:
            "Learn a song on guitar and record yourself playing it, with nothing to install.",
        highlights: [
            "Designed and developed alone, with Claude Code, from my own specification",
            "Live, with feedback from guitarists every day",
            "Tested automatically before each release",
        ],
        approach: [
            {
                title: "The need",
                paragraphs: [
                    "Working on a cover takes several tools: the score, the original song, an amp’s tone, a way to record. On a computer, that means several programs, several licences and windows to juggle.",
                ],
            },
            {
                title: "The sound of a real amp",
                paragraphs: [
                    "Without an amp, an electric guitar is almost silent. Its sound comes from the gear: pedals, amp, speaker. Tonecraft recreates all of it.",
                    "The heart of the sound is a capture: a real amp reproduced by an AI, which reacts to your playing like the original. Tonecraft offers four, shared by the community. The main one, GUILT, is set to my taste for solos, with an echo that suggests a church, hence its stained glass. A recorded demo lets you try it without a guitar.",
                ],
                diagram: {
                    title: "The path of the sound, from the guitar to the headphones",
                    steps: [
                        {
                            nodes: [
                                {
                                    icon: "guitar",
                                    label: "The guitar",
                                    hint: "the raw sound",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "pedal",
                                    label: "The pedals",
                                    hint: "clean up and push",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "amp",
                                    label: "The amp",
                                    hint: "gives the character",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "speaker",
                                    label: "The speaker",
                                    hint: "softens, adds body",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "sliders",
                                    label: "The finish",
                                    hint: "bass, treble, room sound",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "headphones",
                                    label: "The headphones",
                                    hint: "what you hear",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                title: "Making the amp sound real",
                paragraphs: [
                    "The hardest part. I first tried to build my own amp. With no sound library to train an AI on, a convincing result was impossible.",
                    "So I started from the community’s captures and built everything around them. Playing guitar made the difference: I compared Tonecraft by ear with the best simulations on the market, such as Neural DSP, until the tone pleased as many people as possible.",
                ],
            },
            {
                title: "Follow the score",
                paragraphs: [
                    "Guitarists often learn from a tab, a score that shows which string and fret to play. Here it scrolls with the music, and a drawn fretboard shows where to put your fingers. The file never leaves the computer.",
                    "You can slow down, loop a passage or mute the guitar to play its part, and write your own tabs. This reader only loads when needed, so the page opens fast.",
                ],
                mediaAlt: [
                    "Tonecraft’s tab reader: a study in E, its tablature with the playhead on the first bar, and below it the guitar neck showing the notes of the E minor pentatonic scale.",
                ],
            },
            {
                title: "Record your version",
                paragraphs: [
                    "Start the original song, play over it, record yourself. The guitar is kept raw, so you can change amp afterwards. Download the raw sound or the amp’s, alone or with the song.",
                    "The looper plays a passage back in a loop to practise over.",
                ],
                mediaAlt: [
                    "Tonecraft’s session panel: the play and record buttons, the looper, and the guitar and backing tracks, with the waveform of a take, the choice between DI and processed sound, and the WAV export.",
                ],
            },
            {
                title: "Tune up and keep time",
                paragraphs: [
                    "The tuner shows whether the note is too high or too low, to a hundredth of a semitone. The metronome follows the chosen tempo, or one tapped on a button. Its click is heard in the headphones, never in a recording.",
                ],
                mediaAlt: [
                    "Tonecraft’s tuner showing the note G, 42 cents sharp, with a prompt to tune down.",
                    "Tonecraft’s metronome set to 132 BPM, with the tap button, tab sync and the click volume.",
                ],
            },
            {
                title: "Behind the page",
                paragraphs: [
                    "The sound is computed right in the browser. To cut the delay between the note played and the note heard even further, a small optional program, Tonecraft Engine, runs the same engine outside the browser.",
                    "The interface only says the amp is ready once confirmed, and reports the failure otherwise. Before each release, automated tests check this loading, the demo without a microphone, the scores and recording.",
                ],
                diagram: {
                    title: "The main parts of Tonecraft",
                    steps: [
                        {
                            nodes: [
                                {
                                    icon: "screen",
                                    label: "The page",
                                    hint: "what you see",
                                    detail: "Astro, Svelte",
                                },
                            ],
                            branches: [
                                {
                                    flow: "apart",
                                    icon: "sheet",
                                    label: "The scores",
                                    hint: "a separate reader",
                                    detail: "alphaTab",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "chip",
                                    label: "The conductor",
                                    hint: "coordinates everything",
                                    detail: "TypeScript",
                                },
                            ],
                            branches: [
                                {
                                    flow: "apart",
                                    icon: "storage",
                                    label: "The memory",
                                    hint: "keeps the settings",
                                    detail: "IndexedDB",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "browser",
                                    label: "The browser",
                                    hint: "by default",
                                    detail: "Web Audio API",
                                },
                                {
                                    icon: "install",
                                    label: "Tonecraft Engine",
                                    hint: "optional",
                                    detail: "Rust",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "wave",
                                    label: "The audio engine",
                                    hint: "transforms the sound",
                                    detail: "C++, WebAssembly",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                title: "How I built it",
                paragraphs: [
                    "Designed and developed alone, with Claude Code in agent mode, from a specification I wrote with the BMAD method. I test everything and decide what is kept. Two weeks for a first version, one more for v1, spent on design and accessibility. It has evolved continuously since.",
                    "I read the TypeScript and can explain it. The audio engine’s C++, compiled to WebAssembly, and Tonecraft Engine’s Rust, I judge by ear: I do not code in those languages.",
                ],
            },
            {
                title: "What guitarists tell me",
                paragraphs: [
                    "I use it to work on my songs. Other guitarists try it and write to me every day: they like having everything on one page, trying the amps, and tell me what is missing. That feedback decides what I add, rework or keep.",
                    "Tonecraft mostly offers distorted tones; clean and acoustic ones are coming, then a space to share settings. An account will become possible for that, never required to play.",
                ],
            },
        ],
        stackDisclosure: "Show the other technologies",
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
            "An aggregator of job, internship and apprenticeship offers, built by five of us in three weeks. I took on the offers and the favourites: filtered search, results page by page, and checks on incoming offers.",
        summary:
            "An aggregator of job, internship and apprenticeship offers, built by five of us in three weeks.",
        highlights: [
            "The offers and favourites, server side",
            "Checks on offers before they are saved",
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
                    "I handled the offers and the favourites: view, filter, create and delete an offer.",
                ],
                mediaAlt: [
                    "The detail of an offer in Overkill, open next to the list: the title, company, location, working arrangement, salary, publication date, required stack and a summary of the offer.",
                ],
            },
            {
                title: "Working as five",
                paragraphs: [
                    "Three weeks, three one-week sprints, each with its goal. Each sprint split into user stories on Trello, each given to one person. A daily stand-up: done, blocked, still to do.",
                    "I reviewed every approved contribution to keep the code consistent. Above all, I learned to communicate: today, I would write more decisions down.",
                ],
            },
            {
                title: "Key decisions",
                paragraphs: [
                    "The offers come from an automated collector, and nobody reads them. So each one is checked before it is saved: a required, bounded title, a type among three values, a two-letter country, valid coordinates.",
                ],
            },
            {
                title: "How it runs",
                paragraphs: [
                    "A Symfony API, a React interface, a PostgreSQL database. Each of us had a part of the API.",
                    "The search combines free text, city, company, contract, remote work, salary or category, shows results page by page and leaves out offers older than thirty days. Everyone finds their favourites.",
                    "The demo is hosted by a classmate from my year.",
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
            "A platform for learning development, with courses and multiple-choice exams, built by three. I took on the server: the data structure, secure login, rights by role, and managing courses, lessons, quizzes and results.",
        summary:
            "A platform for learning development, with courses, quizzes and an admin area, built by three.",
        highlights: [
            "Data structure and API",
            "Secure login and rights by role",
            "Managing courses, lessons, quizzes and results",
        ],
        approach: [
            {
                title: "The need",
                paragraphs: [
                    "Corelab teaches development: courses, quizzes to check what was learned, and an area to manage them.",
                ],
            },
            {
                title: "My part",
                paragraphs: [
                    "A team project where I took on the server: the data structure and the API.",
                    "I learned a lot there about organising a server and checking incoming data.",
                ],
            },
            {
                title: "Key decisions",
                paragraphs: [
                    "I defined the shape of the data: user, course, lesson, quiz, result, notification. A quiz, for instance, is a series of multiple-choice questions, each with its right answer, and a minimum score to pass.",
                ],
                mediaAlt: [
                    "A quiz in Corelab: the first of three questions, with four answers to choose from and the button to move on to the next one.",
                ],
            },
            {
                title: "How it runs",
                paragraphs: [
                    "The API manages courses, lessons and quizzes, saves results, tracks each student’s progress, schedules a lesson for a date and imports a list of students with protected passwords, changed at first login. Every request is authenticated, rights depend on the role, and login details are checked before any lookup.",
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
