# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

Create or merge .vscode/mcp.json in the trusted workspace. VS Code uses the servers key and a stdio type, rather than mcpServers. Start the server using the editor MCP controls and confirm that the chat client can see its tools.

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

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
