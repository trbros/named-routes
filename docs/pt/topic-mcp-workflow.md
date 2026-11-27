# Exemplo: criar um link com rotas reais

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-workflow.md) · [Português](../pt/topic-mcp-workflow.md) · [Español](../es/topic-mcp-workflow.md) · [日本語](../ja/topic-mcp-workflow.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-workflow"></a>

Exemplo de prompt: "Leia o contrato Named Routes e liste as rotas admin.alunos; crie um link Next.js para editar um aluno. Não invente nomes nem modifique o manifesto gerado." O agente deve usar get_agent_contract, depois list_routes e get_route se necessário.

Suponha que a rota retornada seja admin.alunos.edit com padrão /admin/alunos/[aluno]/edit. É um exemplo ilustrativo, não uma rota embutida. Se o nome ou parâmetro diferir, use o manifesto real.

No Next.js Link, route retorna a URL interna e o Next adiciona a base configurada. Para URL pública, use route.url. Sem base, o caminho público é /admin/alunos/42/edit; com base /app, é /app/admin/alunos/42/edit. Valide com o typechecker do consumidor.

<a id="without-base"></a>
## Sem base path

Com o app na raiz do domínio, o Link interno e a URL pública apontam para o mesmo caminho.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

<a id="with-base"></a>
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

## Tópicos relacionados

- [Ferramentas e recursos](topic-mcp-tools.md)
- [Conectar um projeto local](topic-mcp-project.md)
- [route()](topic-helper-route.md)
- [Base path — URL interna e pública](topic-base-path.md)

---

← Anterior: [Ferramentas e recursos](topic-mcp-tools.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Segurança e escopo](topic-mcp-security.md) →
