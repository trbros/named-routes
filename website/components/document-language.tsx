"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { htmlLang, type Locale } from "../lib/locales";

// The root layout persists during navigation, so keep its language in sync.
export function DocumentLanguage() {
  const locale = useLocale() as Locale;
  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);
  return null;
}
