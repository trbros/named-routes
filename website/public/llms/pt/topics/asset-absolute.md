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
