# Activar descubrimiento de API

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-api.md) · [Português](../pt/topic-config-api.md) · [Español](../es/topic-config-api.md) · [日本語](../ja/topic-config-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-api"></a>

includeApi es false por defecto. Actívalo para incluir endpoints reconocidos. Solo se generan métodos detectables estáticamente.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← Anterior: [Añadir rutas explícitas](topic-config-extra-routes.md) · [Todos los temas](api-reference.md) · Siguiente: [Watch y opciones de desarrollo](topic-config-watch.md) →
