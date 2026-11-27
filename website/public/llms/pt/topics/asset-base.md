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
