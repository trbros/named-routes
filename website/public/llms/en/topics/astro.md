# Astro: setup

Topic: `astro` · Named Routes v2.2.0

Register the native integration from @triooo/named-routes/astro in astro.config integrations. It inherits Astro’s final base. Remove namedRoutes() from vite.plugins if migrating from the old configuration. The generated module defaults to src/routes.generated.ts and is usable in .astro frontmatter, islands and endpoints.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

Related topic IDs: astro-conventions, astro-navigation, installation, configuration
