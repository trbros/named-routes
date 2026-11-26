# Helpers avançados de URL · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/advanced-helpers.md) · [Português](../pt/advanced-helpers.md) · [Español](../es/advanced-helpers.md) · [日本語](../ja/advanced-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Assets tipados](#typed-assets)
- [asset.has() / paths() / info()](#asset-metadata)
- [Versionamento de assets](#asset-versioning)
- [route.withQuery()](#helper-with-query)
- [route.alternates()](#helper-alternates)
- [route.canonical()](#helper-canonical)
- [route.withDefaults()](#helper-with-defaults)
- [Auditoria de rotas e assets](#audit)
- [Playground dos helpers](#helpers-playground)

<a id="typed-assets"></a>

## Assets tipados

Ative `assets` em named-routes.config. O gerador escaneia public/ (static/ no SvelteKit), ignora arquivos ocultos e links simbólicos, aceita globs *, ** e ? em exclude e grava um manifesto de caminhos relativos codificados com hashes SHA-256. strict: true tipa caminhos literais da exportação asset gerada; route.asset() valida o manifesto em runtime. URLs HTTP(S) remotas continuam permitidas. Nenhum arquivo é enviado. Use assets.directory para uma pasta pública personalizada. Build/check atualizam o manifesto; o watch da CLI acompanha a pasta recursivamente.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

<a id="asset-metadata"></a>

## asset.has() / paths() / info()

Consulte o manifesto gerado, não o servidor publicado. has aceita caminho local com barra inicial, query ou hash opcionais; paths retorna nomes codificados; info retorna path, extensão, tamanho em bytes e versão, ou null. Sem descoberta de assets, o manifesto é vazio.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.paths(); // ["images/logo.svg"]
asset.info("images/logo.svg"); // { path, extension, size, version }
asset.info("missing.svg"); // null
```

<a id="asset-versioning"></a>

## Versionamento de assets

Use `{ version: true }` para adicionar ou substituir v pelos primeiros 12 dígitos hexadecimais do SHA-256 do conteúdo. Query e fragmento são preservados. Ative a descoberta e gere novamente quando mudar o conteúdo. URLs remotas e entradas ausentes não podem ser versionadas. É cache busting, não garantia criptográfica de integridade nem purge de CDN.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="helper-with-query"></a>

## route.withQuery()

Atualize uma URL relativa à raiz ou HTTP(S) sem reconstruir o caminho ou hash. Use null ou [] para remover, undefined para preservar e arrays para substituir valores repetidos. Os demais valores repetidos permanecem. URLSearchParams normaliza a codificação. Passe { name, basePath: true } ao validar uma rota conhecida com prefixo; patches nomeados usam o tipo do schema. Quando existe schema runtime para a rota encontrada, a query completa é validada. Schemas apenas de tipos não validam em runtime.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```

<a id="helper-alternates"></a>

## route.alternates()

Gere um mapa de URLs por idioma usando pathnames, domains, parâmetros e query existentes. Por padrão URLs absolutas com a base. Rotas não localizadas ou sem i18n retornam mapa vazio. Use para hreflang e sitemaps multilíngues; informe parâmetros dinâmicos reais. Slugs não são traduzidos automaticamente.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="helper-canonical"></a>

## route.canonical()

Gere URL absoluta para metadados com idioma explícito, vinculado ou padrão (se configurado). A URL canônica inclui a base de navegação. Query e hash só entram se fornecidos explicitamente. O helper não determina qual conteúdo é canônico nem remove parâmetros de rastreamento automaticamente.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app", origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

<a id="helper-with-defaults"></a>

## route.withDefaults()

Crie um helper isolado com origin, basePath, assetBase ou trailingSlash diferentes. Rotas, idiomas, idioma vinculado, manifesto e schemas permanecem disponíveis. O helper original não muda; use configuração de tenant confiável no servidor, não cabeçalhos Host arbitrários. O retorno usa string para hrefs de forma conservadora.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, { origin: "https://example.com" });
const tenant = urls.withDefaults({
  origin: "https://tenant.example.com", basePath: "/dashboard",
  assetBase: "https://cdn.tenant.example.com",
});
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
urls.canonical("about"); // https://example.com/about
```

<a id="audit"></a>

## Auditoria de rotas e assets

Execute audit no projeto consumidor para encontrar referências literais a rotas/assets desconhecidos, diferenças de caixa, prefixos duplicados e caminhos hardcoded. Escaneia fontes, ignora outputs e nunca reescreve arquivos. É auditoria lexical conservadora, não parser completo: aliases, expressões multilinha e URLs dinâmicas podem escapar; revise avisos de caminhos hardcoded e src. Erros retornam 1, --strict faz avisos falharem, --json gera diagnóstico legível por máquina.

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

<a id="helpers-playground"></a>

## Playground dos helpers

Abra /playground e encontre o laboratório de helpers. Altere basePath, origin, CDN, idioma, caminho, query, strict e version. Os resultados executam o runtime real do pacote com metadados ilustrativos. O navegador não escaneia arquivos locais; use a CLI audit no projeto.

---

← Anterior: [Projeto](project.md) · [Voltar ao README](../../README.pt-BR.md)
