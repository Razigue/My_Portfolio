"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BtnLabel } from "@/components/ui/primitives";
import { copy } from "@/content/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-page flex-col justify-center px-6 py-32 lg:px-10">
      <p className="eyebrow">Erreur</p>

      <h1 className="mt-6 font-display text-h1 leading-display tracking-display text-paper">
        {copy.errorTitle}
      </h1>

      <p className="mt-7 max-w-measure text-lede text-paper-2">
        {copy.errorBody}
      </p>

      <div className="mt-12 flex flex-wrap gap-5">
        <button type="button" onClick={reset} className="btn btn-solid">
          <BtnLabel>{copy.errorRetry}</BtnLabel>
        </button>
        <Link href="/" className="btn">
          <BtnLabel>{copy.notFoundLink}</BtnLabel>
        </Link>
      </div>

      {error.digest ? (
        <p className="mt-10 font-mono text-micro tracking-meta text-paper-3">
          Réf. {error.digest}
        </p>
      ) : null}
    </div>
  );
}
