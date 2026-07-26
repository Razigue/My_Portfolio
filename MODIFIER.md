# Modifier le site

Guide pratique pour faire vivre le portfolio sans toucher au code de mise en
page. Tout ce qui se lit sur le site est écrit dans le dossier `content/`.

Les explications de conception (pourquoi il n’y a pas un seul trait, comment la
chorégraphie fonctionne, comment les thèmes sont construits) sont dans
[`README.md`](README.md). Ici, uniquement le contenu.

Si tu préfères faire faire la modification par un assistant, ouvre le projet
avec lui et demande-lui simplement ce que tu veux : [`AGENTS.md`](AGENTS.md) lui
est adressé et il le lira tout seul.

---

## Avant de commencer

Une seule fois, à l’installation :

```bash
npm install
```

Puis, à chaque session de travail :

```bash
npm run dev
```

Le site tourne sur <http://localhost:3000> et se recharge à chaque
enregistrement. **Garde cette fenêtre ouverte pendant que tu modifies** : si tu
te trompes, elle te dit immédiatement quoi corriger, en français.

---

## Où se trouve quoi

| Fichier | Ce qu’il contient |
| --- | --- |
| `content/projects.ts` | Les projets : titre, description, stack, année, liens |
| `content/site.ts` | Identité, disponibilité, libellés des boutons, navigation |
| `content/about.ts` | Parcours, expériences, formation, langues |
| `content/media/razigue.png` | Le portrait |
| `public/cv-razigue-benhmida.pdf` | Le CV téléchargeable |

Aucun texte affiché n’est écrit ailleurs. Si tu cherches une phrase, elle est
dans l’un de ces fichiers.

---

## Ajouter un projet

Ouvre `content/projects.ts` et copie ce modèle dans la liste `projects`, à la
place qui correspond à sa date. **L’ordre de la liste est l’ordre affiché**, du
plus récent au plus ancien.

```ts
  {
    slug: "mon-nouveau-projet",
    title: "Mon nouveau projet",
    subtitle: "sous-titre en italique",
    description:
      "Une phrase ou deux, au présent, sur ce que fait le projet.",
    highlights: [
      "Un point technique",
      "Un autre",
      "Un troisième",
    ],
    stack: ["React", "Node.js"],
    year: 2026,
    repo: "https://github.com/Razigue/MonNouveauProjet",
    demo: null,
    status: "archived",
  },
```

Champ par champ :

- **`slug`** — l’adresse de la page, ici `/projets/mon-nouveau-projet`.
  Uniquement des minuscules, des chiffres et des traits d’union. Pas
  d’accent, pas d’espace, pas de majuscule. Deux projets ne peuvent pas
  partager le même slug.
- **`title`** — le nom affiché, avec ses majuscules et ses accents.
- **`subtitle`** — le qualificatif en italique sous le titre. Mets `null` si le
  projet n’en a pas.
- **`description`** — le texte principal de la page du projet. Une ou deux
  phrases suffisent ; une page courte est une page juste.
- **`highlights`** — les points listés sous la description. **Ils ne peuvent
  que reformuler ce qui est déjà dans `description` ou `stack`.** Pas de
  chiffre, pas de durée, pas de résultat, pas d’adjectif sur l’impact : rien
  qu’un recruteur ne puisse vérifier en ouvrant le dépôt.
- **`stack`** — les technologies, une par entrée. Elles alimentent aussi le
  tableau des compétences de l’accueil, qui se recalcule seul.
- **`year`** — l’année sur quatre chiffres.
- **`repo`** — l’adresse GitHub complète, ou `null` s’il n’y a pas de dépôt
  public.
- **`demo`** — l’adresse de la démo en ligne, ou `null`.
- **`status`** — `"live"` s’il y a une démo à voir, `"archived"` sinon. Les
  deux vont ensemble : `"live"` sans `demo` est refusé, parce que ce serait
  promettre au visiteur quelque chose qui n’existe pas.

Il n’y a rien d’autre à faire. La ligne dans `/projets`, la page du projet, le
`sitemap.xml`, les flèches précédent/suivant, le compteur de la matrice de
compétences et la phrase « Treize projets, de 2025 à 2026 » suivent tout seuls.

### Mettre un projet en avant sur l’accueil

Dans le même fichier, plus bas :

```ts
export const featuredSlugs = ["corelab", "connect-in-v2", "epitone"] as const;
```

Remplace un slug, ou ajoutes-en un. Le titre de la section (« Trois projets
récents ») et la phrase qui suit (« Les dix autres sont dans l’index ») se
réécrivent d’après le nombre. Un slug qui ne correspond à aucun projet arrête
la compilation et te dit lesquels sont disponibles.

### Supprimer un projet

Efface son bloc. Si son slug était dans `featuredSlugs`, retire-le aussi : la
compilation te le rappellera sinon.

---

## Modifier une expérience ou la formation

Dans `content/about.ts`. Même principe : `experiences` est une liste, l’ordre de
la liste est l’ordre affiché, du plus récent au plus ancien.

```ts
  {
    role: "Intitulé du poste",
    period: "janvier 2022 à décembre 2024",
    context: "Entreprise, ville, type de contrat",
    description: "Ce que tu y faisais, en une ou deux phrases.",
  },
```

`parcours` est le texte long de la page « À propos » : une entrée par
paragraphe. `formation` et `langues` se modifient sur place.

Ce fichier est relu comme les projets : un texte vide, une apostrophe droite ou
une espace mal placée arrête la compilation avec le même genre de message.

---

## Changer un texte d’interface

Dans `content/site.ts` :

- `site` — nom, rôle, ville, email, GitHub, adresse du CV
- `availability` — la recherche d’alternance, la période, le rythme, et le
  bandeau qui défile
- `hero`, `presentation` — l’accroche et le paragraphe de présentation
- `navItems` — les entrées du menu
- `sections` — les numéros et noms de chapitre de l’accueil
- `copy` — les libellés des boutons et les messages d’erreur
- `form` — les libellés du formulaire de contact

---

## Remplacer le CV ou le portrait

**Le CV.** Dépose le nouveau PDF dans `public/`, puis mets `cvUrl` à jour dans
`content/site.ts`. Le chemin commence toujours par `/` :

```ts
cvUrl: "/cv-razigue-benhmida.pdf",
```

**Le portrait.** Remplace `content/media/razigue.png` en gardant le même nom. Il
est importé comme un fichier et non depuis `public/`, ce qui permet à Next de
calculer ses dimensions et sa vignette de chargement lui-même.

---

## Trois règles à connaître

### 1. `null` veut dire « rien du tout »

Un champ à `null` n’affiche **rien** : jamais un lien désactivé, jamais un
bouton grisé, jamais « bientôt ». Une absence se lit comme un choix.

Donc : si tu n’as pas encore de démo, mets `demo: null`. Ne mets pas `"#"`, ni
une adresse qui ne marche pas encore.

### 2. Le français a deux règles de composition que le site tient

**Les apostrophes sont courbes.** Le site est composé avec `’` et non `'`. Écris
`Connect’In`, `l’index`, `d’espaces verts`.

Sur un clavier français : `AltGr` + `4`. Ou copie-colle celle-ci : `’`

**Les signes doubles se collent au mot.** Devant `:` `;` `!` `?` et à l’intérieur
de `« »`, le français met une espace insécable et non une espace ordinaire. Les
deux se ressemblent à l’écran, jusqu’au jour où la ligne se replie et laisse le
point d’interrogation seul en tête de ligne.

Elle est invisible, donc elle s’écrit en toutes lettres dans le texte :

```ts
description: "Trois services\u00A0: vote, worker, result.",
subtitle: "une opportunité\u00A0?",
```

`\u00A0` est reconnu par TypeScript et devient l’espace insécable à la lecture.
C’est la seule façon fiable de la saisir sans dépendre du clavier.

Ces deux règles arrêtent la compilation avec un message qui te montre la phrase
concernée et le champ où elle se trouve.

### 3. Ne saisis jamais un nombre que le site sait compter

Ces textes se calculent tout seuls à partir des données. Les écrire à la main,
c’est garantir qu’ils seront faux au prochain projet ajouté :

- le nombre de projets, partout où il apparaît
- les années couvertes par l’index
- le nombre de projets par technologie, dans la matrice de compétences
- la numérotation des projets, en tête de ligne et sur les pages

---

## Si la compilation refuse ta modification

C’est prévu. Le message nomme le fichier, le projet et le champ, et dit quoi
faire. Par exemple :

```
content/projects.ts — 2 problème(s) à corriger :

  • « corelab » : ce slug est utilisé deux fois. Chaque projet a son adresse,
    donc son slug doit être unique.
  • featuredSlugs contient « epitone », qui ne correspond à aucun projet.
    Slugs disponibles : corelab, connect-in-v2, …
```

Corrige, enregistre, la page se recharge. Ces vérifications tournent aussi bien
en développement qu’à la mise en ligne, donc une erreur ne peut pas passer en
production.

---

## Vérifier avant de publier

```bash
npm run typecheck
npm run lint
npm run build
```

Les trois doivent passer sans rien afficher d’anormal. `npm run build` est le
plus important : c’est exactement ce qui tourne à la mise en ligne.

---

## Reste à confirmer

[`TODO.md`](TODO.md) liste ce qui attend une décision ou une information de ta
part : le nom de domaine, l’URL LinkedIn, les trois projets sans dépôt
identifié, et l’activation du formulaire de contact.
