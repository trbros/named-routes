# Defaults de URL

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-defaults.md) · [Português](../pt/topic-config-defaults.md) · [Español](../es/topic-config-defaults.md) · [日本語](../ja/topic-config-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-defaults"></a>

defaults contém basePath, includeBasePath, origin, trailingSlash e assetBase. São valores públicos serializados no módulo. Configurações explícitas sobrescrevem as herdadas do framework. Não use credenciais.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [assetBase e CDN](topic-asset-base.md)
- [URLs absolutas e origin](topic-absolute-urls.md)

---

← Anterior: [Convenções de nomes](topic-config-naming.md) · [Todos os tópicos](api-reference.md) · Próximo: [Adicionar rotas explícitas](topic-config-extra-routes.md) →
