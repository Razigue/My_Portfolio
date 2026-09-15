"use client";

import { ErrorPage } from "@/components/pages/ErrorPage";
import { copy } from "@/content/en/site";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage {...props} copy={copy} home="/en" />;
}
