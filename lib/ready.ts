"use client";

/**
 * Resolves when the opening curtain has lifted and above-the-fold choreography
 * is allowed to start. Stages marked `immediate` await it so the hero does not
 * play its intro behind the loader.
 *
 * It resolves on its own after 3 s no matter what, so a font that never loads
 * or a controller that never mounts can never strand the page behind a curtain.
 */

let resolve: (() => void) | null = null;

export const stageReady: Promise<void> =
  typeof window === "undefined"
    ? Promise.resolve()
    : new Promise<void>((r) => {
        resolve = r;
        window.setTimeout(() => signalReady(), 3000);
      });

export function signalReady(): void {
  if (resolve) {
    const r = resolve;
    resolve = null;
    r();
  }
}
