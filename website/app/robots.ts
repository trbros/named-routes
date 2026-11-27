import type { MetadataRoute } from "next";
import { publicUrl, seoConfig } from "../lib/seo-urls.mjs";

export default function robots(): MetadataRoute.Robots {
  // noindex lives on preview/demo HTML. Do not disallow crawling of those URLs,
  // otherwise a crawler cannot observe the directive.
  return { rules: { userAgent: "*", allow: "/" }, ...(seoConfig.indexable ? { sitemap: publicUrl("/sitemap.xml") } : {}) };
}
