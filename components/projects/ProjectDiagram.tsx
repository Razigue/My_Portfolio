import type { ProjectDiagram as Diagram } from "@/content/projects";

/** Reading order and spacing carry the relationships without drawn connectors. */
export function ProjectDiagram({ diagram }: { diagram: Diagram }) {
  const List = diagram.layout === "sequence" ? "ol" : "ul";

  return (
    <figure className="mt-2 min-w-0 lg:col-span-2">
      <figcaption className="mb-6 text-body text-paper-2" data-choreo="rise">
        {diagram.title}
      </figcaption>
      <List className="grid gap-3 md:grid-cols-3">
        {diagram.items.map((item, index) => (
          <li
            key={item.title}
            className="min-w-0 bg-ink-2 p-6 lg:p-8"
            data-choreo="rise"
          >
            {diagram.layout === "sequence" ? (
              <span
                className="mb-5 block font-display text-h3 text-flare"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <h4 className="font-display text-h3 leading-tight text-paper">
              {item.title}
            </h4>
            <p className="mt-4 text-body text-paper-2">{item.description}</p>
          </li>
        ))}
      </List>
    </figure>
  );
}
