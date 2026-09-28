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
  window: "from September 2026",
  rhythmLabel: "Schedule",
  rhythm: "6 weeks at the company, 2 weeks in training",
  targetLabel: "Target role",
  target: "Full-stack web developer, PHP / Symfony and React / TypeScript",
  schoolLabel: "School",
  diplomaLabel: "Qualification",
  placeLabel: "Location",
};

export const hero: Localized<typeof frenchHero> = {
  role: site.role,
  tagline:
    "Full-stack web developer in training at Web@cadémie by Epitech, looking for a 12-month apprenticeship from September 2026.",
};

export const presentation =
  "I discovered code while starting the e-commerce site of my own business as a sole trader. I am now training at Web@cadémie by Epitech Paris (2025 to 2027), where I mostly build with PHP and Symfony, and with React and TypeScript.";

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
  contactSub: "For an apprenticeship offer or a question about a project, write to me.",
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
  cvShort: "CV (PDF, in French)",
  writeMessage: "Write a message",
  copyAction: "Copy the email address",
  copyConfirm: "Address copied",

  availabilityTitle: "Availability",
  selectionIndex: "See the project index",
  parcoursLink: "Full background",
  formationTitle: "Education",
  experiencesTitle: "Experience",
  skillsUsedIn: "Used in:",

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
  documentTitle: "Document",
  strengthsTitle: "Strengths",
  interestsTitle: "Interests",
  emailLabel: "Email",
  elsewhereLabel: "Elsewhere",

  keywords: [
    "web developer",
    "full-stack",
    "apprenticeship",
    "Paris",
    "React",
    "Symfony",
    "TypeScript",
  ],
};

export const form: Localized<typeof frenchForm> = {
  required: "Every field is needed.",
  name: "Name",
  email: "Email",
  message: "Message",
  submit: "Send",
  pending: "Sending…",
  success: "Message sent, thank you. I will reply to you personally, by email.",
  error: "The message did not go through, because of an error on my side. Try again, or write to me directly.",
  interrupted:
    "The message did not go through, the connection was interrupted. Your text is still here: try again, or write to me directly.",
  unconfigured: `The form is not set up yet. Write to me directly at ${frenchSite.email}.`,
  invalid: "Please correct the fields marked below.",
  nameMissing: "Please enter your name.",
  emailInvalid: "Check the email address, in the form name@company.com.",
  messageShort: "Your message is a little short; add a few words.",
  messageLong: "Your message is over 5,000 characters; please shorten it.",
  honeypot: "Leave empty",
};

checkCopy(
  { site, availability, hero, presentation, nav, sections, copy, form },
  "content/en/site.ts",
  "en",
);
