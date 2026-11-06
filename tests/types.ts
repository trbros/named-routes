import { createRoutes, type RouteParams } from "@triooo/named-routes";
import { defineConfig } from "@triooo/named-routes/config";
import { generateRoutes } from "@triooo/named-routes/generator";
import { withNamedRoutes } from "@triooo/named-routes/next";
import { namedRoutes } from "@triooo/named-routes/vite";

const route = createRoutes({
	home: "/",
	"posts.show": "/posts/[post]",
	"teams.user": "/teams/[team]/users/[user]",
	docs: "/docs/[...slug]",
	shop: "/shop/[[...path]]",
});
route("home");
route(
	"home",
	{},
	{ query: { page: 2, tags: ["a", "b"], draft: false }, hash: "title" },
);
route("posts.show", { post: 42 });
route("teams.user", { team: "triooo", user: 1 });
route("docs", { slug: ["a", "b"] });
route("shop");
route("shop", { path: null });
route("shop", { path: [] });
const literal: "/posts/[post]" = route.pattern("posts.show");
const names: ("home" | "posts.show" | "teams.user" | "docs" | "shop")[] =
	route.names();
const pathParams: RouteParams<"/[locale]/posts/[id]"> = {
	locale: "pt-BR",
	id: 1,
};
// @ts-expect-error Unknown route names must fail.
route("missing");
// @ts-expect-error Required parameters cannot be omitted.
route("posts.show");
// @ts-expect-error Wrong parameter key.
route("posts.show", { id: 42 });
// @ts-expect-error Nested paths require every parameter.
route("teams.user", { team: "triooo" });
// @ts-expect-error A dynamic segment is scalar.
route("posts.show", { post: ["1", "2"] });
// @ts-expect-error Catch-all parameters are arrays.
route("docs", { slug: "a/b" });
// @ts-expect-error Static routes do not take stray parameters.
route("home", { id: 1 });
// @ts-expect-error Query values cannot be nested objects.
route("home", {}, { query: { bad: { secret: true } } });
const candidate: string = "home";
if (route.has(candidate)) route.pattern(candidate);
withNamedRoutes({ basePath: "/app", trailingSlash: true }, { router: "app" });
withNamedRoutes(
	async (phase: string) => ({ reactStrictMode: phase.length > 0 }),
	{ root: "." },
);
generateRoutes({
	router: "pages",
	names: { "/posts/[post]": "posts.show" },
	includeApi: true,
});

withNamedRoutes({}, { watch: true, watchInterval: 750 });
// @ts-expect-error watch must be boolean
withNamedRoutes({}, { watch: "yes" });

const localized = createRoutes(
	{
		home: "/",
		about: "/about",
		post: "/blog/[slug]",
		opt: "/[[lang]]/x",
		mixed: "/v[major]-[minor]",
	},
	{
		i18n: {
			locales: ["en", "pt"],
			defaultLocale: "en",
			localePrefix: "as-needed",
		},
	},
);
localized("about", {}, { locale: "pt" });
localized("post", { slug: "a" }, { locale: "en" });
localized("opt");
localized("opt", { lang: "pt" });
localized("mixed", { major: 1, minor: 2 });
const pt: string = localized.forLocale("pt")("about");
const localeList: ("en" | "pt")[] = localized.locales();
// @ts-expect-error Unknown locale.
localized("about", {}, { locale: "fr" });
// @ts-expect-error Mixed segments require every parameter.
localized("mixed", { major: 1 });
// @ts-expect-error Locale binding only accepts configured locales.
localized.forLocale("de");
// @ts-expect-error Without i18n no locale can be passed.
route("home", {}, { locale: "en" });

declare const loose: Record<string, string>;
const dynamic = createRoutes(loose);
dynamic("anything", { id: 1, parts: ["a"] });

const config = defineConfig({
	framework: "nuxt",
	routesDir: "app/pages",
	output: "app/utils/routes.ts",
	naming: { separator: ":", transform: ({ name }) => name.toUpperCase() },
	i18n: {
		locales: ["en", "pt"],
		defaultLocale: "en",
		localePrefix: "as-needed",
	},
	exportNames: { route: "url" },
});
void config;
// @ts-expect-error Unknown framework.
defineConfig({ framework: "rails" });
const plugin: { name: string } = namedRoutes({ framework: "sveltekit" });
void [pt, localeList, plugin, literal, names, pathParams];
