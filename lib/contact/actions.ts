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
  // Sent back with every answer but a success, so nothing typed is lost.
  const values = { name, email, message };

  // Honeypot: a real person never fills a field they cannot see. Answer as if
  // it worked, so a bot has nothing to learn from the response.
  if (field(formData, "website").length > 0) {
    return { status: "success", message: form.success, fieldErrors: {}, values: {}, key };
  }

  // Submissions faster than a second and a half are not typed by a human.
  // The page's script stamps the time it opened. Without a stamp the check
  // does not apply: scripting may be off, or React may have emptied the form
  // after an earlier answer, and in both cases the visitor is a person whose
  // message has to go through, not a bot to answer with a false success.
  const startedAt = Number(field(formData, "startedAt"));
  if (startedAt > 0 && Date.now() - startedAt < 1500) {
    return { status: "success", message: form.success, fieldErrors: {}, values: {}, key };
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
      values,
      key,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  // The subject is read by Razigue, so it stays French, and says which
  // version of the site the message came from.
  const subject = `Message de ${name} depuis le portfolio${english ? " (version anglaise)" : ""}`;

  // Without a Resend key, the message goes through FormSubmit, which needs no
  // account: it forwards to the address in its URL, once that address has
  // clicked the activation link FormSubmit mails it on the first submission.
  if (!apiKey) {
    return sendWithFormSubmit({ to, name, email, message, subject, form, key });
  }

  const failed: ContactState = {
    status: "error",
    message: form.error,
    fieldErrors: {},
    values,
    key,
  };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject,
      text: `${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return failed;
    }

    return { status: "success", message: form.success, fieldErrors: {}, values: {}, key };
  } catch (cause) {
    console.error("[contact] send failed:", cause);
    return failed;
  }
}

/**
 * FormSubmit's JSON endpoint. It answers `success: "true"` once the message is
 * on its way, and `success: "false"` with an explanation otherwise, the first
 * time included: until the mailbox has activated the form, nothing is
 * forwarded. That case is answered like a missing key, with the address to
 * write to, because a message that went nowhere must never read as sent.
 */
async function sendWithFormSubmit({
  to,
  name,
  email,
  message,
  subject,
  form,
  key,
}: {
  to: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  form: typeof frenchForm | typeof englishForm;
  key: number;
}): Promise<ContactState> {
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // FormSubmit refuses a submission that names no page it came from.
          Origin: site.url,
          Referer: `${site.url}/contact`,
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: subject,
          _replyto: email,
          _template: "box",
          _captcha: "false",
        }),
        cache: "no-store",
      },
    );
    const data = (await response.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    if (response.ok && (data?.success === true || data?.success === "true")) {
      return { status: "success", message: form.success, fieldErrors: {}, values: {}, key };
    }

    console.error(
      "[contact] FormSubmit refused the message:",
      data?.message ?? response.status,
    );
    const pending = /activat/i.test(data?.message ?? "");
    return {
      status: pending ? "unconfigured" : "error",
      message: pending ? form.unconfigured : form.error,
      fieldErrors: {},
      values: { name, email, message },
      key,
    };
  } catch (cause) {
    console.error("[contact] FormSubmit unreachable:", cause);
    return {
      status: "error",
      message: form.error,
      fieldErrors: {},
      values: { name, email, message },
      key,
    };
  }
}
