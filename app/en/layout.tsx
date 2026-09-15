import {
  RootDocument,
  rootMetadata,
  rootViewport,
} from "@/components/layout/RootDocument";

/** The English site, under `/en`. */
export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
