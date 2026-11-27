# AI agents & MCP

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-ai-agents.md) · [Português](../pt/topic-ai-agents.md) · [Español](../es/topic-ai-agents.md) · [日本語](../ja/topic-ai-agents.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="ai-agents"></a>

Use llms.txt as the index and llms-full.txt as the versioned reference. Inspect the actual generated manifest and framework settings before writing code. Examples cover root and subpath deployments.

The read-only stdio MCP server is included in @triooo/named-routes. Run pnpm exec named-routes mcp or pnpm exec named-routes-mcp; add --root <project> and optionally --manifest <relative-file> for inventory. Without a root, only documentation is available. Optional dependencies are installed by default; enable them if omitted. No application code is executed or files changed.

Use pnpm run docs, pnpm run test:mcp and pnpm run test:package before releasing the root package. See mcp/README.md for AI clients and Inspector. The catalog version matches the runtime release, but a project manifest may be stale.

## Related topics

- [What it does](topic-overview.md)
- [CLI and CI](topic-cli.md)
- [Generator configuration](topic-configuration.md)
- [route.url() — public URLs](topic-public-url.md)
- [Install and start MCP](topic-mcp-installation.md)
- [Connect a local project](topic-mcp-project.md)
- [Tools and resources](topic-mcp-tools.md)
- [Example: build a link from real routes](topic-mcp-workflow.md)
- [Security and scope](topic-mcp-security.md)

---

[All topics](ai-mcp.md) · Next: [Install and start MCP](topic-mcp-installation.md) →
