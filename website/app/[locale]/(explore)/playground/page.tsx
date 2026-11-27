import type { Metadata } from "next";
import { getLocale } from "../../../../lib/locale";
import { sectionMetadata } from "../../../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return sectionMetadata(await getLocale(), "playground");
}
import { Playground } from "../../../../components/playground";
export default function Page() {
  return <Playground />;
}
