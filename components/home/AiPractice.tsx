import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * How he works with AI, in his three paragraphs, each under the heading
 * `ia.headings` gives it: what he hands it, what he checks, what he never
 * delegates. Read in order down one column, a hairline between them.
 */
export function AiPractice({
  locale,
  headingLevel = 2,
}: {
  locale: Locale;
  headingLevel?: 2 | 3;
}) {
  const { ia } = getContent(locale);
  const Title = headingLevel === 2 ? "h2" : "h3";
  const Part = headingLevel === 2 ? "h3" : "h4";

  return (
    <div className="grid gap-x-gutter gap-y-block lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Title id="ia-title" className="section-title">
        {ia.title}
      </Title>

      <ol className="grid">
        {ia.paragraphs.map((paragraph, index) => (
          <li
            key={paragraph}
            className="border-b border-line py-6 first:pt-0 last:border-b-0 last:pb-0"
          >
            <Part className="part-title">{ia.headings[index]}</Part>
            <p className="mt-3 max-w-measure text-body text-paper-2">{paragraph}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
