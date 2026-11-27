# Inspector and troubleshooting

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

Use MCP Inspector to inspect tools and their results without a model. Run the installed package launcher from the consumer. The repository maintainer can run pnpm run test:mcp and pnpm run test:package from the root.

Missing optional dependencies: reinstall with optional dependencies enabled, for example npm install --include=optional. With pnpm, remove the no-optional setting and reinstall. A missing or ambiguous manifest requires generation or --manifest. If no routes are available, verify --root. For Windows MODULE_NOT_FOUND use the direct Node launcher.

A stdio server that waits without printing ordinary log output is normal. Protocol messages use stdout; diagnostics use stderr. If documentation differs from the application, compare the installed package version with the catalog version and regenerate routes intentionally before restarting.

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
