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
import tonecraftStudio from "@/content/media/tonecraft-studio.png";
import tonecraftThumbnail from "@/content/media/tonecraft-guilt-lit.webp";
import tonecraftBackground from "@/content/media/tonecraft-background.png";
import tonecraftTabs from "@/content/media/tonecraft-tabs.webp";
import tonecraftRecorder from "@/content/media/tonecraft-recorder.webp";
import tonecraftControls from "@/content/media/tonecraft-controls.webp";
import tonecraftTuner from "@/content/media/tonecraft-tuner.webp";
import tonecraftMetronome from "@/content/media/tonecraft-metronome.webp";
import tonecraftEngine from "@/content/media/tonecraft-engine.webp";
import overkillHome from "@/content/media/overkill-home.webp";
import overkillBackground from "@/content/media/overkill-background.webp";
import overkillFeed from "@/content/media/overkill-feed.webp";
import overkillSearch from "@/content/media/overkill-search.webp";
import overkillDetail from "@/content/media/overkill-detail.webp";
import corelabHome from "@/content/media/corelab-home.webp";
import corelabBackground from "@/content/media/corelab-background.webp";
import corelabCourses from "@/content/media/corelab-courses.webp";
import corelabQuiz from "@/content/media/corelab-quizplay.webp";
import corelabStudent from "@/content/media/corelab-student.webp";
import corelabAdmin from "@/content/media/corelab-admin.webp";
import { checkProjects } from "@/content/check";

export type ProjectStatus = "live" | "archived";

/** Where the project was made: on his own, or as Web@cadémie coursework. */
export type ProjectKind = "personnel" | "ecole";

export type ProjectImage = {
  readonly src: StaticImageData;
  /** Read aloud in place of the picture, so it describes it rather than names it. */
  readonly alt: string;
  /**
   * `true` on an image cut out of its surroundings, with a transparent
   * background: it is shown bare. Every other capture is a whole screen, and
   * is shown in a window.
   */
  readonly cutout?: boolean;
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
  /**
   * Captures shown under the text of the part: one, or two side by side at
   * the same height. Each shows what the paragraphs above it describe.
   */
  readonly media?: readonly ProjectImage[];
  readonly diagram?: ProjectDiagram;
};

/**
 * A part of « La démarche » in English: the same words, and the description
 * of each capture in `mediaAlt`, in the same order. The captures themselves
 * are taken from the French entry.
 */
export type ProjectSectionText = Omit<ProjectSection, "media"> & {
  readonly mediaAlt?: readonly string[];
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
  /** Optional artwork beside the title on the home page. */
  readonly thumbnail?: ProjectImage & {
    /** Decorative scenery behind the artwork on the home page. */
    readonly background?: StaticImageData;
  };
  readonly year: number;
  /** `null` renders nothing at all. Never a disabled or placeholder link. */
  readonly repo: string | null;
  readonly demo: string | null;
  readonly status: ProjectStatus;
};

/**
 * The English words of one project, in `content/en/projects.ts`. Only what is
 * read changes with the language: the slug, the stack, the links, the year and
 * the capture itself are taken from the French entry.
 */
export type ProjectTranslation = {
  readonly title: string;
  readonly subtitle: string | null;
  readonly team: string | null;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly approach: readonly ProjectSectionText[] | null;
  readonly stackDisclosure?: string;
  /** The capture's description, required when the project has one. */
  readonly imageAlt?: string;
  readonly thumbnailAlt?: string;
};

const GH = "https://github.com/";

export const projects: readonly Project[] = [
  {
    slug: "tonecraft",
    thumbnail: {
      src: tonecraftThumbnail,
      cutout: true,
      background: tonecraftBackground,
      alt: "L’ampli Guilt de Tonecraft, blanc et orné de vitraux violets, avec ses boutons de réglage.",
    },
    title: "Tonecraft",
    subtitle: "la guitare, simplement",
    kind: "personnel",
    team: null,
    description:
      "Tonecraft est une application web qui réunit sur une seule page tout ce qu’il faut pour apprendre un morceau à la guitare et s’enregistrer en le jouant. On branche sa guitare à l’ordinateur et on ouvre le site, sans rien installer ni créer de compte\u00A0: on choisit son son, on suit la partition pendant que le reste du groupe joue avec soi, puis on enregistre sa version et on la télécharge. Un accordeur et un métronome complètent l’ensemble.",
    highlights: [
      "Tout pour jouer et enregistrer un morceau, sur une seule page",
      "La partition défile pendant que le groupe joue avec vous",
      "Rien à installer, aucun compte à créer",
    ],
    approach: [
      {
        title: "Tout pour une cover, au même endroit",
        paragraphs: [
          "Une cover demande plusieurs outils\u00A0: de quoi lire la partie, le morceau sur lequel jouer, un son qui colle, de quoi travailler les passages difficiles et un enregistreur. Sur ordinateur, cela veut souvent dire installer plusieurs logiciels et les faire fonctionner ensemble. Tonecraft les réunit sur un seul écran.",
          "On branche sa guitare à une interface audio, le boîtier qui la relie à l’ordinateur, puis on choisit son son. Sans guitare, une démonstration permet d’écouter le résultat sans activer le micro. Les réglages restent sur l’ordinateur, et un son se partage par un lien.",
        ],
      },
      {
        title: "Ouvrir la tab, le groupe joue avec vous",
        paragraphs: [
          "Les fichiers Guitar Pro, MusicXML et d’autres formats s’ouvrent directement dans la page, sans être envoyés nulle part. La partition défile sous une tête de lecture fixe, le manche s’allume sous les notes, et le groupe joue avec vous\u00A0: ralenti, en boucle sur un passage, ou sans votre partie.",
          "On peut aussi écrire ses propres tablatures\u00A0: on tape une case, on entend la note. Le lecteur et ses sons d’instruments ne se chargent que lorsqu’on ouvre une partition.",
        ],
        media: [
          {
            src: tonecraftTabs,
            cutout: true,
            alt: "Le lecteur de tablatures de Tonecraft\u00A0: une étude en mi, sa tablature avec la tête de lecture sur la première mesure, et en dessous le manche de la guitare qui montre les notes de la gamme pentatonique mineure de mi.",
          },
        ],
      },
      {
        title: "Jouer sur le morceau, garder la prise",
        paragraphs: [
          "On glisse le morceau en piste d’accompagnement et on enregistre sa partie dessus. L’enregistreur conserve la DI, le son de la guitare avant les effets\u00A0: on peut changer d’ampli après avoir joué, puis télécharger la prise avec ou sans effets, seule ou mixée avec l’accompagnement.",
          "Le son du lecteur de tablatures reste séparé et n’entre pas dans cet export. Le looper, lui, enregistre ce qu’on entend, effets compris, et le rejoue en boucle pour travailler un riff.",
        ],
        media: [
          {
            src: tonecraftRecorder,
            cutout: true,
            alt: "Le panneau de session de Tonecraft\u00A0: les boutons de lecture et d’enregistrement, le looper, et les pistes guitare et accompagnement, avec la forme d’onde d’une prise, le choix entre DI et son traité, et l’export WAV.",
          },
        ],
      },
      {
        title: "Un ampli et sa chaîne",
        paragraphs: [
          "L’ampli principal, GUILT, est une capture neuronale d’une vraie tête d’ampli high gain. Quatre captures venues de la communauté l’accompagnent.",
          "Autour de lui, une chaîne courte dans un ordre fixe\u00A0: gate, boost, pitch et réverbération. Chaque capture a son baffle, et l’on peut charger sa propre réponse impulsionnelle depuis son disque, en WAV, AIFF ou FLAC.",
        ],
        media: [
          {
            src: tonecraftControls,
            cutout: true,
            alt: "La barre de réglages de Tonecraft\u00A0: le gain d’entrée, le gate, les sélecteurs d’ampli GUILT Lead et de baffle, le preset Lead, le doubleur et le volume de sortie.",
          },
        ],
      },
      {
        title: "S’accorder et garder le tempo",
        paragraphs: [
          "L’accordeur est chromatique et précis au cent près. Le métronome règle le tempo et la signature, et se cale au tap. Son clic n’entre jamais dans une boucle ni dans une prise.",
        ],
        media: [
          {
            src: tonecraftTuner,
            cutout: true,
            alt: "L’accordeur de Tonecraft, qui affiche la note sol, trop haute de 42 cents, et indique de descendre.",
          },
          {
            src: tonecraftMetronome,
            cutout: true,
            alt: "Le métronome de Tonecraft réglé à 132 BPM, avec le bouton tap, la synchronisation avec la tablature et le volume du clic.",
          },
        ],
      },
      {
        title: "Le trajet du son",
        paragraphs: [
          "Le son traverse une suite d’étapes qui le transforment progressivement.",
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
                { icon: "funnel", label: "La préparation", hint: "nettoie et dose" },
              ],
            },
            {
              nodes: [
                { icon: "amp", label: "L’ampli", hint: "donne le caractère" },
              ],
            },
            {
              nodes: [
                { icon: "speaker", label: "Le baffle virtuel", hint: "simule les haut-parleurs" },
              ],
            },
            {
              nodes: [
                { icon: "sliders", label: "La couleur", hint: "égalisation, réverbération" },
              ],
              branches: [
                { flow: "loop", icon: "loop", label: "Le looper", hint: "répète ce qu’on joue" },
              ],
            },
            {
              nodes: [
                { icon: "volume", label: "Le volume", hint: "réglage et limiteur" },
              ],
              branches: [
                { flow: "in", icon: "note", label: "Le morceau", hint: "pour jouer dessus" },
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
                { flow: "apart", icon: "sheet", label: "Les tablatures", hint: "leur propre son", detail: "alphaTab" },
              ],
            },
            {
              nodes: [
                { icon: "chip", label: "Le chef d’orchestre", hint: "décide des réglages", detail: "TypeScript" },
              ],
              branches: [
                { flow: "apart", icon: "storage", label: "La mémoire", hint: "garde la session", detail: "IndexedDB" },
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
          "Le traitement du son fonctionne dans le navigateur. Tonecraft Engine, un petit programme optionnel écrit en Rust, fait tourner la même chaîne hors du navigateur, par l’ASIO sous Windows, CoreAudio sous macOS ou ALSA sous Linux, à la latence la plus basse que permet l’interface. Il se choisit dans les réglages audio, et la page garde les mêmes commandes.",
          "L’interface attend la confirmation du moteur avant d’indiquer que l’ampli est chargé et signale les erreurs de chargement. Le déploiement du site passe par des tests en navigateur qui vérifient ce chargement, la démonstration sans micro, la lecture des tablatures et l’enregistrement.",
        ],
        media: [
          {
            src: tonecraftEngine,
            cutout: true,
            alt: "Les réglages audio de Tonecraft\u00A0: le choix entre le navigateur et le moteur natif, la détection des entrées audio, le périphérique d’entrée, le canal et le périphérique de sortie.",
          },
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
      src: tonecraftStudio,
      alt: "Le studio de Tonecraft dans l’onglet Tone, ampli allumé : la barre de réglages en haut, avec l’entrée, le gate, l’ampli, le baffle et le preset Lead, l’ampli Guilt aux vitraux violets éclairés au centre, et en bas le lecteur de tablatures, le looper et les pistes de guitare et d’accompagnement.",
    },
    year: 2026,
    repo: `${GH}Razigue/Tonecraft`,
    demo: "https://razigue.github.io/Tonecraft/",
    status: "live",
  },
  {
    slug: "overkill",
    thumbnail: {
      src: overkillHome,
      background: overkillBackground,
      alt: "La page d’accueil d’Overkill, avec son accroche sur une recherche d’emploi centralisée et un formulaire de recherche rapide par métier, lieu et type de contrat.",
    },
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
        media: [
          {
            src: overkillDetail,
            alt: "Le détail d’une offre dans Overkill, ouvert à côté de la liste\u00A0: le titre, l’entreprise, le lieu, l’organisation du travail, le salaire, la date de publication, la stack demandée et le résumé de l’offre.",
          },
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
        media: [
          {
            src: overkillSearch,
            alt: "Une recherche dans Overkill sur le métier de développeur à Paris, qui ramène sept offres, avec les filtres par type d’offre et par contrat sur la gauche.",
          },
        ],
      },
    ],
    stack: ["Symfony", "PHP", "PostgreSQL", "React", "Docker"],
    image: {
      src: overkillFeed,
      alt: "La liste des offres d’Overkill\u00A0: une recherche par métier et par ville, les filtres par type d’offre et par contrat, et les offres récentes avec leur entreprise, leur lieu, leur contrat et leur salaire.",
    },
    year: 2026,
    repo: null,
    demo: "https://overkill.kisukesaama.com/",
    status: "live",
  },
  {
    slug: "corelab",
    thumbnail: {
      src: corelabHome,
      background: corelabBackground,
      alt: "La page d’accueil de Corelab, avec son accroche en anglais sur une sphère noire, puis le carrousel des derniers cours publiés.",
    },
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
        media: [
          {
            src: corelabQuiz,
            alt: "Un quiz dans Corelab\u00A0: la première de trois questions, avec quatre réponses au choix et le bouton pour passer à la suivante.",
          },
        ],
      },
      {
        title: "Comment ça tourne",
        paragraphs: [
          "Les routes suivent\u00A0: le CRUD des cours, des leçons et des quiz, l’enregistrement des résultats, la progression d’un élève, la comparaison d’un score au seuil de réussite, la programmation d’une leçon à une date, l’import d’utilisateurs avec génération de mots de passe hachés avec bcrypt, et le mot de passe choisi à la première connexion. Un middleware vérifie le jeton JWT, les routes concernées contrôlent le rôle de l’utilisateur et Zod valide les données de connexion avant la recherche de l’utilisateur.",
        ],
        media: [
          {
            src: corelabStudent,
            alt: "La progression d’un élève dans Corelab\u00A0: une barre par quiz, avec le score obtenu et un repère au seuil de réussite.",
          },
          {
            src: corelabAdmin,
            alt: "L’espace administrateur de Corelab\u00A0: l’import d’une liste d’élèves, la création d’un compte et la liste des élèves.",
          },
        ],
      },
    ],
    stack: ["Node.js", "Express", "MongoDB"],
    image: {
      src: corelabCourses,
      alt: "La liste des cours de Corelab, en cartes sombres avec leur titre, leur description et un bouton pour ouvrir le cours.",
    },
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

/** Index sur deux chiffres, tel qu'affiché en tête de ligne. */
export function projectNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
