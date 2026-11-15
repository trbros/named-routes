// Real Next.js smoke test for both routers: `next dev` (live page discovery)
// and `next build` + `next start` (the production server must never write the
// manifest), with webpack. The fixture links the example dependencies, which
// Turbopack refuses outside its workspace root, so Turbopack (dev and build)
// is covered by tests/e2e, which installs the packed tarball for real.
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import {
	access,
	cp,
	mkdir,
	mkdtemp,
	readFile,
	realpath,
	rm,
	stat,
	symlink,
	writeFile,
} from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const exampleDeps = join(pkg, "examples/app-router/node_modules");
const hasAppDeps = await access(join(exampleDeps, "next")).then(
	() => true,
	() => false,
);
const deps = resolve(
	process.env.NAMED_ROUTES_TEST_DEPS ??
		process.env.NEXT_NAMED_ROUTES_TEST_DEPS ??
		(hasAppDeps ? exampleDeps : join(pkg, "website/node_modules")),
);
const modes = (
	process.env.NAMED_ROUTES_NEXT_MODES ?? "webpack,production"
).split(",");
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
async function freePort() {
	const server = createServer();
	await new Promise((done) => server.listen(0, "127.0.0.1", done));
	const port = server.address().port;
	await new Promise((done) => server.close(done));
	return port;
}
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: "1" };
const next = await realpath(join(deps, "next"));
const bin = join(next, "dist/bin/next");

async function prepare(example) {
	const root = await mkdtemp(join(tmpdir(), "triooo-next-smoke-"));
	await cp(join(pkg, "examples", example), root, {
		recursive: true,
		filter: (source) =>
			!["node_modules", ".next", "routes.generated.ts"].includes(
				basename(source),
			) && !source.endsWith(".tsbuildinfo"),
	});
	await mkdir(join(root, "node_modules/@triooo"), { recursive: true });
	await mkdir(join(root, "node_modules/@types"), { recursive: true });
	await symlink(pkg, join(root, "node_modules/@triooo/named-routes"), "dir");
	for (const dep of [
		"next",
		"react",
		"react-dom",
		"typescript",
		"@types/react",
		"@types/node",
	])
		await symlink(
			await realpath(join(deps, dep)),
			join(root, "node_modules", dep),
			"dir",
		);
	return root;
}
function start(root, args) {
	const child = spawn(process.execPath, [bin, ...args], {
		cwd: root,
		env,
		stdio: ["ignore", "pipe", "pipe"],
	});
	child.logs = "";
	child.stdout.on("data", (chunk) => (child.logs += chunk));
	child.stderr.on("data", (chunk) => (child.logs += chunk));
	child.exited = new Promise((done) => child.once("exit", done));
	return child;
}
async function stop(child) {
	if (!child || child.exitCode !== null) return;
	child.kill("SIGTERM");
	await Promise.race([child.exited, sleep(10000)]);
	if (child.exitCode === null) child.kill("SIGKILL");
}
async function get(child, url, deadline = Date.now() + 120000) {
	while (Date.now() < deadline) {
		if (child.exitCode !== null) throw new Error(child.logs.slice(-5000));
		try {
			const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
			// Awaited here so a body read aborted by the timeout is retried, not thrown.
			if (response.ok) return await response.text();
		} catch {}
		await sleep(300);
	}
	assert.fail(`${url} did not respond: ${child.logs.slice(-5000)}`);
}
function assertLinks(html, example, logs) {
	const path = example === "app-router" ? "/posts/42" : "/users/42";
	assert.ok(
		html.includes(`href="/demo${path}"`),
		`Missing named Next Link for ${example}: ${logs.slice(-3000)}`,
	);
	assert.ok(!html.includes('href="/demo/demo/'), "Duplicated basePath");
	assert.ok(
		html.includes('href="/demo/user/profile"'),
		"Automatic dotted name missing",
	);
	return path;
}

for (const example of ["app-router", "pages-router"]) {
	for (const bundler of modes.filter((mode) => mode !== "production")) {
		const root = await prepare(example);
		let child;
		try {
			const port = await freePort();
			child = start(root, [
				"dev",
				...(bundler === "webpack" ? ["--webpack"] : []),
				"--hostname",
				"127.0.0.1",
				"--port",
				String(port),
			]);
			const base = `http://127.0.0.1:${port}/demo`;
			const path = assertLinks(await get(child, base), example, child.logs);
			const detail = await get(child, `${base}${path}`);
			assert.ok(detail.includes("42"));
			const added =
				example === "app-router"
					? join(root, "app/account/settings/page.tsx")
					: join(root, "pages/account/settings.tsx");
			await mkdir(dirname(added), { recursive: true });
			await writeFile(
				added,
				"export default function Settings(){return <h1>Automatic settings</h1>}",
			);
			const manifest = join(root, "src/routes.generated.ts");
			const updateDeadline = Date.now() + 15000;
			let updated = false;
			while (Date.now() < updateDeadline) {
				if (
					(await readFile(manifest, "utf8")).includes('["account.settings"]')
				) {
					updated = true;
					break;
				}
				await sleep(100);
			}
			assert.ok(
				updated,
				`Automatic next dev watcher failed (${bundler}): ${child.logs.slice(-4000)}`,
			);
			assert.ok(
				(await get(child, `${base}/account/settings`)).includes(
					"Automatic settings",
				),
			);
			await rm(dirname(added), { recursive: true });
			const removeDeadline = Date.now() + 15000;
			let removed = false;
			while (Date.now() < removeDeadline) {
				if (
					!(await readFile(manifest, "utf8")).includes('["account.settings"]')
				) {
					removed = true;
					break;
				}
				await sleep(100);
			}
			assert.ok(removed, `Removed page stayed in the manifest (${bundler})`);
			console.log(
				`${example} · next dev (${bundler}): named links, basePath, live addition and removal passed`,
			);
		} finally {
			await stop(child);
			await rm(root, { recursive: true, force: true });
		}
	}
	if (!modes.includes("production")) continue;
	const root = await prepare(example);
	let child;
	try {
		const build = spawnSync(process.execPath, [bin, "build", "--webpack"], {
			cwd: root,
			env,
			encoding: "utf8",
			timeout: 300000,
		});
		assert.equal(
			build.status,
			0,
			`${build.stdout}\n${build.stderr}`.slice(-6000),
		);
		const manifest = join(root, "src/routes.generated.ts");
		const before = (await stat(manifest)).mtimeMs;
		const port = await freePort();
		child = start(root, [
			"start",
			"--hostname",
			"127.0.0.1",
			"--port",
			String(port),
		]);
		const base = `http://127.0.0.1:${port}/demo`;
		const path = assertLinks(await get(child, base), example, child.logs);
		assert.ok((await get(child, `${base}${path}`)).includes("42"));
		const missing = await fetch(`${base}/does-not-exist`);
		assert.equal(missing.status, 404);
		assert.equal(
			(await stat(manifest)).mtimeMs,
			before,
			"next start must not write the manifest",
		);
		console.log(
			`${example} · next build + next start: production URLs, 404 and read-only start passed`,
		);
	} finally {
		await stop(child);
		await rm(root, { recursive: true, force: true });
	}
}
