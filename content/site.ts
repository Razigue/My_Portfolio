/**
 * Identité et textes d'interface. Voir MODIFIER.md.
 *
 * Un champ à `null` ne rend rien du tout : jamais un lien désactivé, jamais un
 * `mailto:#`, jamais un bouton grisé, jamais « bientôt ». Une absence doit se
 * lire comme un choix, et cette règle rend structurellement impossible la
 * publication d'un lien mort.
 */

import { checkCopy, checkSite } from "@/content/check";

export const site = {
  name: "Razigue Benhmida",
  role: "Développeur web full-stack",
  location: "Paris, mobilité Île-de-France",
  email: "razigue.benhmida@epitech.eu",
  github: "https://github.com/Razigue",
  cvUrl: "/cv-razigue-benhmida.pdf",
  linkedin: "https://www.linkedin.com/in/benhmida-razigue" as string | null, // repris du CV
  phone: null as string | null, // volontairement absent du balisage
  sourceRepo: null as string | null, // TODO, ce portfolio n’est pas encore publié

  // Le domaine retenu. Il alimente `metadataBase`, les URL canoniques, le
  // `sitemap.xml`, `robots.txt` et le JSON-LD, qui réclament tous une origine
  // absolue. Tant que le DNS ne pointe pas ici, ces adresses désignent un site
  // qui ne répond pas — sans rien casser en local ni à la compilation. Voir
  // TODO.md §1.
  url: "https://razigue.com",
} as const;

checkSite(site);

export const availability = {
  headline: "Recherche alternance 12 mois",
  windowLabel: "Période",
  window: "à partir de septembre 2026",
  rhythmLabel: "Rythme",
  rhythm: "6 semaines en entreprise, 2 semaines en formation",
  targetLabel: "Poste visé",
  target: "Développeur web full-stack, PHP / Laravel et React",
  // L’école, le diplôme et le lieu ne se saisissent pas ici : ils sont lus
  // dans `formation` (content/about.ts) et dans `site.location`.
  schoolLabel: "École",
  diplomaLabel: "Diplôme préparé",
  placeLabel: "Lieu",
} as const;

export const hero = {
  role: site.role,
  tagline:
    "En formation à la Web@cadémie by Epitech, je trouve des solutions et je les développe en applications web. Je recherche une alternance en développement full-stack.",
} as const;

export const presentation =
  "Développeur web full-stack formé sur le terrain : c’est en créant mon site e-commerce en auto-entrepreneur que j’ai découvert le code. Aujourd’hui à la Web@cadémie by Epitech Paris (2025 à 2027), je conçois des applications avec PHP et Laravel, Java et Spring Boot, React, et je recherche une alternance de 12 mois dès septembre 2026, à raison de 6 semaines en entreprise pour 2 semaines en formation.";

/** Les entrées du menu. Les adresses se calculent dans `lib/i18n.ts`. */
export const nav = {
  home: "Accueil",
  projects: "Projets",
  about: "À propos",
  contact: "Contact",
} as const;

/**
 * Les chapitres de la page d’accueil. L’ordinal et le libellé sont deux champs
 * distincts plutôt qu’une seule chaîne ponctuée : la mise en page les compose
 * elle-même en les empilant, sans rien entre les deux, et chacun peut être
 * affiché sans l’autre.
 */
export const sections = {
  selection: { ordinal: "01", label: "Sélection" },
  methode: { ordinal: "02", label: "Méthode" },
  competences: { ordinal: "03", label: "Compétences" },
  parcours: { ordinal: "04", label: "Parcours" },
  contact: { ordinal: "05", label: "Contact" },
} as const;

export const copy = {
  projectsHeading: "Index des projets",
  contactHeading: "Prendre contact",
  contactSub: "Une question, une opportunité ? Je réponds sous 24 h.",
  cvButton: "Télécharger le CV (PDF)",
  heroContact: "Me contacter",
  copyIdle: "copier",
  copyDone: "copié",
  sourceLink: "Code source ↗",
  approachTitle: "La démarche",
  diagramOr: "ou",
  diagramApart: "à côté",
  shotShow: "Voir l’aperçu",
  shotHide: "Masquer l’aperçu",
  statusLive: "en ligne",
  statusArchived: "archivé",
  skipLink: "Aller au contenu",
  notFoundTitle: "Page introuvable",
  notFoundBody: "Cette page n’existe pas ou a été déplacée.",
  notFoundLink: "← Retour à l’accueil",
  errorTitle: "Une erreur est survenue",
  errorBody:
    "Quelque chose s’est mal passé de mon côté. Réessayez, ou revenez à l’accueil.",
  errorRetry: "Réessayer",
  errorEyebrow: "Erreur",
  errorRef: "Réf.",
  notFoundEyebrow: "Erreur 404",

  // En-tête et mobilier de page
  navLabel: "Navigation principale",
  menuOpen: "Menu",
  menuClose: "Fermer",
  toTop: "Retour en haut de la page",
  themeToDay: "Passer en mode jour",
  themeToNight: "Passer en mode nuit",
  /** Le nom de la langue, affiché dans le pied de page des pages anglaises pour revenir ici. */
  languageName: "Français",
  newTab: "nouvel onglet",
  portraitAlt: `Portrait de ${site.name}`,
  scrollCue: "Défiler",
  footerWrite: "Écrivez-moi",
  cvShort: "CV (PDF)",
  writeMessage: "Écrire un message",
  copyAction: "Copier l’adresse email",
  copyConfirm: "Adresse copiée",

  // Accueil. `{count}` est remplacé par le nombre écrit en toutes lettres.
  availabilityTitle: "Disponibilité",
  selectionOne: "Un projet récent",
  selectionMany: "{count} projets récents",
  selectionSub: "Les plus récents et les plus substantiels.",
  selectionIndex: "Voir l’index des projets",
  panelOf: "sur",
  viewProject: "Voir le projet",
  methodTitle: "Les principes que j’applique",
  skillsTitle: "Ce que j’utilise, et où le voir",
  skillsTechnologies: "technologies",
  skillsDomains: "domaines",
  skillsProjectOne: "projet publié",
  skillsProjectMany: "projets publiés",
  parcoursLink: "Parcours complet",
  formationTitle: "Formation",
  experiencesTitle: "Expériences",

  // Projets. `{years}`, `{year}`, `{first}`, `{last}` et `{title}` se calculent.
  projectsEyebrow: "Index",
  projectsDescription: "Applications web full-stack, en solo et en équipe.",
  projectsSummaryOne: "{count} projet, {years}.",
  projectsSummaryMany: "{count} projets, {years}.",
  yearsSingle: "en {year}",
  yearsRange: "de {first} à {last}",
  kindPersonal: "Projet personnel",
  kindSchool: "Projet d’école",
  groupPersonal: "Projets personnels",
  groupSchool: "Projets d’école",
  frameLabel: "Cadre",
  stackLabel: "Stack",
  statusLabel: "État",
  linksLabel: "Liens",
  repoShort: "Dépôt",
  demoShort: "Démo",
  repoLong: "Dépôt GitHub",
  demoLong: "Démo en ligne",
  repoLabel: "Dépôt GitHub de {title}",
  demoLabel: "Démo en ligne de {title}",
  pagerLabel: "Projet précédent et suivant",

  // À propos et contact
  aboutTitle: "À propos",
  languagesTitle: "Langues",
  documentTitle: "Document",
  strengthsTitle: "Atouts",
  interestsTitle: "Au-delà du code",
  contactEyebrow: "Contact",
  emailLabel: "Email",
  elsewhereLabel: "Ailleurs",

  /** Les mots-clés lus par les moteurs de recherche. */
  keywords: [
    "développeur web",
    "full-stack",
    "alternance",
    "Paris",
    "React",
    "Laravel",
    "Spring Boot",
  ],
} as const;

export const form = {
  name: "Nom",
  email: "Email",
  message: "Message",
  submit: "Envoyer",
  pending: "Envoi…",
  success: "Message envoyé. Je réponds sous 24 h.",
  error: "Une erreur est survenue. Réessayez ou écrivez-moi directement.",
  unconfigured: `Le formulaire n’est pas encore configuré. Écrivez-moi directement à ${site.email}.`,
  invalid: "Corrigez les champs signalés.",
  nameMissing: "Indiquez votre nom.",
  emailInvalid: "Adresse email invalide.",
  messageShort: "Votre message est un peu court.",
  messageLong: "Votre message dépasse 5 000 caractères.",
  honeypot: "Ne pas remplir",
} as const;

// Chaque texte affiché passe la relecture, y compris ceux ajoutés plus tard :
// un nouvel export se déclare simplement dans cet appel.
checkCopy({ availability, hero, presentation, nav, sections, copy, form });
