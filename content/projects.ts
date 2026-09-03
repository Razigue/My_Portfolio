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

import type { StaticImageData } from "next/image";
import tonecraftShot from "@/content/media/tonecraft.png";
import { checkProjects } from "@/content/check";
import { capitalise, cardinal } from "@/lib/french";

export type ProjectStatus = "live" | "archived";

export type ProjectImage = {
  readonly src: StaticImageData;
  /** Read aloud in place of the picture, so it describes it rather than names it. */
  readonly alt: string;
};

export type Project = {
  readonly slug: string;
  readonly title: string;
  /** The qualifier set in italics under the title, when the project has one. */
  readonly subtitle: string | null;
  readonly description: string;
  readonly highlights: readonly string[];
  /**
   * The long-form account, one entry per paragraph, on its own section of the
   * project page. `null` on a project that does not need one, which is most of
   * them: a short page is an honest page.
   */
  readonly approach: readonly string[] | null;
  readonly stack: readonly string[];
  /**
   * A capture of the project, imported as a module rather than served from
   * `public/` so that Next reads its dimensions and builds its blur placeholder
   * itself. `null` on a project that has nothing to show, which is most of
   * them: the pages carry their weight in type.
   */
  readonly image: ProjectImage | null;
  readonly year: number;
  /** `null` renders nothing at all. Never a disabled or placeholder link. */
  readonly repo: string | null;
  readonly demo: string | null;
  readonly status: ProjectStatus;
};

const GH = "https://github.com/";

export const projects: readonly Project[] = [
  {
    slug: "tonecraft",
    title: "Tonecraft",
    subtitle: "ampli guitare dans le navigateur",
    description:
      "Ampli et effets guitare jouables dans un onglet, sans rien installer\u00A0: les étages du signal sont écrits en C++, compilés en WebAssembly et exécutés dans un AudioWorklet.",
    highlights: [
      "Étages du signal écrits en C++ et compilés en WebAssembly",
      "Traitement exécuté dans un AudioWorklet",
      "Jouable dans un onglet, sans rien installer",
    ],
    approach: [
      "Obtenir un bon son de guitare sur un ordinateur demande aujourd’hui une licence et une après-midi\u00A0: installer un hôte, installer un greffon, installer un pilote, puis découvrir que tout arrive avec quarante millisecondes de retard. Tonecraft prend le problème par l’autre bout\u00A0: une adresse, rien à installer, et le son dans l’onglet.",
      "La décision qui arbitre tout le reste, c’est que le moteur n’est pas le produit. Il tourne à la compilation pour rendre à l’avance ce que la plupart des visiteurs entendront, et en temps réel seulement pour ceux qui branchent une guitare. Écouter est le cas fréquent, jouer est le cas rare, et l’architecture est rangée dans cet ordre.",
      "Deux contraintes tiennent l’ensemble. Aucun serveur\u00A0: le site est un jeu de fichiers statiques servis par GitHub Pages, sans base de données, sans compte et sans donnée personnelle. Et une qualité fixe, jamais adaptée à la machine\u00A0: un son partagé par lien doit sonner pareil chez celui qui l’ouvre, ce qu’un moteur se dégradant tout seul rendrait impossible.",
      "La chaîne fonctionne aujourd’hui de bout en bout\u00A0: noise gate, ampli, baffle, limiteur. Les étages sont écrits en C++, compilés en WebAssembly et exécutés dans un AudioWorklet, donc jamais sur le fil principal de la page. L’ampli est décrit en Faust\u00A0: quatre étages de gain modérés plutôt qu’un seul violent, un passe-haut devant chacun pour que les basses ne tournent pas en boue, un passe-bas derrière pour tenir la fizz, et un suréchantillonnage quatre fois autour de la fenêtre non linéaire.",
      "Le reste tient dans une règle\u00A0: ce qui est mesuré est montré. La latence aller-retour est affichée, les décrochages sont comptés, et une entrée audio médiocre — l’entrée micro d’un portable, qui n’offre pas l’impédance qu’attend un micro de guitare — est diagnostiquée et nommée. Rien n’est jamais bloqué\u00A0: qui ne peut pas distinguer un mauvais branchement d’un mauvais moteur accusera le moteur.",
      "Rien de compilé n’entre dans le dépôt. L’intégration continue compile le WebAssembly et publie le site à chaque commit, si bien que la page en ligne est exactement l’image d’une version et qu’un retour en arrière est un revert. Ce qui manque est écrit noir sur blanc dans le dépôt\u00A0: l’overdrive, le compresseur, la réverbération, l’accordeur et le chemin d’écoute sans JavaScript sont spécifiés et pas encore branchés.",
    ],
    stack: ["Astro", "Svelte", "C++", "WebAssembly", "Web Audio API"],
    image: {
      src: tonecraftShot,
      alt: "L’interface de Tonecraft\u00A0: les modules In, Gate, Amp, Cab et Out alignés de gauche à droite, chacun portant ses curseurs.",
    },
    year: 2026,
    repo: `${GH}Razigue/Tonecraft`,
    demo: "https://razigue.github.io/Tonecraft/",
    status: "live",
  },
  {
    slug: "overkill",
    title: "Overkill",
    subtitle: "agrégateur d’offres",
    description:
      "Agrégateur d’offres d’emploi, de stage et d’alternance construit en équipe\u00A0: API Symfony, front React, base PostgreSQL. Ma part couvre les offres et les favoris\u00A0: contrôleurs, DTO de validation, recherche filtrée et pagination.",
    highlights: [
      "Contrôleurs des offres et des favoris",
      "DTO de validation des données entrantes",
      "Recherche filtrée et pagination",
    ],
    approach: [
      "Overkill rassemble au même endroit les offres d’emploi, de stage et d’alternance. C’est un projet d’équipe\u00A0: une API Symfony, un front React, une base PostgreSQL, le tout monté sous Docker. On s’est réparti l’API par domaine.",
      "J’ai eu les offres et les favoris. Le contrôleur des offres porte les routes du domaine\u00A0: lecture filtrée, lecture par identifiant, création, suppression. La recherche accepte des critères cumulables — texte libre, ville, entreprise, contrat, type, télétravail, salaire minimum, catégorie —, les pagine, et ne remonte que les offres publiées dans les trente derniers jours, parce qu’une annonce périmée dans un agrégateur est pire qu’une absence de résultat. Le contrôleur des favoris tient les siennes sur l’utilisateur connecté.",
      "Le DTO est la frontière du domaine. Les offres n’arrivent pas d’un formulaire mais d’un collecteur, donc personne ne relit ce qui entre\u00A0: le titre est obligatoire et borné, le type ne peut valoir que trois valeurs, le pays est un code à deux lettres, les coordonnées doivent tenir dans leurs plages. Le JSON est validé avant d’atteindre la base, jamais après.",
    ],
    stack: ["Symfony", "PHP", "PostgreSQL", "React", "Docker"],
    image: null,
    year: 2026,
    repo: null,
    demo: null,
    status: "archived",
  },
  {
    slug: "corelab",
    title: "Corelab",
    subtitle: "plateforme e-learning",
    description:
      "Plateforme de formation au développement, cours et examens en QCM, construite en équipe avec une API Express et une base MongoDB. Ma part couvre les modèles de données et les routes\u00A0: authentification JWT, contrôle d’accès par rôles, et le CRUD des cours, leçons, quiz et résultats.",
    highlights: [
      "Modèles de données et routes de l’API",
      "Authentification JWT et contrôle d’accès par rôles",
      "CRUD des cours, leçons, quiz et résultats",
    ],
    approach: [
      "Corelab est une plateforme de formation au développement\u00A0: des cours à suivre, des examens en QCM pour vérifier ce qui est retenu, et une administration pour les gérer. C’est un projet d’équipe, et je m’y suis occupé du serveur\u00A0: les modèles de données et les routes.",
      "Les modèles fixent la forme de tout le reste\u00A0: utilisateur, cours, leçon, quiz, résultat, notification. Écrits avec Mongoose, ce sont eux qui décident ce qu’un élève possède, ce qu’un cours contient, et ce qu’est un quiz\u00A0: une suite de questions à choix, chacune avec sa bonne réponse, et un seuil au-delà duquel l’examen est réussi. Une route ne rattrape pas un modèle mal posé.",
      "Les routes suivent\u00A0: le CRUD des cours, des leçons et des quiz, l’enregistrement des résultats, la progression d’un élève, la comparaison d’un score au seuil de réussite, la programmation d’une leçon à une date, l’import d’utilisateurs avec génération du mot de passe par bcrypt, et le mot de passe choisi à la première connexion. L’accès passe par un middleware qui vérifie le jeton JWT puis le rôle, et le formulaire de connexion est validé par Zod avant d’atteindre quoi que ce soit.",
    ],
    stack: ["Node.js", "Express", "MongoDB"],
    image: null,
    year: 2026,
    repo: `${GH}Razigue/Corelab`,
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
    approach: null,
    stack: ["Ollama", "Modelfile"],
    image: null,
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
    approach: null,
    stack: ["n8n", "Ollama", "Linux"],
    image: null,
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
    approach: null,
    stack: ["HTML", "CSS", "PHP"],
    image: null,
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
    approach: null,
    stack: ["PHP", "Laravel", "MySQL"],
    image: null,
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
    approach: null,
    stack: ["GitHub Actions", "Jest", "Playwright"],
    image: null,
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
    approach: null,
    stack: ["WordPress", "ACF", "PHP"],
    image: null,
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
    approach: null,
    stack: ["HTML", "CSS", "PHP", "SQL"],
    image: null,
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
    approach: null,
    stack: ["Docker", "JavaScript", "Java"],
    image: null,
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
    approach: null,
    stack: ["HTML", "CSS"],
    image: null,
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
    approach: null,
    stack: ["HTML", "Tailwind CSS"],
    image: null,
    year: 2025,
    repo: `${GH}Razigue/site-statique-tailwind`,
    demo: "https://razigue.github.io/site-statique-tailwind/",
    status: "live",
  },
] as const;

/** Ceux que met en avant l'accueil, dans cet ordre. */
export const featuredSlugs = ["tonecraft", "overkill", "corelab"] as const;

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
