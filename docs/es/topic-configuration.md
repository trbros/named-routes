# Configuración del generador

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-configuration.md) · [Português](../pt/topic-configuration.md) · [Español](../es/topic-configuration.md) · [日本語](../ja/topic-configuration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="configuration"></a>

La configuración es opcional. Añade solo lo necesario. El orden es .ts, .mts, .mjs, .js, .cjs, .json; usa .mjs si Node no admite TypeScript. defineConfig da autocompletado; --config elige otro archivo.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

## Temas relacionados

- [Descubrimiento y directorios](topic-config-discovery.md)
- [Salida y exports generados](topic-config-output.md)
- [Convenciones de nombres](topic-config-naming.md)
- [Valores predeterminados de URL](topic-config-defaults.md)
- [Activar descubrimiento de API](topic-config-api.md)
- [Añadir rutas explícitas](topic-config-extra-routes.md)

---

← Anterior: [Referencia de la API del runtime](topic-runtime-api.md) · [Todos los temas](api-reference.md) · Siguiente: [Descubrimiento y directorios](topic-config-discovery.md) →
