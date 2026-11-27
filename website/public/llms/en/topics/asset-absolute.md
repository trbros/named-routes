# Absolute asset URLs

Topic: `asset-absolute` · Named Routes v2.2.0

Pass absolute: true to combine the trusted origin with the asset path. If assetBase is an absolute CDN URL, it is already absolute. Locale does not affect asset URLs.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

Related topic IDs: assets, asset-base, absolute-urls
