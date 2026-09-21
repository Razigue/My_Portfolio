import Image, { type StaticImageData } from "next/image";
import { Scrub } from "@/components/motion/Scrub";
import { ProjectShot } from "@/components/projects/ProjectShot";
import type { ProjectImage } from "@/content/projects";

type Placement = "panel" | "header";

/** Both layers fade over the same reading interval in their containing section. */
function motion(placement: Placement) {
  return {
    start: "top top",
    end: placement === "header" ? "bottom 30%" : "center 15%",
    triggerClosest: placement === "header" ? "header" : "article",
  };
}

export function ProjectAtmosphere({
  background,
  placement = "panel",
}: {
  background: StaticImageData;
  placement?: Placement;
}) {
  return (
    <div aria-hidden="true" className="project-atmosphere">
      <Scrub
        className="absolute inset-0"
        from={{ opacity: 1, scale: 1.04 }}
        to={{ opacity: 0, scale: 1 }}
        {...motion(placement)}
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
  placement = "panel",
}: {
  image: ProjectImage;
  sizes: string;
  placement?: Placement;
}) {
  return (
    <Scrub
      from={{ opacity: 1, y: 0 }}
      to={{ opacity: 0, y: -24 }}
      {...motion(placement)}
    >
      <ProjectShot
        image={image}
        sizes={sizes}
        className="project-artwork"
        priority={placement === "header"}
        placeholder="empty"
      />
    </Scrub>
  );
}
