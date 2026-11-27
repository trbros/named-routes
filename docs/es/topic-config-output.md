# Salida y exports generados

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-output.md) · [Português](../pt/topic-config-output.md) · [Español](../es/topic-config-output.md) · [日本語](../ja/topic-config-output.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-output"></a>

output define el módulo fuera del directorio de rutas. exportNames renombra exports; importSource cambia el import. hrefs: typed es el valor predeterminado.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

## Temas relacionados

- [Lee el manifiesto generado](topic-generated-source.md)
- [Hrefs tipados para typedRoutes de Next.js](topic-typed-hrefs.md)

---

← Anterior: [Descubrimiento y directorios](topic-config-discovery.md) · [Todos los temas](api-reference.md) · Siguiente: [Convenciones de nombres](topic-config-naming.md) →
