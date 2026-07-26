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
  linkedin: null as string | null, // TODO, pas public à ce jour
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
  headline: "Recherche alternance 14 mois",
  windowLabel: "Période",
  window: "de septembre 2026 à fin octobre 2027",
  rhythmLabel: "Rythme",
  rhythm: "6 semaines en entreprise, 2 semaines en formation",
  /** Le bandeau défilant. Chaque entrée reprend un fait déjà présent ci-dessus. */
  ticker: [
    "Disponible septembre 2026",
    "Alternance 14 mois",
    "6 semaines en entreprise, 2 semaines en formation",
    "Paris et Île-de-France",
  ],
} as const;

export const hero = {
  role: site.role,
  tagline:
    "Apprenti développeur web à Epitech, je construis des expériences web propres, modernes et accessibles.",
} as const;

export const presentation =
  "Développeur web full-stack formé sur le terrain : c’est en créant mon site e-commerce en auto-entrepreneur que j’ai découvert le code. Aujourd’hui à la Web@cadémie by Epitech Paris (2025 à 2027), je conçois des applications avec PHP et Laravel, Java et Spring Boot, React, et je recherche une alternance de 14 mois dès septembre 2026, à raison de 6 semaines en entreprise pour 2 semaines en formation.";

export const navItems = [
  { href: "/", label: "~/", title: "Accueil" },
  { href: "/projets", label: "~/projets", title: "Projets" },
  { href: "/a-propos", label: "~/a-propos", title: "À propos" },
  { href: "/contact", label: "~/contact", title: "Contact" },
] as const;

/**
 * Les chapitres de la page d’accueil. L’ordinal et le libellé sont deux champs
 * distincts plutôt qu’une seule chaîne ponctuée : la mise en page les compose
 * elle-même en les empilant, sans rien entre les deux, et chacun peut être
 * affiché sans l’autre.
 */
export const sections = {
  selection: { ordinal: "01", label: "Sélection" },
  parcours: { ordinal: "02", label: "Parcours" },
  competences: { ordinal: "03", label: "Compétences" },
  contact: { ordinal: "04", label: "Contact" },
} as const;

export const copy = {
  projectsHeading: "Index des projets",
  contactHeading: "Prendre contact",
  contactSub: "Une question, une opportunité ? Je réponds sous 24 h.",
  cvButton: "Télécharger le CV (PDF)",
  copyIdle: "copier",
  copyDone: "copié",
  sourceLink: "Code source ↗",
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
} as const;

// Chaque texte affiché passe la relecture, y compris ceux ajoutés plus tard :
// un nouvel export se déclare simplement dans cet appel.
checkCopy({ availability, hero, presentation, navItems, sections, copy, form });
