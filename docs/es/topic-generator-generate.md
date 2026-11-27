# generateRoutes()

[Documentación](index.md) / [Generador y API de herramientas](generator.md)

[English](../en/topic-generator-generate.md) · [Português](../pt/topic-generator-generate.md) · [Español](../es/topic-generator-generate.md) · [日本語](../ja/topic-generator-generate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-generate"></a>

Solo Node: descubre y escribe el módulo. check: true rechaza salida obsoleta sin escribirla.

## Ejemplo

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

## Temas relacionados

- [API programática del generador](topic-generator-api.md)
- [generate](topic-cli-generate.md)
- [check](topic-cli-check.md)

---

← Anterior: [discoverRoutes()](topic-generator-discover.md) · [Todos los temas](generator.md) · Siguiente: [validateOptions()](topic-generator-validate.md) →
