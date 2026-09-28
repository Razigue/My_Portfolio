import type { CSSProperties } from "react";
import type {
  DiagramBranch,
  DiagramNode,
  ProjectDiagram as Diagram,
} from "@/content/projects";
import { DiagramIcon } from "@/components/projects/DiagramIcon";

/*
 * Arrows are glyphs, the same ones the site's links already carry. Nothing is
 * drawn between the stations: no line, no connector. A branch always hangs
 * under its station, so its arrow points up or down on every screen. On a
 * phone it is indented to the station's text, so its arrow is never read as
 * one of the main path's.
 *
 * From a laptop up, the whole path is one row of equal columns, and each step
 * is a subgrid of two rows: the stations, and what hangs under them. Every
 * station is centred in its column, so an arrow set in the middle of the
 * gutter is exactly as far from the station it leaves as from the one it
 * reaches, and a branch sits on its station's axis. A step with alternatives
 * spans one column per alternative, with « ou » in the gutter where an arrow
 * would be. A column is never wider than 12rem and the row is centred, so
 * every diagram on the site keeps the same stride between its stations
 * whatever it counts.
 *
 * Below that, the path is read top to bottom. A row that wrapped halfway
 * would leave its last line lopsided, so it never wraps.
 *
 * A branch that works beside the path (`apart`) has no arrow and no word in
 * its place: it hangs under its station, smaller and on a quieter ground, and
 * that is what ties it to the station rather than to the path.
 *
 * The diagram sits on a ground of its own, with the rounded corners of a
 * capture: that ground, not a frame, is what sets it apart from the
 * paragraphs above it, the way a capture is set apart by its own pixels. It
 * carries no visible title. The heading and the paragraphs of its part
 * already introduce it, so `title` names the figure for a screen reader only.
 */
const BRANCH_ARROWS: Record<DiagramBranch["flow"], string | null> = {
  out: "↓",
  in: "↑",
  loop: "↓↑",
  apart: null,
};

/** What sits in the gutter left of a station, level with its tile. */
const GUTTER =
  "absolute top-0 -left-8 hidden h-16 w-8 items-center justify-center lg:flex";

export type DiagramLabels = {
  /** Between two alternatives. */
  readonly or: string;
};

function Station({
  node,
  side = false,
}: {
  node: DiagramNode;
  side?: boolean;
}) {
  return (
    <div className="flex w-full min-w-0 items-center gap-4 lg:flex-col lg:gap-5 lg:text-center">
      <span
        className={`flex shrink-0 items-center justify-center ${
          side
            ? "size-10 bg-ink text-paper-2 lg:size-12"
            : "size-14 bg-ink-3 text-flare lg:size-16"
        }`}
      >
        <DiagramIcon
          icon={node.icon}
          className={side ? "size-5 lg:size-6" : "size-7 lg:size-8"}
        />
      </span>
      <div className="w-full min-w-0 break-words hyphens-auto">
        <h4 className="font-display text-body leading-tight text-paper">
          {node.label}
        </h4>
        <p className="mt-1.5 text-meta text-paper-2">{node.hint}</p>
        {node.detail ? (
          <p className="mt-1 font-mono text-meta tracking-meta text-paper-3">
            {node.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Branch({ branch }: { branch: DiagramBranch }) {
  const arrow = BRANCH_ARROWS[branch.flow];
  return (
    <li className="grid gap-2 lg:justify-items-center">
      {arrow ? (
        <span
          aria-hidden="true"
          className="flex h-8 w-10 items-center justify-center whitespace-nowrap font-mono text-lede text-flare lg:w-16"
        >
          {arrow}
        </span>
      ) : null}
      <Station node={branch} side />
    </li>
  );
}

export function ProjectDiagram({
  diagram,
  labels,
}: {
  diagram: Diagram;
  labels: DiagramLabels;
}) {
  const total = diagram.steps.reduce((sum, step) => sum + step.nodes.length, 0);
  const columns = { "--diagram-columns": total } as CSSProperties;
  // Room under the stations only when something hangs there, so the ground
  // keeps the same margin above the path as below it.
  const branched = diagram.steps.some((step) => step.branches?.length);

  return (
    <figure className="min-w-0 rounded-shot bg-ink-2 px-5 py-10 sm:px-8 lg:col-span-2 lg:py-14">
      <figcaption className="sr-only">{diagram.title}</figcaption>
      <ol
        className="flex flex-col lg:grid lg:grid-cols-[repeat(var(--diagram-columns),minmax(0,12rem))] lg:justify-center lg:gap-x-8"
        style={columns}
      >
        {diagram.steps.map((step, index) => {
          const span = step.nodes.length;
          return (
            <li
              key={step.nodes.map((node) => node.label).join()}
              className="relative flex min-w-0 flex-col lg:row-span-2 lg:grid lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-0"
              style={{ gridColumn: `span ${span} / span ${span}` }}
            >
              {index > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-14 items-center justify-center font-mono text-lede text-flare lg:hidden"
                  >
                    ↓
                  </span>
                  <span
                    aria-hidden="true"
                    className={`${GUTTER} font-mono text-lede text-flare`}
                  >
                    →
                  </span>
                </>
              ) : null}
              <div
                className={`grid content-start gap-3 lg:col-span-full lg:grid-cols-subgrid lg:gap-y-0 ${
                  branched ? "lg:pb-6" : ""
                }`}
              >
                {step.nodes.map((node, i) => (
                  <div
                    key={node.label}
                    className="relative grid min-w-0 gap-3 lg:justify-items-center"
                  >
                    {i > 0 ? (
                      <>
                        <span className="w-14 text-center font-display text-body text-paper-3 lg:hidden">
                          {labels.or}
                        </span>
                        <span
                          className={`${GUTTER} font-display text-body text-paper-3`}
                        >
                          {labels.or}
                        </span>
                      </>
                    ) : null}
                    <Station node={node} />
                  </div>
                ))}
              </div>
              {step.branches ? (
                <ul className="mt-3 grid content-start gap-6 pl-18 lg:col-span-full lg:mt-0 lg:pl-0">
                  {step.branches.map((branch) => (
                    <Branch key={branch.label} branch={branch} />
                  ))}
                </ul>
              ) : (
                <div aria-hidden="true" className="hidden lg:col-span-full lg:block" />
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
