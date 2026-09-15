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
 */
const BRANCH_ARROWS: Record<DiagramBranch["flow"], string | null> = {
  out: "↓",
  in: "↑",
  loop: "↕",
  apart: null,
};

function Node({ node }: { node: DiagramNode }) {
  return (
    <div className="flex min-w-0 items-center gap-4 md:flex-col md:items-start md:gap-3">
      <span className="flex size-14 shrink-0 items-center justify-center bg-ink-3 text-flare md:size-16">
        <DiagramIcon icon={node.icon} className="size-7 md:size-8" />
      </span>
      <div className="min-w-0 break-words">
        <h4 className="font-display text-lede leading-tight text-paper md:text-body md:leading-tight">
          {node.label}
        </h4>
        <p className="mt-1 text-meta text-paper-2">{node.hint}</p>
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
    <li className="grid min-w-0 gap-2">
      <span
        className="font-mono text-meta whitespace-nowrap text-flare"
        aria-hidden={arrow ? "true" : undefined}
      >
        {arrow ?? copy.diagramApart}
      </span>
      <div className="flex min-w-0 items-center gap-3 md:flex-col md:items-start md:gap-2">
        <span className="flex size-10 shrink-0 items-center justify-center bg-ink-2 text-paper-2">
          <DiagramIcon icon={branch.icon} className="size-5" />
        </span>
        <div className="min-w-0 break-words hyphens-auto">
          <h5 className="font-display text-body leading-tight text-paper">
            {branch.label}
          </h5>
          <p className="text-meta text-paper-2">{branch.hint}</p>
          {branch.detail ? (
            <p className="font-mono text-micro tracking-meta text-paper-3">
              {branch.detail}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

/**
 * Stations read top to bottom on a phone and left to right from a tablet up,
 * all on one row once the page is wide enough to hold them.
 */
export function ProjectDiagram({ diagram }: { diagram: Diagram }) {
  const columns = {
    "--diagram-steps": diagram.steps.length,
    "--diagram-steps-md": Math.min(diagram.steps.length, 4),
  } as CSSProperties;

  return (
    <figure className="mt-2 min-w-0 lg:col-span-2">
      <figcaption className="mb-8 text-body text-paper-2" data-choreo="rise">
        {diagram.title}
      </figcaption>
      <ol
        className="grid md:grid-cols-[repeat(var(--diagram-steps-md),minmax(0,1fr))] md:gap-y-12 xl:grid-cols-[repeat(var(--diagram-steps),minmax(0,1fr))]"
        style={columns}
      >
        {diagram.steps.map((step, index) => (
          <li
            key={step.nodes.map((node) => node.label).join()}
            className="flex min-w-0 flex-col md:flex-row"
            data-choreo="rise"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="block w-14 py-2 text-center font-mono text-body text-flare md:w-8 md:shrink-0 md:py-0 md:pt-4"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            ) : null}
            <div className="grid min-w-0 flex-1 content-start gap-5 md:pr-3">
              <div className="grid gap-2">
                {step.nodes.map((node, i) => (
                  <div key={node.label} className="grid gap-2">
                    {i > 0 ? (
                      <span className="w-14 text-center font-display text-body italic text-paper-3 md:w-16">
                        {copy.diagramOr}
                      </span>
                    ) : null}
                    <Node node={node} />
                  </div>
                ))}
              </div>
              {step.branches ? (
                <ul className="grid gap-4 pl-18 md:pl-0">
                  {step.branches.map((branch) => (
                    <Branch key={branch.label} branch={branch} />
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
