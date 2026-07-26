import pkg from "@/package.json";

/**
 * Printed in the footer. Every value here is real: the Next version comes from
 * the pinned dependency, the date is stamped when the page is prerendered.
 */
export const buildInfo = {
  next: pkg.dependencies.next,
  date: new Date().toISOString().slice(0, 10),
  place: "Paris",
} as const;
