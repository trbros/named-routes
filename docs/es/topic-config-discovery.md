# Descubrimiento y directorios

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-discovery.md) · [Português](../pt/topic-config-discovery.md) · [Español](../es/topic-config-discovery.md) · [日本語](../ja/topic-config-discovery.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-discovery"></a>

Usa framework: auto o explícito. discovery: framework usa la tabla publicada; files fuerza el escáner. Next usa appDir/pagesDir; otros routesDir. pageExtensions y exclude personalizan la búsqueda.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

## Temas relacionados

- [Casos límite del descubrimiento](topic-discovery.md)
- [Cómo funciona la generación](topic-architecture.md)
- [Reglas de nombres automáticos](topic-naming.md)

---

← Anterior: [Configuración del generador](topic-configuration.md) · [Todos los temas](api-reference.md) · Siguiente: [Salida y exports generados](topic-config-output.md) →
