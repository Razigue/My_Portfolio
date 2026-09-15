import {
  RootDocument,
  rootMetadata,
  rootViewport,
} from "@/components/layout/RootDocument";

/** The French site, at the root of the domain. */
export const metadata = rootMetadata("fr");
export const viewport = rootViewport;

export default function FrenchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="fr">{children}</RootDocument>;
}
