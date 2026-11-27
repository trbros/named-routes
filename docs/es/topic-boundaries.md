# Rewrites y límites

[Documentación](index.md) / [CLI, CI y resolución de problemas](guides.md)

[English](../en/topic-boundaries.md) · [Português](../pt/topic-boundaries.md) · [Español](../es/topic-boundaries.md) · [日本語](../ja/topic-boundaries.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="boundaries"></a>

Es un constructor de URLs, no un reemplazo del router, un middleware, un sistema de autorización ni un cliente HTTP. No crea rutas en runtime, no valida que existan los recursos, no detecta el idioma del visitante ni hace peticiones al backend.

Los redirects, los rewrites y la detección de idioma por middleware siguen siendo responsabilidad de la aplicación; las rutas declaradas en código solo reciben nombre cuando el framework publica su tabla de rutas (ver Otros frameworks). Mapea explícitamente con extraRoutes cualquier patrón externo o reescrito que necesites y evita aplicar el idioma o el basePath dos veces. El escáner no lee los archivos de configuración del framework; usa withNamedRoutes o las opciones para pasar ajustes.

## Ejemplo

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Anterior: [Errores y solución de problemas](topic-errors.md) · [Todos los temas](guides.md)
