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
