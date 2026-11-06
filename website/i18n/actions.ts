"use server";
import { cookies } from "next/headers";
import { isLocale, type Locale } from "../lib/locales";
export async function changeLocale(locale: Locale) {
  if (!isLocale(locale)) throw new Error("Unsupported locale");
  (await cookies()).set("triooo-locale", locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
