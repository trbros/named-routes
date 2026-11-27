# defineQuery()

[Documentación](index.md) / [Consultas tipadas y actualización de URL](queries.md)

[English](../en/topic-helper-define-query.md) · [Português](../pt/topic-helper-define-query.md) · [Español](../es/topic-helper-define-query.md) · [日本語](../ja/topic-helper-define-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query"></a>

Usa un mapa Standard Schema por ruta. Conserva los tipos de entrada y salida. El validador síncrono es opcional.

## Ejemplo

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

## Temas relacionados

- [Parámetros de query tipados](topic-typed-query.md)
- [Conectar un esquema de consulta](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Usar consultas tipadas](topic-query-schema-use.md) · [Todos los temas](queries.md) · Siguiente: [defineQuery.type<T>()](topic-helper-define-query-type.md) →
