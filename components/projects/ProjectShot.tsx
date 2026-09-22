import Image from "next/image";
import type { ProjectImage } from "@/content/projects";

/**
 * A capture of a project. A whole screen is shown in a window, the way the
 * Tonecraft landing page shows its studio: rounded corners and a title bar
 * with three dots, set off by its ground alone. No border, no rule, no
 * shadow. An image marked `cutout` has no screen around it, so it is shown
 * bare.
 *
 * Unlike the portrait on « À propos » it is not desaturated. That filter exists
 * to keep one photograph from pulling the composition off neutral; a screenshot
 * of an interface is already its own palette, and greying it would misreport
 * what the interface looks like.
 *
 * `sizes` is passed in because the two places this appears are very different
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
  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      placeholder={placeholder}
      sizes={sizes}
      priority={priority}
      className="h-auto w-full"
    />
  );

  if (image.cutout) {
    return <span className={`shot block ${className ?? ""}`}>{picture}</span>;
  }

  return (
    <span className={`shot shot-window block ${className ?? ""}`}>
      <span className="window-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {picture}
    </span>
  );
}

/**
 * The same capture, folded away behind a word.
 *
 * On the home page a panel is one screenful and the type is the composition; an
 * image sitting there permanently would be the loudest thing on a screen whose
 * subject is the title. So it opens on demand, from a control that reads like
 * the links beside it rather than like a button.
 *
 * `<details>` rather than state: the summary is a real disclosure control, it
 * carries its own expanded state to assistive technology, and it works with
 * scripting off — the same reason the mobile menu is built this way.
 */
export function ProjectShotDisclosure({
  image,
  sizes,
  className,
  show,
  hide,
}: {
  image: ProjectImage;
  sizes: string;
  className?: string;
  /** The word on the control while folded, and while open. */
  show: string;
  hide: string;
}) {
  return (
    <details className={`disclosure shot-toggle ${className ?? ""}`}>
      <summary className="shot-summary link font-mono text-meta tracking-meta text-paper-3">
        <span className="shot-word" data-shot-word="closed">
          {show}
        </span>
        <span className="shot-word" data-shot-word="open">
          {hide}
        </span>
      </summary>

      <div className="shot-panel mt-6">
        <ProjectShot image={image} sizes={sizes} />
      </div>
    </details>
  );
}
