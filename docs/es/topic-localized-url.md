# Generar una URL localizada

[Documentación](index.md) / [Internacionalización](internationalization.md)

[English](../en/topic-localized-url.md) · [Português](../pt/topic-localized-url.md) · [Español](../es/topic-localized-url.md) · [日本語](../ja/topic-localized-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="localized-url"></a>

Con i18n configurado, locale selecciona el pathname y prefijo. No dupliques el idioma en enlaces nativos. No traduce slugs dinámicos.

## Ejemplo

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

## Temas relacionados

- [Idiomas e i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)

---

← Anterior: [Idiomas e i18n](topic-i18n.md) · [Todos los temas](internationalization.md) · Siguiente: [route.localize()](topic-helper-localize.md) →
