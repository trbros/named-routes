# Windows and direct Node launcher

Topic: `mcp-windows` · Named Routes v2.2.0

If npx or a .cmd shim fails with MODULE_NOT_FOUND before the CLI starts, resolve the installed package and launch its bin file directly using node. This avoids relying on the package-manager executable shim.

The configuration below uses forward slashes in JSON and an absolute path. With pnpm, symlinks in node_modules normally resolve to the package. If needed, locate package.json with node -p "require.resolve('@triooo/named-routes/package.json')" from the consumer, then use bin/named-routes-mcp.js relative to its directory.

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

Related topic IDs: mcp-installation, mcp-project, mcp-troubleshooting
