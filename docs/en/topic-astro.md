# Astro: setup

[Documentation](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro.md) · [Português](../pt/topic-astro.md) · [Español](../es/topic-astro.md) · [日本語](../ja/topic-astro.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro"></a>

Register the native integration from @triooo/named-routes/astro in astro.config integrations. It inherits Astro’s final base. Remove namedRoutes() from vite.plugins if migrating from the old configuration. The generated module defaults to src/routes.generated.ts and is usable in .astro frontmatter, islands and endpoints.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

## Related topics

- [File conventions & discovery](topic-astro-conventions.md)
- [Links & navigation](topic-astro-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-astro.md) · Next: [File conventions & discovery](topic-astro-conventions.md) →
