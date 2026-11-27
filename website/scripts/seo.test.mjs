import assert from 'node:assert/strict';
import test from 'node:test';
import { createSeoConfig, publicUrl, localizedUrl, languageAlternates, indexablePaths, sitemapEntries } from '../lib/seo-urls.mjs';
const locales = [{code:'en',htmlLang:'en'}, {code:'pt',htmlLang:'pt-BR'}, {code:'es',htmlLang:'es'}, {code:'ja',htmlLang:'ja'}];
const prod = createSeoConfig({NODE_ENV:'production',NEXT_PUBLIC_SITE_ORIGIN:'https://example.com',NEXT_PUBLIC_BASE_PATH:'/named-routes/'});

test('canonical paths have exactly one base and a locale, independent of request host', () => {
  assert.equal(localizedUrl('pt','/docs/mcp-installation',prod),'https://example.com/named-routes/docs/mcp-installation');
  assert.equal(publicUrl('/sitemap.xml',prod),'https://example.com/named-routes/sitemap.xml');
  const root = createSeoConfig({NODE_ENV:'production',NEXT_PUBLIC_SITE_ORIGIN:'https://docs.example.com',NEXT_PUBLIC_BASE_PATH:''});
  assert.equal(localizedUrl('en','',root),'https://docs.example.com/en');
  assert.equal(publicUrl('/robots.txt',root),'https://docs.example.com/robots.txt');
  assert.throws(()=>createSeoConfig({NEXT_PUBLIC_SITE_ORIGIN:'https://example.com/project'}));
  assert.throws(()=>createSeoConfig({NEXT_PUBLIC_SITE_ORIGIN:'https://user:password@example.com'}));
  assert.throws(()=>createSeoConfig({NEXT_PUBLIC_BASE_PATH:'//foo'}));
  assert.throws(()=>localizedUrl('en','/docs/../test',prod));
});

test('all sitemap entries have reciprocal alternates and x-default; no duplicates or demo routes', () => {
  const ids=['mcp-installation','helper-route','mcp-installation'];
  const entries=sitemapEntries(ids,locales,"pt",prod);
  assert.equal(entries.length, 24);
  assert.equal(new Set(entries.map(x=>x.url)).size,entries.length);
  assert.deepEqual(indexablePaths(ids),['','/docs','/releases','/playground','/docs/mcp-installation','/docs/helper-route']);
  const links=languageAlternates('/docs/mcp-installation',locales,"pt",prod);
  assert.equal(
    links["pt-BR"],
    "https://example.com/named-routes/docs/mcp-installation",
  );
  assert.equal(links["x-default"], links["pt-BR"]);
  for(const url of Object.values(links)) assert.deepEqual(entries.find(x=>x.url===url).alternates.languages,links);
  assert.ok(entries.every(x=>!x.url.includes('/users/')&&!x.url.includes('/guides/')));
});

test('previews, development, and explicit opt out have empty sitemaps', () => {
  for (const env of [{NODE_ENV:'production',VERCEL_ENV:'preview'}, {NODE_ENV:'development'}, {NODE_ENV:'production',SEO_INDEXABLE:'false'}]) {
    const config=createSeoConfig(env); assert.equal(config.indexable,false); assert.deepEqual(sitemapEntries(['mcp-installation'],locales,"pt",config),[]);
  }
  assert.equal(createSeoConfig({NODE_ENV:'production',VERCEL_ENV:'production'}).indexable,true);
});

// Regression: the translation source language is not the navigation default.
test("Portuguese is unprefixed on both deployments", () => {
  for (const base of ["", "/named-routes"]) {
    const config = createSeoConfig({ NODE_ENV: "production", NEXT_PUBLIC_SITE_ORIGIN: "https://example.com", NEXT_PUBLIC_BASE_PATH: base });
    for (const path of ["", "/docs/mcp-installation"]) {
      const links = languageAlternates(path, locales, "pt", config);
      assert.equal(links["x-default"], `https://example.com${base}${path || (base ? "" : "/")}`);
      assert.equal(links["x-default"], links["pt-BR"]);
      assert.equal(links.en, `https://example.com${base}/en${path}`);
      const entries = sitemapEntries(["mcp-installation"], locales, "pt", config);
      for (const url of Object.values(links)) {
        assert.deepEqual(entries.find(entry => entry.url === url)?.alternates.languages, links);
      }
    }
  }
});
