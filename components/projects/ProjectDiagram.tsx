import type { CSSProperties } from "react";
import type {
  DiagramBranch,
  DiagramNode,
  ProjectDiagram as Diagram,
} from "@/content/projects";
import { copy } from "@/content/site";
import { DiagramIcon } from "@/components/projects/DiagramIcon";

/*
 * Arrows are glyphs, the same ones the site's links already carry. Nothing is
 * drawn between the stations: no line, no connector. A branch always hangs
 * under its station, so its arrow points up or down on every screen. On a
 * phone it is indented to the station's text, so its arrow is never read as
 * one of the main path's.
 *
 * From a tablet up, every station is a column of one grid, and each step is a
 * subgrid of two rows: the stations, and what hangs under them. Every tile,
 * name and branch therefore sits on the same line as its neighbours'. A step
 * with alternatives spans one column per alternative, with « ou » set in the
 * gutter where an arrow would be.
 */
const BRANCH_ARROWS: Record<DiagramBranch["flow"], string | null> = {
  out: "↓",
  in: "↑",
  loop: "↕",
  apart: null,
};

/**
 * Between a tablet and a wide screen, a short path keeps one row and a long
 * one wraps after this many columns.
 */
const MD_COLUMNS = 4;
const MD_ONE_ROW = 5;

/** What sits in the gutter left of a station: an arrow, or « ou ». */
const GUTTER =
  "absolute top-0 -left-8 hidden h-16 w-8 items-center justify-center text-body";

function Station({
  node,
  side = false,
}: {
  node: DiagramNode;
  side?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-4 md:flex-col md:items-start">
      <span
        className={`flex shrink-0 items-center justify-center md:size-16 ${
          side ? "size-10 bg-ink-2 text-paper-2" : "size-14 bg-ink-3 text-flare"
        }`}
      >
        <DiagramIcon
          icon={node.icon}
          className={`md:size-8 ${side ? "size-5" : "size-7"}`}
        />
      </span>
      <div className="min-w-0 break-words hyphens-auto">
        <h4 className="font-display text-body leading-tight text-paper">
          {node.label}
        </h4>
        <p className="mt-1.5 text-meta text-paper-2">{node.hint}</p>
        {node.detail ? (
          <p className="mt-1 font-mono text-micro tracking-meta text-paper-3">
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
    <li className="grid gap-2">
      <span
        className={`flex h-6 w-10 items-center justify-center whitespace-nowrap font-mono text-flare md:w-16 ${
          arrow ? "text-body" : "text-micro tracking-meta"
        }`}
        aria-hidden={arrow ? "true" : undefined}
      >
        {arrow ?? copy.diagramApart}
      </span>
      <Station node={branch} side />
    </li>
  );
}

/**
 * Where each step lands on a tablet grid: how many columns it takes, whether
 * it opens a row, and whether it sits below the first one.
 */
function placeSteps(steps: Diagram["steps"], columns: number) {
  let column = 0;
  let row = 0;
  return steps.map((step) => {
    const span = step.nodes.length;
    if (column > 0 && column + span > columns) {
      column = 0;
      row += 1;
    }
    const place = { step, span, startsRow: column === 0, wrapped: row > 0 };
    column += span;
    return place;
  });
}

export function ProjectDiagram({ diagram }: { diagram: Diagram }) {
  const total = diagram.steps.reduce((sum, step) => sum + step.nodes.length, 0);
  const mdColumns = total <= MD_ONE_ROW ? total : MD_COLUMNS;
  const columns = {
    "--diagram-columns": total,
    "--diagram-columns-md": mdColumns,
  } as CSSProperties;

  return (
    <figure className="mt-2 min-w-0 lg:col-span-2">
      <figcaption className="mb-8 text-body text-paper-2" data-choreo="rise">
        {diagram.title}
      </figcaption>
      <ol
        className="flex flex-col md:grid md:grid-cols-[repeat(var(--diagram-columns-md),minmax(0,1fr))] md:gap-x-8 xl:grid-cols-[repeat(var(--diagram-columns),minmax(0,1fr))]"
        style={columns}
      >
        {placeSteps(diagram.steps, mdColumns).map(
          ({ step, span, startsRow, wrapped }, index) => (
            <li
              key={step.nodes.map((node) => node.label).join()}
              className={`relative flex min-w-0 flex-col md:row-span-2 md:grid md:grid-cols-subgrid md:grid-rows-subgrid md:gap-y-0 ${
                wrapped ? "md:mt-12 xl:mt-0" : ""
              }`}
              style={{ gridColumn: `span ${span} / span ${span}` }}
              data-choreo="rise"
            >
              {index > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-14 items-center justify-center font-mono text-body text-flare md:hidden"
                  >
                    ↓
                  </span>
                  <span
                    aria-hidden="true"
                    className={`${GUTTER} font-mono text-flare ${
                      startsRow ? "xl:flex" : "md:flex"
                    }`}
                  >
                    →
                  </span>
                </>
              ) : null}
              <div className="grid content-start gap-3 md:col-span-full md:grid-cols-subgrid md:gap-y-0 md:pb-6">
                {step.nodes.map((node, i) => (
                  <div key={node.label} className="relative grid min-w-0 gap-3">
                    {i > 0 ? (
                      <>
                        <span className="w-14 text-center font-display text-body italic text-paper-3 md:hidden">
                          {copy.diagramOr}
                        </span>
                        <span
                          className={`${GUTTER} font-display italic text-paper-3 md:flex`}
                        >
                          {copy.diagramOr}
                        </span>
                      </>
                    ) : null}
                    <Station node={node} />
                  </div>
                ))}
              </div>
              {step.branches ? (
                <ul className="mt-3 grid content-start gap-6 pl-18 md:col-span-full md:mt-0 md:pl-0">
                  {step.branches.map((branch) => (
                    <Branch key={branch.label} branch={branch} />
                  ))}
                </ul>
              ) : (
                <div aria-hidden="true" className="hidden md:col-span-full md:block" />
              )}
            </li>
          ),
        )}
      </ol>
    </figure>
  );
}
