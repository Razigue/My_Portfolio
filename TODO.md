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

**`content/site.ts` → `site.linkedin`**, désormais
`https://www.linkedin.com/in/benhmida-razigue`.

Reprise du CV actuel. Elle n’a pas pu être vérifiée depuis le projet : LinkedIn
refuse les requêtes automatiques. À ouvrir une fois dans un navigateur. Si elle
ne mène pas au bon profil, la remettre à `null` : le lien disparaît du pied de
page, de `/contact` et du `sameAs` du JSON-LD.

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
public. Ils sont aujourd’hui en réserve, donc non publiés : la question ne se
pose qu’au jour où tu les remets dans `featuredSlugs`. Piste : `github.com/Razigue/Persona` est public mais n’a pas de README,
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

Le formulaire est branché sur `razigue.benhmida@epitech.eu` par FormSubmit,
sans clé ni compte. **Reste une seule action : cliquer sur « Activate Form »
dans l’email que FormSubmit a envoyé à cette adresse** (objet du type
« Action Required: Activate FormSubmit »). Pense à regarder les courriers
indésirables. Tant que ce n’est pas fait, le formulaire répond honnêtement
qu’il n’est pas configuré et renvoie vers l’adresse email. Il ne simule
**jamais** un envoi réussi.

Si l’activation ne passe pas, ou pour envoyer depuis ton propre domaine, Resend
reste possible et prend le dessus dès qu’une clé est présente. Copier
`.env.example` vers `.env.local` :

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
