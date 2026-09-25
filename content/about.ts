/** Parcours, expériences, formation et langues. Voir MODIFIER.md. */

import { checkAbout, checkMethod } from "@/content/check";
import { featuredProjects } from "@/content/projects";

export const parcours: readonly string[] = [
  "Avant Epitech, j’ai occupé plusieurs emplois, notamment dans la restauration et l’entretien d’espaces verts. J’ai ensuite développé une activité de vente en ligne de visuels générés par IA avec Midjourney.",
  "La création de ma boutique m’a fait découvrir le développement web. J’ai poursuivi avec des projets personnels, puis rejoint la Web@cadémie by Epitech pour en faire mon métier. Mon expérience d’auto-entrepreneur nourrit ma façon de travailler, avec une attention portée au besoin, au produit et à la relation client.",
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
  title: "Développeur intégrateur web",
  credential: "Titre RNCP de niveau 5",
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
    title: "Valider les données entrantes",
    body: "Sur Overkill, un DTO définit les contraintes des offres reçues du collecteur et Symfony les valide avant l’écriture en base. Sur Corelab, Zod valide les données de connexion avant la recherche de l’utilisateur.",
    projects: ["overkill", "corelab"],
  },
  {
    title: "Contrôler les accès",
    body: "Sur Corelab, un middleware vérifie le jeton JWT et les routes concernées contrôlent le rôle de l’utilisateur. Les mots de passe générés à l’import des utilisateurs sont hachés avec bcrypt.",
    projects: ["corelab"],
  },
  {
    title: "Signaler les échecs de chargement",
    body: "Quand une capture d’ampli ne se charge pas dans Tonecraft, entendre du son ne prouve pas qu’elle fonctionne. L’interface attend une confirmation du moteur et signale l’échec. Les tests en navigateur vérifient ce chargement avant la publication.",
    projects: ["tonecraft"],
  },
  {
    title: "Simplifier le parcours",
    body: "Tonecraft réunit simulation guitare, tablatures et outils de pratique dans la même page. Le lecteur et ses instruments ne sont chargés qu’à l’ouverture d’une partition. Un visiteur peut écouter la démonstration sans activer le micro.",
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
      "alphaTab",
      "IndexedDB",
    ],
  },
  {
    domain: "Audio et natif",
    technologies: ["C++", "Rust", "WebAssembly", "Web Audio API"],
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
