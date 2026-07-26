"use client";

import { useEffect, useRef, useState } from "react";

export function CopyButton({
  value,
  idle,
  done,
}: {
  value: string;
  idle: string;
  done: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard denied. The address is right there as selectable text.
    }
  }

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="bg-ink-3 px-3 py-1.5 font-mono text-micro tracking-meta text-paper-2 transition-colors duration-200 hover:bg-flare hover:text-ink"
    >
      <span aria-hidden="true">{copied ? done : idle}</span>
      <span className="sr-only">
        {copied ? "Adresse copiée" : "Copier l’adresse email"}
      </span>
    </button>
  );
}
