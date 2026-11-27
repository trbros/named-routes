# Enlaces localizados

Topic: `nuxt-i18n` · Named Routes v2.2.0

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

**Navegación e i18n.** Usa la URL con NuxtLink :to, navigateTo o useRouter().push. Con @nuxtjs/i18n, configura aquí los mismos idiomas: la estrategia prefix_except_default corresponde a localePrefix as-needed, prefix (o prefix_and_default) a always y no_prefix a never. Así route(nombre, params, { locale }) devuelve la URL localizada; sin locale obtienes la ruta interna para localePath(). Las rutas traducidas con defineI18nRoute deben repetirse en i18n.pathnames.

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
