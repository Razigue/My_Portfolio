/**
 * The English interface. Each export mirrors the export of the same name in
 * `content/site.ts`, key for key: the type refuses a missing key or an extra
 * one. What does not change with the language, the name, the email and the
 * links, is only written there. See MODIFIER.md.
 */

import { checkCopy } from "@/content/check";
import {
  site as frenchSite,
  type availability as frenchAvailability,
  type copy as frenchCopy,
  type form as frenchForm,
  type hero as frenchHero,
  type nav as frenchNav,
  type sections as frenchSections,
} from "@/content/site";
import type { Localized } from "@/lib/i18n";

export const site: Localized<Pick<typeof frenchSite, "role" | "location">> = {
  role: "Full-stack web developer",
  location: "Paris, open to anywhere in Île-de-France",
};

export const availability: Localized<typeof frenchAvailability> = {
  headline: "Looking for a 12-month apprenticeship",
  windowLabel: "Period",
  window: "from September 2026",
  rhythmLabel: "Schedule",
  rhythm: "6 weeks at the company, 2 weeks in training",
  targetLabel: "Target role",
  target: "Full-stack web developer, PHP / Laravel and React",
  schoolLabel: "School",
  diplomaLabel: "Qualification",
  placeLabel: "Location",
};

export const hero: Localized<typeof frenchHero> = {
  role: site.role,
  tagline:
    "Studying at Web@cadémie by Epitech, I design solutions and shape them into web applications. I am looking for a full-stack development apprenticeship.",
};

export const presentation =
  "A full-stack web developer who learned on the job: I discovered code while building my own e-commerce site as a sole trader. Now at Web@cadémie by Epitech Paris (2025 to 2027), I build applications with PHP and Laravel, Java and Spring Boot, and React, and I am looking for a 12-month apprenticeship from September 2026, working 6 weeks at the company for every 2 weeks in training.";

export const nav: Localized<typeof frenchNav> = {
  home: "Home",
  projects: "Projects",
  about: "About",
  contact: "Contact",
};

/** The chapter names of the home page. The ordinals are taken from the French file. */
export const sections: { readonly [K in keyof typeof frenchSections]: string } = {
  selection: "Selected work",
  methode: "Method",
  competences: "Skills",
  parcours: "Background",
  contact: "Contact",
};

export const copy: Localized<typeof frenchCopy> = {
  projectsHeading: "Project index",
  contactHeading: "Get in touch",
  contactSub: "An opportunity? Feel free to reach out.",
  cvButton: "Download the CV (PDF, in French)",
  heroContact: "Contact me",
  copyIdle: "copy",
  copyDone: "copied",
  sourceLink: "Source code ↗",
  approachTitle: "The approach",
  diagramOr: "or",
  statusLive: "live",
  statusArchived: "archived",
  skipLink: "Skip to content",
  notFoundTitle: "Page not found",
  notFoundBody: "This page does not exist or has been moved.",
  notFoundLink: "← Back to the home page",
  errorTitle: "Something went wrong",
  errorBody:
    "Something went wrong on my side. Try again, or go back to the home page.",
  errorRetry: "Try again",
  errorEyebrow: "Error",
  errorRef: "Ref.",
  notFoundEyebrow: "Error 404",

  navLabel: "Main navigation",
  menuOpen: "Menu",
  menuClose: "Close",
  toTop: "Back to the top of the page",
  themeToDay: "Switch to day mode",
  themeToNight: "Switch to night mode",
  languageName: "English",
  newTab: "opens in a new tab",
  portraitAlt: `Portrait of ${frenchSite.name}`,
  scrollCue: "Scroll",
  footerWrite: "Write to me",
  cvShort: "CV (PDF, in French)",
  writeMessage: "Write a message",
  copyAction: "Copy the email address",
  copyConfirm: "Address copied",

  availabilityTitle: "Availability",
  selectionOne: "One recent project",
  selectionMany: "{count} recent projects",
  selectionSub: "The most recent and the most substantial.",
  selectionIndex: "See the project index",
  panelOf: "of",
  viewProject: "View the project",
  methodTitle: "The principles I apply",
  skillsTitle: "What I use, and where to see it",
  skillsTechnologies: "technologies",
  skillsDomains: "domains",
  skillsProjectOne: "published project",
  skillsProjectMany: "published projects",
  parcoursLink: "Full background",
  formationTitle: "Education",
  experiencesTitle: "Experience",

  projectsEyebrow: "Index",
  projectsDescription: "Full-stack web applications, built solo and in teams.",
  projectsSummaryOne: "{count} project, {years}.",
  projectsSummaryMany: "{count} projects, {years}.",
  yearsSingle: "in {year}",
  yearsRange: "from {first} to {last}",
  kindPersonal: "Personal project",
  kindSchool: "School project",
  groupPersonal: "Personal projects",
  groupSchool: "School projects",
  frameLabel: "Context",
  stackLabel: "Stack",
  statusLabel: "Status",
  linksLabel: "Links",
  repoShort: "Repository",
  demoShort: "Demo",
  repoLong: "GitHub repository",
  demoLong: "Live demo",
  repoLabel: "GitHub repository of {title}",
  demoLabel: "Live demo of {title}",
  pagerLabel: "Previous and next project",

  aboutTitle: "About",
  aboutEyebrow: "Background",
  languagesTitle: "Languages",
  documentTitle: "Document",
  strengthsTitle: "Strengths",
  interestsTitle: "Beyond code",
  contactEyebrow: "Contact",
  emailLabel: "Email",
  elsewhereLabel: "Elsewhere",

  keywords: [
    "web developer",
    "full-stack",
    "apprenticeship",
    "Paris",
    "React",
    "Laravel",
    "Spring Boot",
  ],
};

export const form: Localized<typeof frenchForm> = {
  name: "Name",
  email: "Email",
  message: "Message",
  submit: "Send",
  pending: "Sending…",
  success: "Message sent. I reply within 24 hours.",
  error: "Something went wrong. Try again or write to me directly.",
  unconfigured: `The form is not set up yet. Write to me directly at ${frenchSite.email}.`,
  invalid: "Please correct the fields marked below.",
  nameMissing: "Please enter your name.",
  emailInvalid: "Invalid email address.",
  messageShort: "Your message is a little short.",
  messageLong: "Your message is over 5,000 characters.",
  honeypot: "Leave empty",
};

checkCopy(
  { site, availability, hero, presentation, nav, sections, copy, form },
  "content/en/site.ts",
  "en",
);
