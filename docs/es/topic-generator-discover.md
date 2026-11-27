# discoverRoutes()

[Documentación](index.md) / [Generador y API de herramientas](generator.md)

[English](../en/topic-generator-discover.md) · [Português](../pt/topic-generator-discover.md) · [Español](../es/topic-generator-discover.md) · [日本語](../ja/topic-generator-discover.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-discover"></a>

Solo Node: descubre rutas sin escribir el archivo de salida. Inspecciona entries y metadatos.

## Ejemplo

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

## Temas relacionados

- [API programática del generador](topic-generator-api.md)
- [Casos límite del descubrimiento](topic-discovery.md)

---

← Anterior: [API programática del generador](topic-generator-api.md) · [Todos los temas](generator.md) · Siguiente: [generateRoutes()](topic-generator-generate.md) →
