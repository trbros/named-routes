"use client";
import { useLocale as useIntlLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { changeLocale } from "../i18n/actions";
import type { Locale } from "../lib/locales";
export type { Locale } from "../lib/locales";
// Shared controls consume next-intl; language changes refresh the server tree.
export function useSiteLocale() {
  const locale = useIntlLocale() as Locale;
  const t = useTranslations("ui");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  function setLocale(next: Locale) {
    if (next === locale || pending) return;
    setError(false);
    startTransition(async () => {
      try {
        await changeLocale(next);
        router.refresh();
      } catch {
        setError(true);
      }
    });
  }
  return { locale, t, setLocale, pending, error };
}
