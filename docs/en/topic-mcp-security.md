# Security and scope

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-security.md) · [Português](../pt/topic-mcp-security.md) · [Español](../es/topic-mcp-security.md) · [日本語](../ja/topic-mcp-security.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-security"></a>

The server is read-only and local over stdio. It parses static generated manifests as data rather than executing them. It does not run shell commands, execute application configuration, write files, call HTTP endpoints or expose a remote service.

Only select a trusted workspace. The manifest is not a sandbox for hostile filesystems. Agents and clients may have additional independent permissions; MCP read-only annotations are not a global security guarantee. Never put credentials in generated defaults or prompts.

## Related topics

- [Connect a local project](topic-mcp-project.md)
- [Tools and resources](topic-mcp-tools.md)
- [AI agents & MCP](topic-ai-agents.md)

---

← Previous: [Example: build a link from real routes](topic-mcp-workflow.md) · [All topics](ai-mcp.md) · Next: [Inspector and troubleshooting](topic-mcp-troubleshooting.md) →
