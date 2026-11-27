import assert from "node:assert/strict";
import { mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { renameWithRetry } from "../dist/rename-retry.js";

function failure(code) {
	return Object.assign(new Error(`simulated rename: ${code}`), { code });
}

async function fixture(t) {
	const root = await mkdtemp(join(tmpdir(), "named-routes rename "));
	t.after(() => rm(root, { recursive: true, force: true }));
	const target = join(root, "routes.generated.ts");
	const temporary = `${target}.test.tmp`;
	await writeFile(target, 'export const routes = { old: "/old" };\n');
	await writeFile(temporary, "export const routes = {};\n");
	return { target, temporary };
}

test("retries transient sharing violations and replaces the stale manifest atomically", async (t) => {
	const { target, temporary } = await fixture(t);
	const delays = [];
	let attempts = 0;
	await renameWithRetry(temporary, target, {
		renameFile: async (from, to) => {
			attempts++;
			if (attempts <= 3) {
				// Never unlink or truncate the last valid output while retrying.
				assert.match(await readFile(to, "utf8"), /old/);
				assert.equal(
					await readFile(from, "utf8"),
					"export const routes = {};\n",
				);
				throw failure(["EPERM", "EACCES", "EBUSY"][attempts - 1]);
			}
			await rename(from, to);
		},
		wait: async (ms) => {
			delays.push(ms);
		},
	});
	assert.equal(await readFile(target, "utf8"), "export const routes = {};\n");
	await assert.rejects(readFile(temporary), { code: "ENOENT" });
	assert.equal(attempts, 4);
	assert.deepEqual(delays, [25, 50, 100]);
});

test("persistent EPERM fails within a bounded retry budget and preserves both files", async (t) => {
	const { target, temporary } = await fixture(t);
	const denied = failure("EPERM");
	const delays = [];
	let attempts = 0;
	await assert.rejects(
		renameWithRetry(temporary, target, {
			renameFile: async () => {
				attempts++;
				throw denied;
			},
			wait: async (ms) => {
				delays.push(ms);
			},
		}),
		(error) => error === denied,
	);
	assert.equal(attempts, 9);
	assert.equal(
		delays.reduce((sum, ms) => sum + ms, 0),
		2275,
	);
	assert.match(await readFile(target, "utf8"), /old/);
	assert.equal(
		await readFile(temporary, "utf8"),
		"export const routes = {};\n",
	);
});

test("does not retry unrelated filesystem errors", async (t) => {
	const { target, temporary } = await fixture(t);
	for (const code of ["ENOENT", "EXDEV", "ENOSPC"]) {
		let attempts = 0;
		const error = failure(code);
		await assert.rejects(
			renameWithRetry(temporary, target, {
				renameFile: async () => {
					attempts++;
					throw error;
				},
				wait: async () => assert.fail("unexpected retry"),
			}),
			(caught) => caught === error,
		);
		assert.equal(attempts, 1);
	}
	assert.match(await readFile(target, "utf8"), /old/);
});

test("successful replacement needs no delay", async (t) => {
	const { target, temporary } = await fixture(t);
	await renameWithRetry(temporary, target, {
		wait: async () => assert.fail("unexpected retry"),
	});
	assert.equal(await readFile(target, "utf8"), "export const routes = {};\n");
	await assert.rejects(readFile(temporary), { code: "ENOENT" });
});
