# Ejemplo: crear un enlace con rutas reales

Topic: `mcp-workflow` · Named Routes v2.2.0

Ejemplo de prompt: "Lee el contrato Named Routes y lista las rutas admin.alunos; crea un enlace Next.js para editar un alumno. No inventes nombres ni modifiques el manifiesto generado." El agente usa get_agent_contract, list_routes y get_route si hace falta.

Supón que la ruta devuelta es admin.alunos.edit con patrón /admin/alunos/[aluno]/edit. Es ilustrativa, no una ruta integrada. Si el nombre o parámetro difiere, usa el manifiesto real.

En Next.js Link, route devuelve la URL interna y Next añade su base. Para una URL pública usa route.url. Sin base, la ruta pública es /admin/alunos/42/edit; con base /app es /app/admin/alunos/42/edit. Valida con el comprobador de tipos del consumidor.

## Sin base path

Con la app en la raíz, Link interno y URL pública apuntan a la misma ruta.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

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

Related topic IDs: mcp-tools, mcp-project, helper-route, base-path
