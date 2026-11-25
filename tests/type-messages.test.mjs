// The wording of type errors users hit most often. `@ts-expect-error` in the
// type contracts only proves that a call fails; these tests check what
// TypeScript says about it.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);

async function typeErrors(t, source) {
	// Inside the repository so that the fixture resolves ../dist like a consumer.
	const cache = join(root, "node_modules/.cache");
	await mkdir(cache, { recursive: true });
	const directory = await mkdtemp(join(cache, "type-messages-"));
	t.after(() => rm(directory, { recursive: true, force: true }));
	const index = join(root, "dist/index.js").replaceAll("\\", "/");
	await writeFile(
		join(directory, "fixture.ts"),
		source.replace("@named-routes", index),
	);
	await writeFile(
		join(directory, "tsconfig.json"),
		JSON.stringify({
			compilerOptions: {
				target: "ES2022",
				module: "NodeNext",
				moduleResolution: "NodeNext",
				strict: true,
				noEmit: true,
				types: [],
			},
			files: ["fixture.ts"],
		}),
	);
	const manifestPath = require.resolve("typescript/package.json");
	const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
	const tsc = join(
		dirname(manifestPath),
		typeof manifest.bin === "string" ? manifest.bin : manifest.bin.tsc,
	);
	const result = spawnSync(
		process.execPath,
		[tsc, "--project", directory, "--pretty", "false"],
		{ cwd: directory, encoding: "utf8" },
	);
	const output = `${result.stdout}${result.stderr}`;
	// One entry per reported line: "fixture.ts(5,7): error TS2345: ..." plus its detail lines.
	const errors = new Map();
	let current;
	for (const line of output.split(/\r?\n/)) {
		const head = /^fixture\.ts\((\d+),\d+\): error /.exec(line);
		if (head) {
			current = Number(head[1]);
			errors.set(current, line);
		} else if (current && line.trim())
			errors.set(current, `${errors.get(current)}\n${line}`);
	}
	return errors;
}

test("typed hrefs name the missing required query", async (t) => {
	const errors = await typeErrors(
		t,
		`import { createRoutes, defineQuery } from "@named-routes";
const queries = defineQuery({ search: defineQuery.type<{ q: string }>(), find: defineQuery.type<{ q: string }>() });
const routes = { search: "/search", find: "/find/[kind]", "users.$user": "/users/[user]" } as const;
const route = createRoutes<typeof routes, never, typeof queries>(routes, { hrefs: "typed" });
route("search");
route("search", {});
route("find", { kind: "shoes" });
route("users.$user");
route("search", {}, { query: { q: "shoes" } });
`,
	);
	for (const line of [5, 6, 7])
		assert.match(
			errors.get(line) ?? "",
			/QueryIsRequired<"(search|find)">/,
			`line ${line}:\n${errors.get(line)}`,
		);
	// Unrelated errors keep their usual wording.
	assert.match(errors.get(8) ?? "", /Expected 2-3 arguments, but got 1/);
	assert.equal(errors.has(9), false, errors.get(9));
	assert.equal(errors.size, 4, [...errors.values()].join("\n"));
});
