// Typed query contracts without schema libraries (TypeScript 5.0+).
import {
	createRoutes,
	defineQuery,
	type RouteHrefWithSuffix,
} from "@triooo/named-routes";

type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false;
const expect = <T extends true>(): T => true as T;

const manifest = {
	home: "/",
	search: "/search",
	products: "/products",
	report: "/reports/[id]",
} as const;
const queries = defineQuery({
	search: defineQuery.type<{ q: string; exact?: boolean }>(),
	products: defineQuery.type<{
		page?: number;
		sort?: "newest" | "price";
		tags?: readonly string[];
	}>(),
	report: defineQuery.type<{ format: "pdf" | "csv" }>(),
});
const route = createRoutes<typeof manifest, never, typeof queries>(manifest);
route("products");
route("products", {}, { query: { page: 2, sort: "price", tags: ["a"] } });
route("search", {}, { query: { q: "a" } });
route("report", { id: 1 }, { query: { format: "pdf" } });
route("home", {}, { query: { anything: true } });
// @ts-expect-error Unknown query keys are rejected.
route("products", {}, { query: { pgae: 2 } });
// @ts-expect-error Incompatible values are rejected.
route("products", {}, { query: { sort: "oldest" } });
// @ts-expect-error Required query keys make the query required.
route("search");
// @ts-expect-error Required params and query.
route("report", { id: 1 });

const typed = createRoutes<typeof manifest, never, typeof queries>(manifest, {
	hrefs: "typed",
});
const plain = typed("products");
expect<Equal<typeof plain, "/products">>();
const withQuery = typed("search", {}, { query: { q: "a" } });
expect<Equal<typeof withQuery, RouteHrefWithSuffix<"/search">>>();
// @ts-expect-error Typed hrefs keep the required query.
typed("search");
// @ts-expect-error Typed hrefs keep the required query with empty params.
typed("search", {});
void [plain, withQuery];
