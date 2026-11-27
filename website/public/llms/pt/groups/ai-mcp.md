# Agentes de IA e MCP

# Agentes de IA e MCP

Topic: `ai-agents` · Named Routes v2.2.0

Use llms.txt como índice e llms-full.txt como referência versionada. Consulte o manifesto gerado e a configuração real do framework antes de escrever código. Há exemplos com e sem base path.

O servidor MCP stdio somente leitura está incluído em @triooo/named-routes. Execute pnpm exec named-routes mcp ou pnpm exec named-routes-mcp; adicione --root <projeto> e opcionalmente --manifest <arquivo-relativo> para consultar rotas. Sem root, apenas a documentação fica disponível. As dependências opcionais são instaladas por padrão; habilite-as se omitidas. Nenhum código da aplicação é executado ou arquivo alterado.

Use pnpm run docs, pnpm run test:mcp e pnpm run test:package antes de publicar o pacote principal. Veja mcp/README.md para clientes de IA e Inspector. A versão do catálogo acompanha a biblioteca, mas o manifesto de um projeto pode estar desatualizado.

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
---

# Instalar e iniciar o MCP

Topic: `mcp-installation` · Named Routes v2.2.0

O servidor Model Context Protocol faz parte de @triooo/named-routes. Instale apenas o pacote principal, com dependências opcionais habilitadas. Não é necessário pacote MCP separado, servidor web, chave de API ou conta.

Use Node.js 22.12 ou superior. Execute --help e --version para verificar o launcher. O comando mcp sem outras opções inicia um servidor stdio que aguarda um cliente; não é um endpoint HTTP. Execute os comandos individualmente.

Os comandos de instalação npm e pnpm são alternativas. Use o gerenciador do seu projeto. Após a publicação, npx pode executar o pacote sem adicioná-lo ao projeto; fixe uma versão que inclua MCP quando precisar de reprodutibilidade.

```sh
pnpm add @triooo/named-routes
# or: npm install @triooo/named-routes

pnpm exec named-routes mcp --help
pnpm exec named-routes-mcp --version

# Start the server (alternative commands):
pnpm exec named-routes mcp
npm exec --package=@triooo/named-routes -- named-routes mcp
npx -y @triooo/named-routes mcp
```

Related topic IDs: mcp-project, mcp-claude, mcp-troubleshooting
---

# Conectar um projeto local

Topic: `mcp-project` · Named Routes v2.2.0

Sem --root, o servidor oferece apenas documentação. Para inspecionar rotas, configure explicitamente o diretório confiável do projeto. O servidor não descobre rotas executando o framework. Primeiro gere o módulo no consumidor usando a integração ou CLI existente.

Use --manifest para saídas personalizadas ou quando houver vários módulos gerados. Seu valor é relativo a --root. Saídas comuns incluem src/routes.generated.ts, app/routes.generated.ts e src/lib/routes.generated.ts. Em monorepos, aponte --root para a aplicação real.

O arquivo deve ser um manifesto TS/JS estático reconhecido dentro da raiz confiável, menor que 2 MiB. A consulta não verifica atualização do manifesto, métodos HTTP, autorização, assets, defaults ou páginas publicadas.

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
---

# Claude Desktop e Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

No Claude Desktop, adicione o servidor em mcpServers na configuração MCP local (configurações de desenvolvedor). Mescle a entrada ao JSON existente; não substitua outros servidores. Reinicie o cliente e confira as ferramentas.

No Claude Code, use a configuração MCP ou claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Confira com claude mcp list. Fixe a versão se necessário. No Windows, o launcher Node absoluto do guia Windows evita problemas com shims do npx.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Configuração do Cursor

Topic: `mcp-cursor` · Named Routes v2.2.0

Adicione a entrada ao .cursor/mcp.json do projeto (ou à configuração MCP global equivalente). Mescle as entradas existentes de mcpServers. Autorize o servidor local apenas para projetos confiáveis.

O exemplo pressupõe que a versão com MCP está disponível no npm. Para checkout local ou shim com problema no Windows, prefira o launcher Node direto.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Configuração do Codex

Topic: `mcp-codex` · Named Routes v2.2.0

Adicione uma tabela de servidor na configuração do Codex (~/.codex/config.toml) ou use os comandos de gerenciamento MCP. Substitua o diretório de exemplo pelo projeto dono do módulo gerado.

Para pacote instalado localmente, também é possível usar command = "node" e args apontando para seu bin/named-routes-mcp.js absoluto. Reinicie a sessão se necessário e confira codex mcp list.

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

Crie ou mescle .vscode/mcp.json no workspace confiável. O VS Code usa a chave servers e o tipo stdio, em vez de mcpServers. Inicie pelo controle MCP do editor e confirme que o cliente de chat vê as ferramentas.

```json
{
  "servers": {
    "named-routes": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Windows e launcher Node direto

Topic: `mcp-windows` · Named Routes v2.2.0

Se npx ou um shim .cmd falhar com MODULE_NOT_FOUND antes da CLI iniciar, resolva o pacote instalado e execute seu bin diretamente com node. Isso evita depender do shim executável do gerenciador.

A configuração abaixo usa barras normais em JSON e caminho absoluto. No pnpm, os links de node_modules normalmente resolvem o pacote. Se necessário, localize package.json com node -p "require.resolve('@triooo/named-routes/package.json')" no consumidor e use bin/named-routes-mcp.js relativo ao diretório dele.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": [
        "C:/dev/my-app/node_modules/@triooo/named-routes/bin/named-routes-mcp.js",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-installation, mcp-project, mcp-troubleshooting
---

# Ferramentas e recursos

Topic: `mcp-tools` · Named Routes v2.2.0

Use get_agent_contract para ler as convenções versionadas; search_docs para descobrir IDs de tópicos; get_topic para ler um tópico completo; get_framework_guide para listar tópicos de um framework. Consultas aceitam locale en, pt, es ou ja.

list_routes filtra por nome ou padrão e pagina por offset e limit (1–100). get_route procura um nome exato. Ambos exigem --root. O recurso named-routes://agent-contract oferece o mesmo contrato para agentes.

O JSON abaixo mostra payloads individuais de tools/call, agrupados em um array apenas para ilustração. Chame cada ferramenta separadamente pelo cliente MCP; não é uma API de lote.

```json
[
  {
    "name": "get_agent_contract",
    "arguments": {}
  },
  {
    "name": "search_docs",
    "arguments": {
      "query": "Astro base path",
      "locale": "en",
      "limit": 5
    }
  },
  {
    "name": "get_topic",
    "arguments": {
      "id": "astro",
      "locale": "pt"
    }
  },
  {
    "name": "get_framework_guide",
    "arguments": {
      "framework": "astro",
      "locale": "en"
    }
  },
  {
    "name": "list_routes",
    "arguments": {
      "filter": "admin.alunos",
      "offset": 0,
      "limit": 20
    }
  },
  {
    "name": "get_route",
    "arguments": {
      "name": "admin.alunos.edit"
    }
  }
]
```

Related topic IDs: mcp-project, mcp-workflow, mcp-security
---

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
---

# Segurança e escopo

Topic: `mcp-security` · Named Routes v2.2.0

O servidor é local e somente leitura via stdio. Analisa manifestos estáticos como dados sem executá-los. Não roda comandos shell, não executa configuração da aplicação, não grava arquivos, não chama endpoints HTTP nem expõe serviço remoto.

Selecione apenas workspaces confiáveis. O manifesto não é um sandbox para sistemas de arquivos hostis. Agentes e clientes podem ter permissões independentes; as anotações somente leitura do MCP não são uma garantia global de segurança. Nunca coloque credenciais nos defaults gerados ou prompts.

Related topic IDs: mcp-project, mcp-tools, ai-agents
---

# Inspector e solução de problemas

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

Use MCP Inspector para inspecionar ferramentas e resultados sem um modelo. Execute o launcher do pacote instalado a partir do consumidor. O mantenedor pode rodar pnpm run test:mcp e pnpm run test:package na raiz.

Dependências opcionais ausentes: reinstale com opcionais habilitadas, por exemplo npm install --include=optional. No pnpm, remova a opção no-optional e reinstale. Manifesto ausente ou ambíguo exige geração ou --manifest. Se não houver rotas disponíveis, confira --root. Para MODULE_NOT_FOUND no Windows, use o launcher Node direto.

Um servidor stdio que aguarda sem imprimir logs comuns é normal. Mensagens do protocolo usam stdout; diagnósticos usam stderr. Se a documentação divergir da aplicação, compare a versão instalada com a do catálogo e regenere as rotas intencionalmente antes de reiniciar.

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
