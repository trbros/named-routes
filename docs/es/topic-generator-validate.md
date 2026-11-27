# validateOptions()

[Documentación](index.md) / [Generador y API de herramientas](generator.md)

[English](../en/topic-generator-validate.md) · [Português](../pt/topic-generator-validate.md) · [Español](../es/topic-generator-validate.md) · [日本語](../ja/topic-generator-validate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-validate"></a>

Valida opciones en Node. Claves desconocidas generan INVALID_CONFIG. defineConfig ayuda con tipos.

## Ejemplo

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

## Temas relacionados

- [Configuración del generador](topic-configuration.md)
- [API programática del generador](topic-generator-api.md)

---

← Anterior: [generateRoutes()](topic-generator-generate.md) · [Todos los temas](generator.md)
