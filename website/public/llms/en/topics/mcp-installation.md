# Install and start MCP

Topic: `mcp-installation` · Named Routes v2.2.0

The Model Context Protocol server is part of @triooo/named-routes. Install the main package only, with optional dependencies enabled. No separate MCP package, web server, API key or account is required.

Use Node.js 22.12 or newer. Run --help and --version to verify the launcher. A bare mcp command starts a stdio server that waits for a client; it is not an HTTP endpoint. Run the commands individually.

The npm and pnpm installation commands are alternatives. Use your existing package manager. After publication, npx can run the package without adding it to the project; pin a version that includes MCP when reproducibility matters.

```sh
pnpm add @triooo/named-routes
# or: npm install @triooo/named-routes

pnpm exec named-routes mcp --help
pnpm exec named-routes-mcp --version

# Start the server (alternative commands):
pnpm exec named-routes mcp
npm exec --package=@triooo/named-routes -- named-routes mcp
npx -y @triooo/named-routes mcp
```

Related topic IDs: mcp-project, mcp-claude, mcp-troubleshooting
