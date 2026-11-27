# AI agents & MCP

# AI agents & MCP

Topic: `ai-agents` · Named Routes v2.2.0

Use llms.txt as the index and llms-full.txt as the versioned reference. Inspect the actual generated manifest and framework settings before writing code. Examples cover root and subpath deployments.

The read-only stdio MCP server is included in @triooo/named-routes. Run pnpm exec named-routes mcp or pnpm exec named-routes-mcp; add --root <project> and optionally --manifest <relative-file> for inventory. Without a root, only documentation is available. Optional dependencies are installed by default; enable them if omitted. No application code is executed or files changed.

Use pnpm run docs, pnpm run test:mcp and pnpm run test:package before releasing the root package. See mcp/README.md for AI clients and Inspector. The catalog version matches the runtime release, but a project manifest may be stale.

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
---

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
---

# Connect a local project

Topic: `mcp-project` · Named Routes v2.2.0

Without --root, the server exposes documentation only. To inspect project routes, configure the trusted project directory explicitly. The server does not discover routes by running the framework. First generate the module in the consumer using its existing integration or CLI.

Use --manifest for custom outputs or if multiple generated modules exist. Its value is relative to --root. Common outputs include src/routes.generated.ts, app/routes.generated.ts and src/lib/routes.generated.ts. In a monorepo point --root at the actual application.

The selected file must be a recognized, static generated TS/JS manifest within the trusted root, under 2 MiB. Route inventory does not verify manifest freshness, HTTP methods, authorization, assets, defaults or deployed pages.

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
---

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
---

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
---

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
---

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
---

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
---

# Tools and resources

Topic: `mcp-tools` · Named Routes v2.2.0

Use get_agent_contract to read the versioned conventions; search_docs to discover topic IDs; get_topic to read a complete topic; get_framework_guide to list topics for one framework. Documentation queries accept locale en, pt, es or ja.

list_routes filters by name or pattern and paginates using offset and limit (1–100). get_route looks up an exact name. Both require --root. The resource named-routes://agent-contract provides the same agent contract.

The JSON below shows individual tools/call payloads, grouped as an array only for illustration. Call each tool independently through the MCP client; this is not a new batch API.

```json
[
  {
    "name": "get_agent_contract",
    "arguments": {}
  },
  {
    "name": "search_docs",
    "arguments": {
      "query": "Astro base path",
      "locale": "en",
      "limit": 5
    }
  },
  {
    "name": "get_topic",
    "arguments": {
      "id": "astro",
      "locale": "pt"
    }
  },
  {
    "name": "get_framework_guide",
    "arguments": {
      "framework": "astro",
      "locale": "en"
    }
  },
  {
    "name": "list_routes",
    "arguments": {
      "filter": "admin.alunos",
      "offset": 0,
      "limit": 20
    }
  },
  {
    "name": "get_route",
    "arguments": {
      "name": "admin.alunos.edit"
    }
  }
]
```

Related topic IDs: mcp-project, mcp-workflow, mcp-security
---

# Example: build a link from real routes

Topic: `mcp-workflow` · Named Routes v2.2.0

Example prompt: "Read the Named Routes contract and list admin.alunos routes; create a Next.js link for editing a student. Do not invent names or modify the generated manifest." The agent should use get_agent_contract, then list_routes, then get_route if needed.

Assume the returned route is admin.alunos.edit with pattern /admin/alunos/[aluno]/edit. This is illustrative, not a built-in route. If the name or parameter differs, use the actual manifest.

For Next.js Link, route returns the internal URL and Next adds its configured base. For a plain public URL, use route.url. Without a base, the public path is /admin/alunos/42/edit; with base /app it is /app/admin/alunos/42/edit. Validate the generated code with the consumer type checker.

## Without base path

With the app at the domain root, both the internal Next Link and public URL point to the same path.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

## With base path

Assuming Next basePath: "/app", keep the native Link internal. route.url includes the prefix for a plain anchor or a shared URL.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
// Next Link adds /app
<a href={route.url("admin.alunos.edit", { params: { aluno: 42 } })}>Edit</a>;
// /app/admin/alunos/42/edit
```

Related topic IDs: mcp-tools, mcp-project, helper-route, base-path
---

# Security and scope

Topic: `mcp-security` · Named Routes v2.2.0

The server is read-only and local over stdio. It parses static generated manifests as data rather than executing them. It does not run shell commands, execute application configuration, write files, call HTTP endpoints or expose a remote service.

Only select a trusted workspace. The manifest is not a sandbox for hostile filesystems. Agents and clients may have additional independent permissions; MCP read-only annotations are not a global security guarantee. Never put credentials in generated defaults or prompts.

Related topic IDs: mcp-project, mcp-tools, ai-agents
---

# Inspector and troubleshooting

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

Use MCP Inspector to inspect tools and their results without a model. Run the installed package launcher from the consumer. The repository maintainer can run pnpm run test:mcp and pnpm run test:package from the root.

Missing optional dependencies: reinstall with optional dependencies enabled, for example npm install --include=optional. With pnpm, remove the no-optional setting and reinstall. A missing or ambiguous manifest requires generation or --manifest. If no routes are available, verify --root. For Windows MODULE_NOT_FOUND use the direct Node launcher.

A stdio server that waits without printing ordinary log output is normal. Protocol messages use stdout; diagnostics use stderr. If documentation differs from the application, compare the installed package version with the catalog version and regenerate routes intentionally before restarting.

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
