import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { exportedMethods } from "../dist/endpoint-methods.js";
import { generateRoutes } from "../dist/generator.js";
import { createRoutes } from "../dist/index.js";

async function fixture(t, files) {
	const root = await mkdtemp(join(tmpdir(), "nr-211-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	for (const [file, body] of Object.entries(files)) {
		const dest = join(root, file);
		await mkdir(dirname(dest), { recursive: true });
		await writeFile(dest, body);
	}
	return root;
}

test("public URL has no empty positional parameter and preserves encoding", () => {
	const route = createRoutes(
		{ entrar: "/entrar", show: "/users/[query]" },
		{ basePath: "/cia" },
	);
	assert.equal(route("entrar"), "/entrar");
	assert.equal(route.url("entrar"), "/cia/entrar");
	assert.equal(
		route.url("show", {
			params: { query: "a/b" },
			query: { q: "hello world" },
		}),
		"/cia/users/a%2Fb?q=hello+world",
	);
	assert.equal(route.url("entrar", { basePath: false }), "/entrar");
	assert.throws(() => route.url("show"), /parameter/i);
});

test("opt-in prefix is idempotent, matchable, and preserved in scoped helpers", () => {
	const route = createRoutes(
		{ entrar: "/entrar" },
		{ basePath: "/cia", includeBasePath: true },
	);
	assert.equal(route("entrar"), "/cia/entrar");
	assert.equal(route("entrar", {}, { basePath: true }), "/cia/entrar");
	assert.equal(route("entrar", {}, { basePath: false }), "/entrar");
	assert.equal(route.match("/cia/entrar")?.name, "entrar");
	assert.equal(route.match("/entrar", { basePath: false })?.name, "entrar");
	assert.equal(
		route.withDefaults({ basePath: "/novo" })("entrar"),
		"/novo/entrar",
	);
	assert.equal(route.asset("images/logo.svg"), "/cia/images/logo.svg");
});

test("framework-aware defaults for seven frameworks, both Next routers and manual", async (t) => {
	for (const [framework, file, auto, router] of [
		["next", "app/entrar/page.tsx", false, "app"],
		["next", "pages/entrar.tsx", false, "pages"],
		["nuxt", "app/pages/entrar.vue", false],
		["vue", "src/pages/entrar.vue", false],
		["sveltekit", "src/routes/entrar/+page.svelte", true],
		["astro", "src/pages/entrar.astro", true],
		["react-router", "app/routes/entrar.tsx", false],
		["tanstack-router", "src/routes/entrar.tsx", false],
		["manual", null, true],
	]) {
		const root = await fixture(t, file ? { [file]: "" } : {});
		const options = {
			root,
			framework,
			discovery: "files",
			...(router ? { router } : {}),
			...(file ? {} : { extraRoutes: { entrar: "/entrar" } }),
			defaults: { basePath: "/cia" },
		};
		const generated = await generateRoutes(options);
		const route = createRoutes(generated.routes, generated.defaults);
		assert.equal(route("entrar"), auto ? "/cia/entrar" : "/entrar", framework);
		assert.equal(route.url("entrar"), "/cia/entrar", framework);
		assert.equal(
			createRoutes(generated.routes, generated.defaults).asset("logo.svg"),
			"/cia/logo.svg",
		);
		const override = await generateRoutes({
			...options,
			defaults: { basePath: "/cia", includeBasePath: false },
		});
		assert.equal(
			createRoutes(override.routes, override.defaults)("entrar"),
			"/entrar",
		);
	}
});

test("semantic mode is opt-in, preserves params and comments, and explicit names win", async (t) => {
	const files = Object.fromEntries(
		[
			"app/admin/page.tsx",
			"app/admin/alunos/page.tsx",
			"app/admin/alunos/novo/page.tsx",
			"app/admin/alunos/[aluno]/page.tsx",
		].map((file) => [file, ""]),
	);
	const root = await fixture(t, files);
	const old = await generateRoutes({
		root,
		framework: "next",
		discovery: "files",
	});
	assert.equal(old.routes["admin.alunos.$aluno"], "/admin/alunos/[aluno]");
	const generated = await generateRoutes({
		root,
		framework: "next",
		discovery: "files",
		naming: { style: "semantic" },
		names: { "/admin/alunos/novo": "admin.alunos.create" },
	});
	assert.deepEqual(generated.routes, {
		"admin.alunos.create": "/admin/alunos/novo",
		"admin.alunos.index": "/admin/alunos",
		"admin.alunos.show": "/admin/alunos/[aluno]",
		"admin.index": "/admin",
	});
	assert.equal(
		createRoutes(generated.routes)("admin.alunos.show", { aluno: 7 }),
		"/admin/alunos/7",
	);
	const source = await readFile(generated.output, "utf8");
	assert.match(
		source,
		/"admin\.alunos\.show": "\/admin\/alunos\/\[aluno\]", \/\/ app\/admin\/alunos\/\[aluno\]\/page\.tsx/,
	);
	assert.doesNotMatch(source, /\["admin\.alunos\.show"\]:/);
});

test("static parser ignores comments, strings and type exports, supports aliases", () => {
	const methods = exportedMethods(`// export function DELETE() {}
const text = 'export const PATCH = 1';
export async function GET() { return text; }
const handler = () => null;
export { handler as POST };
type Foo = string;
export type { Foo as PUT };
export const OPTIONS = handler;`);
	assert.deepEqual(methods, ["GET", "POST", "OPTIONS"]);
});

test("method descriptor is public and does not make a request", () => {
	const route = createRoutes(
		{ "api.admin": "/api/admin" },
		{ basePath: "/cia" },
	);
	const post = route.endpoint("api.admin", "POST");
	assert.deepEqual(post(), { method: "POST", url: "/cia/api/admin" });
	assert.throws(() => route.endpoint("api.admin", "INVALID"), /method/i);
});

test("API methods are read in Next App Router, Nuxt, Astro and SvelteKit", async (t) => {
	for (const [framework, files, expected] of [
		[
			"next",
			{
				"app/page.tsx": "",
				"app/api/admin/route.ts":
					"export const GET = () => null; export const POST = () => null;",
			},
			["GET", "POST"],
		],
		[
			"nuxt",
			{
				"app/pages/index.vue": "",
				"server/api/admin.get.ts": "export default 0",
				"server/api/admin.post.ts": "export default 0",
			},
			["GET", "POST"],
		],
		[
			"astro",
			{
				"src/pages/index.astro": "",
				"src/pages/api/admin.ts": "export const DELETE = () => null;",
			},
			["DELETE"],
		],
		[
			"sveltekit",
			{
				"src/routes/+page.svelte": "",
				"src/routes/api/admin/+server.ts": "export async function PATCH() {}",
			},
			["PATCH"],
		],
	]) {
		const root = await fixture(t, files);
		const result = await generateRoutes({
			root,
			framework,
			discovery: "files",
			includeApi: true,
		});
		assert.deepEqual(
			result.entries.find((entry) => entry.name === "api.admin")?.methods,
			expected,
			framework,
		);
		const source = await readFile(result.output, "utf8");
		for (const method of expected)
			assert.ok(
				source.includes(`route.endpoint("api.admin", "${method}")`),
				framework,
			);
	}
});
