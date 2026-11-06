import path from "node:path";
import { withNamedRoutes } from "@triooo/named-routes/next";
import createNextIntlPlugin from "next-intl/plugin";

const basePath = (
	process.env.NEXT_PUBLIC_BASE_PATH ?? "/next-named-routes"
).replace(/\/$/, "");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNamedRoutes(
	withNextIntl({
		basePath,
		reactStrictMode: true,
		poweredByHeader: false,
		async redirects() {
			return [
				{
					source: "/documentation",
					has: [
						{ type: "query", key: "section", value: "(?<section>[a-z0-9-]+)" },
					],
					destination: "/docs/:section",
					permanent: true,
				},
				{ source: "/documentation", destination: "/docs", permanent: true },
			];
		},
		// The guide is shared with the package README, outside this example directory.
		turbopack: { root: path.resolve(__dirname, "..") },
	}),
);
