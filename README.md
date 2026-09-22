# Portfolio de Razigue Benhmida

Portfolio bilingue d’un développeur web full-stack en recherche d’alternance :
français par défaut à la racine, anglais sous `/en`.
Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind
CSS v4, GSAP ScrollTrigger et Lenis.

Direction artistique : **« Cinématique éditoriale »**. Neutres froids et
profonds, un seul or clair, titrage serif surdimensionné, et une chorégraphie au
scroll où chaque élément a une entrée *et* une sortie.

---

## Il n’y a pas un seul trait sur ce site

Pas une bordure, pas un filet, pas un séparateur, pas un soulignement, pas un
contour de lettre, pas un cadre autour d’un bouton ou d’un champ. Pas non plus
de tiret, de point médian ni de barre verticale employés comme ponctuation de
mise en page. C’est la contrainte la plus structurante du projet.

Elle a été vérifiée route par route, dans les deux thèmes, en relevant sur
chaque élément rendu toute bordure, tout contour, tout contour de lettre, toute
boîte de deux pixels d’épaisseur et six fois plus longue, et tout glyphe
séparateur resté dans le texte. Aucune occurrence. C’est aussi ce qu’il faut
regarder après une modification : un trait ne se remarque pas quand on vient de
l’écrire, il se remarque à côté d’une page qui n’en a aucun.

**Ce qui sépare les sections à la place :**

1. **Le vide.** `.section-body` pose `clamp(6rem, 12vw, 11rem)` de marge
   verticale. Mesuré sur la page d’accueil, il reste entre 168 et 313 px de
   page vide entre la dernière ligne d’une section et la première de la
   suivante. La proximité groupe toute seule.
2. **Le fond.** `.band` pose une section sur deux sur `--ink-2`, et la teinte
   change net au bord. Ce bord est la limite entre deux aplats : il n’a ni
   couleur propre ni épaisseur. Un bord adouci par un dégradé a été essayé, et
   rejeté : une limite qui se fond se lit comme un flou plutôt que comme une
   décision.
3. **Le chapitre.** Chaque section s’ouvre sur son ordinal en gros, en serif,
   en `--flare`, et son libellé en mono juste dessous. Assez lourd pour
   annoncer un nouveau mouvement en défilant.

Les listes qui étaient tenues par un filet sous chaque ligne, l’index des
projets, les expériences, les langues, alternent désormais de fond une ligne
sur deux. C’est ce que fait un tableau bien composé quand il n’a pas de filets,
et cela reste lisible quelle que soit la hauteur d’une ligne.

Trois exceptions, et aucune ne sépare quoi que ce soit : l’anneau de focus, à
2 px, sans lequel une personne au clavier ne sait pas où elle est ; la position
de lecture, à 3 px dans la marge droite, qui rend compte d’un état ; et le
rognage à 1 px qui masque un texte à l’écran en le laissant dans l’arbre
d’accessibilité, dont rien n’est peint.

---

## Démarrer

```bash
npm install
npm run dev
```

- `npm run dev` → serveur de développement
- `npm run build` → build de production, toutes les routes statiques, dans les
  deux langues
- `npm start` → sert le build
- `npm run lint` → ESLint
- `npm run typecheck` → `tsc --noEmit`

---

## Où vit le contenu

**Tout le contenu rédactionnel est dans `content/`. Aucun texte n’est écrit en
dur dans un composant.**

- `content/site.ts` → identité, disponibilité, libellés d’interface, navigation
- `content/projects.ts` → les projets
- `content/about.ts` → parcours, expériences, formation, langues
- `content/en/` → les mêmes textes en anglais : `site.ts`, `about.ts`, et les
  mots des projets publiés dans `projects.ts`. Les faits (liens, stack, années,
  captures) ne sont écrits que dans les fichiers français
- `content/check.ts` → les règles de relecture, exécutées à l’import
- `content/media/razigue.png` → portrait, **import statique**, pas `public/`

👉 **La marche à suivre pour ajouter un projet, changer un texte ou remplacer le
CV est dans [`MODIFIER.md`](MODIFIER.md).** Cette section-ci explique pourquoi
les fichiers sont faits ainsi.

Si tu fais faire la modification par un assistant, [`AGENTS.md`](AGENTS.md) lui
est adressé : il y trouvera les mêmes gestes, plus les contraintes de la
direction artistique qu’aucune vérification automatique ne tient.

### La règle du `null`

Un champ à `null` **ne rend rien du tout** : jamais un lien désactivé, jamais un
`mailto:#`, jamais un bouton grisé, jamais « bientôt ».

```ts
linkedin: null as string | null,
```

Il devient structurellement impossible de publier un lien mort, et une absence
se lit comme un choix plutôt que comme un chantier. Les champs actuellement à
`null` sont listés dans [`TODO.md`](TODO.md).

### Rien de ce qui se compte n’est saisi

Un nombre écrit à la main est un nombre qui sera faux au prochain projet
ajouté. Tout ce qui se déduit des données est déduit des données :

- le nombre de projets et les années couvertes, dans le titre de l’index comme
  dans sa méta-description (`projectsSummary()`)
- le titre de la sélection de l’accueil et la phrase qui la suit, d’après la
  longueur de `featuredSlugs`
- les compteurs de la matrice de compétences, comptés sur les `stack`
  (`lib/skills.ts`)
- la numérotation des lignes et des pages projet

`lib/french.ts` écrit ces nombres en toutes lettres, parce qu’un chiffre en
tête de phrase se lit mal en français.

### Ce que le typage ne peut pas attraper

TypeScript refuse un champ manquant ou du mauvais type. Il ne dit rien d’une
chaîne vide, d’un slug en double, d’un projet marqué « en ligne » sans démo,
d’une apostrophe droite au milieu d’un texte français, ni d’une espace ordinaire
là où le français en demande une insécable : rien de tout cela ne casse la
compilation, cela publie simplement une page fausse.

`content/check.ts` s’exécute donc à l’import, ce qui arrête `npm run dev` et
`npm run build` avec un message en français nommant le champ et disant quoi
faire. **Toutes les chaînes de `content/` y passent** — les projets, le parcours
et les expériences, les libellés d’interface — parce que la relecture est écrite
comme un parcours de la structure et non champ par champ : un champ ajouté
demain est relu sans que personne ait eu à y penser.

Chacune de ces erreurs a été injectée dans le contenu réel, une à une, pour
vérifier que le build la refuse *et* que son message est lisible. Une
vérification qu’on n’a jamais vue échouer n’est pas une vérification.

Ces contrôles ne partent pas dans le navigateur. `content/site.ts` est pourtant
importé par trois composants clients ; c’est le secouage d’arbre qui les en
sort, et c’est constaté plutôt que supposé — aucun de ces messages ne se trouve
dans `.next/static` après un build.

---

## La chorégraphie

Le cœur du système est un contrat en deux moitiés.

**Côté serveur**, un composant se contente de poser un attribut :

```tsx
<Reveal variant="lines" as="p">{project.description}</Reveal>
// rend : <p data-choreo="lines">…</p>
```

**Côté client**, un `<Stage>` ramasse tous les `[data-choreo]` qu’il contient,
construit **une timeline en pause par élément**, et donne à chaque élément son
propre ScrollTrigger via `ScrollTrigger.batch`.

**Des arrivées, rien d’autre.** Rien ne repart en arrière quand on redescend :
ce qui a été montré reste montré. C’est aussi pour cela que chaque déclencheur
est `once` et se supprime après avoir joué, si bien qu’une page lue jusqu’en bas
ne porte plus aucun travail au défilement.

Par élément, et non par section : c’est le point important. Une timeline unique
déclenchée à l’arrivée de la *section* signifiait que, dans une section plus
haute que la fenêtre, tout ce qui se trouvait sous la ligne de flottaison avait
fini d’animer avant même d’être atteint. La page paraissait figée. `batch`
conserve l’effet de groupe : les éléments qui arrivent ensemble sont réunis dans
un même lot et joués en cascade, ceux qui arrivent seuls jouent seuls.

Le bénéfice : le contenu reste dans des Server Components. Un titre n’a pas
besoin de devenir du code client pour être animé.

**Seuls les titres, les images, les listes de technologies et les boutons
s’animent.** Les autres éléments marqués (paragraphes, libellés, listes,
schémas, compteurs) sont affichés tels quels dès leur arrivée : attendre qu’un
paragraphe apparaisse était pénible à la lecture. Le tri se fait à un seul
endroit, dans `components/motion/Stage.tsx` ; les attributs restent dans le
balisage.

Variantes disponibles (`lib/gsap.ts` → `CHOREO`) : `fade` `rise` `fall` `scale`
`blur` `mask` `wipe` `chars` `words` `lines` `drift` `sweep` `counter`.

> Il y avait une variante `rule`, un `scaleX` de 0 à 1 dont le seul emploi était
> de tracer un filet. Elle est partie avec les filets.

```tsx
<Stage stagger={0.09} start="top 88%">   {/* section entière */}
<Stage immediate delay={0.12}>           {/* joue au chargement, pas au scroll */}
<Reveal variant="chars" order={1} />     {/* position explicite dans le lot */}
```

Pour du mouvement lié à la position de défilement plutôt qu’au temps,
`<Scrub from={…} to={…}>` : la sortie du hero, la dérive des ordinaux
fantômes, le bandeau défilant et le mot du pied de page.

### Ce qui protège la page

- **Rien n’est masqué en CSS.** L’état caché est posé par GSAP après le montage
  du `Stage`. Sans JavaScript, la page s’affiche complète, et c’est vérifié.
- **Le rideau d’ouverture** (`components/motion/Loader.tsx`) n’est affiché que
  sous `html.js`, une classe posée par le script bloquant du `<head>`. Sans
  JavaScript il n’apparaît jamais. Une animation CSS l’escamote au bout de 5 s
  si le bundle ne s’hydrate pas.
- **Le focus force l’entrée.** Entrer au clavier dans une section joue toute sa
  chorégraphie d’un coup, sans cascade : impossible d’atterrir sur un élément
  transparent.

### Repère de lecture

Un seul : la marque dorée qui descend dans la marge droite. La barre de
défilement native est masquée en CSS et celle-ci la remplace.

**C’est une marque qui se déplace, pas un remplissage qui grandit.** Un
remplissage qui part du haut est une barre de progression, et une barre de
progression ne dit jamais qu’une chose : la fraction déjà parcourue. Une marque
a une longueur en plus d’une position, donc elle en dit deux : quelle part de
la page tient à l’écran d’un coup, c’est-à-dire la longueur de la page, et où
l’on se trouve dedans. Sur une page dont trois des parties font un écran plein
chacune, la première de ces deux informations est la plus utile, et le
remplissage ne la portait pas du tout.

Sa longueur est donc la part de la fenêtre dans la page, mesurée et non
choisie, avec un minimum de 26 px pour qu’elle reste trouvable sur une page
très longue.

Il n’y a pas de rail derrière elle. Un trait vide sur toute la hauteur de la
fenêtre est une bordure, et cette page n’a pas de bordures : seule la marque
est peinte, et elle n’apparaît qu’une fois qu’on lit. Elle fait trois pixels et
rend compte d’une position, ce qui est précisément ce qui la distingue d’un
filet de plus. L’écart est le même en haut, à droite et en bas, et il est plus
petit que la gouttière de la page, donc la marque reste dans la marge et ne
passe jamais sur le texte. C’est un affichage et non un contrôle : rien à
saisir, rien à faire glisser.

Elle s’étire quand la page va vite, et par l’arrière : c’est le bord qui suit
qui prend du retard. Au repos elle revient à sa longueur exacte, celle qui
porte le sens. Un minuteur de 140 ms la ramène, parce qu’un glissement décroît
tout seul mais pas un saut : la page arrive en une image, les mises à jour
s’arrêtent, et sans cela la marque garderait la longueur à laquelle le saut
l’avait tirée.

> Une version découpée en tranches, une par partie de la page, a été construite
> puis abandonnée : sur un site dont on venait de retirer chaque filet, une
> colonne de neuf tirets dorés dans la marge se lisait comme neuf traits de
> plus, quelle que soit l’information qu’ils portaient.

## Rien n’est composé en capitales

Ni `text-transform: uppercase`, ni `capitalize`, ni petites capitales, nulle
part. À la taille du méta, les capitales ont toutes la même hauteur, ce qui
efface la silhouette des mots ; il faut alors les écarter à 0,14 em pour les
rendre lisibles, et la ligne se remplit de trous. En bas de casse, les jambages
et les hampes font ce travail, donc l’interlettrage redescend à 0,045 em et le
méta se lit d’un coup d’œil.

Les sigles restent des sigles : HTML, PHP, JWT, CRUD, RNCP, CV, IA s’écrivent
ainsi. Le monogramme `RB` est la marque du site. Vérifié sur chaque route :
aucune transformation en capitales, et aucune suite de plus de six capitales
dans le texte rendu, seuil qui laisse passer un sigle et arrête un mot crié.

### Le mobilier fixe

**Le monogramme.** L’en-tête porte `RB` dans la face de titrage, pas le nom
complet en mono. Le nom complet reste dans l’arbre d’accessibilité, précédé des
deux lettres réellement affichées, pour que le nom accessible contienne le
libellé visible (WCAG 2.5.3). Le monogramme est calé juste sous la hauteur de
l’interrupteur, donc la barre n’a pas changé de hauteur. La favicone est le
même monogramme, en creux dans un carré doré plein ; elle portait auparavant un
filet doré de 5 px en pied, c’est-à-dire un trait dans la seule marque qui
représente le site.

**Le repère de défilement.** En bas de l’écran d’ouverture, le mot « Défiler »
était seul et n’indiquait rien. Deux corrections. Une flèche tombe hors de sa
boîte et rentre par le haut, ce qui est le mécanisme des lettres de la
navigation tourné vers le bas : l’indication vient du vocabulaire du site.
Et le mot est devenu un vrai bouton, qui amène la page au bloc suivant, donc le
libellé décrit quelque chose qui arrive.

**Le retour en haut.** Un bloc doré plein, en bas à droite, à gauche de la
position de lecture pour que les deux ne se recouvrent jamais. Il n’apparaît
qu’au-delà d’un écran et demi, et il est `visibility: hidden` tant qu’il n’est
pas proposé : l’opacité seule le laisserait dans l’ordre de tabulation, où il
serait un arrêt qui ne mène nulle part. 44 × 44 px, au-dessus du minimum de
WCAG 2.5.8.

> La transformation est écrite directement sur l’élément concerné. Publier la
> progression en propriété personnalisée sur `:root` se lit mieux mais invalide
> le style calculé de **tout** le document à chaque image : mesuré sur un
> défilement de cinq secondes, cela coûtait 1,7 s de recalcul de style réparti
> sur 1832 recalculs. C’est exactement la sensation d’une page à quinze images
> par seconde.

### Transitions de route

`TransitionLink` → `TransitionProvider` : la page sortante est couverte par cinq
panneaux qui montent en cascade, la route change derrière le rideau, puis les
panneaux poursuivent leur course vers le haut. Un `<Link>` réel en dessous, donc
un clic milieu, un Ctrl-clic ou l’absence de JavaScript se comportent
normalement.

---

## Thèmes

Un interrupteur à deux positions, jour et nuit, persisté dans `localStorage`.
Il n’y a pas de troisième réglage à traverser : la préférence du système
s’applique tant qu’on n’a jamais touché le contrôle.

`<html>` porte la vérité : la classe `dark` et l’attribut `data-theme`, posés par
un script bloquant dans le `<head>` **avant le premier rendu**. Le dessin de
l’interrupteur est décidé en CSS à partir de cette classe, sans state React,
donc il est juste dès la première image et il n’y a ni décalage d’hydratation ni
flash, vérifié sur les quatre combinaisons préférence × système.

Toutes les couleurs vivent dans `app/globals.css`. Les réinitialisations
`--color-*: initial` du bloc `@theme` suppriment les palettes par défaut de
Tailwind : `bg-indigo-500` n’existe tout simplement pas. ESLint refuse
d’ailleurs toute couleur littérale dans un `.ts` ou un `.tsx`.

Trois surfaces se dessinent sans feuille de style et ne peuvent donc pas lire
une variable : les images sociales, que Satori compose sans cascade, les balises
`theme-color`, lues par le navigateur avant tout CSS, et le manifeste, qui est
du JSON. `lib/palette.ts` est la seule copie autorisée de la palette, et les
trois y puisent.

### Les deux thèmes ne portent pas le même accent

Un or clair tient comme marque claire sur un fond presque noir. Il n’existe
aucune marque claire qui tienne sur un fond presque blanc : de jour, l’accent
doit être sombre, et un orange sombre est une couleur à part entière là où un or
sombre n’est qu’un or éteint.

Le degré de noirceur n’est pas un goût, il est calculé. La teinte la plus
contraignante est `--ink-3`, celle que prend une ligne d’index sous le pointeur.
Y passer 4.5:1 plafonne la luminance relative de l’accent à 0.119 ; l’orange
retenu est à 0.090, soit **5.43** sur cette teinte, **6.31** sur une bande et
**6.90** sur la page.

Les neutres restent froids dans les deux thèmes, donc l’accent est la seule
chose chaude de la page, ce qui le fait lire comme un accent plutôt que comme
une teinte générale.

### Le centrage optique de l’en-tête

Centrer une boîte centre le cadratin, et le cadratin n’est pas là où sont les
marques : une capitale va de la ligne de base à la hauteur d’œil, et l’espace
des jambages en dessous reste vide. À côté d’un disque, qui n’a pas cet espace,
les deux se voient en désaccord.

`--trim-display` et `--trim-mono` corrigent la moitié de cet espace inutilisé.
Les valeurs sont **mesurées sur les pixels peints**, et non déduites des
métriques de la fonte : celles que la fonte rapporte sont arrondies au pixel
entier aux tailles de texte, donc fausses d’un demi-pixel précisément là où ça
compte. Elles ont été relevées en photographiant la barre et en lisant les
rangées peintes, jusqu’à ce que le monogramme, un mot de navigation et
l’interrupteur tombent à un tiers de pixel les uns des autres : 0,17 px la
nuit, 0,33 px le jour.

Ces deux valeurs appartiennent à ces trois fontes. Changer de fonte les invalide,
et la seule façon d’en trouver d’autres est de regarder les pixels à nouveau.

---

## Formulaire de contact

Server Action (`app/contact/actions.ts`) + `useActionState` + `useFormStatus`,
avec pot de miel et contrôle de délai de saisie.

Avec `RESEND_API_KEY`, l’envoi passe par Resend. Sans clé, il passe par
FormSubmit, qui transmet à `CONTACT_TO_EMAIL` (par défaut `site.email`) sans
compte ni clé, une fois l’adresse activée par le lien que FormSubmit envoie au
premier message. Tant que ce n’est pas fait, le formulaire renvoie un état
`unconfigured` explicite qui oriente vers l’adresse email. **Il ne simule
jamais un envoi réussi.** Voir [`TODO.md`](TODO.md) §7.

> `app/contact/state.ts` est séparé de `actions.ts` parce qu’un module
> `"use server"` ne peut exporter que des fonctions asynchrones. Une constante
> exportée depuis là arrive à `undefined` côté client.

---

## Ce qui a été vérifié, et comment

Deux choses seulement tournent en continu : `npm run typecheck` et
`npm run lint`, plus les relectures de `content/check.ts` que `npm run build`
déclenche. Tout le reste ci-dessous a été mesuré à la livraison, sur un build de
production, avec un harnais qui n’est pas livré avec le projet : c’étaient des
scripts d’instrumentation, écrits pour établir un fait puis jetés.

Le sens de cette liste n’est donc pas « relancer ceci » mais « voici ce qui
était vrai, et voici ce que ça vaut la peine de regarder après une
modification ».

- **Traits et séparateurs**, 6 routes × 2 thèmes → aucun, et le détecteur a
  d’abord été mis en échec sur les quatre défauts qu’il devait attraper
- **Capitales**, 6 routes → aucune transformation, aucun mot crié
- **Alignement de l’en-tête**, deux thèmes → monogramme, mot de navigation et
  interrupteur à 0,33 px les uns des autres au pire, mesurés sur les pixels
  peints
- **Colonnes de l’index**, 1920 / 1440 / 1024 → dérive nulle sur les cinq
  colonnes, sur des lignes portant 0, 1 et 2 liens
- **Contenu**, 11 erreurs injectées → le build refuse les 11, avec un message
  qui nomme le champ
- **Mobilier fixe**, 1440 et 390 → 32 contrôles verts : monogramme, repère de
  défilement, retour en haut, curseur de chaque bouton, marque qui s’étire
- **Sectionnement**, deux thèmes → les fonds alternent, 168 px d’air au plus
  serré, écart de teinte 8/255 la nuit et 12/255 le jour
- `tsc --noEmit`, `eslint`, `build` → 0 erreur, 0 avertissement
- **Routes** → 25, toutes statiques
- **axe-core**, 6 routes × 2 thèmes → 0 violation grave ou critique
- **Anneau de focus** → présent sur les 214 arrêts de tabulation
- **Débordement horizontal à 320 px** → aucun
- **Contenu sans JavaScript** → présent sur toutes les routes
- **Liens externes de `projects.ts`** → 12/12 en 200
- **Contraste**, 30 paires, deux thèmes → toutes ≥ 4,5:1, la plus juste à 4,53
- **Typographie française** → apostrophes courbes et espaces insécables ; c’est
  la seule de ces vérifications qui soit passée dans `content/check.ts`, donc la
  seule qui continue de tourner
- **Thème au premier rendu**, 4 combinaisons préférence × système → correct,
  aucun flash
- **Transition de route** → rideau refermé, focus déplacé, aucun élément resté
  transparent
- **Chorégraphie** → en mouvement à chaque palier de défilement
- **Coût au défilement** → 444 ms de recalcul de style sur cinq secondes

Une modification de contenu ne remet en cause aucune de ces mesures : elles
portent sur la mise en page, et la mise en page ne change pas quand un projet
s’ajoute. Une modification de **style**, elle, les remet toutes en cause, et il
n’y a plus de filet pour le dire.

### Ce que le lint attrape

La configuration va au-delà du préréglage Next, qui ne voit qu’un fichier à la
fois et ne peut donc pas savoir qu’une promesse n’est pas attendue. Les
configurations `recommendedTypeChecked` et `stylisticTypeChecked` de
`typescript-eslint` lisent le même programme que `tsc`.

S’y ajoutent trois règles propres au projet : aucune couleur littérale hors de
`lib/palette.ts`, pas de `console` autre que `warn` et `error`, et pas
d’assertion `!` — une assertion affirme ce que le compilateur ne voit pas, et si
elle est fausse elle casse loin de sa cause.

Côté compilateur : `noUncheckedIndexedAccess`, `noImplicitOverride`,
`noFallthroughCasesInSwitch` et `verbatimModuleSyntax` en plus de `strict`.
`exactOptionalPropertyTypes` a été essayé puis retiré : il impose `| undefined`
sur chaque prop optionnelle, ce qui piège quiconque en ajoute une plus tard,
pour un gain nul sur des props React.

---

## Déploiement

Sortie entièrement statique, n’importe quel hébergeur Node convient, Vercel sans
configuration.

`site.url` vaut `https://razigue.com` dans `content/site.ts`, et alimente
`metadataBase`, les URL canoniques, le `sitemap.xml`, `robots.txt` et le
JSON-LD. Le code n’attend rien : il reste à faire pointer le domaine vers
l’hébergeur. Voir [`TODO.md`](TODO.md) §1.
