import type { Metadata } from "next";
import { AiPractice } from "@/components/home/AiPractice";
import { ContactCta } from "@/components/home/ContactCta";
import { FirstMonth } from "@/components/home/FirstMonth";
import { Hero } from "@/components/home/Hero";
import { ParcoursTeaser } from "@/components/home/ParcoursTeaser";
import { Projects } from "@/components/home/Projects";
import { Skills } from "@/components/home/Skills";
import { alternates, type Locale } from "@/lib/i18n";

export function homeMetadata(locale: Locale): Metadata {
  return { alternates: alternates(locale, "home") };
}

/**
 * Who and on what terms, then the proof before the prose: the projects, how
 * he works with AI, the thread that runs through them, then what he takes on
 * from the first month, his path, his skills, and a closing call to write to
 * him.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Projects locale={locale} />
      <section aria-labelledby="ia-title">
        <div className="section-body page-width">
          <AiPractice locale={locale} />
        </div>
      </section>
      <FirstMonth locale={locale} />
      <ParcoursTeaser locale={locale} />
      <Skills locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
