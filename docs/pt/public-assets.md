# Arquivos públicos · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/public-assets.md) · [Português](../pt/public-assets.md) · [Español](../es/public-assets.md) · [日本語](../ja/public-assets.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [asset() / route.asset()](#assets)
- [assetBase e CDN](#asset-base)

<a id="assets"></a>

## asset() / route.asset()

Use `asset(path, { absolute?: boolean })` ou `route.asset()` para URLs públicas em qualquer framework suportado. Diferentemente das rotas nomeadas, os assets incluem o `basePath` efetivo por padrão. Não são afetados por idioma, trailingSlash, nomes de rotas ou schemas de query. O helper apenas constrói URLs; não verifica arquivos, não faz upload, não configura CDN nem substitui imports, otimização de imagens ou hashing do bundler.

Coloque arquivos em `public/` no Next.js, Nuxt, Astro e apps Vite comuns; o SvelteKit usa `static/` por padrão. Passe o caminho relativo a essa pasta (com ou sem uma barra inicial), sem o nome da pasta ou um prefixo já aplicado. Por exemplo, `asset("images/logo.svg")` inclui `/app` uma vez quando a base é `/app`. Unicode e espaços são codificados; query strings e fragmentos são preservados. Valide entradas de URL não confiáveis na aplicação.

Defina `defaults.assetBase` em named-routes.config para sobrescrever a base de assets: `"/files"`, `"/"` (raiz) ou `"https://cdn.example.com/public"`. O padrão é o `basePath` efetivo do Next, Nuxt ou Astro, ou a base do roteador configurada para Vite e manifestos manuais. Se a base do Vite, CDN do Nuxt ou assetPrefix do Next for diferente, configure assetBase explicitamente: prefixos específicos do bundler não são inferidos. Publique os arquivos nesse endereço. `absolute: true` exige defaults.origin, salvo se a URL ou assetBase já for absoluta; nunca usa o host da requisição ou o domínio de idioma. URLs HTTP(S) válidas fornecidas diretamente permanecem iguais; URLs sem protocolo, outros esquemas, credenciais, caminhos ambíguos e segmentos de travessia são rejeitados.

O módulo gerado exporta `asset` junto de `route` e `routes`. Um manifesto manual expõe `route.asset`. Veja o guia separado assetBase e CDN para hospedar arquivos fora da base de navegação.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```ts
// Generated module (adjust the import path to your project):
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg with basePath: "/app"
asset("logo.svg?v=2#icon"); // /app/logo.svg?v=2#icon

// Manual manifest:
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
urls.asset("images/logo.svg", { absolute: true });
// https://example.com/app/images/logo.svg
```

<a id="asset-base"></a>

## assetBase e CDN

`defaults.assetBase` sobrescreve o prefixo público independentemente de `basePath`. Use uma URL HTTP(S) de CDN, um prefixo relativo à raiz ou `/` para ignorar a base de navegação. Não publica arquivos nem configura CDN. Não coloque segredos em defaults: eles são serializados no módulo gerado. Em named-routes.config use o mesmo objeto defaults.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app",
  assetBase: "https://cdn.example.com/public",
  origin: "https://example.com",
});
urls.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
urls("about", {}, { basePath: true }); // /app/about
const rootAssets = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← Anterior: [Helpers de rotas](route-helpers.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Referência da API](api-reference.md) →
