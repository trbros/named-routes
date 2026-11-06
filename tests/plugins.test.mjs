import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { defineConfig, loadConfiguration } from "../dist/config.js";
import { namedRoutes } from "../dist/vite.js";

const exec = promisify(execFile);
const cli = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
async function project(t, dependencies, files) {
  const root = await mkdtemp(join(tmpdir(), "named-plugins-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(join(root, "package.json"), JSON.stringify({ type: "module", dependencies }));
  for (const file of files) {
    await mkdir(join(root, file, ".."), { recursive: true });
    await writeFile(join(root, file), "");
  }
  return root;
}
async function until(predicate, label) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    if (await predicate().catch(() => false)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.fail(label);
}

test("Vite plugin generates at build start and follows dev server file events", async (t) => {
  const root = await project(t, { "@sveltejs/kit": "^2.0.0" }, ["src/routes/+page.svelte"]);
  const plugin = namedRoutes({ output: "src/lib/routes.ts" });
  assert.equal(plugin.name, "triooo-named-routes");
  // Nuxt sets Vite's root to srcDir; the plugin walks up to package.json.
  await mkdir(join(root, "src/app"), { recursive: true });
  plugin.configResolved({ root: join(root, "src/app") });
  await plugin.buildStart.call({});
  const output = join(root, "src/lib/routes.ts");
  assert.match(await readFile(output, "utf8"), /\["home"\]: "\/"/);
  const listeners = [];
  plugin.configureServer({ watcher: { on: (_event, listener) => listeners.push(listener) } });
  await mkdir(join(root, "src/routes/about"), { recursive: true });
  await writeFile(join(root, "src/routes/about/+page.svelte"), "");
  for (const listener of listeners) listener("add", join(root, "src/routes/about/+page.svelte"));
  await until(async () => (await readFile(output, "utf8")).includes('["about"]'), "Vite plugin did not regenerate");
  await writeFile(join(root, "src/routes/+layout.svelte"), "");
  listeners[0]("change", join(root, "src/routes/+layout.svelte"));
  listeners[0]("add", join(root, "node_modules/x/index.js"));
  const errors = [];
  await writeFile(join(root, "src/routes/about/[id]"), "");
  plugin.configureServer({
    watcher: { on: (_event, listener) => listeners.push(listener) },
    config: { logger: { error: (message) => errors.push(message) } },
  });
  await writeFile(join(root, "named-routes.config.json"), JSON.stringify({ output: "src/lib/routes.ts", ouput: 1 }));
  listeners.at(-1)("change", join(root, "named-routes.config.json"));
  await until(async () => errors.some((message) => message.includes('Unknown option "ouput"')), "config errors are logged");
});

test("Vite plugin reports build errors through the plugin context", async (t) => {
  const root = await project(t, { astro: "^5.0.0" }, []);
  const plugin = namedRoutes({ root });
  let reported = "";
  await assert.rejects(() =>
    plugin.buildStart.call({
      error(message) {
        reported = message;
        throw new Error(message);
      },
    }),
  );
  assert.match(reported, /\[named-routes\] No src\/pages directory/);
});

test("config files: defineConfig, TypeScript configs and relative root", async (t) => {
  assert.deepEqual(defineConfig({ framework: "vue" }), { framework: "vue" });
  const root = await project(t, {}, ["web/src/pages/index.vue"]);
  await writeFile(
    join(root, "named-routes.config.mjs"),
    "export default { framework: 'vue', root: './web', output: 'routes.ts' };",
  );
  const loaded = await loadConfiguration(root);
  assert.equal(loaded.root, join(root, "web"));
  const [major, minor] = process.versions.node.split(".").map(Number);
  if (major > 22 || (major === 22 && minor >= 18)) {
    await rm(join(root, "named-routes.config.mjs"));
    await writeFile(
      join(root, "named-routes.config.ts"),
      "const framework: 'vue' = 'vue';\nexport default { framework, root: './web' };\n",
    );
    assert.equal((await loadConfiguration(root)).framework, "vue");
  }
  await writeFile(join(root, "broken.json"), "{");
  await assert.rejects(() => loadConfiguration(root, "broken.json"), { code: "INVALID_CONFIG" });
});

test("CLI version, framework flag, init and list for non-Next projects", async (t) => {
  const root = await project(t, { "@tanstack/router-plugin": "^1.0.0" }, ["src/routes/index.tsx", "src/routes/about.tsx"]);
  const { stdout: version } = await exec(process.execPath, [cli, "--version"]);
  assert.match(version, /^\d+\.\d+\.\d+/);
  const { stdout: created } = await exec(process.execPath, [cli, "init", "--root", root]);
  assert.match(created, /tanstack-router, 2 routes/);
  assert.match(await readFile(join(root, "named-routes.config.mjs"), "utf8"), /framework: "tanstack-router"/);
  await assert.rejects(() => exec(process.execPath, [cli, "init", "--root", root]), /already exists/);
  await rm(join(root, "named-routes.config.mjs"));
  const { stdout } = await exec(process.execPath, [cli, "list", "--root", root]);
  assert.deepEqual(JSON.parse(stdout).map((entry) => entry.name), ["about", "home"]);
  await assert.rejects(
    () => exec(process.execPath, [cli, "generate", "--root", root, "--framework", "rails"]),
    /Invalid framework/,
  );
  const { stdout: generated } = await exec(process.execPath, [
    cli, "generate", "--root", root, "--framework", "vue", "--routes-dir", "src/routes", "--output", "out/routes.mjs",
  ]);
  assert.match(generated, /Generated: .*routes\.mjs \(0 routes, vue\)/);
});
