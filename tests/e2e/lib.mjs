// Cross-platform helpers for the real-framework E2E harness. No dependencies.
import { spawn, spawnSync } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { createServer as createNetServer } from "node:net";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";

export const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const windows = process.platform === "win32";

export async function freePort() {
	const server = createNetServer();
	await new Promise((done) => server.listen(0, "127.0.0.1", done));
	const { port } = server.address();
	await new Promise((done) => server.close(done));
	return port;
}

/** Runs npm (npm.cmd needs a shell on Windows since Node 20.12). */
/**
 * npm's own CLI script, run through this Node.js binary: no shell (npm.cmd
 * needs one on Windows, where shell arguments are concatenated unescaped).
 */
export function npmCli() {
	if (process.env.npm_execpath?.endsWith("npm-cli.js"))
		return process.env.npm_execpath;
	const node = dirname(process.execPath);
	for (const candidate of [
		join(node, "node_modules/npm/bin/npm-cli.js"),
		join(node, "../lib/node_modules/npm/bin/npm-cli.js"),
	])
		if (existsSync(candidate)) return candidate;
	return undefined;
}
export function npm(args, cwd, timeout = 600000) {
	const cli = npmCli();
	const result = spawnSync(
		cli ? process.execPath : "npm",
		cli ? [cli, ...args] : args,
		{
			cwd,
			encoding: "utf8",
			timeout,
			env: humanEnv({
				npm_config_update_notifier: "false",
				npm_config_fund: "false",
				npm_config_audit: "false",
			}),
		},
	);
	if (result.status !== 0)
		throw new Error(
			`npm ${args.join(" ")} failed in ${cwd}\n${result.stdout}\n${result.stderr}`.slice(
				-8000,
			),
		);
	return result.stdout;
}

/** Absolute path of a package binary's JS entry, so it runs through `node` everywhere. */
export async function binary(root, packageName, name) {
	const manifestPath = join(root, "node_modules", packageName, "package.json");
	const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
	const entry =
		typeof manifest.bin === "string" ? manifest.bin : manifest.bin?.[name];
	if (!entry) throw new Error(`${packageName} has no ${name} binary`);
	return join(root, "node_modules", packageName, entry);
}

export function run(file, args, cwd, { env = {}, timeout = 600000 } = {}) {
	const result = spawnSync(process.execPath, [file, ...args], {
		cwd,
		encoding: "utf8",
		timeout,
		env: { ...process.env, ...env },
	});
	return {
		status: result.status,
		output: `${result.stdout ?? ""}\n${result.stderr ?? ""}`,
	};
}

/**
 * Environment of a human terminal or CI runner. Some dev servers change
 * behavior under AI coding agents (Astro 7.4 detaches into a background
 * daemon, Next.js writes AGENTS.md), so agent markers are removed.
 */
export function humanEnv(extra = {}, { ci = true } = {}) {
	const env = { ...process.env, ...extra };
	if (!ci) delete env.CI;
	for (const key of Object.keys(env))
		if (
			/^(AI_AGENT|CLAUDECODE|CLAUDE_CODE_\w+|CLAUDE_AGENT_SDK_VERSION|CURSOR_AGENT|CODEX_\w+)$/.test(
				key,
			)
		)
			delete env[key];
	return env;
}

/**
 * A long-running child (dev or production server) whose whole tree can be
 * stopped. CI is removed: frameworks change dev behavior on it (Vue Router 5
 * defaults to watch: !process.env.CI), and no developer runs a dev server so.
 */
export function start(file, args, cwd, env = {}) {
	const child = spawn(process.execPath, [file, ...args], {
		cwd,
		env: humanEnv(env, { ci: false }),
		stdio: ["ignore", "pipe", "pipe"],
		detached: !windows,
	});
	child.logs = "";
	const collect = (chunk) => {
		child.logs += chunk;
		if (child.logs.length > 200000) child.logs = child.logs.slice(-100000);
	};
	child.stdout.on("data", collect);
	child.stderr.on("data", collect);
	child.exited = new Promise((done) => child.once("exit", done));
	return child;
}

export async function stop(child) {
	if (!child || child.exitCode !== null || child.signalCode !== null) return;
	if (windows) spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"]);
	else
		try {
			process.kill(-child.pid, "SIGTERM");
		} catch {}
	await Promise.race([child.exited, sleep(10000)]);
	if (child.exitCode === null && child.signalCode === null && !windows)
		try {
			process.kill(-child.pid, "SIGKILL");
		} catch {}
}

/** Waits until a URL answers 200 (or the child exits). */
export async function ready(child, url, timeout = 180000) {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		if (child && (child.exitCode !== null || child.signalCode !== null))
			throw new Error(
				`Server exited before ${url} was ready:\n${child.logs.slice(-6000)}`,
			);
		try {
			const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
			if (response.ok) return;
		} catch {}
		await sleep(250);
	}
	throw new Error(
		`${url} was not ready after ${timeout} ms:\n${child?.logs.slice(-6000) ?? ""}`,
	);
}

export async function until(predicate, label, timeout = 30000) {
	const deadline = Date.now() + timeout;
	let last;
	while (Date.now() < deadline) {
		try {
			if (await predicate()) return;
		} catch (caught) {
			last = caught;
		}
		await sleep(150);
	}
	throw new Error(
		`${label} (after ${timeout} ms)${last ? `: ${last.message}` : ""}`,
	);
}

const types = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".json": "application/json",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".png": "image/png",
	".txt": "text/plain; charset=utf-8",
	".woff2": "font/woff2",
};
/**
 * Minimal static file server for SPA/static builds: exact files, then
 * `<path>/index.html` and `<path>.html`, then the SPA fallback (or 404.html).
 */
export async function serveStatic(directory, { fallback } = {}) {
	const root = resolve(directory);
	const find = async (pathname) => {
		let decoded;
		try {
			decoded = decodeURIComponent(pathname);
		} catch {
			return undefined;
		}
		const target = normalize(join(root, decoded));
		if (target !== root && !target.startsWith(root + sep)) return undefined;
		for (const candidate of [
			target,
			join(target, "index.html"),
			`${target}.html`,
		])
			try {
				if ((await stat(candidate)).isFile()) return candidate;
			} catch {}
		return undefined;
	};
	const server = createServer(async (request, response) => {
		const { pathname } = new URL(request.url ?? "/", "http://localhost");
		let file = await find(pathname);
		let status = 200;
		if (!file && fallback && !extname(pathname)) file = join(root, fallback);
		if (!file) {
			status = 404;
			file = await find("/404.html");
		}
		if (!file) {
			response
				.writeHead(404, { "content-type": "text/plain" })
				.end("Not found");
			return;
		}
		response.writeHead(status, {
			"content-type": types[extname(file)] ?? "application/octet-stream",
		});
		createReadStream(file).pipe(response);
	});
	const port = await freePort();
	await new Promise((done) => server.listen(port, "127.0.0.1", done));
	return {
		url: `http://127.0.0.1:${port}`,
		close: () => new Promise((done) => server.close(done)),
	};
}
