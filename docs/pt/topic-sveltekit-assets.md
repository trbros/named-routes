# Arquivos públicos

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-assets.md) · [Português](../pt/topic-sveltekit-assets.md) · [Español](../es/topic-sveltekit-assets.md) · [日本語](../ja/topic-sveltekit-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-assets"></a>

Coloque um arquivo em `static/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

<a id="without-base"></a>
## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Tópicos relacionados

- [asset() / route.asset()](topic-assets.md)
- [Assets tipados](topic-typed-assets.md)
- [assetBase e CDN](topic-asset-base.md)
- [Versionamento de assets](topic-asset-versioning.md)

---

← Anterior: [Base path e deploy](topic-sveltekit-deployment.md) · [Todos os tópicos](framework-sveltekit.md) · Próximo: [Links internacionalizados](topic-sveltekit-i18n.md) →
