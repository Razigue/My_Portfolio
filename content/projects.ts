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
  | "guitar" | "funnel" | "pedal" | "amp" | "speaker" | "sliders" | "volume"
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
      "Tonecraft est une application web qui réunit sur une seule page tout ce qu’il faut pour apprendre un morceau à la guitare et s’enregistrer en le jouant. On branche sa guitare à l’ordinateur et on ouvre le site, sans rien installer ni créer de compte\u00A0: on choisit son son, on suit la partition pendant que le reste du groupe joue avec soi, puis on enregistre sa version et on la télécharge. Un accordeur et un métronome complètent l’ensemble.",
    summary:
      "Une application web pour apprendre un morceau à la guitare et s’enregistrer en le jouant, sans rien installer.",
    highlights: [],
    approach: [
      {
        title: "Le besoin",
        paragraphs: [
          "Travailler une reprise à la guitare demande plusieurs outils\u00A0: de quoi lire sa partie, le morceau original pour jouer dessus, le son d’un ampli et de quoi s’enregistrer. Sur ordinateur, cela veut souvent dire installer plusieurs logiciels, payer leurs licences, réussir à les faire fonctionner ensemble et jongler entre leurs fenêtres ouvertes en même temps.",
        ],
      },
      {
        title: "Le son d’un vrai ampli",
        paragraphs: [
          "Sans ampli, une guitare électrique est presque muette. Le son qu’on lui connaît vient du matériel auquel on la branche\u00A0: les pédales d’effet, l’ampli et son haut-parleur. Tonecraft recrée tout cela par logiciel.",
          "Le cœur du son est une capture\u00A0: la reproduction d’un vrai ampli, apprise par un réseau de neurones, qui réagit au jeu comme l’original. Tonecraft en propose quatre, partagées en ligne par la communauté. La principale, GUILT, est réglée selon mes préférences\u00A0: un son pour les solos, avec un peu d’écho pour lui donner un côté épique. Cette réverbération m’a fait penser à une guitare qui joue dans une église, d’où les vitraux qui habillent son ampli. Sans guitare, on peut tout de même l’essayer grâce à une démo que j’ai enregistrée à l’avance.",
        ],
        diagram: {
          title: "Le trajet du son, de la guitare au casque",
          steps: [
            {
              nodes: [
                { icon: "guitar", label: "La guitare", hint: "le son brut" },
              ],
            },
            {
              nodes: [
                { icon: "pedal", label: "Les pédales", hint: "nettoient et renforcent" },
              ],
            },
            {
              nodes: [
                { icon: "amp", label: "L’ampli", hint: "donne le caractère" },
              ],
            },
            {
              nodes: [
                { icon: "speaker", label: "Le haut-parleur", hint: "adoucit, donne du corps" },
              ],
            },
            {
              nodes: [
                { icon: "sliders", label: "Les finitions", hint: "graves, aigus, effet de salle" },
              ],
            },
            {
              nodes: [
                { icon: "headphones", label: "Le casque", hint: "ce qu’on entend" },
              ],
            },
          ],
        },
      },
      {
        title: "Faire sonner l’ampli comme un vrai",
        paragraphs: [
          "C’est la partie la plus difficile du projet. J’ai d’abord exploré la création d’un ampli maison, et je me suis heurté à un mur\u00A0: sans banque de sons sur laquelle entraîner une IA, impossible d’obtenir une simulation crédible.",
          "J’ai donc choisi de partir des captures partagées par la communauté, et de construire tout ce qui les entoure\u00A0: le baffle, le boost, la correction et la réverbération. C’est là que ma pratique de guitariste a fait la différence\u00A0: j’ai enregistré ma guitare sans ampli et comparé, à l’oreille, ce que donnait Tonecraft à des rendus faits avec les meilleures simulations du marché, comme celles de Neural DSP, jusqu’à un son qui plaise au plus grand nombre. C’est ainsi que j’ai terminé la première version.",
        ],
      },
      {
        title: "Suivre la partition",
        paragraphs: [
          "Les guitaristes apprennent souvent un morceau sur une tablature, une partition simplifiée qui indique quelle corde et quelle case jouer. Le fichier s’ouvre dans la page sans être envoyé nulle part\u00A0: la partition défile au rythme de la musique, le passage joué reste au centre de l’écran, et un manche de guitare dessiné en dessous montre où poser les doigts.",
          "On peut ralentir le morceau, répéter un passage difficile en boucle ou couper la guitare pour jouer sa partie à sa place. Il est aussi possible d’écrire ses propres tablatures, en entendant chaque note au moment où on la saisit. Pour que la page s’ouvre vite, ce lecteur ne se charge qu’à l’ouverture d’une partition.",
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
          "On ajoute le morceau original en fond, on joue par-dessus et on s’enregistre. Tonecraft garde le son de la guitare tel qu’il en sort, avant l’ampli\u00A0: on peut donc changer de son après avoir joué. Le fichier téléchargé contient, au choix, le son brut ou celui de l’ampli, seul ou mêlé au morceau.",
          "Le looper, lui, enregistre un passage tel qu’on l’entend, puis le rejoue en boucle pour s’exercer dessus.",
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
          "L’accordeur indique la note jouée et si elle est trop haute ou trop basse, au centième de demi-ton près. Le métronome bat la mesure au tempo choisi, que l’on peut aussi donner en tapant le rythme sur un bouton. Son clic s’entend au casque, mais ne se retrouve jamais dans une boucle ni dans un enregistrement.",
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
          "Le son est calculé par un moteur audio qui tourne directement dans le navigateur. Pour ceux qui veulent le moins de décalage possible entre la note jouée et la note entendue, un petit programme à installer en option, Tonecraft Engine, fait tourner exactement le même moteur hors du navigateur, sans que la page change.",
          "L’interface n’annonce l’ampli prêt qu’une fois que le moteur l’a confirmé, et signale l’erreur sinon. Avant chaque mise en ligne, des tests automatiques ouvrent le site dans un vrai navigateur et vérifient ce chargement, la démonstration sans micro, la lecture des partitions et l’enregistrement.",
        ],
        diagram: {
          title: "Les grandes parties de Tonecraft",
          steps: [
            {
              nodes: [
                { icon: "screen", label: "La page", hint: "ce qu’on voit", detail: "Astro, Svelte" },
              ],
              branches: [
                { flow: "apart", icon: "sheet", label: "Les partitions", hint: "un lecteur à part", detail: "alphaTab" },
              ],
            },
            {
              nodes: [
                { icon: "chip", label: "Le chef d’orchestre", hint: "coordonne l’ensemble", detail: "TypeScript" },
              ],
              branches: [
                { flow: "apart", icon: "storage", label: "La mémoire", hint: "garde les réglages", detail: "IndexedDB" },
              ],
            },
            {
              nodes: [
                { icon: "browser", label: "Le navigateur", hint: "par défaut", detail: "Web Audio API" },
                { icon: "install", label: "Tonecraft Engine", hint: "en option", detail: "Rust" },
              ],
            },
            {
              nodes: [
                { icon: "wave", label: "Le moteur audio", hint: "transforme le son", detail: "C++, WebAssembly" },
              ],
            },
          ],
        },
      },
      {
        title: "Comment je l’ai construit",
        paragraphs: [
          "Je l’ai conçu seul, et développé avec Claude Code et le modèle Opus 5 travaillant en agent, à partir de spécifications que j’ai construites avec la méthode BMAD. Je teste tout ce qui en sort et je décide de ce qui entre dans le dépôt. Une première version fonctionnelle m’a pris deux semaines, puis une semaine de plus pour la v1, surtout consacrée au design et à l’accessibilité. Depuis, il évolue en continu.",
        ],
      },
      {
        title: "Les retours des guitaristes",
        paragraphs: [
          "Je l’utilise moi-même pour travailler mes morceaux, et c’est aussi comme ça qu’il évolue, vers l’outil que j’aurais voulu avoir. D’autres guitaristes l’essaient et m’envoient chaque jour leurs retours\u00A0: ils apprécient que tout tienne sur une page et prennent plaisir à essayer les amplis et les réglages proposés, et ils me disent ce qui leur manque ou ce qu’ils n’ont pas trouvé du premier coup d’œil. C’est à partir de ces retours que je décide de ce qu’il faut ajouter, retravailler ou laisser tel quel.",
          "Pour l’instant, Tonecraft propose surtout des sons saturés\u00A0; je travaille à des sons clean et acoustiques. Au programme aussi, un espace où les guitaristes pourront partager leurs réglages, sur la plateforme ou par un lien. Aujourd’hui, aucun compte n’est nécessaire\u00A0: ce sera revu pour permettre ces échanges, sans jamais l’imposer pour jouer.",
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
      "Agrégateur d’offres d’emploi, de stage et d’alternance construit à cinq en trois semaines\u00A0: API Symfony, front React, base PostgreSQL. Ma part couvre les offres et les favoris\u00A0: contrôleurs, DTO de validation, recherche filtrée et pagination.",
    summary:
      "Un agrégateur d’offres d’emploi, de stage et d’alternance, construit à cinq en trois semaines.",
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
          "Je me suis occupé des offres et des favoris. Le contrôleur des offres porte les routes du domaine\u00A0: lecture filtrée, lecture par identifiant, création, suppression.",
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
          "On a commencé par un tableau Trello listant toutes les user stories et tout ce qu’il y avait à faire, découpé en objectifs par semaine. Les tâches étaient attribuées selon les affinités de chacun et clairement assignées, pour que deux personnes ne travaillent jamais sur la même chose. Chaque jour, un point pour dire ce qui était fait, ce qui marchait ou non, et ce qui restait. Une seule personne validait les pull requests.",
          "J’y ai surtout appris à communiquer\u00A0: j’aidais mes camarades sur leur partie sur mon temps libre, et je relisais chaque pull request validée pour garder une façon de coder cohérente sur tout le projet. Si c’était à refaire, je ferais passer davantage de choses par l’écrit, avec les décisions notées sur Trello plutôt que prises à l’oral.",
        ],
      },
      {
        title: "Choix importants",
        paragraphs: [
          "Les offres n’arrivent pas d’un formulaire mais d’un collecteur, donc personne ne relit ce qui entre. Le DTO en fixe les contraintes\u00A0: le titre est obligatoire et borné, le type ne peut valoir que trois valeurs, le pays est un code à deux lettres, les coordonnées doivent tenir dans leurs plages. Le JSON est validé avant d’atteindre la base.",
        ],
      },
      {
        title: "Comment ça tourne",
        paragraphs: [
          "C’est un projet d’équipe\u00A0: une API Symfony, un front React, une base PostgreSQL, le tout monté sous Docker. On s’est réparti l’API par domaine.",
          "La recherche accepte des critères cumulables (texte libre, ville, entreprise, contrat, type, télétravail, salaire minimum, catégorie), pagine les résultats et ne remonte que les offres publiées dans les trente derniers jours, pour ne pas montrer d’annonces périmées. Le contrôleur des favoris tient les siennes sur l’utilisateur connecté.",
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
      "Plateforme de formation au développement, cours et examens en QCM, construite en équipe avec une API Express et une base MongoDB. Prévue à trois, elle s’est faite à deux. Ma part couvre les modèles de données et les routes\u00A0: authentification JWT, contrôle d’accès par rôles, et le CRUD des cours, leçons, quiz et résultats.",
    summary:
      "Une plateforme pour apprendre le développement, avec des cours, des examens en QCM et un espace d’administration, prévue à trois et menée à deux.",
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
          "Prévu à trois, le projet s’est fait à deux, avec plusieurs imprévus à gérer. J’y ai beaucoup appris côté code, sur les contrôleurs, la validation des champs et les modèles avec Express, et côté organisation, sur ma capacité à m’adapter.",
        ],
      },
      {
        title: "Choix importants",
        paragraphs: [
          "Les modèles, écrits avec Mongoose, fixent la forme des données\u00A0: utilisateur, cours, leçon, quiz, résultat, notification. Ils décident ce qu’un élève possède, ce qu’un cours contient et ce qu’est un quiz\u00A0: une suite de questions à choix, chacune avec sa bonne réponse, et un seuil au-delà duquel l’examen est réussi.",
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
