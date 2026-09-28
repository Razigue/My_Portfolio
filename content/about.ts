/** Parcours, expériences, formation et langues. Voir MODIFIER.md. */

import { checkAbout, checkMethod } from "@/content/check";
import { featuredProjects } from "@/content/projects";

export const parcours: readonly string[] = [
  "Avant Epitech, j’ai occupé plusieurs emplois, notamment dans la restauration et l’entretien d’espaces verts. J’ai ensuite développé une activité de vente en ligne de visuels générés par IA avec Midjourney, d’abord sur Etsy.",
  "Pour cette boutique, j’ai commencé à construire mon propre site. C’est là que j’ai appris les bases du HTML et du CSS, et que j’ai eu envie d’aller plus loin\u00A0: j’ai poursuivi avec des projets personnels, puis rejoint la Web@cadémie by Epitech pour en faire mon métier.",
  "La boutique m’a surtout appris à regarder un produit du côté de celui qui l’utilise. Une page produit peu claire ou une étape de trop dans l’achat se voyait tout de suite dans les ventes, alors j’ajustais en continu. Aujourd’hui, quand je code une interface, je pars du parcours de l’utilisateur et de ce qui peut le bloquer, je livre une première version, puis je l’améliore à partir de ce que j’observe. C’est cette logique qui a donné Tonecraft, parti d’un problème que j’avais moi-même en tant que guitariste.",
];

/** La phrase qui ouvre la page « À propos », sous son titre. Ses mots à lui. */
export const devise =
  "Je saisis les occasions, je m’organise, et je vais au bout.";

/**
 * La partie « En alternance » de la page « À propos » : ce qu’il peut prendre
 * en charge dès le premier mois, et ce qu’il veut apprendre. Tout vient de ses
 * réponses. Aucune préférence de type d’entreprise n’y figure, à sa demande :
 * elle fermerait des portes.
 */
export const recherche = {
  title: "En alternance",
  firstMonthTitle: "Ce que je peux prendre en charge dès le premier mois",
  firstMonth: [
    "Corriger des bugs d’intégration (responsive, CSS, composants), le cœur de mon titre de développeur intégrateur web.",
    "Auditer l’accessibilité d’une page avec axe ou Lighthouse, puis corriger les points simples : contrastes, libellés de formulaires, textes alternatifs, navigation au clavier.",
    "Faire évoluer une API existante : ajouter un filtre ou une pagination, renforcer la validation des entrées, documenter les routes en OpenAPI.",
    "Brancher le lint et les tests dans la CI, ou accélérer une pipeline trop lente.",
    "Automatiser une tâche manuelle de l’équipe (reporting, export, notes de version) avec un script ou un workflow n8n.",
    "Rédiger un rapport d’étonnement.",
  ],
  learnTitle: "Ce que je veux apprendre en entreprise",
  learn: [
    "Vivre les rituels agiles de l’intérieur : comprendre le rôle de chacun, participer aux estimations, et faire un point quotidien utile, en une minute, sur ce qui est fait, ce qui reste et ce qui bloque.",
    "Rendre mon avancement visible sans qu’on me le demande, avec des tickets et des statuts à jour, surtout en télétravail.",
    "Présenter une fonctionnalité en revue de sprint par ce qu’elle apporte à l’utilisateur.",
    "Savoir ce que les autres métiers attendent de moi : le QA pour tester, le support pour répondre aux utilisateurs, le designer pour ajuster une maquette.",
    "Partager ce que j’apprends : documentation, courte présentation interne, aide au prochain arrivant.",
  ],
} as const;

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
      "Boutique en ligne de visuels générés par IA, gérée seul de bout en bout : production, produit et relation client. Vente sur Etsy, avec des clients trouvés par le bouche-à-oreille, puis par un serveur Discord et des plateformes de visibilité rémunérées à la commission. Les visuels étaient produits sur Midjourney, en itérant les prompts pour tenir le style, le cadrage et la qualité avant de publier, un réflexe que je garde avec les tests. Point de départ de ma reconversion vers le développement web.",
  },
  {
    role: "Agent d’espaces verts",
    period: "2021 à 2022",
    context: "AITA, intérim à Angers",
    description:
      "Entretien des espaces verts des communes d’Angers, dans une équipe qui se répartit la tonte, la taille et le nettoyage pour finir une zone dans la journée. En intérim, on n’est rappelé pour la mission suivante que si l’on est fiable\u00A0: à l’heure, au rythme de l’équipe, rigoureux avec les consignes de sécurité sur les machines.",
  },
];

export const formation = {
  title: "Développeur intégrateur web",
  credential: "Titre RNCP de niveau 5",
  period: "2025 à 2027",
  school: "Web@cadémie by Epitech",
  place: "Le Kremlin-Bicêtre (94)",
  detail: "Formation 24 mois dont 12 en alternance",
  firstYear:
    "En première année, 12 projets rendus : 5 seul, 5 en binôme et 2 en équipe. Le plus gros, Overkill, s’est fait à cinq en trois semaines.",
  cycle:
    "Chaque projet suit le même cycle : un lancement qui présente le sujet, la prise en main du projet et de ses technologies, les tâches réparties sur Trello, un point d’avancement chaque jour, puis une soutenance orale devant l’équipe pédagogique.",
  proudest:
    "Le projet qui m’a le plus appris : My Cinema, ma première API REST reliant le back au front, écrite entièrement à la main en PHP, sans framework. Un projet exigeant, qui m’a fait comprendre le rôle des contrôleurs, des modèles et des entités.",
} as const;

export const langues: readonly {
  readonly name: string;
  readonly level: string;
}[] = [
  { name: "Français", level: "natif" },
  { name: "Anglais", level: "courant, pratiqué au quotidien depuis plus de dix ans" },
];

/** Les qualités, chacune avec ce qui la montre. */
export const atouts: readonly {
  readonly name: string;
  readonly detail: string;
}[] = [
  {
    name: "Autonomie",
    detail:
      "Tonecraft, que je porte seul de l’idée à la mise en ligne, et une boutique en ligne tenue seul pendant trois ans.",
  },
  {
    name: "Organisation",
    detail:
      "Avant de coder, je découpe le sujet en cartes Trello et je vérifie qu’elles le couvrent en entier. Sur JeuVideOPS, c’est ce qui a montré qu’il manquait le déploiement et la gestion des secrets, avant la première ligne de code.",
  },
  {
    name: "Travail en équipe",
    detail:
      "Sur Overkill, à cinq, je relisais chaque pull request validée pour garder un code cohérent.",
  },
  {
    name: "Fiabilité",
    detail:
      "Ce que je prends, je le livre, et quand ça bloque, je préviens tout de suite\u00A0: un réflexe gardé de l’intérim.",
  },
  {
    name: "Sens du produit",
    detail:
      "Je pars du parcours de l’utilisateur, et je décide de la suite à partir de ses retours\u00A0: c’est ainsi que Tonecraft évolue.",
  },
];

/** Au-delà du code, avec ce qu’il en a dit. */
export const interets: readonly {
  readonly name: string;
  readonly detail: string;
}[] = [
  {
    name: "Guitare",
    detail:
      "Près de 15 ans de pratique, surtout des morceaux techniques et rapides. Pour un solo exigeant comme celui de Behold, de Born of Osiris, je compte un mois pour l’apprendre, en le découpant en phrases que je travaille lentement au métronome, puis un mois de plus pour construire proprement la vitesse jusqu’au tempo d’origine.",
  },
  {
    name: "Technologie",
    detail:
      "Je suis surtout la façon dont l’IA transforme ce qui existe déjà : l’automobile, la robotique et, plus récemment, la recherche médicale.",
  },
];

/**
 * Son usage de l’IA, tel qu’il l’a décrit : l’outil, ce qu’il lui confie, ce
 * qu’il vérifie et ce qu’il ne délègue pas. Un encadré à la fin de
 * « Méthode », sur l’accueil.
 */
export const ia = {
  title: "Mon usage de l’IA",
  paragraphs: [
    "J’utilise surtout Claude, d’Anthropic, avec le modèle Opus 5, pour apprendre, déboguer et écrire du code, tests et pipeline de CI compris. Quand je découvre une technologie, je lui demande le pourquoi de chaque étape, et je vérifie dans la documentation officielle au moindre doute. Sur Tonecraft, je l’ai fait travailler en agent avec Claude Code, à partir de spécifications que j’ai construites avec la méthode BMAD.",
    "Je teste tout ce qu’il produit, avec Postman, des tests ou la CI, et je vérifie que le résultat répond vraiment au besoin. Sur JeuVideOPS, il proposait un serveur nginx alors que le sujet imposait GitHub Pages : je l’ai recadré. Sur Tonecraft, c’est mon oreille qui juge le son.",
    "Ce que je ne lui délègue jamais : l’idée d’un produit, ses choix d’interface, ce qui entre dans le dépôt et ce que j’affirme sur moi. En entreprise, aucun code ni aucune donnée interne n’ira dans un outil que l’entreprise n’a pas autorisé.",
  ],
} as const;

// Textes vides, apostrophes droites, espaces ordinaires contre une ponctuation
// double : la compilation s'arrête ici plutôt que de publier la page.
checkAbout({
  parcours,
  devise,
  recherche,
  experiences,
  formation,
  langues,
  atouts,
  interets,
  ia,
});

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
    body: "Ce qui arrive de l’extérieur est vérifié avant d’être utilisé. Sur Overkill, un DTO définit les contraintes des offres reçues du collecteur et Symfony les valide avant l’écriture en base. Sur Corelab, Zod valide les données de connexion avant la recherche de l’utilisateur.",
    projects: ["overkill", "corelab"],
  },
  {
    title: "Contrôler les accès",
    body: "Chacun n’accède qu’à ce que son rôle lui permet. Sur Corelab, un middleware vérifie le jeton JWT et les routes concernées contrôlent le rôle de l’utilisateur. Les mots de passe générés à l’import des utilisateurs sont hachés avec bcrypt.",
    projects: ["corelab"],
  },
  {
    title: "Signaler les échecs de chargement",
    body: "Ce qui échoue est signalé, jamais passé sous silence. Quand une capture d’ampli ne se charge pas dans Tonecraft, entendre du son ne prouve pas qu’elle fonctionne. L’interface attend une confirmation du moteur et signale l’échec. Les tests en navigateur vérifient ce chargement avant la publication.",
    projects: ["tonecraft"],
  },
  {
    title: "Simplifier le parcours",
    body: "Le moins d’étapes possible pour le visiteur. Tonecraft réunit simulation guitare, tablatures et outils de pratique dans la même page. Le lecteur et ses instruments ne sont chargés qu’à l’ouverture d’une partition. Un visiteur peut écouter la démonstration sans activer le micro.",
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
