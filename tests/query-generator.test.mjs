import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	mkdir,
	mkdtemp,
	readFile,
	realpath,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { generateRoutes } from "../dist/generator.js";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tsc = join(pkg, "node_modules/typescript/bin/tsc");
const querySource = `import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
export default defineQuery({
  products: z.object({ page: z.number().int().min(1).optional(), sort: z.enum(["newest", "price"]).optional() }),
  search: defineQuery.type<{ q: string }>(),
});
`;
const usage = `import { route } from "./routes.generated.js";
route("products", {}, { query: { page: 2, sort: "newest" } });
route("search", {}, { query: { q: "shoes" } });
route("home", {}, { query: { anything: 1 } });
// @ts-expect-error unknown key
route("products", {}, { query: { pgae: 2 } });
// @ts-expect-error required query
route("search");
`;
async function project(t) {
	const root = await mkdtemp(join(tmpdir(), "named-query-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	await writeFile(
		join(root, "package.json"),
		JSON.stringify({ type: "module", dependencies: { next: "16" } }),
	);
	for (const page of [
		"app/page.tsx",
		"app/products/page.tsx",
		"app/search/page.tsx",
	]) {
		await mkdir(join(root, dirname(page)), { recursive: true });
		await writeFile(
			join(root, page),
			"export default function Page(){return null}",
		);
	}
	await mkdir(join(root, "src"), { recursive: true });
	await writeFile(join(root, "src/route-query.ts"), querySource);
	await writeFile(join(root, "src/use.ts"), usage);
	await mkdir(join(root, "node_modules/@triooo"), { recursive: true });
	// Junctions need no privileges on Windows; elsewhere "junction" means "dir".
	const link = process.platform === "win32" ? "junction" : "dir";
	await symlink(pkg, join(root, "node_modules/@triooo/named-routes"), link);
	await symlink(
		await realpath(join(pkg, "node_modules/zod")),
		join(root, "node_modules/zod"),
		link,
	);
	await writeFile(
		join(root, "tsconfig.json"),
		JSON.stringify({
			compilerOptions: {
				target: "ES2022",
				module: "NodeNext",
				moduleResolution: "NodeNext",
				strict: true,
				noEmit: true,
				skipLibCheck: true,
			},
			include: ["src"],
		}),
	);
	return root;
}
const typecheck = (root) =>
	spawnSync(process.execPath, [tsc, "-p", "tsconfig.json"], {
		cwd: root,
		encoding: "utf8",
	});

test("query schemas are imported as types only and checked by the real compiler", async (t) => {
	const root = await project(t);
	const result = await generateRoutes({ root, query: "src/route-query.ts" });
	const content = await readFile(result.output, "utf8");
	assert.match(
		content,
		/^import type \$routeQueries from "\.\/route-query\.js";$/m,
	);
	assert.match(
		content,
		/createRoutes<typeof routes, never, typeof \$routeQueries>\(routes, \{\}\);/,
	);
	const checked = typecheck(root);
	assert.equal(checked.status, 0, checked.stdout + checked.stderr);
	// The module has no runtime import of the schemas: zod is not bundled.
	assert.doesNotMatch(content, /^import \$routeQueries/m);
});

test("validateQuery imports the schemas and validates at runtime", async (t) => {
	const root = await project(t);
	const result = await generateRoutes({
		root,
		query: "src/route-query.ts",
		validateQuery: true,
		output: "src/routes.generated.ts",
	});
	const content = await readFile(result.output, "utf8");
	assert.match(content, /^import \$routeQueries from "\.\/route-query\.js";$/m);
	assert.match(
		content,
		/createRoutes\(routes, \{\}, \{ query: \$routeQueries, validateQuery: true \}\);/,
	);
	const checked = typecheck(root);
	assert.equal(checked.status, 0, checked.stdout + checked.stderr);
	// A JavaScript output imports the schema module as a value and validates when executed.
	const js = await generateRoutes({
		root,
		query: "src/route-query.mjs",
		validateQuery: true,
		output: "src/routes.generated.mjs",
	}).catch((caught) => caught);
	assert.equal(js.code, "INVALID_CONFIG");
	assert.match(js.message, /Query module not found: src\/route-query\.mjs/);
	await writeFile(
		join(root, "src/route-query.mjs"),
		'import { defineQuery } from "@triooo/named-routes";\nimport { z } from "zod";\nexport default defineQuery({ products: z.object({ page: z.number().min(1).optional() }) });\n',
	);
	await generateRoutes({
		root,
		query: "src/route-query.mjs",
		validateQuery: true,
		output: "src/routes.generated.mjs",
	});
	const { route } = await import(
		pathToFileURL(join(root, "src/routes.generated.mjs")).href
	);
	assert.equal(
		route("products", {}, { query: { page: 2 } }),
		"/products?page=2",
	);
	assert.throws(() => route("products", {}, { query: { page: 0 } }), {
		code: "INVALID_QUERY",
	});
});

test("query options are validated", async (t) => {
	const root = await project(t);
	await assert.rejects(generateRoutes({ root, validateQuery: true }), {
		code: "INVALID_CONFIG",
		message: "validateQuery needs the query option",
	});
	await assert.rejects(
		generateRoutes({ root, query: "src/route-query.json" }),
		{ code: "INVALID_CONFIG" },
	);
	await assert.rejects(generateRoutes({ root, query: "src/missing.ts" }), {
		code: "INVALID_CONFIG",
		details: {
			option: "query",
			file: "src/missing.ts",
			hint: "Create it with export default defineQuery({ ... }) or fix the path.",
		},
	});
	// Without query, the output is byte-identical to 1.0.
	const plain = await generateRoutes({ root, output: "src/plain.ts" });
	assert.doesNotMatch(await readFile(plain.output, "utf8"), /routeQueries/);
});
