# Gerar uma URL localizada

[Documentação](index.md) / [Internacionalização](internationalization.md)

[English](../en/topic-localized-url.md) · [Português](../pt/topic-localized-url.md) · [Español](../es/topic-localized-url.md) · [日本語](../ja/topic-localized-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="localized-url"></a>

Com i18n configurado como no guia, locale seleciona o pathname traduzido e prefixo. Mantenha caminhos internos em links que já adicionam o idioma. O helper não traduz o valor de um slug dinâmico.

## Exemplo

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

## Tópicos relacionados

- [Idiomas e i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)

---

← Anterior: [Idiomas e i18n](topic-i18n.md) · [Todos os tópicos](internationalization.md) · Próximo: [route.localize()](topic-helper-localize.md) →
