import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { z } from "zod";
import { generateRoutes } from "../dist/generator.js";
import { createRoutes, defineQuery, NamedRouteError } from "../dist/index.js";

const i18n = {
	locales: ["en", "pt"],
	defaultLocale: "pt",
	localePrefix: "always",
	pathnames: { "/about": { pt: "/sobre" } },
};
test("asset, route, localize, match and typed query share one helper", () => {
	const route = createRoutes(
		{ about: "/about", products: "/products" },
		{
			basePath: "/app",
			origin: "https://example.com",
			trailingSlash: false,
			i18n,
		},
		{
			query: defineQuery({
				products: z.object({ page: z.number().int().positive() }),
			}),
		},
	);
	assert.equal(route.asset("logo.svg"), "/app/logo.svg");
	assert.equal(route.forLocale("en").asset("logo.svg"), "/app/logo.svg");
	assert.equal(route("about"), "/about");
	assert.equal(
		route.localize("/app/sobre?x=1#top", "en", { basePath: true }),
		"/app/en/about?x=1#top",
	);
	assert.equal(route.match("/app/en/about", { basePath: true })?.name, "about");
	assert.equal(
		route("products", {}, { query: { page: 2 } }),
		"/products?page=2",
	);
	assert.deepEqual(route.parseQuery("products", "?page=2"), {
		ok: true,
		value: { page: 2 },
	});
	assert.equal(route.parseQuery("products", "?page=0").ok, false);
	assert.throws(
		() => route.asset("../secret"),
		(error) =>
			error instanceof NamedRouteError && error.code === "INVALID_ASSET",
	);
	assert.throws(() => createRoutes({}, { assetBase: "javascript:alert(1)" }), {
		code: "INVALID_ASSET_BASE",
	});
});

test("generated JS exports the asset helper with CDN, custom names and stable output", async (t) => {
	const root = await mkdtemp(join(tmpdir(), "named-routes-assets-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	await writeFile(join(root, "package.json"), '{"type":"module"}');
	const options = {
		root,
		framework: "manual",
		extraRoutes: { about: "/about" },
		defaults: {
			basePath: "/app",
			assetBase: "https://cdn.example.com/public/",
		},
		output: "routes.mjs",
		importSource: new URL("../dist/index.js", import.meta.url).href,
		exportNames: { route: "url", asset: "publicAsset" },
	};
	const first = await generateRoutes(options);
	const mod = await import(pathToFileURL(first.output).href);
	assert.equal(
		mod.publicAsset("logo.svg"),
		"https://cdn.example.com/public/logo.svg",
	);
	assert.equal(mod.publicAsset, mod.url.asset);
	assert.equal(mod.url("about", {}, { basePath: true }), "/app/about");
	assert.equal((await generateRoutes(options)).changed, false);
	const ts = await generateRoutes({
		...options,
		output: "routes.ts",
		exportNames: undefined,
	});
	assert.match(
		await readFile(ts.output, "utf8"),
		/export const asset = route\.asset;/,
	);
	const collision = await generateRoutes({
		...options,
		output: "collision.mjs",
		exportNames: { route: "asset" },
	});
	assert.match(
		await readFile(collision.output, "utf8"),
		/export const \$asset = asset\.asset;/,
	);
	await assert.rejects(
		() => generateRoutes({ ...options, exportNames: { asset: "routes" } }),
		{ code: "INVALID_CONFIG" },
	);
});

// Exercise the actual generator for every adapter with a non-root deployment.
// The browser suite separately checks the real framework servers and SVG decoding.
test("all generator adapters serialize independent public and router bases", async (t) => {
	const fixtures = [
		["next", "app/about/page.tsx"],
		["nuxt", "app/pages/about.vue"],
		["vue", "src/pages/about.vue"],
		["sveltekit", "src/routes/about/+page.svelte"],
		["astro", "src/pages/about.astro"],
		["react-router", "app/routes/about.tsx"],
		["tanstack-router", "src/routes/about.tsx"],
		["manual", null],
	];
	for (const [framework, file] of fixtures) {
		await t.test(framework, async (child) => {
			const root = await mkdtemp(join(tmpdir(), "nr-public-adapter-"));
			child.after(() => rm(root, { recursive: true, force: true }));
			await writeFile(join(root, "package.json"), '{"type":"module"}');
			if (file) {
				await mkdir(join(root, file, ".."), { recursive: true });
				await writeFile(join(root, file), "");
			}
			const options = {
				root,
				framework,
				discovery: "files",
				...(file ? {} : { extraRoutes: { about: "/about" } }),
				output: "routes.mjs",
				importSource: new URL("../dist/index.js", import.meta.url).href,
				defaults: { basePath: "/app" },
			};
			const first = await generateRoutes(options);
			const standard = await import(pathToFileURL(first.output).href);
			assert.equal(standard.asset("logo.svg"), "/app/logo.svg");
			const automaticBase = ["astro", "sveltekit", "manual"].includes(
				framework,
			);

			assert.equal(
				standard.route("about"),
				automaticBase ? "/app/about" : "/about",
			);
			assert.equal(
				standard.route("about", {}, { basePath: true }),
				"/app/about",
			);

			// Public URLs always include the configured base.
			assert.equal(standard.route.url("about"), "/app/about");

			// Explicitly disabling the base returns the internal path.
			assert.equal(standard.route("about", {}, { basePath: false }), "/about");

			// Explicitly enabling the base must not duplicate it.
			assert.equal(
				standard.route("about", {}, { basePath: true }),
				"/app/about",
			);

			const second = await generateRoutes({
				...options,
				output: "cdn.mjs",
				defaults: {
					basePath: "/app",
					assetBase: "https://cdn.example.com/public",
				},
			});
			const cdn = await import(pathToFileURL(second.output).href);
			assert.equal(
				cdn.asset("logo.svg"),
				"https://cdn.example.com/public/logo.svg",
			);
			assert.equal(cdn.route("about", {}, { basePath: true }), "/app/about");
		});
	}
});
