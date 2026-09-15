import { HomePage, homeMetadata } from "@/components/pages/HomePage";

export const metadata = homeMetadata("fr");

export default function Accueil() {
  return <HomePage locale="fr" />;
}
