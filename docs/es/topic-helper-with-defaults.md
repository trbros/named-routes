# route.withDefaults()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-with-defaults.md) · [Português](../pt/topic-helper-with-defaults.md) · [Español](../es/topic-helper-with-defaults.md) · [日本語](../ja/topic-helper-with-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-defaults"></a>

Crea un helper aislado con origin, basePath, assetBase o trailingSlash distintos. Rutas, idiomas, idioma vinculado, manifiesto y esquemas siguen disponibles. El helper original no cambia; usa configuración de tenant confiable, no cabeceras Host arbitrarias. Los hrefs del resultado se tipan como string de forma conservadora.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [URL absolutas y origin](topic-absolute-urls.md)
- [createRoutes()](topic-helper-create-routes.md)

---

← Anterior: [createRoutes()](topic-helper-create-routes.md) · [Todos los temas](route-helpers.md) · Siguiente: [parsePattern()](topic-helper-parse-pattern.md) →
