import type { Content } from "@/lib/content";

export type Criterion = {
  readonly label: string;
  readonly value: string;
};

/**
 * What a recruiter checks before reading anything else, composed from the
 * fields that already hold each fact, so the school or the city is never typed
 * twice. The opening screen sets the ones its sentence does not already say.
 */
export function searchCriteria({ availability, formation, site }: Content) {
  return {
    window: { label: availability.windowLabel, value: availability.window },
    rhythm: { label: availability.rhythmLabel, value: availability.rhythm },
    target: { label: availability.targetLabel, value: availability.target },
    school: {
      label: availability.schoolLabel,
      value: `${formation.school}, ${formation.place}`,
    },
    diploma: {
      label: availability.diplomaLabel,
      value: `${formation.title}, ${formation.credential}`,
    },
    place: { label: availability.placeLabel, value: site.location },
  } satisfies Readonly<Record<string, Criterion>>;
}
