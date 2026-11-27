# Cursor configuration

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-cursor.md) · [Português](../pt/topic-mcp-cursor.md) · [Español](../es/topic-mcp-cursor.md) · [日本語](../ja/topic-mcp-cursor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-cursor"></a>

Add the entry to .cursor/mcp.json in the project (or the equivalent global MCP configuration). Merge existing mcpServers entries. Approve the local server only for a trusted project.

The example assumes the package version with MCP is available from npm. For a local checkout or a broken Windows shim, prefer the direct Node launcher.

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

← Previous: [Claude Desktop and Claude Code](topic-mcp-claude.md) · [All topics](ai-mcp.md) · Next: [Codex configuration](topic-mcp-codex.md) →
