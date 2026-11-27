# Arquivos públicos

[Documentação](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-assets.md) · [Português](../pt/topic-nuxt-assets.md) · [Español](../es/topic-nuxt-assets.md) · [日本語](../ja/topic-nuxt-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-assets"></a>

Coloque um arquivo em `public/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

<a id="without-base"></a>
## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Tópicos relacionados

- [asset() / route.asset()](topic-assets.md)
- [Assets tipados](topic-typed-assets.md)
- [assetBase e CDN](topic-asset-base.md)
- [Versionamento de assets](topic-asset-versioning.md)

---

← Anterior: [Base path e deploy](topic-nuxt-deployment.md) · [Todos os tópicos](framework-nuxt.md) · Próximo: [Links internacionalizados](topic-nuxt-i18n.md) →
