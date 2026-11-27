# TanStack Router: setup

Topic: `tanstack-router` · Named Routes v2.2.0

Add namedRoutes() next to tanstackRouter() from @tanstack/router-plugin in vite.config. The plugin scans src/routes (or app/routes) and writes src/routes.generated.ts by default, outside the routes folder, so it never becomes a route.

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

Related topic IDs: tanstack-router-conventions, tanstack-router-navigation, installation, configuration
