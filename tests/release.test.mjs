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
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
function run(script, env) {
	return spawnSync(process.execPath, [script], {
		encoding: "utf8",
		env: { ...process.env, GITHUB_OUTPUT: "", ...env },
	});
}
test("publication requires an exact version tag and matching prerelease status", () => {
	const script = join(root, "scripts/check-release.mjs");
	const env = {
		RELEASE_TAG: `next-named-routes-v${pkg.version}`,
		RELEASE_PRERELEASE: String(pkg.version.includes("-")),
	};
	const valid = run(script, env);
	assert.equal(valid.status, 0, valid.stderr);
	assert.notEqual(
		run(script, { ...env, RELEASE_TAG: `v${pkg.version}` }).status,
		0,
	);
	assert.notEqual(
		run(script, { ...env, RELEASE_TAG: "next-named-routes-v999.0.0" }).status,
		0,
	);
	assert.notEqual(
		run(script, {
			...env,
			RELEASE_PRERELEASE: String(!pkg.version.includes("-")),
		}).status,
		0,
	);
});
test("publication metadata matches the actual GitHub repository independently of the npm scope", async () => {
	const temp = await mkdtemp(join(tmpdir(), "named-release-"));
	try {
		await mkdir(join(temp, "scripts"));
		const script = join(temp, "scripts/prepare-publish.mjs");
		await copyFile(join(root, "scripts/prepare-publish.mjs"), script);
		await writeFile(join(temp, "package.json"), JSON.stringify(pkg));
		assert.notEqual(run(script, { GITHUB_REPOSITORY: "" }).status, 0);
		const result = run(script, {
			GITHUB_REPOSITORY: "trbros/next-named-routes",
		});
		assert.equal(result.status, 0, result.stderr);
		const prepared = JSON.parse(
			await readFile(join(temp, "package.json"), "utf8"),
		);
		assert.equal(prepared.name, "@triooo/named-routes");
		assert.equal(prepared.version, pkg.version);
		assert.equal(
			prepared.repository.url,
			"git+https://github.com/trbros/next-named-routes.git",
		);
		assert.equal(prepared.repository.directory, undefined);
	} finally {
		await rm(temp, { recursive: true, force: true });
	}
});
