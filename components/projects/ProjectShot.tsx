import Image from "next/image";
import type { ProjectImage } from "@/content/projects";

/**
 * A capture of a project, shown as it is: rounded corners and nothing around
 * it. No window, no title bar, no border, no shadow. An image marked `cutout`
 * has a transparent background, so no ground shows behind it either.
 *
 * Unlike the portrait on « À propos » it is not desaturated. That filter exists
 * to keep one photograph from pulling the composition off neutral; a screenshot
 * of an interface is already its own palette, and greying it would misreport
 * what the interface looks like.
 *
 * `sizes` is passed in because the places this appears are very different
 * widths, and a wrong `sizes` costs the visitor bytes rather than pixels.
 */
export function ProjectShot({
  image,
  sizes,
  className,
  priority,
  placeholder = "blur",
}: {
  image: ProjectImage;
  sizes: string;
  className?: string;
  /** Set where the capture opens the page: it is the largest thing above the
   *  fold there, and lazy-loading the element that defines the paint is the
   *  one place the default is the wrong one. */
  priority?: boolean;
  /** Cutout artwork keeps its transparent surroundings while loading. */
  placeholder?: "blur" | "empty";
}) {
  return (
    <span
      className={`shot block ${image.cutout ? "shot-bare" : ""} ${className ?? ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        placeholder={placeholder}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </span>
  );
}
