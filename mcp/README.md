# Named Routes MCP

The read-only Model Context Protocol server is included in `@triooo/named-routes`. It is not a separately published package. The runtime and MCP catalog share one version. The official TypeScript MCP SDK v2 uses stdio; the server does not require hosting. The normal runtime does not import the server. The server SDK, Zod and a dedicated TypeScript AST parser are optional installation dependencies; package managers install them by default unless optional dependencies are disabled.

## Consumer usage

```sh
pnpm add @triooo/named-routes
pnpm exec named-routes mcp --root /path/to/project
# same server, different executable
pnpm exec named-routes-mcp --root /path/to/project
# npm: select the binary explicitly
npm exec --package=@triooo/named-routes -- named-routes mcp --root /path/to/project
```

`npx @triooo/named-routes mcp` also selects the bin matching the unscoped package name. The explicit npm exec form avoids ambiguity. A project is optional: omit `--root` for docs only. If multiple generated manifests exist, use `--manifest` with a path relative to the trusted root. These commands start a stdio server and wait for a client; use `--help` or `--version` to check the launchers without starting the server.

## Configure an AI client

For clients supporting `mcpServers` (e.g. Claude Desktop or Cursor):

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
    }
  }
}
```

After publication, pin the installed package version in the npx package spec if reproducibility matters. On Windows, use `cmd` with `/d /c npx ...` if the host requires it, or avoid command shims by using an absolute Node executable and the installed package's `bin/named-routes-mcp.js` file. For an unpublished local checkout, point directly to its launcher:

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": ["C:/dev/named-routes/bin/named-routes-mcp.js", "--root", "C:/dev/my-app", "--manifest", "src/routes.generated.ts"]
    }
  }
}
```

For VS Code `.vscode/mcp.json`, use `servers` rather than `mcpServers` and set `"type": "stdio"` in the server entry. For Codex:

```toml
[mcp_servers.named_routes]
command = "node"
args = ["C:/dev/named-routes/bin/named-routes-mcp.js", "--root", "C:/dev/my-app"]
```

## Tools and trust boundary

| Tool | Purpose |
|---|---|
| `get_agent_contract` | Read versioned conventions and constraints |
| `search_docs` | Search by function, framework or task; locale en/pt/es/ja |
| `get_topic` | Read a topic with deployment examples |
| `get_framework_guide` | List framework-specific topic IDs |
| `list_routes` | Filter and paginate generated name-to-pattern inventory |
| `get_route` | Look up an exact route name |

Resource: `named-routes://agent-contract`. The server parses generated TS/JS as static data; it never imports application code or config, runs shell commands, makes HTTP requests or writes files. Select only a trusted local project. It is not a sandbox for hostile filesystems. Inventory may be stale, and endpoint methods, defaults and assets are not inferred by the inventory tools. Match the catalog to the consumer's installed runtime version.

## Maintainers

From the repository root, using the existing pnpm lockfile:

```sh
pnpm install --no-frozen-lockfile
pnpm run docs
pnpm run docs:check
pnpm run build
pnpm run test:mcp
pnpm run test:package
npx @modelcontextprotocol/inspector node bin/named-routes-mcp.js
```

If optional dependencies were disabled, reinstall with optional dependencies enabled; the ordinary CLI remains usable. A previous standalone MCP checkout may have a stale `mcp/node_modules`; remove or move that directory before installing at the root. The previous standalone package manifest is removed by the integration patch. Do not install or publish from `mcp/`.

Release from the repository root using the existing Named Routes release workflow. `npm pack` checks the bundled catalog version, and the package smoke test exercises both installed launchers and the MCP protocol. Commit the updated root `pnpm-lock.yaml` and generated docs/catalog. No second npm release or registry package is needed. See https://ts.sdk.modelcontextprotocol.io/v2/ for SDK guidance.

## Full guide

[Installation](../docs/en/topic-mcp-installation.md) · [Project setup](../docs/en/topic-mcp-project.md) · [Claude](../docs/en/topic-mcp-claude.md) · [Cursor](../docs/en/topic-mcp-cursor.md) · [Codex](../docs/en/topic-mcp-codex.md) · [VS Code](../docs/en/topic-mcp-vscode.md) · [Windows](../docs/en/topic-mcp-windows.md) · [Tools](../docs/en/topic-mcp-tools.md) · [Example workflow](../docs/en/topic-mcp-workflow.md) · [Troubleshooting](../docs/en/topic-mcp-troubleshooting.md)
