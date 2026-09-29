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
import tonecraftTuner from "@/content/media/tonecraft-tuner.webp";
import tonecraftMetronome from "@/content/media/tonecraft-metronome.webp";
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
     * background: nothing is shown behind it. Every other capture is a whole
     * screen, shown on a ground while it loads.
     */
    readonly cutout?: boolean;
};

/** The pictograms a diagram can use; they are drawn in `DiagramIcon.tsx`. */
export type DiagramIcon =
    | "guitar"
    | "funnel"
    | "pedal"
    | "amp"
    | "speaker"
    | "sliders"
    | "volume"
    | "headphones"
    | "record"
    | "loop"
    | "note"
    | "metronome"
    | "screen"
    | "chip"
    | "browser"
    | "install"
    | "export"
    | "wave"
    | "storage"
    | "sheet";

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
    /** The qualifier set under the title, when the project has one. */
    readonly subtitle: string | null;
    /**
     * Personal or school. Required on every published project, since `/projets`
     * groups by it; `null` is tolerated only on the ones kept in reserve.
     */
    readonly kind: ProjectKind | null;
    /** The team as the CV states it, `équipe de 5`. `null` when he worked alone or it is unknown. */
    readonly team: string | null;
    readonly description: string;
    /**
     * What the project is, in one sentence, for the lists: the home page and
     * `/projets`. It restates `description` and adds nothing to it. Required on
     * every published project; the ones kept in reserve can do without.
     */
    readonly summary?: string;
    readonly highlights: readonly string[];
    /**
     * The long-form account, grouped into titled sections on the project page.
     * `null` on a project that does not need one: a short page is an honest page.
     */
    readonly approach: readonly ProjectSection[] | null;
    readonly stack: readonly string[];
    readonly stackDisclosure?: string;
    /** Optional selection for the home summary; the project page keeps the full stack. */
    readonly primaryStack?: readonly string[];
    /**
     * A capture of the project, imported as a module rather than served from
     * `public/` so that Next reads its dimensions and builds its blur placeholder
     * itself. `null` on a project that has nothing to show, which is most of
     * them: the pages carry their weight in type.
     */
    readonly image: ProjectImage | null;
    /** Optional artwork beside the title, at the top of the project page. */
    readonly thumbnail?: ProjectImage & {
        /** Decorative scenery behind the project page's header. */
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
    readonly summary?: string;
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
        subtitle: "la guitare en studio",
        kind: "personnel",
        team: null,
        description:
            "Une application web pour apprendre un morceau à la guitare et s’enregistrer, sur une seule page. On branche sa guitare et on ouvre le site, sans installation ni compte\u00A0: on choisit son son, on suit la partition avec le groupe en fond, puis on enregistre sa version.",
        summary:
            "Apprendre un morceau à la guitare et s’enregistrer en le jouant, sans rien installer.",
        highlights: [
            "Conçue et développée seul, avec Claude Code, à partir de mon cahier des charges",
            "En ligne, avec des retours de guitaristes chaque jour",
            "Testée automatiquement avant chaque mise en ligne",
        ],
        approach: [
            {
                title: "Le besoin",
                paragraphs: [
                    "Travailler une reprise demande plusieurs outils\u00A0: la partition, le morceau original, le son d’un ampli, de quoi s’enregistrer. Sur ordinateur, cela veut dire plusieurs logiciels, plusieurs licences et des fenêtres à jongler.",
                ],
            },
            {
                title: "Le son d’un vrai ampli",
                paragraphs: [
                    "Sans ampli, une guitare électrique est presque muette. Son son vient du matériel\u00A0: pédales, ampli, haut-parleur. Tonecraft recrée tout cela.",
                    "Le cœur du son est une capture\u00A0: un vrai ampli reproduit par une IA, qui réagit au jeu comme l’original. Tonecraft en propose quatre, partagées par la communauté. La principale, GUILT, est réglée à mon goût pour les solos, avec un écho qui évoque une église, d’où ses vitraux. Une démo enregistrée permet de l’essayer sans guitare.",
                ],
                diagram: {
                    title: "Le trajet du son, de la guitare au casque",
                    steps: [
                        {
                            nodes: [
                                {
                                    icon: "guitar",
                                    label: "La guitare",
                                    hint: "le son brut",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "pedal",
                                    label: "Les pédales",
                                    hint: "nettoient et renforcent",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "amp",
                                    label: "L’ampli",
                                    hint: "donne le caractère",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "speaker",
                                    label: "Le haut-parleur",
                                    hint: "adoucit, donne du corps",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "sliders",
                                    label: "Les finitions",
                                    hint: "graves, aigus, effet de salle",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "headphones",
                                    label: "Le casque",
                                    hint: "ce qu’on entend",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                title: "Faire sonner l’ampli comme un vrai",
                paragraphs: [
                    "La partie la plus difficile. J’ai d’abord tenté de créer mon propre ampli. Sans banque de sons pour entraîner une IA, impossible d’obtenir un rendu crédible.",
                    "Je suis donc parti des captures de la communauté, et j’ai construit tout ce qui les entoure. Ma pratique de guitariste a fait la différence\u00A0: j’ai comparé Tonecraft à l’oreille avec les meilleures simulations du marché, comme Neural DSP, jusqu’à un son qui plaise au plus grand nombre.",
                ],
            },
            {
                title: "Suivre la partition",
                paragraphs: [
                    "Les guitaristes apprennent souvent sur une tablature, une partition qui indique quelle corde et quelle case jouer. Ici, elle défile avec la musique, et un manche dessiné montre où poser les doigts. Le fichier ne quitte pas l’ordinateur.",
                    "On peut ralentir, répéter un passage en boucle ou couper la guitare pour jouer à sa place, et écrire ses propres tablatures. Ce lecteur ne se charge qu’au besoin, pour que la page s’ouvre vite.",
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
                title: "Enregistrer sa version",
                paragraphs: [
                    "On lance le morceau original, on joue par-dessus, on s’enregistre. Le son de la guitare est gardé brut\u00A0: on peut changer d’ampli après coup. On télécharge au choix le son brut ou celui de l’ampli, seul ou avec le morceau.",
                    "Le looper rejoue un passage en boucle pour s’exercer dessus.",
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
                title: "S’accorder et garder le tempo",
                paragraphs: [
                    "L’accordeur indique si la note est trop haute ou trop basse, au centième de demi-ton. Le métronome suit le tempo choisi, ou tapé sur un bouton. Son clic s’entend au casque, jamais dans un enregistrement.",
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
                title: "Derrière la page",
                paragraphs: [
                    "Le son est calculé directement dans le navigateur. Pour réduire encore le décalage entre la note jouée et la note entendue, un petit programme optionnel, Tonecraft Engine, fait tourner le même moteur hors du navigateur.",
                    "L’interface n’annonce l’ampli prêt qu’une fois confirmé, et signale l’échec sinon. Avant chaque mise en ligne, des tests automatiques vérifient ce chargement, la démo sans micro, les partitions et l’enregistrement.",
                ],
                diagram: {
                    title: "Les grandes parties de Tonecraft",
                    steps: [
                        {
                            nodes: [
                                {
                                    icon: "screen",
                                    label: "La page",
                                    hint: "ce qu’on voit",
                                    detail: "Astro, Svelte",
                                },
                            ],
                            branches: [
                                {
                                    flow: "apart",
                                    icon: "sheet",
                                    label: "Les partitions",
                                    hint: "un lecteur à part",
                                    detail: "alphaTab",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "chip",
                                    label: "Le chef d’orchestre",
                                    hint: "coordonne l’ensemble",
                                    detail: "TypeScript",
                                },
                            ],
                            branches: [
                                {
                                    flow: "apart",
                                    icon: "storage",
                                    label: "La mémoire",
                                    hint: "garde les réglages",
                                    detail: "IndexedDB",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "browser",
                                    label: "Le navigateur",
                                    hint: "par défaut",
                                    detail: "Web Audio API",
                                },
                                {
                                    icon: "install",
                                    label: "Tonecraft Engine",
                                    hint: "en option",
                                    detail: "Rust",
                                },
                            ],
                        },
                        {
                            nodes: [
                                {
                                    icon: "wave",
                                    label: "Le moteur audio",
                                    hint: "transforme le son",
                                    detail: "C++, WebAssembly",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                title: "Comment je l’ai construit",
                paragraphs: [
                    "Conçu et développé seul, avec Claude Code en mode agent, à partir d’un cahier des charges que j’ai rédigé avec la méthode BMAD. Je teste tout et je décide de ce qui est gardé. Deux semaines pour une première version, une de plus pour la v1, consacrée au design et à l’accessibilité. Il évolue depuis en continu.",
                    "Le TypeScript, je le lis et je sais l’expliquer. Le C++ du moteur audio, compilé en WebAssembly, et le Rust de Tonecraft Engine, je les juge à l’oreille : je ne code pas dans ces langages.",
                ],
            },
            {
                title: "Les retours des guitaristes",
                paragraphs: [
                    "Je l’utilise pour travailler mes morceaux. D’autres guitaristes l’essaient et m’écrivent chaque jour\u00A0: ils aiment tout avoir sur une page, essayer les amplis, et me disent ce qui manque. Ces retours décident de ce que j’ajoute, retravaille ou garde.",
                    "Tonecraft propose surtout des sons saturés\u00A0; des sons clairs et acoustiques arrivent, puis un espace pour partager ses réglages. Un compte deviendra possible pour ces échanges, jamais obligatoire pour jouer.",
                ],
            },
        ],
        stackDisclosure: "Voir les autres technologies",
        stack: [
            "Astro",
            "Svelte",
            "TypeScript",
            "Playwright",
            "GitHub Actions",
            // Écrits par l’agent : en dernier, jamais mis en avant.
            "WebAssembly",
            "C++",
            "Rust",
        ],
        primaryStack: ["Astro", "Svelte", "TypeScript"],
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
            "Un agrégateur d’offres d’emploi, de stage et d’alternance, construit à cinq en trois semaines. J’ai pris en charge les offres et les favoris\u00A0: la recherche avec filtres, l’affichage page par page et le contrôle des offres reçues.",
        summary:
            "Un agrégateur d’offres d’emploi, de stage et d’alternance, construit à cinq en trois semaines.",
        highlights: [
            "Les offres et les favoris, côté serveur",
            "Contrôle des offres avant enregistrement",
            "Recherche avec filtres et pagination",
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
                    "Je me suis occupé des offres et des favoris\u00A0: consulter, filtrer, créer et supprimer une offre.",
                ],
                media: [
                    {
                        src: overkillDetail,
                        alt: "Le détail d’une offre dans Overkill, ouvert à côté de la liste\u00A0: le titre, l’entreprise, le lieu, l’organisation du travail, le salaire, la date de publication, la stack demandée et le résumé de l’offre.",
                    },
                ],
            },
            {
                title: "Travailler à cinq",
                paragraphs: [
                    "Trois semaines, trois sprints d’une semaine, chacun avec son objectif. Chaque sprint découpé en user stories sur Trello, chacune confiée à une seule personne. Un point quotidien\u00A0: fait, bloqué, reste à faire.",
                    "Je relisais chaque contribution validée pour garder un code cohérent. J’y ai surtout appris à communiquer\u00A0: aujourd’hui, je noterais davantage les décisions par écrit.",
                ],
            },
            {
                title: "Choix importants",
                paragraphs: [
                    "Les offres viennent d’un collecteur automatique, et personne ne les relit. Chacune est donc contrôlée avant d’être enregistrée\u00A0: titre obligatoire et limité, type parmi trois valeurs, pays sur deux lettres, coordonnées valides.",
                ],
            },
            {
                title: "Comment ça tourne",
                paragraphs: [
                    "Une API Symfony, une interface React, une base PostgreSQL. Chacun avait sa partie de l’API.",
                    "La recherche combine texte libre, ville, entreprise, contrat, télétravail, salaire ou catégorie, affiche les résultats page par page et écarte les offres de plus de trente jours. Chacun retrouve ses favoris.",
                    "La démo est hébergée par un camarade de promotion.",
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
            "Une plateforme pour apprendre le développement, avec des cours et des examens en QCM, construite à trois. J’ai pris en charge le serveur\u00A0: la structure des données, la connexion sécurisée, les droits selon le rôle, et la gestion des cours, leçons, quiz et résultats.",
        summary:
            "Une plateforme pour apprendre le développement, avec cours, QCM et administration, construite à trois.",
        highlights: [
            "Structure des données et API",
            "Connexion sécurisée et droits par rôle",
            "Gestion des cours, leçons, quiz et résultats",
        ],
        approach: [
            {
                title: "Le besoin",
                paragraphs: [
                    "Corelab forme au développement\u00A0: des cours, des QCM pour vérifier les acquis, et un espace pour les gérer.",
                ],
            },
            {
                title: "Ma part",
                paragraphs: [
                    "Un projet d’équipe où j’ai pris en charge le serveur\u00A0: la structure des données et l’API.",
                    "J’y ai beaucoup appris sur l’organisation d’un serveur et le contrôle des données reçues.",
                ],
            },
            {
                title: "Choix importants",
                paragraphs: [
                    "J’ai défini la forme des données\u00A0: utilisateur, cours, leçon, quiz, résultat, notification. Un quiz, par exemple, est une suite de questions à choix, chacune avec sa bonne réponse, et un score minimum pour réussir.",
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
                    "L’API gère les cours, leçons et quiz, enregistre les résultats, suit la progression de chaque élève, programme une leçon à une date et importe une liste d’élèves avec des mots de passe protégés, changés à la première connexion. Chaque demande est authentifiée, les droits dépendent du rôle, et les identifiants sont vérifiés avant toute recherche.",
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
        stack: ["JavaScript", "Node.js", "Express", "MongoDB"],
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

export const featuredProjects: readonly Project[] = featuredSlugs.map(
    (slug) => {
        const project = projects.find((p) => p.slug === slug);
        // `checkProjects` a déjà refusé tout slug inconnu, avec un message qui dit
        // lesquels existent. Ceci est là pour que le type le sache aussi.
        if (!project)
            throw new Error(`Projet mis en avant introuvable : ${slug}`);
        return project;
    },
);
