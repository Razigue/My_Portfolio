import type { Project } from "@/content/projects";
import type { Content } from "@/lib/content";

/**
 * The domains and their technologies are authored in `content/about.ts`; what
 * sits beside each technology is derived: the published projects whose stack
 * lists it. A technology from the CV that no published project uses simply
 * carries nothing, rather than a level or a percentage nobody could check.
 */

export type SkillUse = {
  readonly name: string;
  readonly projects: readonly Project[];
};

export type SkillDomain = {
  readonly domain: string;
  readonly skills: readonly SkillUse[];
  /** The published projects using any of the domain's technologies, in their published order. */
  readonly projects: readonly Project[];
};

export function skillDomains(content: Content): readonly SkillDomain[] {
  return content.competences.map((group) => ({
    domain: group.domain,
    skills: group.technologies.map((name) => ({
      name,
      projects: content.projects.filter((p) => p.stack.includes(name)),
    })),
    projects: content.projects.filter((p) =>
      p.stack.some((technology) => group.technologies.includes(technology)),
    ),
  }));
}
