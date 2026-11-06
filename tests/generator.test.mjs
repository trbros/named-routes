import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  stat,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { discoverRoutes, generateRoutes } from "../dist/generator.js";
async function fixture(t, files) {
  const root = await mkdtemp(join(tmpdir(), "named-routes-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const file of files) {
    await mkdir(join(root, file, ".."), { recursive: true });
    await writeFile(
      join(root, file),
      "export default function Page() { return null }",
    );
  }
  return root;
}

test("App Router resolves groups, slots and interceptions and ignores private and framework files", async (t) => {
  const root = await fixture(t, [
    "app/(site)/page.tsx",
    "app/(site)/posts/[post]/page.tsx",
    "app/(site)/posts/[post]/layout.tsx",
    "app/_private/secret/page.tsx",
    "app/%5Fpublic/page.tsx",
    "app/api/status/route.ts",
    "app/@modal/(.)posts/[post]/page.tsx",
    "app/feed/(..)photos/[id]/page.tsx",
    "app/(site)/docs/[[...slug]]/page.mdx",
  ]);
  const found = await discoverRoutes({
    root,
    pageExtensions: ["tsx", "ts", "mdx"],
    names: { "/posts/[post]": "posts.show" },
  });
  assert.deepEqual(found.routes, {
    _public: "/_public",
    "docs.$slug": "/docs/[[...slug]]",
    home: "/",
    "photos.$id": "/photos/[id]",
    "posts.show": "/posts/[post]",
  });
  assert.equal(
    Object.values(
      (await discoverRoutes({ root, includeApi: true })).routes,
    ).includes("/api/status"),
    true,
  );
});

test("Pages Router handles src/pages, index and custom page extensions", async (t) => {
  const root = await fixture(t, [
    "src/pages/index.page.tsx",
    "src/pages/users/[id].page.tsx",
    "src/pages/docs/[...slug].page.tsx",
    "src/pages/_app.page.tsx",
    "src/pages/_document.page.tsx",
    "src/pages/_error.page.tsx",
    "src/pages/_profile.page.tsx",
    "src/pages/api/test.page.ts",
    "src/pages/users/test.ts",
  ]);
  const result = await discoverRoutes({
    root,
    pageExtensions: ["page.tsx", "page.ts"],
  });
  assert.deepEqual(result.routes, {
    _profile: "/_profile",
    "docs.$slug": "/docs/[...slug]",
    home: "/",
    "users.$id": "/users/[id]",
  });
  assert.equal(
    Object.values(
      (
        await discoverRoutes({
          root,
          pageExtensions: ["page.tsx", "page.ts"],
          includeApi: true,
        })
      ).routes,
    ).includes("/api/test"),
    true,
  );
});

test("mixed routers, root directory precedence and route collisions are explicit", async (t) => {
  const root = await fixture(t, [
    "app/page.js",
    "pages/blog/index.js",
    "src/app/ignored/page.tsx",
  ]);
  assert.deepEqual((await discoverRoutes({ root })).routes, {
    blog: "/blog",
    home: "/",
  });
  await mkdir(join(root, "pages/posts"), { recursive: true });
  await writeFile(join(root, "pages/posts/[id].js"), "");
  await mkdir(join(root, "app/posts/[slug]"), { recursive: true });
  await writeFile(join(root, "app/posts/[slug]/page.js"), "");
  await assert.rejects(() => discoverRoutes({ root }), /conflict/i);
});

test("invalid aliases and duplicate names fail before writing output", async (t) => {
  const root = await fixture(t, ["app/page.tsx", "app/about/page.tsx"]);
  await assert.rejects(
    () => discoverRoutes({ root, names: { "/missing": "missing" } }),
    /not found/i,
  );
  await assert.rejects(
    () => discoverRoutes({ root, names: { "/about": "home" } }),
    /name.*collision/i,
  );
});

test("generation is deterministic, only writes changes, and check detects stale manifests", async (t) => {
  const root = await fixture(t, ["app/page.tsx", "app/posts/[id]/page.tsx"]);
  const options = {
    root,
    names: { "/posts/[id]": "posts.show" },
    output: "generated/routes.ts",
    defaults: { basePath: "/workspace" },
  };
  const first = await generateRoutes(options);
  assert.equal(first.changed, true);
  const content = await readFile(first.output, "utf8");
  assert.match(content, /createRoutes/);
  assert.match(content, /posts.show/);
  const before = (await stat(first.output)).mtimeMs;
  assert.equal((await generateRoutes(options)).changed, false);
  assert.equal((await stat(first.output)).mtimeMs, before);
  await writeFile(join(root, "app/page.tsx"), "changed body only");
  assert.equal((await generateRoutes(options, { check: true })).changed, false);
  await mkdir(join(root, "app/new"), { recursive: true });
  await writeFile(join(root, "app/new/page.tsx"), "");
  await assert.rejects(
    () => generateRoutes(options, { check: true }),
    /out of date/i,
  );
});

test("generation protects user files and preserves prototype-like route names", async (t) => {
  const root = await fixture(t, ["app/page.tsx"]);
  await writeFile(join(root, "existing.ts"), "export const mine = true;");
  await assert.rejects(
    () => generateRoutes({ root, output: "existing.ts" }),
    /Refusing to overwrite/,
  );
  assert.equal(
    await readFile(join(root, "existing.ts"), "utf8"),
    "export const mine = true;",
  );
  const result = await generateRoutes({
    root,
    output: "generated.ts",
    names: { "/": "__proto__" },
  });
  assert.match(await readFile(result.output, "utf8"), /\["__proto__"\]/);
});

test("group conflicts, deep interceptions and src precedence are covered", async (t) => {
  const root = await fixture(t, [
    "app/(site)/a/b/(..)(..)photo/[id]/page.tsx",
    "app/@modal/(...)login/page.tsx",
    "app/blog/page.tsx",
    "src/pages/legacy.tsx",
  ]);
  const result = await discoverRoutes({ root });
  assert.equal(result.routes["photo.$id"], "/photo/[id]");
  assert.equal(result.routes.login, "/login");
  assert.equal(result.routes.legacy, "/legacy");
  await mkdir(join(root, "app/(other)/blog"), { recursive: true });
  await writeFile(join(root, "app/(other)/blog/page.tsx"), "");
  await assert.rejects(() => discoverRoutes({ root }), /conflict/i);
});

test("optional catch-all specificity conflicts and invalid extensions fail clearly", async (t) => {
  const root = await fixture(t, [
    "app/shop/page.tsx",
    "app/shop/[[...path]]/page.tsx",
  ]);
  await assert.rejects(
    () => discoverRoutes({ root }),
    /Optional catch-all route conflict/,
  );
  await assert.rejects(
    () => discoverRoutes({ root, pageExtensions: "tsx" }),
    /must be an array/,
  );
});

test("generated output cannot accidentally create a routable Pages file", async (t) => {
  const root = await fixture(t, ["pages/index.tsx"]);
  await assert.rejects(
    () => generateRoutes({ root, output: "pages/routes.ts" }),
    /outside.*pages/i,
  );
});

test("creating pages alone gives identical dotted names in both routers", async (t) => {
  const app = await fixture(t, [
    "app/page.tsx",
    "app/user/page.tsx",
    "app/user/profile/page.tsx",
  ]);
  const pages = await fixture(t, [
    "pages/index.tsx",
    "pages/user/index.tsx",
    "pages/user/profile.tsx",
  ]);
  const expected = {
    home: "/",
    user: "/user",
    "user.profile": "/user/profile",
  };
  assert.deepEqual((await discoverRoutes({ root: app })).routes, expected);
  assert.deepEqual((await discoverRoutes({ root: pages })).routes, expected);
});
