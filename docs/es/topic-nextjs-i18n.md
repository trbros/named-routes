# Enlaces localizados

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-i18n.md) · [Português](../pt/topic-nextjs-i18n.md) · [Español](../es/topic-nextjs-i18n.md) · [日本語](../ja/topic-nextjs-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-i18n"></a>

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

<a id="without-base"></a>
## Sin base path

URL en el navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /pt/users/42
```

<a id="with-base"></a>
## Con base path

URL en el navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /app/pt/users/42
```

## Temas relacionados

- [Idiomas e i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.alternates()](topic-helper-alternates.md)

---

← Anterior: [Archivos públicos](topic-nextjs-assets.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Endpoints HTTP](topic-nextjs-endpoints.md) →
