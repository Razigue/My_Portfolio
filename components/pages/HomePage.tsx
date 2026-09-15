import type { Metadata } from "next";
import { Availability } from "@/components/home/Availability";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { ParcoursTeaser } from "@/components/home/ParcoursTeaser";
import { Selection } from "@/components/home/Selection";
import { SkillsMatrix } from "@/components/home/SkillsMatrix";
import { alternates, type Locale } from "@/lib/i18n";

export function homeMetadata(locale: Locale): Metadata {
  return { alternates: alternates(locale, "home") };
}

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Availability locale={locale} />
      <Selection locale={locale} />
      <Method locale={locale} />
      <SkillsMatrix locale={locale} />
      <ParcoursTeaser locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
