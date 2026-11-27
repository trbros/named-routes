# Conectar un proyecto local

Topic: `mcp-project` · Named Routes v2.2.0

Sin --root, el servidor solo ofrece documentación. Para inspeccionar rutas, configura explícitamente un directorio de confianza. El servidor no ejecuta el framework para descubrir rutas. Genera primero el módulo en el consumidor con su integración o CLI.

Usa --manifest para salidas personalizadas o varios módulos generados. Su valor es relativo a --root. Salidas habituales: src/routes.generated.ts, app/routes.generated.ts y src/lib/routes.generated.ts. En monorepos, usa el directorio de la aplicación.

El archivo debe ser un manifiesto TS/JS estático reconocido dentro de la raíz de confianza, menor de 2 MiB. El inventario no verifica vigencia, métodos HTTP, autorización, assets, defaults ni páginas desplegadas.

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
