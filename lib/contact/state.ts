/**
 * Kept out of `actions.ts` on purpose: a `"use server"` module may only export
 * async functions, so a plain constant exported from there arrives on the
 * client as `undefined`.
 */

export type ContactStatus =
  | "idle"
  | "success"
  | "error"
  | "invalid"
  | "unconfigured";

export type ContactState = {
  status: ContactStatus;
  message: string | null;
  fieldErrors: Partial<Record<"name" | "email" | "message", string>>;
  /** Bumped on every submission so an identical result is re-announced. */
  key: number;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: null,
  fieldErrors: {},
  key: 0,
};
