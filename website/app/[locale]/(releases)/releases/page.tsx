import type { Metadata } from "next";
import { getLocale } from "../../../../lib/locale";
import { sectionMetadata } from "../../../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return sectionMetadata(await getLocale(), "releases");
}
import { ReleaseNotes } from "../../../../components/release-notes";
import { readChangelog } from "../../../../lib/read-changelog";
export default async function Page() {
  return <ReleaseNotes changelog={readChangelog(await getLocale())} />;
}
