import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	copyFile,
	mkdir,
	mkdtemp,
	readFile,
	realpath,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const entry = join(root, manifest.bin["named-routes"]);

function run(file, args, cwd) {
	return spawnSync(process.execPath, [file, ...args], {
		cwd,
		encoding: "utf8",
		timeout: 30000,
	});
}

test("published CLI target is a stable source launcher, not a build artifact", async () => {
	assert.equal(manifest.bin["named-routes"], "bin/named-routes.js");
	assert.ok(manifest.files.includes("bin"));
	assert.match(await readFile(entry, "utf8"), /^#!\/usr\/bin\/env node\r?\n/);
});

test("launcher resolves CLI beside itself, preserving cwd and arguments", async (t) => {
	const temporary = await mkdtemp(join(tmpdir(), "named routes cli "));
	t.after(() => rm(temporary, { recursive: true, force: true }));
	const installed = join(temporary, "node_modules", "@triooo", "named-routes");
	const project = join(temporary, "consumer app");
	await mkdir(join(installed, "bin"), { recursive: true });
	await mkdir(join(installed, "dist"), { recursive: true });
	await mkdir(project);
	await writeFile(join(installed, "package.json"), '{"type":"module"}');
	const launcher = join(installed, "bin", "named-routes.js");
	await copyFile(entry, launcher);
	await writeFile(
		join(installed, "dist", "cli.js"),
		"console.log(JSON.stringify({ cwd: process.cwd(), args: process.argv.slice(2) }));\n",
	);
	const result = run(launcher, ["list", "--root", "another project"], project);
	assert.equal(result.status, 0, result.stderr);
	const output = JSON.parse(result.stdout);
	assert.deepEqual(output.args, ["list", "--root", "another project"]);
	// On some OSes tmpdir resolves through a symbolic link.
	assert.equal(output.cwd, await realpath(project));
	await rm(join(installed, "dist", "cli.js"));
	const missing = run(launcher, ["list"], project);
	assert.equal(missing.status, 1, missing.stderr);
	assert.match(missing.stderr, /Named Routes CLI build is missing/);
	assert.doesNotMatch(missing.stderr, /MODULE_NOT_FOUND/);
});

test("built launcher reports package version from a different working directory", async (t) => {
	const temporary = await mkdtemp(join(tmpdir(), "named-routes-cli-cwd-"));
	t.after(() => rm(temporary, { recursive: true, force: true }));
	const result = run(entry, ["--version"], temporary);
	assert.equal(result.status, 0, result.stderr);
	assert.equal(result.stdout.trim(), manifest.version);
});
