// Real Vite dev server + plugin: initial generation, file additions/removals
// through Vite's own watcher, and Vite's Plugin type accepting namedRoutes().
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const root = await mkdtemp(join(tmpdir(), "named-routes-vite-"));
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
try {
  await writeFile(
    join(root, "package.json"),
    JSON.stringify({ name: "vite-smoke", private: true, type: "module", dependencies: { "unplugin-vue-router": "*" } }),
  );
  const install = spawnSync(
    "npm",
    ["install", "--no-audit", "--no-fund", "--no-save", "--ignore-scripts", "vite@7", "typescript@5", "@types/node@22", pkg],
    { cwd: root, encoding: "utf8", timeout: 240000 },
  );
  assert.equal(install.status, 0, install.stderr);
  await mkdir(join(root, "src/pages"), { recursive: true });
  await writeFile(join(root, "src/pages/index.vue"), "<template><h1>home</h1></template>");
  await writeFile(
    join(root, "vite.config.ts"),
    `import { defineConfig } from "vite";\nimport { namedRoutes } from "@triooo/next-named-routes/vite";\nexport default defineConfig({ plugins: [namedRoutes({ i18n: { locales: ["en", "pt"], defaultLocale: "en" } })] });\n`,
  );
  await writeFile(
    join(root, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: { target: "ES2022", lib: ["ESNext", "DOM"], module: "ESNext", moduleResolution: "bundler", strict: true, noEmit: true, types: ["node"] },
      files: ["vite.config.ts", "use.ts"],
    }),
  );
  const { createServer } = await import(pathToFileURL(join(root, "node_modules/vite/dist/node/index.js")).href);
  const server = await createServer({ root, configFile: join(root, "vite.config.ts"), server: { port: 0 }, logLevel: "error" });
  await server.listen();
  const output = join(root, "src/routes.generated.ts");
  const until = async (predicate, label) => {
    for (let attempt = 0; attempt < 200; attempt++) {
      if (await predicate().catch(() => false)) return;
      await sleep(50);
    }
    assert.fail(label);
  };
  try {
    await until(async () => (await readFile(output, "utf8")).includes('["home"]'), "initial generation");
    await sleep(1500); // let the watcher finish its initial crawl
    await mkdir(join(root, "src/pages/users"), { recursive: true });
    await writeFile(join(root, "src/pages/users/[id].vue"), "<template/>");
    await until(async () => (await readFile(output, "utf8")).includes('"users.$id"'), "file addition");
    await rm(join(root, "src/pages/users"), { recursive: true });
    await until(async () => !(await readFile(output, "utf8")).includes('"users.$id"'), "file removal");
  } finally {
    await server.close();
  }
  await writeFile(
    join(root, "use.ts"),
    `import { route } from "./src/routes.generated";\nroute("home", {}, { locale: "pt" });\n// @ts-expect-error unknown route\nroute("missing");\n// @ts-expect-error unknown locale\nroute("home", {}, { locale: "fr" });\n`,
  );
  const tsc = spawnSync(process.execPath, [join(root, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.json"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(tsc.status, 0, tsc.stdout + tsc.stderr);
  console.log("vite: plugin types, initial generation, live additions/removals and typed locales passed");
} finally {
  await rm(root, { recursive: true, force: true });
}
