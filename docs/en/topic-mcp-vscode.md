# VS Code / GitHub Copilot

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-vscode.md) · [Português](../pt/topic-mcp-vscode.md) · [Español](../es/topic-mcp-vscode.md) · [日本語](../ja/topic-mcp-vscode.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-vscode"></a>

Create or merge .vscode/mcp.json in the trusted workspace. VS Code uses the servers key and a stdio type, rather than mcpServers. Start the server using the editor MCP controls and confirm that the chat client can see its tools.

## Example

```json
{
  "servers": {
    "named-routes": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

## Related topics

- [Connect a local project](topic-mcp-project.md)
- [Windows and direct Node launcher](topic-mcp-windows.md)
- [Example: build a link from real routes](topic-mcp-workflow.md)

---

← Previous: [Codex configuration](topic-mcp-codex.md) · [All topics](ai-mcp.md) · Next: [Windows and direct Node launcher](topic-mcp-windows.md) →
