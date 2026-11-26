import assert from "node:assert/strict";
import test from "node:test";
import { z } from "zod";
import { createRoutes, defineQuery } from "../dist/index.js";

const route = createRoutes(
	{
		home: "/",
		products: "/products",
		about: "/about",
		"users.show": "/users/[id]",
	},
	{
		basePath: "/app",
		origin: "https://example.com",
		i18n: {
			locales: ["en", "pt"],
			defaultLocale: "en",
			localePrefix: "always",
			pathnames: { "/about": { pt: "/sobre" } },
		},
		assetManifest: {
			strict: true,
			files: { "logo.svg": { version: "0123456789ab", size: 64 } },
		},
	},
	{
		query: defineQuery({
			products: z.object({
				page: z.number().int().positive(),
				category: z.string().optional(),
			}),
		}),
	},
);

test("typed asset metadata and versioning are independent of locales", () => {
	assert.equal(
		route.asset("logo.svg", { version: true }),
		"/app/logo.svg?v=0123456789ab",
	);
	assert.equal(
		route.asset("/logo.svg?x=2&v=old#icon", { version: true }),
		"/app/logo.svg?x=2&v=0123456789ab#icon",
	);
	assert.equal(route.forLocale("pt").asset("logo.svg"), "/app/logo.svg");
	assert.deepEqual(route.asset.paths(), ["logo.svg"]);
	assert.equal(route.asset.has("/logo.svg?x=2"), true);
	assert.equal(route.asset.has("Logo.svg"), false);
	assert.deepEqual(route.asset.info("logo.svg"), {
		path: "logo.svg",
		extension: "svg",
		version: "0123456789ab",
		size: 64,
	});
	assert.throws(() => route.asset("missing.svg"), { code: "UNKNOWN_ASSET" });
	assert.throws(
		() => route.asset("https://cdn.example.com/logo.svg", { version: true }),
		{ code: "UNKNOWN_ASSET_VERSION" },
	);
	assert.equal(
		route.asset("https://cdn.example.com/logo.svg"),
		"https://cdn.example.com/logo.svg",
	);
});

test("withQuery preserves filters, repeated values and fragment and validates named query schemas", () => {
	assert.equal(
		route.withQuery(
			"/products?page=1&category=books#list",
			{ page: 2 },
			{ name: "products" },
		),
		"/products?category=books&page=2#list",
	);
	assert.equal(
		route.withQuery("/products?page=2&category=books", { category: null }),
		"/products?page=2",
	);
	assert.equal(
		route.withQuery("/search?tag=a&tag=b&x=1#results", {
			x: undefined,
			tag: ["c", "d"],
		}),
		"/search?x=1&tag=c&tag=d#results",
	);
	assert.throws(
		() =>
			route.withQuery("/products?page=1", { page: 0 }, { name: "products" }),
		{ code: "INVALID_QUERY" },
	);
	assert.throws(
		() => route.withQuery("/about", { page: 1 }, { name: "products" }),
		{ code: "INVALID_QUERY" },
	);
});

test("alternates, canonical and contexts preserve route names, locale and schemas", () => {
	assert.deepEqual(route.alternates("about"), {
		en: "https://example.com/app/en/about",
		pt: "https://example.com/app/pt/sobre",
	});
	assert.equal(
		route.canonical("about", {}, { locale: "pt" }),
		"https://example.com/app/pt/sobre",
	);
	const tenant = route.forLocale("pt").withDefaults({
		origin: "https://tenant.example.com",
		basePath: "/dashboard",
		assetBase: "https://cdn.example.com/public",
	});
	assert.equal(
		tenant("about", {}, { absolute: true }),
		"https://tenant.example.com/dashboard/pt/sobre",
	);
	assert.equal(
		tenant.asset("logo.svg", { version: true }),
		"https://cdn.example.com/public/logo.svg?v=0123456789ab",
	);
	assert.equal(route.asset("logo.svg"), "/app/logo.svg");
	assert.equal(tenant.parseQuery("products", "?page=2").value.page, 2);
	assert.equal(route.localize("/sobre", "en"), "/en/about");
	assert.equal(route.match("/pt/sobre")?.name, "about");
});
