import { ContactPage, contactMetadata } from "@/components/pages/ContactPage";

export const metadata = contactMetadata("fr");

export default function Contact() {
  return <ContactPage locale="fr" />;
}
