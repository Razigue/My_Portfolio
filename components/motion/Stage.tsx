"use client";

/**
 * One Stage per section, owning the choreography of every `[data-choreo]`
 * element beneath it: one paused timeline and one ScrollTrigger each.
 *
 * Per element, not per section. A section timeline fires when the section
 * arrives, so in a section taller than the viewport everything below the fold
 * had already finished animating before it was scrolled to. `ScrollTrigger.batch`
 * keeps the grouped feel: what arrives together plays together, with a stagger.
 *
 * Triggers are `once` and delete themselves, so a page read to the bottom
 * carries no scroll work from any Stage.
 *
 * Only stacks of technologies are animated; every other tagged element is
 * left as it is, visible from the start.
 *
 * Content stays in Server Components: a stack says `data-choreo="rise"` and
 * never becomes client code. Nothing is hidden in CSS, so with scripting off
 * the page is complete.
 */

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState, type ElementType } from "react";
import {
  CHOREO,
  gsap,
  isChoreoVariant,
  registerGsap,
  ScrollTrigger,
  SplitText,
} from "@/lib/gsap";

type StageProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Play on load rather than on scroll. */
  immediate?: boolean;
  /** Seconds before the first element moves. */
  delay?: number;
  /** Seconds between consecutive elements of the same batch. */
  stagger?: number;
  start?: string;
} & Record<`aria-${string}`, string | undefined> &
  Record<`data-${string}`, string | undefined>;

export function Stage({
  children,
  as: Tag = "section",
  className,
  id,
  immediate = false,
  delay = 0,
  stagger = 0.09,
  start = "top 88%",
  ...rest
}: StageProps) {
  const root = useRef<HTMLElement>(null);
  const [rebuildKey, setRebuildKey] = useState(0);

  // Splitting text depends on the measured line box, so a width change has to
  // rebuild. Height changes are ignored: mobile browsers fire those on scroll.
  useEffect(() => {
    let width = window.innerWidth;
    let timer = 0;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setRebuildKey((k) => k + 1), 220);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      registerGsap();

      let disposed = false;
      const splits: SplitText[] = [];
      const restated: HTMLElement[] = [];
      const timelines = new Map<Element, gsap.core.Timeline>();
      const queued = new Map<Element, gsap.core.Tween>();
      const rank = new Map<Element, number>();
      let triggers: ScrollTrigger[] = [];
      let onFocusIn: (() => void) | null = null;

      /**
       * Split text is a pile of single characters to a screen reader.
       * SplitText's own answer is an `aria-label` on the element it split, but
       * `aria-label` is prohibited on a paragraph and on a generic element, so
       * that fix is an ARIA violation everywhere except a heading. Headings
       * therefore keep SplitText's handling; everything else is hidden and the
       * sentence restated beside it.
       */
      const isHeading = (node: HTMLElement) => /^H[1-6]$/.test(node.tagName);
      const getStack = (node: HTMLElement) =>
        node.matches("[data-stack]")
          ? node
          : node.querySelector<HTMLElement>("[data-stack]");

      const restate = (target: HTMLElement, text: string) => {
        target.setAttribute("aria-hidden", "true");
        const copy = document.createElement("span");
        copy.className = "split-alt";
        // Trailing space: two of these can sit inside one heading, and without
        // it the accessible name comes out as "RazigueBenhmida".
        copy.textContent = `${text} `;
        target.after(copy);
        restated.push(copy);
      };

      /** One paused timeline for one element. */
      const compose = (target: HTMLElement): gsap.core.Timeline | null => {
        const name = target.dataset.choreo;
        if (!isChoreoVariant(name)) return null;

        const step = CHOREO[name];
        const tl = gsap.timeline({ paused: true });
        const from = { ...step.from, immediateRender: true };
        const to = { ...step.to, duration: step.duration ?? 0.9 };

        if (step.split) {
          const heading = isHeading(target);
          const sentence = target.textContent ?? "";

          const split = SplitText.create(target, {
            // Characters are split into words first. Without the word layer
            // every character is its own inline-block and a line can break in
            // the middle of a word.
            type: step.split === "chars" ? "words,chars" : step.split,
            mask: step.split,
            // Named so the mask wrappers SplitText generates are addressable:
            // it appends `-mask` to these. They need padding, because a mask is
            // sized to the line box and display type here is set below a
            // line-height of 1, so the glyphs are taller than the box.
            charsClass: "choreo-char",
            wordsClass: "choreo-word",
            linesClass: "choreo-line",
            autoSplit: false,
            aria: heading ? "auto" : "none",
          });
          splits.push(split);
          if (!heading) restate(target, sentence);
          const pieces =
            step.split === "chars"
              ? split.chars
              : step.split === "words"
                ? split.words
                : split.lines;
          tl.fromTo(
            pieces,
            from,
            { ...to, stagger: step.innerStagger ?? 0.04 },
            0,
          );
          return tl;
        }

        // Animate the list itself, leaving its surrounding labels visible.
        tl.fromTo(getStack(target) ?? target, from, to, 0);

        // Numerals count to whatever the server already printed, so the figure
        // is real with scripting off and correct again after a reverse.
        if (name === "counter") {
          const end = Number(target.textContent?.replace(/\D+/g, "") ?? "0");
          if (Number.isFinite(end) && end > 0) {
            const proxy = { value: 0 };
            tl.fromTo(
              proxy,
              { value: 0 },
              {
                value: end,
                duration: (step.duration ?? 0.75) + 0.35,
                snap: { value: 1 },
                onUpdate: () => {
                  target.textContent = String(Math.round(proxy.value));
                },
              },
              0,
            );
          }
        }

        return tl;
      };

      /** Play a group of elements with a stagger between them. */
      const run = (group: Element[]) => {
        const ordered = [...group].sort(
          (a, b) => (rank.get(a) ?? 0) - (rank.get(b) ?? 0),
        );

        ordered.forEach((node, index) => {
          const timeline = timelines.get(node);
          if (!timeline) return;

          queued.get(node)?.kill();
          queued.delete(node);

          const own =
            Number((node as HTMLElement).dataset.choreoDelay ?? "0") || 0;
          const wait = delay + index * stagger + own;

          if (wait <= 0) {
            timeline.play();
            return;
          }
          queued.set(node, gsap.delayedCall(wait, () => timeline.play()));
        });
      };

      const build = async () => {
        // Split text against final metrics, not fallback metrics.
        await document.fonts.ready;
        if (disposed || !root.current) return;

        const targets = gsap.utils
          .toArray<HTMLElement>("[data-choreo]", el)
          // Ignore anything a nested Stage owns. `data-stage` is in the server
          // markup, so this question is answerable on the very first pass.
          .filter((node) => node.closest("[data-stage]") === el)
          // Keep the existing markers, but only animate technology lists.
          .filter((node) => getStack(node) !== null);

        if (!targets.length) return;

        targets.sort((a, b) => {
          const oa = Number(a.dataset.choreoOrder ?? Number.NaN);
          const ob = Number(b.dataset.choreoOrder ?? Number.NaN);
          if (Number.isNaN(oa) && Number.isNaN(ob)) return 0;
          if (Number.isNaN(oa)) return 1;
          if (Number.isNaN(ob)) return -1;
          return oa - ob;
        });
        targets.forEach((node, index) => rank.set(node, index));

        el.dataset.stage = "live";

        for (const target of targets) {
          const timeline = compose(target);
          if (timeline) timelines.set(target, timeline);
        }

        // A keyboard user must never land on a transparent element, so focus
        // skips the stagger entirely and brings the whole section in at once.
        onFocusIn = () => {
          queued.forEach((call) => {
            call.kill();
          });
          queued.clear();
          timelines.forEach((timeline) => {
            timeline.play();
          });
        };
        el.addEventListener("focusin", onFocusIn);

        if (immediate) {
          run(targets);
          return;
        }

        // Anything already at or above the trigger line has no enter event
        // coming, whether it is on screen or the browser restored the scroll
        // position below it. Those play at once; only the ones still to come
        // get a trigger.
        const line = window.innerHeight * 0.94;
        const arrived: HTMLElement[] = [];
        const pending: HTMLElement[] = [];
        for (const node of targets) {
          (node.getBoundingClientRect().top < line ? arrived : pending).push(
            node,
          );
        }

        if (pending.length) {
          triggers = ScrollTrigger.batch(pending, {
            interval: 0.12,
            batchMax: 10,
            start,
            once: true,
            onEnter: (batch) => run(batch),
          });
        }

        if (arrived.length) {
          run(arrived);
        }
      };

      void build();

      return () => {
        disposed = true;
        if (onFocusIn && root.current) {
          root.current.removeEventListener("focusin", onFocusIn);
        }
        queued.forEach((call) => {
          call.kill();
        });
        triggers.forEach((trigger) => trigger.kill());
        timelines.forEach((timeline) => {
          timeline.kill();
        });
        splits.forEach((split) => {
          const target = split.elements[0] as HTMLElement | undefined;
          split.revert();
          target?.removeAttribute("aria-hidden");
        });
        restated.forEach((copy) => copy.remove());
        if (root.current) root.current.dataset.stage = "idle";
      };
    },
    { scope: root, dependencies: [rebuildKey], revertOnUpdate: true },
  );

  return (
    <Tag
      ref={root}
      // Present in the server markup so the nested-Stage filter above has
      // something to match on its first pass. Stage flips it to "live".
      data-stage="idle"
      className={className}
      id={id}
      {...rest}
    >
      {children}
    </Tag>
  );
}
