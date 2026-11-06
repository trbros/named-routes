import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const temporary = await mkdtemp(join(tmpdir(), "trbros-v1-package-"));
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    timeout: 120000,
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
  assert.equal(manifest.name, "@triooo/next-named-routes");
  assert.match(manifest.version, /^1\.\d+\.\d+$/);
  assert.equal(manifest.publishConfig.access, "public");
  assert.equal(manifest.publishConfig.registry, "https://registry.npmjs.org/");
  assert.deepEqual(manifest.dependencies ?? {}, {});
  run("npm", ["pack", "--json", "--pack-destination", temporary]);
  const archive = join(
    temporary,
    `triooo-next-named-routes-${manifest.version}.tgz`,
  );
  const files = run("tar", ["-tzf", archive]).trim().split("\n");
  assert.ok(files.some((file) => file === "package/dist/index.js"));
  assert.ok(files.some((file) => file === "package/dist/cli.js"));
  assert.ok(files.some((file) => file === "package/README.pt-BR.md"));
  assert.ok(files.some((file) => file === "package/assets/logo.svg"));
  for (const entry of ["vite", "config", "frameworks", "generator", "next"])
    assert.ok(files.includes(`package/dist/${entry}.js`), `missing dist/${entry}.js`);
  assert.ok(!files.includes("package/LOCAL-DEVELOPMENT.pt-BR.md"), "local guide must not ship");
  assert.ok(!files.some((file) => /\.tmp$|tests\//.test(file)), "no temporary or test files");
  assert.ok(
    !files.some((file) =>
      /node_modules|\.next\/|\.npmrc|RELEASE\.private\.md|\.env(?:\.|$)|\/examples\//.test(file),
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
    `import assert from 'node:assert/strict';import {createRoutes} from '@triooo/next-named-routes';import {withNamedRoutes} from '@triooo/next-named-routes/next';import {discoverRoutes} from '@triooo/next-named-routes/generator';import {namedRoutes} from '@triooo/next-named-routes/vite';import {defineConfig} from '@triooo/next-named-routes/config';assert.equal(namedRoutes().name,'triooo-named-routes');assert.deepEqual(defineConfig({framework:'nuxt'}),{framework:'nuxt'});const route=createRoutes({'users.$user':'/users/[user]'});assert.equal(route('users.$user',{user:'Ana Silva'}),'/users/Ana%20Silva');assert.equal(typeof withNamedRoutes,'function');assert.equal(typeof discoverRoutes,'function');`,
  );
  run(process.execPath, ["verify.mjs"], consumer);
  await mkdir(join(consumer, "app/user/profile"), { recursive: true });
  await writeFile(
    join(consumer, "app/user/profile/page.tsx"),
    "export default function Page(){return null}",
  );
  run(
    process.execPath,
    [
      join(consumer, "node_modules/.bin/named-routes"),
      "generate",
    ],
    consumer,
  );
  await writeFile(
    join(consumer, "verify.ts"),
    `import {route} from './src/routes.generated.js';route('user.profile');\n// @ts-expect-error Unknown name must be rejected\nroute('missing');\n// @ts-expect-error Static routes cannot accept dynamic parameters\nroute('user.profile',{id:1});\n`,
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
      files: ["verify.ts"],
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
