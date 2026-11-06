import { getLocale as getIntlLocale } from "next-intl/server";
import { defaultLocale, isLocale, type Locale } from "./locales";
export async function getLocale(): Promise<Locale> {
  const locale = await getIntlLocale();
  return isLocale(locale) ? locale : defaultLocale;
}
