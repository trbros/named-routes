import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	copyFile,
	mkdir,
	mkdtemp,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("both launchers dispatch without loading the runtime or MCP dependencies prematurely", async () => {
	const fixture = await mkdtemp(join(tmpdir(), "named routes MCP launcher "));
	try {
		for (const dir of ["bin", "dist", "mcp/bin"])
			await mkdir(join(fixture, dir), { recursive: true });
		for (const name of ["named-routes.js", "named-routes-mcp.js"])
			await copyFile(new URL(`bin/${name}`, root), join(fixture, "bin", name));
		const manifest = JSON.parse(
			await readFile(new URL("package.json", root), "utf8"),
		);
		await writeFile(
			join(fixture, "package.json"),
			JSON.stringify({ type: "module", version: manifest.version }),
		);
		const run = (name, args) =>
			spawnSync(process.execPath, [join(fixture, "bin", name), ...args], {
				cwd: tmpdir(),
				encoding: "utf8",
				timeout: 10000,
			});
		await writeFile(
			join(fixture, "dist/cli.js"),
			"console.log(JSON.stringify(process.argv.slice(2)));",
		);
		const cli = run("named-routes.js", ["list", "--root", "a project"]);
		assert.equal(cli.status, 0, cli.stderr);
		assert.deepEqual(JSON.parse(cli.stdout), ["list", "--root", "a project"]);
		for (const [name, args] of [
			["named-routes.js", ["mcp"]],
			["named-routes-mcp.js", []],
		]) {
			const help = run(name, [...args, "--help"]);
			assert.equal(help.status, 0, help.stderr);
			assert.match(help.stdout, /--manifest/);
			const version = run(name, [...args, "--version"]);
			assert.equal(version.stdout.trim(), manifest.version);
			const missing = run(name, args);
			assert.notEqual(missing.status, 0);
			assert.equal(missing.stdout, "");
			assert.match(missing.stderr, /MCP/);
		}
		await writeFile(
			join(fixture, "mcp/bin/named-routes-mcp.js"),
			"console.log(JSON.stringify(process.argv.slice(2)));",
		);
		for (const [name, args] of [
			["named-routes.js", ["mcp"]],
			["named-routes-mcp.js", []],
		]) {
			const result = run(name, [...args, "--root", "a project"]);
			assert.equal(result.status, 0, result.stderr);
			assert.deepEqual(JSON.parse(result.stdout), ["--root", "a project"]);
		}
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
