# Assets e CDN

# asset() / route.asset()

Topic: `assets` · Named Routes v2.2.0

Use `asset(path, { absolute?: boolean })` ou `route.asset()` para URLs públicas em qualquer framework suportado. Diferentemente das rotas nomeadas, os assets incluem o `basePath` efetivo por padrão. Não são afetados por idioma, trailingSlash, nomes de rotas ou schemas de query. O helper apenas constrói URLs; não verifica arquivos, não faz upload, não configura CDN nem substitui imports, otimização de imagens ou hashing do bundler.

Coloque arquivos em `public/` no Next.js, Nuxt, Astro e apps Vite comuns; o SvelteKit usa `static/` por padrão. Passe o caminho relativo a essa pasta (com ou sem uma barra inicial), sem o nome da pasta ou um prefixo já aplicado. Por exemplo, `asset("images/logo.svg")` inclui `/app` uma vez quando a base é `/app`. Unicode e espaços são codificados; query strings e fragmentos são preservados. Valide entradas de URL não confiáveis na aplicação.

Defina `defaults.assetBase` em named-routes.config para sobrescrever a base de assets: `"/files"`, `"/"` (raiz) ou `"https://cdn.example.com/public"`. O padrão é o `basePath` efetivo do Next, Nuxt ou Astro, ou a base do roteador configurada para Vite e manifestos manuais. Se a base do Vite, CDN do Nuxt ou assetPrefix do Next for diferente, configure assetBase explicitamente: prefixos específicos do bundler não são inferidos. Publique os arquivos nesse endereço. `absolute: true` exige defaults.origin, salvo se a URL ou assetBase já for absoluta; nunca usa o host da requisição ou o domínio de idioma. URLs HTTP(S) válidas fornecidas diretamente permanecem iguais; URLs sem protocolo, outros esquemas, credenciais, caminhos ambíguos e segmentos de travessia são rejeitados.

O módulo gerado exporta `asset` junto de `route` e `routes`. Um manifesto manual expõe `route.asset`. Veja o guia separado assetBase e CDN para hospedar arquivos fora da base de navegação.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: asset-base, asset-absolute, typed-assets, asset-has, asset-versioning
---

# route.asset()

Topic: `helper-route-asset` · Named Routes v2.2.0

O helper de assets fica disponível em route.asset em todos os helpers de runtime, inclusive tipados. O módulo gerado também exporta asset diretamente por padrão; ambos compartilham defaults e manifesto.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

Related topic IDs: assets, asset-base
---

# assetBase e CDN

Topic: `asset-base` · Named Routes v2.2.0

`defaults.assetBase` sobrescreve o prefixo público independentemente de `basePath`. Use uma URL HTTP(S) de CDN, um prefixo relativo à raiz ou `/` para ignorar a base de navegação. Não publica arquivos nem configura CDN. Não coloque segredos em defaults: eles são serializados no módulo gerado. Em named-routes.config use o mesmo objeto defaults.

## Sem base path

URL do arquivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

## Com base path

URL do arquivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```
---

# URLs absolutas de assets

Topic: `asset-absolute` · Named Routes v2.2.0

Passe absolute: true para combinar a origem confiável com o caminho do asset. Se assetBase for um CDN absoluto, a URL já é absoluta. Locale não afeta assets.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

Related topic IDs: assets, asset-base, absolute-urls
---

# Assets tipados

Topic: `typed-assets` · Named Routes v2.2.0

Ative `assets` em named-routes.config. O gerador escaneia public/ (static/ no SvelteKit), ignora arquivos ocultos e links simbólicos, aceita globs *, ** e ? em exclude e grava um manifesto de caminhos relativos codificados com hashes SHA-256. strict: true tipa caminhos literais da exportação asset gerada; route.asset() valida o manifesto em runtime. URLs HTTP(S) remotas continuam permitidas. Nenhum arquivo é enviado. Use assets.directory para uma pasta pública personalizada. Build/check atualizam o manifesto; o watch da CLI acompanha a pasta recursivamente.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
---

# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

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

Related topic IDs: asset-has, asset-paths, asset-info, typed-assets
---

# asset.has()

Topic: `asset-has` · Named Routes v2.2.0

Verifique se o caminho local está no manifesto gerado. Não faz requisição nem verifica o deploy.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

Liste caminhos públicos codificados do manifesto. Sem manifesto configurado retorna lista vazia.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.info()

Topic: `asset-info` · Named Routes v2.2.0

Leia metadados (path, extensão, tamanho e versão) de um arquivo conhecido; caminho desconhecido retorna null.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# Versionamento de assets

Topic: `asset-versioning` · Named Routes v2.2.0

Use `{ version: true }` para adicionar ou substituir v pelos primeiros 12 dígitos hexadecimais do SHA-256 do conteúdo. Query e fragmento são preservados. Ative a descoberta e gere novamente quando mudar o conteúdo. URLs remotas e entradas ausentes não podem ser versionadas. É cache busting, não garantia criptográfica de integridade nem purge de CDN.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

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
