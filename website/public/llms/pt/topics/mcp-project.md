# Conectar um projeto local

Topic: `mcp-project` · Named Routes v2.2.0

Sem --root, o servidor oferece apenas documentação. Para inspecionar rotas, configure explicitamente o diretório confiável do projeto. O servidor não descobre rotas executando o framework. Primeiro gere o módulo no consumidor usando a integração ou CLI existente.

Use --manifest para saídas personalizadas ou quando houver vários módulos gerados. Seu valor é relativo a --root. Saídas comuns incluem src/routes.generated.ts, app/routes.generated.ts e src/lib/routes.generated.ts. Em monorepos, aponte --root para a aplicação real.

O arquivo deve ser um manifesto TS/JS estático reconhecido dentro da raiz confiável, menor que 2 MiB. A consulta não verifica atualização do manifesto, métodos HTTP, autorização, assets, defaults ou páginas publicadas.

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
