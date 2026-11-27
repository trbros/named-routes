# Connect a local project

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-project.md) · [Português](../pt/topic-mcp-project.md) · [Español](../es/topic-mcp-project.md) · [日本語](../ja/topic-mcp-project.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-project"></a>

Without --root, the server exposes documentation only. To inspect project routes, configure the trusted project directory explicitly. The server does not discover routes by running the framework. First generate the module in the consumer using its existing integration or CLI.

Use --manifest for custom outputs or if multiple generated modules exist. Its value is relative to --root. Common outputs include src/routes.generated.ts, app/routes.generated.ts and src/lib/routes.generated.ts. In a monorepo point --root at the actual application.

The selected file must be a recognized, static generated TS/JS manifest within the trusted root, under 2 MiB. Route inventory does not verify manifest freshness, HTTP methods, authorization, assets, defaults or deployed pages.

## Example

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

## Related topics

- [Install and start MCP](topic-mcp-installation.md)
- [Tools and resources](topic-mcp-tools.md)
- [Example: build a link from real routes](topic-mcp-workflow.md)
- [Inspector and troubleshooting](topic-mcp-troubleshooting.md)

---

← Previous: [Install and start MCP](topic-mcp-installation.md) · [All topics](ai-mcp.md) · Next: [Claude Desktop and Claude Code](topic-mcp-claude.md) →
