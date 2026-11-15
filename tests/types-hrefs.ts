// Type contracts for hrefs: "typed" (template literal return types).
import {
	createRoutes,
	type NamedRoutes,
	type RouteHref,
	type RouteHrefWithSuffix,
} from "@triooo/named-routes";

type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false;
const expect = <T extends true>(): T => true as T;

const manifest = {
	home: "/",
	about: "/about",
	"posts.$post": "/posts/[post]",
	docs: "/docs/[...slug]",
	shop: "/shop/[[...path]]",
	help: "/[[lang]]/help",
	version: "/v[major]-[minor]",
	team: "/teams/[team]/users/[user]",
} as const;

// ------------------------------------------------- RouteHref by pattern
expect<Equal<RouteHref<"/">, "/">>();
expect<Equal<RouteHref<"/about">, "/about">>();
expect<Equal<RouteHref<"/posts/[post]">, `/posts/${string}`>>();
expect<Equal<RouteHref<"/docs/[...slug]">, `/docs/${string}`>>();
expect<Equal<RouteHref<"/shop/[[...path]]">, "/shop" | `/shop/${string}`>>();
expect<Equal<RouteHref<"/[[lang]]/help">, "/help" | `/${string}/help`>>();
expect<Equal<RouteHref<"/v[major]-[minor]">, `/v${string}-${string}`>>();
expect<Equal<RouteHref<"/about", true>, "/about/">>();
expect<Equal<RouteHref<"/", true>, "/">>();
// "/" is a subtype of `/${string}`, so TypeScript reduces the union.
expect<Equal<RouteHref<"/[[...all]]">, `/${string}`>>();
expect<Equal<RouteHref<string>, string>>();

// ------------------------------------------------- typed helper
const route = createRoutes(manifest, { hrefs: "typed" });
const homePattern: "/" = route.pattern("home");
const home = route("home");
expect<Equal<typeof home, "/">>();
const post = route("posts.$post", { post: 42 });
expect<Equal<typeof post, `/posts/${string}`>>();
const docs = route("docs", { slug: ["a", "b"] });
expect<Equal<typeof docs, `/docs/${string}`>>();
const shop = route("shop");
expect<Equal<typeof shop, "/shop" | `/shop/${string}`>>();
const withQuery = route("posts.$post", { post: 1 }, { query: { page: 2 } });
expect<Equal<typeof withQuery, RouteHrefWithSuffix<"/posts/[post]">>>();
const withHash = route("about", {}, { hash: "top" });
expect<Equal<typeof withHash, RouteHrefWithSuffix<"/about">>>();
const absolute = route("about", {}, { absolute: true });
expect<Equal<typeof absolute, string>>();
const prefixed = route("about", {}, { basePath: true });
expect<Equal<typeof prefixed, string>>();
declare const someOptions: {
	query?: Record<string, string>;
	absolute?: boolean;
};
const unknownOptions = route("about", {}, someOptions);
expect<Equal<typeof unknownOptions, string>>();

const slashed = createRoutes(manifest, { hrefs: "typed", trailingSlash: true });
const slashedPost = slashed("posts.$post", { post: 1 });
expect<Equal<typeof slashedPost, `/posts/${string}/`>>();

// The parameter contract is unchanged in typed mode.
// @ts-expect-error Unknown route names must fail.
route("missing");
// @ts-expect-error Required parameters cannot be omitted.
route("posts.$post");
// @ts-expect-error Wrong parameter key.
route("posts.$post", { id: 1 });
// @ts-expect-error Catch-all parameters are arrays.
route("docs", { slug: "a/b" });
// @ts-expect-error Misspelled option keys are still rejected.
route("about", {}, { querry: { a: 1 } });
// @ts-expect-error Query values cannot be nested objects.
route("about", {}, { query: { bad: { nested: true } } });

// ------------------------------------------------- default mode is unchanged
const plain = createRoutes(manifest);
const plainPost = plain("posts.$post", { post: 1 });
expect<Equal<typeof plainPost, string>>();
const explicitString = createRoutes(manifest, { hrefs: "string" });
expect<Equal<typeof explicitString, NamedRoutes<typeof manifest>>>();
// A widened variable is assignable to string and can be reassigned.
let mutable = plain("about");
mutable = "/elsewhere";

// ------------------------------------------------- i18n and bound helpers
const localized = createRoutes(manifest, {
	hrefs: "typed",
	i18n: { locales: ["en", "pt"], defaultLocale: "en" },
});
const internal = localized("about");
expect<Equal<typeof internal, "/about">>();
const translated = localized("about", {}, { locale: "pt" });
expect<Equal<typeof translated, string>>();
const bound = localized.forLocale("pt")("about");
expect<Equal<typeof bound, string>>();
// @ts-expect-error Unknown locale.
localized("about", {}, { locale: "fr" });

// @ts-expect-error hrefs only accepts "string" or "typed".
createRoutes(manifest, { hrefs: "literal" });

void [
	homePattern,
	home,
	post,
	docs,
	shop,
	withQuery,
	withHash,
	absolute,
	prefixed,
];
void [
	unknownOptions,
	slashedPost,
	plainPost,
	mutable,
	internal,
	translated,
	bound,
];
