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
| `content/projects.ts` | Les projets : titre, cadre, description, stack, année, liens, et lesquels sont publiés |
| `content/site.ts` | Identité, ce que tu cherches, libellés des boutons, navigation, note sur l’IA |
| `content/about.ts` | Parcours, expériences, formation, langues, atouts, centres d’intérêt, méthode, compétences |
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
    kind: "ecole",
    team: "équipe de 4",
    description:
      "Une phrase ou deux, au présent, sur ce que fait le projet.",
    highlights: [
      "Un point technique",
      "Un autre",
      "Un troisième",
    ],
    approach: null,
    stack: ["React", "Node.js"],
    image: null,
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
- **`kind`** — `"personnel"` ou `"ecole"`. L’index des projets les range sous
  ces deux titres. Obligatoire sur un projet publié ; `null` accepté sur un
  projet en réserve.
- **`team`** — l’équipe telle que le CV la nomme, `"équipe de 5"`. Mets `null`
  si tu as travaillé seul.
- **`description`** — le texte principal de la page du projet. Une ou deux
  phrases suffisent ; une page courte est une page juste.
- **`highlights`** — les points listés sous la description. **Ils ne peuvent
  que reformuler ce qui est déjà dans `description` ou `stack`.** Pas de
  chiffre, pas de durée, pas de résultat, pas d’adjectif sur l’impact : rien
  qu’un recruteur ne puisse vérifier en ouvrant le dépôt.
- **`approach`** — le texte long, quand le projet mérite d’être raconté :
  d’où vient l’idée, ce que tu cherchais à obtenir, ce qui tourne aujourd’hui.
  Une entrée par partie, avec un titre (`title`) et une liste de paragraphes
  (`paragraphs`). Il s’affiche sous le titre « La démarche », en bas de la
  page du projet, et il n’apparaît pas dans l’index.
  Mets `null` sur les projets qui n’en ont pas :
  une page courte est une page juste, et c’est le cas de la plupart. Ce texte
  n’a pas la contrainte des `highlights` — tu peux y expliquer un choix — mais
  il reste soumis à la même règle de fond : rien qu’un recruteur ne puisse
  retrouver en ouvrant le dépôt.
- **`stack`** — les technologies, une par entrée. Sur l’accueil, chacune
  s’affiche dans son domaine de compétences avec le nom des projets qui
  l’utilisent. Une technologie qu’aucun domaine ne liste arrête la compilation :
  ajoute-la dans `competences`, dans `content/about.ts`.
- **`image`** — une capture du projet, ou `null`. Voir la section suivante.
- **`primaryStack`** — facultatif, les technologies principales à afficher dans
  le panneau d’accueil, par exemple `["Astro", "Svelte", "TypeScript", "C++", "WebAssembly"]`.
  Choisis des noms déjà présents dans `stack`. La page du projet et les
  compétences gardent la liste complète. Sans ce champ, le panneau utilise `stack`.
- **`year`** — l’année sur quatre chiffres.
- **`repo`** — l’adresse GitHub complète, ou `null` s’il n’y a pas de dépôt
  public.
- **`demo`** — l’adresse de la démo en ligne, ou `null`.
- **`status`** — `"live"` s’il y a une démo à voir, `"archived"` sinon. Les
  deux vont ensemble : `"live"` sans `demo` est refusé, parce que ce serait
  promettre au visiteur quelque chose qui n’existe pas.

Un projet ajouté reste **en réserve** tant que son slug n’est pas dans
`featuredSlugs` (voir « Choisir les projets publiés ») : il n’apparaît nulle
part sur le site.

### Organiser le récit d’un projet

Cette organisation reprend le principe de l’[étude de cas Episort de
Kisukesama](https://kisukesaama.com/fr/episort) : des parties titrées pour
retrouver les informations. Le portfolio garde sa propre mise en page.

Les parties aident à retrouver le besoin, ta contribution, les choix techniques
et le fonctionnement. Choisis les titres adaptés au texte disponible : aucune
liste de rubriques n’est imposée. Pour un projet d’équipe, « Ma part » indique
ce que tu as fait personnellement.

```ts
    approach: [
      {
        title: "Le besoin",
        paragraphs: [
          "Le problème auquel le projet répond.",
        ],
      },
      {
        title: "Ma part",
        paragraphs: [
          "Ce que j’ai réalisé dans le projet.",
          "Un autre paragraphe, si nécessaire.",
        ],
      },
    ],
```

Remplace ces phrases par des faits du projet. Un titre vide, une liste de
paragraphes vide ou un paragraphe vide arrête la compilation. Pour supprimer
une partie, retire son bloc ; pour supprimer tout le récit, mets
`approach: null`. N’ajoute une partie sur ce qui reste à faire que si le README
ou les issues du dépôt le documentent.

### Choisir les projets publiés

Dans le même fichier, plus bas :

```ts
export const featuredSlugs = ["tonecraft", "overkill", "corelab"] as const;
```

**Seuls ces projets sont publiés**, dans cet ordre : sur l’accueil, dans
l’index, avec leur page et dans le `sitemap.xml`. Les autres restent dans la
liste `projects`, en réserve, et leur adresse répond « Page introuvable ».

Remplace un slug, ou ajoutes-en un. Le titre « Trois projets récents », la
phrase « Trois projets, en 2026 », les flèches précédent/suivant et les
compteurs des compétences se réécrivent d’après la liste. Un slug qui ne
correspond à aucun projet arrête la compilation et te dit lesquels sont
disponibles.

### Supprimer un projet

Efface son bloc. Si son slug était dans `featuredSlugs`, retire-le aussi : la
compilation te le rappellera sinon.

### Ajouter une capture d’écran

Dépose le fichier dans `content/media/`, nommé comme le slug du projet, puis
renseigne `image` :

```ts
    image: {
      src: tonecraftShot,
      alt: "L’interface de Tonecraft\u00A0: les sélecteurs d’ampli et de baffle au-dessus de la tête GUILT, avec ses vitraux violets et ses réglages.",
    },
```

Il faut aussi une ligne d’import en haut du fichier, à côté des autres :

```ts
import tonecraftShot from "@/content/media/tonecraft.png";
```

L’image est importée depuis `content/media/` et non depuis `public/`, comme le
portrait : c’est ce qui permet à Next de lire ses dimensions tout seul, de
préparer les tailles servies aux petits écrans et d’afficher un flou pendant le
chargement.

- **`alt`** — ce que voit quelqu’un qui ne voit pas l’image. Décris ce qu’elle
  montre, ne la nomme pas : « L’interface de Tonecraft : les sélecteurs d’ampli
  et de baffle… » plutôt que « capture de Tonecraft ». Ce texte est relu comme les
  autres, apostrophes et espaces insécables comprises, et un champ vide arrête
  la compilation.

La capture s’affiche à deux endroits :

- **Sur la page du projet**, en haut, à côté du titre. Elle est visible tout de
  suite : c’est la page du projet, l’image y est chez elle.
- **Sur l’accueil**, si le projet est mis en avant, elle est repliée derrière
  « Voir l’aperçu », sous les liens du panneau. Un panneau d’accueil fait un
  écran de haut et son sujet est le titre ; une image posée là en permanence
  pèserait plus lourd que lui. Le visiteur l’ouvre s’il en a envie.

Elle n’apparaît pas dans l’index, dont les treize lignes partagent la même
hauteur.

Rien n’est encadré ni ombré : l’image est son propre bord, comme le reste du
site n’a pas un trait. Le repli est un `<details>` du navigateur, donc il
fonctionne même si le JavaScript ne se charge pas, comme le menu mobile.

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
paragraphe. `formation`, `langues`, `atouts` et `interets` se modifient sur
place.

Deux listes du même fichier alimentent l’accueil :

- **`principes`**, la section « Méthode ». Chaque principe a un titre, un
  texte, et la liste des slugs des projets qui le montrent. Un slug qui n’est
  pas publié arrête la compilation, pour qu’un principe ne renvoie jamais vers
  une page introuvable. Le texte ne dit rien que « La démarche » de ces projets
  ne dise déjà.
- **`competences`**, les domaines et leurs technologies. Le nom des projets
  affiché à côté de chaque technologie se calcule tout seul.

Ce fichier est relu comme les projets : un texte vide, une apostrophe droite ou
une espace mal placée arrête la compilation avec le même genre de message.

---

## Changer un texte d’interface

Dans `content/site.ts` :

- `site` — nom, rôle, ville, email, GitHub, adresse du CV
- `availability` — la recherche d’alternance, la période, le rythme, le poste
  visé, et le bandeau qui défile. L’école, le diplôme et le lieu affichés à côté
  sont lus dans `formation` et `site.location`, ne les retape pas.
- `hero`, `presentation` — l’accroche et le paragraphe de présentation
- `navItems` — les entrées du menu
- `sections` — les numéros et noms de chapitre de l’accueil
- `aiNote` — la note sur l’usage de l’IA, en bas de la section Contact
- `copy` — les libellés des boutons, « La démarche », « Voir l’aperçu » et les
  messages d’erreur
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
  • featuredSlugs contient « ancien-projet », qui ne correspond à aucun projet.
    Slugs disponibles : tonecraft, overkill, corelab, …
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
