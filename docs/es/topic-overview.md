# Qué hace

[Documentación](index.md) / [Primeros pasos](getting-started.md)

[English](../en/topic-overview.md) · [Português](../pt/topic-overview.md) · [Español](../es/topic-overview.md) · [日本語](../ja/topic-overview.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="overview"></a>

Named Routes genera helpers de URL tipados desde las rutas que tu framework ya conoce. Usa nombres estables en vez de reconstruir rutas. No reemplaza el router, no navega ni realiza peticiones HTTP. Empieza por la instalación y elige tu framework.

## Ejemplo

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

## Temas relacionados

- [Instalación](topic-installation.md)
- [Elige tu framework](topic-frameworks.md)
- [Reglas de nombres automáticos](topic-naming.md)
- [Nombres estables opcionales](topic-stable-names.md)
- [route()](topic-helper-route.md)
- [Instalar e iniciar MCP](topic-mcp-installation.md)

---

[Todos los temas](getting-started.md) · Siguiente: [Instalación](topic-installation.md) →
