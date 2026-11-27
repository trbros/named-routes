# assetBase y CDN

Topic: `asset-base` · Named Routes v2.2.0

`defaults.assetBase` reemplaza el prefijo público independientemente de `basePath`. Usa una URL HTTP(S) de CDN, un prefijo relativo a la raíz o `/` para omitir la base de navegación. No despliega archivos ni configura un CDN. No incluyas secretos en defaults: se serializan en el módulo generado. En named-routes.config usa el mismo objeto defaults.

## Sin base path

URL del archivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

## Con base path

URL del archivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```
