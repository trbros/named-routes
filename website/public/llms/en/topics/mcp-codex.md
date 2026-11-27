# Codex configuration

Topic: `mcp-codex` · Named Routes v2.2.0

Add a server table to the Codex configuration (~/.codex/config.toml) or use its MCP management commands. Replace the example directory with the project that owns the generated module.

For a locally installed package, command = "node" and args pointing to its absolute bin/named-routes-mcp.js is also supported by the stdio launcher. Restart the session if necessary and check codex mcp list.

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
