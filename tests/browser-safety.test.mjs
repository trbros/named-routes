// The runtime entry ("@triooo/named-routes") must stay safe for browsers:
// no node: modules, no third-party imports and no Node.js globals.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const specifiers = (source) =>
	[
		...source.matchAll(
			/(?:^|[;\s])(?:import|export)\s[^"'`]*?from\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g,
		),
	].map((match) => match[1] ?? match[2]);

test("the runtime import graph contains only relative browser-safe modules", async () => {
	const seen = new Set();
	const queue = [join(pkg, "dist/index.js")];
	while (queue.length) {
		const file = queue.pop();
		if (seen.has(file)) continue;
		seen.add(file);
		for (const specifier of specifiers(await readFile(file, "utf8"))) {
			assert.ok(specifier.startsWith("./"), `${file} imports ${specifier}`);
			queue.push(join(dirname(file), specifier));
		}
	}
	assert.deepEqual(
		[...seen].map((file) => relative(pkg, file).split(sep).join("/")).sort(),
		["dist/asset.js", "dist/index.js", "dist/suggest.js", "dist/url-tools.js"],
	);
});

test("the runtime source compiles without Node.js types", () => {
	const tsc = join(pkg, "node_modules/typescript/bin/tsc");
	const result = spawnSync(
		process.execPath,
		[
			tsc,
			"--ignoreConfig",
			"--noEmit",
			"--strict",
			"--target",
			"ES2022",
			"--lib",
			"es2022,dom",
			"--module",
			"nodenext",
			"--moduleResolution",
			"nodenext",
			"--types",
			"",
			"src/index.ts",
		],
		{ cwd: pkg, encoding: "utf8" },
	);
	assert.equal(result.status, 0, result.stdout + result.stderr);
});
