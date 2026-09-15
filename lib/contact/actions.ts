"use server";

import { Resend } from "resend";
import { form as englishForm } from "@/content/en/site";
import { form as frenchForm, site } from "@/content/site";
import type { ContactState } from "@/lib/contact/state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * A form field as text.
 *
 * `FormData.get` returns a `File` for any part sent as one, and stringifying
 * that yields "[object File]" — which would pass a length check and be posted
 * as somebody's name. Anything that is not text is treated as absent.
 */
function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendMessage(
  previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const key = previous.key + 1;
  const english = field(formData, "locale") === "en";
  // The visitor is answered in the language of the page they wrote from.
  const form = english ? englishForm : frenchForm;
  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");

  // Honeypot: a real person never fills a field they cannot see. Answer as if
  // it worked, so a bot has nothing to learn from the response.
  if (field(formData, "website").length > 0) {
    return { status: "success", message: form.success, fieldErrors: {}, key };
  }

  // Submissions faster than a second and a half are not typed by a human.
  const startedAt = Number(field(formData, "startedAt"));
  if (!startedAt || Date.now() - startedAt < 1500) {
    return { status: "success", message: form.success, fieldErrors: {}, key };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = form.nameMissing;
  if (!EMAIL.test(email)) fieldErrors.email = form.emailInvalid;
  if (message.length < 10) {
    fieldErrors.message = form.messageShort;
  }
  if (message.length > 5000) {
    fieldErrors.message = form.messageLong;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "invalid",
      message: form.invalid,
      fieldErrors,
      key,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  // No key configured: say so honestly and point at the mailbox. Faking a
  // success toast here is the one failure that would actually cost him a reply.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY absent, message non envoyé :", {
        name,
        email,
        message,
      });
    }
    return {
      status: "unconfigured",
      message: form.unconfigured,
      fieldErrors: {},
      key,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      // The subject is read by Razigue, so it stays French, and says which
      // version of the site the message came from.
      subject: `Message de ${name} depuis le portfolio${english ? " (version anglaise)" : ""}`,
      text: `${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error", message: form.error, fieldErrors: {}, key };
    }

    return { status: "success", message: form.success, fieldErrors: {}, key };
  } catch (cause) {
    console.error("[contact] send failed:", cause);
    return { status: "error", message: form.error, fieldErrors: {}, key };
  }
}
