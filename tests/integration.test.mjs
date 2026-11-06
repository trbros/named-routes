import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { withNamedRoutes } from "../dist/next.js";
const exec = promisify(execFile);
const cli = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "named-next-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, "pages"), { recursive: true });
  await writeFile(join(root, "pages/index.view.tsx"), "");
  return root;
}

test("Next wrapper preserves async config and inherits Next URL/extension settings", async (t) => {
  const root = await fixture(t);
  await writeFile(
    join(root, "named-routes.config.json"),
    JSON.stringify({
      names: { "/": "landing" },
      output: "generated/routes.ts",
    }),
  );
  const config = {
    pageExtensions: ["view.tsx"],
    basePath: "/admin",
    trailingSlash: true,
    webpack: "untouched",
  };
  const wrapped = withNamedRoutes(
    async (phase) => {
      assert.equal(phase, "phase-production-build");
      return config;
    },
    { root },
  );
  assert.equal(await wrapped("phase-production-build", {}), config);
  const content = await readFile(join(root, "generated/routes.ts"), "utf8");
  assert.match(content, /landing/);
  assert.match(content, /"basePath": "\/admin"/);
  assert.match(content, /"trailingSlash": true/);
});
test("CLI generate, check, list and stale exit code work against a consumer project", async (t) => {
  const root = await fixture(t);
  await writeFile(
    join(root, "named-routes.config.mjs"),
    `export default {pageExtensions:['view.tsx'],output:'generated/routes.ts'}`,
  );
  await exec(process.execPath, [cli, "generate", "--root", root], {
    timeout: 10000,
  });
  await exec(process.execPath, [cli, "check", "--root", root], {
    timeout: 10000,
  });
  const { stdout } = await exec(
    process.execPath,
    [cli, "list", "--root", root],
    { timeout: 10000 },
  );
  assert.equal(JSON.parse(stdout)[0].name, "home");
  await writeFile(join(root, "pages/about.view.tsx"), "");
  await assert.rejects(
    () =>
      exec(process.execPath, [cli, "check", "--root", root], {
        timeout: 10000,
      }),
    (error) => error.code === 1 && error.stderr.includes("out of date"),
  );
});

test("watch discovers added and removed pages and terminates cleanly", async (t) => {
  const { spawn } = await import("node:child_process");
  const root = await fixture(t);
  await writeFile(
    join(root, "named-routes.config.json"),
    JSON.stringify({
      pageExtensions: ["view.tsx"],
      output: "generated/routes.ts",
    }),
  );
  const child = spawn(process.execPath, [cli, "watch", "--root", root], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  const exit = new Promise((resolve) =>
    child.once("exit", (code, signal) => resolve({ code, signal })),
  );
  t.after(() => {
    if (child.exitCode === null) child.kill("SIGTERM");
  });
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  async function waitFor(predicate) {
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
      if (await predicate()) return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    assert.fail("Timed out waiting for watcher");
  }
  await waitFor(() => output.includes("Generated"));
  const file = join(root, "generated/routes.ts");
  await writeFile(join(root, "pages/new.view.tsx"), "");
  await waitFor(async () => (await readFile(file, "utf8")).includes('["new"]'));
  await rm(join(root, "pages/new.view.tsx"));
  await waitFor(
    async () => !(await readFile(file, "utf8")).includes('["new"]'),
  );
  child.kill("SIGTERM");
  assert.deepEqual(await exit, { code: 0, signal: null });
});

test("next dev discovers page creation and removal automatically without naming config or a second command", async (t) => {
  const { spawn } = await import("node:child_process");
  const root = await fixture(t);
  const moduleUrl = new URL("../dist/next.js", import.meta.url).href;
  const script = `import {withNamedRoutes} from ${JSON.stringify(moduleUrl)};await withNamedRoutes({pageExtensions:['view.tsx']},{root:${JSON.stringify(root)},watchInterval:30})('phase-development-server',{});console.log('ready');setInterval(()=>{},1000);`;
  const child = spawn(process.execPath, ["--input-type=module", "-e", script], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  const exited = new Promise((resolve) => child.once("exit", resolve));
  t.after(async () => {
    if (child.exitCode === null) child.kill("SIGTERM");
    await exited;
  });
  let stdout = "";
  child.stdout.on("data", (chunk) => (stdout += chunk));
  async function waitFor(predicate) {
    const deadline = Date.now() + 5000;
    while (Date.now() < deadline) {
      if (await predicate()) return;
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    assert.fail("Automatic Next watcher did not update route names");
  }
  await waitFor(() => stdout.includes("ready"));
  const output = join(root, "src/routes.generated.ts");
  await mkdir(join(root, "pages/user"), { recursive: true });
  await writeFile(join(root, "pages/user/profile.view.tsx"), "");
  await waitFor(async () =>
    (await readFile(output, "utf8")).includes('["user.profile"]'),
  );
  await rm(join(root, "pages/user/profile.view.tsx"));
  await waitFor(
    async () => !(await readFile(output, "utf8")).includes('["user.profile"]'),
  );
});
