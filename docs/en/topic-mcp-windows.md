# Windows and direct Node launcher

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-windows.md) · [Português](../pt/topic-mcp-windows.md) · [Español](../es/topic-mcp-windows.md) · [日本語](../ja/topic-mcp-windows.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-windows"></a>

If npx or a .cmd shim fails with MODULE_NOT_FOUND before the CLI starts, resolve the installed package and launch its bin file directly using node. This avoids relying on the package-manager executable shim.

The configuration below uses forward slashes in JSON and an absolute path. With pnpm, symlinks in node_modules normally resolve to the package. If needed, locate package.json with node -p "require.resolve('@triooo/named-routes/package.json')" from the consumer, then use bin/named-routes-mcp.js relative to its directory.

## Example

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": [
        "C:/dev/my-app/node_modules/@triooo/named-routes/bin/named-routes-mcp.js",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

## Related topics

- [Install and start MCP](topic-mcp-installation.md)
- [Connect a local project](topic-mcp-project.md)
- [Inspector and troubleshooting](topic-mcp-troubleshooting.md)

---

← Previous: [VS Code / GitHub Copilot](topic-mcp-vscode.md) · [All topics](ai-mcp.md) · Next: [Tools and resources](topic-mcp-tools.md) →
