# Watch y opciones de desarrollo

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-watch.md) · [Português](../pt/topic-config-watch.md) · [Español](../es/topic-config-watch.md) · [日本語](../ja/topic-config-watch.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-watch"></a>

La integración actualiza rutas en desarrollo. withNamedRoutes acepta watch, watchMode y watchInterval. Usa polling si los eventos nativos no funcionan.

## Ejemplo

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

## Temas relacionados

- [Actualizaciones automáticas en desarrollo](topic-development.md)
- [watch](topic-cli-watch.md)

---

← Anterior: [Activar descubrimiento de API](topic-config-api.md) · [Todos los temas](api-reference.md)
