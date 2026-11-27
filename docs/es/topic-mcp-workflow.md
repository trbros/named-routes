# Ejemplo: crear un enlace con rutas reales

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-workflow.md) · [Português](../pt/topic-mcp-workflow.md) · [Español](../es/topic-mcp-workflow.md) · [日本語](../ja/topic-mcp-workflow.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-workflow"></a>

Ejemplo de prompt: "Lee el contrato Named Routes y lista las rutas admin.alunos; crea un enlace Next.js para editar un alumno. No inventes nombres ni modifiques el manifiesto generado." El agente usa get_agent_contract, list_routes y get_route si hace falta.

Supón que la ruta devuelta es admin.alunos.edit con patrón /admin/alunos/[aluno]/edit. Es ilustrativa, no una ruta integrada. Si el nombre o parámetro difiere, usa el manifiesto real.

En Next.js Link, route devuelve la URL interna y Next añade su base. Para una URL pública usa route.url. Sin base, la ruta pública es /admin/alunos/42/edit; con base /app es /app/admin/alunos/42/edit. Valida con el comprobador de tipos del consumidor.

<a id="without-base"></a>
## Sin base path

Con la app en la raíz, Link interno y URL pública apuntan a la misma ruta.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

<a id="with-base"></a>
## Con base path

Con basePath: "/app" en Next, mantén Link interno. route.url incluye el prefijo para anclas y enlaces compartidos.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
// Next Link adds /app
<a href={route.url("admin.alunos.edit", { params: { aluno: 42 } })}>Edit</a>;
// /app/admin/alunos/42/edit
```

## Temas relacionados

- [Herramientas y recursos](topic-mcp-tools.md)
- [Conectar un proyecto local](topic-mcp-project.md)
- [route()](topic-helper-route.md)
- [Base path — URL interna y pública](topic-base-path.md)

---

← Anterior: [Herramientas y recursos](topic-mcp-tools.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Seguridad y alcance](topic-mcp-security.md) →
