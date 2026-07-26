/**
 * Les projets. Voir MODIFIER.md pour en ajouter un.
 *
 * Réconciliés depuis trois sources, dans l'ordre de priorité CV, puis GitHub,
 * puis l'ancien portfolio. Six liens de dépôt ont été repointés depuis
 * l'organisation privée `EpitechWebAcademiePromo2027`, qui renvoie une 404 à
 * tout visiteur, vers les miroirs publics du compte personnel. Ne pas les
 * « corriger » en sens inverse.
 *
 * `highlights` ne peut que reformuler des faits déjà présents dans
 * `description` ou `stack` : ni chiffre, ni durée, ni résultat, ni adjectif sur
 * l'impact. Rien qui ne soit vérifiable.
 */

import { checkProjects } from "@/content/check";
import { capitalise, cardinal } from "@/lib/french";

export type ProjectStatus = "live" | "archived";

export type Project = {
  readonly slug: string;
  readonly title: string;
  /** The qualifier set in italics under the title, when the project has one. */
  readonly subtitle: string | null;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly year: number;
  /** `null` renders nothing at all. Never a disabled or placeholder link. */
  readonly repo: string | null;
  readonly demo: string | null;
  readonly status: ProjectStatus;
};

const GH = "https://github.com/";

export const projects: readonly Project[] = [
  {
    slug: "corelab",
    title: "Corelab",
    subtitle: "plateforme e-learning",
    description:
      "API REST sécurisée : authentification JWT, contrôle d’accès par rôles et CRUD complet (Mongoose, bcrypt, Zod).",
    highlights: [
      "Authentification JWT",
      "Contrôle d’accès par rôles",
      "CRUD complet (Mongoose, bcrypt, Zod)",
    ],
    stack: ["Node.js", "Express", "MongoDB"],
    year: 2026,
    repo: `${GH}Razigue/Corelab`,
    demo: null,
    status: "archived",
  },
  {
    slug: "connect-in-v2",
    title: "Connect’In v2",
    subtitle: null,
    description:
      "Refonte du réseau social : nouvelles fonctionnalités, refactorisation de l’architecture et interface repensée.",
    highlights: [
      "Nouvelles fonctionnalités",
      "Refactorisation de l’architecture",
      "Interface repensée",
    ],
    stack: ["Spring Boot", "React", "MySQL"],
    year: 2026,
    repo: `${GH}Razigue/Connectin_V2`,
    demo: null,
    status: "archived",
  },
  {
    slug: "epitone",
    title: "Epitone",
    subtitle: "VST dans le navigateur",
    description:
      "Projet perso : un VST guitare (ampli & effets) jouable directement dans le navigateur, prototypé avec la Web Audio API.",
    highlights: [
      "Ampli et effets guitare",
      "Jouable directement dans le navigateur",
      "Prototypé avec la Web Audio API",
    ],
    stack: ["React", "Web Audio API"],
    year: 2026,
    repo: null,
    demo: null,
    status: "archived",
  },
  {
    slug: "securite-llm",
    title: "Sécurité LLM",
    subtitle: "prompt injection",
    description:
      "Système durci protégeant des valeurs secrètes : compartimentation, anti-acrostiche, anti-encodage, allow-list.",
    highlights: [
      "Compartimentation",
      "Anti-acrostiche et anti-encodage",
      "Allow-list",
    ],
    stack: ["Ollama", "Modelfile"],
    year: 2026,
    repo: null,
    demo: null,
    status: "archived",
  },
  {
    slug: "automatisation-ia",
    title: "Automatisation IA",
    subtitle: null,
    description:
      "Workflows automatisés connectés à un modèle de langage exécuté en local sous Linux.",
    highlights: [
      "Workflows automatisés",
      "Modèle de langage exécuté en local sous Linux",
    ],
    stack: ["n8n", "Ollama", "Linux"],
    year: 2026,
    repo: null,
    demo: null,
    status: "archived",
  },
  {
    slug: "generateur-de-cv",
    title: "Générateur de CV",
    subtitle: null,
    description:
      "Application PHP avec prévisualisation en temps réel au format A4 et export PDF.",
    highlights: [
      "Prévisualisation en temps réel au format A4",
      "Export PDF",
    ],
    stack: ["HTML", "CSS", "PHP"],
    year: 2026,
    repo: `${GH}Razigue/CV_Generator`,
    demo: null,
    status: "archived",
  },
  {
    slug: "connect-in",
    title: "Connect’In",
    subtitle: "réseau social",
    description:
      "Partage de posts façon LinkedIn : architecture en couches, auth JWT, CORS et upload de fichiers.",
    highlights: [
      "Architecture en couches",
      "Authentification JWT et CORS",
      "Upload de fichiers",
    ],
    stack: ["PHP", "Laravel", "MySQL"],
    year: 2025,
    repo: `${GH}Razigue/Connectin`,
    demo: null,
    status: "archived",
  },
  {
    slug: "jeuvideops",
    title: "JeuVideOPS",
    subtitle: "CI/CD",
    description:
      "Pipeline d’intégration continue pour jeux JS rétro : ESLint, tests unitaires et E2E, audit npm, déploiement Pages.",
    highlights: [
      "ESLint et audit npm",
      "Tests unitaires et E2E",
      "Déploiement GitHub Pages",
    ],
    stack: ["GitHub Actions", "Jest", "Playwright"],
    year: 2025,
    repo: `${GH}Razigue/JeuVideoOPS`,
    demo: null,
    status: "archived",
  },
  {
    slug: "learnsphere",
    title: "LearnSphere",
    subtitle: "e-learning",
    description:
      "Custom post types, thème block, shortcode de quiz et configuration de plugins (projet en binôme).",
    highlights: [
      "Custom post types et thème block",
      "Shortcode de quiz",
      "Projet en binôme",
    ],
    stack: ["WordPress", "ACF", "PHP"],
    year: 2025,
    repo: `${GH}Razigue/LearnSphere`,
    demo: null,
    status: "archived",
  },
  {
    slug: "my-cinema",
    title: "My Cinema",
    subtitle: null,
    description:
      "Application web de consultation et gestion de films avec backend PHP et base de données.",
    highlights: [
      "Consultation et gestion de films",
      "Backend PHP et base de données",
    ],
    stack: ["HTML", "CSS", "PHP", "SQL"],
    year: 2025,
    repo: `${GH}Razigue/My_Cinema`,
    demo: null,
    status: "archived",
  },
  {
    slug: "popeye",
    title: "Popeye",
    subtitle: "vote distribué",
    description:
      "Infrastructure de vote distribuée orchestrée avec Docker Compose (vote, worker, result).",
    highlights: [
      "Orchestration Docker Compose",
      "Trois services : vote, worker, result",
    ],
    stack: ["Docker", "JavaScript", "Java"],
    year: 2025,
    repo: `${GH}Razigue/Popeye`,
    demo: null,
    status: "archived",
  },
  {
    slug: "integration-maquette-figma",
    title: "Intégration maquette Figma",
    subtitle: null,
    description:
      "Intégration pixel-perfect d’une maquette Figma en HTML & CSS pur.",
    highlights: ["Intégration pixel-perfect", "HTML et CSS purs"],
    stack: ["HTML", "CSS"],
    year: 2025,
    repo: `${GH}Razigue/site-statique`,
    demo: "https://razigue.github.io/site-statique/",
    status: "live",
  },
  {
    slug: "introduction-tailwind",
    title: "Introduction Tailwind",
    subtitle: null,
    description:
      "Reprise du site statique avec un thème libre en Tailwind CSS.",
    highlights: ["Reprise du site statique", "Thème libre en Tailwind CSS"],
    stack: ["HTML", "Tailwind CSS"],
    year: 2025,
    repo: `${GH}Razigue/site-statique-tailwind`,
    demo: "https://razigue.github.io/site-statique-tailwind/",
    status: "live",
  },
] as const;

/** Ceux que met en avant l'accueil, dans cet ordre. */
export const featuredSlugs = ["corelab", "connect-in-v2", "epitone"] as const;

// Slugs inconnus, doublons, statut « en ligne » sans démo, apostrophe droite :
// la compilation s'arrête ici plutôt que de publier la page.
checkProjects(projects, featuredSlugs);

export const featuredProjects: readonly Project[] = featuredSlugs.map((slug) => {
  const project = projects.find((p) => p.slug === slug);
  // `checkProjects` a déjà refusé tout slug inconnu, avec un message qui dit
  // lesquels existent. Ceci est là pour que le type le sache aussi.
  if (!project) throw new Error(`Projet mis en avant introuvable : ${slug}`);
  return project;
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Index sur deux chiffres, tel qu'affiché en tête de ligne. */
export function projectNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/**
 * « Treize projets, de 2025 à 2026. » — calculé, jamais saisi. Ajouter un
 * projet met la phrase à jour toute seule, y compris les années.
 */
export function projectsSummary(): string {
  const years = projects.map((p) => p.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const span = first === last ? `en ${first}` : `de ${first} à ${last}`;
  return `${capitalise(cardinal(projects.length))} projets, ${span}.`;
}
