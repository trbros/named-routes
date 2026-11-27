# TanStack Router: setup

[Documentation](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router.md) · [Português](../pt/topic-tanstack-router.md) · [Español](../es/topic-tanstack-router.md) · [日本語](../ja/topic-tanstack-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router"></a>

Add namedRoutes() next to tanstackRouter() from @tanstack/router-plugin in vite.config. The plugin scans src/routes (or app/routes) and writes src/routes.generated.ts by default, outside the routes folder, so it never becomes a route.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes. In the existing router setup use createRouter({ routeTree, basepath: "/app" }).

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## Related topics

- [File conventions & discovery](topic-tanstack-router-conventions.md)
- [Links & navigation](topic-tanstack-router-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-tanstack-router.md) · Next: [File conventions & discovery](topic-tanstack-router-conventions.md) →
