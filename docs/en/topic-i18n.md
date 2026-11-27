# Locales and i18n

[Documentation](index.md) / [Internationalization](internationalization.md)

[English](../en/topic-i18n.md) · [Português](../pt/topic-i18n.md) · [Español](../es/topic-i18n.md) · [日本語](../ja/topic-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="i18n"></a>

Configure i18n with locales, defaultLocale and optionally localePrefix, pathnames and domains. The shape matches next-intl's defineRouting(), so you can pass that routing object directly; next-intl-only keys such as localeCookie are accepted and ignored. In Next.js Pages Router projects, withNamedRoutes inherits next.config i18n automatically (localePrefix as-needed, domains included).

A dynamic first folder named locale or lang (app/[locale]/…, pages/[lang]/…, change it with localeParam) is removed from names and patterns: app/[locale]/about/page.tsx becomes about → /about. Physical locale folders (src/pages/pt/about.astro) merge into the same route. Without a locale folder (Pages Router i18n, @nuxtjs/i18n, middleware rewrites), every page is localized. Endpoints and routes outside [locale] are listed as unlocalized and never get a prefix.

route(name, params) without a locale returns the internal path, which is what next-intl's Link, Pages Router Link and @nuxtjs/i18n's localePath expect. Pass { locale } for plain anchors, redirects, sitemaps, emails or language switchers. route.forLocale(locale) returns a helper bound to that locale, and route.locales() lists the configured locales.

localePrefix: always (default) prefixes every locale; as-needed omits the default locale; never omits all prefixes; { mode, prefixes: { "en-US": "/us" } } customizes them. pathnames maps an internal pattern to localized patterns with the same parameters. With absolute: true, a locale served by a configured domain uses that domain as the origin. Locales are typed: the generated module exports RouteLocale and unknown locales are type and runtime errors.

**Translate incoming URLs.** route.localize('/sobre', 'en') returns /en/about when /sobre is the Portuguese pathname of /about and localePrefix is always. route.localize('/pt/produtos/42?tab=info#details', 'en') can return /en/products/42?tab=info#details. The method searches all configured languages, preserves path parameters and the original query/fragment, and returns null for unknown, ambiguous or unlocalized routes. Existing route.match() behavior does not change. A recognized source prefix, or sourceLocale for unprefixed aliases, disambiguates equally specific patterns. With no target locale, forLocale() supplies the bound locale, otherwise the configured default is used.

**Redirecting requests.** The runtime does not intercept requests. Resolve the preferred locale with your existing i18n middleware, call route.localize(pathAndQuery, locale, { basePath: true }) for a browser URL containing the base, and issue a temporary redirect only when the returned path differs. Let the existing framework handle its internal rewrites. For a raw internal path use includeBasePath: true to include the prefix in the result without requiring it in the input. For domain-based locale routing use absolute: true with configured domains and compare the entire URL. Do not redirect API/assets, non-GET/HEAD requests or an unresolved path. A ready Next.js proxy recipe is in examples/app-router/recipes/localized-redirect.ts.example.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "always",
    pathnames: { "/about": { en: "/about", pt: "/sobre" } },
  },
});
```

## Related topics

- [Generate a localized URL](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.locales()](topic-helper-locales.md)
- [route.alternates()](topic-helper-alternates.md)

---

[All topics](internationalization.md) · Next: [Generate a localized URL](topic-localized-url.md) →
