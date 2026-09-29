import { Tag } from "@/components/ui/primitives";

/** A project's technologies, as a wrapping row of tags. */
export function TagList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
