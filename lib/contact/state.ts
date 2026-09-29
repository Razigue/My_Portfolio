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
  | "unconfigured"
  | "relay";

export type ContactField = "name" | "email" | "message";

export type ContactValues = Partial<Record<ContactField, string>>;

export type ContactState = {
  status: ContactStatus;
  message: string | null;
  fieldErrors: Partial<Record<ContactField, string>>;
  /**
   * What the visitor typed, sent back with every answer except a success.
   * React empties a form once its action returns, so without this a single
   * refused field would cost the visitor the whole message.
   */
  values: ContactValues;
  /** Bumped on every submission so an identical result is re-announced. */
  key: number;
  /**
   * With `relay`: where the browser posts the checked message, and under what
   * subject. FormSubmit turns away requests from a host's servers, so without
   * a Resend key the message leaves from the visitor's browser.
   */
  relay?: { to: string; subject: string };
};

export const initialContactState: ContactState = {
  status: "idle",
  message: null,
  fieldErrors: {},
  values: {},
  key: 0,
};
