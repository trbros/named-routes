import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const temporary = await mkdtemp(join(tmpdir(), "trbros-v1-package-"));
function run(command, args, cwd = root) {
	// npm is npm.cmd on Windows, which Node only spawns through a shell.
	const windowsNpm = process.platform === "win32" && command === "npm";
	const result = spawnSync(windowsNpm ? "npm.cmd" : command, args, {
		cwd,
		encoding: "utf8",
		timeout: 120000,
		shell: windowsNpm,
		env: {
			...process.env,
			npm_config_update_notifier: "false",
			npm_config_cache: join(temporary, "cache"),
		},
	});
	assert.equal(
		result.status,
		0,
		`${command} ${args.join(" ")}\n${result.stdout}\n${result.stderr}`,
	);
	return result.stdout;
}
try {
	assert.equal(manifest.name, "@triooo/named-routes");
	assert.match(manifest.version, /^1\.\d+\.\d+$/);
	assert.equal(manifest.publishConfig.access, "public");
	assert.equal(manifest.publishConfig.registry, "https://registry.npmjs.org/");
	assert.deepEqual(manifest.dependencies ?? {}, {});
	run("npm", ["pack", "--json", "--pack-destination", temporary]);
	const archive = join(
		temporary,
		`triooo-named-routes-${manifest.version}.tgz`,
	);
	const files = run("tar", ["-tzf", archive]).trim().split("\n");
	assert.ok(files.some((file) => file === "package/dist/index.js"));
	assert.ok(files.some((file) => file === "package/dist/cli.js"));
	assert.ok(files.some((file) => file === "package/README.pt-BR.md"));
	assert.ok(files.some((file) => file === "package/assets/logo.svg"));
	for (const entry of [
		"vite",
		"config",
		"frameworks",
		"generator",
		"next",
		"doctor",
		"suggest",
		"watch",
	])
		assert.ok(
			files.includes(`package/dist/${entry}.js`),
			`missing dist/${entry}.js`,
		);
	assert.ok(
		!files.includes("package/LOCAL-DEVELOPMENT.pt-BR.md"),
		"local guide must not ship",
	);
	assert.ok(
		!files.some((file) => /\.tmp$|tests\//.test(file)),
		"no temporary or test files",
	);
	assert.ok(
		!files.some((file) =>
			/node_modules|\.next\/|\.npmrc|RELEASE\.private\.md|\.env(?:\.|$)|\/examples\//.test(
				file,
			),
		),
	);
	const consumer = join(temporary, "consumer");
	await mkdir(consumer);
	await writeFile(
		join(consumer, "package.json"),
		JSON.stringify({ name: "v1-consumer", private: true, type: "module" }),
	);
	run(
		"npm",
		[
			"install",
			archive,
			"--no-audit",
			"--no-fund",
			"--registry=https://registry.npmjs.org/",
		],
		consumer,
	);
	await writeFile(
		join(consumer, "verify.mjs"),
		`import assert from 'node:assert/strict';import {createRoutes} from '@triooo/named-routes';import {withNamedRoutes} from '@triooo/named-routes/next';import {discoverRoutes} from '@triooo/named-routes/generator';import {namedRoutes} from '@triooo/named-routes/vite';import {defineConfig} from '@triooo/named-routes/config';assert.equal(namedRoutes().name,'triooo-named-routes');assert.deepEqual(defineConfig({framework:'nuxt'}),{framework:'nuxt'});const route=createRoutes({'users.$user':'/users/[user]'});assert.equal(route('users.$user',{user:'Ana Silva'}),'/users/Ana%20Silva');assert.equal(typeof withNamedRoutes,'function');assert.equal(typeof discoverRoutes,'function');assert.deepEqual({...route.match('/users/Ana%20Silva').params},{user:'Ana Silva'});assert.equal(route.is('users.$user','/users/1'),true);const {defineQuery}=await import('@triooo/named-routes');assert.equal(typeof defineQuery.type,'function');`,
	);
	run(process.execPath, ["verify.mjs"], consumer);
	await mkdir(join(consumer, "app/user/profile"), { recursive: true });
	await writeFile(
		join(consumer, "app/user/profile/page.tsx"),
		"export default function Page(){return null}",
	);
	run(
		process.execPath,
		[join(consumer, "node_modules/.bin/named-routes"), "generate"],
		consumer,
	);
	const doctor = JSON.parse(
		run(
			process.execPath,
			[join(consumer, "node_modules/.bin/named-routes"), "doctor", "--json"],
			consumer,
		),
	);
	assert.equal(doctor.framework, "next");
	assert.deepEqual(
		doctor.routes.map((entry) => entry.name),
		["user.profile"],
	);
	await mkdir(join(consumer, "typed"), { recursive: true });
	await writeFile(
		join(consumer, "typed/query.ts"),
		'import { defineQuery } from "@triooo/named-routes";\nexport default defineQuery({ "user.profile": defineQuery.type<{ tab?: "posts" | "likes" }>() });\n',
	);
	run(
		process.execPath,
		[
			join(consumer, "node_modules/.bin/named-routes"),
			"generate",
			"--output",
			"typed/routes.generated.ts",
		],
		consumer,
	);
	await writeFile(
		join(consumer, "verify.ts"),
		`import {route} from './src/routes.generated.js';route('user.profile');\n// @ts-expect-error Unknown name must be rejected\nroute('missing');\n// @ts-expect-error Static routes cannot accept dynamic parameters\nroute('user.profile',{id:1});\nimport {createRoutes} from '@triooo/named-routes';import type Q from './typed/query.js';const typed=createRoutes<{'user.profile':'/user/profile'},never,typeof Q>({'user.profile':'/user/profile'},{hrefs:'typed'});const href:'/user/profile'=typed('user.profile');void href;typed('user.profile',{},{query:{tab:'posts'}});\n// @ts-expect-error typed query rejects unknown values\ntyped('user.profile',{},{query:{tab:'other'}});\nconst found=typed.match('/user/profile');if(found){const name:'user.profile'=found.name;void name;}\n`,
	);
	await writeFile(
		join(consumer, "tsconfig.json"),
		JSON.stringify({
			compilerOptions: {
				target: "ES2022",
				module: "NodeNext",
				moduleResolution: "NodeNext",
				strict: true,
				noEmit: true,
			},
			files: ["verify.ts", "typed/query.ts"],
		}),
	);
	const require = createRequire(import.meta.url);
	const tsManifestPath = require.resolve("typescript/package.json");
	const tsManifest = JSON.parse(await readFile(tsManifestPath, "utf8"));
	const tsBinary = join(
		dirname(tsManifestPath),
		typeof tsManifest.bin === "string" ? tsManifest.bin : tsManifest.bin.tsc,
	);
	run(process.execPath, [tsBinary, "--project", "tsconfig.json"], consumer);
	console.log(
		`Verified ${manifest.name}@${manifest.version}: clean tarball, installed runtime, all exports, CLI and TypeScript contracts.`,
	);
} finally {
	await rm(temporary, { recursive: true, force: true });
}
