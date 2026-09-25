"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BtnLabel } from "@/components/ui/primitives";
import type { Copy } from "@/lib/content";

export type ErrorCopy = Pick<
  Copy,
  "errorEyebrow" | "errorTitle" | "errorBody" | "errorRetry" | "errorRef" | "notFoundLink"
>;

/** What each language's `error.tsx` renders, with that language's words. */
export function ErrorPage({
  error,
  reset,
  copy,
  home,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  copy: ErrorCopy;
  home: string;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-center px-6 page-head lg:px-10">
      <p className="eyebrow">{copy.errorEyebrow}</p>

      <h1 className="mt-block font-display text-h2 leading-display tracking-display text-paper">
        {copy.errorTitle}
      </h1>

      <p className="mt-title max-w-measure text-lede text-paper-2">
        {copy.errorBody}
      </p>

      <div className="mt-block flex flex-wrap gap-5">
        <button type="button" onClick={reset} className="btn btn-solid">
          <BtnLabel>{copy.errorRetry}</BtnLabel>
        </button>
        <Link href={home} className="btn">
          <BtnLabel>{copy.notFoundLink}</BtnLabel>
        </Link>
      </div>

      {error.digest ? (
        <p className="mt-block font-mono text-micro tracking-meta text-paper-3">
          {copy.errorRef} {error.digest}
        </p>
      ) : null}
    </div>
  );
}
