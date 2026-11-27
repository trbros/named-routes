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
