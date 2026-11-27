# Localized links

[Documentation](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-i18n.md) · [Português](../pt/topic-nuxt-i18n.md) · [Español](../es/topic-nuxt-i18n.md) · [日本語](../ja/topic-nuxt-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-i18n"></a>

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

**Navigation and i18n.** Use the URL with NuxtLink :to, navigateTo or useRouter().push. With @nuxtjs/i18n, configure the same locales here: strategy prefix_except_default maps to localePrefix as-needed, prefix (or prefix_and_default) to always, and no_prefix to never. Then route(name, params, { locale }) returns the localized URL; without a locale you get the internal path for localePath(). Translated paths from defineI18nRoute must be repeated in i18n.pathnames.

<a id="without-base"></a>
## Without base path

Browser URL: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

<a id="with-base"></a>
## With base path

Browser URL: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

## Related topics

- [Locales and i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.alternates()](topic-helper-alternates.md)

---

← Previous: [Public assets](topic-nuxt-assets.md) · [All topics](framework-nuxt.md) · Next: [HTTP endpoints](topic-nuxt-endpoints.md) →
