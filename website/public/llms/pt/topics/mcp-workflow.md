# Exemplo: criar um link com rotas reais

Topic: `mcp-workflow` · Named Routes v2.2.0

Exemplo de prompt: "Leia o contrato Named Routes e liste as rotas admin.alunos; crie um link Next.js para editar um aluno. Não invente nomes nem modifique o manifesto gerado." O agente deve usar get_agent_contract, depois list_routes e get_route se necessário.

Suponha que a rota retornada seja admin.alunos.edit com padrão /admin/alunos/[aluno]/edit. É um exemplo ilustrativo, não uma rota embutida. Se o nome ou parâmetro diferir, use o manifesto real.

No Next.js Link, route retorna a URL interna e o Next adiciona a base configurada. Para URL pública, use route.url. Sem base, o caminho público é /admin/alunos/42/edit; com base /app, é /app/admin/alunos/42/edit. Valide com o typechecker do consumidor.

## Sem base path

Com o app na raiz do domínio, o Link interno e a URL pública apontam para o mesmo caminho.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

## Com base path

Considerando basePath: "/app" no Next, mantenha o Link nativo interno. route.url inclui o prefixo para âncora ou compartilhamento.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
// Next Link adds /app
<a href={route.url("admin.alunos.edit", { params: { aluno: 42 } })}>Edit</a>;
// /app/admin/alunos/42/edit
```

Related topic IDs: mcp-tools, mcp-project, helper-route, base-path
