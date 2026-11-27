# Generate a localized URL

Topic: `localized-url` · Named Routes v2.2.0

With i18n configured as in the setup guide, locale selects the localized pathname and prefix. Keep native locale-aware links internal when they add locale themselves. The helper does not translate a dynamic slug value.

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

Related topic IDs: i18n, helper-localize, helper-for-locale
