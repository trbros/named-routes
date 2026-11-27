# Conectar un proyecto local

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-project.md) · [Português](../pt/topic-mcp-project.md) · [Español](../es/topic-mcp-project.md) · [日本語](../ja/topic-mcp-project.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-project"></a>

Sin --root, el servidor solo ofrece documentación. Para inspeccionar rutas, configura explícitamente un directorio de confianza. El servidor no ejecuta el framework para descubrir rutas. Genera primero el módulo en el consumidor con su integración o CLI.

Usa --manifest para salidas personalizadas o varios módulos generados. Su valor es relativo a --root. Salidas habituales: src/routes.generated.ts, app/routes.generated.ts y src/lib/routes.generated.ts. En monorepos, usa el directorio de la aplicación.

El archivo debe ser un manifiesto TS/JS estático reconocido dentro de la raíz de confianza, menor de 2 MiB. El inventario no verifica vigencia, métodos HTTP, autorización, assets, defaults ni páginas desplegadas.

## Ejemplo

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

## Temas relacionados

- [Instalar e iniciar MCP](topic-mcp-installation.md)
- [Herramientas y recursos](topic-mcp-tools.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)
- [Inspector y solución de problemas](topic-mcp-troubleshooting.md)

---

← Anterior: [Instalar e iniciar MCP](topic-mcp-installation.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Claude Desktop y Claude Code](topic-mcp-claude.md) →
