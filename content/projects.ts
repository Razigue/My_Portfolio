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

/** Where the project was made: on his own, or as Web@cadémie coursework. */
export type ProjectKind = "personnel" | "ecole";

export type ProjectImage = {
  readonly src: StaticImageData;
  /** Read aloud in place of the picture, so it describes it rather than names it. */
  readonly alt: string;
};

/** The pictograms a diagram can use; they are drawn in `DiagramIcon.tsx`. */
export type DiagramIcon =
  | "guitar" | "funnel" | "amp" | "speaker" | "sliders" | "volume"
  | "headphones" | "record" | "loop" | "note" | "metronome"
  | "screen" | "chip" | "browser" | "install" | "export" | "wave"
  | "storage" | "sheet";

/** A station: a pictogram, a name and a few words, for a reader who does not play. */
export type DiagramNode = {
  readonly icon: DiagramIcon;
  readonly label: string;
  /** A few words under the name. Longer than one line is too long. */
  readonly hint: string;
  /** The technology behind the station, set small. */
  readonly detail?: string;
};

/**
 * Something beside the main path: it leaves it (`out`), joins it (`in`),
 * records from it and plays back into it (`loop`), or works next to it (`apart`).
 */
export type DiagramBranch = DiagramNode & {
  readonly flow: "out" | "in" | "loop" | "apart";
};

export type DiagramStep = {
  /** More than one node means alternatives: one or the other takes this place. */
  readonly nodes: readonly DiagramNode[];
  readonly branches?: readonly DiagramBranch[];
};

/** A path read top to bottom, one step after another. */
export type ProjectDiagram = {
  readonly title: string;
  readonly steps: readonly DiagramStep[];
};

export type ProjectSection = {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly diagram?: ProjectDiagram;
};

export type Project = {
  readonly slug: string;
  readonly title: string;
  /** The qualifier set in italics under the title, when the project has one. */
  readonly subtitle: string | null;
  /**
   * Personal or school. Required on every published project, since `/projets`
   * groups by it; `null` is tolerated only on the ones kept in reserve.
   */
  readonly kind: ProjectKind | null;
  /** The team as the CV states it, `équipe de 5`. `null` when he worked alone or it is unknown. */
  readonly team: string | null;
  readonly description: string;
  readonly highlights: readonly string[];
  /**
   * The long-form account, grouped into titled sections on the project page.
   * `null` on a project that does not need one: a short page is an honest page.
   */
  readonly approach: readonly ProjectSection[] | null;
  readonly stack: readonly string[];
  readonly stackDisclosure?: string;
  /** Optional selection for the home panel; the project page keeps the full stack. */
  readonly primaryStack?: readonly string[];
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
    subtitle: "la guitare, simplement",
    kind: "personnel",
    team: null,
    description:
      "Tonecraft permet de jouer de la guitare dans son navigateur, avec un ampli et des effets virtuels. Lire une tablature, s’accorder, garder le rythme, répéter une boucle ou enregistrer avec un accompagnement\u00A0: tout se fait au même endroit.",
    highlights: [
      "Choisir son ampli et ses effets",
      "Travailler un morceau à son rythme",
      "Enregistrer sa guitare avec un accompagnement",
    ],
    approach: [
      {
        title: "Moins de réglages, plus de musique",
        paragraphs: [
          "Sur ordinateur, jouer de la guitare demande souvent d’installer plusieurs logiciels et de les faire fonctionner ensemble. J’ai créé Tonecraft pour réunir le son et les outils de pratique dans une seule page.",
          "On branche sa guitare à une interface audio, le boîtier qui la relie à l’ordinateur, puis on choisit son son. Sans guitare, une démonstration permet aussi d’écouter le résultat, sans activer le micro.",
        ],
      },
      {
        title: "Apprendre et garder une prise",
        paragraphs: [
          "On peut ouvrir une tablature, la ralentir et répéter un passage. L’accordeur aide à accorder la guitare, le métronome donne le tempo et le looper répète ce qu’on vient de jouer. Le lecteur et ses sons d’instruments se chargent seulement quand on ouvre une partition.",
          "L’enregistreur conserve la DI\u00A0: le son de la guitare avant les effets. On peut donc changer d’ampli après avoir joué, puis télécharger la prise avec ou sans effets, seule ou avec son accompagnement. Le looper, lui, garde le son avec ses effets.",
        ],
      },
      {
        title: "Le trajet du son",
        paragraphs: [
          "De la guitare au casque, le son traverse une suite d’étapes. Chacune le transforme un peu.",
        ],
        diagram: {
          title: "De la guitare au casque",
          steps: [
            {
              nodes: [
                { icon: "guitar", label: "La guitare", hint: "le son brut entre" },
              ],
              branches: [
                { flow: "out", icon: "record", label: "L’enregistreur", hint: "garde le son brut" },
              ],
            },
            {
              nodes: [
                { icon: "funnel", label: "La préparation", hint: "nettoie et dose le son" },
              ],
            },
            {
              nodes: [
                { icon: "amp", label: "L’ampli", hint: "donne le caractère" },
              ],
            },
            {
              nodes: [
                { icon: "speaker", label: "Le haut-parleur", hint: "sonne comme un vrai ampli" },
              ],
            },
            {
              nodes: [
                { icon: "sliders", label: "La couleur", hint: "graves, aigus, écho" },
              ],
              branches: [
                { flow: "loop", icon: "loop", label: "Le looper", hint: "répète ce qu’on joue" },
              ],
            },
            {
              nodes: [
                { icon: "volume", label: "Le volume", hint: "dosé, sans pics" },
              ],
              branches: [
                { flow: "in", icon: "note", label: "Le morceau", hint: "pour jouer par-dessus" },
              ],
            },
            {
              nodes: [
                { icon: "headphones", label: "Le casque", hint: "ce qu’on entend" },
              ],
              branches: [
                { flow: "in", icon: "metronome", label: "Le métronome", hint: "donne le tempo" },
              ],
            },
          ],
        },
      },
      {
        title: "Derrière la page",
        paragraphs: [
          "Ce que l’on voit, ce qui décide et ce qui transforme le son sont séparés.",
        ],
        diagram: {
          title: "Les grandes parties de Tonecraft",
          steps: [
            {
              nodes: [
                { icon: "screen", label: "La page", hint: "ce qu’on voit", detail: "Astro, Svelte" },
              ],
              branches: [
                { flow: "apart", icon: "storage", label: "La mémoire", hint: "garde la session", detail: "IndexedDB" },
                { flow: "apart", icon: "sheet", label: "Les tablatures", hint: "leur propre son", detail: "alphaTab" },
              ],
            },
            {
              nodes: [
                { icon: "chip", label: "Le chef d’orchestre", hint: "décide des réglages", detail: "TypeScript" },
              ],
            },
            {
              nodes: [
                { icon: "browser", label: "Le navigateur", hint: "rien à installer", detail: "Web Audio API" },
                { icon: "install", label: "Tonecraft Engine", hint: "programme en option", detail: "Rust" },
              ],
            },
            {
              nodes: [
                { icon: "wave", label: "Le traitement du son", hint: "le même dans les deux cas", detail: "C++, WebAssembly" },
              ],
              branches: [
                { flow: "apart", icon: "export", label: "L’export", hint: "rejoue une prise" },
              ],
            },
          ],
        },
      },
      {
        title: "Avec ou sans programme installé",
        paragraphs: [
          "Le traitement du son fonctionne dans le navigateur. Pour certaines interfaces audio, un programme optionnel, Tonecraft Engine, permet un accès direct au matériel. La page garde les mêmes commandes et le traitement reste le même.",
          "La page attend que le moteur confirme le chargement de l’ampli et signale un échec. Avant de publier, des tests vérifient ce chargement, la démonstration sans micro, la lecture et l’enregistrement.",
        ],
      },
    ],
    stackDisclosure: "Voir les technologies utilisées",
    stack: [
      "Astro", "Svelte", "TypeScript", "C++", "Rust", "WebAssembly",
      "Web Audio API", "alphaTab", "IndexedDB", "Playwright", "GitHub Actions",
    ],
    primaryStack: ["Astro", "Svelte", "TypeScript", "C++", "WebAssembly"],
    image: {
      src: tonecraftShot,
      alt: "L’interface actuelle de Tonecraft\u00A0: les choix d’ampli et de haut-parleur au-dessus d’un ampli aux vitraux violets, avec ses boutons de réglage.",
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
    kind: "ecole",
    team: "équipe de 5",
    description:
      "Agrégateur d’offres d’emploi, de stage et d’alternance construit en équipe\u00A0: API Symfony, front React, base PostgreSQL. Ma part couvre les offres et les favoris\u00A0: contrôleurs, DTO de validation, recherche filtrée et pagination.",
    highlights: [
      "Contrôleurs des offres et des favoris",
      "DTO de validation des données entrantes",
      "Recherche filtrée et pagination",
    ],
    approach: [
      {
        title: "Le besoin",
        paragraphs: [
          "Overkill rassemble au même endroit les offres d’emploi, de stage et d’alternance.",
        ],
      },
      {
        title: "Ma part",
        paragraphs: [
          "J’ai eu les offres et les favoris. Le contrôleur des offres porte les routes du domaine\u00A0: lecture filtrée, lecture par identifiant, création, suppression.",
        ],
      },
      {
        title: "Choix importants",
        paragraphs: [
          "Le DTO est la frontière du domaine. Les offres n’arrivent pas d’un formulaire mais d’un collecteur, donc personne ne relit ce qui entre\u00A0: le titre est obligatoire et borné, le type ne peut valoir que trois valeurs, le pays est un code à deux lettres, les coordonnées doivent tenir dans leurs plages. Le JSON est validé avant d’atteindre la base, jamais après.",
        ],
      },
      {
        title: "Comment ça tourne",
        paragraphs: [
          "C’est un projet d’équipe\u00A0: une API Symfony, un front React, une base PostgreSQL, le tout monté sous Docker. On s’est réparti l’API par domaine.",
          "La recherche accepte des critères cumulables — texte libre, ville, entreprise, contrat, type, télétravail, salaire minimum, catégorie —, les pagine, et ne remonte que les offres publiées dans les trente derniers jours, parce qu’une annonce périmée dans un agrégateur est pire qu’une absence de résultat. Le contrôleur des favoris tient les siennes sur l’utilisateur connecté.",
        ],
      },
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
    kind: "ecole",
    team: "équipe de 3",
    description:
      "Plateforme de formation au développement, cours et examens en QCM, construite en équipe avec une API Express et une base MongoDB. Ma part couvre les modèles de données et les routes\u00A0: authentification JWT, contrôle d’accès par rôles, et le CRUD des cours, leçons, quiz et résultats.",
    highlights: [
      "Modèles de données et routes de l’API",
      "Authentification JWT et contrôle d’accès par rôles",
      "CRUD des cours, leçons, quiz et résultats",
    ],
    approach: [
      {
        title: "Le besoin",
        paragraphs: [
          "Corelab est une plateforme de formation au développement\u00A0: des cours à suivre, des examens en QCM pour vérifier ce qui est retenu, et une administration pour les gérer.",
        ],
      },
      {
        title: "Ma part",
        paragraphs: [
          "C’est un projet d’équipe, et je m’y suis occupé du serveur\u00A0: les modèles de données et les routes.",
        ],
      },
      {
        title: "Choix importants",
        paragraphs: [
          "Les modèles fixent la forme de tout le reste\u00A0: utilisateur, cours, leçon, quiz, résultat, notification. Écrits avec Mongoose, ce sont eux qui décident ce qu’un élève possède, ce qu’un cours contient, et ce qu’est un quiz\u00A0: une suite de questions à choix, chacune avec sa bonne réponse, et un seuil au-delà duquel l’examen est réussi. Une route ne rattrape pas un modèle mal posé.",
        ],
      },
      {
        title: "Comment ça tourne",
        paragraphs: [
          "Les routes suivent\u00A0: le CRUD des cours, des leçons et des quiz, l’enregistrement des résultats, la progression d’un élève, la comparaison d’un score au seuil de réussite, la programmation d’une leçon à une date, l’import d’utilisateurs avec génération du mot de passe par bcrypt, et le mot de passe choisi à la première connexion. L’accès passe par un middleware qui vérifie le jeton JWT puis le rôle, et le formulaire de connexion est validé par Zod avant d’atteindre quoi que ce soit.",
        ],
      },
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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
    kind: null,
    team: null,
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

/**
 * Les projets publiés, dans cet ordre. Ce sont les seuls que le site montre :
 * l'accueil, l'index, les pages de projet et le sitemap. Les autres restent
 * dans la liste ci-dessus, en réserve, prêts à remplacer l'un d'eux.
 */
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

/** A project kept in reserve has no page, so its address answers 404. */
export function getProject(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}

export const kindLabels: Readonly<Record<ProjectKind, string>> = {
  personnel: "Projet personnel",
  ecole: "Projet d’école",
};

/** « Projet d’école, équipe de 5 », or just the kind when he worked alone. */
export function projectContext(project: Project): string | null {
  if (!project.kind) return null;
  const kind = kindLabels[project.kind];
  return project.team ? `${kind}, ${project.team}` : kind;
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
  const years = featuredProjects.map((p) => p.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const span = first === last ? `en ${first}` : `de ${first} à ${last}`;
  const count = featuredProjects.length;
  return `${capitalise(cardinal(count))} ${count > 1 ? "projets" : "projet"}, ${span}.`;
}
