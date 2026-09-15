export function SkipLink({ label }: { label: string }) {
  return (
    <a href="#contenu" className="skip-link">
      {label}
    </a>
  );
}
