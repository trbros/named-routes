# Añadir rutas explícitas

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-extra-routes.md) · [Português](../pt/topic-config-extra-routes.md) · [Español](../es/topic-config-extra-routes.md) · [日本語](../ja/topic-config-extra-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-extra-routes"></a>

extraRoutes relaciona nombres con patrones sin requerir descubrimiento. No crea páginas o endpoints.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

## Temas relacionados

- [Nombres estables opcionales](topic-stable-names.md)
- [Rutas manuales (React, Vue, cualquier router)](topic-manual-routes.md)
- [Rewrites y límites](topic-boundaries.md)

---

← Anterior: [Valores predeterminados de URL](topic-config-defaults.md) · [Todos los temas](api-reference.md) · Siguiente: [Activar descubrimiento de API](topic-config-api.md) →
