# URL absolutas y origin

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-absolute-urls.md) · [Português](../pt/topic-absolute-urls.md) · [Español](../es/topic-absolute-urls.md) · [日本語](../ja/topic-absolute-urls.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="absolute-urls"></a>

Configura defaults.origin como origen HTTP(S) de confianza, sin credenciales ni ruta. absolute: true incluye la base. No se adivina el origen; no incluyas secretos.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [route.canonical()](topic-helper-canonical.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← Anterior: [Base path — URL interna y pública](topic-base-path.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Barras finales](topic-trailing-slash.md) →
