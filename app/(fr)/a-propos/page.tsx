import { AboutPage, aboutMetadata } from "@/components/pages/AboutPage";

export const metadata = aboutMetadata("fr");

export default function APropos() {
  return <AboutPage locale="fr" />;
}
