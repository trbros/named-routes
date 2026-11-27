# Links internacionalizados

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-i18n.md) · [Português](../pt/topic-react-router-i18n.md) · [Español](../es/topic-react-router-i18n.md) · [日本語](../ja/topic-react-router-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-i18n"></a>

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

## Tópicos relacionados

- [Idiomas e i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.alternates()](topic-helper-alternates.md)

---

← Anterior: [Arquivos públicos](topic-react-router-assets.md) · [Todos os tópicos](framework-react-router.md) · Próximo: [Limites de HTTP](topic-react-router-endpoints.md) →
