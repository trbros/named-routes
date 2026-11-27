# Inspector and troubleshooting

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-troubleshooting.md) · [Português](../pt/topic-mcp-troubleshooting.md) · [Español](../es/topic-mcp-troubleshooting.md) · [日本語](../ja/topic-mcp-troubleshooting.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-troubleshooting"></a>

Use MCP Inspector to inspect tools and their results without a model. Run the installed package launcher from the consumer. The repository maintainer can run pnpm run test:mcp and pnpm run test:package from the root.

Missing optional dependencies: reinstall with optional dependencies enabled, for example npm install --include=optional. With pnpm, remove the no-optional setting and reinstall. A missing or ambiguous manifest requires generation or --manifest. If no routes are available, verify --root. For Windows MODULE_NOT_FOUND use the direct Node launcher.

A stdio server that waits without printing ordinary log output is normal. Protocol messages use stdout; diagnostics use stderr. If documentation differs from the application, compare the installed package version with the catalog version and regenerate routes intentionally before restarting.

## Example

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

## Related topics

- [Windows and direct Node launcher](topic-mcp-windows.md)
- [Install and start MCP](topic-mcp-installation.md)
- [Connect a local project](topic-mcp-project.md)
- [Tools and resources](topic-mcp-tools.md)

---

← Previous: [Security and scope](topic-mcp-security.md) · [All topics](ai-mcp.md)
