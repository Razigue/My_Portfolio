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

import type { Project, ProjectTranslation } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

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

/**
 * L'anglais fait l'inverse : aucune espace, même insécable, devant `;` `:` `!`
 * `?`, et des guillemets “ ” plutôt que « ». Une phrase copiée depuis le
 * français garde souvent les siennes.
 */
const ENGLISH_SPACE = /[   ][;:!?]|[«»]/;

function checkProse(
  problems: string[],
  where: string,
  value: string | null,
  locale: Locale = "fr",
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
  if (locale === "en") {
    if (ENGLISH_SPACE.test(value)) {
      problems.push(
        `${where} : texte anglais avec une espace devant ; : ! ? ou des ` +
          `guillemets « », dans « ${value.trim()} ». L'anglais colle la ` +
          `ponctuation au mot et s'écrit avec “ ”.`,
      );
    }
    return;
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
function checkTexts(
  problems: string[],
  where: string,
  value: Texts,
  locale: Locale = "fr",
): void {
  if (typeof value === "string") {
    checkProse(problems, where, value, locale);
    return;
  }
  const indexed = Array.isArray(value);
  for (const [key, item] of Object.entries(value)) {
    checkTexts(
      problems,
      indexed ? `${where}[${key}]` : `${where}.${key}`,
      item,
      locale,
    );
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
    if (project.summary !== undefined) {
      checkProse(problems, `« ${name} » : summary`, project.summary);
    }
    project.highlights.forEach((h, i) =>
      checkProse(problems, `« ${name} » : highlights[${i}]`, h),
    );

    // An empty section would publish a heading with nothing below it.
    // Projects without a long-form account use `null` instead.
    if (project.approach !== null) {
      if (project.approach.length === 0) {
        problems.push(
          `« ${name} » : approach est une liste vide. Mettre \`null\` si le ` +
            `projet n'a pas de texte long, ou écrire au moins une partie titrée.`,
        );
      }
      project.approach.forEach((section, i) => {
        const where = `« ${name} » : approach[${i}]`;
        checkProse(problems, `${where}.title`, section.title);
        if (section.paragraphs.length === 0) {
          problems.push(
            `${where}.paragraphs est une liste vide. Écrire au moins un ` +
              `paragraphe, ou retirer cette partie.`,
          );
        }
        section.paragraphs.forEach((paragraph, j) =>
          checkProse(problems, `${where}.paragraphs[${j}]`, paragraph),
        );
        if (section.media !== undefined) {
          if (section.media.length === 0 || section.media.length > 2) {
            problems.push(
              `${where}.media contient ${section.media.length} capture(s). ` +
                `Une partie montre une capture, ou deux côte à côte : ` +
                `retirer le champ plutôt que de le laisser vide.`,
            );
          }
          section.media.forEach((image, j) =>
            checkProse(problems, `${where}.media[${j}].alt`, image.alt),
          );
        }
        if (section.diagram !== undefined) {
          checkTexts(problems, `${where}.diagram`, section.diagram);
          if (section.diagram.steps.length === 0) {
            problems.push(
              `${where}.diagram.steps est une liste vide. Ajouter des étapes ou retirer le schéma.`,
            );
          }
          section.diagram.steps.forEach((step, j) => {
            if (step.nodes.length === 0) {
              problems.push(
                `${where}.diagram.steps[${j}].nodes est une liste vide. Ajouter un bloc ou retirer l'étape.`,
              );
            }
          });
        }
      });
    }

    // Une image sans texte de remplacement n'existe pas pour qui ne la voit
    // pas, et le champ est trop facile à laisser vide en la déposant.
    if (project.image !== null) {
      checkProse(problems, `« ${name} » : image.alt`, project.image.alt);
    }
    if (project.thumbnail !== undefined) {
      checkProse(problems, `« ${name} » : thumbnail.alt`, project.thumbnail.alt);
    }

    if (project.stack.length === 0) {
      problems.push(`« ${name} » : stack est vide. Lister au moins une technologie.`);
    }
    project.stack.forEach((t, i) => {
      if (t.trim() === "") {
        problems.push(`« ${name} » : stack[${i}] est vide.`);
      }
    });

    if (project.stackDisclosure !== undefined) {
      checkProse(problems, `« ${name} » : stackDisclosure`, project.stackDisclosure);
    }

    if (project.primaryStack !== undefined) {
      if (project.primaryStack.length === 0) {
        problems.push(`« ${name} » : primaryStack est vide. Choisir les technologies principales ou retirer ce champ.`);
      }
      for (const technology of project.primaryStack) {
        if (!project.stack.includes(technology)) {
          problems.push(`« ${name} » : primaryStack contient « ${technology} », absente de stack. Utiliser le même nom que dans stack.`);
        }
      }
    }

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
    // « à installer » renvoie au code : il faut le dépôt, et pas de démo.
    if (project.status === "local" && (project.demo !== null || project.repo === null)) {
      problems.push(
        `« ${name} » : status vaut "local" : demo doit valoir null et repo être renseigné.`,
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

    // L'index range les projets publiés par cadre : un projet sans cadre
    // n'aurait nulle part où aller.
    const project = projects.find((p) => p.slug === slug);
    if (project?.kind === null) {
      problems.push(
        `« ${slug} » est publié mais kind vaut null. ` +
          `Mettre "personnel" ou "ecole".`,
      );
    }
    if (project) checkProse(problems, `« ${slug} » : team`, project.team);
    // Les listes de projets montrent cette phrase : sans elle, la carte
    // n'aurait rien pour dire ce qu'est le projet.
    if (project && project.summary === undefined) {
      problems.push(
        `« ${slug} » est publié mais n'a pas de summary. Écrire en une phrase ` +
          `ce qu'est le projet, en reprenant sa description.`,
      );
    }
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
  readonly atouts: readonly Texts[];
  readonly interets: readonly Texts[];
  readonly ia: Texts;
  readonly devise: string;
  readonly recherche: Texts;
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
  checkTexts(problems, "atouts", about.atouts);
  checkTexts(problems, "interets", about.interets);
  checkTexts(problems, "ia", about.ia);
  checkTexts(problems, "devise", about.devise);
  checkTexts(problems, "recherche", about.recherche);

  report("content/about.ts", problems);
}

/**
 * La méthode et les compétences renvoient aux projets publiés. Un principe qui
 * cite un projet en réserve renverrait vers une page qui n'existe pas, et une
 * technologie d'un projet publié absente des domaines disparaîtrait de
 * l'accueil sans que personne le remarque.
 */
export function checkMethod(
  method: {
    readonly principes: readonly {
      readonly title: string;
      readonly body: string;
      readonly projects: readonly string[];
    }[];
    readonly competences: readonly {
      readonly domain: string;
      readonly technologies: readonly string[];
    }[];
  },
  published: readonly Project[],
): void {
  const problems: string[] = [];
  const slugs = published.map((p) => p.slug);

  method.principes.forEach((principe, i) => {
    checkProse(problems, `principes[${i}].title`, principe.title);
    checkProse(problems, `principes[${i}].body`, principe.body);
    for (const slug of principe.projects) {
      if (!slugs.includes(slug)) {
        problems.push(
          `principes[${i}] cite « ${slug} », qui n'est pas publié. ` +
            `Projets publiés : ${slugs.join(", ")}.`,
        );
      }
    }
  });

  const listed = new Set<string>();
  method.competences.forEach((group, i) => {
    checkProse(problems, `competences[${i}].domain`, group.domain);
    group.technologies.forEach((t) => listed.add(t));
  });
  for (const project of published) {
    for (const technology of project.stack) {
      if (!listed.has(technology)) {
        problems.push(
          `« ${technology} » (stack de « ${project.slug} ») n'est rangée dans ` +
            `aucun domaine de competences. L'ajouter à celui qui lui correspond, ` +
            `écrite exactement pareil.`,
        );
      }
    }
  }

  report("content/about.ts", problems);
}

/**
 * Les textes d'interface. Passés en bloc plutôt qu'un par un : ajouter un
 * export à `content/site.ts` demande de l'ajouter à cet appel, ce qui est la
 * seule chose à ne pas oublier.
 */
export function checkCopy(
  texts: Readonly<Record<string, Texts>>,
  file = "content/site.ts",
  locale: Locale = "fr",
): void {
  const problems: string[] = [];
  for (const [name, value] of Object.entries(texts)) {
    checkTexts(problems, name, value, locale);
  }
  report(file, problems);
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

/**
 * Les textes anglais des projets publiés, dans `content/en/projects.ts`. Un
 * projet publié sans eux n'aurait pas de page anglaise, et un champ présent
 * dans une langue et absent de l'autre montrerait un sous-titre, une équipe ou
 * un schéma à la moitié des visiteurs seulement.
 */
export function checkProjectTexts(
  projects: readonly Project[],
  featuredSlugs: readonly string[],
  texts: Readonly<Record<string, ProjectTranslation>>,
): void {
  const problems: string[] = [];

  for (const slug of Object.keys(texts)) {
    if (!projects.some((project) => project.slug === slug)) {
      problems.push(
        `« ${slug} » est traduit mais ne correspond à aucun projet de ` +
          `content/projects.ts. Corriger le slug ou retirer l'entrée.`,
      );
    }
  }

  for (const slug of featuredSlugs) {
    const project = projects.find((p) => p.slug === slug);
    if (!project) continue;
    const text = texts[slug];
    if (!text) {
      problems.push(
        `« ${slug} » est publié mais n'a pas de texte anglais. Ajouter son ` +
          `entrée, en reprenant chaque champ texte du projet.`,
      );
      continue;
    }

    const name = `« ${slug} »`;
    checkProse(problems, `${name} : title`, text.title, "en");
    checkProse(problems, `${name} : subtitle`, text.subtitle, "en");
    checkProse(problems, `${name} : team`, text.team, "en");
    checkProse(problems, `${name} : description`, text.description, "en");
    if (text.summary !== undefined) {
      checkProse(problems, `${name} : summary`, text.summary, "en");
    }
    text.highlights.forEach((h, i) =>
      checkProse(problems, `${name} : highlights[${i}]`, h, "en"),
    );
    if (text.stackDisclosure !== undefined) {
      checkProse(problems, `${name} : stackDisclosure`, text.stackDisclosure, "en");
    }
    if (text.imageAlt !== undefined) {
      checkProse(problems, `${name} : imageAlt`, text.imageAlt, "en");
    }
    if (text.thumbnailAlt !== undefined) {
      checkProse(problems, `${name} : thumbnailAlt`, text.thumbnailAlt, "en");
    }

    const pairs: readonly (readonly [string, boolean, boolean])[] = [
      ["subtitle", project.subtitle !== null, text.subtitle !== null],
      ["team", project.team !== null, text.team !== null],
      ["summary", project.summary !== undefined, text.summary !== undefined],
      ["approach", project.approach !== null, text.approach !== null],
      [
        "stackDisclosure",
        project.stackDisclosure !== undefined,
        text.stackDisclosure !== undefined,
      ],
      ["imageAlt", project.image !== null, text.imageAlt !== undefined],
      ["thumbnailAlt", project.thumbnail !== undefined, text.thumbnailAlt !== undefined],
    ];
    for (const [field, french, english] of pairs) {
      if (french !== english) {
        problems.push(
          `${name} : ${field} ` +
            (french
              ? "existe en français mais manque en anglais."
              : "existe en anglais mais pas en français.") +
            ` Les deux langues doivent montrer les mêmes champs.`,
        );
      }
    }

    if (project.approach && text.approach) {
      if (project.approach.length !== text.approach.length) {
        problems.push(
          `${name} : approach compte ${text.approach.length} partie(s) en ` +
            `anglais et ${project.approach.length} en français. Traduire ` +
            `chaque partie, dans le même ordre.`,
        );
      }
      text.approach.forEach((section, i) => {
        const where = `${name} : approach[${i}]`;
        checkProse(problems, `${where}.title`, section.title, "en");
        if (section.paragraphs.length === 0) {
          problems.push(`${where}.paragraphs est une liste vide.`);
        }
        section.paragraphs.forEach((paragraph, j) =>
          checkProse(problems, `${where}.paragraphs[${j}]`, paragraph, "en"),
        );
        if (section.diagram !== undefined) {
          checkTexts(problems, `${where}.diagram`, section.diagram, "en");
        }
        const french = project.approach?.[i];
        section.mediaAlt?.forEach((alt, j) =>
          checkProse(problems, `${where}.mediaAlt[${j}]`, alt, "en"),
        );
        if (
          french &&
          (french.media?.length ?? 0) !== (section.mediaAlt?.length ?? 0)
        ) {
          problems.push(
            `${where} : ${french.media?.length ?? 0} capture(s) en français et ` +
              `${section.mediaAlt?.length ?? 0} description(s) dans mediaAlt. ` +
              `Décrire chaque capture en anglais, dans le même ordre.`,
          );
        }
        if (
          french &&
          (french.diagram === undefined) !== (section.diagram === undefined)
        ) {
          problems.push(
            `${where} : le schéma doit exister dans les deux langues, ou dans aucune.`,
          );
        }
      });
    }
  }

  report("content/en/projects.ts", problems);
}

/**
 * Le parcours en anglais. Chaque liste suit la française entrée par entrée,
 * dans le même ordre : une expérience ajoutée d'un seul côté décalerait toutes
 * celles qui la suivent.
 */
export function checkAboutTranslation(
  french: {
    readonly experiences: number;
    readonly langues: number;
    readonly atouts: number;
    readonly interets: number;
    readonly principes: number;
    readonly competences: number;
    readonly firstMonth: number;
    readonly learn: number;
    readonly iaParagraphs: number;
  },
  english: {
    readonly parcours: readonly string[];
    readonly experiences: readonly Texts[];
    readonly formation: Texts;
    readonly langues: readonly Texts[];
    readonly atouts: readonly Texts[];
    readonly interets: readonly Texts[];
    readonly principes: readonly Texts[];
    readonly competenceDomains: readonly string[];
    readonly ia: { readonly paragraphs: readonly string[] } & Texts;
    readonly devise: string;
    readonly recherche: {
      readonly firstMonth: readonly string[];
      readonly learn: readonly string[];
    } & Texts;
  },
): void {
  const problems: string[] = [];

  if (english.parcours.length === 0) {
    problems.push("parcours est vide : la page « About » n'aurait pas de texte.");
  }

  const counts: readonly (readonly [string, number, number])[] = [
    ["experiences", english.experiences.length, french.experiences],
    ["langues", english.langues.length, french.langues],
    ["atouts", english.atouts.length, french.atouts],
    ["interets", english.interets.length, french.interets],
    ["principes", english.principes.length, french.principes],
    ["competenceDomains", english.competenceDomains.length, french.competences],
    ["recherche.firstMonth", english.recherche.firstMonth.length, french.firstMonth],
    ["recherche.learn", english.recherche.learn.length, french.learn],
    ["ia.paragraphs", english.ia.paragraphs.length, french.iaParagraphs],
  ];
  for (const [field, en, fr] of counts) {
    if (en !== fr) {
      problems.push(
        `${field} compte ${en} entrée(s) en anglais et ${fr} en français. ` +
          `Chaque entrée française a sa traduction, dans le même ordre.`,
      );
    }
  }

  for (const [field, value] of Object.entries(english)) {
    checkTexts(problems, field, value, "en");
  }

  report("content/en/about.ts", problems);
}
