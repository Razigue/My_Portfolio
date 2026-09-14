import { Availability } from "@/components/home/Availability";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { ParcoursTeaser } from "@/components/home/ParcoursTeaser";
import { Selection } from "@/components/home/Selection";
import { SkillsMatrix } from "@/components/home/SkillsMatrix";

export default function Home() {
  return (
    <>
      <Hero />
      <Availability />
      <Selection />
      <Method />
      <SkillsMatrix />
      <ParcoursTeaser />
      <ContactCta />
    </>
  );
}
