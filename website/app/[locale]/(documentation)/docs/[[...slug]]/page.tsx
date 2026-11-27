import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Documentation } from "../../../../../components/documentation";
import { getDoc } from "../../../../../lib/docs";
import { getLocale } from "../../../../../lib/locale";
import { pageMetadata, sectionMetadata, jsonLd } from "../../../../../lib/seo";
import { localizedUrl } from "../../../../../lib/seo-urls.mjs";
import { plainText } from "../../../../../components/rich-text";
import { readChangelog } from "../../../../../lib/read-changelog";

type Props = { params: Promise<{ slug?: string[] }> };
/** /docs is the index; /docs/<topic> is one topic. Deeper paths do not exist. */
async function topic(params: Props["params"]) {
  const { slug = [] } = await params;
  if (slug.length > 1) notFound();
  const id = slug[0];
  if (id && !getDoc(id)) notFound();
  return id;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = await topic(params);
  const locale = await getLocale();
  const section = getDoc(id);
  return section ? pageMetadata(locale, `/docs/${section.id}`, section.title[locale], plainText(section.paragraphs[locale][0])) : sectionMetadata(locale, "docs");
}
export default async function Page({ params }: Props) {
  const id = await topic(params);
  const locale = await getLocale();
  const section = getDoc(id);
  const docsLabel = sectionMetadata(locale, "docs").title;
  const items = [
    { "@type": "ListItem", position: 1, name: "Named Routes", item: localizedUrl(locale) },
    { "@type": "ListItem", position: 2, name: typeof docsLabel === "object" && docsLabel && "absolute" in docsLabel ? docsLabel.absolute : "Documentation", item: localizedUrl(locale, "/docs") },
    ...(section ? [{ "@type": "ListItem", position: 3, name: section.title[locale], item: localizedUrl(locale, `/docs/${section.id}`) }] : []),
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }) }} />
    <Documentation selectedId={id} changelog={readChangelog(await getLocale())} />
  </>;
}
