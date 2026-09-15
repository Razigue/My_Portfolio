/** Numbers written out in words, for running text. The English twin of `lib/french.ts`. */

const UNITS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
] as const;

const TENS: Record<number, string> = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
};

/** `13` → “thirteen”. Past sixty-nine the figure is returned as is, like its French twin. */
export function cardinal(n: number): string {
  if (!Number.isInteger(n) || n < 0) return String(n);

  const single = UNITS[n];
  if (single) return single;

  const tens = TENS[Math.floor(n / 10)];
  const unit = UNITS[n % 10];
  if (!tens || !unit) return String(n);

  return n % 10 === 0 ? tens : `${tens}-${unit}`;
}
