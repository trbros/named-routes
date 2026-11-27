# Claude Desktop and Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

In Claude Desktop, add the server under mcpServers in its local MCP configuration (Developer settings). Merge the entry into your existing JSON; do not replace other servers. Restart the client and inspect available tools.

For Claude Code, use its MCP configuration or claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Verify with claude mcp list. Pin the release if necessary. On Windows, the absolute Node launcher shown in the Windows guide avoids npx shim issues.

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

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
