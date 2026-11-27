# Gerar uma URL localizada

Topic: `localized-url` · Named Routes v2.2.0

Com i18n configurado como no guia, locale seleciona o pathname traduzido e prefixo. Mantenha caminhos internos em links que já adicionam o idioma. O helper não traduz o valor de um slug dinâmico.

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

Related topic IDs: i18n, helper-localize, helper-for-locale
