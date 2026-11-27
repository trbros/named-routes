# Example: build a link from real routes

[Documentation](index.md) / [AI agents & MCP](ai-mcp.md)

[English](../en/topic-mcp-workflow.md) · [Português](../pt/topic-mcp-workflow.md) · [Español](../es/topic-mcp-workflow.md) · [日本語](../ja/topic-mcp-workflow.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-workflow"></a>

Example prompt: "Read the Named Routes contract and list admin.alunos routes; create a Next.js link for editing a student. Do not invent names or modify the generated manifest." The agent should use get_agent_contract, then list_routes, then get_route if needed.

Assume the returned route is admin.alunos.edit with pattern /admin/alunos/[aluno]/edit. This is illustrative, not a built-in route. If the name or parameter differs, use the actual manifest.

For Next.js Link, route returns the internal URL and Next adds its configured base. For a plain public URL, use route.url. Without a base, the public path is /admin/alunos/42/edit; with base /app it is /app/admin/alunos/42/edit. Validate the generated code with the consumer type checker.

<a id="without-base"></a>
## Without base path

With the app at the domain root, both the internal Next Link and public URL point to the same path.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

<a id="with-base"></a>
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

## Related topics

- [Tools and resources](topic-mcp-tools.md)
- [Connect a local project](topic-mcp-project.md)
- [route()](topic-helper-route.md)
- [Base path — internal vs public URL](topic-base-path.md)

---

← Previous: [Tools and resources](topic-mcp-tools.md) · [All topics](ai-mcp.md) · Next: [Security and scope](topic-mcp-security.md) →
