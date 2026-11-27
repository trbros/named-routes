# assetBase & CDN

Topic: `asset-base` · Named Routes v2.2.0

`defaults.assetBase` overrides the public file prefix independently of `basePath`. Use an HTTP(S) CDN URL, a root-relative prefix, or `/` to opt out of the navigation base. It does not deploy files or configure a CDN. Keep secrets out of defaults; they are serialized to the generated module. In named-routes.config use the same defaults object.

## Without base path

Public file URL: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

## With base path

Public file URL: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```
