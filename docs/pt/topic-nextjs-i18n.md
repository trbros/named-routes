# Links internacionalizados

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-i18n.md) · [Português](../pt/topic-nextjs-i18n.md) · [Español](../es/topic-nextjs-i18n.md) · [日本語](../ja/topic-nextjs-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-i18n"></a>

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /pt/users/42
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /app/pt/users/42
```

## Tópicos relacionados

- [Idiomas e i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.alternates()](topic-helper-alternates.md)

---

← Anterior: [Arquivos públicos](topic-nextjs-assets.md) · [Todos os tópicos](framework-nextjs.md) · Próximo: [Endpoints HTTP](topic-nextjs-endpoints.md) →
