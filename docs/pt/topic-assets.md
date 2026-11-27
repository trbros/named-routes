# asset() / route.asset()

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-assets.md) · [Português](../pt/topic-assets.md) · [Español](../es/topic-assets.md) · [日本語](../ja/topic-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="assets"></a>

Use `asset(path, { absolute?: boolean })` ou `route.asset()` para URLs públicas em qualquer framework suportado. Diferentemente das rotas nomeadas, os assets incluem o `basePath` efetivo por padrão. Não são afetados por idioma, trailingSlash, nomes de rotas ou schemas de query. O helper apenas constrói URLs; não verifica arquivos, não faz upload, não configura CDN nem substitui imports, otimização de imagens ou hashing do bundler.

Coloque arquivos em `public/` no Next.js, Nuxt, Astro e apps Vite comuns; o SvelteKit usa `static/` por padrão. Passe o caminho relativo a essa pasta (com ou sem uma barra inicial), sem o nome da pasta ou um prefixo já aplicado. Por exemplo, `asset("images/logo.svg")` inclui `/app` uma vez quando a base é `/app`. Unicode e espaços são codificados; query strings e fragmentos são preservados. Valide entradas de URL não confiáveis na aplicação.

Defina `defaults.assetBase` em named-routes.config para sobrescrever a base de assets: `"/files"`, `"/"` (raiz) ou `"https://cdn.example.com/public"`. O padrão é o `basePath` efetivo do Next, Nuxt ou Astro, ou a base do roteador configurada para Vite e manifestos manuais. Se a base do Vite, CDN do Nuxt ou assetPrefix do Next for diferente, configure assetBase explicitamente: prefixos específicos do bundler não são inferidos. Publique os arquivos nesse endereço. `absolute: true` exige defaults.origin, salvo se a URL ou assetBase já for absoluta; nunca usa o host da requisição ou o domínio de idioma. URLs HTTP(S) válidas fornecidas diretamente permanecem iguais; URLs sem protocolo, outros esquemas, credenciais, caminhos ambíguos e segmentos de travessia são rejeitados.

O módulo gerado exporta `asset` junto de `route` e `routes`. Um manifesto manual expõe `route.asset`. Veja o guia separado assetBase e CDN para hospedar arquivos fora da base de navegação.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

<a id="without-base"></a>
## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

## Tópicos relacionados

- [assetBase e CDN](topic-asset-base.md)
- [URLs absolutas de assets](topic-asset-absolute.md)
- [Assets tipados](topic-typed-assets.md)
- [asset.has()](topic-asset-has.md)
- [Versionamento de assets](topic-asset-versioning.md)

---

[Todos os tópicos](public-assets.md) · Próximo: [route.asset()](topic-helper-route-asset.md) →
