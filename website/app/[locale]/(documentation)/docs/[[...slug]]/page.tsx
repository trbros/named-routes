import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Documentation } from "../../../../../components/documentation";
import { getDoc } from "../../../../../lib/docs";
import { getLocale } from "../../../../../lib/locale";
import { getTranslations } from "next-intl/server";
import { plainText } from "../../../../../components/rich-text";

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
  const t = await getTranslations("ui");
  return {
    title: section ? section.title[locale] : t("documentation_9e9cf3"),
    description: section ? plainText(section.paragraphs[locale][0]) : undefined,
  };
}
export default async function Page({ params }: Props) {
  return <Documentation selectedId={await topic(params)} />;
}
