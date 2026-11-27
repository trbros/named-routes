# Enlaces localizados

[Documentación](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-i18n.md) · [Português](../pt/topic-react-router-i18n.md) · [Español](../es/topic-react-router-i18n.md) · [日本語](../ja/topic-react-router-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-i18n"></a>

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

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

← Anterior: [Archivos públicos](topic-react-router-assets.md) · [Todos los temas](framework-react-router.md) · Siguiente: [Límites de HTTP](topic-react-router-endpoints.md) →
