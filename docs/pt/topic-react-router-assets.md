# Arquivos públicos

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-assets.md) · [Português](../pt/topic-react-router-assets.md) · [Español](../es/topic-react-router-assets.md) · [日本語](../ja/topic-react-router-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-assets"></a>

Coloque um arquivo em `public/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

<a id="without-base"></a>
## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

## Tópicos relacionados

- [asset() / route.asset()](topic-assets.md)
- [Assets tipados](topic-typed-assets.md)
- [assetBase e CDN](topic-asset-base.md)
- [Versionamento de assets](topic-asset-versioning.md)

---

← Anterior: [Base path e deploy](topic-react-router-deployment.md) · [Todos os tópicos](framework-react-router.md) · Próximo: [Links internacionalizados](topic-react-router-i18n.md) →
