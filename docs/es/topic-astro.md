# Astro: configuración

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro.md) · [Português](../pt/topic-astro.md) · [Español](../es/topic-astro.md) · [日本語](../ja/topic-astro.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro"></a>

Registra la integración nativa de @triooo/named-routes/astro en integrations de astro.config. Hereda el base final de Astro. Si migras desde la configuración anterior, quita namedRoutes() de vite.plugins. El módulo se genera en src/routes.generated.ts y puede usarse en frontmatter .astro, islas y endpoints.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

## Temas relacionados

- [Convenciones y descubrimiento](topic-astro-conventions.md)
- [Enlaces y navegación](topic-astro-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-astro.md) · Siguiente: [Convenciones y descubrimiento](topic-astro-conventions.md) →
