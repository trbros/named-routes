import type { MetadataRoute } from "next";
import content from "../../docs/content.json";
import config from "../../docs/locales.json";
import { defaultLocale } from "../lib/locales";
import { sitemapEntries } from "../lib/seo-urls.mjs";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(
    content.map((section) => section.id),
    config.locales,
    defaultLocale,
  );
}