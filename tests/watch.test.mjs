import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import {
	generationTargets,
	isGeneratedOutput,
	resolveWatchMode,
	watchGeneration,
} from "../dist/watch.js";

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
async function until(predicate, label, timeout = 5000) {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		if (predicate()) return;
		await sleep(10);
	}
	assert.fail(label);
}
async function directory(t) {
	const root = await mkdtemp(join(tmpdir(), "named-watch-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	await mkdir(join(root, "app"), { recursive: true });
	return root;
}

test("native mode reacts to file events without waiting for a rescan", async (t) => {
	const root = await directory(t);
	let runs = 0;
	const stop = watchGeneration(async () => runs++, {
		mode: "native",
		reconcile: 60000,
		interval: 60000,
		targets: () => [{ path: join(root, "app"), recursive: true }],
	});
	t.after(stop);
	await sleep(100);
	await mkdir(join(root, "app/users/[id]"), { recursive: true });
	await writeFile(join(root, "app/users/[id]/page.tsx"), "");
	await until(() => runs >= 1, "a nested file event did not trigger a run");
});

test("bursts of events are debounced and runs never overlap", async (t) => {
	const root = await directory(t);
	let runs = 0;
	let active = 0;
	let overlapped = false;
	const stop = watchGeneration(
		async () => {
			active++;
			if (active > 1) overlapped = true;
			runs++;
			await sleep(30);
			active--;
		},
		{
			mode: "native",
			reconcile: 60000,
			debounce: 80,
			targets: () => [{ path: join(root, "app"), recursive: true }],
		},
	);
	t.after(stop);
	await sleep(100);
	await Promise.all(
		Array.from({ length: 40 }, (_, index) =>
			writeFile(join(root, "app", `p${index}.tsx`), ""),
		),
	);
	await until(() => runs >= 1, "burst did not trigger a run");
	await sleep(400);
	assert.ok(runs <= 3, `expected the burst to collapse, got ${runs} runs`);
	assert.equal(overlapped, false);
});

test("events for ignored files (the generated module) do not trigger runs", async (t) => {
	const root = await directory(t);
	const output = join(root, "app/routes.generated.ts");
	let runs = 0;
	const stop = watchGeneration(async () => runs++, {
		mode: "native",
		reconcile: 60000,
		targets: () => [{ path: join(root, "app"), recursive: true }],
		ignore: (file) => isGeneratedOutput(file, output),
	});
	t.after(stop);
	// macOS FSEvents can deliver events from before the watcher started (the
	// mkdir in directory()) a few hundred milliseconds late: measure from here.
	await sleep(800);
	const before = runs;
	// The module and the temporary file of its atomic write.
	await writeFile(
		`${output}.0b4f0e9c-2d1f-4a59-9c0e-4f3f6a1d2b7e.tmp`,
		"// generated",
	);
	await writeFile(output, "// generated");
	await sleep(400);
	assert.equal(runs, before);
	assert.equal(isGeneratedOutput(`${output}x`, output), false);
	assert.equal(isGeneratedOutput(join(root, "app/page.tsx"), output), false);
});

test("when the OS refuses file events, polling takes over and reports it once", async (t) => {
	const root = await directory(t);
	let runs = 0;
	const reasons = [];
	const stop = watchGeneration(async () => runs++, {
		mode: "native",
		interval: 25,
		targets: () => [{ path: root, recursive: true }],
		onFallback: (reason) => reasons.push(reason),
		watchFile: () => {
			throw Object.assign(new Error("EMFILE: too many open files"), {
				code: "EMFILE",
			});
		},
	});
	t.after(stop);
	await until(() => runs >= 3, "polling did not take over");
	assert.deepEqual(reasons, ["EMFILE: too many open files"]);
});

test("missing directories are skipped and watched once they exist", async (t) => {
	const root = await directory(t);
	let runs = 0;
	const stop = watchGeneration(async () => runs++, {
		mode: "native",
		reconcile: 50,
		targets: () => [{ path: join(root, "later"), recursive: true }],
	});
	t.after(stop);
	await until(() => runs >= 1, "reconciliation rescan did not run");
	await mkdir(join(root, "later"));
	await until(() => runs >= 2, "rescan stopped");
	const before = runs;
	await writeFile(join(root, "later/page.tsx"), "");
	await until(() => runs > before, "new directory was not watched");
});

test("polling switches and explicit modes select the watcher", () => {
	assert.equal(resolveWatchMode("auto", {}).mode, "native");
	assert.equal(
		resolveWatchMode("auto", { WATCHPACK_POLLING: "true" }).mode,
		"poll",
	);
	assert.equal(
		resolveWatchMode("auto", { CHOKIDAR_USEPOLLING: "1" }).mode,
		"poll",
	);
	assert.equal(
		resolveWatchMode("auto", { CHOKIDAR_USEPOLLING: "false" }).mode,
		"native",
	);
	assert.equal(
		resolveWatchMode("auto", { NAMED_ROUTES_WATCH: "poll" }).mode,
		"poll",
	);
	assert.equal(
		resolveWatchMode("native", { WATCHPACK_POLLING: "true" }).mode,
		"native",
	);
	assert.equal(resolveWatchMode("poll", {}).mode, "poll");
	assert.throws(
		() => watchGeneration(async () => {}, { mode: "events" }),
		RangeError,
	);
	assert.throws(
		() => watchGeneration(async () => {}, { interval: 10 }),
		RangeError,
	);
	assert.deepEqual(
		generationTargets(
			{ root: "/p", sources: [{ directory: "/p/app" }] },
			"conf/nr.config.mjs",
		),
		[
			{ path: "/p/app", recursive: true },
			{ path: "/p", recursive: false },
			{ path: dirname(resolve("/p", "conf/nr.config.mjs")), recursive: false },
		],
	);
});
