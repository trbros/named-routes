# Codex configuration

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-codex.md) · [Português](../pt/topic-mcp-codex.md) · [Español](../es/topic-mcp-codex.md) · [日本語](../ja/topic-mcp-codex.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-codex"></a>

Add a server table to the Codex configuration (~/.codex/config.toml) or use its MCP management commands. Replace the example directory with the project that owns the generated module.

For a locally installed package, command = "node" and args pointing to its absolute bin/named-routes-mcp.js is also supported by the stdio launcher. Restart the session if necessary and check codex mcp list.

## Example

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

## Related topics

- [Connect a local project](topic-mcp-project.md)
- [Windows and direct Node launcher](topic-mcp-windows.md)
- [Example: build a link from real routes](topic-mcp-workflow.md)

---

← Previous: [Cursor configuration](topic-mcp-cursor.md) · [All topics](ai-mcp.md) · Next: [VS Code / GitHub Copilot](topic-mcp-vscode.md) →
