/** Parcours, expériences, formation et langues. Voir MODIFIER.md. */

import { checkAbout } from "@/content/check";

export const parcours: readonly string[] = [
  "Avant Epitech, j’ai travaillé dans divers emplois alimentaires et de restauration. Avec la démocratisation de l’IA et des modèles de diffusion tels que Midjourney, j’y ai vu une opportunité de me lancer dans l’auto-entrepreneuriat.",
  "C’est à ce moment-là que j’ai découvert le développement web en créant mes premiers projets personnels. J’ai rapidement accroché à ce domaine, ce qui m’a donné envie d’en faire ma profession.",
];

export type Experience = {
  readonly role: string;
  readonly period: string;
  readonly context: string;
  readonly description: string;
};

export const experiences: readonly Experience[] = [
  {
    role: "Auto-entrepreneur",
    period: "janvier 2022 à décembre 2024",
    context: "Contenu numérique IA et e-commerce",
    description:
      "Création, production et vente de contenus numériques générés par IA. Point de départ de ma reconversion vers le développement web.",
  },
  {
    role: "Agent d’espaces verts",
    period: "2021 à 2022",
    context: "AITA, intérim à Angers",
    description:
      "Entretien des espaces verts des communes d’Angers en équipe : coordination, rigueur et respect des consignes de sécurité.",
  },
  {
    role: "Coach & joueur esport",
    period: "2016 à 2021",
    context: "Compétition & coaching",
    description:
      "Encadrement de joueurs et d’équipes : analyse de performance, pédagogie, communication et gestion de groupe.",
  },
];

export const formation = {
  title: "Intégrateur-Développeur Web",
  credential: "Titre RNCP Niv. 5",
  period: "2025 à 2027",
  school: "Web@cadémie by Epitech",
  place: "Le Kremlin-Bicêtre (94)",
  detail: "Formation 24 mois dont 14 en alternance",
} as const;

export const langues: readonly {
  readonly name: string;
  readonly level: string;
}[] = [
  { name: "Français", level: "natif" },
  { name: "Anglais", level: "C2, courant" },
];

// Textes vides, apostrophes droites, espaces ordinaires contre une ponctuation
// double : la compilation s'arrête ici plutôt que de publier la page.
checkAbout({ parcours, experiences, formation, langues });
