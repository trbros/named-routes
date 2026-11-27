# Cursor configuration

Topic: `mcp-cursor` · Named Routes v2.2.0

Add the entry to .cursor/mcp.json in the project (or the equivalent global MCP configuration). Merge existing mcpServers entries. Approve the local server only for a trusted project.

The example assumes the package version with MCP is available from npm. For a local checkout or a broken Windows shim, prefer the direct Node launcher.

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
