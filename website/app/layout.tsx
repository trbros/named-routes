import type { Metadata } from "next";
import { Workspace } from "../components/workspace";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../components/theme-provider";
import { getLocale } from "../lib/locale";
import { htmlLang } from "../lib/locales";
import { getTranslations } from "next-intl/server";
import { release } from "../lib/release";
import "./globals.css";
import "./landing.css";
import "./reference.css";
import "./transit.css";
import { MotionObserver } from "../components/motion";
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
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html lang={htmlLang(locale)} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <Workspace>{children}</Workspace>
            <MotionObserver />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
