// Real Vite dev server + plugin: initial generation, file additions/removals
// through Vite's own watcher, and Vite's Plugin type accepting namedRoutes().
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { npmCli } from "./e2e/lib.mjs";

const filename = fileURLToPath(import.meta.url);
const pkg = resolve(dirname(filename), "..");
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

// Run Vite in a separate process so native modules such as Rollup
// release their file handles before cleanup on Windows.
if (process.argv[2] === "--worker") {
	await runSmoke(process.argv[3]);
} else {
	const root = await mkdtemp(join(tmpdir(), "named-routes-vite-"));

	try {
		const worker = spawnSync(process.execPath, [filename, "--worker", root], {
			stdio: "inherit",
			timeout: 600000,
		});

		if (worker.error) throw worker.error;

		assert.equal(
			worker.status,
			0,
			`Vite smoke test failed (signal: ${worker.signal})`,
		);
	} finally {
		// The worker has exited, so native modules are no longer locked.
		// Retry transient filesystem errors caused by Windows or antivirus.
		await rm(root, {
			recursive: true,
			force: true,
			maxRetries: 10,
			retryDelay: 200,
		});
	}
}

async function runSmoke(root) {
	await writeFile(
		join(root, "package.json"),
		JSON.stringify({
			name: "vite-smoke",
			private: true,
			type: "module",
			dependencies: { "unplugin-vue-router": "*" },
		}),
	);

	// Execute npm through Node.js to support Windows without a shell.
	const cli = npmCli();

	const install = spawnSync(
		cli ? process.execPath : "npm",
		[
			...(cli ? [cli] : []),
			"install",
			"--no-audit",
			"--no-fund",
			"--no-save",
			"--ignore-scripts",
			"vite@7",
			"typescript@5",
			"@types/node@22",
			pkg,
		],
		{
			cwd: root,
			encoding: "utf8",
			timeout: 240000,
		},
	);

	// Report process creation errors and timeouts explicitly.
	if (install.error) throw install.error;

	assert.equal(
		install.status,
		0,
		[
			`Exit code: ${install.status}`,
			`Signal: ${install.signal}`,
			install.stdout,
			install.stderr,
		].join("\n"),
	);

	await mkdir(join(root, "src/pages"), { recursive: true });

	await writeFile(
		join(root, "src/pages/index.vue"),
		"<template><h1>home</h1></template>",
	);

	await writeFile(
		join(root, "vite.config.ts"),
		`import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
	plugins: [
		namedRoutes({
			i18n: {
				locales: ["en", "pt"],
				defaultLocale: "en",
			},
		}),
	],
});
`,
	);

	await writeFile(
		join(root, "tsconfig.json"),
		JSON.stringify({
			compilerOptions: {
				target: "ES2022",
				lib: ["ESNext", "DOM"],
				module: "ESNext",
				moduleResolution: "bundler",
				strict: true,
				noEmit: true,
				types: ["node"],
			},
			files: ["vite.config.ts", "use.ts"],
		}),
	);

	const { createServer } = await import(
		pathToFileURL(join(root, "node_modules/vite/dist/node/index.js")).href
	);

	const server = await createServer({
		root,
		configFile: join(root, "vite.config.ts"),
		server: { port: 0 },
		logLevel: "error",
	});

	const output = join(root, "src/routes.generated.ts");

	const until = async (predicate, label) => {
		for (let attempt = 0; attempt < 200; attempt++) {
			if (await predicate().catch(() => false)) return;

			await sleep(50);
		}

		assert.fail(label);
	};

	try {
		// Keep listen inside try so the server is closed even if startup fails.
		await server.listen();

		// Verify initial route generation.
		await until(
			async () => (await readFile(output, "utf8")).includes('["home"]'),
			"initial generation",
		);

		// Let Vite's watcher finish its initial filesystem crawl.
		await sleep(1500);

		// Verify automatic regeneration when a route is created.
		await mkdir(join(root, "src/pages/users"), {
			recursive: true,
		});

		await writeFile(join(root, "src/pages/users/[id].vue"), "<template/>");

		await until(
			async () => (await readFile(output, "utf8")).includes('"users.$id"'),
			"file addition",
		);

		// Verify automatic regeneration when a route is removed.
		await rm(join(root, "src/pages/users"), {
			recursive: true,
		});

		await until(
			async () => !(await readFile(output, "utf8")).includes('"users.$id"'),
			"file removal",
		);
	} finally {
		await server.close();
	}

	// Verify route names and locales are correctly typed.
	await writeFile(
		join(root, "use.ts"),
		`import { route } from "./src/routes.generated";

route("home", {}, { locale: "pt" });

// @ts-expect-error unknown route
route("missing");

// @ts-expect-error unknown locale
route("home", {}, { locale: "fr" });
`,
	);

	const tsc = spawnSync(
		process.execPath,
		[join(root, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.json"],
		{
			cwd: root,
			encoding: "utf8",
		},
	);

	if (tsc.error) throw tsc.error;

	assert.equal(tsc.status, 0, [tsc.stdout, tsc.stderr].join("\n"));

	console.log(
		"vite: plugin types, initial generation, live additions/removals and typed locales passed",
	);

	// Do not remove the temporary directory here.
	// Native modules remain loaded until this worker exits.
}
