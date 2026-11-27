# Localized links

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-i18n.md) · [Português](../pt/topic-sveltekit-i18n.md) · [Español](../es/topic-sveltekit-i18n.md) · [日本語](../ja/topic-sveltekit-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-i18n"></a>

Configure locales and matching pathname rules in named-routes.config. Your framework still owns locale selection and routing. Use route.url with locale for a complete public URL; when using a locale-aware native link, do not apply the same prefix twice.

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

← Previous: [Public assets](topic-sveltekit-assets.md) · [All topics](framework-sveltekit.md) · Next: [HTTP endpoints](topic-sveltekit-endpoints.md) →
