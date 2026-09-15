import type { Content } from "@/lib/content";

export type Criterion = {
  readonly label: string;
  readonly value: string;
};

/**
 * What a recruiter checks before reading anything else, composed from the
 * fields that already hold each fact, so the school or the city is never typed
 * twice. Shown on the home page and beside the contact form.
 */
export function searchCriteria({
  availability,
  formation,
  site,
}: Content): readonly Criterion[] {
  return [
    { label: availability.windowLabel, value: availability.window },
    { label: availability.rhythmLabel, value: availability.rhythm },
    { label: availability.targetLabel, value: availability.target },
    {
      label: availability.schoolLabel,
      value: `${formation.school}, ${formation.place}`,
    },
    {
      label: availability.diplomaLabel,
      value: `${formation.title}, ${formation.credential}`,
    },
    { label: availability.placeLabel, value: site.location },
  ];
}
