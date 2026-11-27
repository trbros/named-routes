# Segmentos mixtos

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-mixed-parameters.md) · [Português](../pt/topic-mixed-parameters.md) · [Español](../es/topic-mixed-parameters.md) · [日本語](../ja/topic-mixed-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mixed-parameters"></a>

Un segmento mixto combina texto literal y parámetros obligatorios. Cada parámetro tiene su propia clave.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

## Temas relacionados

- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Reglas de nombres automáticos](topic-naming.md)

---

← Anterior: [Parámetros catch-all](topic-catch-all-parameters.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Cadenas de consulta](topic-query-hash.md) →
