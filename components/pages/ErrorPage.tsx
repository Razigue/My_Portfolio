"use client";

import Link from "next/link";
import { useEffect } from "react";
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
    <div className="page-width flex min-h-dvh flex-col justify-center page-head">

      <h1 className="page-title">
        {copy.errorTitle}
      </h1>

      <p className="mt-title max-w-measure text-lede text-paper-2">
        {copy.errorBody}
      </p>

      <div className="mt-block flex flex-wrap gap-4">
        <button type="button" onClick={reset} className="btn btn-solid">
          {copy.errorRetry}
        </button>
        <Link href={home} className="btn">
          {copy.notFoundLink}
        </Link>
      </div>

      {error.digest ? (
        <p className="mt-block type-label text-paper-3">
          {copy.errorRef} {error.digest}
        </p>
      ) : null}
    </div>
  );
}
