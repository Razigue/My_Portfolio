/** Nombres écrits en toutes lettres, pour le corps de texte. */

const UNITS = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
  "dix-sept",
  "dix-huit",
  "dix-neuf",
] as const;

const TENS: Record<number, string> = {
  2: "vingt",
  3: "trente",
  4: "quarante",
  5: "cinquante",
  6: "soixante",
};

/**
 * `13` → « treize ». Au-delà de soixante-neuf, le chiffre est rendu tel quel :
 * soixante-dix, quatre-vingts et quatre-vingt-dix sont irréguliers, et aucun
 * texte du site ne compte jusque-là.
 */
export function cardinal(n: number): string {
  if (!Number.isInteger(n) || n < 0) return String(n);

  const single = UNITS[n];
  if (single) return single;

  const tens = TENS[Math.floor(n / 10)];
  const unit = UNITS[n % 10];
  if (!tens || !unit) return String(n);

  if (n % 10 === 0) return tens;
  if (n % 10 === 1) return `${tens} et un`;
  return `${tens}-${unit}`;
}

/** Première lettre en capitale, pour un nombre qui ouvre une phrase. */
export function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
