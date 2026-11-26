import {
	type AssetHelper,
	type AssetOptions,
	createRoutes,
	defineQuery,
} from "@triooo/named-routes";
import { z } from "zod";

const route = createRoutes(
	{ about: "/about", products: "/products" },
	{
		basePath: "/app",
		assetBase: "https://cdn.example.com",
		i18n: { locales: ["en", "pt"], defaultLocale: "en" },
	},
	{ query: defineQuery({ products: z.object({ page: z.number() }) }) },
);
const asset: AssetHelper = route.asset;
const options: AssetOptions = { absolute: true };
const path: string = asset("logo.svg", options);
const bound: string = route.forLocale("pt").asset("logo.svg");
const localized: string | null = route.localize("/about", "en");
const internal: "/about" = route("about");
const matched = route.match("/about");
const parsed = route.parseQuery("products", "?page=2");
if (parsed.ok) {
	const page: number = parsed.value.page;
	void page;
}
// @ts-expect-error assets take a path, not a route parameter
asset(42);
// @ts-expect-error public assets are not localized
asset("logo.svg", { locale: "pt" });
// @ts-expect-error absolute must be boolean
asset("logo.svg", { absolute: "yes" });
// @ts-expect-error unknown locale
route.localize("/about", "fr");
// @ts-expect-error unknown route
route("missing");
// @ts-expect-error query schema still enforces types
route("products", {}, { query: { page: "2" } });
// New helpers retain name, locale and schema inference.
const edited: string = route.withQuery(
	"/products?page=1",
	{ page: 2 },
	{ name: "products" },
);
// @ts-expect-error named query patch rejects string values for numeric fields.
route.withQuery("/products", { page: "2" }, { name: "products" });
const alternates = route.alternates("about");
const localizedHref: string | undefined = alternates.pt;
// @ts-expect-error unknown locale is not an alternate key.
void alternates.fr;
const context = route.withDefaults({ basePath: "/dashboard" });
context("products", {}, { query: { page: 2 } });
// @ts-expect-error context still checks query schemas.
context("products", {}, { query: { page: "2" } });
const strictAsset = route.asset as unknown as AssetHelper<"images/logo.svg">;
strictAsset("images/logo.svg", { version: true });
strictAsset("/images/logo.svg?theme=dark");
strictAsset("https://cdn.example.com/remote.svg");
// @ts-expect-error unknown public path.
strictAsset("images/missing.svg");
// @ts-expect-error version must be boolean.
strictAsset("images/logo.svg", { version: "true" });
void [path, bound, localized, internal, matched, edited, localizedHref];
