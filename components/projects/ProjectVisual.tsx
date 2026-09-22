import Image, { type StaticImageData } from "next/image";
import { Scrub } from "@/components/motion/Scrub";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

/**
 * Both layers fade over the same reading interval in their containing section:
 * a home panel's `article`, or a project page's `header`.
 */
type Within = "article" | "header";

const motion = (within: Within) => ({
  start: "top top",
  end: within === "header" ? "bottom top" : "center 15%",
  triggerClosest: within,
});

/**
 * The scenery behind a project's title. On a project page it reaches both
 * edges of the screen and is left brighter than on a home panel: it opens the
 * page, the way the room opens the studio in the project itself.
 */
export function ProjectAtmosphere({
  background,
  within = "article",
}: {
  background: StaticImageData;
  within?: Within;
}) {
  return (
    <div
      aria-hidden="true"
      className={`project-atmosphere ${within === "header" ? "project-atmosphere-header" : ""}`}
    >
      <Scrub
        className="absolute inset-0"
        from={{ opacity: 1, scale: 1.04 }}
        to={{ opacity: 0, scale: 1 }}
        {...motion(within)}
      >
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          priority={within === "header"}
          className="object-cover"
        />
      </Scrub>
    </div>
  );
}

export function ProjectArtwork({
  image,
  sizes,
  within = "article",
}: {
  image: ProjectImage;
  sizes: string;
  within?: Within;
}) {
  return (
    <Scrub
      from={{ opacity: 1, y: 0 }}
      to={{ opacity: 0, y: -24 }}
      {...motion(within)}
    >
      <ProjectShot
        image={image}
        sizes={sizes}
        className="project-artwork"
        placeholder="empty"
        priority={within === "header"}
      />
    </Scrub>
  );
}
