# Conectar un esquema de consulta

[Documentación](index.md) / [Consultas tipadas y actualización de URL](queries.md)

[English](../en/topic-query-schema-config.md) · [Português](../pt/topic-query-schema-config.md) · [Español](../es/topic-query-schema-config.md) · [日本語](../ja/topic-query-schema-config.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-config"></a>

Apunta query al módulo defineQuery. Activa validateQuery para validar en ejecución; los esquemas solo de tipos no validan valores.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

## Temas relacionados

- [Parámetros de query tipados](topic-typed-query.md)
- [Usar consultas tipadas](topic-query-schema-use.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Parámetros de query tipados](topic-typed-query.md) · [Todos los temas](queries.md) · Siguiente: [Usar consultas tipadas](topic-query-schema-use.md) →
