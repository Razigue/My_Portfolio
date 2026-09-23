import Image, { type StaticImageData } from "next/image";
import { Scrub } from "@/components/motion/Scrub";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

/**
 * Home panels stay still. Only project headers fade their visual layers.
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
  const picture = (
    <Image
      src={background}
      alt=""
      fill
      sizes="100vw"
      placeholder="blur"
      priority={within === "header"}
      className="object-cover"
    />
  );

  return (
    <div
      aria-hidden="true"
      className={`project-atmosphere ${within === "header" ? "project-atmosphere-header" : ""}`}
    >
      {within === "header" ? (
        <Scrub
          className="absolute inset-0"
          from={{ opacity: 1, scale: 1.04 }}
          to={{ opacity: 0, scale: 1 }}
          {...motion(within)}
        >
          {picture}
        </Scrub>
      ) : (
        <div className="absolute inset-0">{picture}</div>
      )}
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
  const shot = (
    <ProjectShot
      image={image}
      sizes={sizes}
      className="project-artwork"
      placeholder="empty"
      priority={within === "header"}
    />
  );

  if (within === "article") return <div>{shot}</div>;

  return (
    <Scrub
      from={{ opacity: 1, y: 0 }}
      to={{ opacity: 0, y: -24 }}
      {...motion(within)}
    >
      {shot}
    </Scrub>
  );
}
