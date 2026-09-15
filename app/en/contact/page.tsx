import { ContactPage, contactMetadata } from "@/components/pages/ContactPage";

export const metadata = contactMetadata("en");

export default function Contact() {
  return <ContactPage locale="en" />;
}
