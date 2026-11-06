import assert from "node:assert/strict";
import {
  cp,
  mkdtemp,
  mkdir,
  symlink,
  rm,
  realpath,
  readFile,
  writeFile,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const exampleDeps = join(pkg, "examples/app-router/node_modules");
const hasAppDeps = await access(join(exampleDeps, "next")).then(
  () => true,
  () => false,
);
const deps = resolve(
  process.env.NEXT_NAMED_ROUTES_TEST_DEPS ??
    (hasAppDeps ? exampleDeps : join(pkg, "website/node_modules")),
);
async function freePort() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}
const next = await realpath(join(deps, "next"));
for (const example of ["app-router", "pages-router"]) {
  const root = await mkdtemp(join(tmpdir(), "triooo-next-smoke-"));
  let child;
  try {
    await cp(join(pkg, "examples", example), root, {
      recursive: true,
      filter: (source) =>
        !["node_modules", ".next"].includes(basename(source)) &&
        !source.endsWith(".tsbuildinfo"),
    });
    await mkdir(join(root, "node_modules/@triooo"), { recursive: true });
    await mkdir(join(root, "node_modules/@types"), { recursive: true });
    await symlink(
      pkg,
      join(root, "node_modules/@triooo/next-named-routes"),
      "dir",
    );
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
    const port = await freePort();
    child = spawn(
      process.execPath,
      [
        join(next, "dist/bin/next"),
        "dev",
        "--webpack",
        "--hostname",
        "127.0.0.1",
        "--port",
        String(port),
      ],
      {
        cwd: root,
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    let logs = "";
    child.stdout.on("data", (chunk) => (logs += chunk));
    child.stderr.on("data", (chunk) => (logs += chunk));
    const exit = new Promise((resolve) => child.once("exit", resolve));
    const url = `http://127.0.0.1:${port}/demo`;
    let html = "";
    const deadline = Date.now() + 90000;
    while (Date.now() < deadline) {
      if (child.exitCode !== null) throw new Error(logs.slice(-5000));
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(10000),
        });
        if (response.ok) {
          html = await response.text();
          break;
        }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    assert.ok(html, logs.slice(-5000));
    const path = example === "app-router" ? "/posts/42" : "/users/42";
    assert.ok(
      html.includes(`href="/demo${path}"`),
      `Missing named Next Link for ${example}: ${logs.slice(-3000)}`,
    );
    assert.ok(!html.includes('href="/demo/demo/'), "Duplicated basePath");
    const response = await fetch(`http://127.0.0.1:${port}/demo${path}`);
    const detail = await response.text();
    assert.equal(response.status, 200, logs.slice(-4000));
    assert.ok(detail.includes("42"));
    assert.ok(
      html.includes('href="/demo/user/profile"'),
      "Automatic dotted name missing",
    );
    const added =
      example === "app-router"
        ? join(root, "app/account/settings/page.tsx")
        : join(root, "pages/account/settings.tsx");
    await mkdir(dirname(added), { recursive: true });
    await writeFile(
      added,
      "export default function Settings(){return <h1>Automatic settings</h1>}",
    );
    let updated = false;
    const updateDeadline = Date.now() + 15000;
    while (Date.now() < updateDeadline) {
      const manifest = await readFile(
        join(root, "src/routes.generated.ts"),
        "utf8",
      );
      if (manifest.includes('["account.settings"]')) {
        updated = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.ok(
      updated,
      `Automatic next dev watcher failed: ${logs.slice(-4000)}`,
    );
    const addedResponse = await fetch(
      `http://127.0.0.1:${port}/demo/account/settings`,
    );
    assert.equal(addedResponse.status, 200);
    assert.ok((await addedResponse.text()).includes("Automatic settings"));
    console.log(
      `${example}: automatic user.profile, dynamic named URL, basePath and live page discovery passed`,
    );
    child.kill("SIGTERM");
    await exit;
    child = null;
  } finally {
    if (child) child.kill("SIGTERM");
    await rm(root, { recursive: true, force: true });
  }
}
