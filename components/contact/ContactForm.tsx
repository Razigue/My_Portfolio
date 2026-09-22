"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { BtnLabel } from "@/components/ui/primitives";
import { sendMessage } from "@/lib/contact/actions";
import { initialContactState, type ContactState } from "@/lib/contact/state";
import type { FormCopy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

function Submit({ idle, busy }: { idle: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-solid"
      disabled={pending}
      data-choreo="rise"
      data-choreo-order="0"
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
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  rows?: number;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required: true,
    autoComplete,
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
        className="font-mono text-micro tracking-meta text-paper-3"
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

export function ContactForm({
  locale,
  form,
}: {
  locale: Locale;
  form: FormCopy;
}) {
  const [state, action] = useActionState<ContactState, FormData>(
    sendMessage,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<HTMLInputElement>(null);
  const base = useId();

  // Stamped on the client so the timing check measures the visitor, not the build.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      if (startedAt.current) startedAt.current.value = String(Date.now());
    }
  }, [state.status, state.key]);

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-7">
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
        id={`${base}-name`}
        name="name"
        label={form.name}
        autoComplete="name"
        error={state.fieldErrors.name}
      />
      <Field
        id={`${base}-email`}
        name="email"
        label={form.email}
        type="email"
        autoComplete="email"
        error={state.fieldErrors.email}
      />
      <Field
        id={`${base}-message`}
        name="message"
        label={form.message}
        rows={6}
        error={state.fieldErrors.message}
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
