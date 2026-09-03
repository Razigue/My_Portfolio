# À compléter

Neuf points qui n’ont pas pu être déduits du CV, de GitHub ni de l’ancien
portfolio. Aucun n’empêche le site de tourner : ils attendent une information,
une décision, ou ne sont là que pour documenter un choix déjà fait.

Chaque entrée indique le fichier, le champ, le format attendu, et ce qui se
passe tant que rien n’est fait.

---

## 1. Le domaine reste à brancher

**`content/site.ts` → `site.url`**, désormais `https://razigue.com`.

Le nom est retenu, le code est à jour, il n’y a rien à modifier ici. Ce qui
reste est en dehors du projet : réserver le domaine s’il ne l’est pas, et le
faire pointer vers l’hébergeur.

Ce que cette valeur alimente, et qui ne répondra qu’une fois le DNS en place :

- `metadataBase` et les URL canoniques de chaque page
- `sitemap.xml` et `robots.txt`
- les images Open Graph et Twitter, référencées en absolu
- le JSON-LD `Person`

Rien ne casse en local ni à la compilation entre-temps. Si le domaine finit par
être différent, une seule ligne est à changer et tout le reste suit.

---

## 2. URL LinkedIn

**`content/site.ts` → `site.linkedin`**, actuellement `null`.

Absente du CV, du profil GitHub et de l’ancien portfolio. Tant qu’elle vaut
`null`, aucun lien LinkedIn n’est rendu : ni dans le pied de page, ni sur
`/contact`, ni dans le `sameAs` du JSON-LD. Rien à supprimer, juste à remplir.

```ts
linkedin: "https://www.linkedin.com/in/…",
```

---

## 3. Dépôt de ce portfolio

**`content/site.ts` → `site.sourceRepo`**, actuellement `null`.

Le lien « Code source ↗ » du pied de page n’apparaît que si cette valeur est
renseignée. À remplir une fois le dépôt poussé sur GitHub, ou à laisser à `null`
si le code reste privé.

---

## 4. Trois projets sans dépôt public

**`content/projects.ts`**, `repo: null` sur :

- Overkill, agrégateur d’offres → `overkill`
- Sécurité LLM, prompt injection → `securite-llm`
- Automatisation IA → `automatisation-ia`

Overkill est un cas différent des deux autres : son dépôt existe, mais il est
dans l’organisation `EpitechWebAcademiePromo2027`, qui renvoie une 404 à tout
visiteur. Un miroir public sur ton compte personnel — comme ceux déjà en place
pour six autres projets — rendrait le lien affichable. À toi de décider si le
travail d’équipe peut être republié ainsi.

Les deux autres viennent du CV et n’ont pas pu être rattachés à un dépôt
public. Piste : `github.com/Razigue/Persona` est public mais n’a pas de README,
c’est peut-être l’un des deux. En revanche `github.com/Razigue/Klivio` est
**confirmé comme n’étant pas** l’un d’eux : son README montre qu’il s’agit du
projet statique Figma et Tailwind.

Tant que `repo` vaut `null`, la ligne s’affiche simplement avec un lien de
moins. Aucun lien mort n’est possible.

---

## 5. Stack de Connect’In : trois sources, trois réponses

**`content/projects.ts` → slug `connect-in`**

- **CV** → Spring Boot, React, MySQL
- **Ancien portfolio** → HTML, CSS, PHP
- **GitHub**, langage dominant du dépôt → **Blade**, donc Laravel

Valeur publiée : **PHP, Laravel, MySQL**, la lecture GitHub étant la seule
vérifiable. À confirmer.

Cela a un effet mesurable : la matrice de compétences est *calculée* à partir de
ces stacks, donc corriger cette ligne change les compteurs affichés sur
`/#competences`.

---

## 6. Stack de JeuVideOPS

**`content/projects.ts` → slug `jeuvideops`**

- **CV** → GitHub Actions, Jest, Playwright
- **Ancien portfolio** → Bootstrap, Cypress, Docker

Valeur publiée : celle du **CV**, plus récente. À confirmer.

---

## 7. Activer le formulaire de contact

Sans clé, le formulaire fonctionne mais répond honnêtement qu’il n’est pas
configuré et renvoie vers l’adresse email. Il ne simule **jamais** un envoi
réussi. Pour l’activer, copier `.env.example` vers `.env.local` :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=razigue.benhmida@epitech.eu
CONTACT_FROM_EMAIL=Portfolio <contact@razigue.com>
```

`CONTACT_FROM_EMAIL` doit utiliser un domaine vérifié chez Resend. À défaut,
`onboarding@resend.dev` fonctionne pour les tests.

`.env.local` n’est jamais versionné, il est déjà dans `.gitignore`. Chez un
hébergeur, ces trois valeurs se saisissent dans son interface et non dans un
fichier.

---

## 8. Polices : aucun repli utilisé

Instrument Serif, Geist et Geist Mono se sont toutes chargées via
`next/font/google`, sous-ensembles `latin` et `latin-ext` (donc `É À Ê Î Ç œ`
sont couverts). Aucune substitution à signaler. Cette entrée existe seulement
pour documenter la vérification.

---

## 9. Téléphone : exclu volontairement

Le numéro figure sur le PDF du CV mais n’apparaît **nulle part dans le balisage**
(`content/site.ts` → `phone: null`). C’est une décision, pas un oubli : cela
évite le moissonnage automatique. Ne pas « corriger ».
