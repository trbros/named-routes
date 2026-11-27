# Generar una URL localizada

Topic: `localized-url` · Named Routes v2.2.0

Con i18n configurado, locale selecciona el pathname y prefijo. No dupliques el idioma en enlaces nativos. No traduce slugs dinámicos.

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

Related topic IDs: i18n, helper-localize, helper-for-locale
