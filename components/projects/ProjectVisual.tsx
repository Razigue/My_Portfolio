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
      {...motion}
    >
      <ProjectShot
        image={image}
        sizes={sizes}
        className="project-artwork"
        placeholder="empty"
      />
    </Scrub>
  );
}
