import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import astro from "../dist/astro.js";
import {
	normalizeBasePath,
	readFrameworkBase,
	writeFrameworkBase,
} from "../dist/base-path.js";
import { createRoutes } from "../dist/index.js";
import { withNamedRoutes } from "../dist/next.js";
import nuxt from "../dist/nuxt.js";
import { namedRoutes } from "../dist/vite.js";

const cli = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
async function project(t, framework, page) {
	const root = await mkdtemp(join(tmpdir(), "named-routes-base-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	await writeFile(
		join(root, "package.json"),
		JSON.stringify({ name: "base-fixture", type: "module" }),
	);
	await writeFile(
		join(root, "named-routes.config.mjs"),
		`export default { framework: ${JSON.stringify(framework)}, output: "routes.generated.mjs" };\n`,
	);
	if (page) {
		await mkdir(join(root, page, ".."), { recursive: true });
		await writeFile(join(root, page), "");
	}
	return root;
}
const output = (root) => readFile(join(root, "routes.generated.mjs"), "utf8");
const runCli = (root, ...args) => {
	const result = spawnSync(process.execPath, [cli, ...args], {
		cwd: root,
		encoding: "utf8",
	});
	assert.equal(result.status, 0, result.stderr + result.stdout);
	return result.stdout;
};

test("normalizes router bases and rejects URLs, dynamic and traversal segments", () => {
	assert.equal(normalizeBasePath("/"), "");
	assert.equal(normalizeBasePath("/apps/docs/"), "/apps/docs");
	assert.equal(normalizeBasePath(undefined), undefined);
	for (const base of [
		"//evil.example",
		"https://evil.example/a",
		"./",
		"/../a",
		"/a/[id]",
		"/a?x=1",
		"/a//b",
	]) {
		assert.throws(() => normalizeBasePath(base), { code: "INVALID_BASE_PATH" });
	}
});

test("Next integration and CLI preserve base changes and removal without double prefix", async (t) => {
	const root = await project(t, "next", "app/about/page.tsx");
	const configure = (basePath) =>
		withNamedRoutes({ basePath }, { root, watch: false })(
			"phase-production-build",
			{ defaultConfig: {} },
		);
	await configure("/admin");
	assert.match(await output(root), /"basePath": "\/admin"/);
	runCli(root, "check");
	await configure("/new");
	runCli(root, "generate");
	assert.match(await output(root), /"basePath": "\/new"/);
	await configure(undefined);
	runCli(root, "check");
	assert.doesNotMatch(await output(root), /"basePath":/);
	runCli(root, "generate", "--base-path", "/override/");
	assert.match(await output(root), /"basePath": "\/override"/);
});

test("Astro uses final framework config instead of the Vite asset base", async (t) => {
	const root = await project(t, "astro", "src/pages/about.astro");
	let plugin;
	const integration = astro({ root });
	integration.hooks["astro:config:setup"]({
		config: { root: pathToFileURL(`${root}/`), base: "/initial" },
		updateConfig: (config) => {
			[plugin] = config.vite.plugins;
		},
	});
	integration.hooks["astro:config:done"]({ config: { base: "/docs/" } });
	plugin.configResolved({ root, base: "https://cdn.example/assets/" });
	await plugin.buildStart();
	assert.match(await output(root), /"basePath": "\/docs"/);
	runCli(root, "check");
});

test("Nuxt inherits app.baseURL and updates its CLI snapshot", async (t) => {
	const root = await project(t, "nuxt", "pages/about.vue");
	const hooks = new Map();
	const instance = {
		options: {
			rootDir: root,
			buildDir: join(root, ".nuxt"),
			app: { baseURL: "/portal/" },
		},
		hook(name, handler) {
			hooks.set(name, handler);
		},
	};
	await nuxt(undefined, instance);
	await hooks.get("pages:resolved")([
		{ name: "about", path: "/about", file: join(root, "pages/about.vue") },
	]);
	assert.match(await output(root), /"basePath": "\/portal"/);
	runCli(root, "check");
	instance.options.app.baseURL = "/";
	await hooks.get("pages:resolved")([
		{ name: "about", path: "/about", file: join(root, "pages/about.vue") },
	]);
	assert.match(await output(root), /"basePath": ""/);
	runCli(root, "check");
});

test("other Vite routers use explicit navigation base, not CDN base", async (t) => {
	for (const [framework, page] of [
		["vue", "src/pages/about.vue"],
		["sveltekit", "src/routes/about/+page.svelte"],
		["react-router", "app/routes/about.tsx"],
		["tanstack-router", "src/routes/about.tsx"],
	]) {
		const root = await project(t, framework, page);
		const plugin = namedRoutes({
			root,
			framework,
			routerBase: "/app/",
			discovery: "files",
		});
		// Force identical discovery for the standalone CLI.
		await writeFile(
			join(root, "named-routes.config.mjs"),
			`export default { framework: ${JSON.stringify(framework)}, output: "routes.generated.mjs", discovery: "files" };\n`,
		);
		plugin.configResolved({ root, base: "https://cdn.example/assets/" });
		await plugin.buildStart();
		assert.match(await output(root), /"basePath": "\/app"/);
		runCli(root, "check");
	}
});

test("Vite base is opt-in and explicit defaults override the inherited value", async (t) => {
	const root = await project(t, "astro", "src/pages/about.astro");
	let plugin = namedRoutes({ root, framework: "astro" });
	plugin.configResolved({ root, base: "/assets/" });
	await plugin.buildStart();
	assert.doesNotMatch(await output(root), /"basePath":/);
	plugin = namedRoutes({ root, framework: "astro", inheritViteBase: true });
	plugin.configResolved({ root, base: "/docs/" });
	await plugin.buildStart();
	assert.match(await output(root), /"basePath": "\/docs"/);
	plugin = namedRoutes({
		root,
		framework: "astro",
		routerBase: "/wrong",
		defaults: { basePath: "/explicit" },
	});
	plugin.configResolved({ root, base: "/assets/" });
	await plugin.buildStart();
	assert.match(await output(root), /"basePath": "\/explicit"/);
});

test("framework snapshots are scoped by framework and preserve explicit empty base", async (t) => {
	const root = await project(t, "next");
	await writeFrameworkBase(root, "next", "/app");
	assert.equal(await readFrameworkBase(root, "next"), "/app");
	assert.equal(await readFrameworkBase(root, "astro"), undefined);
	await writeFrameworkBase(root, "next", "");
	assert.equal(await readFrameworkBase(root, "next"), "");
	await writeFrameworkBase(root, "next", undefined);
	assert.equal(await readFrameworkBase(root, "next"), undefined);
});

const localized = () =>
	createRoutes(
		{
			home: "/",
			about: "/about",
			"products.$id": "/products/[id]",
			"docs.$slug": "/docs/[...slug]",
			"api.health": "/api/health",
			$slug: "/[slug]",
		},
		{
			basePath: "/app",
			i18n: {
				locales: ["pt", "en", "es"],
				defaultLocale: "pt",
				localePrefix: "always",
				unlocalized: ["api.health"],
				pathnames: {
					"/about": { pt: "/sobre", es: "/acerca" },
					"/products/[id]": { pt: "/produtos/[id]", es: "/productos/[id]" },
					"/docs/[...slug]": { pt: "/documentos/[...slug]" },
				},
			},
		},
	);

test("localizes aliases without prefixes and prefers static paths over dynamic matches", () => {
	const route = localized();
	assert.equal(route.localize("/sobre", "en"), "/en/about");
	assert.equal(route.localize("/pt/sobre", "en"), "/en/about");
	assert.equal(route.localize("/en/about", "en"), "/en/about");
	assert.equal(route.localize("/en/sobre", "en"), "/en/about");
	assert.equal(route.forLocale("en").localize("/acerca"), "/en/about");
	assert.equal(route("about"), "/about");
	assert.equal(route("about", {}, { basePath: true }), "/app/about");
});

test("localize preserves encoded params, query order, hash and base", () => {
	const route = localized();
	assert.equal(
		route.localize("/app/productos/a%2Fb?x=1&y=2&x=3#A%20B", "en", {
			basePath: true,
		}),
		"/app/en/products/a%2Fb?x=1&y=2&x=3#A%20B",
	);
	assert.equal(route.localize("/documentos/a/b", "en"), "/en/docs/a/b");
	assert.equal(
		route.localize("/sobre", "en", { includeBasePath: true }),
		"/app/en/about",
	);
	assert.equal(
		route.localize("/app/sobre", "en", {
			basePath: true,
			includeBasePath: false,
		}),
		"/en/about",
	);
	assert.equal(route.localize("/api/health", "en"), null);
	assert.equal(route.localize("//evil.example/sobre", "en"), null);
	assert.equal(route.localize("https://evil.example/sobre", "en"), null);
	assert.equal(route.localize("/%ZZ", "en"), null);
	assert.equal(route.localize("/unknown/path", "en"), null);
});

test("ambiguous aliases return null unless the source locale disambiguates", () => {
	const route = createRoutes(
		{ a: "/a", b: "/b" },
		{
			i18n: {
				locales: ["en", "pt"],
				defaultLocale: "en",
				pathnames: { "/a": { en: "/same" }, "/b": { pt: "/same" } },
			},
		},
	);
	assert.equal(route.localize("/same", "en"), null);
	assert.equal(route.localize("/pt/same", "en"), "/en/b");
	assert.equal(route.localize("/same", "en", { sourceLocale: "pt" }), "/en/b");
});

test("custom prefixes and prefix modes are respected", () => {
	for (const [localePrefix, expected] of [
		["never", "/about"],
		["as-needed", "/about"],
		[{ mode: "always", prefixes: { en: "/us/en", pt: "/br" } }, "/us/en/about"],
	]) {
		const route = createRoutes(
			{ about: "/about" },
			{
				i18n: {
					locales: ["en", "pt"],
					defaultLocale: "en",
					localePrefix,
					pathnames: { "/about": { pt: "/sobre" } },
				},
			},
		);
		assert.equal(route.localize("/sobre", "en"), expected);
	}
});

test("localize can build an absolute locale domain and skips query schema revalidation", () => {
	const route = createRoutes(
		{ about: "/about" },
		{
			i18n: {
				locales: ["en", "pt"],
				defaultLocale: "pt",
				localePrefix: "as-needed",
				domains: [
					{ domain: "example.com", defaultLocale: "en" },
					{ domain: "example.br", defaultLocale: "pt" },
				],
				pathnames: { "/about": { pt: "/sobre" } },
			},
		},
		{
			query: {
				about: {
					"~standard": {
						version: 1,
						vendor: "test",
						validate: () => ({ issues: [{ message: "invalid" }] }),
					},
				},
			},
		},
	);
	assert.equal(
		route.localize("https://example.br/sobre?x=1", "en", { absolute: true }),
		"https://example.com/about?x=1",
	);
});
