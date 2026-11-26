import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { scanAssets } from "../dist/asset-manifest.js";
import { auditProject } from "../dist/audit.js";
import { generateRoutes } from "../dist/generator.js";

const require = createRequire(import.meta.url);

async function resolveTypeScriptCompiler() {
	const manifestPath = require.resolve("typescript/package.json");

	const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

	const binary =
		typeof manifest.bin === "string" ? manifest.bin : manifest.bin?.tsc;

	assert.ok(binary, "TypeScript compiler binary not found");

	return join(dirname(manifestPath), binary);
}

async function fixture(t) {
	const root = await mkdtemp(join(tmpdir(), "nr-assets-"));

	t.after(() =>
		rm(root, {
			recursive: true,
			force: true,
			maxRetries: 10,
			retryDelay: 200,
		}),
	);

	await mkdir(join(root, "public/images"), {
		recursive: true,
	});

	await mkdir(join(root, "src"));

	await writeFile(join(root, "public/images/logo.svg"), "first");

	await writeFile(join(root, "public/skip.map"), "skip");

	return root;
}

test("scan is deterministic, filters files and hashes changed content", async (t) => {
	const root = await fixture(t);

	const options = {
		enabled: true,
		strict: true,
		exclude: ["**/*.map"],
	};

	const a = await scanAssets(root, "next", options);

	assert.deepEqual(Object.keys(a.manifest.files), ["images/logo.svg"]);

	assert.match(a.manifest.files["images/logo.svg"].version, /^[a-f0-9]{12}$/);

	assert.deepEqual(a, await scanAssets(root, "next", options));

	await writeFile(join(root, "public/images/logo.svg"), "second");

	const updated = await scanAssets(root, "next", options);

	assert.notEqual(
		updated.manifest.files["images/logo.svg"].version,
		a.manifest.files["images/logo.svg"].version,
	);

	await assert.rejects(
		scanAssets(root, "next", {
			directory: "../outside",
		}),
		{
			code: "INVALID_CONFIG",
		},
	);
});

test("generator emits a strict typed asset export and check detects changed contents", async (t) => {
	const root = await fixture(t);

	const options = {
		root,
		framework: "manual",
		extraRoutes: {
			home: "/",
		},
		assets: {
			strict: true,
		},
		defaults: {
			basePath: "/app",
		},
	};

	const generated = await generateRoutes(options);

	assert.match(
		await readFile(generated.output, "utf8"),
		/AssetHelper<.*images\/logo\.svg/,
	);

	await writeFile(join(root, "public/images/logo.svg"), "changed");

	await assert.rejects(
		generateRoutes(options, {
			check: true,
		}),
	);
});

test("audit reports literal references and leaves source unchanged", async (t) => {
	const root = await fixture(t);

	const source =
		'import { route, asset } from "./routes.generated";\n' +
		'route("missing");\n' +
		'asset("images/Logo.svg");\n' +
		'<a href="/about" />;\n' +
		'// asset("ignored.svg");\n';

	await writeFile(join(root, "src/page.tsx"), source);

	const result = await auditProject({
		root,
		framework: "manual",
		extraRoutes: {
			about: "/about",
		},
		assets: {
			enabled: true,
		},
	});

	assert.ok(result.diagnostics.some((d) => d.code === "UNKNOWN_ROUTE"));

	assert.ok(result.diagnostics.some((d) => d.code === "ASSET_CASE"));

	assert.ok(result.diagnostics.some((d) => d.code === "HARDCODED_ROUTE"));

	assert.equal(
		result.diagnostics.some((d) => d.value === "ignored.svg"),
		false,
	);

	assert.equal(await readFile(join(root, "src/page.tsx"), "utf8"), source);
});

test("strict generated asset export is actually typechecked in TS and JS", async (t) => {
	const root = await fixture(t);

	const compiler = await resolveTypeScriptCompiler();

	const defaults = {
		root,
		framework: "manual",
		extraRoutes: {
			home: "/",
		},
		assets: {
			strict: true,
		},
	};

	const declarationFile = fileURLToPath(
		new URL("../dist/index.d.ts", import.meta.url),
	);

	for (const extension of ["ts", "js"]) {
		const output = `routes-${extension}.${extension}`;

		await generateRoutes({
			...defaults,
			output,
		});

		await writeFile(
			join(root, `check-${extension}.ts`),
			[
				`import { asset } from "./${output}";`,
				'asset("images/logo.svg", { version: true });',
				"// @ts-expect-error missing file",
				'asset("images/missing.svg");',
				"",
			].join("\n"),
		);

		const config = join(root, `tsconfig-${extension}.json`);

		await writeFile(
			config,
			JSON.stringify(
				{
					compilerOptions: {
						target: "ES2022",
						lib: ["ES2022", "DOM"],
						module: "ESNext",
						moduleResolution: "Bundler",
						strict: true,
						noEmit: true,
						allowJs: true,
						checkJs: true,
						allowImportingTsExtensions: true,
						types: [],
						paths: {
							"@triooo/named-routes": [declarationFile],
						},
					},
					files: [`check-${extension}.ts`, output],
				},
				null,
				2,
			),
		);

		const checked = spawnSync(process.execPath, [compiler, "-p", config], {
			cwd: root,
			encoding: "utf8",
			timeout: 30000,
		});

		if (checked.error) {
			throw checked.error;
		}

		assert.equal(
			checked.status,
			0,
			[
				`Generated ${extension.toUpperCase()} asset typecheck failed.`,
				`Compiler: ${compiler}`,
				`Config: ${config}`,
				`Exit code: ${checked.status}`,
				`Signal: ${checked.signal ?? "none"}`,
				checked.stdout,
				checked.stderr,
			].join("\n"),
		);
	}
});

test("CLI audit JSON and strict exit codes", async (t) => {
	const root = await fixture(t);

	await writeFile(
		join(root, "named-routes.config.json"),
		JSON.stringify({
			framework: "manual",
			extraRoutes: {
				about: "/about",
			},
		}),
	);

	await writeFile(join(root, "src/page.tsx"), '<a href="/about" />;');

	const cli = fileURLToPath(new URL("../dist/cli.js", import.meta.url));

	const run = (...flags) => {
		const result = spawnSync(
			process.execPath,
			[cli, "audit", "--root", root, "--json", ...flags],
			{
				encoding: "utf8",
				timeout: 30000,
			},
		);

		if (result.error) {
			throw result.error;
		}

		return result;
	};

	const normal = run();

	assert.equal(normal.status, 0, normal.stderr);

	assert.ok(JSON.parse(normal.stdout).summary.warnings > 0);

	const strict = run("--strict");

	assert.equal(strict.status, 1, strict.stderr);
});
