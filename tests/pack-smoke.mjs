import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	mkdir,
	mkdtemp,
	readdir,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { npmCli as npmCliPath } from "./e2e/lib.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const temporary = await mkdtemp(join(tmpdir(), "trbros-v1-package-"));
// npm runs as `node npm-cli.js`: npm.cmd on Windows would need a shell, which
// concatenates arguments unescaped (DEP0190).
const npmCli = npmCliPath();
// Run from `npm publish` (prepublishOnly), the parent npm exports its flags
// as npm_config_*; npm_config_dry_run would stop `npm pack` from writing.
const inherited = Object.fromEntries(
	Object.entries(process.env).filter(
		([key]) => !/^npm_config_(dry_run|tag|access|provenance|otp)$/i.test(key),
	),
);
function run(command, args, cwd = root) {
	const viaNode = command === "npm" && npmCli;
	const result = spawnSync(
		viaNode ? process.execPath : command,
		viaNode ? [npmCli, ...args] : args,
		{
			cwd,
			encoding: "utf8",
			timeout: 120000,
			env: {
				...inherited,
				npm_config_update_notifier: "false",
				npm_config_cache: join(temporary, "cache"),
			},
		},
	);
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
	// npm's own report of the archive contents instead of the platform tar,
	// whose listing did not match on Windows. Build output may precede it.
	const packed = run("npm", [
		"pack",
		"--json",
		"--pack-destination",
		temporary,
	]);
	const report = JSON.parse(packed.slice(packed.search(/^\[\s*$/m)));
	const archive = join(temporary, report[0].filename);
	// npm publish normalizes package.json more strictly than npm pack and
	// silently drops what it "auto-corrects" (it removed a "./dist/cli.js"
	// bin). A dry run without scripts or credentials shows those fixes.
	const dryRun = spawnSync(
		npmCli ? process.execPath : "npm",
		[
			...(npmCli ? [npmCli] : []),
			"publish",
			"--dry-run",
			"--ignore-scripts",
			"--access",
			"public",
			"--tag",
			"smoke",
		],
		{
			cwd: root,
			encoding: "utf8",
			timeout: 120000,
			env: { ...inherited, npm_config_cache: join(temporary, "cache") },
		},
	);
	assert.equal(dryRun.status, 0, `${dryRun.stdout}\n${dryRun.stderr}`);
	assert.doesNotMatch(
		`${dryRun.stdout}\n${dryRun.stderr}`,
		/auto-corrected|was invalid and removed|No bin file found/,
		`npm publish would change package.json:\n${dryRun.stderr}`,
	);
	assert.equal(
		report[0].filename,
		`triooo-named-routes-${manifest.version}.tgz`,
	);
	const files = report[0].files.map(
		(file) => `package/${file.path.replaceAll("\\", "/")}`,
	);
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
	// The installed bin target (node_modules/.bin holds shell/cmd shims on
	// Windows, which node cannot run directly); check the shim exists too.
	const installed = join(consumer, "node_modules/@triooo/named-routes");
	const installedManifest = JSON.parse(
		await readFile(join(installed, "package.json"), "utf8"),
	);
	const installedCli = join(installed, installedManifest.bin["named-routes"]);
	const shims = await readdir(join(consumer, "node_modules/.bin"));
	assert.ok(
		shims.some(
			(name) => name === "named-routes" || name === "named-routes.cmd",
		),
		"named-routes bin shim missing",
	);
	run(process.execPath, [installedCli, "generate"], consumer);
	const doctor = JSON.parse(
		run(process.execPath, [installedCli, "doctor", "--json"], consumer),
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
		[installedCli, "generate", "--output", "typed/routes.generated.ts"],
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
