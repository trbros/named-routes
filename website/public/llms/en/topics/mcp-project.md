# Connect a local project

Topic: `mcp-project` · Named Routes v2.2.0

Without --root, the server exposes documentation only. To inspect project routes, configure the trusted project directory explicitly. The server does not discover routes by running the framework. First generate the module in the consumer using its existing integration or CLI.

Use --manifest for custom outputs or if multiple generated modules exist. Its value is relative to --root. Common outputs include src/routes.generated.ts, app/routes.generated.ts and src/lib/routes.generated.ts. In a monorepo point --root at the actual application.

The selected file must be a recognized, static generated TS/JS manifest within the trusted root, under 2 MiB. Route inventory does not verify manifest freshness, HTTP methods, authorization, assets, defaults or deployed pages.

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
