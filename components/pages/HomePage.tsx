import type { Metadata } from "next";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { ParcoursTeaser } from "@/components/home/ParcoursTeaser";
import { Projects } from "@/components/home/Projects";
import { Skills } from "@/components/home/Skills";
import { alternates, type Locale } from "@/lib/i18n";

export function homeMetadata(locale: Locale): Metadata {
  return { alternates: alternates(locale, "home") };
}

/**
 * Sections alternate between the page's ground and a band, starting on the
 * page. What a recruiter reads first comes first: who, the projects, the
 * path, the skills; the method, with its technical detail and the note on AI,
 * comes after them, for whoever reads on, and the contact closes the page.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Projects locale={locale} />
      <ParcoursTeaser locale={locale} />
      <Skills locale={locale} />
      <Method locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
