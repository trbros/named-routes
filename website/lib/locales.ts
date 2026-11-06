import config from "../../docs/locales.json";

/** Site languages. Keep this union in sync with docs/locales.json (pnpm locales:check verifies it). */
export type Locale = "en" | "pt" | "es" | "ja";
export const locales = config.locales.map((item) => item.code) as Locale[];
export const defaultLocale = config.source as Locale;
export const localeNames = Object.fromEntries(
  config.locales.map((item) => [item.code, item.name]),
) as Record<Locale, string>;
export const htmlLang = (locale: Locale) =>
  config.locales.find((item) => item.code === locale)?.htmlLang ?? locale;
export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as string[]).includes(value);
