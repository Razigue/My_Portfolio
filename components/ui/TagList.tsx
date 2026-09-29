import { Tag } from "@/components/ui/primitives";

/** A project's technologies, as a wrapping line of names. */
export function TagList({
  items,
  className,
  proven,
}: {
  items: readonly string[];
  className?: string;
  /** The names to set in the full text colour; all of them when omitted. */
  proven?: readonly string[];
}) {
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1 ${className ?? ""}`}>
      {items.map((item) => (
        <Tag key={item} proven={proven ? proven.includes(item) : false}>
          {item}
        </Tag>
      ))}
    </ul>
  );
}
