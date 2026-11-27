# AI agents & MCP

Topic: `ai-agents` · Named Routes v2.2.0

Use llms.txt as the index and llms-full.txt as the versioned reference. Inspect the actual generated manifest and framework settings before writing code. Examples cover root and subpath deployments.

The read-only stdio MCP server is included in @triooo/named-routes. Run pnpm exec named-routes mcp or pnpm exec named-routes-mcp; add --root <project> and optionally --manifest <relative-file> for inventory. Without a root, only documentation is available. Optional dependencies are installed by default; enable them if omitted. No application code is executed or files changed.

Use pnpm run docs, pnpm run test:mcp and pnpm run test:package before releasing the root package. See mcp/README.md for AI clients and Inspector. The catalog version matches the runtime release, but a project manifest may be stale.

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
