/** Parcours, expériences, formation et langues. Voir MODIFIER.md. */

import { checkAbout, checkMethod } from "@/content/check";
import { featuredProjects } from "@/content/projects";

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
      "Boutique en ligne de visuels générés par IA, gérée en autonomie complète : production, produit et relation client. Les visuels étaient produits sur Midjourney, en itérant les prompts pour tenir le style, le cadrage et la qualité. Point de départ de ma reconversion vers le développement web.",
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
  detail: "Formation 24 mois dont 12 en alternance",
} as const;

export const langues: readonly {
  readonly name: string;
  readonly level: string;
}[] = [
  { name: "Français", level: "natif" },
  { name: "Anglais", level: "C2, courant" },
];

/** Les qualités du CV, chacune avec ce qui la montre. */
export const atouts: readonly {
  readonly name: string;
  readonly detail: string;
}[] = [
  {
    name: "Autonomie",
    detail: "Une auto-entreprise menée seul, de l’idée à la mise en ligne.",
  },
  {
    name: "Esprit d’équipe",
    detail: "Le peer-learning au quotidien à la Web@cadémie.",
  },
  {
    name: "Sens du produit",
    detail: "L’habitude de penser client, usage et résultat.",
  },
];

/** Au-delà du code. Repris du CV, sans rien y ajouter. */
export const interets: readonly {
  readonly name: string;
  readonly detail: string;
}[] = [
  {
    name: "Esport compétitif",
    detail:
      "De nombreux tournois en équipe, et une culture stratégique issue de la compétition.",
  },
  {
    name: "Guitare",
    detail: "Des concours internationaux, en catégorie solo.",
  },
  {
    name: "Technologie",
    detail: "Une veille constante sur les outils et les produits numériques.",
  },
];

// Textes vides, apostrophes droites, espaces ordinaires contre une ponctuation
// double : la compilation s'arrête ici plutôt que de publier la page.
checkAbout({ parcours, experiences, formation, langues, atouts, interets });

/**
 * Ce que je tiens dans le code. Chaque principe cite les projets publiés qui le
 * montrent, et ne dit rien que « La démarche » de ces projets ne dise déjà.
 */
export const principes: readonly {
  readonly title: string;
  readonly body: string;
  readonly projects: readonly string[];
}[] = [
  {
    title: "Valider à l’entrée, jamais après",
    body: "Les offres d’Overkill arrivent d’un collecteur, pas d’un formulaire : personne ne relit ce qui entre, alors un DTO valide chaque JSON avant qu’il atteigne la base. Sur Corelab, le formulaire de connexion passe par Zod avant de toucher quoi que ce soit.",
    projects: ["overkill", "corelab"],
  },
  {
    title: "Contrôler qui a le droit",
    body: "Sur Corelab, l’accès passe par un middleware qui vérifie le jeton JWT, puis le rôle. Les mots de passe générés à l’import des utilisateurs sont hachés par bcrypt.",
    projects: ["corelab"],
  },
  {
    title: "Dire ce qui échoue en silence",
    body: "Quand le moteur de Tonecraft ne démarre pas, la chaîne laisse passer le son sec et rien n’a l’air cassé. L’interface l’écrit donc en toutes lettres, et un test de bout en bout en navigateur vérifie à chaque commit que la capture tourne.",
    projects: ["tonecraft"],
  },
  {
    title: "Ne rien afficher qui ne fait rien",
    body: "Une capture d’ampli ne se règle pas, donc l’ampli de Tonecraft ne porte aucun curseur. La démonstration n’ouvre aucun micro et ne demande aucune permission, et le test compte les appels plutôt que de croire la phrase.",
    projects: ["tonecraft"],
  },
];

/**
 * Les technologies, rangées par domaine. La liste reprend le CV et la stack des
 * projets. Ce que l’accueil affiche à côté de chacune, les projets où elle sert,
 * se calcule à partir de `content/projects.ts`.
 */
export const competences: readonly {
  readonly domain: string;
  readonly technologies: readonly string[];
}[] = [
  {
    domain: "Back-end",
    technologies: [
      "PHP",
      "Laravel",
      "Symfony",
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "API REST",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    domain: "Front-end",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Svelte",
      "Astro",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "WebAssembly",
      "Web Audio API",
    ],
  },
  {
    domain: "DevOps et qualité",
    technologies: ["Docker", "GitHub Actions", "CI/CD", "ESLint", "Jest", "Playwright"],
  },
  {
    domain: "Outils",
    technologies: ["Git", "Linux", "VS Code", "Trello"],
  },
];

checkMethod({ principes, competences }, featuredProjects);
