import type { ContactState } from "@/lib/contact/state";
import type { FormCopy } from "@/lib/content";

/**
 * Posts a message the server has already checked to FormSubmit's JSON
 * endpoint, from the visitor's browser: FormSubmit turns away the same request
 * when it comes from a host's servers.
 *
 * It answers `success: "true"` once the message is on its way, and
 * `success: "false"` with an explanation otherwise, the first time included:
 * until the mailbox has activated the form, nothing is forwarded. That case is
 * answered with the address to write to, because a message that went nowhere
 * must never read as sent. What was typed stays in the form on every answer
 * but a success.
 */
export async function relay(
  checked: ContactState,
  { to, subject }: NonNullable<ContactState["relay"]>,
  form: FormCopy,
): Promise<ContactState> {
  const { name = "", email = "", message = "" } = checked.values;
  const answer = (
    status: ContactState["status"],
    text: string,
  ): ContactState => ({
    status,
    message: text,
    fieldErrors: {},
    values: status === "success" ? {} : checked.values,
    key: checked.key,
  });

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
      return answer("success", form.success);
    }

    console.error(
      "[contact] FormSubmit refused the message:",
      data?.message ?? response.status,
    );
    return /activat/i.test(data?.message ?? "")
      ? answer("unconfigured", form.unconfigured)
      : answer("error", form.error);
  } catch (cause) {
    console.error("[contact] FormSubmit unreachable:", cause);
    return answer("error", form.error);
  }
}
