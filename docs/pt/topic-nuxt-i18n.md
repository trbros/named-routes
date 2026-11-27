# Links internacionalizados

[Documentação](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-i18n.md) · [Português](../pt/topic-nuxt-i18n.md) · [Español](../es/topic-nuxt-i18n.md) · [日本語](../ja/topic-nuxt-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-i18n"></a>

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

**Navegação e i18n.** Use a URL com NuxtLink :to, navigateTo ou useRouter().push. Com @nuxtjs/i18n, configure os mesmos idiomas aqui: a estratégia prefix_except_default corresponde a localePrefix as-needed, prefix (ou prefix_and_default) a always e no_prefix a never. Assim route(nome, params, { locale }) retorna a URL localizada; sem locale você recebe o caminho interno para o localePath(). Caminhos traduzidos com defineI18nRoute precisam ser repetidos em i18n.pathnames.

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

← Anterior: [Arquivos públicos](topic-nuxt-assets.md) · [Todos os tópicos](framework-nuxt.md) · Próximo: [Endpoints HTTP](topic-nuxt-endpoints.md) →
