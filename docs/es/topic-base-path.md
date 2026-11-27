# Base path — URL interna y pública

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-base-path.md) · [Português](../pt/topic-base-path.md) · [Español](../es/topic-base-path.md) · [日本語](../ja/topic-base-path.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="base-path"></a>

Usa route() para la navegación nativa de Next.js, Nuxt, Vue Router, React Router y TanStack Router. Astro, SvelteKit y la generación manual incluyen la base configurada por defecto. Usa route.url() para URL públicas. defaults.includeBasePath y basePath cambian el valor predeterminado; las URL absolutas incluyen la base.

Usa la guía de despliegue del framework. La CLI reutiliza la base en .named-routes/ o acepta --base-path /app; / elimina el prefijo. No uses un CDN como base de navegación.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

## Temas relacionados

- [route.url() — URL públicas](topic-public-url.md)
- [URL absolutas y origin](topic-absolute-urls.md)
- [Barras finales](topic-trailing-slash.md)
- [assetBase y CDN](topic-asset-base.md)
- [generate](topic-cli-generate.md)

---

← Anterior: [Fragmentos de URL (hash)](topic-hash-fragments.md) · [Todos los temas](build-with-routes.md) · Siguiente: [URL absolutas y origin](topic-absolute-urls.md) →
