import type { Metadata } from "next";
import { getLocale } from "../../../lib/locale";
import { sectionMetadata, jsonLd } from "../../../lib/seo";
import { localizedUrl } from "../../../lib/seo-urls.mjs";
import { release } from "../../../lib/release";

export async function generateMetadata(): Promise<Metadata> {
  return sectionMetadata(await getLocale(), "home");
}
import { Landing } from "../../../components/landing";
export default async function Page() {
  const locale = await getLocale();
  const source = {
    "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: "Named Routes",
    url: localizedUrl(locale), codeRepository: "https://github.com/trbros/named-routes",
    programmingLanguage: "TypeScript", runtimePlatform: "Node.js / JavaScript",
    version: release.version, license: "https://www.apache.org/licenses/LICENSE-2.0",
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(source) }} />
    <Landing />
  </>;
}
