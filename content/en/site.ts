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
  location: "Paris and all of Île-de-France, remote work welcome",
};

export const availability: Localized<typeof frenchAvailability> = {
  headline: "Looking for a 12-month apprenticeship",
  windowLabel: "Period",
  window: "as soon as possible",
  rhythmLabel: "Schedule",
  rhythm: "6 weeks at the company, 2 weeks in training",
  targetLabel: "Target role",
  target: "Full-stack web developer",
  languages: "JavaScript / TypeScript, PHP, Java",
  schoolLabel: "School",
  diplomaLabel: "Qualification",
  placeLabel: "Location",
};

export const hero: Localized<typeof frenchHero> = {
  role: site.role,
  tagline:
    "Full-stack web developer with a logical mind, with AI in my toolkit since 2022. Looking for a 12-month apprenticeship, starting as soon as possible.",
};

export const presentation =
  "I have a logical mind, and AI has been in my toolkit since 2022. I am training as a developer at Web@cadémie by Epitech, as agentic coding takes off. I design, I code and I test. AI helps me go faster, and the decisions stay mine.";

export const nav: Localized<typeof frenchNav> = {
  home: "Home",
  projects: "Projects",
  about: "About",
  contact: "Contact",
};

/** The section titles of the home page, in the order they come. */
export const sections: Localized<typeof frenchSections> = {
  projets: "Projects",
  parcours: "Background",
  competences: "Skills",
  methode: "Method",
  contact: "Contact",
};

export const copy: Localized<typeof frenchCopy> = {
  projectsHeading: "Project index",
  contactHeading: "Get in touch",
  contactSub: "An apprenticeship offer, a question about a project? Write to me.",
  cvButton: "Download the CV (PDF, in French)",
  heroContact: "Contact me",
  copyIdle: "Copy",
  copyDone: "Copied",
  sourceLink: "Source code ↗",
  approachTitle: "The approach",
  diagramOr: "or",
  statusLive: "live",
  statusArchived: "archived",
  skipLink: "Skip to content",
  notFoundTitle: "Page not found",
  notFoundBody: "This page does not exist or has been moved.",
  notFoundLink: "Back to the home page",
  errorTitle: "Something went wrong",
  errorBody:
    "A problem on my side. Try again or go back to the home page.",
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
  themeDay: "Day mode",
  themeNight: "Night mode",
  languageName: "English",
  newTab: "opens in a new tab",
  portraitAlt: `Portrait of ${frenchSite.name}`,
  cvShort: "CV (PDF, in French)",
  writeMessage: "Write a message",
  copyAction: "Copy the email address",
  copyConfirm: "Address copied",

  availabilityTitle: "Availability",
  spotlightLabel: "Featured project",
  spotlightLink: "See the project",
  selectionIndex: "See the project index",
  parcoursLink: "Full background",
  formationTitle: "Education",
  experiencesTitle: "Experience",
  skillsUsedIn: "Used in:",

  projectsDescription: "Full-stack web applications, built solo and in teams.",
  projectsSummaryOne: "{count} project.",
  projectsSummaryMany: "{count} projects.",
  kindPersonal: "Personal project",
  kindSchool: "School project",
  groupPersonal: "Personal projects",
  groupSchool: "School projects",
  frameLabel: "Context",
  stackLabel: "Stack",
  stackHide: "Hide the other technologies",
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
  languagesTitle: "Languages",
  documentTitle: "CV",
  strengthsTitle: "Strengths",
  interestsTitle: "Interests",
  emailLabel: "Email",
  elsewhereLabel: "Elsewhere",

  caseStudy: "Read the case study",
  allProjects: "All projects",
  closingTitle: "Let’s talk about your apprenticeship",
  learnLink: "And what I want to learn at the company",

  keywords: [
    "web developer",
    "full-stack",
    "apprenticeship",
    "Paris",
    "React",
    "Symfony",
    "TypeScript",
    "AI",
    "Claude Code",
  ],
};

export const form: Localized<typeof frenchForm> = {
  name: "Name",
  email: "Email",
  message: "Message",
  submit: "Send",
  note: "Your message goes to my inbox. I reply myself.",
  pending: "Sending…",
  success: "Message sent, thank you. I will reply by email.",
  error: "The message did not go through, an error on my side. Try again or write to me directly.",
  interrupted:
    "Connection lost, the message did not go through. Your text is kept: try again.",
  unconfigured: `The form is not set up yet. Write to me directly at ${frenchSite.email}.`,
  invalid: "Please correct the fields marked below.",
  missing: "Every field is needed.",
  nameMissing: "Please enter your name.",
  emailMissing: "Please enter your email address.",
  messageMissing: "Please write your message.",
  emailInvalid: "Invalid address, in the form name@company.com.",
  messageShort: "A little short, add a few words.",
  messageLong: "5,000 characters at most, please shorten it.",
  honeypot: "Leave empty",
};

checkCopy(
  { site, availability, hero, presentation, nav, sections, copy, form },
  "content/en/site.ts",
  "en",
);
