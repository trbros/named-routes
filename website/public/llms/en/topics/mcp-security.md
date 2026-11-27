# Security and scope

Topic: `mcp-security` · Named Routes v2.2.0

The server is read-only and local over stdio. It parses static generated manifests as data rather than executing them. It does not run shell commands, execute application configuration, write files, call HTTP endpoints or expose a remote service.

Only select a trusted workspace. The manifest is not a sandbox for hostile filesystems. Agents and clients may have additional independent permissions; MCP read-only annotations are not a global security guarantee. Never put credentials in generated defaults or prompts.

Related topic IDs: mcp-project, mcp-tools, ai-agents
