import Image, { type StaticImageData } from "next/image";
import { Scrub } from "@/components/motion/Scrub";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

/** Both layers fade over the same reading interval in their containing section. */
const motion = {
  start: "top top",
  end: "center 15%",
  triggerClosest: "article",
};

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
        {...motion}
      >
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

/**
 * The project page's own capture, blurred and dimmed behind the title, from
 * one edge of the screen to the other. Same layer as the scenery on a home
 * panel: it is tinted by the stylesheet, and the type stays above it, so the
 * title is read against the page's ground rather than against an interface.
 */
export function ProjectBackdrop({ image }: { image: ProjectImage }) {
  return (
    <div aria-hidden="true" className="project-atmosphere project-backdrop">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        priority
        className="scale-105 object-cover blur-xl"
      />
    </div>
  );
}

export function ProjectArtwork({
  image,
  sizes,
}: {
  image: ProjectImage;
  sizes: string;
}) {
  return (
    <Scrub from={{ opacity: 1, y: 0 }} to={{ opacity: 0, y: -24 }} {...motion}>
      <ProjectShot
        image={image}
        sizes={sizes}
        className="project-artwork"
        placeholder="empty"
      />
    </Scrub>
  );
}
