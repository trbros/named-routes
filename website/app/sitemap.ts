import type { MetadataRoute } from "next";
import content from "../../docs/content.json";
import config from "../../docs/locales.json";
import { sitemapEntries } from "../lib/seo-urls.mjs";

/** Canonical localized URLs only. No demo parameters or invented lastModified dates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(content.map(section => section.id), config.locales, config.source);
}
