import { projects } from "@/content/projects";

/**
 * The coverage matrix is derived, never authored: each entry counts the
 * projects that list that technology, so it moves on its own when one is added
 * and a reader can check it against the index. Percentages, star ratings and
 * "expert / intermédiaire" levels are claims nobody can check, and are absent
 * deliberately.
 */

export type SkillCount = {
  readonly name: string;
  readonly count: number;
};

export function skillMatrix(): readonly SkillCount[] {
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const technology of project.stack) {
      counts.set(technology, (counts.get(technology) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name, "fr"),
    );
}

/** `4 projets` or `1 projet`, the label rendered beside each technology. */
export function projectCountLabel(count: number): string {
  return `${count} ${count > 1 ? "projets" : "projet"}`;
}
