import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { copy } from "@/content/site";

export const metadata = { title: copy.notFoundTitle };

export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
