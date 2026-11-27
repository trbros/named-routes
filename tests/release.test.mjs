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
test("publication requires an exact version tag", () => {
	const script = join(root, "scripts/check-release.mjs");
	const env = { RELEASE_TAG: `named-routes-v${pkg.version}` };
	const valid = run(script, env);
	assert.equal(valid.status, 0, valid.stderr);
	assert.notEqual(
		run(script, { ...env, RELEASE_TAG: `v${pkg.version}` }).status,
		0,
	);
	assert.notEqual(
		run(script, { ...env, RELEASE_TAG: "named-routes-v999.0.0" }).status,
		0,
	);
});
test("publication derives the dist-tag and notes from the version and CHANGELOG", async () => {
	const temp = await mkdtemp(join(tmpdir(), "named-release-"));
	try {
		await mkdir(join(temp, "scripts"));
		const script = join(temp, "scripts/check-release.mjs");
		await copyFile(join(root, "scripts/check-release.mjs"), script);
		const output = join(temp, "github-output");
		const notesFile = join(temp, "notes.md");
		const release = async (version, changelog) => {
			await writeFile(
				join(temp, "package.json"),
				JSON.stringify({ ...pkg, version }),
			);
			await writeFile(join(temp, "CHANGELOG.md"), changelog);
			await writeFile(output, "");
			return run(script, {
				RELEASE_TAG: `named-routes-v${version}`,
				RELEASE_NOTES_FILE: notesFile,
				GITHUB_OUTPUT: output,
			});
		};

		const stable = await release(
			"3.0.0",
			"# Changelog\n\n## Unreleased\n\n## 3.0.0 - 2026-12-01\r\n\r\n- Stable notes.\r\n\r\n## 2.0.0 - 2026-11-25\n\n- Old.\n",
		);
		assert.equal(stable.status, 0, stable.stderr);
		assert.equal(await readFile(notesFile, "utf8"), "- Stable notes.\n");
		assert.match(
			await readFile(output, "utf8"),
			/dist_tag=latest\nprerelease=false\n/,
		);

		const next = await release(
			"3.1.0-beta.1",
			"# Changelog\n\n## 3.1.0-beta.1 - 2026-12-02\n\n- Beta notes.\n",
		);
		assert.equal(next.status, 0, next.stderr);
		assert.equal(await readFile(notesFile, "utf8"), "- Beta notes.\n");
		assert.match(
			await readFile(output, "utf8"),
			/dist_tag=next\nprerelease=true\n/,
		);

		const missing = await release(
			"3.0.0",
			"# Changelog\n\n## Unreleased\n\n- Pending.\n",
		);
		assert.notEqual(missing.status, 0);
		assert.match(missing.stderr, /CHANGELOG\.md needs a non-empty "## 3\.0\.0/);
		const empty = await release(
			"3.0.0",
			"# Changelog\n\n## 3.0.0 - 2026-12-01\n\n## 2.0.0 - 2026-11-25\n\n- Old.\n",
		);
		assert.notEqual(empty.status, 0);
	} finally {
		await rm(temp, { recursive: true, force: true });
	}
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
			GITHUB_REPOSITORY: "trbros/named-routes",
		});
		assert.equal(result.status, 0, result.stderr);
		const prepared = JSON.parse(
			await readFile(join(temp, "package.json"), "utf8"),
		);
		assert.equal(prepared.name, "@triooo/named-routes");
		assert.equal(prepared.version, pkg.version);
		assert.equal(
			prepared.repository.url,
			"git+https://github.com/trbros/named-routes.git",
		);
		assert.equal(prepared.repository.directory, undefined);
	} finally {
		await rm(temp, { recursive: true, force: true });
	}
});
