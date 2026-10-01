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
  location: "Paris et toute l’Île-de-France, télétravail accepté",
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
  window: "dès que possible",
  rhythmLabel: "Rythme",
  rhythm: "6 semaines en entreprise, 2 semaines en formation",
  targetLabel: "Poste visé",
  target: "Développeur web full-stack",
  // Sous le poste visé : la stack principale, React / TypeScript côté
  // interface, Python côté serveur.
  languages: "React, TypeScript, Python",
  // L’école, le diplôme et le lieu ne se saisissent pas ici : ils sont lus
  // dans `formation` (content/about.ts) et dans `site.location`.
  schoolLabel: "École",
  diplomaLabel: "Diplôme préparé",
  placeLabel: "Lieu",
} as const;

export const hero = {
  role: site.role,
  tagline:
    "Développeur web full-stack Python et React, à l’esprit logique, l’IA dans mes outils depuis 2022. Je cherche une alternance de 12 mois, dès que possible.",
} as const;

export const presentation =
  "J’ai l’esprit logique, et l’IA fait partie de mes outils depuis 2022. Je me forme au développement à la Web@cadémie by Epitech, en plein essor du code agentique. Je conçois, je code et je teste. L’IA m’aide à aller plus vite, et les décisions restent les miennes.";

/** Les entrées du menu. Les adresses se calculent dans `lib/i18n.ts`. */
export const nav = {
  home: "Accueil",
  projects: "Projets",
  about: "À propos",
  contact: "Contact",
} as const;

/** Les titres des sections de la page d’accueil, dans l’ordre où elles viennent. */
export const sections = {
  projets: "Projets",
  parcours: "Parcours",
  competences: "Compétences",
  methode: "Méthode",
  contact: "Contact",
} as const;

export const copy = {
  projectsHeading: "Index des projets",
  contactHeading: "Prendre contact",
  contactSub: "Une offre d’alternance, une question sur un projet ? Écrivez-moi.",
  cvButton: "Télécharger le CV (PDF)",
  heroContact: "Me contacter",
  copyIdle: "Copier",
  copyDone: "Copié",
  sourceLink: "Code source ↗",
  approachTitle: "La démarche",
  diagramOr: "ou",
  statusLive: "en ligne",
  statusLocal: "à installer",
  statusArchived: "archivé",
  skipLink: "Aller au contenu",
  notFoundTitle: "Page introuvable",
  notFoundBody: "Cette page n’existe pas ou a été déplacée.",
  notFoundLink: "Retour à l’accueil",
  errorTitle: "Une erreur est survenue",
  errorBody: "Un problème de mon côté. Réessayez ou revenez à l’accueil.",
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
  /** Les mots écrits à côté du disque : le thème qu’on obtient en appuyant. */
  themeDay: "Mode jour",
  themeNight: "Mode nuit",
  /** Le nom de la langue, affiché dans le pied de page des pages anglaises pour revenir ici. */
  languageName: "Français",
  newTab: "nouvel onglet",
  portraitAlt: `Portrait de ${site.name}`,
  cvShort: "CV (PDF)",
  writeMessage: "Écrire un message",
  copyAction: "Copier l’adresse email",
  copyConfirm: "Adresse copiée",

  // Accueil
  availabilityTitle: "Disponibilité",
  spotlightLabel: "Projet à la une",
  spotlightLink: "Voir le projet",
  selectionIndex: "Voir l’index des projets",
  parcoursLink: "Parcours complet",
  formationTitle: "Formation",
  experiencesTitle: "Expériences",
  skillsUsedIn: "Utilisé dans\u00A0:",

  // Projets. `{years}`, `{year}`, `{first}`, `{last}` et `{title}` se calculent.
  projectsDescription: "Applications web full-stack, en solo et en équipe.",
  projectsSummaryOne: "{count} projet.",
  projectsSummaryMany: "{count} projets.",
  kindPersonal: "Projet personnel",
  kindSchool: "Projet d’école",
  groupPersonal: "Projets personnels",
  groupSchool: "Projets d’école",
  frameLabel: "Cadre",
  stackLabel: "Stack",
  /** Ce que dit le lien des autres technologies d’un projet une fois ouvert. */
  stackHide: "Masquer les autres technologies",
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
  documentTitle: "CV",
  strengthsTitle: "Atouts",
  interestsTitle: "Centres d’intérêt",
  emailLabel: "Email",
  elsewhereLabel: "Ailleurs",

  // La refonte du 2026-09-29
  caseStudy: "Lire l’étude de cas",
  allProjects: "Tous les projets",
  // Sous les projets de l’accueil, quand d’autres restent à voir dans l’index.
  moreProjects: "Voir les autres projets",
  closingTitle: "Parlons de votre alternance",
  learnLink: "Et ce que je veux apprendre en entreprise",

  /** Les mots-clés lus par les moteurs de recherche. */
  keywords: [
    "développeur web",
    "full-stack",
    "alternance",
    "Paris",
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "IA",
    "Claude Code",
  ],
} as const;

export const form = {
  name: "Nom",
  email: "Email",
  message: "Message",
  submit: "Envoyer",
  // À côté du bouton : ce que devient le message, avant qu’on l’envoie.
  note: "Le message arrive dans ma boîte mail. Je réponds moi-même.",
  pending: "Envoi…",
  success: "Message envoyé, merci. Je vous réponds par email.",
  error: "Le message n’est pas parti, erreur de mon côté. Réessayez ou écrivez-moi directement.",
  // Quand la connexion coupe pendant l’envoi : le texte tapé est gardé.
  interrupted:
    "Connexion interrompue, le message n’est pas parti. Votre texte est gardé : réessayez.",
  unconfigured: `Le formulaire n’est pas encore configuré. Écrivez-moi directement à ${site.email}.`,
  invalid: "Corrigez les champs signalés.",
  // À l’envoi, quand un champ au moins est resté vide.
  missing: "Tous les champs sont nécessaires.",
  nameMissing: "Indiquez votre nom.",
  emailMissing: "Indiquez votre adresse email.",
  messageMissing: "Écrivez votre message.",
  emailInvalid: "Adresse invalide, du type nom@entreprise.fr.",
  messageShort: "Un peu court, ajoutez quelques mots.",
  messageLong: "5 000 caractères maximum, raccourcissez.",
  honeypot: "Ne pas remplir",
} as const;

// Chaque texte affiché passe la relecture, y compris ceux ajoutés plus tard :
// un nouvel export se déclare simplement dans cet appel.
checkCopy({ availability, hero, presentation, nav, sections, copy, form });
