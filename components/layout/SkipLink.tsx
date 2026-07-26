import { copy } from "@/content/site";

export function SkipLink() {
  return (
    <a href="#contenu" className="skip-link">
      {copy.skipLink}
    </a>
  );
}
