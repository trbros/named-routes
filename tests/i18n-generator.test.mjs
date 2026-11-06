import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { discoverRoutes, generateRoutes } from "../dist/generator.js";
import { withNamedRoutes } from "../dist/next.js";

async function fixture(t, files) {
  const root = await mkdtemp(join(tmpdir(), "named-i18n-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const file of files) {
    await mkdir(join(root, file, ".."), { recursive: true });
    await writeFile(join(root, file), "");
  }
  return root;
}
const i18n = { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" };

test("next-intl style app/[locale] routes get locale-free names and a typed locale", async (t) => {
  const root = await fixture(t, [
    "app/page.tsx",
    "app/[locale]/page.tsx",
    "app/[locale]/about/page.tsx",
    "app/[locale]/blog/[slug]/page.tsx",
    "app/api/health/route.ts",
  ]);
  const routing = {
    ...i18n,
    pathnames: { "/about": { pt: "/sobre" } },
    localeCookie: { name: "NEXT_LOCALE" },
    localeDetection: true,
  };
  const discovery = await discoverRoutes({ root, i18n: routing, includeApi: true });
  assert.deepEqual(discovery.routes, {
    about: "/about",
    "api.health": "/api/health",
    "blog.$slug": "/blog/[slug]",
    home: "/",
  });
  assert.deepEqual(discovery.defaults.i18n.unlocalized, ["api.health"]);
  assert.equal(discovery.entries.find((entry) => entry.name === "home").file, "app/[locale]/page.tsx");
  const result = await generateRoutes({ root, i18n: routing, includeApi: true, output: "routes.ts" });
  const content = await readFile(result.output, "utf8");
  assert.match(content, /export type RouteLocale = "en" \| "pt";/);
  assert.doesNotMatch(content, /localeCookie|localeDetection|NEXT_LOCALE/);
  await assert.rejects(
    () => discoverRoutes({ root, i18n: { ...i18n, pathnames: { "/missing": "/x" } } }),
    /pathnames key is not a route pattern/,
  );
  await assert.rejects(() => discoverRoutes({ root, i18n: { ...i18n, prefix: "x" } }), /Unknown i18n option "prefix"/);
});

test("physical locale folders and frameworks without a locale segment", async (t) => {
  const astro = await fixture(t, [
    "src/pages/index.astro",
    "src/pages/about.astro",
    "src/pages/pt/index.astro",
    "src/pages/pt/about.astro",
    "src/pages/pt/somente-pt.astro",
  ]);
  const discovery = await discoverRoutes({ root: astro, framework: "astro", i18n });
  assert.deepEqual(discovery.routes, { about: "/about", home: "/", "somente-pt": "/somente-pt" });
  assert.ok(discovery.entries.every((entry) => entry.localized));
  const nuxt = await fixture(t, ["pages/index.vue", "pages/[id].vue", "server/api/ping.ts"]);
  const nuxtDiscovery = await discoverRoutes({ root: nuxt, framework: "nuxt", includeApi: true, i18n });
  assert.deepEqual(nuxtDiscovery.defaults.i18n.unlocalized, ["api.ping"]);
});

test("Next wrapper inherits Pages Router i18n and skips generation for next start", async (t) => {
  const root = await fixture(t, ["pages/index.tsx", "pages/about.tsx"]);
  const config = {
    i18n: { locales: ["en", "fr"], defaultLocale: "en", domains: [{ domain: "example.fr", defaultLocale: "fr" }] },
  };
  await withNamedRoutes(config, { root, output: "routes.ts" })("phase-production-build", {});
  const content = await readFile(join(root, "routes.ts"), "utf8");
  assert.match(content, /"localePrefix": "as-needed"/);
  assert.match(content, /"example\.fr"/);
  const fresh = await fixture(t, ["pages/index.tsx"]);
  const returned = await withNamedRoutes(config, { root: fresh })("phase-production-server", {});
  assert.equal(returned, config);
  await assert.rejects(() => readFile(join(fresh, "src/routes.generated.ts")), { code: "ENOENT" });
});
