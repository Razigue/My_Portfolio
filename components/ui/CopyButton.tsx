"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function CopyButton({
  value,
  idle,
  done,
  action,
  confirm,
  className,
}: {
  value: string;
  idle: string;
  done: string;
  /** The accessible name before copying, and the one after. */
  action: string;
  confirm: string;
  className?: string;
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
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className={`btn btn-sm ${className ?? ""}`}
      >
        <Icon name={copied ? "check" : "copy"} />
        <span aria-hidden="true">{copied ? done : idle}</span>
        <span className="sr-only">{action}</span>
      </button>
      {/* A button renaming itself is not announced by every screen reader;
          a status message is. */}
      <span role="status" className="sr-only">
        {copied ? confirm : ""}
      </span>
    </>
  );
}
