"use client";

import {
  Component,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useFormStatus } from "react-dom";
import { BtnLabel } from "@/components/ui/primitives";
import { sendMessage } from "@/lib/contact/actions";
import {
  initialContactState,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact/state";
import type { FormCopy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const FIELDS: readonly ContactField[] = ["name", "email", "message"];

/** What the visitor has typed, read off the form as it is submitted. */
function readDraft(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  const draft: ContactValues = {};
  for (const field of FIELDS) {
    const value = data.get(field);
    if (typeof value === "string") draft[field] = value;
  }
  return draft;
}

function Submit({ idle, busy }: { idle: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-solid"
      disabled={pending}
    >
      <BtnLabel>{pending ? busy : idle}</BtnLabel>
    </button>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  autoComplete,
  rows,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  rows?: number;
  defaultValue?: string;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required: true,
    autoComplete,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    // No `outline-none` here: the global :focus-visible ring is the actual
    // focus indicator. The invalid fill is styled off `aria-invalid` in
    // globals.css, and the message under the field is what states the problem.
    className: "field mt-3",
  };

  return (
    <p>
      <label
        htmlFor={id}
        className="font-mono text-meta tracking-meta text-paper-3"
      >
        {label}
      </label>

      {rows ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} />
      )}

      {error ? (
        <span id={errorId} className="mt-2 block text-meta text-flare">
          {error}
        </span>
      ) : null}
    </p>
  );
}

function Form({
  locale,
  form,
  draft,
  onDraft,
  resumed,
}: {
  locale: Locale;
  form: FormCopy;
  /** What was typed before the form was last rebuilt, if anything. */
  draft: ContactValues;
  onDraft: (draft: ContactValues) => void;
  /** Rebuilt after an interrupted send, from the retry button. */
  resumed: boolean;
}) {
  const [state, action] = useActionState<ContactState, FormData>(
    sendMessage,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<HTMLInputElement>(null);
  const base = useId();

  // Stamped on the client so the timing check measures the visitor, not the
  // build. React empties the form after each answer, this field included; the
  // server skips the check when it finds no stamp.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  // Back from an interrupted send, the message is already typed: focus goes
  // to the button that sends it, where the retry button stood.
  useEffect(() => {
    if (resumed) {
      formRef.current
        ?.querySelector<HTMLElement>('button[type="submit"]')
        ?.focus();
    }
  }, [resumed]);

  // After each answer. A success forgets the kept draft. A refusal puts the
  // cursor in the first field to correct. Anything else hands focus back to
  // the button, which lost it when the pending state disabled it.
  useEffect(() => {
    if (state.key === 0) return;
    if (state.status === "success") onDraft({});
    const wrong = FIELDS.find((field) => state.fieldErrors[field]);
    const target = wrong
      ? document.getElementById(`${base}-${wrong}`)
      : formRef.current?.querySelector<HTMLElement>('button[type="submit"]');
    target?.focus();
  }, [state, base, onDraft]);

  // Before the first answer the fields start from the draft, which is only
  // ever filled when the form was rebuilt after an interrupted send; after
  // it, from what the server sent back. The key rebuilds the fields at every
  // answer, so that the value they start from is the one shown.
  const initial = (field: ContactField) =>
    (state.key > 0 ? state.values[field] : draft[field]) ?? "";

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={(event) => onDraft(readDraft(event.currentTarget))}
      noValidate
      className="grid gap-title"
    >
      {/* Honeypot, off-screen rather than hidden, so bots that check for
          display:none still fill it in. Never announced, never focusable. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${base}-website`}>{form.honeypot}</label>
        <input
          id={`${base}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="0" />
      {/* So the server answers in the language the visitor wrote in. */}
      <input type="hidden" name="locale" value={locale} />

      <Field
        key={`name-${state.key}`}
        id={`${base}-name`}
        name="name"
        label={form.name}
        autoComplete="name"
        error={state.fieldErrors.name}
        defaultValue={initial("name")}
      />
      <Field
        key={`email-${state.key}`}
        id={`${base}-email`}
        name="email"
        label={form.email}
        type="email"
        autoComplete="email"
        error={state.fieldErrors.email}
        defaultValue={initial("email")}
      />
      <Field
        key={`message-${state.key}`}
        id={`${base}-message`}
        name="message"
        label={form.message}
        rows={6}
        error={state.fieldErrors.message}
        defaultValue={initial("message")}
      />

      <div className="flex flex-wrap items-center gap-6">
        <Submit idle={form.submit} busy={form.pending} />
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`text-meta ${
          state.status === "success" ? "text-live" : "text-flare"
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}

/**
 * Catches a send that fails outright. A refusal from the server comes back as
 * an answer and is shown under the button; a connection cut mid-send throws
 * instead, and without this it would take the whole page down to the error
 * screen, the visitor's message with it.
 */
class SendBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: unknown) {
    console.error("[contact] the message could not be sent:", error);
  }

  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Interrupted({
  message,
  retry,
  onRetry,
}: {
  message: string;
  retry: string;
  onRetry: () => void;
}) {
  const button = useRef<HTMLButtonElement>(null);

  // Focus was on the submit button, which went with the form.
  useEffect(() => {
    button.current?.focus();
  }, []);

  return (
    <div className="grid content-start justify-items-start gap-title">
      <p role="alert" className="max-w-measure text-body text-paper">
        {message}
      </p>
      <button
        ref={button}
        type="button"
        onClick={onRetry}
        className="btn btn-solid"
      >
        <BtnLabel>{retry}</BtnLabel>
      </button>
    </div>
  );
}

/**
 * The contact form. What the visitor types survives every outcome short of a
 * success: a refused field, a server error, a connection cut mid-send.
 */
export function ContactForm({
  locale,
  form,
  retry,
}: {
  locale: Locale;
  form: FormCopy;
  /** The label of the button that brings the form back after a failed send. */
  retry: string;
}) {
  const [draft, setDraft] = useState<ContactValues>({});
  const [attempt, setAttempt] = useState(0);

  return (
    <SendBoundary
      key={attempt}
      fallback={
        <Interrupted
          message={form.interrupted}
          retry={retry}
          onRetry={() => setAttempt((count) => count + 1)}
        />
      }
    >
      <Form
        locale={locale}
        form={form}
        draft={draft}
        onDraft={setDraft}
        resumed={attempt > 0}
      />
    </SendBoundary>
  );
}
