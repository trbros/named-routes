// Type contracts for route.match(), route.is() and route.breadcrumbs().
import {
	createRoutes,
	type MatchedParams,
	type RouteMatch,
} from "@triooo/named-routes";

type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false;
const expect = <T extends true>(): T => true as T;

const manifest = {
	home: "/",
	"users.$user": "/users/[user]",
	docs: "/docs/[[...slug]]",
	files: "/files/[...path]",
	help: "/[[lang]]/help",
	version: "/v[major]-[minor]",
} as const;
const route = createRoutes(manifest, {
	i18n: { locales: ["en", "pt"], defaultLocale: "en" },
});

expect<Equal<MatchedParams<"/users/[user]">, { readonly user: string }>>();
expect<
	Equal<MatchedParams<"/docs/[[...slug]]">, { readonly slug?: string[] }>
>();
expect<Equal<MatchedParams<"/files/[...path]">, { readonly path: string[] }>>();
expect<Equal<MatchedParams<"/[[lang]]/help">, { readonly lang?: string }>>();
expect<
	Equal<
		MatchedParams<"/v[major]-[minor]">,
		{ readonly major: string; readonly minor: string }
	>
>();
expect<Equal<MatchedParams<"/">, Record<never, never>>>();

const found = route.match("/users/42");
if (found) {
	expect<Equal<typeof found.locale, "en" | "pt" | undefined>>();
	if (found.name === "users.$user") {
		const user: string = found.params.user;
		expect<Equal<typeof found.pattern, "/users/[user]">>();
		void user;
	}
	if (found.name === "docs") {
		const slug: string[] | undefined = found.params.slug;
		void slug;
	}
	// @ts-expect-error params are narrowed by name: home has no user.
	if (found.name === "home") void found.params.user;
	const query: string | readonly string[] | undefined = found.query.tab;
	void query;
}
const trail: RouteMatch<typeof manifest, "en" | "pt">[] =
	route.breadcrumbs("/users/42");
const active: boolean = route.is("users.$user", "/users/42", {
	exact: false,
	basePath: true,
});
// @ts-expect-error is() only accepts known names.
route.is("missing", "/");
// @ts-expect-error match() takes a path string or URL.
route.match(42);
route.match(new URL("https://example.com/users/1"));
// Localize keeps the generated locale union, including the bound helper.
const localized: string | null = route.localize("/users/42", "pt", {
	sourceLocale: "en",
	includeBasePath: true,
});
const bound: string | null = route.forLocale("pt").localize("/en/users/42");
// @ts-expect-error Unknown target locale.
route.localize("/users/42", "xx");
// @ts-expect-error Unknown source locale.
route.localize("/users/42", "en", { sourceLocale: "xx" });
void [trail, active, localized, bound];
