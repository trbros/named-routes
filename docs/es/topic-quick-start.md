# Tu primera ruta con nombre (Next.js)

[Documentación](index.md) / [Primeros pasos](getting-started.md)

[English](../en/topic-quick-start.md) · [Português](../pt/topic-quick-start.md) · [Español](../es/topic-quick-start.md) · [日本語](../ja/topic-quick-start.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="quick-start"></a>

Configuración mínima de Next.js: añade el wrapper en next.config.ts, inicia el servidor y sigue la guía de navegación de Next.js. Para otro framework usa su guía.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

## Temas relacionados

- [Enlaces y navegación](topic-nextjs-navigation.md)
- [Elige tu framework](topic-frameworks.md)
- [Lee el manifiesto generado](topic-generated-source.md)
- [Instalar e iniciar MCP](topic-mcp-installation.md)

---

← Anterior: [Elige tu framework](topic-frameworks.md) · [Todos los temas](getting-started.md) · Siguiente: [Reglas de nombres automáticos](topic-naming.md) →
