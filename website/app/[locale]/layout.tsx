import { notFound } from "next/navigation";
import { isLocale } from "../../lib/locales";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { release } from "../../lib/release";
import { DocumentLanguage } from "../../components/document-language";
import { MotionObserver } from "../../components/motion";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ui");
  return {
    title: {
      default: `Named Routes v${release.version} — ${t("site_tagline_5e1f02")}`,
      template: "%s · triooo Named Routes",
    },
    description: t("site_description_9a7c33"),
  };
}
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  if (!isLocale((await params).locale)) notFound();
  return (
    <NextIntlClientProvider>
      <DocumentLanguage />
      {children}
      <MotionObserver />
    </NextIntlClientProvider>
  );
}
