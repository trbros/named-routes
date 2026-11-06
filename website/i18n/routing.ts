import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "../lib/locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
