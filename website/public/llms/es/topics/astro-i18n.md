# Enlaces localizados

Topic: `astro-i18n` · Named Routes v2.2.0

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

**i18n.** Las carpetas físicas de idioma de Astro (src/pages/pt/about.astro) se fusionan en la misma ruta con nombre que src/pages/about.astro cuando el idioma está en i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed y true a always.

## Sin base path

URL en el navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## Con base path

URL en el navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
