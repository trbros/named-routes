# Barras finales

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-trailing-slash.md) · [Português](../pt/topic-trailing-slash.md) · [Español](../es/topic-trailing-slash.md) · [日本語](../ja/topic-trailing-slash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="trailing-slash"></a>

trailingSlash cambia el formato, no las redirecciones del servidor. Usa la misma política en el framework.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

## Temas relacionados

- [Base path — URL interna y pública](topic-base-path.md)
- [Valores predeterminados de URL](topic-config-defaults.md)

---

← Anterior: [URL absolutas y origin](topic-absolute-urls.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Nombres semánticos y grupos](topic-semantic-names.md) →
