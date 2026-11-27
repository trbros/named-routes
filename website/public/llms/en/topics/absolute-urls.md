# Absolute URLs & origin

Topic: `absolute-urls` · Named Routes v2.2.0

Set defaults.origin to a trusted HTTP(S) origin without credentials, path, query or hash. absolute: true includes the base. The runtime never guesses the origin from window or request headers; public config must not contain secrets.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

Related topic IDs: base-path, helper-canonical, helper-with-defaults
