/**
 * Relecture du contenu au chargement du module.
 *
 * Le typage attrape un champ manquant ou du mauvais type ; il ne dit rien d'une
 * chaîne vide, d'un slug en double, d'un projet marqué « en ligne » sans démo,
 * ou d'une apostrophe droite au milieu d'un texte français. Ces erreurs-là ne
 * cassent pas la compilation : elles publient une page fausse.
 *
 * Tout est donc vérifié ici, à l'import, ce qui veut dire que `npm run dev` et
 * `npm run build` s'arrêtent net avec un message qui nomme le champ et dit quoi
 * faire.
 *
 * Ces contrôles ne partent pas dans le navigateur. `content/site.ts` est bien
 * importé par trois composants clients, mais ils n'en tirent que des données :
 * l'appel disparaît du paquet client au secouage d'arbre, et il ne reste que
 * dans les chunks serveur, où le build l'exécute. Vérifié à la livraison en
 * cherchant ces messages dans `.next/static`, où aucun n'apparaît.
 */

import type { Project } from "@/content/projects";

/** Une seule erreur arrête tout, mais on les rassemble d'abord pour les dire toutes. */
function report(file: string, problems: readonly string[]): void {
  if (problems.length === 0) return;
  throw new Error(
    `\n\n${file} — ${problems.length} problème(s) à corriger :\n\n` +
      problems.map((p) => `  • ${p}`).join("\n") +
      "\n",
  );
}

/** Minuscules, chiffres et traits d'union : ce qui fera une URL propre. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Les textes français du site sont composés avec l'apostrophe courbe. */
const STRAIGHT_QUOTES = /['"]/;

/**
 * Le français colle sa ponctuation double au mot par une espace insécable. Une
 * espace ordinaire tient exactement la même place à l'écran, jusqu'au jour où
 * la ligne se replie et laisse le point d'interrogation seul en tête de ligne.
 * C'est invisible à la relecture et visible chez le visiteur, donc c'est
 * vérifié ici.
 */
const LOOSE_SPACE = / [;:!?»]|« /;

function checkProse(
  problems: string[],
  where: string,
  value: string | null,
): void {
  if (value === null) return;
  if (value.trim() === "") {
    problems.push(`${where} est vide. Mettre \`null\` si le champ ne s'applique pas.`);
    return;
  }
  if (STRAIGHT_QUOTES.test(value)) {
    problems.push(
      `${where} contient une apostrophe ou un guillemet droit : « ${value.trim()} ». ` +
        `Utiliser ’ et « » plutôt que ' et ".`,
    );
  }
  if (LOOSE_SPACE.test(value)) {
    problems.push(
      `${where} : espace ordinaire contre une ponctuation double ` +
        `(; : ! ? ou les guillemets), dans « ${value.trim()} ». ` +
        `Le français en demande une insécable. Elle est invisible, donc elle ` +
        `s'écrit \\u00A0 dans le texte : "24\\u00A0h", "une opportunité\\u00A0?".`,
    );
  }
}

/** Un texte, une liste de textes, ou un objet qui en contient. */
type Texts = string | readonly Texts[] | { readonly [key: string]: Texts };

/**
 * Applique les règles ci-dessus à toutes les chaînes d'une structure, en
 * nommant le chemin de chacune. Écrit ainsi plutôt que champ par champ pour
 * qu'un champ ajouté demain soit relu sans que personne ait à y penser.
 */
function checkTexts(problems: string[], where: string, value: Texts): void {
  if (typeof value === "string") {
    checkProse(problems, where, value);
    return;
  }
  const indexed = Array.isArray(value);
  for (const [key, item] of Object.entries(value)) {
    checkTexts(problems, indexed ? `${where}[${key}]` : `${where}.${key}`, item);
  }
}

function checkUrl(problems: string[], where: string, value: string | null): void {
  if (value === null) return;
  if (!value.startsWith("https://")) {
    problems.push(`${where} doit commencer par https:// (actuellement « ${value} »).`);
  }
}

export function checkProjects(
  projects: readonly Project[],
  featuredSlugs: readonly string[],
): void {
  const problems: string[] = [];

  if (projects.length === 0) {
    problems.push("La liste des projets est vide.");
  }

  const seen = new Set<string>();
  for (const project of projects) {
    const name = project.slug || "(projet sans slug)";

    if (!SLUG.test(project.slug)) {
      problems.push(
        `« ${name} » : le slug doit être en minuscules, sans accent ni espace, ` +
          `les mots séparés par des traits d'union (exemple : generateur-de-cv).`,
      );
    }
    if (seen.has(project.slug)) {
      problems.push(
        `« ${name} » : ce slug est utilisé deux fois. Chaque projet a son adresse, ` +
          `donc son slug doit être unique.`,
      );
    }
    seen.add(project.slug);

    checkProse(problems, `« ${name} » : title`, project.title);
    checkProse(problems, `« ${name} » : subtitle`, project.subtitle);
    checkProse(problems, `« ${name} » : description`, project.description);
    project.highlights.forEach((h, i) =>
      checkProse(problems, `« ${name} » : highlights[${i}]`, h),
    );

    if (project.stack.length === 0) {
      problems.push(`« ${name} » : stack est vide. Lister au moins une technologie.`);
    }
    project.stack.forEach((t, i) => {
      if (t.trim() === "") {
        problems.push(`« ${name} » : stack[${i}] est vide.`);
      }
    });

    if (!Number.isInteger(project.year) || project.year < 2000) {
      problems.push(`« ${name} » : year doit être une année sur quatre chiffres.`);
    }

    checkUrl(problems, `« ${name} » : repo`, project.repo);
    checkUrl(problems, `« ${name} » : demo`, project.demo);

    // « en ligne » est une promesse faite au visiteur : il y a quelque chose à
    // voir. Sans démo, c'est un projet archivé.
    if (project.status === "live" && project.demo === null) {
      problems.push(
        `« ${name} » : status vaut "live" mais demo vaut null. ` +
          `Renseigner l'adresse de la démo, ou passer status à "archived".`,
      );
    }
    if (project.status === "archived" && project.demo !== null) {
      problems.push(
        `« ${name} » : status vaut "archived" alors qu'une démo est en ligne. ` +
          `Passer status à "live".`,
      );
    }
  }

  if (featuredSlugs.length === 0) {
    problems.push("featuredSlugs est vide : l'accueil n'aurait aucun projet à montrer.");
  }
  const featured = new Set<string>();
  for (const slug of featuredSlugs) {
    if (!seen.has(slug)) {
      problems.push(
        `featuredSlugs contient « ${slug} », qui ne correspond à aucun projet. ` +
          `Slugs disponibles : ${[...seen].join(", ")}.`,
      );
    }
    if (featured.has(slug)) {
      problems.push(`featuredSlugs contient « ${slug} » deux fois.`);
    }
    featured.add(slug);
  }

  report("content/projects.ts", problems);
}

/**
 * Le parcours, les expériences, la formation et les langues. Rien d'autre à
 * vérifier que la relecture des textes et deux listes qui ne peuvent pas être
 * vides, chacune ouvrant une section qui n'aurait rien à montrer.
 */
export function checkAbout(about: {
  readonly parcours: readonly string[];
  readonly experiences: readonly Texts[];
  readonly formation: Texts;
  readonly langues: readonly Texts[];
}): void {
  const problems: string[] = [];

  if (about.parcours.length === 0) {
    problems.push("parcours est vide : la page « À propos » n'aurait pas de texte.");
  }
  if (about.experiences.length === 0) {
    problems.push("experiences est vide : la section n'aurait rien à montrer.");
  }

  checkTexts(problems, "parcours", about.parcours);
  checkTexts(problems, "experiences", about.experiences);
  checkTexts(problems, "formation", about.formation);
  checkTexts(problems, "langues", about.langues);

  report("content/about.ts", problems);
}

/**
 * Les textes d'interface. Passés en bloc plutôt qu'un par un : ajouter un
 * export à `content/site.ts` demande de l'ajouter à cet appel, ce qui est la
 * seule chose à ne pas oublier.
 */
export function checkCopy(texts: Readonly<Record<string, Texts>>): void {
  const problems: string[] = [];
  for (const [name, value] of Object.entries(texts)) {
    checkTexts(problems, name, value);
  }
  report("content/site.ts", problems);
}

export function checkSite(site: {
  readonly email: string;
  readonly url: string;
  readonly cvUrl: string;
  readonly github: string;
  readonly linkedin: string | null;
  readonly sourceRepo: string | null;
}): void {
  const problems: string[] = [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)) {
    problems.push(`email ne ressemble pas à une adresse : « ${site.email} ».`);
  }
  if (!site.cvUrl.startsWith("/")) {
    problems.push(
      `cvUrl doit être un chemin depuis la racine du site, donc commencer par / ` +
        `(actuellement « ${site.cvUrl} »). Le fichier se dépose dans public/.`,
    );
  }
  checkUrl(problems, "url", site.url);
  checkUrl(problems, "github", site.github);
  checkUrl(problems, "linkedin", site.linkedin);
  checkUrl(problems, "sourceRepo", site.sourceRepo);

  report("content/site.ts", problems);
}
