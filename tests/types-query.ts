// Type contracts for per-route query schemas (Standard Schema and type-only).
import {
	createRoutes,
	defineQuery,
	type QueryInput,
	type RouteHrefWithSuffix,
} from "@triooo/named-routes";
import * as v from "valibot";
import { z } from "zod";

type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false;
const expect = <T extends true>(): T => true as T;

const manifest = {
	home: "/",
	products: "/products",
	search: "/search",
	"posts.$post": "/posts/[post]",
	report: "/reports/[id]",
} as const;

const queries = defineQuery({
	products: z.object({
		page: z.number().int().min(1).optional(),
		sort: z.enum(["newest", "price"]).optional(),
		tags: z.array(z.string()).optional(),
	}),
	"posts.$post": v.object({
		tab: v.optional(v.picklist(["comments", "history"])),
	}),
	search: defineQuery.type<{ q: string; exact?: boolean }>(),
	report: defineQuery.type<{ format: "pdf" | "csv" }>(),
});
expect<
	Equal<QueryInput<typeof queries.search>, { q: string; exact?: boolean }>
>();

// ---------------------------------------------- type-only (explicit type arguments)
const route = createRoutes<typeof manifest, never, typeof queries>(manifest);
route("products");
route("products", {}, { query: { page: 2, sort: "newest", tags: ["a", "b"] } });
route("posts.$post", { post: 1 }, { query: { tab: "comments" } });
route("search", {}, { query: { q: "shoes" } });
route("search", {}, { query: { q: "shoes", exact: true }, hash: "results" });
route("report", { id: 7 }, { query: { format: "csv" } });
// Routes without a schema keep the loose 1.0 query.
route("home", {}, { query: { anything: 1, list: ["x"] } });

// @ts-expect-error Unknown query keys are rejected when a schema exists.
route("products", {}, { query: { pgae: 2 } });
// @ts-expect-error Incompatible values are rejected.
route("products", {}, { query: { sort: "oldest" } });
// @ts-expect-error Numbers are numbers.
route("products", {}, { query: { page: "2" } });
// @ts-expect-error Valibot schemas are checked too.
route("posts.$post", { post: 1 }, { query: { tab: "likes" } });
// @ts-expect-error A required query key makes the query required.
route("search");
// @ts-expect-error A required query key cannot be omitted.
route("search", {}, { query: {} });
// @ts-expect-error Required query with required params: both are needed.
route("report", { id: 7 });
// @ts-expect-error Path parameters still cannot go in the query by mistake.
route("posts.$post", {}, { query: { tab: "comments" } });

// ---------------------------------------------- inferred from runtime schemas
const validated = createRoutes(manifest, {}, { query: queries });
validated("products", {}, { query: { page: 1 } });
// @ts-expect-error Inferred schemas reject unknown keys as well.
validated("products", {}, { query: { color: "red" } });

// ---------------------------------------------- typed hrefs + typed query
const typed = createRoutes<typeof manifest, never, typeof queries>(manifest, {
	hrefs: "typed",
});
const productsHref = typed("products", {}, { query: { page: 2 } });
expect<Equal<typeof productsHref, RouteHrefWithSuffix<"/products">>>();
const plainProducts = typed("products");
expect<Equal<typeof plainProducts, "/products">>();
const searchHref = typed("search", {}, { query: { q: "a" } });
expect<Equal<typeof searchHref, RouteHrefWithSuffix<"/search">>>();
// @ts-expect-error Typed hrefs keep the query contract.
typed("search");
// @ts-expect-error Typed hrefs reject unknown keys.
typed("products", {}, { query: { pgae: 2 } });

// ---------------------------------------------- schema keys must be route names
const misspelled = defineQuery({
	prodcts: defineQuery.type<{ page?: number }>(),
});
// @ts-expect-error "prodcts" is not a route name.
createRoutes<typeof manifest, never, typeof misspelled>(manifest);
// @ts-expect-error Query schemas must accept serializable values only.
defineQuery({ products: defineQuery.type<{ filter: { nested: true } }>() });

// Bound helpers keep the query contract.
const bound = createRoutes<typeof manifest, "en" | "pt", typeof queries>(
	manifest,
	{
		i18n: { locales: ["en", "pt"], defaultLocale: "en" },
	},
).forLocale("pt");
bound("products", {}, { query: { sort: "price" } });
// @ts-expect-error forLocale() helpers reject unknown keys too.
bound("products", {}, { query: { pgae: 1 } });

void [productsHref, plainProducts, searchHref, validated];
