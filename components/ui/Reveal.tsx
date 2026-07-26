import type { ChoreoVariant } from "@/lib/gsap";
import type { ElementType } from "react";

/**
 * The server-side half of the choreography contract: it does nothing but stamp
 * the attributes a client <Stage> looks for. Keeping it a Server Component is
 * the whole point: content never has to cross the client boundary just to be
 * animated.
 */
export function Reveal({
  children,
  variant = "rise",
  as: Tag = "div",
  className,
  order,
  delay,
  ...rest
}: {
  children?: React.ReactNode;
  variant?: ChoreoVariant;
  as?: ElementType;
  className?: string;
  /** Explicit position in the section timeline; DOM order is used otherwise. */
  order?: number;
  /** Extra seconds on top of this element's computed start. */
  delay?: number;
} & Record<string, unknown>) {
  return (
    <Tag
      data-choreo={variant}
      data-choreo-order={order}
      data-choreo-delay={delay}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
