# Generate a localized URL

[Documentation](index.md) / [Internationalization](internationalization.md)

[English](../en/topic-localized-url.md) · [Português](../pt/topic-localized-url.md) · [Español](../es/topic-localized-url.md) · [日本語](../ja/topic-localized-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="localized-url"></a>

With i18n configured as in the setup guide, locale selects the localized pathname and prefix. Keep native locale-aware links internal when they add locale themselves. The helper does not translate a dynamic slug value.

## Example

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

## Related topics

- [Locales and i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)

---

← Previous: [Locales and i18n](topic-i18n.md) · [All topics](internationalization.md) · Next: [route.localize()](topic-helper-localize.md) →
