/** Parcours, expériences, formation et langues. Voir MODIFIER.md. */

import { checkAbout, checkMethod } from "@/content/check";
import { featuredProjects } from "@/content/projects";

export const parcours: readonly string[] = [
    "Avant Epitech, j’ai travaillé dans la restauration et l’entretien d’espaces verts. Puis j’ai lancé une boutique en ligne de visuels générés par IA, sur Etsy.",
    "Pour cette boutique, j’ai voulu mon propre site. J’y ai appris le HTML et le CSS, et l’envie d’en faire mon métier : des projets personnels, puis la Web@cadémie by Epitech en 2025, en plein essor du code agentique.",
    "J’y apprends le métier par les deux bouts. Écrire le code à la main pour le comprendre, comme My Cinema, ma première API, sans framework. Et développer avec un agent IA à partir d’un cahier des charges précis, en testant tout et en décidant de ce qui est gardé.",
    "La boutique m’a appris à voir un produit avec les yeux du client. Une page floue ou une étape de trop se voyait dans les ventes. Je code de la même façon : je pars du parcours de l’utilisateur, je livre, puis j’améliore. Tonecraft est né ainsi, d’un problème que j’avais en tant que guitariste.",
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
    firstMonthTitle: "Dès le premier mois",
    firstMonth: [
        "Corriger des défauts d’affichage sur mobile et sur ordinateur, le cœur de mon titre d’intégrateur web.",
        "Rendre une page accessible à tous : contrastes, formulaires, navigation au clavier.",
        "Faire évoluer une API existante : nouveaux filtres, contrôle des données reçues, documentation.",
        "Automatiser les vérifications avant chaque mise en ligne, ou accélérer celles qui ralentissent l’équipe.",
        "Automatiser une tâche répétitive de l’équipe : reporting, exports, notes de version.",
    ],
    learnTitle: "Ce que je veux apprendre",
    learn: [
        "Vivre les rituels agiles de l’intérieur : estimations, point quotidien court et utile.",
        "Rendre mon avancement visible sans qu’on me le demande, surtout en télétravail.",
        "Présenter une fonctionnalité par ce qu’elle apporte à l’utilisateur.",
        "Comprendre ce que le QA, le support et le design attendent de moi.",
        "Partager ce que j’apprends : documentation, présentations, accueil des nouveaux.",
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
            "Boutique de visuels générés par IA, gérée seul de bout en bout : production, catalogue, relation client. Vente sur Etsy, puis via Discord et des partenaires payés à la commission. Chaque visuel était retravaillé jusqu’au bon rendu avant publication, un réflexe que je garde avec les tests.",
    },
    {
        role: "Agent d’espaces verts",
        period: "2021 à 2022",
        context: "AITA, intérim à Angers",
        description:
            "Entretien des espaces verts d’Angers, en équipe, avec une zone à finir dans la journée. En intérim, on n’est rappelé que si l’on est fiable : ponctuel, au rythme de l’équipe, rigoureux sur la sécurité.",
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
        "12 projets rendus en première année : 5 seul, 5 en binôme, 2 en équipe.",
    cycle: "Chaque projet suit le même cycle : lancement, tâches réparties sur Trello, point quotidien, soutenance orale.",
    proudest:
        "Celui qui m’a le plus appris : My Cinema, ma première API, écrite à la main en PHP, sans framework.",
} as const;

export const langues: readonly {
    readonly name: string;
    readonly level: string;
}[] = [
    { name: "Français", level: "natif" },
    {
        name: "Anglais",
        level: "courant, au quotidien depuis plus de dix ans",
    },
];

/** Les qualités, chacune avec ce qui la montre. */
export const atouts: readonly {
    readonly name: string;
    readonly detail: string;
}[] = [
    {
        name: "Esprit logique",
        detail: "Je découpe un problème avant de le coder. Sur JeuVideOPS, ce découpage a révélé deux oublis dès le départ : la mise en ligne et la gestion des secrets.",
    },
    {
        name: "Code avec l’IA",
        detail: "L’IA générative au quotidien depuis 2022. J’ai développé Tonecraft avec Claude Code, à partir de mon cahier des charges. Je teste tout, et je la recadre quand elle se trompe.",
    },
    {
        name: "Autonomie",
        detail: "Tonecraft, porté seul de l’idée à la mise en ligne. Une boutique tenue seul pendant trois ans.",
    },
    {
        name: "Travail en équipe",
        detail: "Sur Overkill, à cinq, je relisais chaque contribution validée pour garder un code cohérent.",
    },
    {
        name: "Fiabilité",
        detail: "Je livre ce que je prends. Quand ça bloque, je préviens tout de suite.",
    },
    {
        name: "Sens du produit",
        detail: "Je pars du parcours de l’utilisateur et j’avance avec ses retours. C’est ainsi que Tonecraft évolue.",
    },
];

/** Au-delà du code, avec ce qu’il en a dit. */
export const interets: readonly {
    readonly name: string;
    readonly detail: string;
    /** Un lien discret sous le texte, pour qui a envie d’aller voir. */
    readonly link?: { readonly label: string; readonly href: string };
}[] = [
    {
        name: "Guitare",
        detail: "Près de 15 ans de pratique, surtout des morceaux techniques et rapides. Un solo d’Archspire : un mois pour l’apprendre phrase par phrase, un autre pour atteindre le tempo.",
        link: {
            label: "Quelques reprises",
            href: "https://www.youtube.com/playlist?list=PLc8AWPHGVg0E9qopSmr0WWPlNUrqF6mg3",
        },
    },
    {
        name: "Technologie",
        detail: "Je suis l’impact de l’IA sur l’automobile, la robotique et la recherche médicale.",
    },
];

/**
 * Son usage de l’IA, tel qu’il l’a décrit : l’outil, ce qu’il lui confie, ce
 * qu’il vérifie et ce qu’il ne délègue pas. Un encadré à la fin de
 * « Méthode », sur l’accueil.
 */
export const ia = {
    title: "Coder avec l’IA",
    /** Au-dessus de chaque paragraphe, dans le même ordre : depuis quand, ce qu’il lui confie, ce qu’il vérifie, ce qu’il garde. */
    headings: ["Depuis 2022", "Ce que je lui confie", "Ce que je vérifie", "Ce que je ne délègue jamais"],
    paragraphs: [
        "J’utilise l’IA générative depuis 2022, avec Midjourney pour ma boutique. Je suis entré à la Web@cadémie en 2025, quand le code agentique a explosé : j’ai appris à coder en même temps qu’à piloter ces outils.",
        "J’utilise surtout Claude, d’Anthropic, pour apprendre, déboguer et écrire du code. Face à une technologie nouvelle, je lui demande le pourquoi de chaque étape et je vérifie dans la documentation officielle. Tonecraft, je l’ai développé avec Claude Code en mode agent, à partir de mon cahier des charges rédigé avec la méthode BMAD.",
        "Quand il fait fausse route, je le recadre. Sur JeuVideOPS, il proposait une solution que le sujet excluait. Je teste tout ce qu’il propose avant de le garder, et je vérifie que cela répond au besoin. Sur Tonecraft, c’est mon oreille qui juge le son.",
        "Je ne lui délègue jamais l’idée d’un produit, les choix d’interface, ce qui entre dans le projet, ni ce que j’affirme sur moi. En entreprise, aucun code ni donnée interne n’ira dans un outil non autorisé.",
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
        title: "Cadrer avant de coder",
        body: "Le besoin est écrit avant la première ligne. Avant de développer Tonecraft, j’ai rédigé son cahier des charges avec la méthode BMAD. Je décide ensuite de ce qui est gardé.",
        projects: ["tonecraft"],
    },
    {
        title: "Vérifier ce qui entre",
        body: "Rien de ce qui arrive de l’extérieur n’est utilisé sans contrôle. Sur Overkill, les offres collectées sont vérifiées avant d’être enregistrées. Sur Corelab, les identifiants de connexion aussi.",
        projects: ["overkill", "corelab"],
    },
    {
        title: "Contrôler les accès",
        body: "Chacun n’accède qu’à ce que son rôle permet. Sur Corelab, chaque demande est authentifiée et les mots de passe ne sont jamais stockés en clair.",
        projects: ["corelab"],
    },
    {
        title: "Signaler les échecs",
        body: "Une panne n’est jamais passée sous silence. Tonecraft n’annonce un ampli prêt que s’il l’est vraiment, et signale l’échec sinon. Des tests le vérifient avant chaque mise en ligne.",
        projects: ["tonecraft"],
    },
    {
        title: "Simplifier le parcours",
        body: "Le moins d’étapes possible. Tonecraft réunit tout sur une page, ne charge le lecteur de partitions qu’au besoin, et s’essaie sans micro.",
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
        domain: "Front-end",
        technologies: [
            "React",
            "TypeScript",
            "JavaScript",
            "Svelte",
            "Astro",
            "HTML",
            "CSS",
            "Tailwind CSS",
        ],
    },
    {
        domain: "Back-end",
        technologies: [
            "Python",
            "FastAPI",
            "API REST",
            "Node.js",
            "Express",
            "PHP",
            "Symfony",
            "Laravel",
            "Java",
            "PostgreSQL",
            "SQLite",
            "MySQL",
            "MongoDB",
        ],
    },
    {
        domain: "DevOps et qualité",
        technologies: [
            "Docker",
            "GitHub Actions",
            "CI/CD",
            "ESLint",
            "Jest",
            "Playwright",
        ],
    },
    {
        domain: "Outils",
        technologies: ["Git", "Linux", "Ollama"],
    },
    {
        // Le code de ces parties de Tonecraft est écrit par l’agent : il ne
        // code pas dans ces langages. Le groupe vient en dernier, à dessein.
        domain: "Délégué à l’IA",
        technologies: ["C++", "WebAssembly", "Rust"],
    },
];

checkMethod({ principes, competences }, featuredProjects);
