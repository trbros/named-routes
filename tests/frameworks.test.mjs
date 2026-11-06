import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { discoverRoutes, generateRoutes } from "../dist/generator.js";

async function fixture(t, files, dependencies) {
  const root = await mkdtemp(join(tmpdir(), "named-frameworks-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  if (dependencies)
    await writeFile(join(root, "package.json"), JSON.stringify({ dependencies }));
  for (const file of files) {
    await mkdir(join(root, file, ".."), { recursive: true });
    await writeFile(join(root, file), "");
  }
  return root;
}
const routesOf = async (options) => (await discoverRoutes(options)).routes;

test("Nuxt pages, nested parents, groups, optional and mixed params, Nitro API", async (t) => {
  const root = await fixture(
    t,
    [
      "app/pages/index.vue",
      "app/pages/users.vue",
      "app/pages/users/index.vue",
      "app/pages/users/[id].vue",
      "app/pages/(marketing)/about.vue",
      "app/pages/[[lang]]/help.vue",
      "app/pages/docs/[...slug].vue",
      "app/pages/v[major]-[minor].vue",
      "app/pages/-draft.vue",
      "app/pages/components/Button.css",
      "server/api/users/[id].get.ts",
      "server/api/users/[id].delete.ts",
      "server/routes/sitemap.xml.ts",
    ],
    { nuxt: "^4.0.0" },
  );
  const discovery = await discoverRoutes({ root });
  assert.equal(discovery.framework, "nuxt");
  assert.deepEqual(discovery.routes, {
    about: "/about",
    "docs.$slug": "/docs/[[...slug]]",
    "$lang.help": "/[[lang]]/help",
    home: "/",
    users: "/users",
    "users.$id": "/users/[id]",
    "v$major-$minor": "/v[major]-[minor]",
  });
  const api = await routesOf({ root, includeApi: true });
  assert.equal(api["api.users.$id"], "/api/users/[id]");
  assert.equal(api["sitemap.xml"], "/sitemap.xml");
});

test("Vue Router file-based routing: dot nesting, repeatable params and named index", async (t) => {
  const root = await fixture(
    t,
    [
      "src/pages/index.vue",
      "src/pages/(home).vue",
      "src/pages/users.edit.vue",
      "src/pages/users/[id].vue",
      "src/pages/[...path].vue",
      "src/pages/tags/[tags]+.vue",
      "src/pages/opt/[[parts]]+.vue",
      "src/pages/(admin)/settings.vue",
    ],
    { vue: "^3.5.0", "vue-router": "^4.5.0", "unplugin-vue-router": "^0.12.0" },
  );
  assert.deepEqual(await routesOf({ root }), {
    $path: "/[[...path]]",
    home: "/",
    "opt.$parts": "/opt/[[...parts]]",
    settings: "/settings",
    "tags.$tags": "/tags/[...tags]",
    "users.$id": "/users/[id]",
    "users.edit": "/users/edit",
  });
});

test("SvelteKit +page files, matchers, rest/optional params, groups and endpoints", async (t) => {
  const root = await fixture(
    t,
    [
      "src/routes/+page.svelte",
      "src/routes/+layout.svelte",
      "src/routes/(app)/dashboard/+page.svelte",
      "src/routes/(app)/dashboard/+page.server.ts",
      "src/routes/blog/[slug=word]/+page.ts",
      "src/routes/[[lang]]/about/+page.svelte",
      "src/routes/files/[...path]/edit/+page.svelte",
      "src/routes/smileys/[x+3a]-[x+29]/+page.svelte",
      "src/routes/api/items/+server.ts",
    ],
    { "@sveltejs/kit": "^2.0.0" },
  );
  assert.deepEqual(await routesOf({ root }), {
    "$lang.about": "/[[lang]]/about",
    "blog.$slug": "/blog/[slug]",
    dashboard: "/dashboard",
    "files.$path.edit": "/files/[[...path]]/edit",
    home: "/",
    "smileys.:-)": "/smileys/:-)",
  });
  assert.equal((await routesOf({ root, includeApi: true }))["api.items"], "/api/items");
});

test("Astro pages, private underscore files, rest params and endpoints", async (t) => {
  const root = await fixture(
    t,
    [
      "src/pages/index.astro",
      "src/pages/blog/[slug].md",
      "src/pages/docs/[...slug].mdx",
      "src/pages/_hidden.astro",
      "src/pages/_partials/nav.astro",
      "src/pages/[lang]-[version]/info.astro",
      "src/pages/api/data.json.ts",
    ],
    { astro: "^5.0.0" },
  );
  assert.deepEqual(await routesOf({ root }), {
    "$lang-$version.info": "/[lang]-[version]/info",
    "blog.$slug": "/blog/[slug]",
    "docs.$slug": "/docs/[[...slug]]",
    home: "/",
  });
  assert.equal((await routesOf({ root, includeApi: true }))["api.data.json"], "/api/data.json");
});

test("React Router / Remix flat routes: index, layouts, pathless, splats and escapes", async (t) => {
  const root = await fixture(
    t,
    [
      "app/routes/_index.tsx",
      "app/routes/about.tsx",
      "app/routes/concerts.tsx",
      "app/routes/concerts._index.tsx",
      "app/routes/concerts.$city.tsx",
      "app/routes/concerts_.mine.tsx",
      "app/routes/_auth.login.tsx",
      "app/routes/($lang).categories.tsx",
      "app/routes/files.$.tsx",
      "app/routes/sitemap[.]xml.tsx",
      "app/routes/dashboard/route.tsx",
      "app/routes/dashboard/chart.tsx",
      "app/routes/dashboard/nested/deep.tsx",
    ],
    { "@react-router/dev": "^7.0.0", "@react-router/fs-routes": "^7.0.0" },
  );
  assert.deepEqual(await routesOf({ root }), {
    "$lang.categories": "/[[lang]]/categories",
    about: "/about",
    concerts: "/concerts",
    "concerts.$city": "/concerts/[city]",
    "concerts.mine": "/concerts/mine",
    dashboard: "/dashboard",
    "files.$splat": "/files/[[...splat]]",
    home: "/",
    login: "/login",
    "sitemap.xml": "/sitemap.xml",
  });
  const optionalStatic = await fixture(t, ["app/routes/(beta).feature.tsx"], {
    "@react-router/dev": "^7.0.0",
  });
  await assert.rejects(() => discoverRoutes({ root: optionalStatic }), /Optional static segment.*\(beta\)/);
  assert.deepEqual(
    await routesOf({ root: optionalStatic, exclude: ["app/routes/(beta).*"] }),
    {},
  );
});

test("TanStack Router: flat and directory files, layouts, splats, optional and braces", async (t) => {
  const root = await fixture(
    t,
    [
      "src/routes/__root.tsx",
      "src/routes/index.tsx",
      "src/routes/posts.tsx",
      "src/routes/posts.index.tsx",
      "src/routes/posts.$postId.tsx",
      "src/routes/posts_.$postId.edit.tsx",
      "src/routes/_layout.tsx",
      "src/routes/_layout/settings.tsx",
      "src/routes/files/$.tsx",
      "src/routes/{-$locale}/about.tsx",
      "src/routes/users/route.tsx",
      "src/routes/users/user{$id}.lazy.tsx",
      "src/routes/-components/Header.tsx",
      "src/routes/(marketing)/pricing.tsx",
    ],
    { "@tanstack/react-router": "^1.0.0", "@tanstack/router-plugin": "^1.0.0" },
  );
  assert.deepEqual(await routesOf({ root }), {
    "$locale.about": "/[[locale]]/about",
    "files.$_splat": "/files/[[..._splat]]",
    home: "/",
    posts: "/posts",
    "posts.$postId": "/posts/[postId]",
    "posts.$postId.edit": "/posts/[postId]/edit",
    pricing: "/pricing",
    settings: "/settings",
    users: "/users",
    "users.user$id": "/users/user[id]",
  });
});

test("custom directories, exclude globs, naming style and framework errors", async (t) => {
  const root = await fixture(t, [
    "web/routes/index.vue",
    "web/routes/users/[id].vue",
    "web/routes/drafts/secret.vue",
  ]);
  const routes = await routesOf({
    root,
    framework: "nuxt",
    routesDir: "web/routes",
    exclude: ["web/routes/drafts/**"],
    naming: { separator: ":", paramPrefix: "", home: "index" },
  });
  assert.deepEqual(routes, { index: "/", "users:id": "/users/[id]" });
  const transformed = await routesOf({
    root,
    framework: "nuxt",
    routesDir: "web/routes",
    naming: { transform: ({ name, file }) => (file?.includes("drafts") ? `draft.${name}` : undefined) },
  });
  assert.equal(transformed["draft.drafts.secret"], "/drafts/secret");
  await assert.rejects(() => discoverRoutes({ root, framework: "astro" }), /No src\/pages directory found/);
  await assert.rejects(() => discoverRoutes({ root, framework: "nuxt", routesDir: "missing" }), /not found/);
  await assert.rejects(() => discoverRoutes({ root, framework: "rails" }), /Invalid framework/);
  await assert.rejects(() => discoverRoutes({ root, framework: "nuxt", router: "app" }), /only to framework next/);
  await assert.rejects(() => discoverRoutes({ root, ouput: "x.ts" }), { code: "INVALID_CONFIG", message: /Unknown option "ouput"/ });
  await assert.rejects(() => discoverRoutes({ root, framework: "next", routesDir: "web" }), /appDir and pagesDir/);
});

test("Next.js custom appDir/pagesDir and the manual framework", async (t) => {
  const root = await fixture(t, ["source/app/page.tsx", "source/app/about/page.tsx", "pages/legacy.tsx"]);
  assert.deepEqual(await routesOf({ root, appDir: "source/app", pagesDir: false }), {
    about: "/about",
    home: "/",
  });
  const manual = await generateRoutes({
    root,
    framework: "manual",
    extraRoutes: { "users.show": "/users/[id]" },
    output: "routes.ts",
  });
  assert.deepEqual(manual.routes, { "users.show": "/users/[id]" });
});

test("generated module honours output format, import source and export names", async (t) => {
  const root = await fixture(t, ["src/routes/+page.svelte", "src/routes/[id]/+page.svelte"], {
    "@sveltejs/kit": "^2.0.0",
  });
  const js = await generateRoutes({
    root,
    output: "src/lib/routes.js",
    importSource: "@acme/routes",
    exportNames: { route: "url", routes: "manifest", routeName: "Name" },
  });
  const content = await readFile(js.output, "utf8");
  assert.match(content, /^\/\/ Generated by @triooo\/next-named-routes/);
  assert.match(content, /import \{ createRoutes \} from "@acme\/routes";/);
  assert.match(content, /export const manifest = Object\.freeze\(\/\*\* @type \{const\} \*\//);
  assert.match(content, /export const url = createRoutes\(manifest/);
  assert.match(content, /@typedef \{keyof typeof manifest\} Name/);
  await assert.rejects(() => generateRoutes({ root, output: "src/routes/[x]/+page.ts" }), /outside routable routes/);
  await assert.rejects(() => generateRoutes({ root, output: "routes.d.ts" }), /must end in/);
  await assert.rejects(() => generateRoutes({ root, exportNames: { route: "default" } }), /identifier/);
  await assert.rejects(() => generateRoutes({ root, exportNames: { route: "a", routes: "a" } }), /duplicates/);
  await assert.rejects(() => generateRoutes({ root, importSource: "x';alert(1);'" }), /unsupported/);
  await assert.rejects(
    () => generateRoutes({ root, defaults: { secret: "token" } }),
    /Unknown defaults option "secret"/,
  );
});
