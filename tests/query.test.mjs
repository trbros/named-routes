import assert from "node:assert/strict";
import test from "node:test";
import * as v from "valibot";
import { z } from "zod";
import { createRoutes, defineQuery, NamedRouteError } from "../dist/index.js";

const manifest = { home: "/", products: "/products", search: "/search" };
const queries = defineQuery({
	products: z.object({
		page: z.number().int().min(1).optional(),
		sort: z.enum(["newest", "price"]).optional(),
	}),
	search: v.object({ q: v.pipe(v.string(), v.minLength(1)) }),
});

test("query schemas are type-only by default: URLs are identical and nothing is validated", () => {
	const plain = createRoutes(manifest);
	const typed = createRoutes(
		manifest,
		{},
		{ query: queries, validateQuery: false },
	);
	const query = { page: 0, sort: "oldest" };
	assert.equal(
		typed("products", {}, { query }),
		plain("products", {}, { query }),
	);
	assert.equal(defineQuery(queries), queries);
});

test("Zod and Valibot schemas validate at runtime; the URL keeps the given values in order", () => {
	const route = createRoutes(manifest, {}, { query: queries });
	assert.equal(
		route("products", {}, { query: { sort: "price", page: 2 } }),
		"/products?sort=price&page=2",
	);
	assert.equal(route("products"), "/products");
	assert.equal(
		route("search", {}, { query: { q: "café" } }),
		"/search?q=caf%C3%A9",
	);
	assert.throws(
		() => route("products", {}, { query: { page: 0 } }),
		(caught) => {
			assert.ok(caught instanceof NamedRouteError);
			assert.equal(caught.code, "INVALID_QUERY");
			assert.match(caught.message, /^Invalid query for products: page: /);
			assert.deepEqual(
				{ route: caught.details.route, option: caught.details.option },
				{ route: "products", option: "query" },
			);
			return true;
		},
	);
	assert.throws(() => route("search"), {
		code: "INVALID_QUERY",
		message: /Invalid query for search: q: /,
	});
	assert.throws(() => route("search", {}, { query: { q: "" } }), {
		code: "INVALID_QUERY",
	});
	// Routes without a schema are not validated.
	assert.equal(
		route("home", {}, { query: { anything: true } }),
		"/?anything=true",
	);
});

test("defineQuery.type() never validates and asynchronous schemas are rejected", () => {
	const route = createRoutes(
		manifest,
		{},
		{
			query: defineQuery({
				search: defineQuery.type(),
				products: z.object({ page: z.number() }).refine(async () => true),
			}),
		},
	);
	assert.equal(
		route("search", {}, { query: { anything: 1 } }),
		"/search?anything=1",
	);
	assert.throws(() => route("products", {}, { query: { page: 1 } }), {
		code: "INVALID_QUERY",
		message:
			"The query schema of products is asynchronous; route() is synchronous",
	});
});

test("query schema maps are validated when the helper is created", () => {
	assert.throws(
		() => createRoutes(manifest, {}, { query: { prodcts: queries.products } }),
		{
			code: "INVALID_QUERY",
			message: "Query schema for unknown route: prodcts",
			details: {
				route: "prodcts",
				option: "query",
				hint: 'Did you mean "products"?',
			},
		},
	);
	assert.throws(
		() => createRoutes(manifest, {}, { query: { products: { parse() {} } } }),
		{
			code: "INVALID_QUERY",
			message:
				"Query schema for products is not a Standard Schema or defineQuery.type()",
		},
	);
	assert.throws(() => createRoutes(manifest, {}, { query: [] }), {
		code: "INVALID_QUERY",
	});
	assert.throws(() => createRoutes(manifest, {}, { validateQuery: "yes" }), {
		code: "INVALID_OPTIONS",
	});
	assert.throws(() => createRoutes(manifest, {}, null), {
		code: "INVALID_OPTIONS",
	});
});

test("forLocale helpers keep validating", () => {
	const route = createRoutes(
		manifest,
		{ i18n: { locales: ["en", "pt"], defaultLocale: "en" } },
		{ query: queries },
	);
	assert.equal(
		route.forLocale("pt")("products", {}, { query: { page: 3 } }),
		"/pt/products?page=3",
	);
	assert.throws(
		() => route.forLocale("pt")("products", {}, { query: { page: -1 } }),
		{ code: "INVALID_QUERY" },
	);
});

test("parseQuery parses a URL's query with the route's runtime schema", () => {
	const schemas = defineQuery({
		products: z.object({
			page: z.number().int().min(1).optional(),
			sort: z.enum(["newest", "price"]).optional(),
			tags: z.array(z.string()).optional(),
			ids: z.array(z.number()).optional(),
			draft: z.boolean().optional(),
			q: z.string().optional(),
		}),
		search: defineQuery.type(),
	});
	const route = createRoutes(manifest, {}, { query: schemas });
	assert.deepEqual(
		route.parseQuery("products", "/products?page=2&sort=newest#top"),
		{ ok: true, value: { page: 2, sort: "newest" } },
	);
	// Keys the schema accepts as strings stay strings; others are coerced back
	// the way route() serializes them, and single values become arrays.
	assert.deepEqual(
		route.parseQuery("products", "?q=123&tags=a&ids=1&ids=2&draft=false").value,
		{ q: "123", tags: ["a"], ids: [1, 2], draft: false },
	);
	const href = route(
		"products",
		{},
		{ query: { page: 3, ids: [4, 5], draft: true } },
	);
	assert.deepEqual(route.parseQuery("products", href).value, {
		page: 3,
		ids: [4, 5],
		draft: true,
	});
	for (const input of [
		new URL("https://example.com/products?page=2"),
		new URLSearchParams("page=2"),
		"page=2",
		route.match("/products?page=2").query,
	])
		assert.deepEqual(route.parseQuery("products", input).value, { page: 2 });
	const invalid = route.parseQuery("products", "?page=abc&sort=old");
	assert.equal(invalid.ok, false);
	assert.deepEqual(invalid.issues.map((issue) => issue.path?.[0]).sort(), [
		"page",
		"sort",
	]);
	// No runtime schema: the raw query, repeated keys as arrays.
	assert.deepEqual(route.parseQuery("search", "?q=a&q=b"), {
		ok: true,
		value: { q: ["a", "b"] },
	});
	assert.deepEqual(route.parseQuery("home", "?x=1").value, { x: "1" });
	assert.deepEqual(route.parseQuery("home", "/").value, {});
	// validateQuery: false skips validation in route(), not parsing.
	const unchecked = createRoutes(
		manifest,
		{},
		{ query: schemas, validateQuery: false },
	);
	assert.deepEqual(unchecked.parseQuery("products", "?page=2").value, {
		page: 2,
	});
	assert.throws(() => route.parseQuery("missing", "?a=1"), {
		code: "UNKNOWN_ROUTE",
	});
	assert.throws(() => route.parseQuery("products", 42), {
		code: "INVALID_QUERY",
	});
	assert.throws(() => route.parseQuery("products", { page: 2 }), {
		code: "INVALID_QUERY",
	});
	const async = createRoutes(
		manifest,
		{},
		{
			query: {
				products: {
					"~standard": {
						version: 1,
						vendor: "test",
						validate: async (value) => ({ value }),
					},
				},
			},
			validateQuery: false,
		},
	);
	assert.throws(() => async.parseQuery("products", "?a=1"), {
		code: "INVALID_QUERY",
		message: /asynchronous/,
	});
});
