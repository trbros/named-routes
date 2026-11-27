# Claude Desktop and Claude Code

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-claude.md) · [Português](../pt/topic-mcp-claude.md) · [Español](../es/topic-mcp-claude.md) · [日本語](../ja/topic-mcp-claude.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-claude"></a>

In Claude Desktop, add the server under mcpServers in its local MCP configuration (Developer settings). Merge the entry into your existing JSON; do not replace other servers. Restart the client and inspect available tools.

For Claude Code, use its MCP configuration or claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Verify with claude mcp list. Pin the release if necessary. On Windows, the absolute Node launcher shown in the Windows guide avoids npx shim issues.

## Example

```json
{
  "mcpServers": {
    "named-routes": {
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

← Previous: [Connect a local project](topic-mcp-project.md) · [All topics](ai-mcp.md) · Next: [Cursor configuration](topic-mcp-cursor.md) →
