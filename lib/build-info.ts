/**
 * Printed in the footer. Every value here is real: the date is stamped when the
 * page is prerendered.
 */
export const buildInfo = {
  date: new Date().toISOString().slice(0, 10),
  place: "Paris",
} as const;
