import assert from "node:assert/strict";
import test from "node:test";
import { createRoutes, NamedRouteError } from "../dist/index.js";

const manifest = {
  home: "/",
  about: "/about",
  "news.$slug": "/news/[slug]",
  "api.health": "/api/health",
};

test("locale prefixes follow next-intl modes and keep internal paths without a locale", () => {
  const always = createRoutes(manifest, {
    i18n: { locales: ["en", "pt"], defaultLocale: "en" },
  });
  assert.equal(always("about"), "/about");
  assert.equal(always("about", {}, { locale: "en" }), "/en/about");
  assert.equal(always("home", {}, { locale: "pt" }), "/pt");
  assert.deepEqual(always.locales(), ["en", "pt"]);

  const asNeeded = createRoutes(manifest, {
    trailingSlash: true,
    basePath: "/app",
    i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  });
  assert.equal(asNeeded("home", {}, { locale: "en" }), "/");
  assert.equal(asNeeded("home", {}, { locale: "pt" }), "/pt/");
  assert.equal(asNeeded("about", {}, { locale: "pt", basePath: true }), "/app/pt/about/");

  const never = createRoutes(manifest, {
    i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "never" },
  });
  assert.equal(never("about", {}, { locale: "pt" }), "/about");

  const custom = createRoutes(manifest, {
    i18n: {
      locales: ["en-US", "pt-BR"],
      defaultLocale: "en-US",
      localePrefix: { mode: "always", prefixes: { "en-US": "/us", "pt-BR": "/br" } },
    },
  });
  assert.equal(custom("about", {}, { locale: "pt-BR" }), "/br/about");
});

test("localized pathnames, bound helpers, domains and unlocalized routes", () => {
  const route = createRoutes(manifest, {
    origin: "https://example.com",
    i18n: {
      locales: ["en", "pt", "de"],
      defaultLocale: "en",
      localePrefix: "as-needed",
      pathnames: {
        "/about": { pt: "/sobre", de: "/ueber-uns" },
        "/news/[slug]": { pt: "/noticias/[slug]" },
      },
      domains: [
        { domain: "example.de", defaultLocale: "de" },
        { domain: "example.com.br", defaultLocale: "pt", http: true },
      ],
      unlocalized: ["api.health"],
    },
  });
  assert.equal(route("about", {}, { locale: "pt" }), "/pt/sobre");
  assert.equal(route("news.$slug", { slug: "olá" }, { locale: "pt" }), "/pt/noticias/ol%C3%A1");
  assert.equal(route("news.$slug", { slug: "x" }, { locale: "de" }), "/de/news/x");
  assert.equal(route("api.health", {}, { locale: "pt" }), "/api/health");
  assert.equal(route.pattern("about", "de"), "/ueber-uns");
  assert.equal(route.pattern("about"), "/about");
  // Absolute URLs use the locale's domain, where that locale is the default.
  assert.equal(route("about", {}, { locale: "de", absolute: true }), "https://example.de/ueber-uns");
  assert.equal(route("about", {}, { locale: "pt", absolute: true }), "http://example.com.br/sobre");
  assert.equal(route("about", {}, { locale: "en", absolute: true }), "https://example.com/about");
  const pt = route.forLocale("pt");
  assert.equal(pt("about"), "/pt/sobre");
  assert.equal(pt("about", {}, { locale: "en" }), "/about");
  assert.equal(pt.forLocale("de")("home"), "/de");
});

test("invalid locales and i18n definitions fail with INVALID_LOCALE / INVALID_I18N", () => {
  const plain = createRoutes(manifest);
  assert.throws(() => plain("about", {}, { locale: "en" }), { code: "INVALID_LOCALE" });
  const route = createRoutes(manifest, { i18n: { locales: ["en"], defaultLocale: "en" } });
  assert.throws(() => route("about", {}, { locale: "fr" }), { code: "INVALID_LOCALE" });
  assert.throws(() => route.forLocale("fr"), NamedRouteError);
  for (const i18n of [
    { locales: [], defaultLocale: "en" },
    { locales: ["en"], defaultLocale: "pt" },
    { locales: ["en", "en"], defaultLocale: "en" },
    { locales: ["en/x"], defaultLocale: "en/x" },
    { locales: ["en"], defaultLocale: "en", localePrefix: "sometimes" },
    { locales: ["en"], defaultLocale: "en", localePrefix: { mode: "always", prefixes: { en: "https://x" } } },
    { locales: ["en"], defaultLocale: "en", pathnames: { "/missing": "/x" } },
    { locales: ["en"], defaultLocale: "en", pathnames: { "/news/[slug]": { en: "/n/[id]" } } },
    { locales: ["en"], defaultLocale: "en", domains: [{ domain: "evil.test/path", defaultLocale: "en" }] },
    { locales: ["en"], defaultLocale: "en", unlocalized: ["missing"] },
  ])
    assert.throws(() => createRoutes(manifest, { i18n }), { code: "INVALID_I18N" }, JSON.stringify(i18n));
});
