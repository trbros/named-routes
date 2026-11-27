# Enlaces localizados

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-i18n.md) · [Português](../pt/topic-astro-i18n.md) · [Español](../es/topic-astro-i18n.md) · [日本語](../ja/topic-astro-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-i18n"></a>

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

**i18n.** Las carpetas físicas de idioma de Astro (src/pages/pt/about.astro) se fusionan en la misma ruta con nombre que src/pages/about.astro cuando el idioma está en i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed y true a always.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

## Temas relacionados

- [Idiomas e i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.alternates()](topic-helper-alternates.md)

---

← Anterior: [Archivos públicos](topic-astro-assets.md) · [Todos los temas](framework-astro.md) · Siguiente: [Endpoints HTTP](topic-astro-endpoints.md) →
