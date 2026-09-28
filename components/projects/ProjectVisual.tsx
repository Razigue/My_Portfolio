import Image, { type StaticImageData } from "next/image";
import { Scrub } from "@/components/motion/Scrub";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

/** Both layers of a project's header fade as the header scrolls away. */
const within = "header";

/**
 * The scenery behind a project's title. It reaches both edges of the screen
 * and opens the page, the way the room opens the studio in the project itself.
 */
export function ProjectAtmosphere({
  background,
}: {
  background: StaticImageData;
}) {
  return (
    <div aria-hidden="true" className="project-atmosphere">
      <Scrub
        className="absolute inset-0"
        from={{ opacity: 1, scale: 1.04 }}
        to={{ opacity: 0, scale: 1 }}
        within={within}
      >
        {/* Not preloaded: by day the scenery is not shown at all, and a lazy
            image that is never displayed is never downloaded. At night it is
            in view from the start and loads at once. */}
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />
      </Scrub>
    </div>
  );
}

/** The artwork beside a project's title. */
export function ProjectArtwork({
  image,
  sizes,
}: {
  image: ProjectImage;
  sizes: string;
}) {
  return (
    <Scrub
      from={{ opacity: 1, y: 0 }}
      to={{ opacity: 0, y: -24 }}
      within={within}
    >
      <ProjectShot
        image={image}
        sizes={sizes}
        className="project-artwork"
        placeholder="empty"
        priority
      />
    </Scrub>
  );
}
