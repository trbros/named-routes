import path from "node:path";
import { withNamedRoutes } from "@triooo/named-routes/next";
import createNextIntlPlugin from "next-intl/plugin";

import { seoConfig } from "./lib/seo-urls.mjs";
import { routing } from "./i18n/routing";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNamedRoutes(
  withNextIntl({
    basePath: seoConfig.basePath,
    reactStrictMode: true,
    poweredByHeader: false,

    async headers() {
      return [
        "/llms.txt",
        "/llms-full.txt",
        "/llms/:path*",
      ].map((source) => ({
        source,
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      }));
    },

    async redirects() {
      return [
        {
          source: "/documentation",
          has: [
            {
              type: "query",
              key: "section",
              value: "(?<section>[a-z0-9-]+)",
            },
          ],
          destination: "/docs/:section",
          permanent: true,
        },
        {
          source: "/documentation",
          destination: "/docs",
          permanent: true,
        },
      ];
    },

    turbopack: {
      root: path.resolve(__dirname, ".."),
    },
  }),
  {
    i18n: routing,
  },
);