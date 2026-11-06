"use client";
import { useLocale as useIntlLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { useState, useTransition } from "react";
import type { Locale } from "../lib/locales";
export type { Locale } from "../lib/locales";
// Locale navigation preserves the current page, query and hash.
export function useSiteLocale() {
  const locale = useIntlLocale() as Locale;
  const t = useTranslations("ui");
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  function setLocale(next: Locale) {
    if (next === locale || pending) return;
    setError(false);
    startTransition(() => {
      try {
        router.replace(pathname + window.location.search + window.location.hash, { locale: next });
      } catch {
        setError(true);
      }
    });
  }
  return { locale, t, setLocale, pending, error };
}
