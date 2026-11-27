# SvelteKit: configuración

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit.md) · [Português](../pt/topic-sveltekit.md) · [Español](../es/topic-sveltekit.md) · [日本語](../ja/topic-sveltekit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit"></a>

Añade namedRoutes() antes de sveltekit() en vite.config. Escribir el módulo en src/lib te permite importarlo como $lib/routes.generated desde cualquier componente, función load o endpoint.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. Esta configuración es para SvelteKit 3. En SvelteKit 2 configura kit.paths.base y comparte el prefijo con routerBase.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

## Temas relacionados

- [Convenciones y descubrimiento](topic-sveltekit-conventions.md)
- [Enlaces y navegación](topic-sveltekit-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-sveltekit.md) · Siguiente: [Convenciones y descubrimiento](topic-sveltekit-conventions.md) →
